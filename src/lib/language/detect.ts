import { VARIANT_TO_CANONICAL, ARABIZI_FUNCTION_WORDS, ENGLISH_CLINICAL_TERMS, FRENCH_MARKERS } from "./lexicon";
import type { DominantLanguage, LanguageProfile } from "./types";

const ARABIC_RE = /[؀-ۿ]/;
const DIGIT_PHONEMES = ["2", "3", "5", "7", "8", "9"] as const;
type DigitPhoneme = (typeof DIGIT_PHONEMES)[number];

/** True if a word contains a digit phoneme adjacent to at least one letter. */
function hasEmbeddedDigit(word: string, digit: string): boolean {
  let idx = word.indexOf(digit);
  while (idx !== -1) {
    const before = idx > 0 && /[a-zA-Z]/.test(word[idx - 1]);
    const after = idx < word.length - 1 && /[a-zA-Z]/.test(word[idx + 1]);
    if (before || after) return true;
    idx = word.indexOf(digit, idx + 1);
  }
  return false;
}

function hasAnyEmbeddedDigit(word: string): boolean {
  return DIGIT_PHONEMES.some((d) => hasEmbeddedDigit(word, d));
}

type WordClass = "arabic" | "arabizi" | "english" | "french" | "other";

function classifyWord(word: string): WordClass {
  if (!word) return "other";

  // Arabic script takes priority
  if (ARABIC_RE.test(word)) return "arabic";

  const lower = word.toLowerCase();

  // Digit-phoneme embedded → Arabizi
  if (hasAnyEmbeddedDigit(word)) return "arabizi";

  // Known Arabizi word (any variant in the lexicon)
  if (Object.prototype.hasOwnProperty.call(VARIANT_TO_CANONICAL, lower)) return "arabizi";

  // Common Arabizi function word (no digit phoneme but clearly Arabizi)
  if (ARABIZI_FUNCTION_WORDS.has(lower)) return "arabizi";

  // French markers
  if (FRENCH_MARKERS.has(lower)) return "french";

  // English clinical terms (user chose to use English for these)
  if (ENGLISH_CLINICAL_TERMS.has(lower)) return "english";

  // All Latin → English by default
  if (/^[a-zA-Z''-]+$/.test(word)) return "english";

  return "other";
}

/** Tokenise text, preserving digit-phoneme context within words. */
function tokenise(text: string): string[] {
  return text
    .split(/\s+/)
    .map((w) => w.replace(/^[^\w؀-ۿ2357890]+|[^\w؀-ۿ2357890]+$/g, ""))
    .filter((w) => w.length > 0);
}

export type DetectResult = Pick<
  LanguageProfile,
  | "dominantLanguage"
  | "englishRatio"
  | "arabiziRatio"
  | "arabicRatio"
  | "frenchRatio"
  | "digitDensity"
  | "uses2"
  | "uses3"
  | "uses5"
  | "uses7"
  | "uses8"
  | "uses9"
  | "preserveTerms"
> & {
  // Alias for eval suite compatibility
  dominant: DominantLanguage;
  usesDigits: boolean;
};

/**
 * Detect dominant language and character ratios from a single message.
 * Does not mutate the input.
 */
export function detectLanguage(text: string): DetectResult {
  const words = tokenise(text);

  const empty: DetectResult = {
    dominantLanguage: "english",
    englishRatio: 0,
    arabiziRatio: 0,
    arabicRatio: 0,
    frenchRatio: 0,
    digitDensity: 0,
    uses2: false,
    uses3: false,
    uses5: false,
    uses7: false,
    uses8: false,
    uses9: false,
    preserveTerms: [],
  };

  if (words.length === 0) return empty;

  const counts: Record<WordClass, number> = {
    arabic: 0, arabizi: 0, english: 0, french: 0, other: 0,
  };
  const usedDigits: Record<DigitPhoneme, boolean> = {
    "2": false, "3": false, "5": false, "7": false, "8": false, "9": false,
  };
  const preserveSet = new Set<string>();
  let digitWordCount = 0;

  for (const word of words) {
    const lower = word.toLowerCase();
    counts[classifyWord(word)]++;

    if (ENGLISH_CLINICAL_TERMS.has(lower)) preserveSet.add(word);

    let wordHasDigit = false;
    for (const d of DIGIT_PHONEMES) {
      if (hasEmbeddedDigit(word, d)) {
        usedDigits[d] = true;
        wordHasDigit = true;
      }
    }
    if (wordHasDigit) digitWordCount++;
  }

  const n = words.length;
  const englishRatio = counts.english / n;
  const arabiziRatio = counts.arabizi / n;
  const arabicRatio = counts.arabic / n;
  const frenchRatio = counts.french / n;

  // Dominant: pick highest, fall back to "mixed" for code-switching patterns
  type Candidate = [DominantLanguage, number];
  const ranked: Candidate[] = (
    [
      ["english", englishRatio],
      ["arabizi", arabiziRatio],
      ["arabic", arabicRatio],
    ] as Candidate[]
  ).sort((a, b) => b[1] - a[1]);

  const [topLang, topRatio] = ranked[0];
  const secondRatio = ranked[1][1];
  let dominantLanguage: DominantLanguage;

  // French present + any other language = Lebanese code-switch → mixed
  if (frenchRatio > 0.05 && (arabiziRatio > 0 || englishRatio > 0.2)) {
    dominantLanguage = "mixed";
  // English dominant but any Arabizi present = Lebanese code-switching → mixed
  } else if (englishRatio > 0.5 && arabiziRatio > 0) {
    dominantLanguage = "mixed";
  // Standard mixed: top two languages too close to call
  } else if (topRatio < 0.3) {
    dominantLanguage = "mixed";
  } else if (topRatio - secondRatio < 0.2 && secondRatio > 0.15) {
    dominantLanguage = "mixed";
  } else {
    dominantLanguage = topLang;
  }

  return {
    dominantLanguage,
    dominant: dominantLanguage,   // alias for consumer convenience
    englishRatio,
    arabiziRatio,
    arabicRatio,
    frenchRatio,
    digitDensity: digitWordCount / n,
    usesDigits: digitWordCount > 0,
    uses2: usedDigits["2"],
    uses3: usedDigits["3"],
    uses5: usedDigits["5"],
    uses7: usedDigits["7"],
    uses8: usedDigits["8"],
    uses9: usedDigits["9"],
    preserveTerms: [...preserveSet],
  };
}
