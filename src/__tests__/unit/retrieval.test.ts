import { describe, expect, it } from "vitest";
import { selectSupportChunks } from "@/lib/retrieval";
import type { RetrievedChunk } from "@/lib/retrieval";

const chunks: RetrievedChunk[] = [
  { id: "clinical", text: "clinical support", score: 0.9, source: "test", category: "clinical" },
  { id: "language", text: "unreviewed slang", score: 0.99, source: "test", category: "language" },
  { id: "context", text: "cultural context", score: 0.8, source: "test", category: "context" },
];

describe("RAG support/language boundary", () => {
  it("excludes language-realization chunks even when they score highest", () => {
    expect(selectSupportChunks(chunks).map((chunk) => chunk.id)).toEqual(["clinical", "context"]);
  });

  it("does not mutate retrieval results", () => {
    selectSupportChunks(chunks);
    expect(chunks).toHaveLength(3);
    expect(chunks[1].category).toBe("language");
  });
});
