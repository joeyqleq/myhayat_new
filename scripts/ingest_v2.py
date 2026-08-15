#!/usr/bin/env python3
"""Ingest knowledge base into Cloudflare Vectorize using @cf/baai/bge-m3 (1024-dim)."""

import json
import os
import re
import time
import urllib.request
import urllib.error
from pathlib import Path

ACCOUNT_ID = os.environ["CF_CENTRAL_ACCOUNT_ID"]
AUTH_EMAIL = os.environ["CF_CENTRAL_EMAIL"]
AUTH_KEY = os.environ["CF_CENTRAL_KEY"]

INDEX_NAME = os.environ.get("VECTORIZE_INDEX", "myhayat-kb-v2")
EMBEDDING_MODEL = "@cf/baai/bge-m3"

EMBEDDING_URL = f"https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/run/{EMBEDDING_MODEL}"
VECTORIZE_UPSERT_URL = f"https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/vectorize/v2/indexes/{INDEX_NAME}/upsert"
VECTORIZE_LIST_URL = f"https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/vectorize/v2/indexes"

KNOWLEDGE_DIR = Path(os.environ.get("KNOWLEDGE_DIR", str(Path(__file__).parent.parent / "knowledge")))

EMBED_BATCH = 50
UPSERT_BATCH = 100
MAX_RETRIES = 3
MIN_CHUNK_LEN = 80


# ---------------------------------------------------------------------------
# Category assignment
# ---------------------------------------------------------------------------

def get_category_and_type(stem: str) -> tuple[str, str]:
    if re.match(r"0[78]_", stem):
        return "language", "arabizi-corpus"
    if re.match(r"0[1-6]_", stem):
        return "clinical", "therapy-framework"
    if stem == "lebanese_arabic_mental_health_context":
        return "context", "cultural"
    return "clinical", "therapy-framework"


# ---------------------------------------------------------------------------
# Chunking
# ---------------------------------------------------------------------------

def slug(text: str, max_len: int = 20) -> str:
    return re.sub(r"[^a-z0-9]+", "_", text.lower())[:max_len].strip("_")


def split_by_headings(content: str) -> list[tuple[str, str]]:
    """Return list of (heading_text, body_text) pairs. Pre-heading content uses '' as heading."""
    heading_re = re.compile(r"^(#{2,3})\s+(.+)$", re.MULTILINE)
    sections: list[tuple[str, str]] = []
    last_end = 0
    last_heading = ""

    for m in heading_re.finditer(content):
        body = content[last_end:m.start()].strip()
        if body:
            sections.append((last_heading, body))
        last_heading = m.group(2).strip()
        last_end = m.end()

    tail = content[last_end:].strip()
    if tail:
        sections.append((last_heading, tail))

    return sections


def split_paragraphs(text: str) -> list[str]:
    return [p.strip() for p in re.split(r"\n{2,}", text) if p.strip()]


def semantic_chunks(content: str) -> list[tuple[str, str]]:
    """Return list of (section_heading, chunk_text)."""
    results: list[tuple[str, str]] = []
    for heading, body in split_by_headings(content):
        paragraphs = split_paragraphs(body)
        current = ""
        for para in paragraphs:
            if len(current) + len(para) + 2 > 1600 and current:
                if len(current) >= MIN_CHUNK_LEN:
                    results.append((heading, current.strip()))
                current = para
            else:
                current = (current + "\n\n" + para).strip() if current else para
        if len(current) >= MIN_CHUNK_LEN:
            results.append((heading, current.strip()))
    return results


# ---------------------------------------------------------------------------
# HTTP helpers
# ---------------------------------------------------------------------------

def api_request(url: str, data: "bytes | dict | None" = None, content_type: str = "application/json", method: str = "POST") -> dict:
    headers = {
        "X-Auth-Email": AUTH_EMAIL,
        "X-Auth-Key": AUTH_KEY,
    }
    if data is not None:
        headers["Content-Type"] = content_type
    body: bytes | None = None
    if data is not None:
        body = data if isinstance(data, bytes) else json.dumps(data).encode("utf-8")

    for attempt in range(MAX_RETRIES):
        try:
            req = urllib.request.Request(url, data=body, headers=headers, method=method)
            with urllib.request.urlopen(req, timeout=60) as resp:
                return json.loads(resp.read().decode("utf-8"))
        except urllib.error.HTTPError as e:
            raw = e.read().decode("utf-8", errors="replace")
            err_body = json.loads(raw) if raw.startswith("{") else {"message": raw}
            if attempt < MAX_RETRIES - 1:
                wait = 2 ** attempt
                print(f"  HTTP {e.code} on attempt {attempt + 1}. Retrying in {wait}s...")
                time.sleep(wait)
            else:
                raise RuntimeError(f"HTTP {e.code}: {err_body}") from e
        except (urllib.error.URLError, OSError) as e:
            if attempt < MAX_RETRIES - 1:
                wait = 2 ** attempt
                print(f"  Network error on attempt {attempt + 1}: {e}. Retrying in {wait}s...")
                time.sleep(wait)
            else:
                raise


def get_embeddings(texts: list[str]) -> list[list[float]]:
    resp = api_request(EMBEDDING_URL, {"text": texts})
    if not resp.get("success"):
        raise RuntimeError(f"Embedding API error: {resp.get('errors')}")
    return resp["result"]["data"]


def upsert_vectors(vectors: list[dict]) -> dict:
    ndjson = "\n".join(json.dumps(v) for v in vectors).encode("utf-8")
    resp = api_request(VECTORIZE_UPSERT_URL, ndjson, content_type="application/x-ndjson")
    if not resp.get("success"):
        raise RuntimeError(f"Vectorize upsert error: {resp.get('errors')}")
    return resp


