import type { SafetyCategory, SafetyResult } from "./types";
import { CRISIS_CONFIG } from "./config";

// ---------------------------------------------------------------------------
// Pattern tables — lower-cased; Arabic script matched directly
// ---------------------------------------------------------------------------

const CRISIS_PATTERNS: string[] = [
  // English
  "kill myself", "killing myself", "want to die", "suicide", "suicidal",
  "end my life", "take my life", "end it all", "no reason to live",
  "don't want to be alive", "dont want to be alive", "can't go on living",
  "what's the point in living", "whats the point in living",
  "no point in living", "no point being alive", "not worth living",
  "i don't want to exist", "i dont want to exist",
  "better off dead", "better off without me",
  "nobody would miss me", "no one would miss me", "no one would miss me if",
  "going to end it", "end it tonight", "end it all tonight",
  "i'm done with life", "im done with life",
  // Arabizi
  "bade met", "badde met", "bade mout", "badde mout",
  "bade khabbe 7ale", "bade khabbi 7ali",
  "ma bade 3ayesh", "mabade 3ayesh", "ma bde 3ayesh",
  "bade inhar", "badde inhar", "rah inhar", "ra7 inhar", "rah thar7ani",
  "bade nhar", "badde nhar", "ra7 nhar", "rah nhar",
  "bade rouh w ma rja3", "bade roo7 w ma rja3", "badde rouh w ma",
  "ma fi da3i ta3ayesh", "ma fi da3i kter",
  "3am fakker bi intihar", "3am fakker bel intihar",
  // Arabic script
  "أريد الموت", "انتحار", "أقتل نفسي", "لا أريد أن أعيش",
  "نهاية حياتي", "بدي موت", "بدي انتحر", "ما بدي عيش",
];

// Method + self-reference compounds → crisis
const METHOD_TERMS: string[] = [
  "pills", "overdose", "gun", "knife", "blade", "razor", "rope",
  "jump from", "jump off", "bridge", "hanging", "wrists",
  "حبوب", "سكين", "حبل",
];
const SELF_TERMS: string[] = [
  "myself", "7ale", "7ali", "nefse", "nafse", "rouhi", "rou7i",
  "them all", "all of them", "take all", "taking all",  // "pills...taking them all"
  "نفسي", "حالي", "روحي",
];

const HIGH_DISTRESS_PATTERNS: string[] = [
  // English
  "can't take it anymore", "cannot take it anymore", "cant take it anymore",
  "can't take this anymore", "cannot take this anymore", "cant take this anymore",
  "hopeless", "no hope", "no point", "what's the point", "whats the point",
  "nobody cares", "no one cares",
  "nobody understands", "no one understands", "nobody gets me", "no one gets me",
  "hurt myself", "cutting myself", "self harm", "self-harm",
  "i feel like giving up", "feel like giving up", "want to give up",
  "just want this to stop", "want it all to stop", "want everything to stop",
  "so tired of feeling", "tired of feeling this way", "tired of this pain",
  "i hate everything", "hate everything", "hate myself",
  "nothing helps", "nothing works", "nothing gets better",
  "can't breathe", "cant breathe", "can't stop shaking",
  "panic attack", "having a panic attack", "heart is racing", "heart racing",
  "heart pounding", "can't calm down", "cant calm down",
  // Arabizi
  "ma ba2dar kter", "ma ba2der kter", "ma ba2dar 3ayesh",
  "ma 2adra kter", "mish 2adra kter", "mesh 2adra kter",
  "mesh 2adre kter", "mish 2adre kter", "mesh 2adre", "mish 2adre",
  "mdahdake", "mdahdak men", "mdahdaka",
  "ma fi 2amal", "ma fi emal", "mafi amal",
  "ma 7ada byehtemm", "ma 7ada byehtemli", "ma 7ada yehmmo",
  "ma 7ada befhamni", "la7ale", "la 7ale",
  "bas 3alam", "ardi 7ale", "kser 7ale",
  "khalas ta3bert", "khalas ta3bene", "khalas mab2a 2ader",
  "waja3 bi sadre", "2albi 3am yda2", "2albe 3am yda2",
  // Arabic script
  "لا أستطيع أكثر", "لا أمل", "لا أحد يهتم", "أؤذي نفسي",
  "لا أحد يفهمني", "لا يهتم أحد",
];

