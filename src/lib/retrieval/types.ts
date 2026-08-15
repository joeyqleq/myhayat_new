export interface RetrievedChunk {
  id: string;
  text: string;
  score: number;
  source: string;
  section?: string;
  category: "clinical" | "language" | "context";
  type?: string;
}

export interface RetrievalOptions {
  topK?: number;
  minScore?: number;
  category?: "clinical" | "language" | "context" | "all";
}

export interface Retriever {
  search(query: string, options?: RetrievalOptions): Promise<RetrievedChunk[]>;
  close?(): void;
}
