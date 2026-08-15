import type { ErrorClass } from "./types";

export function classifyError(status: number, body: string): ErrorClass {
  if (status === 429) return "quota_exceeded";
  if (status === 401 || status === 403) return "auth_error";
  if (status === 413) return "context_too_large";

  const lower = body.toLowerCase();

  if (status === 400 || status === 404) {
    if (lower.includes("context window") || lower.includes("token limit") || lower.includes("too long")) {
      return "context_too_large";
    }
    if (lower.includes("no route") || lower.includes("not found") || lower.includes("model")) {
      return "invalid_model";
    }
    return "unknown";
  }

  if (status >= 500) return "server_error";

  return "unknown";
}
