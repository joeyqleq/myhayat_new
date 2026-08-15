export type SafetyCategory =
  | "normal"
  | "emotional_distress"
  | "high_distress"
  | "possible_self_harm"
  | "immediate_danger"
  | "crisis"
  | "medical_emergency"
  | "abuse_violence";

export interface SafetyResult {
  category: SafetyCategory;
  confidence: "high" | "medium" | "low";
  triggerTerms: string[];
  responseGuidance: string;
}
