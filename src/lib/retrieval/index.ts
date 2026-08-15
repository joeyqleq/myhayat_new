export { VectorizeRetriever } from "./vectorize";
export { dualRetrieve } from "./dual";
export { formatContext } from "./format";
export type { RetrievedChunk, RetrievalOptions, Retriever } from "./types";

import { VectorizeRetriever } from "./vectorize";
import { dualRetrieve } from "./dual";
import { formatContext } from "./format";

export interface RetrievedContext {
  text: string;
  chunks: number;
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
    if (chunks.length === 0) return { text: "", chunks: 0 };
    return { text: formatContext(chunks), chunks: chunks.length };
  } catch {
    return { text: "", chunks: 0 };
  }
}
