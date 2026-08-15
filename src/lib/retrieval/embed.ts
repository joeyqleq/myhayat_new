const EMBED_MODEL = "@cf/baai/bge-m3";
const MAX_TEXT_LEN = 2000;
const BATCH_SIZE = 50;

function getEmbedUrl(): string {
  const accountId = process.env.CF_CENTRAL_ACCOUNT_ID;
  if (!accountId) throw new Error("CF_CENTRAL_ACCOUNT_ID not set");
  return `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/${EMBED_MODEL}`;
}

function getHeaders(): Record<string, string> {
  return {
    "X-Auth-Email": process.env.CF_CENTRAL_EMAIL ?? "",
    "X-Auth-Key": process.env.CF_CENTRAL_KEY ?? "",
    "Content-Type": "application/json",
  };
}

async function embedBatch(texts: string[]): Promise<number[][] | null> {
  try {
    const url = getEmbedUrl();
    const res = await fetch(url, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ text: texts }),
    });
    if (!res.ok) {
      console.error(`[embed] HTTP ${res.status}`);
      return null;
    }
    const json = (await res.json()) as { success: boolean; result: { data: number[][] } };
    if (!json.success) {
      console.error("[embed] API returned success=false");
      return null;
    }
    return json.result.data;
  } catch (e) {
    console.error(`[embed] ${(e as Error).constructor.name}: ${(e as Error).message}`);
    return null;
  }
}

export async function embedText(texts: string[]): Promise<number[][] | null> {
  const truncated = texts.map((t) => t.slice(0, MAX_TEXT_LEN));
  const results: number[][] = [];

  for (let i = 0; i < truncated.length; i += BATCH_SIZE) {
    const batch = truncated.slice(i, i + BATCH_SIZE);
    const embeddings = await embedBatch(batch);
    if (!embeddings) return null;
    results.push(...embeddings);
  }

  return results;
}

export async function embedSingle(text: string): Promise<number[] | null> {
  const result = await embedText([text]);
  return result ? result[0] : null;
}
