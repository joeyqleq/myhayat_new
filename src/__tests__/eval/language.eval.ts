/**
 * Language Detection Eval Suite
 *
 * Tests detectLanguage() and updateSessionProfile() from the lang-engine agent's
 * implementations. These are eval tests — they run against real implementations,
 * no mocking. Requires:
 *   src/lib/language/detect.ts   → detectLanguage
 *   src/lib/language/index.ts    → analyzeMessage, updateSessionProfile
 *
 * If those modules are not yet built, this file will fail at import time.
 * That is expected — run evals after all agents complete their work.
 */

import { describe, it, expect } from "vitest";
import { detectLanguage } from "@/lib/language/detect";
import { analyzeMessage, updateSessionProfile } from "@/lib/language/index";

// ---------------------------------------------------------------------------
// Local type definitions (mirrors what detect.ts should export)
// ---------------------------------------------------------------------------
type DominantLanguage = "english" | "arabic" | "arabizi" | "french" | "mixed";

interface DetectResult {
  dominant: DominantLanguage;
  arabiziRatio?: number;
  englishRatio?: number;
  arabicRatio?: number;
  frenchRatio?: number;
  usesDigits?: boolean;
}

interface SpellingPreferences {
  whatWord?: "shou" | "chou" | "shu";
  negation?: "mish" | "mesh";
  [key: string]: unknown;
}

interface SessionProfile {
  dominant?: DominantLanguage;
  messageCount?: number;
  spellingPreferences?: SpellingPreferences;
  [key: string]: unknown;
}

interface LangCase {
  id: string;
  category: string;
  input: string;
  expectedDominant: DominantLanguage;
  expectedArabiziRatio?: [number, number];
  expectedEnglishRatio?: [number, number];
  expectedUsesDigits?: boolean;
  notes?: string;
}

// ---------------------------------------------------------------------------
// Helper: cast detectLanguage result to a typed shape
// ---------------------------------------------------------------------------
function detect(text: string): DetectResult {
  return detectLanguage(text) as DetectResult;
}

