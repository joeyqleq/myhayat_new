import { describe, expect, it } from "vitest";
import { dualRetrieve, selectSupportChunks } from "@/lib/retrieval";
import type { RetrievedChunk, Retriever } from "@/lib/retrieval";

const clinical: RetrievedChunk = {
  id: "clinical",
  text: "clinical support",
  score: 0.8,
  source: "fixture",
  category: "clinical",
};

const language: RetrievedChunk = {
  id: "language",
  text: "unreviewed language realization",
  score: 0.99,
  source: "fixture",
  category: "language",
};

describe("RAG boundary eval", () => {
  it("keeps language chunks out of support context despite higher score", () => {
    expect(selectSupportChunks([language, clinical])).toEqual([clinical]);
  });

  it("dual retrieval merges original and semantic-English results by id", async () => {
    const retriever: Retriever = {
      async search(query) {
        if (query === "original") return [clinical];
        return [{ ...clinical, score: 0.95 }, { ...language, id: "language-2" }];
      },
    };

    const results = await dualRetrieve("original", "semantic", retriever, { topK: 4 });
    expect(results).toHaveLength(2);
    expect(results.find((chunk) => chunk.id === "clinical")?.score).toBe(0.95);
  });

  it("skips a duplicate semantic query", async () => {
    let calls = 0;
    const retriever: Retriever = {
      async search() {
        calls++;
        return [clinical];
      },
    };

    await dualRetrieve("same", "same", retriever);
    expect(calls).toBe(1);
  });
});
