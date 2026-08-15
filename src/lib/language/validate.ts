import { detectLanguage } from "./detect";
import { SPELLING_CLUSTERS } from "./lexicon";
import type { SessionLanguageProfile } from "./types";

export interface ValidationIssue {
  type:
    | "script_mismatch"
    | "style_inconsistency"
    | "gibberish"
    | "empty"
    | "prompt_leak"
    | "loop_detected";
  detail: string;
  severity: "fatal" | "warning";
}

export interface ValidationResult {
  valid: boolean;
  issues: ValidationIssue[];
  rewriteNeeded: boolean;
}

const ARABIC_RE = /[؀-ۿ]/;
const LATIN_RE = /[a-zA-Z]/;
// Digit phoneme embedded in a word
const DIGIT_PHONEME_RE = /[a-zA-Z][2357890]|[2357890][a-zA-Z]/;

/** Rough Arabic-script ratio in a response (by character proportion in words). */
function arabicScriptRatio(text: string): number {
  const words = text.split(/\s+/).filter((w) => w.length > 0);
  if (!words.length) return 0;
  const arabicWords = words.filter((w) => ARABIC_RE.test(w));
  return arabicWords.length / words.length;
}

/** Rough Arabizi ratio in a response (words with embedded digit-phonemes or in lexicon variants). */
function arabiziRatio(text: string): number {
  const words = text.split(/\s+/).filter((w) => w.length > 0);
  if (!words.length) return 0;
  const arabizi = words.filter((w) => DIGIT_PHONEME_RE.test(w) && LATIN_RE.test(w));
  return arabizi.length / words.length;
}

/** Count occurrences of a cluster variant set in text. */
function countVariantOccurrences(text: string, variants: string[]): Map<string, number> {
  const lower = text.toLowerCase();
  const counts = new Map<string, number>();
  for (const v of variants) {
    const re = new RegExp(`\\b${escapeRe(v)}\\b`, "g");
    const matches = lower.match(re);
    if (matches) counts.set(v, matches.length);
  }
  return counts;
}

function escapeRe(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Heuristic: high gibberish = many question-marks AND many short non-word tokens. */
function looksGibberish(text: string): boolean {
  const qmarks = (text.match(/\?/g) ?? []).length;
  const tokens = text.split(/\s+/);
  const shortGarbled = tokens.filter((t) => t.length <= 2 && !/\w/.test(t)).length;
  return qmarks > 4 && shortGarbled / Math.max(tokens.length, 1) > 0.4;
}

/**
 * Validate that a generated response matches the expected language profile.
 * Rule violations are collected as issues; any fatal issue sets rewriteNeeded=true.
 */
export function validateResponse(
  response: string,
  profile: SessionLanguageProfile,
  conversationHistory: string[]
): ValidationResult {
  const issues: ValidationIssue[] = [];

  // Rule 4 — empty / too short
  if (!response || response.trim().length < 5) {
    issues.push({ type: "empty", detail: "Response is empty or too short.", severity: "fatal" });
  }

  // Rule 5 — prompt leak
  if (response.includes("{{CONTEXT}}") || /\bsystem:/i.test(response)) {
    issues.push({
      type: "prompt_leak",
      detail: "Response contains prompt template artifacts.",
      severity: "fatal",
    });
  }

  // Rule 6 — loop detection (identical to either of the last 2 assistant turns)
  const recentAssistant = conversationHistory
    .filter((_, i) => i % 2 === 1)
    .slice(-2);
  for (const prior of recentAssistant) {
    if (prior.trim() === response.trim()) {
      issues.push({
        type: "loop_detected",
        detail: "Response is identical to a recent assistant message.",
        severity: "fatal",
      });
      break;
    }
  }

  const arRatio = arabicScriptRatio(response);
  const aziRatio = arabiziRatio(response);

  // Rule 1 — English-only profile gets Arabic script
  if (
    (profile.dominantLanguage === "english" || profile.englishRatio > 0.8) &&
    arRatio > 0.1
  ) {
    issues.push({
      type: "script_mismatch",
      detail: `English-only user received ${(arRatio * 100).toFixed(0)}% Arabic-script response.`,
      severity: "fatal",
    });
  }

  // Rule 2 — Arabizi profile gets >30% Arabic script
  if (profile.dominantLanguage === "arabizi" && arRatio > 0.3) {
    issues.push({
      type: "script_mismatch",
      detail: `Arabizi user received ${(arRatio * 100).toFixed(0)}% Arabic-script response.`,
      severity: "fatal",
    });
  }

  // Rule 3 — Arabic-script profile gets Latin Arabizi response
  if (profile.dominantLanguage === "arabic" && aziRatio > 0.5) {
    issues.push({
      type: "script_mismatch",
      detail: `Arabic-script user received predominantly Latin Arabizi response.`,
      severity: "fatal",
    });
  }

  // Rule 7 — style inconsistency: user's spelling preference ignored in response
  for (const [prefKey, preferredVariant] of Object.entries(profile.spellingPreferences)) {
    if (!preferredVariant) continue;
    // Find the canonical cluster for this pref key
    const canonical = Object.keys(SPELLING_CLUSTERS).find(
      (c) => SPELLING_CLUSTERS[c].includes(preferredVariant)
    );
    if (!canonical) continue;

    const variants = SPELLING_CLUSTERS[canonical];
    const responseCounts = countVariantOccurrences(response, variants);
    if (responseCounts.size === 0) continue;

    const total = [...responseCounts.values()].reduce((a, b) => a + b, 0);
    const preferredCount = responseCounts.get(preferredVariant) ?? 0;
    const mismatchRatio = total > 0 ? 1 - preferredCount / total : 0;

    if (mismatchRatio > 0.5) {
      const used = [...responseCounts.entries()]
        .filter(([v]) => v !== preferredVariant)
        .map(([v]) => `'${v}'`)
        .join(", ");
      issues.push({
        type: "style_inconsistency",
        detail: `User prefers '${preferredVariant}' for '${prefKey}' but response uses ${used}.`,
        severity: "warning",
      });
    }
  }

  // Rule 8 — gibberish heuristic
  if (looksGibberish(response)) {
    issues.push({
      type: "gibberish",
      detail: "Response has abnormally high question-mark and garbled-token density.",
      severity: "warning",
    });
  }

  const hasFatal = issues.some((i) => i.severity === "fatal");
  return {
    valid: issues.length === 0,
    issues,
    rewriteNeeded: hasFatal,
  };
}
