import { detectLanguage } from "./detect";
import { toSemanticEnglish } from "./normalize";
import {
  VARIANT_TO_CANONICAL,
  CANONICAL_TO_PREF_KEY,
  INPUT_RECOGNITION_ONLY_FORMS,
} from "./lexicon";
import type { LanguageProfile, SessionLanguageProfile, SpellingPreferences } from "./types";

const EMA_ALPHA = 0.3;

/** Extract known spelling variants the user actually used. Unknown/malformed words are ignored. */
function extractSpellingPrefs(text: string): SpellingPreferences {
  const prefs: SpellingPreferences = {};
  const words = text.toLowerCase().split(/\s+/);
  for (const rawWord of words) {
    const word = rawWord.replace(/^[^a-z0-9]+|[^a-z0-9]+$/g, "");
    if (INPUT_RECOGNITION_ONLY_FORMS.has(word)) continue;
    const canonical = VARIANT_TO_CANONICAL[word];
    if (!canonical) continue;
    const prefKey = CANONICAL_TO_PREF_KEY[canonical];
    if (prefKey) prefs[prefKey] = word;
  }
  return prefs;
}

export function analyzeMessage(text: string): LanguageProfile {
  const detected = detectLanguage(text);
  const spellingPreferences = extractSpellingPrefs(text);
  const semanticEnglish = toSemanticEnglish(text, detected);

  return {
    ...detected,
    spellingPreferences,
    semanticEnglish,
  };
}

function ema(prev: number, next: number): number {
  return EMA_ALPHA * next + (1 - EMA_ALPHA) * prev;
}

/**
 * Update a session-level profile with a new user message.
 * Callers that want current-turn language should pass null and only the latest turn.
 */
export function updateSessionProfile(
  session: SessionLanguageProfile | null,
  newMessage: string
): SessionLanguageProfile {
  const msg = analyzeMessage(newMessage);

  if (!session) {
    return {
      ...msg,
      messageCount: 1,
      lastUpdated: Date.now(),
    };
  }

  const spellingPreferences: SpellingPreferences = {
    ...session.spellingPreferences,
    ...msg.spellingPreferences,
  };
  const preserveSet = new Set([...session.preserveTerms, ...msg.preserveTerms]);

  return {
    // The current turn controls the output language. Ratios remain useful as context.
    dominantLanguage: msg.dominantLanguage,
    englishRatio: ema(session.englishRatio, msg.englishRatio),
    arabiziRatio: ema(session.arabiziRatio, msg.arabiziRatio),
    arabicRatio: ema(session.arabicRatio, msg.arabicRatio),
    frenchRatio: ema(session.frenchRatio, msg.frenchRatio),
    digitDensity: ema(session.digitDensity, msg.digitDensity),
    spellingPreferences,
    preserveTerms: [...preserveSet],
    semanticEnglish: msg.semanticEnglish,
    uses2: session.uses2 || msg.uses2,
    uses3: session.uses3 || msg.uses3,
    uses5: session.uses5 || msg.uses5,
    uses7: session.uses7 || msg.uses7,
    uses8: session.uses8 || msg.uses8,
    uses9: session.uses9 || msg.uses9,
    messageCount: session.messageCount + 1,
    lastUpdated: Date.now(),
  };
}

/**
 * Short generation directive. The always-on Lebanese surface guide handles grammar;
 * this function only controls current-turn script/mix and light spelling preferences.
 */
export function getLanguageInstruction(profile: SessionLanguageProfile): string {
  const {
    dominantLanguage,
    spellingPreferences,
    uses2, uses3, uses5, uses7, uses8, uses9,
    preserveTerms,
  } = profile;

  if (dominantLanguage === "english") {
    return "Respond in English only for this turn. Do not switch to Arabizi because earlier messages used it.";
  }

  if (dominantLanguage === "arabic") {
    return "Respond in natural Lebanese Arabic script for this turn. Do not use MSA/Egyptian wording unless the user explicitly asks for it.";
  }

  const digitList = (
    [uses2 && "2", uses3 && "3", uses5 && "5", uses7 && "7", uses8 && "8", uses9 && "9"] as (string | false)[]
  ).filter(Boolean).join(", ");

  const prefs = Object.entries(spellingPreferences)
    .filter(([, value]) => Boolean(value))
    .slice(0, 4)
    .map(([key, value]) => `${key}=${value}`)
    .join(", ");

  const styleBits: string[] = [];
  if (prefs) {
    styleBits.push(`Known valid user spelling preferences: ${prefs}. Mirror them only when natural; never bend grammar to force them.`);
  }
  if (digitList) {
    styleBits.push(`The user uses digit phonemes (${digitList}); match that style lightly.`);
  }
  if (preserveTerms.length > 0) {
    styleBits.push(`Keep these user-chosen English terms unchanged when relevant: ${preserveTerms.slice(0, 6).join(", ")}.`);
  }

  if (dominantLanguage === "arabizi") {
    return [
      "Respond in clear, meaningful Lebanese Arabizi. Correct meaning, syntax, conjugation and agreement are more important than exact spelling mirroring. Never invent Arabizi tokens.",
      ...styleBits,
    ].join(" ");
  }

  return [
    "The current turn is genuinely mixed. Respond with a natural English/Lebanese-Arabizi mix; do not force a numeric ratio or translate every clause. Correct meaning and Lebanese grammar come first.",
    ...styleBits,
  ].join(" ");
}

export function summarizeProfile(profile: SessionLanguageProfile): string {
  const { dominantLanguage, englishRatio, arabiziRatio, arabicRatio, digitDensity, messageCount } = profile;
  const digits = [
    profile.uses2 && "2", profile.uses3 && "3", profile.uses5 && "5",
    profile.uses7 && "7", profile.uses8 && "8", profile.uses9 && "9",
  ].filter(Boolean).join("");
  const prefs = Object.entries(profile.spellingPreferences)
    .map(([k, v]) => `${k}=${v}`)
    .join(" ");
  return (
    `lang=${dominantLanguage} en=${(englishRatio * 100).toFixed(0)}% ` +
    `azi=${(arabiziRatio * 100).toFixed(0)}% ar=${(arabicRatio * 100).toFixed(0)}% ` +
    `digits=${digits || "none"} density=${(digitDensity * 100).toFixed(0)}% ` +
    `msgs=${messageCount} prefs=[${prefs}]`
  );
}
