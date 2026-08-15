import { embedSingle } from "./embed";
import type { Retriever, RetrievedChunk, RetrievalOptions } from "./types";

interface VectorizeMatch {
  id: string;
  score: number;
  metadata?: Record<string, unknown>;
}

interface VectorizeQueryResponse {
  success: boolean;
  result: { matches: VectorizeMatch[] };
  errors?: { message: string }[];
}

export class VectorizeRetriever implements Retriever {
  constructor(private indexName: string = "myhayat-kb-v2") {}

  async search(query: string, options: RetrievalOptions = {}): Promise<RetrievedChunk[]> {
    try {
      const vector = await embedSingle(query);
      if (!vector) return [];

      const accountId = process.env.CF_CENTRAL_ACCOUNT_ID;
      if (!accountId) {
        console.error("[vectorize] CF_CENTRAL_ACCOUNT_ID not set");
        return [];
      }

      const url = `https://api.cloudflare.com/client/v4/accounts/${accountId}/vectorize/v2/indexes/${this.indexName}/query`;

      const body: Record<string, unknown> = {
        vector,
        topK: options.topK ?? 8,
        returnMetadata: "all",
      };

      if (options.category && options.category !== "all") {
        body.filter = { category: { $eq: options.category } };
      }

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "X-Auth-Email": process.env.CF_CENTRAL_EMAIL ?? "",
          "X-Auth-Key": process.env.CF_CENTRAL_KEY ?? "",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        console.error(`[vectorize] HTTP ${res.status}`);
        return [];
      }

      const json = (await res.json()) as VectorizeQueryResponse;
      if (!json.success) {
        console.error(`[vectorize] query failed: ${json.errors?.[0]?.message ?? "unknown"}`);
        return [];
      }

      const minScore = options.minScore ?? 0;
      return json.result.matches
        .filter((m) => m.score >= minScore)
        .map((m) => ({
          id: m.id,
          score: m.score,
          text: String(m.metadata?.text ?? ""),
          source: String(m.metadata?.source ?? ""),
          section: m.metadata?.section != null ? String(m.metadata.section) : undefined,
          category: (m.metadata?.category as RetrievedChunk["category"]) ?? "clinical",
          type: m.metadata?.type != null ? String(m.metadata.type) : undefined,
        }));
    } catch (e) {
      console.error(`[vectorize] ${(e as Error).constructor.name}: ${(e as Error).message}`);
      return [];
    }
  }
}
