import {
  SPELLING_CLUSTERS,
  NON_LEBANESE_GENERATION_FORMS,
  UNKNOWN_REVIEW_REQUIRED_FORMS,
  KNOWN_CORRUPTED_GENERATION_FORMS,
} from "./lexicon";
import type { SessionLanguageProfile } from "./types";

export interface ValidationIssue {
  type:
    | "script_mismatch"
    | "style_inconsistency"
    | "dialect_contamination"
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
const DIGIT_PHONEME_RE = /[a-zA-Z][2357890]|[2357890][a-zA-Z]/;

function arabicScriptRatio(text: string): number {
  const words = text.split(/\s+/).filter((w) => w.length > 0);
  if (!words.length) return 0;
  const arabicWords = words.filter((w) => ARABIC_RE.test(w));
  return arabicWords.length / words.length;
}

function arabiziRatio(text: string): number {
  const words = text.split(/\s+/).filter((w) => w.length > 0);
  if (!words.length) return 0;
  const arabizi = words.filter((w) => DIGIT_PHONEME_RE.test(w) && LATIN_RE.test(w));
  return arabizi.length / words.length;
}

function latinTokens(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[^a-z0-9']+/)
    .filter(Boolean);
}

function findForbiddenTokens(text: string, set: Set<string>): string[] {
  const seen = new Set<string>();
  for (const token of latinTokens(text)) {
    if (set.has(token)) seen.add(token);
  }
  return [...seen];
}

function countVariantOccurrences(text: string, variants: string[]): Map<string, number> {
  const lower = text.toLowerCase();
  const counts = new Map<string, number>();
  for (const v of variants) {
    const re = new RegExp(`\\b${escapeRe(v.toLowerCase())}\\b`, "g");
    const matches = lower.match(re);
    if (matches) counts.set(v, matches.length);
  }
  return counts;
}

function escapeRe(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function hasRepeatedTokenPattern(text: string): boolean {
  return latinTokens(text).some((token) => /(.{2,4})\1{2,}/i.test(token));
}

function hasRepeatedPhraseLoop(text: string): boolean {
  const words = latinTokens(text);
  if (words.length < 12) return false;

  const seen = new Map<string, number>();
  for (let i = 0; i <= words.length - 3; i++) {
    const gram = words.slice(i, i + 3).join(" ");
    if (gram.length < 10) continue;
    const count = (seen.get(gram) ?? 0) + 1;
    if (count >= 2) return true;
    seen.set(gram, count);
  }
  return false;
}

function looksGibberish(text: string): boolean {
  const qmarks = (text.match(/\?/g) ?? []).length;
  const tokens = text.split(/\s+/).filter(Boolean);
  const punctuationOnly = tokens.filter((t) => t.length <= 2 && !/\w/.test(t)).length;
  const punctuationGarble = qmarks > 4 && punctuationOnly / Math.max(tokens.length, 1) > 0.3;
  return punctuationGarble || hasRepeatedTokenPattern(text);
}

/**
 * Deterministic response gate. This cannot prove that Lebanese grammar is good,
 * but it can stop known dialect contamination, obvious synthetic tokens, script
 * mismatches, prompt leaks, and repetition failures before they reach the user.
 */
export function validateResponse(
  response: string,
  profile: SessionLanguageProfile,
  conversationHistory: string[]
): ValidationResult {
  const issues: ValidationIssue[] = [];

  if (!response || response.trim().length < 5) {
    issues.push({ type: "empty", detail: "Response is empty or too short.", severity: "fatal" });
  }

  if (
    response.includes("{{CONTEXT}}") ||
    /\b(system|assistant|analysis):/i.test(response) ||
    /<\/?(?:think|analysis)>/i.test(response) ||
    /\bthe user (wrote|said)\b/i.test(response)
  ) {
    issues.push({
      type: "prompt_leak",
      detail: "Response contains prompt/reasoning artifacts.",
      severity: "fatal",
    });
  }

  // conversationHistory already contains assistant turns only.
  for (const prior of conversationHistory.slice(-2)) {
    if (prior.trim() && prior.trim() === response.trim()) {
      issues.push({
        type: "loop_detected",
        detail: "Response is identical to a recent assistant message.",
        severity: "fatal",
      });
      break;
    }
  }

  if (hasRepeatedPhraseLoop(response)) {
    issues.push({
      type: "loop_detected",
      detail: "Response repeats the same multi-word phrase within a short answer.",
      severity: "fatal",
    });
  }

  const arRatio = arabicScriptRatio(response);
  const aziRatio = arabiziRatio(response);

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

  if (
    profile.dominantLanguage === "english" &&
    aziRatio > 0.2
  ) {
    issues.push({
      type: "script_mismatch",
      detail: `English-only user received ${(aziRatio * 100).toFixed(0)}% digit-marked Arabizi response.`,
      severity: "fatal",
    });
  }

  if (profile.dominantLanguage === "arabizi" && arRatio > 0.15) {
    issues.push({
      type: "script_mismatch",
      detail: `Arabizi user received ${(arRatio * 100).toFixed(0)}% Arabic-script response.`,
      severity: "fatal",
    });
  }

  if (profile.dominantLanguage === "arabic" && aziRatio > 0.5) {
    issues.push({
      type: "script_mismatch",
      detail: "Arabic-script user received predominantly Latin Arabizi response.",
      severity: "fatal",
    });
  }

  const nonLebanese = findForbiddenTokens(response, NON_LEBANESE_GENERATION_FORMS);
  if (nonLebanese.length > 0) {
    issues.push({
      type: "dialect_contamination",
      detail: `Known non-Lebanese generation forms: ${nonLebanese.join(", ")}.`,
      severity: "fatal",
    });
  }

  if (/\bkol\s+shi\s+7assas\b/i.test(response)) {
    issues.push({
      type: "gibberish",
      detail: "Known incoherent production phrase: kol shi 7assas.",
      severity: "fatal",
    });
  }

  if (profile.dominantLanguage === "arabizi" || profile.dominantLanguage === "mixed") {
    const unknown = findForbiddenTokens(response, UNKNOWN_REVIEW_REQUIRED_FORMS);
    if (unknown.length > 0) {
      issues.push({
        type: "gibberish",
        detail: `Unreviewed generation forms: ${unknown.join(", ")}.`,
        severity: "fatal",
      });
    }

    const corrupted = findForbiddenTokens(response, KNOWN_CORRUPTED_GENERATION_FORMS);
    if (corrupted.length > 0) {
      issues.push({
        type: "gibberish",
        detail: `Known corrupted generation forms: ${corrupted.join(", ")}.`,
        severity: "fatal",
      });
    }
  }

  for (const [prefKey, preferredVariant] of Object.entries(profile.spellingPreferences)) {
    if (!preferredVariant) continue;
    const canonical = Object.keys(SPELLING_CLUSTERS).find(
      (c) => SPELLING_CLUSTERS[c].some((v) => v.toLowerCase() === preferredVariant.toLowerCase())
    );
    if (!canonical) continue;

    const variants = SPELLING_CLUSTERS[canonical];
    const responseCounts = countVariantOccurrences(response, variants);
    if (responseCounts.size === 0) continue;

    const total = [...responseCounts.values()].reduce((a, b) => a + b, 0);
    const preferredCount = [...responseCounts.entries()]
      .filter(([v]) => v.toLowerCase() === preferredVariant.toLowerCase())
      .reduce((sum, [, count]) => sum + count, 0);
    const mismatchRatio = total > 0 ? 1 - preferredCount / total : 0;

    if (mismatchRatio > 0.5) {
      const used = [...responseCounts.entries()]
        .filter(([v]) => v.toLowerCase() !== preferredVariant.toLowerCase())
        .map(([v]) => `'${v}'`)
        .join(", ");
      issues.push({
        type: "style_inconsistency",
        detail: `User prefers '${preferredVariant}' for '${prefKey}' but response uses ${used}.`,
        severity: "warning",
      });
    }
  }

  if (looksGibberish(response)) {
    issues.push({
      type: "gibberish",
      detail: "Response contains an obvious repeated-token or punctuation garble pattern.",
      severity: "fatal",
    });
  }

  const hasFatal = issues.some((i) => i.severity === "fatal");
  return {
    valid: issues.length === 0,
    issues,
    rewriteNeeded: hasFatal,
  };
}