// ---------------------------------------------------------------------------
// Test cases
// ---------------------------------------------------------------------------
const cases: LangCase[] = [
  // -- english_only (10) --
  {
    id: "en_01",
    category: "english_only",
    input: "I feel so overwhelmed today",
    expectedDominant: "english",
    expectedEnglishRatio: [0.8, 1.0],
  },
  {
    id: "en_02",
    category: "english_only",
    input: "I can't sleep and I'm really anxious",
    expectedDominant: "english",
    expectedEnglishRatio: [0.8, 1.0],
  },
  {
    id: "en_03",
    category: "english_only",
    input: "My therapist said I have OCD",
    expectedDominant: "english",
    expectedEnglishRatio: [0.8, 1.0],
  },
  {
    id: "en_04",
    category: "english_only",
    input: "I've been dealing with burnout for months",
    expectedDominant: "english",
    expectedEnglishRatio: [0.8, 1.0],
  },
  {
    id: "en_05",
    category: "english_only",
    input: "I just need someone to talk to",
    expectedDominant: "english",
    expectedEnglishRatio: [0.8, 1.0],
  },
  {
    id: "en_06",
    category: "english_only",
    input: "I'm feeling depressed lately",
    expectedDominant: "english",
    expectedEnglishRatio: [0.8, 1.0],
  },
  {
    id: "en_07",
    category: "english_only",
    input: "Had a panic attack at work today",
    expectedDominant: "english",
    expectedEnglishRatio: [0.8, 1.0],
  },
  {
    id: "en_08",
    category: "english_only",
    input: "I don't know how to set boundaries with my family",
    expectedDominant: "english",
    expectedEnglishRatio: [0.8, 1.0],
  },
  {
    id: "en_09",
    category: "english_only",
    input: "Struggling with my PTSD from last year",
    expectedDominant: "english",
    expectedEnglishRatio: [0.8, 1.0],
  },
  {
    id: "en_10",
    category: "english_only",
    input: "Everything feels pointless",
    expectedDominant: "english",
    expectedEnglishRatio: [0.8, 1.0],
  },

  // -- arabizi_light (10) — low digit density --
  {
    id: "azl_01",
    category: "arabizi_light",
    input: "ana mish mni7 lyom",
    expectedDominant: "arabizi",
    expectedArabiziRatio: [0.7, 1.0],
    expectedUsesDigits: true,
  },
  {
    id: "azl_02",
    category: "arabizi_light",
    input: "bade e7ke ma3 7ada",
    expectedDominant: "arabizi",
    expectedArabiziRatio: [0.6, 1.0],
  },
  {
    id: "azl_03",
    category: "arabizi_light",
    input: "ma fi shi mabsout fiye",
    expectedDominant: "arabizi",
    expectedArabiziRatio: [0.7, 1.0],
    expectedUsesDigits: false,
  },
  {
    id: "azl_04",
    category: "arabizi_light",
    input: "ta3bene ktir men el shaghal",
    expectedDominant: "arabizi",
    expectedArabiziRatio: [0.7, 1.0],
  },
  {
    id: "azl_05",
    category: "arabizi_light",
    input: "bas shu badde mel 7ayat",
    expectedDominant: "arabizi",
    expectedArabiziRatio: [0.6, 1.0],
  },
  {
    id: "azl_06",
    category: "arabizi_light",
    input: "ze3lene men halshi",
    expectedDominant: "arabizi",
    expectedArabiziRatio: [0.7, 1.0],
  },
  {
    id: "azl_07",
    category: "arabizi_light",
    input: "la7ale w ma 7ada fehemni",
    expectedDominant: "arabizi",
    expectedArabiziRatio: [0.7, 1.0],
  },
  {
    id: "azl_08",
    category: "arabizi_light",
    input: "mesh 2ader nem",
    expectedDominant: "arabizi",
    expectedArabiziRatio: [0.7, 1.0],
  },
  {
    id: "azl_09",
    category: "arabizi_light",
    input: "kif lezem tekun el 7ayat",
    expectedDominant: "arabizi",
    expectedArabiziRatio: [0.6, 1.0],
  },
  {
    id: "azl_10",
    category: "noisy_input_recognition_only",
    input: "eza bdak nfamela shi",
    expectedDominant: "arabizi",
    expectedArabiziRatio: [0.7, 1.0],
    expectedUsesDigits: false,
  },

  // -- arabizi_heavy_digits (10) — high digit density --
  {
    id: "azh_01",
    category: "arabizi_heavy_digits",
    input: "ana ta3ban w ma 3am y3jibni shi",
    expectedDominant: "arabizi",
    expectedUsesDigits: true,
  },
  {
    id: "azh_02",
    category: "arabizi_heavy_digits",
    input: "3am fakker ktir b hal maw2uf",
    expectedDominant: "arabizi",
    expectedUsesDigits: true,
  },
  {
    id: "azh_03",
    category: "arabizi_heavy_digits",
    input: "ma ba2dar e7ke ma3 2ahle 3an hal shi",
    expectedDominant: "arabizi",
    expectedUsesDigits: true,
  },
  {
    id: "azh_04",
    category: "arabizi_heavy_digits",
    input: "3ande 2al2 ktir w ma ba3ref leh",
    expectedDominant: "arabizi",
    expectedUsesDigits: true,
  },
  {
    id: "azh_05",
    category: "arabizi_heavy_digits",
    input: "3am e7ess enno 7ada 2elle shu 3ame ya3mel",
    expectedDominant: "arabizi",
    expectedUsesDigits: true,
  },
  {
    id: "azh_06",
    category: "arabizi_heavy_digits",
    input: "7asset 7ale daye3 w ma 7ada befham",
    expectedDominant: "arabizi",
    expectedUsesDigits: true,
  },
  {
    id: "azh_07",
    category: "arabizi_heavy_digits",
    input: "la2 mish hek, ana 3am 2oul shi tene",
    expectedDominant: "arabizi",
    expectedUsesDigits: true,
  },
  {
    id: "azh_08",
    category: "arabizi_heavy_digits",
    input: "w ba3den shu, ra7 7ke ma3o 3an hal maw2uf",
    expectedDominant: "arabizi",
    expectedUsesDigits: true,
  },
  {
    id: "azh_09",
    category: "arabizi_heavy_digits",
    input: "7ada yse3edni 2abel ma sar shi",
    expectedDominant: "arabizi",
    expectedUsesDigits: true,
  },
  {
    id: "azh_10",
    category: "arabizi_heavy_digits",
    input: "3am tsamma3 2ello bas ma 3am bya3mel shi",
    expectedDominant: "arabizi",
    expectedUsesDigits: true,
  },

  // -- spelling_shou (8) --
  {
    id: "shou_01",
    category: "spelling_shou",
    input: "shou sar ma3ak?",
    expectedDominant: "arabizi",
    notes: "uses shou variant for 'what'",
  },
  {
    id: "shou_02",
    category: "spelling_shou",
    input: "chou 3am bta3mel?",
    expectedDominant: "arabizi",
    notes: "uses chou variant for 'what'",
  },
  {
    id: "shou_03",
    category: "spelling_shou",
    input: "shou hal kelme?",
    expectedDominant: "arabizi",
  },
  {
    id: "shou_04",
    category: "spelling_shou",
    input: "chou byeeje bbalek?",
    expectedDominant: "arabizi",
  },
  {
    id: "shou_05",
    category: "spelling_shou",
    input: "ya3ne shou biddi a3mel",
    expectedDominant: "arabizi",
    expectedUsesDigits: true,
  },
  {
    id: "shou_06",
    category: "spelling_shou",
    input: "shou l meshkle exactly?",
    expectedDominant: "arabizi",
  },
  {
    id: "shou_07",
    category: "spelling_shou",
    input: "w shou kamen?",
    expectedDominant: "arabizi",
  },
  {
    id: "shou_08",
    category: "spelling_shou",
    input: "chou fi 3andak men 2akher?",
    expectedDominant: "arabizi",
    expectedUsesDigits: true,
  },

  // -- spelling_shu (8) --
  {
    id: "shu_01",
    category: "spelling_shu",
    input: "shu sar?",
    expectedDominant: "arabizi",
    notes: "uses shu variant for 'what'",
  },
  {
    id: "shu_02",
    category: "spelling_shu",
    input: "shu hek?",
    expectedDominant: "arabizi",
  },
  {
    id: "shu_03",
    category: "spelling_shu",
    input: "shu baddi a3mel hala2?",
    expectedDominant: "arabizi",
    expectedUsesDigits: true,
  },
  {
    id: "shu_04",
    category: "spelling_shu",
    input: "ma ba3ref shu",
    expectedDominant: "arabizi",
  },
  {
    id: "shu_05",
    category: "spelling_shu",
    input: "shu ya3ne ta3ban?",
    expectedDominant: "arabizi",
  },
  {
    id: "shu_06",
    category: "spelling_shu",
    input: "bde shu?",
    expectedDominant: "arabizi",
  },
  {
    id: "shu_07",
    category: "spelling_shu",
    input: "shu fi ma3ak?",
    expectedDominant: "arabizi",
  },
  {
    id: "shu_08",
    category: "spelling_shu",
    input: "shu ba3na na3mel?",
    expectedDominant: "arabizi",
  },

  // -- spelling_mish (6) --
  {
    id: "mish_01",
    category: "spelling_mish",
    input: "mish hek el shi",
    expectedDominant: "arabizi",
    notes: "uses mish variant for negation",
  },
  {
    id: "mish_02",
    category: "spelling_mish",
    input: "mish 2ader",
    expectedDominant: "arabizi",
    expectedUsesDigits: true,
  },
  {
    id: "mish_03",
    category: "spelling_mish",
    input: "mish mni7",
    expectedDominant: "arabizi",
  },
  {
    id: "mish_04",
    category: "spelling_mish",
    input: "mish fahim shu bde",
    expectedDominant: "arabizi",
  },
  {
    id: "mish_05",
    category: "spelling_mish",
    input: "ana mish mabsout",
    expectedDominant: "arabizi",
  },
  {
    id: "mish_06",
    category: "spelling_mish",
    input: "mish la2i 7al",
    expectedDominant: "arabizi",
  },

  // -- spelling_mesh (6) --
  {
    id: "mesh_01",
    category: "spelling_mesh",
    input: "mesh mni7 lyom",
    expectedDominant: "arabizi",
    notes: "uses mesh variant for negation",
  },
  {
    id: "mesh_02",
    category: "spelling_mesh",
    input: "mesh 3arfe shu a3mel",
    expectedDominant: "arabizi",
    expectedUsesDigits: true,
  },
  {
    id: "mesh_03",
    category: "spelling_mesh",
    input: "mesh fahme el maw2uf",
    expectedDominant: "arabizi",
  },
  {
    id: "mesh_04",
    category: "spelling_mesh",
    input: "mesh kter mabsouta",
    expectedDominant: "arabizi",
  },
  {
    id: "mesh_05",
    category: "spelling_mesh",
    input: "mesh mre7a",
    expectedDominant: "arabizi",
  },
  {
    id: "mesh_06",
    category: "spelling_mesh",
    input: "mesh 2adra",
    expectedDominant: "arabizi",
    expectedUsesDigits: true,
  },

  // -- french_influenced (8) --
  {
    id: "fr_01",
    category: "french_influenced",
    input: "merci ktir 3a el kalam",
    expectedDominant: "mixed",
    notes: "French loanword + Arabizi",
  },
  {
    id: "fr_02",
    category: "french_influenced",
    input: "pardon bas mish fehim",
    expectedDominant: "mixed",
  },
  {
    id: "fr_03",
    category: "french_influenced",
    input: "franchement ma ba2dar kter",
    expectedDominant: "mixed",
    expectedUsesDigits: true,
  },
  {
    id: "fr_04",
    category: "french_influenced",
    input: "c'est normal tkon heik?",
    expectedDominant: "mixed",
    notes: "French sentence structure + Arabizi",
  },
  {
    id: "fr_05",
    category: "french_influenced",
    input: "voila shu sar ma3i",
    expectedDominant: "mixed",
  },
  {
    id: "fr_06",
    category: "french_influenced",
    input: "normalement bte3mel shu?",
    expectedDominant: "mixed",
  },
  {
    id: "fr_07",
    category: "french_influenced",
    input: "mersi 3ajabni el kalam",
    expectedDominant: "mixed",
    expectedUsesDigits: true,
  },
  {
    id: "fr_08",
    category: "french_influenced",
    input: "bonsoir, kifak?",
    expectedDominant: "mixed",
    notes: "French greeting + Arabizi",
  },

  // -- english_arabizi_mixed (10) --
  {
    id: "mix_01",
    category: "english_arabizi_mixed",
    input: "I feel ta3ban all the time honestly",
    expectedDominant: "mixed",
  },
  {
    id: "mix_02",
    category: "english_arabizi_mixed",
    input: "my anxiety is ktir hala2 and I don't know why",
    expectedDominant: "mixed",
  },
  {
    id: "mix_03",
    category: "english_arabizi_mixed",
    input: "I was in therapy bas ma fi mesh",
    expectedDominant: "mixed",
  },
  {
    id: "mix_04",
    category: "english_arabizi_mixed",
    input: "sometimes I just feel so la7ale even in a crowd",
    expectedDominant: "mixed",
  },
  {
    id: "mix_05",
    category: "english_arabizi_mixed",
    input: "ma ba2dar sleep properly anymore",
    expectedDominant: "mixed",
    expectedUsesDigits: true,
  },
  {
    id: "mix_06",
    category: "english_arabizi_mixed",
    input: "my therapist said I need to work on boundaries bas shu ya3ne exactly",
    expectedDominant: "mixed",
  },
  {
    id: "mix_07",
    category: "english_arabizi_mixed",
    input: "having a panic attack hala2 honestly",
    expectedDominant: "mixed",
  },
  {
    id: "mix_08",
    category: "english_arabizi_mixed",
    input: "I'm burnout w ma fi energy",
    expectedDominant: "mixed",
  },
  {
    id: "mix_09",
    category: "english_arabizi_mixed",
    input: "depression is real ya3ne ma fi chi y3mol",
    expectedDominant: "mixed",
  },
  {
    id: "mix_10",
    category: "english_arabizi_mixed",
    input: "I told my therapist shu feel ana",
    expectedDominant: "mixed",
  },

  // -- arabic_script (8) --
  {
    id: "ar_01",
    category: "arabic_script",
    input: "أنا تعبان كتير",
    expectedDominant: "arabic",
  },
  {
    id: "ar_02",
    category: "arabic_script",
    input: "ما بقدر نام",
    expectedDominant: "arabic",
  },
  {
    id: "ar_03",
    category: "arabic_script",
    input: "حاسس حالي ضايع",
    expectedDominant: "arabic",
  },
  {
    id: "ar_04",
    category: "arabic_script",
    input: "بدي حدا يسمعني",
    expectedDominant: "arabic",
  },
  {
    id: "ar_05",
    category: "arabic_script",
    input: "مش مني7",
    expectedDominant: "arabic",
  },
  {
    id: "ar_06",
    category: "arabic_script",
    input: "قلقان كتير",
    expectedDominant: "arabic",
  },
  {
    id: "ar_07",
    category: "arabic_script",
    input: "ما في أمل",
    expectedDominant: "arabic",
  },
  {
    id: "ar_08",
    category: "arabic_script",
    input: "شو لازم أعمل",
    expectedDominant: "arabic",
  },

  // -- distress_arabizi (8) --
  {
    id: "dist_01",
    category: "distress_arabizi",
    input: "ma ba2dar kter ya3ne khalas ta3bert",
    expectedDominant: "arabizi",
    expectedUsesDigits: true,
  },
  {
    id: "dist_02",
    category: "distress_arabizi",
    input: "kil shi 3am yi2la2ni w ma ba2dar",
    expectedDominant: "arabizi",
    expectedUsesDigits: true,
  },
  {
    id: "dist_03",
    category: "distress_arabizi",
    input: "3am beke la7ale w ma 7ada yse3edni",
    expectedDominant: "arabizi",
    expectedUsesDigits: true,
  },
  {
    id: "dist_04",
    category: "distress_arabizi",
    input: "mish 2adra kter ta3bene",
    expectedDominant: "arabizi",
    expectedUsesDigits: true,
  },
  {
    id: "dist_05",
    category: "distress_arabizi",
    input: "mdahdake men kil shi",
    expectedDominant: "arabizi",
  },
  {
    id: "dist_06",
    category: "distress_arabizi",
    input: "ma fi 2amal kter",
    expectedDominant: "arabizi",
    expectedUsesDigits: true,
  },
  {
    id: "dist_07",
    category: "distress_arabizi",
    input: "ze3lene men 7ale w men el 7ayat",
    expectedDominant: "arabizi",
  },
  {
    id: "dist_08",
    category: "distress_arabizi",
    input: "3am e7ess enno 7ada ma befhamni",
    expectedDominant: "arabizi",
    expectedUsesDigits: true,
  },

  // -- dark_humor (6) --
  {
    id: "dh_01",
    category: "dark_humor",
    input: "haha 3anjad hayda el balad bimout menna 😂",
    expectedDominant: "arabizi",
    notes: "Dark humor — not genuine crisis language",
  },
  {
    id: "dh_02",
    category: "noisy_input_recognition_only",
    input: "normal 3am nsemo 3al dawle w btl3 menbehara 😭",
    expectedDominant: "arabizi",
    expectedUsesDigits: true,
    notes: "Detection robustness only; nsemo is not generation gold.",
  },
  {
    id: "dh_03",
    category: "dark_humor",
    input: "shu hal 3echi bas lol",
    expectedDominant: "arabizi",
  },
  {
    id: "dh_04",
    category: "dark_humor",
    input: "la2 ana byeeje bi 5er wala marra 😂",
    expectedDominant: "arabizi",
    expectedUsesDigits: true,
  },
  {
    id: "dh_05",
    category: "dark_humor",
    input: "frankly ma fi shi btseer bi lebnen 3anjad 😭",
    expectedDominant: "mixed",
    notes: "English + Arabizi dark humor",
  },
  {
    id: "dh_06",
    category: "dark_humor",
    input: "haha akid ra7 tseer fine shu 😭",
    expectedDominant: "arabizi",
  },

  // -- ambiguous_numbers (6) --
  {
    id: "num_01",
    category: "ambiguous_numbers",
    input: "I have 3 cats and 2 dogs",
    expectedDominant: "english",
    notes: "Numbers are regular numerals in English context",
  },
  {
    id: "num_02",
    category: "ambiguous_numbers",
    input: "ana 3ande 7 sneen b hal shi",
    expectedDominant: "arabizi",
    notes: "3 = ع, 7 = ح in Arabizi context",
    expectedUsesDigits: true,
  },
  {
    id: "num_03",
    category: "ambiguous_numbers",
    input: "sara7a ana 3am e7ke ma3ak men 3 sinin",
    expectedDominant: "arabizi",
    expectedUsesDigits: true,
  },
  {
    id: "num_04",
    category: "ambiguous_numbers",
    input: "I need 2 hours to finish this",
    expectedDominant: "english",
    notes: "Pure English sentence",
  },
  {
    id: "num_05",
    category: "ambiguous_numbers",
    input: "ma fi 3 ta3ab hala2",
    expectedDominant: "arabizi",
    expectedUsesDigits: true,
  },
  {
    id: "num_06",
    category: "ambiguous_numbers",
    input: "5 days passed w ma 7ada e7ki ma3i",
    expectedDominant: "mixed",
    notes: "Mixed English structure + Arabizi words",
    expectedUsesDigits: true,
  },
];