const EMOTIONAL_DISTRESS_PATTERNS: string[] = [
  // Arabizi
  "ta3ban ktir", "ta3bane ktir", "ta3be ktir",
  "ta3ban men", "ta3bane men", "ta3ban kter",
  "ta3ban", "ta3bane",  // standalone — any ta3ban is at minimum distress
  "mdahdah", "mdahdaha", "mdahdak", "mdahdake",
  "ze3lan", "ze3lana", "ze3len", "ze3lene",
  "khayef", "khayfe", "khayyfeen",
  "mdayya2", "mdayya2a", "mdayye2",
  "mta3ban", "mta3bane",
  "2albeh bi2a", "2albe bi2a", "kalbe bi2a",
  "mish mni7", "mish mnih", "mesh mni7", "mesh mnih",
  "3am beke", "beke kter", "beke ktir",
  "3am e7ess bi 2al2", "3am 7ess bi 2al2",
  "mdahdah", "mdahdaha",
  "mdayya2 ktir", "ze3len ktir",
  // English distress markers
  "i'm broken", "im broken", "falling apart", "can't cope", "cant cope",
  "exhausted", "overwhelmed", "burned out", "burnt out",
  "feel so alone", "feeling alone", "feel alone",
  "feel empty", "feeling empty", "i feel empty",
  "devastated", "heartbroken", "shattered",
  "anxious", "anxiety is", "feel anxious",
  "don't feel like myself", "dont feel like myself", "not myself",
  "miss who i", "miss who i used to be",
  "really hard week", "hard time lately", "rough week", "rough day",
  "crying all", "cry myself", "can't stop crying", "cant stop crying",
  "i've been crying", "ive been crying", "been crying",
  "can't sleep", "cant sleep", "not sleeping",
  "lost someone", "someone died", "he left me", "she left me",
  "broke up", "breaking up", "divorced",
  "my relationship ended",
  "work is making me", "work stress", "work anxiety",
  "i had a really", "really bad day", "really bad week",
  // Arabic script
  "تعبان كتير", "محطم", "زعلان", "خايف", "مدمر", "مضايق",
  "قلق كتير", "بكي كتير", "مش مني7",
];

const MEDICAL_PATTERNS: string[] = [
  // Chest pain + breathing
  "chest pain", "chest hurts", "chest is tight",
  "can't breathe", "cannot breathe", "cant breathe",
  "وجع بالصدر", "ما قادر تنفس",
];

const ABUSE_PATTERNS: string[] = [
  // Arabizi
  "bijrabni", "bi2arrebni", "bydarbo", "bydarbuni",
  "by2ozone", "by2azebni", "byezlimni",
  // English — broader patterns
  "hits me", "hit me", "beats me", "beat me", "kicked me",
  "being abused", "physical abuse", "domestic violence",
  "hurts me on purpose", "threatens me", "threatening me",
  "scared of someone", "unsafe at home", "unsafe at home",
  "feel unsafe", "not safe at home", "not safe here",
  "someone in my house", "in my home",
  "partner abuses", "abusive partner", "abusive relationship",
  // Arabic script
  "بيضربني", "بيأذيني", "عنف", "يضربني", "يؤذيني",
];

// ---------------------------------------------------------------------------
// Helper: collect matching terms from a pattern list
// ---------------------------------------------------------------------------

function matchTerms(lower: string, patterns: string[]): string[] {
  return patterns.filter(p => lower.includes(p));
}

function hasMethodPlusSelf(lower: string): boolean {
  return METHOD_TERMS.some(m => lower.includes(m)) &&
    SELF_TERMS.some(s => lower.includes(s));
}

// Medical emergency: chest-pain + breathing signal + (optionally arm pain = cardiac triad)
function isMedicalEmergency(lower: string): boolean {
  const chestPain = [
    "chest pain", "chest hurts", "chest is tight", "chest tightness",
    "وجع بالصدر", "ألم الصدر",
  ].some(p => lower.includes(p));
  const breathingSignal = [
    "can't breathe", "cannot breathe", "cant breathe",
    "shortness of breath", "short of breath", "difficulty breathing",
    "hard to breathe", "ما قادر تنفس",
  ].some(p => lower.includes(p));
  // Cardiac triad: chest pain + breathing + arm/jaw (even without explicit breathing complaint)
  const armPain = ["arm pain", "arm hurts", "left arm", "jaw pain"].some(p => lower.includes(p));
  return chestPain && (breathingSignal || armPain);
}

