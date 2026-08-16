import { describe, expect, it } from "vitest";
import { validateResponse } from "@/lib/language/validate";
import type { SessionLanguageProfile } from "@/lib/language/types";

const arabiziProfile: SessionLanguageProfile = {
  dominantLanguage: "arabizi",
  englishRatio: 0.05,
  arabiziRatio: 0.95,
  arabicRatio: 0,
  frenchRatio: 0,
  spellingPreferences: {},
  digitDensity: 0.2,
  uses2: true,
  uses3: true,
  uses5: false,
  uses7: true,
  uses8: false,
  uses9: false,
  preserveTerms: [],
  semanticEnglish: null,
  messageCount: 1,
  lastUpdated: Date.now(),
};

describe("Lebanese generation output gate", () => {
  it("does not falsely reject a minimal common Lebanese question", () => {
    const result = validateResponse("Shu sar?", arabiziProfile, []);
    expect(result.rewriteNeeded).toBe(false);
  });

  it.each(["feen", "fein", "ezzay", "keda", "3ayza", "e7na", "kollohom"])(
    "rejects known non-Lebanese generation form: %s",
    (word) => {
      const result = validateResponse(`Ana ${word} hala2`, arabiziProfile, []);
      expect(result.rewriteNeeded).toBe(true);
      expect(result.issues.some(i => i.type === "dialect_contamination")).toBe(true);
    },
  );

  it.each(["nfamela", "nfa3el", "za7rat", "nsemo", "knesbi", "sa7a7a7a"])(
    "rejects known contaminated/synthetic token: %s",
    (word) => {
      const result = validateResponse(`Fi ${word} hala2`, arabiziProfile, []);
      expect(result.rewriteNeeded).toBe(true);
      expect(result.issues.some(i => i.type === "gibberish")).toBe(true);
    },
  );

  it("rejects repeated phrase loops like the production regression", () => {
    const result = validateResponse(
      "Kol shi 7assas bas 7atti shi 3ala 7alak. Kol shi 7assas bas 7atti shi 3ala 7alak.",
      arabiziProfile,
      [],
    );
    expect(result.rewriteNeeded).toBe(true);
    expect(result.issues.some(i => i.type === "loop_detected")).toBe(true);
  });

  it("checks the last assistant turns directly instead of dropping every other one", () => {
    const previous = "Shu sar?";
    const result = validateResponse(previous, arabiziProfile, [previous]);
    expect(result.rewriteNeeded).toBe(true);
    expect(result.issues.some(i => i.type === "loop_detected")).toBe(true);
  });

  it("rejects digit-marked Arabizi when the current turn is English", () => {
    const englishProfile = {
      ...arabiziProfile,
      dominantLanguage: "english" as const,
      englishRatio: 1,
      arabiziRatio: 0,
    };
    const result = validateResponse("Kol shi 7assas bas 7atti shi 3ala 7alak", englishProfile, []);
    expect(result.rewriteNeeded).toBe(true);
    expect(result.issues.some(i => i.type === "script_mismatch")).toBe(true);
  });

  it("rejects Latin-only Arabizi when the current turn is English", () => {
    const englishProfile = {
      ...arabiziProfile,
      dominantLanguage: "english" as const,
      englishRatio: 1,
      arabiziRatio: 0,
    };
    const result = validateResponse("Shu sar ma3ak hala2?", englishProfile, []);
    expect(result.rewriteNeeded).toBe(true);
    expect(result.issues.some(i => i.type === "script_mismatch")).toBe(true);
  });

  it("does not reject ordinary English containing ambiguous overlap words", () => {
    const englishProfile = {
      ...arabiziProfile,
      dominantLanguage: "english" as const,
      englishRatio: 1,
      arabiziRatio: 0,
    };
    const result = validateResponse("This is normal, lol. You are allowed to feel unsure.", englishProfile, []);
    expect(result.rewriteNeeded).toBe(false);
  });

  it("allows a repeated three-word empathy stem when no five-word loop exists", () => {
    const response = "It sounds like this was hard. It sounds like you need time.";
    expect(validateResponse(response, arabiziProfile, []).rewriteNeeded).toBe(false);
  });

  it.each([
    "analysis: hidden reasoning",
    "<think>hidden reasoning</think>",
    "Okay, let me start by understanding the user's message.",
  ])(
    "rejects prompt/thinking leakage: %s",
    (response) => {
      const result = validateResponse(response, arabiziProfile, []);
      expect(result.rewriteNeeded).toBe(true);
      expect(result.issues.some(i => i.type === "prompt_leak")).toBe(true);
    },
  );

  it("rejects the known incoherent production phrase even without a loop", () => {
    const result = validateResponse("Kol shi 7assas hala2", arabiziProfile, []);
    expect(result.rewriteNeeded).toBe(true);
    expect(result.issues.some(i => i.type === "gibberish")).toBe(true);
  });
});