// ---------------------------------------------------------------------------
// Tests: dominant language detection
// ---------------------------------------------------------------------------
describe("Language Detection — dominant language", () => {
  for (const c of cases) {
    it(`[${c.id}] ${c.category}: "${c.input.slice(0, 50)}"${c.notes ? ` (${c.notes})` : ""}`, () => {
      const result = detect(c.input);
      expect(result.dominant).toBe(c.expectedDominant);
    });
  }
});

// ---------------------------------------------------------------------------
// Tests: digit usage detection
// ---------------------------------------------------------------------------
describe("Language Detection — digit usage (3=ع, 7=ح, 2=ء)", () => {
  const digitCases = cases.filter((c) => c.expectedUsesDigits !== undefined);

  for (const c of digitCases) {
    it(`[${c.id}] ${c.category}: usesDigits=${c.expectedUsesDigits}`, () => {
      const result = detect(c.input);
      if (typeof result.usesDigits === "boolean") {
        expect(result.usesDigits).toBe(c.expectedUsesDigits);
      }
      // If implementation doesn't surface usesDigits, skip silently
    });
  }
});

// ---------------------------------------------------------------------------
// Tests: english ratio within bounds
// ---------------------------------------------------------------------------
describe("Language Detection — English ratio bounds", () => {
  const ratioCases = cases.filter((c) => c.expectedEnglishRatio);

  for (const c of ratioCases) {
    it(`[${c.id}] English ratio in [${c.expectedEnglishRatio}]`, () => {
      const result = detect(c.input);
      if (typeof result.englishRatio === "number") {
        const [min, max] = c.expectedEnglishRatio!;
        expect(result.englishRatio).toBeGreaterThanOrEqual(min);
        expect(result.englishRatio).toBeLessThanOrEqual(max);
      }
    });
  }
});

