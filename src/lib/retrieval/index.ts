export { VectorizeRetriever } from "./vectorize";
export { dualRetrieve } from "./dual";
export { formatContext } from "./format";
export type { RetrievedChunk, RetrievalOptions, Retriever } from "./types";

import { VectorizeRetriever } from "./vectorize";
import { dualRetrieve } from "./dual";
import { formatContext } from "./format";
import type { RetrievedChunk } from "./types";

export interface RetrievedContext {
  text: string;
  chunks: number;
}

export function selectSupportChunks(chunks: RetrievedChunk[]): RetrievedChunk[] {
  return chunks.filter((chunk) => chunk.category !== "language");
}

/**
 * Convenience wrapper used by the chat route.
 * @param query - raw user query (any language/script)
 * @param semanticEnglish - English paraphrase for retrieval (from language engine); may be null
 */
export async function retrieveContext(
  query: string,
  semanticEnglish?: string | null,
  topK = 6
): Promise<RetrievedContext> {
  try {
    const retriever = new VectorizeRetriever();
    const chunks = await dualRetrieve(query, semanticEnglish ?? null, retriever, { topK });
    // Language realization is supplied by the compact always-on surface guide.
    // Semantic RAG is reserved for clinical/context knowledge so an arbitrary
    // retrieved slang chunk cannot override the generation layer.
    const supportChunks = selectSupportChunks(chunks);
    if (supportChunks.length === 0) return { text: "", chunks: 0 };
    return { text: formatContext(supportChunks), chunks: supportChunks.length };
  } catch {
    return { text: "", chunks: 0 };
  }
}