// ---------------------------------------------------------------------------
// Response guidance strings
// ---------------------------------------------------------------------------

const GUIDANCE: Record<SafetyCategory, string> = {
  crisis: `CRISIS MODE: Acknowledge pain directly. Ask one clear safety question. Provide ${CRISIS_CONFIG.lifelineName} ${CRISIS_CONFIG.lifelineNumber}. Short, calm, non-euphemistic.`,
  immediate_danger: `CRISIS MODE: Acknowledge pain directly. Ask one clear safety question. Provide ${CRISIS_CONFIG.lifelineName} ${CRISIS_CONFIG.lifelineNumber}. Short, calm, non-euphemistic.`,
  high_distress: "High distress: Respond with 2-3 short sentences. Acknowledge fully. Ask one useful question unless the user explicitly requests immediate coping help. Do not automatically prescribe breathing or grounding.",
  possible_self_harm: "High distress: Respond with 2-3 short sentences. Acknowledge fully. Ask one clear safety-oriented question. Do not automatically prescribe an exercise.",
  emotional_distress: "Emotional distress: Warm, brief. Acknowledge before anything else. Ask one follow-up.",
  medical_emergency: "Medical emergency: Stay calm, ask if they can call for help immediately. Keep response very short.",
  abuse_violence: "Abuse/violence: Validate safety concern, ask if they are safe right now, provide support without pressuring.",
  normal: "Normal conversation. Warm, supportive, concise.",
};

// ---------------------------------------------------------------------------
// Main classifier
// ---------------------------------------------------------------------------

export function classifySafety(
  text: string,
  conversationHistory?: string[]
): SafetyResult {
  const combined = [text, ...(conversationHistory ?? [])].join(" ");
  const lower = combined.toLowerCase();

  // 1. Crisis / immediate danger — highest priority
  const crisisMatches = matchTerms(lower, CRISIS_PATTERNS);
  const methodSelf = hasMethodPlusSelf(lower);

  if (crisisMatches.length > 0 || methodSelf) {
    const triggers = methodSelf ? [...crisisMatches, "(method + self reference)"] : crisisMatches;
    return {
      category: "crisis",
      confidence: "high",
      triggerTerms: triggers,
      responseGuidance: GUIDANCE.crisis,
    };
  }

  // 2. Medical emergency
  if (isMedicalEmergency(lower)) {
    return {
      category: "medical_emergency",
      confidence: "high",
      triggerTerms: ["chest pain", "can't breathe"],
      responseGuidance: GUIDANCE.medical_emergency,
    };
  }

  // 3. Abuse / violence
  const abuseMatches = matchTerms(lower, ABUSE_PATTERNS);
  if (abuseMatches.length > 0) {
    return {
      category: "abuse_violence",
      confidence: "medium",
      triggerTerms: abuseMatches,
      responseGuidance: GUIDANCE.abuse_violence,
    };
  }

  // 4. High distress / possible self-harm
  const highMatches = matchTerms(lower, HIGH_DISTRESS_PATTERNS);
  if (highMatches.length > 0) {
    const hasSelfHarm = highMatches.some(m =>
      m.includes("cut") || m.includes("hurt myself") || m.includes("self harm") ||
      m.includes("bas 3alam") || m.includes("ardi 7ale")
    );
    return {
      category: hasSelfHarm ? "possible_self_harm" : "high_distress",
      confidence: "medium",
      triggerTerms: highMatches,
      responseGuidance: GUIDANCE.high_distress,
    };
  }

  // 5. Emotional distress
  const distressMatches = matchTerms(lower, EMOTIONAL_DISTRESS_PATTERNS);
  if (distressMatches.length > 0) {
    return {
      category: "emotional_distress",
      confidence: "low",
      triggerTerms: distressMatches,
      responseGuidance: GUIDANCE.emotional_distress,
    };
  }

  // 6. Normal
  return {
    category: "normal",
    confidence: "high",
    triggerTerms: [],
    responseGuidance: GUIDANCE.normal,
  };
}
