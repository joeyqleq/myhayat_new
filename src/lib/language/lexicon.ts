// Map from canonical form -> known spelling variants.
// IMPORTANT: this list is for recognition + user spelling mirroring. A variant
// being recognized here does NOT automatically make it safe for generation.
export const SPELLING_CLUSTERS: Record<string, string[]> = {
  // Question words
  shu: ["shu", "shou", "chou", "sho", "chu", "ch"],
  kif: ["kif", "kiff", "keef"],
  kifak: ["kifak", "kifek", "kefak", "kefek", "keefak"],
  wen: ["wen", "wein", "wayn"],
  meen: ["meen", "mene", "min huwe", "min hiye"],
  leish: ["leish", "lesh", "leysho", "laysh"],

  // Negation
  mish: ["mish", "mesh", "mech", "msh"],
  wala: ["wala", "wela", "w wala"],

  // Time
  hala2: ["hala2", "halla2", "hl2", "hal2", "hala"],
  ba3den: ["ba3den", "ba3dein", "ba3d", "ba3ed"],
  abel: ["abel", "abli", "ablel", "2abel"],

  // Quantity / degree
  ktir: ["ktir", "kteer", "kter"],
  shway: ["shway", "shwayy", "chwayy", "chwai"],
  kell: ["kell", "kel", "kil"],

  // Desire / ability
  baddi: ["baddi", "badde", "bade", "bedde", "biddi"],
  fiyye: ["fiyye", "fiye", "fii", "fi"],

  // Quality / emotional
  mnih: ["mnih", "mni7", "mne7", "mni7a", "mnee7"],
  ta3ban: ["ta3ban", "te3ban", "ta3ben", "t3ban"],
  mabsout: ["mabsout", "mabsut", "mabsuot", "mabsoota"],
  ze3lan: ["ze3lan", "ze3len", "ze3lene", "z3lan"],

  // Discourse
  ya3ne: ["ya3ne", "ya3ni", "y3ne", "ye3ne"],
  hek: ["hek", "heik", "hik", "heke"],
  yalla: ["yalla", "yala"],
  khalas: ["khalas", "5alas", "5las", "xalas", "khals"],
  habibi: ["habibi", "7abibi", "habibe", "habibti", "7abibti", "7abib", "habib"],
  la2an: ["la2an", "la2anno", "la2enno", "la2eno", "la2en"],
  bass: ["bass", "bas"],
  kamen: ["kamen", "kaman", "kemen"],

  // Greetings / social
  ahla: ["ahla", "ahlan", "ahleen"],
  marhaba: ["marhaba", "mar7aba", "marHaba", "marHabba"],
  yislem: ["yislem", "yislamo", "yeslam"],
  shukran: ["shukran", "shokran", "shoukran"],

  // Emotions (additional)
  "7azin": ["7azin", "7azine", "hazin", "hazine"],
  khayef: ["khayef", "khayfe", "5ayef", "5ayfe"],
  far7an: ["far7an", "far7ane", "far7en"],
  wa7dan: ["wa7dan", "wa7id", "wa7de"],

  // Grammar markers
  "3am": ["3am", "3em", "am"],
  ra7: ["ra7", "reh", "rah"],
};

/**
 * Common high-confidence Lebanese Arabizi function words that contain no digit
 * phonemes and would otherwise be classified as English. Keep this conservative:
 * this set is for detection, not a dumping ground for uncertain generated forms.
 */
export const ARABIZI_FUNCTION_WORDS = new Set([
  // Pronouns
  "ana", "enta", "ente", "huwwe", "howwe", "hiyye", "ne7na", "ne7ne", "ni7na",
  "ento", "entou", "henne", "hinne",
  // Particles / prepositions
  "w", "bi", "b", "la", "fi", "ma", "la2", "eh", "iyeh",
  "3a", "3al", "3ala", "bel", "bil", "lal", "men", "min",
  // Articles / demonstratives
  "el", "al", "l", "hal", "hayda", "hayde", "haydi", "hol", "hawde",
  // Common nouns / quantifiers
  "shi", "nos", "7adan", "7ada", "nas", "nes", "3alam",
  // Common verbs / connectors
  "sar", "ken", "kenet", "bde", "bdi", "bdak", "bdik", "baddak", "baddik",
  "rja3", "willa", "aw", "nem", "nnam", "kol", "keli", "akel",
  "rou7", "roo7", "ruh", "lezem", "lazem", "tkon", "tekun", "byeeje", "byeeji", "byiji",
  "eza", "iza", "btseer", "ytseer", "btl3", "bimout", "bbalek", "balak",
  "meshkle", "moshkle", "dawle", "balad", "kalam", "3amel", "aamel",
  // Social / discourse
  "lol", "haha", "masha", "nshallah", "inshallah", "wallah", "walla",
  "yaret", "akid", "akeed", "sara7a", "3anjad", "anjad", "normal",
  "halshi", "halshee",
  // Geographic / cultural markers
  "lbnan", "lebnen", "beirut",
  // Common attached forms
  "menna", "menno", "meno", "menha",
]);

