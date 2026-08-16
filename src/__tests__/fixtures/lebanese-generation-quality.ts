export type GenerationCategory =
  | "vague_distress"
  | "family_disclosure"
  | "current_turn_language"
  | "pronoun_agreement"
  | "adjective_agreement"
  | "vowels"
  | "egyptian_contrast"
  | "unknown_vocabulary"
  | "repetition"
  | "prompt_leak";

export interface GenerationQualityFixture {
  id: string;
  category: GenerationCategory;
  input: string;
  badResponse: string;
  whyBad: string;
  goodOrNativeConstraint: string;
  rule: string;
  ownerExactGood?: string;
  deterministicReject: boolean;
}

/**
 * Small owner-backed contrastive set. Missing `ownerExactGood` is intentional:
 * a behavioral constraint is safer than inventing a sentence and calling it gold.
 */
export const LEBANESE_GENERATION_QUALITY_FIXTURES: GenerationQualityFixture[] = [
  {
    id: "owner-prod-01",
    category: "vague_distress",
    input: "i dunno , shwey ze3lmn",
    badResponse: "Ma3ak knesbi t7araj? El shwey w el waja3 mbayyanin ktir. Fina njarrib nekhod nafas ma3 ba3d?",
    whyBad: "Meaningless wording and an immediate breathing exercise.",
    goodOrNativeConstraint: "Acknowledge mild sadness, then ask one natural useful question; exact Lebanese needs owner review.",
    rule: "Listen before prescribing an exercise.",
    deterministicReject: true,
  },
  {
    id: "owner-prod-02",
    category: "unknown_vocabulary",
    input: "naffas bazz azdak",
    badResponse: "Sahih, naffas sa7a7a7a. Eza baddak, 7atti ya7sik shi 3la s7a7a?",
    whyBad: "Contains production-confirmed gibberish and incoherent syntax.",
    goodOrNativeConstraint: "Use only meaningful high-confidence words; exact Lebanese needs owner review.",
    rule: "Never invent Arabizi tokens.",
    deterministicReject: true,
  },
  {
    id: "owner-prod-03",
    category: "family_disclosure",
    input: "i want to tell 2emme w baye eno i am looteh",
    badResponse: "Hala... hena kanet 7asan t7arradj bi7al. Ma3ak khass ezzay 7atta t7sab 3aleha?",
    whyBad: "Egyptian leakage, incoherence, and no exploration of disclosure safety.",
    goodOrNativeConstraint: "Ask one useful question about goal, feared reaction, or safety before drafting a script.",
    rule: "Understand sensitive disclosure context first.",
    deterministicReject: true,
  },
  {
    id: "owner-prod-04",
    category: "repetition",
    input: "la 3anjad, i ddont know what to tell th4m",
    badResponse: "Ma3ak 3ajib, hena kol shi 7assas. Eza baddak, 7attik shi 3la 7alak hala2, aw 7attik shi 3la s7a7a? Kullu shi 7assas, bas takon 3ala 7alak.",
    whyBad: "Repetitive filler, Egyptian leakage, and meaningless structures.",
    goodOrNativeConstraint: "Respond to the disclosure problem without recycling phrases; exact Lebanese needs owner review.",
    rule: "Meaning and relevance before dialect decoration.",
    deterministicReject: true,
  },
  {
    id: "owner-prod-05",
    category: "current_turn_language",
    input: "where r u from?",
    badResponse: "Anaa lebanon, akher 7alla2 ba3dek. Eza bddk t7arradj, ana 7enaka kol shi.",
    whyBad: "An English current turn received incoherent Arabizi.",
    goodOrNativeConstraint: "Answer this turn in English only.",
    rule: "Current turn controls response language.",
    deterministicReject: true,
  },
  {
    id: "owner-prod-06",
    category: "current_turn_language",
    input: "how can i learn to be more confident?",
    badResponse: "Kol shi 7assas, bas 7atti t7arradj 3ala 7alak. T7allil shi 3ala 7alak hala2, aw 7atti t7allil shi 3ala s7a7a. Kollohom 7assas, bas t7arradj 3ala 7alak.",
    whyBad: "Wrong language, repetition, Egyptian morphology, and no useful answer.",
    goodOrNativeConstraint: "Give useful confidence guidance in English.",
    rule: "Direct questions receive direct, current-language answers.",
    deterministicReject: true,
  },
  {
    id: "owner-morph-01",
    category: "adjective_agreement",
    input: "Owner lexical correction: sensitive in the intended context",
    badResponse: "7assas",
    whyBad: "Rejected by the owner for this intended Lebanese context.",
    goodOrNativeConstraint: "Use the owner-corrected form exactly.",
    rule: "Owner correction outranks synthetic fixtures.",
    ownerExactGood: "7asses",
    deterministicReject: false,
  },
  {
    id: "owner-morph-02",
    category: "pronoun_agreement",
    input: "all of them are sensitive",
    badResponse: "kollohom 7assas",
    whyBad: "Rejected Egyptian form plus broken agreement.",
    goodOrNativeConstraint: "Use the owner-supplied plural form.",
    rule: "Pronoun and adjective number must agree.",
    ownerExactGood: "kellon 7essessin",
    deterministicReject: true,
  },
  {
    id: "owner-morph-03",
    category: "pronoun_agreement",
    input: "we are all sensitive",
    badResponse: "kollohom 7assas",
    whyBad: "Wrong person, dialect, and adjective agreement.",
    goodOrNativeConstraint: "Use the owner-supplied first-person plural form.",
    rule: "Person and number must match intended meaning.",
    ownerExactGood: "kelna 7essessin",
    deterministicReject: true,
  },
  {
    id: "owner-vowel-01",
    category: "vowels",
    input: "door in the owner's intended Lebanese pronunciation",
    badResponse: "bab",
    whyBad: "Rejected vowel realization for this lexical anchor.",
    goodOrNativeConstraint: "Apply only this owner-supplied lexical anchor, never a global vowel rewrite.",
    rule: "Vowel behavior is lexical, not global.",
    ownerExactGood: "beb",
    deterministicReject: false,
  },
  {
    id: "owner-vowel-02",
    category: "vowels",
    input: "bothered in the owner's intended Lebanese pronunciation",
    badResponse: "daye2",
    whyBad: "Rejected vowel realization for this lexical anchor.",
    goodOrNativeConstraint: "Apply only this owner-supplied lexical anchor, with grammar handled separately.",
    rule: "Do not implement global a-to-e replacement.",
    ownerExactGood: "deye2",
    deterministicReject: false,
  },
  ...[
    ["egypt-where", "feen", "wen"],
    ["egypt-how", "ezzay", "kif"],
    ["egypt-here", "hena", "hon"],
    ["egypt-we", "e7na", "ne7na"],
    ["egypt-they", "homma", "henne"],
  ].map(([id, bad, constraint]) => ({
    id,
    category: "egyptian_contrast" as const,
    input: `Lebanese contrast for ${bad}`,
    badResponse: bad,
    whyBad: "High-signal Egyptian/non-Lebanese generated form.",
    goodOrNativeConstraint: `Prefer the high-confidence Lebanese contrast ${constraint} when meaning matches.`,
    rule: "Recognize cross-dialect input without generating Egyptian forms.",
    deterministicReject: true,
  })),
  {
    id: "unknown-review",
    category: "unknown_vocabulary",
    input: "Unknown forms encountered by older synthetic tests",
    badResponse: "nfamela nfa3el za7rat nsemo",
    whyBad: "Forms lack native validation and must not be generated.",
    goodOrNativeConstraint: "Use a simpler verified construction; exact wording requires native review.",
    rule: "Unknown means do not generate, not automatically Egyptian.",
    deterministicReject: true,
  },
  {
    id: "prompt-leak",
    category: "prompt_leak",
    input: "I feel anxious",
    badResponse: "analysis: the user said they feel anxious",
    whyBad: "Leaks reasoning/prompt framing instead of responding directly.",
    goodOrNativeConstraint: "First word must be the direct response.",
    rule: "Never expose internal reasoning.",
    deterministicReject: true,
  },
  {
    id: "exact-repeat",
    category: "repetition",
    input: "I still feel the same",
    badResponse: "Shu sar?",
    whyBad: "Exactly repeats the preceding assistant turn.",
    goodOrNativeConstraint: "Respond to the new turn without exact recycling; wording needs native review.",
    rule: "Do not repeat recent assistant replies.",
    deterministicReject: true,
  },
];
