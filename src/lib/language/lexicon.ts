// Map from canonical form -> known spelling variants (corpus-derived, high-signal clusters)
export const SPELLING_CLUSTERS: Record<string, string[]> = {
  // Question words
  shu: ["shu", "shou", "chou", "sho", "chu", "ch"],
  kif: ["kif", "kiff", "keef"],
  kifak: ["kifak", "kifek", "kefak", "kefek", "keefak"],
  wen: ["wen", "wein", "wayn", "feen", "fin"],
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
  ktir: ["ktir", "kteer", "kter", "kteer"],
  shway: ["shway", "shwayy", "chwayy", "chwai", "shway"],
  kell: ["kell", "kel", "kil", "kill"],

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
  yalla: ["yalla", "yala", "ya2la"],
  khalas: ["khalas", "5alas", "5las", "xalas", "khals"],
  habibi: ["habibi", "7abibi", "habibe", "habibti", "7abibti", "7abib", "habib"],
  la2an: ["la2an", "la2anno", "la2enno", "la2eno", "la2en"],
  bass: ["bass", "bas"],
  kameh: ["kameh", "kaman", "kemen"],

  // Greetings / social
  ahla: ["ahla", "ahlan", "ahleen"],
  marhaba: ["marhaba", "mar7aba", "marHaba", "marHabba"],
  yislem: ["yislem", "yislamo", "yeslam"],
  shukran: ["shukran", "shokran", "shoukran"],

  // Emotions (additional)
  "7azin": ["7azin", "7azine", "hazin", "hazine"],
  khayef: ["khayef", "khayfe", "5ayef", "5ayfe"],
  far7an: ["far7an", "far7ane", "far7en"],
  wa7dan: ["wa7dan", "wa7dan", "wa7id", "wa7de"],

  // Grammar markers
  "3am": ["3am", "3em", "am"],
  ra7: ["ra7", "reh", "rah"],
};

/**
 * Common Arabizi function words that contain no digit phonemes and would
 * otherwise be misclassified as English by the detector.
 * These are particles, pronouns, prepositions and very common nouns/verbs.
 */
export const ARABIZI_FUNCTION_WORDS = new Set([
  // Pronouns
  "ana", "enta", "ente", "huwwe", "hiyye", "ne7na", "ne7ne", "ni7na",
  "ento", "entou", "henne", "hinne",
  // Particles / prepositions
  "w", "bi", "b", "la", "fi", "ma", "la2", "eh", "iyeh",
  "3a", "3al", "3ala", "bel", "bil", "lal", "men", "min",
  // Articles / demonstratives
  "el", "al", "l", "hal", "hayda", "hayde",
  // Common nouns
  "shi", "kil", "kel", "kell", "shi", "nos",
  "7adan", "7ada", "nas", "nes", "3alam",
  // Common verbs / connectors
  "sar", "ken", "kenet", "bde", "bdi", "bdak", "bdik",
  "rja3", "willa", "aw", "za7rat",
  "nem", "nom", "nen", "nnam",  // sleep
  "kol", "keli", "akel",        // eat
  "rou7", "roo7", "ruh",        // go
  "lezem", "lazem", "tkon", "tekun", "byeeje", "byeeji", "byiji",
  "nsemo", "nsemo", "esa", "eza", "iza",
  "btseer", "ytseer", "btl3", "btl3", "bimout",
  "bbalek", "balak", "meshkle", "moshkle",
  "dawle", "balad", "akel", "kalam",
  "nfamela", "nfa3el", "3amel", "aamel",
  // Social / discourse
  "lol", "haha", "masha", "nshallah", "inshallah", "wallah", "walla",
  "yaret", "akid", "akeed", "sara7a", "3anjad", "anjad",
  "normal", // common as Arabizi usage ("normal sar")
  "halshi", "halshee",  // "this thing" contraction
  // Geographic / cultural markers
  "lbnan", "lebnen", "beirut", "lebnen",
  // Common suffixes / attached words often misclassified
  "menna", "menno", "meno", "menha",
]);

/** Reverse map: variant spelling -> canonical form. Built at module init. */
export const VARIANT_TO_CANONICAL: Record<string, string> = {};
for (const [canonical, variants] of Object.entries(SPELLING_CLUSTERS)) {
  for (const variant of variants) {
    VARIANT_TO_CANONICAL[variant] = canonical;
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
  "merci", "mersi",
  "pardon",
  "cest", "c'est", "cava", "ca", "va",
  "bonjour", "bonsoir",
  "voila",
  "daccord",
  "franchement",
  "normalement",
  "exactement",
  "malheureusement",
  "quand", "meme",
]);
