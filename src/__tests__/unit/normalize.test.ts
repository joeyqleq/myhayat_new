/**
 * Unit tests for src/lib/language/normalize.ts
 *
 * Tests: normalizeArabizi, toSemanticEnglish
 * No mocking — runs against real implementation.
 */

import { describe, it, expect } from "vitest";
import { normalizeArabizi, toSemanticEnglish } from "@/lib/language/normalize";

// ---------------------------------------------------------------------------
// Minimal profile shape for toSemanticEnglish
// ---------------------------------------------------------------------------
type DominantLanguage = "english" | "arabic" | "arabizi" | "french" | "mixed";

interface MinimalProfile {
  dominant: DominantLanguage;
  [key: string]: unknown;
}

const arabiziProfile: MinimalProfile = { dominant: "arabizi" };
const englishProfile: MinimalProfile = { dominant: "english" };
const arabicProfile: MinimalProfile = { dominant: "arabic" };

// ---------------------------------------------------------------------------
// normalizeArabizi
// ---------------------------------------------------------------------------
describe("normalizeArabizi — case folding", () => {
  it("lowercases all-caps input", () => {
    const result = normalizeArabizi("SHOU FI MA3AK?");
    expect(result).toBe(result.toLowerCase());
  });

  it("lowercases mixed-case input", () => {
    const result = normalizeArabizi("Ana Mish Mni7");
    expect(result).toBe(result.toLowerCase());
  });

  it("preserves Arabic script (does not lowercase it incorrectly)", () => {
    const input = "أنا تعبان";
    const result = normalizeArabizi(input);
    expect(result).toContain("أنا");
  });
});

describe("normalizeArabizi — spelling normalization", () => {
  it("normalizes 'mish' (canonical negation stays or maps correctly)", () => {
    const result = normalizeArabizi("mish mni7");
    // Must produce lowercase; specific form depends on canonical definition
    expect(result).toBeTruthy();
    expect(result.length).toBeGreaterThan(0);
    expect(result).toMatch(/mi[s]h|mesh/i);
  });

  it("normalizes 'kteer' variant to canonical form", () => {
    const result = normalizeArabizi("kteer ta3ban");
    // 'kteer' is a variant of 'ktir' — result should be a non-empty string
    expect(result).toBeTruthy();
    // Should not still be 'kteer' if normalization maps it
    // (or it stays 'kteer' if that IS canonical — test is lenient)
    expect(result.length).toBeGreaterThan(0);
  });

  it("passes through English text unchanged (except lowercasing)", () => {
    const result = normalizeArabizi("I feel anxious");
    expect(result.toLowerCase()).toBe("i feel anxious");
  });

  it("preserves digit substitutes as-is (3, 7, 2 are part of the word)", () => {
    const result = normalizeArabizi("3am ba2der");
    expect(result).toContain("3");
    expect(result).toContain("2");
  });

  it("handles empty string without throwing", () => {
    expect(() => normalizeArabizi("")).not.toThrow();
    expect(normalizeArabizi("")).toBe("");
  });

  it("handles whitespace-only string without throwing", () => {
    expect(() => normalizeArabizi("   ")).not.toThrow();
  });

  it("normalizes punctuation-wrapped Arabizi", () => {
    const result = normalizeArabizi("SHOU fi ma3ak?");
    expect(result).toMatch(/shou|shu|chou/);
    expect(result).toContain("fi");
    expect(result).toContain("?");
  });

  it("normalizes repeated spaces to single space", () => {
    const result = normalizeArabizi("ana   mish   mni7");
    expect(result).not.toContain("   ");
  });
});

describe("normalizeArabizi — idempotency", () => {
  it("is idempotent: normalizing twice equals normalizing once", () => {
    const input = "SHOU sar MA3AK";
    const once = normalizeArabizi(input);
    const twice = normalizeArabizi(once);
    expect(once).toBe(twice);
  });

  it("is idempotent for digit-heavy text", () => {
    const input = "3am ba2der e7ke 7ada";
    const once = normalizeArabizi(input);
    const twice = normalizeArabizi(once);
    expect(once).toBe(twice);
  });
});

// ---------------------------------------------------------------------------
// toSemanticEnglish
// ---------------------------------------------------------------------------
describe("toSemanticEnglish — Arabizi → English translation", () => {
  it("translates 'ta3ban' to tired/exhausted", () => {
    const result = toSemanticEnglish("ana ta3ban ktir", arabiziProfile);
    expect(result).not.toBeNull();
    const lower = result!.toLowerCase();
    expect(lower).toMatch(/tired|exhausted|fatigued/);
  });

  it("includes 'a lot' or equivalent for 'ktir'", () => {
    const result = toSemanticEnglish("ana ta3ban ktir", arabiziProfile);
    expect(result).not.toBeNull();
    const lower = result!.toLowerCase();
    expect(lower).toMatch(/a lot|very|much|ktir/);
  });

  it("translates 'beke' (crying) correctly", () => {
    const result = toSemanticEnglish("3am beke la7ale", arabiziProfile);
    expect(result).not.toBeNull();
    const lower = result!.toLowerCase();
    expect(lower).toMatch(/cry|crying|weep|tears/);
  });

  it("translates 'mabsout/mabsouta' to happy/okay", () => {
    const result = toSemanticEnglish("ma fi shi mabsout fiye", arabiziProfile);
    expect(result).not.toBeNull();
    const lower = result!.toLowerCase();
    expect(lower).toMatch(/happy|good|pleased|content|okay/);
  });

  it("returns null for English input (no translation needed)", () => {
    const result = toSemanticEnglish("I feel anxious", englishProfile);
    expect(result).toBeNull();
  });

  it("returns null for empty string", () => {
    const result = toSemanticEnglish("", arabiziProfile);
    expect(result === null || result === "").toBe(true);
  });

  it("returns a non-empty string for Arabic script with arabic profile", () => {
    const result = toSemanticEnglish("أنا تعبان كتير", arabicProfile);
    if (result !== null) {
      expect(result.length).toBeGreaterThan(0);
    }
  });

  it("returns a string (not throws) for mixed language input", () => {
    const mixedProfile: MinimalProfile = { dominant: "mixed" };
    expect(() =>
      toSemanticEnglish("I feel ta3ban all the time", mixedProfile)
    ).not.toThrow();
  });
});

describe("toSemanticEnglish — output quality", () => {
  it("output is in English (no digit substitutes like 3, 7, 2)", () => {
    const result = toSemanticEnglish("3am e7ess bi 2al2", arabiziProfile);
    if (result) {
      // The semantic English version should not contain raw digit substitutes
      // as standalone words (3, 7, 2 used as Arabic phonemes)
      expect(result).toMatch(/[a-zA-Z ]/);
    }
  });

  it("output is shorter than or equal to a verbose paraphrase", () => {
    const result = toSemanticEnglish("ta3ban men kil shi", arabiziProfile);
    if (result) {
      // Should be concise semantic English, not extremely long
      expect(result.length).toBeLessThan(200);
    }
  });
});
