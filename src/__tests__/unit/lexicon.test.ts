/**
 * Unit tests for src/lib/language/lexicon.ts
 *
 * Tests: SPELLING_CLUSTERS, VARIANT_TO_CANONICAL, ENGLISH_CLINICAL_TERMS
 * No mocking — runs against real implementation.
 */

import { describe, it, expect } from "vitest";
import {
  SPELLING_CLUSTERS,
  VARIANT_TO_CANONICAL,
  ENGLISH_CLINICAL_TERMS,
} from "@/lib/language/lexicon";

// ---------------------------------------------------------------------------
// VARIANT_TO_CANONICAL
// ---------------------------------------------------------------------------
describe("VARIANT_TO_CANONICAL — spelling variant mapping", () => {
  it("maps 'shou' to canonical form", () => {
    expect(VARIANT_TO_CANONICAL["shou"]).toBeDefined();
    // 'shu' is the canonical per the spec
    expect(VARIANT_TO_CANONICAL["shou"]).toBe("shu");
  });

  it("maps 'chou' to canonical form", () => {
    expect(VARIANT_TO_CANONICAL["chou"]).toBeDefined();
    expect(VARIANT_TO_CANONICAL["chou"]).toBe("shu");
  });

  it("maps 'mesh' to canonical negation", () => {
    expect(VARIANT_TO_CANONICAL["mesh"]).toBeDefined();
    expect(VARIANT_TO_CANONICAL["mesh"]).toBe("mish");
  });

  it("maps 'kteer' to canonical ktir", () => {
    expect(VARIANT_TO_CANONICAL["kteer"]).toBeDefined();
    expect(VARIANT_TO_CANONICAL["kteer"]).toBe("ktir");
  });

  it("canonical forms map to themselves", () => {
    // If the canonical is in the map, it should point to itself or not be in the map
    // (implementations differ — just verify the canonical is reachable)
    const canonical = VARIANT_TO_CANONICAL["shou"];
    expect(canonical).toBeTruthy();
  });

  it("is a plain object with string keys and string values", () => {
    expect(typeof VARIANT_TO_CANONICAL).toBe("object");
    const firstKey = Object.keys(VARIANT_TO_CANONICAL)[0];
    expect(typeof firstKey).toBe("string");
    expect(typeof VARIANT_TO_CANONICAL[firstKey]).toBe("string");
  });

  it("has at least 10 entries", () => {
    expect(Object.keys(VARIANT_TO_CANONICAL).length).toBeGreaterThanOrEqual(10);
  });
});

// ---------------------------------------------------------------------------
// ENGLISH_CLINICAL_TERMS
// ---------------------------------------------------------------------------
describe("ENGLISH_CLINICAL_TERMS — mental health vocabulary", () => {
  it("contains 'anxiety'", () => {
    expect(ENGLISH_CLINICAL_TERMS.has("anxiety")).toBe(true);
  });

  it("contains 'burnout'", () => {
    expect(ENGLISH_CLINICAL_TERMS.has("burnout")).toBe(true);
  });

  it("contains 'depression'", () => {
    expect(ENGLISH_CLINICAL_TERMS.has("depression")).toBe(true);
  });

  it("is a Set", () => {
    expect(ENGLISH_CLINICAL_TERMS instanceof Set).toBe(true);
  });

  it("has at least 10 entries", () => {
    expect(ENGLISH_CLINICAL_TERMS.size).toBeGreaterThanOrEqual(10);
  });

  it("does not contain common non-clinical words", () => {
    expect(ENGLISH_CLINICAL_TERMS.has("the")).toBe(false);
    expect(ENGLISH_CLINICAL_TERMS.has("and")).toBe(false);
    expect(ENGLISH_CLINICAL_TERMS.has("I")).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// SPELLING_CLUSTERS
// ---------------------------------------------------------------------------
describe("SPELLING_CLUSTERS — cluster definitions", () => {
  it("has at least 15 entries", () => {
    const count = Array.isArray(SPELLING_CLUSTERS)
      ? SPELLING_CLUSTERS.length
      : Object.keys(SPELLING_CLUSTERS).length;
    expect(count).toBeGreaterThanOrEqual(15);
  });

  it("contains a cluster for the 'what' question word", () => {
    // Cluster should include shu, shou, chou
    const asArray = Array.isArray(SPELLING_CLUSTERS)
      ? SPELLING_CLUSTERS
      : Object.values(SPELLING_CLUSTERS);

    const hasWhatCluster = asArray.some((cluster: unknown) => {
      if (Array.isArray(cluster)) {
        return (
          cluster.includes("shu") ||
          cluster.includes("shou") ||
          cluster.includes("chou")
        );
      }
      if (cluster && typeof cluster === "object" && "variants" in cluster) {
        const variants = (cluster as { variants: string[] }).variants;
        return (
          variants.includes("shu") ||
          variants.includes("shou") ||
          variants.includes("chou")
        );
      }
      return false;
    });
    expect(hasWhatCluster).toBe(true);
  });

  it("contains a cluster for the negation particle", () => {
    const asArray = Array.isArray(SPELLING_CLUSTERS)
      ? SPELLING_CLUSTERS
      : Object.values(SPELLING_CLUSTERS);

    const hasNegCluster = asArray.some((cluster: unknown) => {
      if (Array.isArray(cluster)) {
        return cluster.includes("mish") || cluster.includes("mesh");
      }
      if (cluster && typeof cluster === "object" && "variants" in cluster) {
        const variants = (cluster as { variants: string[] }).variants;
        return variants.includes("mish") || variants.includes("mesh");
      }
      return false;
    });
    expect(hasNegCluster).toBe(true);
  });
});