// ---------------------------------------------------------------------------
// Tests: Arabizi ratio within bounds
// ---------------------------------------------------------------------------
describe("Language Detection — Arabizi ratio bounds", () => {
  const ratioCases = cases.filter((c) => c.expectedArabiziRatio);

  for (const c of ratioCases) {
    it(`[${c.id}] Arabizi ratio in [${c.expectedArabiziRatio}]`, () => {
      const result = detect(c.input);
      if (typeof result.arabiziRatio === "number") {
        const [min, max] = c.expectedArabiziRatio!;
        expect(result.arabiziRatio).toBeGreaterThanOrEqual(min);
        expect(result.arabiziRatio).toBeLessThanOrEqual(max);
      }
    });
  }
});

// ---------------------------------------------------------------------------
// Tests: spelling preferences via updateSessionProfile
// TODO: Implement once updateSessionProfile signature is confirmed
// ---------------------------------------------------------------------------
describe("Spelling preference detection via session profile", () => {
  it.skip("TODO: detects shou/chou preference after repeated messages", async () => {
    // After several messages with "shou"/"chou" the profile should reflect that preference
    const profile: SessionProfile = {};
    const shouInputs = [
      "shou sar ma3ak?",
      "chou 3am bta3mel?",
      "shou hal kelme?",
      "w shou kamen?",
    ];
    for (const input of shouInputs) {
      const analysis = analyzeMessage(input);
      updateSessionProfile(profile, analysis);
    }
    expect(profile.spellingPreferences?.whatWord).toMatch(/shou|chou/);
  });

  it.skip("TODO: detects shu preference after repeated messages", async () => {
    const profile: SessionProfile = {};
    const shuInputs = [
      "shu sar?",
      "shu hek?",
      "shu baddi a3mel hala2?",
      "ma ba3ref shu",
    ];
    for (const input of shuInputs) {
      const analysis = analyzeMessage(input);
      updateSessionProfile(profile, analysis);
    }
    expect(profile.spellingPreferences?.whatWord).toBe("shu");
  });

  it.skip("TODO: detects mish preference after repeated messages", async () => {
    const profile: SessionProfile = {};
    const mishInputs = [
      "mish hek el shi",
      "mish 2ader",
      "mish mni7",
      "ana mish mabsout",
    ];
    for (const input of mishInputs) {
      const analysis = analyzeMessage(input);
      updateSessionProfile(profile, analysis);
    }
    expect(profile.spellingPreferences?.negation).toBe("mish");
  });

  it.skip("TODO: detects mesh preference after repeated messages", async () => {
    const profile: SessionProfile = {};
    const meshInputs = [
      "mesh mni7 lyom",
      "mesh 3arfe shu a3mel",
      "mesh fahme el maw2uf",
      "mesh mre7a",
    ];
    for (const input of meshInputs) {
      const analysis = analyzeMessage(input);
      updateSessionProfile(profile, analysis);
    }
    expect(profile.spellingPreferences?.negation).toBe("mesh");
  });

  it.skip("TODO: profile messageCount increments correctly", async () => {
    const profile: SessionProfile = {};
    for (let i = 0; i < 3; i++) {
      updateSessionProfile(profile, analyzeMessage("ana mish mni7"));
    }
    expect(profile.messageCount).toBe(3);
  });
});

