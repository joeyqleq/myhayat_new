import { ModelRouter } from "./router";
import type { AccountConfig } from "./types";

export { ModelRouter } from "./router";
export type { AccountConfig, ErrorClass, ModelHealth, RouterState } from "./types";

const CF_MODELS = [
  "@cf/qwen/qwen3-30b-a3b-fp8",
  "@cf/qwen/qwq-32b",
  "@cf/meta/llama-4-scout-17b-16e-instruct",
  "@cf/meta/llama-3.3-70b-instruct-fp8-fast",
  "@cf/meta/llama-3.1-8b-instruct-fp8",
];

export function createRouter(): ModelRouter {
  const accounts: AccountConfig[] = [
    { id: process.env.CF_ACCT_2_ID ?? "", token: process.env.CF_ACCT_2_TOKEN ?? "", alias: "acct2" },
    { id: process.env.CF_ACCT_3_ID ?? "", token: process.env.CF_ACCT_3_TOKEN ?? "", alias: "acct3" },
    { id: process.env.CF_ACCT_4_ID ?? "", token: process.env.CF_ACCT_4_TOKEN ?? "", alias: "acct4" },
    { id: process.env.CF_ACCT_5_ID ?? "", token: process.env.CF_ACCT_5_TOKEN ?? "", alias: "acct5" },
    { id: process.env.CF_ACCT_6_ID ?? "", token: process.env.CF_ACCT_6_TOKEN ?? "", alias: "acct6" },
    { id: process.env.CF_ACCT_7_ID ?? "", token: process.env.CF_ACCT_7_TOKEN ?? "", alias: "acct7" },
    { id: process.env.CF_ACCT_8_ID ?? "", token: process.env.CF_ACCT_8_TOKEN ?? "", alias: "acct8" },
  ];
  return new ModelRouter(accounts, CF_MODELS);
}

// Singleton — reused across warm invocations; recreated on cold start.
let _router: ModelRouter | null = null;

export function getRouter(): ModelRouter {
  if (!_router) _router = createRouter();
  return _router;
}
