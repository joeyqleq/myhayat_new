export const maxDuration = 60;

import fs from "fs";
import path from "path";

// Slim system prompt loaded once — ~2K tokens
let SYSTEM_PROMPT_TEMPLATE: string;
try {
  SYSTEM_PROMPT_TEMPLATE = fs.readFileSync(
    path.join(process.cwd(), "knowledge", "system_prompt_slim.txt"),
    "utf-8"
  );
} catch {
  SYSTEM_PROMPT_TEMPLATE = `You are My Hayat, a warm Lebanese mental health companion. Reply in Lebanese Arabizi. Never diagnose. Crisis: Embrace Lifeline 1564.\n\n---\n{{CONTEXT}}\n---`;
}

// CF infra — central account for embedding + Vectorize
const CF_CENTRAL_ID = process.env.CF_CENTRAL_ACCOUNT_ID!;
const CF_CENTRAL_KEY = process.env.CF_CENTRAL_KEY!;
const CF_CENTRAL_EMAIL = process.env.CF_CENTRAL_EMAIL ?? "joemaari@gmail.com";

// CF AI accounts — round-robin for inference quota
const CF_ACCOUNTS = [
  { id: process.env.CF_ACCT_2_ID!, token: process.env.CF_ACCT_2_TOKEN! },
  { id: process.env.CF_ACCT_3_ID!, token: process.env.CF_ACCT_3_TOKEN! },
  { id: process.env.CF_ACCT_4_ID!, token: process.env.CF_ACCT_4_TOKEN! },
];

// Models: fastest with good dialect support first
const CF_MODELS = [
  "@cf/qwen/qwen3-30b-a3b-fp8",
  "@cf/meta/llama-3.3-70b-instruct-fp8-fast",
  "@cf/meta/llama-3.1-8b-instruct",
];

function getStartAccountIndex(): number {
  return Math.floor(Date.now() / 60000) % CF_ACCOUNTS.length;
}

// Embed a query string using CF bge-base — returns 768-dim vector
async function embedQuery(text: string): Promise<number[] | null> {
  if (!CF_CENTRAL_ID || !CF_CENTRAL_KEY) return null;
  try {
    const res = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${CF_CENTRAL_ID}/ai/run/@cf/baai/bge-base-en-v1.5`,
      {
        method: "POST",
        headers: {
          "X-Auth-Email": CF_CENTRAL_EMAIL,
          "X-Auth-Key": CF_CENTRAL_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: [text.slice(0, 512)] }),
      }
    );
    if (!res.ok) return null;
    const data: any = await res.json();
    return data?.result?.data?.[0] ?? null;
  } catch {
    return null;
  }
}

// Query Vectorize for top-K relevant chunks
async function retrieveContext(query: string, topK = 5): Promise<string> {
  if (!CF_CENTRAL_ID || !CF_CENTRAL_KEY) return "";
  const vector = await embedQuery(query);
  if (!vector) return "";
  try {
    const res = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${CF_CENTRAL_ID}/vectorize/v2/indexes/myhayat-kb/query`,
      {
        method: "POST",
        headers: {
          "X-Auth-Email": CF_CENTRAL_EMAIL,
          "X-Auth-Key": CF_CENTRAL_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          vector,
          topK,
          returnMetadata: "all",
        }),
      }
    );
    if (!res.ok) return "";
    const data: any = await res.json();
    const matches = data?.result?.matches ?? [];
    return matches
      .map((m: any) => m?.metadata?.text ?? "")
      .filter(Boolean)
      .join("\n\n---\n\n");
  } catch {
    return "";
  }
}

async function callWorkersAI(
  accountId: string,
  token: string,
  model: string,
  messages: Array<{ role: string; content: string }>,
  systemPrompt: string
): Promise<ReadableStream | null> {
  const url = `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/${model}`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messages: [{ role: "system", content: systemPrompt }, ...messages],
      stream: true,
      max_tokens: 1024,
      temperature: 0.75,
    }),
  });
  if (response.status === 429) return null;
  if (!response.ok) {
    console.error(`CF AI error ${response.status}:`, await response.text());
    return null;
  }
  return response.body;
}