# ---------------------------------------------------------------------------
# Index management
# ---------------------------------------------------------------------------

def ensure_index_exists(index_name: str, dimensions: int = 1024) -> None:
    """Check if the Vectorize index exists; create it if not."""
    list_resp = api_request(VECTORIZE_LIST_URL, method="GET")
    if not list_resp.get("success"):
        print(f"  Warning: could not list indexes: {list_resp.get('errors')}. Continuing anyway.")
        return

    existing = {idx["name"] for idx in list_resp.get("result", [])}
    if index_name in existing:
        print(f"Index '{index_name}' already exists.")
        return

    print(f"Index '{index_name}' not found. Creating ({dimensions}-dim, cosine)...")
    create_url = VECTORIZE_LIST_URL
    create_resp = api_request(
        create_url,
        {"name": index_name, "config": {"dimensions": dimensions, "metric": "cosine"}},
    )
    if create_resp.get("success"):
        print(f"Index '{index_name}' created.")
    else:
        print(f"  Warning: index creation returned: {create_resp.get('errors')}. It may already exist.")


# ---------------------------------------------------------------------------
# PDF processing
# ---------------------------------------------------------------------------

def extract_pdf_chunks(filepath: Path) -> list[tuple[str, str]]:
    try:
        import fitz  # PyMuPDF
    except ImportError:
        print(f"  Skipping {filepath.name}: PyMuPDF not installed (pip install pymupdf)")
        return []

    doc = fitz.open(str(filepath))
    full_text = "\n\n".join(page.get_text() for page in doc)
    doc.close()

    paragraphs = split_paragraphs(full_text)
    chunks: list[tuple[str, str]] = []
    current = ""

    for para in paragraphs:
        para = para.strip()
        if not para:
            continue
        if len(current) + len(para) + 2 > 1600 and current:
            if len(current) >= MIN_CHUNK_LEN:
                chunks.append(("", current.strip()))
            current = para
        else:
            current = (current + "\n\n" + para).strip() if current else para

    if len(current) >= MIN_CHUNK_LEN:
        chunks.append(("", current.strip()))

    return chunks


# ---------------------------------------------------------------------------
# File processing
# ---------------------------------------------------------------------------

def process_md_file(filepath: Path) -> int:
    stem = filepath.stem
    category, type_ = get_category_and_type(stem)
    content = filepath.read_text(encoding="utf-8")
    chunks = semantic_chunks(content)

    if not chunks:
        print(f"  {filepath.name}: 0 chunks (skipped)")
        return 0

    print(f"  {filepath.name}: {len(chunks)} chunks  [{category}/{type_}]")
    return _embed_and_upsert(chunks, stem, filepath.name, category, type_)


def process_pdf_file(filepath: Path) -> int:
    stem = filepath.stem
    chunks = extract_pdf_chunks(filepath)
    if not chunks:
        return 0

    print(f"  {filepath.name}: {len(chunks)} chunks  [clinical/clinical-evidence]")
    return _embed_and_upsert(chunks, stem, filepath.name, "clinical", "clinical-evidence")


def _embed_and_upsert(
    chunks: list[tuple[str, str]],
    stem: str,
    source_name: str,
    category: str,
    type_: str,
) -> int:
    texts = [text for _, text in chunks]
    headings = [heading for heading, _ in chunks]

    all_embeddings: list[list[float]] = []
    for start in range(0, len(texts), EMBED_BATCH):
        batch = texts[start : start + EMBED_BATCH]
        truncated = [t[:2000] for t in batch]
        embs = get_embeddings(truncated)
        all_embeddings.extend(embs)

    vectors = []
    for i, (emb, text, heading) in enumerate(zip(all_embeddings, texts, headings)):
        section_slug = slug(heading) if heading else "body"
        # Vectorize max ID = 64 bytes. Reserve 10 chars for _{section_slug}_{i}
        safe_stem = slug(stem, max_len=30)
        chunk_id = f"{safe_stem}_{section_slug}_{i}"[:64]
        metadata: dict = {
            "text": text,
            "source": source_name,
            "document": stem,
            "category": category,
            "type": type_,
        }
        if heading:
            metadata["section"] = heading
        vectors.append({"id": chunk_id, "values": emb, "metadata": metadata})

    uploaded = 0
    for start in range(0, len(vectors), UPSERT_BATCH):
        batch = vectors[start : start + UPSERT_BATCH]
        upsert_vectors(batch)
        uploaded += len(batch)
        print(f"    Uploaded {start}–{start + len(batch) - 1}")

    return uploaded


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main() -> None:
    print(f"Knowledge dir: {KNOWLEDGE_DIR}")
    print(f"Target index:  {INDEX_NAME}\n")

    ensure_index_exists(INDEX_NAME, dimensions=1024)
    print()

    md_files = sorted(KNOWLEDGE_DIR.glob("*.md"))
    pdf_files = sorted(KNOWLEDGE_DIR.glob("*.pdf"))

    if not md_files and not pdf_files:
        print("No .md or .pdf files found.")
        return

    total = 0
    errors = 0

    for filepath in md_files:
        try:
            count = process_md_file(filepath)
            total += count
        except Exception as e:
            print(f"  ERROR processing {filepath.name}: {e.__class__.__name__}: {e}")
            errors += 1
        print()

    for filepath in pdf_files:
        try:
            count = process_pdf_file(filepath)
            total += count
        except Exception as e:
            print(f"  ERROR processing {filepath.name}: {e.__class__.__name__}: {e}")
            errors += 1
        print()

    print(f"Done. Vectors uploaded: {total}  Errors: {errors}")


if __name__ == "__main__":
    main()
