export type {
  DominantLanguage,
  SpellingPreferences,
  LanguageProfile,
  SessionLanguageProfile,
} from "./types";

export { detectLanguage } from "./detect";
export type { DetectResult } from "./detect";

export {
  SPELLING_CLUSTERS,
  VARIANT_TO_CANONICAL,
  CANONICAL_TO_PREF_KEY,
  ARABIZI_FUNCTION_WORDS,
  ENGLISH_CLINICAL_TERMS,
  FRENCH_MARKERS,
} from "./lexicon";

export { normalizeArabizi, toSemanticEnglish } from "./normalize";

export {
  analyzeMessage,
  updateSessionProfile,
  getLanguageInstruction,
  summarizeProfile,
} from "./profile";

export { validateResponse } from "./validate";
export type { ValidationResult, ValidationIssue } from "./validate";