function transformCFStream(cfStream: ReadableStream): ReadableStream {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  const textId = `part-${Date.now()}`;
  let buffer = "";

  return new ReadableStream({
    async start(controller) {
      const send = (chunk: object) =>
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(chunk)}\n\n`));

      send({ type: "start" });
      send({ type: "start-step" });
      send({ type: "text-start", id: textId });

      try {
        const reader = cfStream.getReader();
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";
          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed || !trimmed.startsWith("data: ")) continue;
            const data = trimmed.slice(6);
            if (data === "[DONE]") continue;
            try {
              const parsed = JSON.parse(data);
              const delta =
                parsed?.choices?.[0]?.delta?.content ?? parsed?.response ?? "";
              if (delta) send({ type: "text-delta", id: textId, delta });
            } catch { /* non-JSON SSE */ }
          }
        }
      } catch (err) {
        console.error("Stream transform error:", err);
      } finally {
        send({ type: "text-end", id: textId });
        send({ type: "finish-step" });
        send({ type: "finish", finishReason: "stop" });
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      }
    },
  });
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: "No messages provided" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const cfMessages = messages
      .filter((m: any) => m.role === "user" || m.role === "assistant")
      .map((m: any) => {
        let content = m.content ?? "";
        if (!content && Array.isArray(m.parts)) {
          content = m.parts
            .filter((p: any) => p.type === "text")
            .map((p: any) => p.text)
            .join("");
        }
        return { role: m.role, content };
      })
      .filter((m: any) => m.content);

    // Build RAG query from last 2 user turns
    const recentUserText = cfMessages
      .filter((m: any) => m.role === "user")
      .slice(-2)
      .map((m: any) => m.content)
      .join(" ");

    // Retrieve context and build system prompt (in parallel with first model attempt)
    const contextPromise = retrieveContext(recentUserText);
    const context = await contextPromise;
    const systemPrompt = SYSTEM_PROMPT_TEMPLATE.replace(
      "{{CONTEXT}}",
      context || "No specific knowledge retrieved — use general Lebanese mental health guidance."
    );

    const startIdx = getStartAccountIndex();
    for (const model of CF_MODELS) {
      for (let i = 0; i < CF_ACCOUNTS.length; i++) {
        const acct = CF_ACCOUNTS[(startIdx + i) % CF_ACCOUNTS.length];
        if (!acct.id || !acct.token) continue;
        const cfStream = await callWorkersAI(acct.id, acct.token, model, cfMessages, systemPrompt);
        if (cfStream) {
          return new Response(transformCFStream(cfStream), {
            headers: {
              "Content-Type": "text/event-stream",
              "Cache-Control": "no-cache",
              Connection: "keep-alive",
              "x-vercel-ai-ui-message-stream": "v1",
              "X-Accel-Buffering": "no",
            },
          });
        }
      }
    }

    // All failed
    const encoder = new TextEncoder();
    const errStream = new ReadableStream({
      start(controller) {
        const send = (chunk: object) =>
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(chunk)}\n\n`));
        const id = `err-${Date.now()}`;
        send({ type: "start" });
        send({ type: "start-step" });
        send({ type: "text-start", id });
        send({ type: "text-delta", id, delta: "مع الأسف في مشكلة هلق. جرب معي بعد شوي يا حبيبي 💙" });
        send({ type: "text-end", id });
        send({ type: "finish-step" });
        send({ type: "finish", finishReason: "error" });
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      },
    });
    return new Response(errStream, {
      headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache", "x-vercel-ai-ui-message-stream": "v1" },
    });
  } catch (error: any) {
    console.error("Chat API Error:", error);
    return new Response(JSON.stringify({ error: error.message || "Unexpected error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
