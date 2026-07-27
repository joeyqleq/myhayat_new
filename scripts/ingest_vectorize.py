#!/usr/bin/env python3
"""Ingest knowledge base .md files into Cloudflare Vectorize via Workers AI embeddings."""

import json
import os
import re
import time
import urllib.request
import urllib.error
from pathlib import Path

ACCOUNT_ID = "0228e3fe174bbc185f30b1d4eaf5f166"
AUTH_EMAIL = "joe.maari@coyotes.usd.edu"
AUTH_KEY = "8d7c3a9b1e90846a143170e4696a93be960ee"

EMBEDDING_URL = f"https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/run/@cf/baai/bge-base-en-v1.5"
VECTORIZE_URL = f"https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/vectorize/v2/indexes/myhayat-kb/upsert"

KNOWLEDGE_DIR = Path("/home/jq/Desktop/myhayat_new/knowledge")
CHUNK_SIZE = 1600
MIN_CHUNK_LEN = 100
BATCH_SIZE = 100
MAX_RETRIES = 3


def sanitize_text(text):
    text = re.sub(r"^#{1,6}\s+", "", text, flags=re.MULTILINE)
    text = text.replace("|", " ")
    text = re.sub(r"[ \t]+", " ", text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip()


def chunk_file(content):
    content = sanitize_text(content)
    paragraphs = content.split("\n\n")
    chunks = []
    current = ""

    for para in paragraphs:
        para = para.strip()
        if not para:
            continue
        if len(current) + len(para) + 2 > CHUNK_SIZE and current:
            chunks.append(current.strip())
            current = para
        else:
            current = current + "\n\n" + para if current else para

    if current.strip():
        chunks.append(current.strip())

    return [c for c in chunks if len(c) >= MIN_CHUNK_LEN]


def api_request(url, data, retries=MAX_RETRIES, content_type="application/json"):
    headers = {
        "X-Auth-Email": AUTH_EMAIL,
        "X-Auth-Key": AUTH_KEY,
        "Content-Type": content_type,
    }
    body = data if isinstance(data, bytes) else json.dumps(data).encode("utf-8")

    for attempt in range(retries):
        try:
            req = urllib.request.Request(url, data=body, headers=headers, method="POST")
            with urllib.request.urlopen(req, timeout=60) as resp:
                return json.loads(resp.read().decode("utf-8"))
        except (urllib.error.URLError, urllib.error.HTTPError, OSError) as e:
            if attempt < retries - 1:
                wait = 2 ** attempt
                print(f"  Retry {attempt + 1}/{retries} after error: {e}. Waiting {wait}s...")
                time.sleep(wait)
            else:
                raise


def get_embeddings(texts):
    resp = api_request(EMBEDDING_URL, {"text": texts})
    if not resp.get("success"):
        raise RuntimeError(f"Embedding API error: {resp}")
    return resp["result"]["data"]


def upsert_vectors(vectors):
    ndjson_lines = []
    for v in vectors:
        ndjson_lines.append(json.dumps(v))
    body = "\n".join(ndjson_lines).encode("utf-8")
    resp = api_request(VECTORIZE_URL, body, content_type="application/x-ndjson")
    if not resp.get("success"):
        raise RuntimeError(f"Vectorize upsert error: {resp}")
    return resp


def process_file(filepath):
    stem = filepath.stem
    content = filepath.read_text(encoding="utf-8")
    chunks = chunk_file(content)

    print(f"  {filepath.name}: {len(chunks)} chunks")

    # Embed all chunks at once (BGE supports up to 100 texts per call)
    EMBED_BATCH = 50
    all_embeddings = []
    for start in range(0, len(chunks), EMBED_BATCH):
        batch = chunks[start : start + EMBED_BATCH]
        embs = get_embeddings(batch)
        all_embeddings.extend(embs)

    vectors = []
    for i, (chunk, emb) in enumerate(zip(chunks, all_embeddings)):
        vectors.append({
            "id": f"{stem}_{i}",
            "values": emb,
            "metadata": {"source": filepath.name, "text": chunk},
        })

    # Upsert in batches of BATCH_SIZE
    for start in range(0, len(vectors), BATCH_SIZE):
        batch = vectors[start : start + BATCH_SIZE]
        upsert_vectors(batch)
        print(f"    Uploaded vectors {start}–{start + len(batch) - 1}")

    return len(chunks)


def main():
    md_files = sorted(KNOWLEDGE_DIR.glob("*.md"))
    if not md_files:
        print("No .md files found in knowledge directory.")
        return

    print(f"Found {len(md_files)} .md files to process.\n")

    total_vectors = 0
    for filepath in md_files:
        count = process_file(filepath)
        total_vectors += count
        print()

    print(f"Done. Total vectors uploaded: {total_vectors}")


if __name__ == "__main__":
    main()