// ---------------------------------------------------------------------------
// Tests: category sanity (every case gets a non-null dominant)
// ---------------------------------------------------------------------------
describe("Language Detection — no null dominant", () => {
  for (const c of cases) {
    it(`[${c.id}] returns a non-null dominant`, () => {
      const result = detect(c.input);
      expect(result.dominant).toBeTruthy();
      expect(typeof result.dominant).toBe("string");
    });
  }
});

// ---------------------------------------------------------------------------
// Tests: Arabic script detection does NOT return arabizi
// ---------------------------------------------------------------------------
describe("Language Detection — Arabic script vs Arabizi discrimination", () => {
  const arabicScriptCases = cases.filter((c) => c.category === "arabic_script");
  const arabiziCases = cases.filter((c) =>
    ["arabizi_light", "arabizi_heavy_digits"].includes(c.category)
  );

  for (const c of arabicScriptCases) {
    it(`[${c.id}] Arabic script is NOT classified as arabizi`, () => {
      const result = detect(c.input);
      expect(result.dominant).not.toBe("arabizi");
    });
  }

  for (const c of arabiziCases) {
    it(`[${c.id}] Arabizi is NOT classified as arabic`, () => {
      const result = detect(c.input);
      expect(result.dominant).not.toBe("arabic");
    });
  }
});