/**
 * Small allowlist for generation guidance and tests. This is deliberately not a
 * complete dictionary: absence here does not prove a form is wrong. It only
 * records forms backed by the owner fixture or the compact surface guide.
 */
export const VERIFIED_GENERATION_FORMS = new Set([
  "ana", "enta", "ente", "huwwe", "hiyye", "ne7na", "ento", "henne",
  "shu", "shou", "kif", "leh", "leish", "wen", "emta", "meen", "adde", "2adde",
  "ma", "mish", "mesh", "3am", "ra7", "7a",
  "baddi", "badde", "bade", "baddak", "baddik", "baddo", "baddna",
  "fiyye", "fik", "fina", "fiyon",
  "ya3ne", "bas", "hek", "hala2", "halla2", "3anjad", "kamen", "kemen",
  "shway", "ktir", "kelna", "kellon", "7asses", "7essessin", "beb", "deye2",
]);

/**
 * Noisy spellings that remain useful for input understanding but are not
 * eligible spelling preferences for generated replies until native review.
 */
export const INPUT_RECOGNITION_ONLY_FORMS = new Set([
  "ch", "msh", "hl2", "5las", "xalas", "t3ban",
]);

/**
 * Forms that My Hayat should understand if encountered, but should not generate
 * when it is trying to sound Lebanese. These are high-signal Egyptian/non-Lebanese
 * forms that previously leaked into production output.
 */
export const NON_LEBANESE_GENERATION_FORMS = new Set([
  "feen", "ezzay", "ezay", "izzay", "keda", "kedah",
  "3ayez", "3ayza", "ayez", "ayza",
  "e7na", "ehna", "homma", "humma", "hena",
  "kollohom", "kolluhom",
]);

/**
 * Known contaminated / synthetic-looking tokens that appeared in the old language
 * layer or production regressions. Treat these as fatal if generated.
 */
export const UNKNOWN_REVIEW_REQUIRED_FORMS = new Set([
  "nfamela", "nfa3el", "za7rat", "nsemo",
]);

/** Production-confirmed meaningless/corrupted output, always fatal. */
export const KNOWN_CORRUPTED_GENERATION_FORMS = new Set([
  "knesbi", "sa7a7a7a",
]);

/** Backward-compatible union for existing consumers. */
export const SUSPECT_GENERATION_FORMS = new Set([
  ...UNKNOWN_REVIEW_REQUIRED_FORMS,
  ...KNOWN_CORRUPTED_GENERATION_FORMS,
]);

/** Reverse map: variant spelling -> canonical form. Built at module init. */
export const VARIANT_TO_CANONICAL: Record<string, string> = {};
for (const [canonical, variants] of Object.entries(SPELLING_CLUSTERS)) {
  for (const variant of variants) {
    VARIANT_TO_CANONICAL[variant.toLowerCase()] = canonical;
  }
}

/** Maps canonical cluster -> SpellingPreferences key for profile tracking. */
export const CANONICAL_TO_PREF_KEY: Record<string, string> = {
  shu: "what",
  mish: "not",
  hala2: "now",
  baddi: "want",
  ktir: "very",
  mnih: "good",
};

export const ENGLISH_CLINICAL_TERMS = new Set([
  "anxiety", "anxious", "panic", "panicking",
  "depression", "depressed", "depressing",
  "trauma", "traumatized", "traumatic",
  "therapy", "therapist", "therapeutic",
  "burnout", "stress", "stressed", "stressful",
  "triggers", "trigger", "triggered",
  "ocd", "ptsd", "bipolar", "schizophrenia", "adhd",
  "insomnia", "sleep",
  "boundaries", "boundary",
  "toxic", "toxicity",
  "gaslighting", "gaslit",
  "manipulation", "manipulative",
  "abuse", "abusive",
  "medication", "meds", "antidepressant", "antidepressants",
  "mood", "episode", "episodes",
  "grief", "grieving",
  "self-esteem", "confidence",
  "mindfulness", "meditation",
  "healing", "recovery",
  "support", "coping",
]);

export const FRENCH_MARKERS = new Set([
  "merci", "mersi", "pardon",
  "cest", "c'est", "cava", "ca", "va",
  "bonjour", "bonsoir", "voila", "daccord", "franchement",
  "normalement", "exactement", "malheureusement", "quand", "meme",
]);
