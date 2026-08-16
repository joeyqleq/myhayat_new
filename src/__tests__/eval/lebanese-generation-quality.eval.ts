import { describe, expect, it } from "vitest";
import { analyzeMessage, updateSessionProfile, validateResponse } from "@/lib/language";
import type { SessionLanguageProfile } from "@/lib/language";
import { LEBANESE_GENERATION_QUALITY_FIXTURES } from "../fixtures/lebanese-generation-quality";

function profileFor(input: string): SessionLanguageProfile {
  return updateSessionProfile(null, input);
}

describe("Lebanese generation quality — fixture integrity", () => {
  it("keeps a small contrastive owner-backed set", () => {
    expect(LEBANESE_GENERATION_QUALITY_FIXTURES.length).toBeGreaterThanOrEqual(15);
    expect(LEBANESE_GENERATION_QUALITY_FIXTURES.length).toBeLessThanOrEqual(25);
    expect(new Set(LEBANESE_GENERATION_QUALITY_FIXTURES.map((f) => f.id)).size)
      .toBe(LEBANESE_GENERATION_QUALITY_FIXTURES.length);
  });

  it("does not invent positive Lebanese sentences for behavioral cases", () => {
    const behavior = LEBANESE_GENERATION_QUALITY_FIXTURES.filter((f) =>
      ["vague_distress", "family_disclosure", "current_turn_language"].includes(f.category),
    );
    expect(behavior.every((f) => f.ownerExactGood === undefined)).toBe(true);
  });
});

describe("Lebanese generation quality — deterministic rejection subset", () => {
  for (const fixture of LEBANESE_GENERATION_QUALITY_FIXTURES.filter((f) => f.deterministicReject)) {
    it(`[${fixture.id}] rejects the mechanically detectable bad response`, () => {
      const history = fixture.id === "exact-repeat" ? [fixture.badResponse] : [];
      const modeInput = fixture.category === "current_turn_language" ? fixture.input : "ana mdeye2 shway";
      const result = validateResponse(fixture.badResponse, profileFor(modeInput), history);
      expect(result.rewriteNeeded, `${fixture.whyBad}\n${result.issues.map((i) => i.detail).join("\n")}`)
        .toBe(true);
    });
  }
});

describe("Lebanese generation quality — owner exact forms", () => {
  for (const fixture of LEBANESE_GENERATION_QUALITY_FIXTURES.filter((f) => f.ownerExactGood)) {
    it(`[${fixture.id}] preserves owner-supplied exact form`, () => {
      expect(fixture.ownerExactGood).toBeTruthy();
      expect(fixture.goodOrNativeConstraint).not.toMatch(/perfect|guaranteed/i);
    });
  }

  it("keeps current English turn authoritative after Arabizi context", () => {
    const previous = profileFor("ana mdeye2 shway");
    const current = updateSessionProfile(previous, "how can i learn to be more confident?");
    expect(current.dominantLanguage).toBe("english");
    expect(analyzeMessage("how can i learn to be more confident?").dominantLanguage).toBe("english");
  });
});
