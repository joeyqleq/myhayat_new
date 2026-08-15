import { detectLanguage } from "./detect";
import { normalizeArabizi, toSemanticEnglish } from "./normalize";
import { VARIANT_TO_CANONICAL, CANONICAL_TO_PREF_KEY } from "./lexicon";
import type { LanguageProfile, SessionLanguageProfile, SpellingPreferences } from "./types";

const EMA_ALPHA = 0.3; // weight for the most recent message

/** Extract which spelling variants the user actually used for tracked clusters. */
function extractSpellingPrefs(text: string): SpellingPreferences {
  const prefs: SpellingPreferences = {};
  const words = text.toLowerCase().split(/\s+/);
  for (const word of words) {
    const canonical = VARIANT_TO_CANONICAL[word];
    if (!canonical) continue;
    const prefKey = CANONICAL_TO_PREF_KEY[canonical];
    if (prefKey) prefs[prefKey] = word;
  }
  return prefs;
}

/**
 * Fully analyse a single message and return a complete LanguageProfile.
 */
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

/** Exponential moving average helper. */
function ema(prev: number, next: number): number {
  return EMA_ALPHA * next + (1 - EMA_ALPHA) * prev;
}

/**
 * Update a session-level profile with a new user message.
 * Recent messages are weighted more heavily (α=0.3 EMA).
 * Pass null as session to create a fresh profile from the first message.
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

  // Merge spelling preferences: most recent occurrence wins
  const spellingPreferences: SpellingPreferences = {
    ...session.spellingPreferences,
    ...msg.spellingPreferences,
  };

  // Merge preserve terms (union)
  const preserveSet = new Set([...session.preserveTerms, ...msg.preserveTerms]);

  return {
    dominantLanguage: msg.dominantLanguage, // use latest message's dominant
    englishRatio: ema(session.englishRatio, msg.englishRatio),
    arabiziRatio: ema(session.arabiziRatio, msg.arabiziRatio),
    arabicRatio: ema(session.arabicRatio, msg.arabicRatio),
    frenchRatio: ema(session.frenchRatio, msg.frenchRatio),
    digitDensity: ema(session.digitDensity, msg.digitDensity),
    spellingPreferences,
    preserveTerms: [...preserveSet],
    semanticEnglish: msg.semanticEnglish,
    // Digit flags: once true, stay true for the session
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
 * Returns a SHORT (2-3 sentence) language directive for the LLM system prompt.
 * Encodes the user's exact dialect style so the model mirrors it precisely.
 */
export function getLanguageInstruction(profile: SessionLanguageProfile): string {
  const {
    dominantLanguage, englishRatio, arabiziRatio, arabicRatio,
    spellingPreferences, uses2, uses3, uses5, uses7, uses8, uses9,
    preserveTerms,
  } = profile;

  if (dominantLanguage === "english" || englishRatio > 0.8) {
    return "Respond in English only. Do not use Arabic script or Arabizi.";
  }

  if (dominantLanguage === "arabic" || arabicRatio > 0.7) {
    return "Respond in Lebanese Arabic script. Do not use Latin Arabizi.";
  }

  if (dominantLanguage === "arabizi" || arabiziRatio > 0.45) {
    const usedDigitList = (
      [uses2 && "2", uses3 && "3", uses5 && "5", uses7 && "7", uses8 && "8", uses9 && "9"] as (string | false)[]
    ).filter(Boolean).join(", ");

    const styleNotes: string[] = [];
    if (spellingPreferences.what) styleNotes.push(`'${spellingPreferences.what}' for what (NOT shu/chou/shou variants)`);
    if (spellingPreferences.not) styleNotes.push(`'${spellingPreferences.not}' for not/negation (NOT mesh/mish variants)`);
    if (spellingPreferences.now) styleNotes.push(`'${spellingPreferences.now}' for now`);
    if (spellingPreferences.want) styleNotes.push(`'${spellingPreferences.want}' for want`);

    let instr = "Respond in Lebanese Arabizi ONLY. No Arabic script. Match the user's exact spellings.";
    if (styleNotes.length > 0) {
      instr += ` IMPORTANT: use ${styleNotes.join("; ")}.`;
    }
    if (usedDigitList) {
      instr += ` Mirror their digit-phoneme usage (${usedDigitList}).`;
    }
    if (preserveTerms.length > 0) {
      instr += ` Keep their English terms unchanged: ${preserveTerms.slice(0, 6).join(", ")}.`;
    }
    return instr;
  }

  // Mixed — explicit enforcement: response MUST contain both languages
  const engPct = Math.round(englishRatio * 100);
  const aziPct = Math.round(arabiziRatio * 100);
  let instr = `MIXED LANGUAGE REQUIRED: your response MUST contain both English words AND Lebanese Arabizi — NOT Arabizi only. Approximate ratio: ${engPct}% English, ${aziPct}% Lebanese Arabizi.`;
  if (preserveTerms.length > 0) {
    instr += ` Keep their English mental-health terms: ${preserveTerms.slice(0, 6).join(", ")}.`;
  }
  return instr;
}

/** Summarise a session profile for logging. Contains no sensitive user content. */
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
