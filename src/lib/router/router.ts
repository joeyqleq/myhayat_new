import type { AccountConfig, ErrorClass, RouterState } from "./types";
import { classifyError } from "./classify";

const CF_API_BASE = "https://api.cloudflare.com/client/v4/accounts";
const RETRY_DELAY_MS = 500;

const COOLDOWN_MS = {
  quota: 2 * 60 * 1000,
  auth: 30 * 60 * 1000,
  model: 5 * 60 * 1000,
} as const;

type AttemptResult =
  | { ok: true; response: Response }
  | { ok: false; errorClass: ErrorClass; status: number };

export class ModelRouter {
  private state: RouterState;
  private accountAvailableAfter = new Map<string, number>();
  private modelAvailableAfter = new Map<string, number>();

  constructor(
    private accounts: AccountConfig[],
    private models: string[]
  ) {
    this.state = {
      modelHealth: new Map(),
      accountHealth: new Map(),
    };
  }

  private isModelSkippable(model: string): boolean {
    return Date.now() < (this.modelAvailableAfter.get(model) ?? 0);
  }

  private isAccountSkippable(alias: string): boolean {
    return Date.now() < (this.accountAvailableAfter.get(alias) ?? 0);
  }

  private coolModel(model: string, errorClass: ErrorClass): void {
    this.modelAvailableAfter.set(model, Date.now() + COOLDOWN_MS.model);
    this.state.modelHealth.set(model, {
      available: false,
      lastFailure: Date.now(),
      failureClass: errorClass,
    });
  }

  private coolAccount(alias: string, durationMs: number): void {
    this.accountAvailableAfter.set(alias, Date.now() + durationMs);
    this.state.accountHealth.set(alias, { available: false, lastFailure: Date.now() });
  }

  private async attempt(
    account: AccountConfig,
    model: string,
    messages: Array<{ role: string; content: string }>,
    systemPrompt: string,
    opts: { maxTokens?: number; temperature?: number }
  ): Promise<AttemptResult> {
    const url = `${CF_API_BASE}/${account.id}/ai/run/${model}`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${account.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [{ role: "system", content: systemPrompt }, ...messages],
          stream: true,
          max_tokens: opts.maxTokens ?? 1024,
          temperature: opts.temperature ?? 0.75,
          repetition_penalty: 1.15,
          // Disable chain-of-thought reasoning output for models that support it (e.g. Qwen3)
          thinking: { type: "disabled" },
        }),
      });
      if (response.ok) return { ok: true, response };
      const body = await response.text();
      return { ok: false, errorClass: classifyError(response.status, body), status: response.status };
    } catch {
      return { ok: false, errorClass: "network_error", status: 0 };
    }
  }

  async callWithFallback(
    messages: Array<{ role: string; content: string }>,
    systemPrompt: string,
    options?: { maxTokens?: number; temperature?: number; contextTooLarge?: boolean }
  ): Promise<{ stream: ReadableStream; model: string; accountAlias: string } | null> {
    const opts = options ?? {};
    const startIdx = Math.floor(Date.now() / 60000) % this.accounts.length;

    for (const model of this.models) {
      if (this.isModelSkippable(model)) continue;

      let skipToNextModel = false;

      for (let i = 0; i < this.accounts.length; i++) {
        if (skipToNextModel) break;

        const acct = this.accounts[(startIdx + i) % this.accounts.length];
        if (!acct.id || !acct.token) continue;
        if (this.isAccountSkippable(acct.alias)) continue;

        const result = await this.attempt(acct, model, messages, systemPrompt, opts);

        if (result.ok) {
          const body = result.response.body;
          if (body) return { stream: body, model, accountAlias: acct.alias };
          continue;
        }

        const { errorClass, status } = result;
        console.log(JSON.stringify({ model, accountAlias: acct.alias, errorClass, status }));

        switch (errorClass) {
          case "quota_exceeded":
            this.coolAccount(acct.alias, COOLDOWN_MS.quota);
            break;
          case "invalid_model":
            this.coolModel(model, errorClass);
            skipToNextModel = true;
            break;
          case "auth_error":
            this.coolAccount(acct.alias, COOLDOWN_MS.auth);
            break;
          case "context_too_large":
            return null;
          case "server_error": {
            await new Promise(r => setTimeout(r, RETRY_DELAY_MS));
            const retry = await this.attempt(acct, model, messages, systemPrompt, opts);
            if (retry.ok && retry.response.body) {
              return { stream: retry.response.body, model, accountAlias: acct.alias };
            }
            break;
          }
          // network_error, unknown: try next account immediately
        }
      }
    }

    return null;
  }

  async completeOnce(
    messages: Array<{ role: string; content: string }>,
    model?: string
  ): Promise<string | null> {
    const targetModel = model ?? this.models[0];
    const startIdx = Math.floor(Date.now() / 60000) % this.accounts.length;

    for (let i = 0; i < this.accounts.length; i++) {
      const acct = this.accounts[(startIdx + i) % this.accounts.length];
      if (!acct.id || !acct.token) continue;

      const url = `${CF_API_BASE}/${acct.id}/ai/run/${targetModel}`;
      try {
        const res = await fetch(url, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${acct.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ messages, stream: false, max_tokens: 256 }),
        });
        if (!res.ok) continue;
        const data = await res.json() as Record<string, unknown>;
        const text =
          (data?.result as Record<string, unknown>)?.response as string ??
          ((data?.choices as Array<Record<string, unknown>>)?.[0]
            ?.message as Record<string, unknown>)?.content as string;
        if (text) return text;
      } catch {
        continue;
      }
    }

    return null;
  }
}
