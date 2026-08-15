import type { Retriever, RetrievedChunk, RetrievalOptions } from "./types";

export async function dualRetrieve(
  originalQuery: string,
  semanticEnglish: string | null,
  retriever: Retriever,
  options: RetrievalOptions = {}
): Promise<RetrievedChunk[]> {
  const topK = options.topK ?? 8;

  const fetchOpts: RetrievalOptions = { ...options, topK: topK * 2 };

  const primaryResults = await retriever.search(originalQuery, fetchOpts);

  let secondaryResults: RetrievedChunk[] = [];
  if (semanticEnglish && semanticEnglish.trim() !== originalQuery.trim()) {
    secondaryResults = await retriever.search(semanticEnglish, fetchOpts);
  }

  const merged = new Map<string, RetrievedChunk>();
  for (const chunk of [...primaryResults, ...secondaryResults]) {
    const existing = merged.get(chunk.id);
    if (!existing || chunk.score > existing.score) {
      merged.set(chunk.id, chunk);
    }
  }

  return Array.from(merged.values())
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
}
