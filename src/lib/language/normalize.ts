import { VARIANT_TO_CANONICAL } from "./lexicon";
import type { LanguageProfile } from "./types";

// Internal word-level Arabizi → English mapping for retrieval paraphrase.
// This is NOT a generation dictionary. Keep it conservative and semantic.
const ARABIZI_TO_ENGLISH: Record<string, string> = {
  // Negation / quantity
  mish: "not", mesh: "not", mech: "not",
  ma: "not/no", wala: "neither/nor",
  ktir: "a lot/very", kteer: "a lot/very",
  shway: "a little", shwayy: "a little",
  kell: "all/every", kelna: "all of us", kellon: "all of them",

  // Emotional states
  ta3ban: "tired/exhausted", te3ban: "tired/exhausted", ta3ben: "tired/exhausted",
  ze3lan: "upset/angry/sad", ze3len: "upset/angry/sad", ze3lene: "upset/angry/sad",
  "7azin": "sad", "7azine": "sad", hazin: "sad",
  mabsout: "happy", mabsouta: "happy",
  mdayya2: "distressed/bothered", mdayya2a: "distressed", mdeye2: "distressed/bothered",
  deye2: "bothered/upset",
  khayef: "afraid/scared", khayfe: "afraid/scared",
  "2al2an": "worried/anxious", "2al2ane": "worried/anxious",
  far7an: "happy/joyful", far7ane: "happy/joyful",
  mhabbes: "trapped/stuck", mhabbas: "trapped",
  wa7dan: "lonely/alone", la7ale: "alone",
  ta2eb: "tired/weary", ta2ebe: "tired/weary",
  zha2an: "bored/fed-up",
  "mish marte7": "uncomfortable",
  marte7: "comfortable/at ease",
  "7asses": "sensitive/feeling",
  "7essessin": "sensitive plural",

  // Want / ability
  baddi: "I want", bade: "I want", badde: "I want", bedde: "I want", biddi: "I want",
  fiyye: "I can", "ma fiyye": "I cannot",
  "ma ba2dar": "I cannot", "mish 2adir": "not able to",
  bdi: "I want to",

  // Question words / discourse
  shu: "what", shou: "what", chou: "what", sho: "what",
  kif: "how", wen: "where", meen: "who", leish: "why", leh: "why",
  ya3ne: "meaning/I mean", ya3ni: "meaning/I mean",
  hek: "like this", heik: "like this",
  khalas: "enough/done/finished",
  yalla: "let's go/come on",
  habibi: "dear/friend",
  bas: "but/only", bass: "but/only",
  "la2an": "because", "la2enno": "because",
  kamen: "also", kaman: "also", kemen: "also",

  // Time
  hala2: "now", halla2: "now", hal2: "now",
  lyom: "today", mbareh: "yesterday", bukra: "tomorrow",
  dayman: "always", abadan: "never",
  "ma 3ad": "no longer",

  // Grammar markers
  "3am": "[progressive]",
  ra7: "[future]",
  eza: "if", iza: "if", lo: "if",

  // Common verbs / actions
  bhiss: "I feel", ba7iss: "I feel", "7asit": "I felt",
  bfakker: "I think", bshouf: "I see",
  bkeb: "crying", bekeb: "crying", kbet: "cried",
  beke: "crying", beki: "crying", bke: "crying", "3am beke": "crying",
  "ma ba3ref": "I don't know", "mish 3arif": "I don't know",
  "mish fahim": "I don't understand",
  b7eb: "I love/like", "ma b7eb": "I don't like",
  bkrah: "I hate",

  // Relationship / social
  hadde: "someone", ma7ada: "no one",
  ahl: "family", jiran: "neighbours",
  sa7beh: "friend", sa7bo: "his friend",
  shi: "something/a thing",
  "kell shi": "everything", "ma fi shi": "nothing",

  // Location
  hon: "here", hnik: "there",

  // Affirmations / negations
  iyeh: "yes", ayye: "yes", "la2": "no",
};

/**
 * Returns a normalised form of the text for internal use only (retrieval, safety).
 * Original user text is NEVER mutated or shown.
 */
export function normalizeArabizi(text: string): string {
  return text
    .split(/\s+/)
    .filter((t) => t.length > 0)
    .map((token) => {
      const lower = token.toLowerCase();
      if (/[a-zA-Z]/.test(lower) && Object.prototype.hasOwnProperty.call(VARIANT_TO_CANONICAL, lower)) {
        return VARIANT_TO_CANONICAL[lower];
      }
      return lower;
    })
    .join(" ");
}

/**
 * Returns a rough English semantic paraphrase of an Arabizi message.
 * Used ONLY for embedding queries against clinical material — never shown to users.
 * Returns null if the text is already predominantly English.
 */
export function toSemanticEnglish(
  text: string,
  profile: Pick<LanguageProfile, "dominantLanguage" | "arabiziRatio">
): string | null {
  if (profile.dominantLanguage === "english" || profile.arabiziRatio < 0.2) {
    return null;
  }

  const words = text.split(/\s+/).filter((w) => w.length > 0);
  const parts: string[] = [];
  let arabiziHits = 0;

  for (const word of words) {
    const lower = word.toLowerCase();
    if (Object.prototype.hasOwnProperty.call(ARABIZI_TO_ENGLISH, lower)) {
      const eng = ARABIZI_TO_ENGLISH[lower];
      arabiziHits++;
      if (!eng.startsWith("[")) parts.push(eng);
    } else if (/^[a-zA-Z'-]+$/.test(word)) {
      parts.push(word);
    }
  }

  if (arabiziHits === 0 || parts.length === 0) return null;
  return parts.join(" ").replace(/\s{2,}/g, " ").trim();
}
