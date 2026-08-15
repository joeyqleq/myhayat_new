export type ErrorClass =
  | "quota_exceeded"
  | "invalid_model"
  | "auth_error"
  | "context_too_large"
  | "server_error"
  | "network_error"
  | "unknown";

export interface AccountConfig {
  id: string;
  token: string;
  alias: string;
}

export interface ModelHealth {
  available: boolean;
  lastFailure?: number;
  failureClass?: ErrorClass;
}

export interface RouterState {
  modelHealth: Map<string, ModelHealth>;
  accountHealth: Map<string, { available: boolean; lastFailure?: number }>;
}
