export const maxDuration = 60;

import fs from "fs";
import path from "path";

// Load system prompt once at module load (cached across requests)
let SYSTEM_PROMPT: string;
try {
  SYSTEM_PROMPT = fs.readFileSync(
    path.join(process.cwd(), "knowledge", "system_prompt_cf.txt"),
    "utf-8"
  );
} catch {
  SYSTEM_PROMPT = `You are My Hayat (حياتي), an empathetic mental health companion for the Lebanese community.
Respond warmly in the user's language (Arabic, Arabizi, or English). Never diagnose. In crisis situations, always mention Embrace Lifeline: 1564.`;
}

// Cloudflare Workers AI accounts — round-robin with 429 fallback
const CF_ACCOUNTS = [
  {
    id: process.env.CF_ACCT_2_ID!,
    token: process.env.CF_ACCT_2_TOKEN!,
  },
  {
    id: process.env.CF_ACCT_3_ID!,
    token: process.env.CF_ACCT_3_TOKEN!,
  },
  {
    id: process.env.CF_ACCT_4_ID!,
    token: process.env.CF_ACCT_4_TOKEN!,
  },
];

// Models in order of preference (Arabizi quality)
const CF_MODELS = [
  "@cf/zai-org/glm-5.2",
  "@cf/qwen/qwen3-30b-a3b-fp8",
  "@cf/meta/llama-3.3-70b-instruct-fp8-fast",
];

// Stateless rotation: use minute-of-day to spread load across accounts
function getStartAccountIndex(): number {
  return Math.floor(Date.now() / 60000) % CF_ACCOUNTS.length;
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
      temperature: 0.8,
    }),
  });

  if (response.status === 429) return null; // quota exhausted
  if (!response.ok) {
    const err = await response.text();
    console.error(`CF AI error ${response.status}:`, err);
    return null;
  }

  return response.body;
}

// Convert CF SSE stream → AI SDK UIMessage stream format
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
              // Handle OpenAI-compatible choices format
              const delta =
                parsed?.choices?.[0]?.delta?.content ??
                parsed?.response ??
                "";
              if (delta) {
                send({ type: "text-delta", id: textId, delta });
              }
            } catch {
              // non-JSON SSE line, skip
            }
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

    // Build clean message array for CF (extract text from AI SDK parts format)
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

    // Round-robin with fallback: try each account, then try next model on failure
    const startIdx = getStartAccountIndex();

    for (const model of CF_MODELS) {
      for (let i = 0; i < CF_ACCOUNTS.length; i++) {
        const acct = CF_ACCOUNTS[(startIdx + i) % CF_ACCOUNTS.length];
        if (!acct.id || !acct.token) continue;

        const cfStream = await callWorkersAI(
          acct.id,
          acct.token,
          model,
          cfMessages,
          SYSTEM_PROMPT
        );

        if (cfStream) {
          const uiStream = transformCFStream(cfStream);
          return new Response(uiStream, {
            headers: {
              "Content-Type": "text/event-stream",
              "Cache-Control": "no-cache",
              "Connection": "keep-alive",
              "x-vercel-ai-ui-message-stream": "v1",
              "X-Accel-Buffering": "no",
            },
          });
        }
      }
    }

    // All accounts/models failed — fallback error stream
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
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "x-vercel-ai-ui-message-stream": "v1",
      },
    });
  } catch (error: any) {
    console.error("Chat API Error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Unexpected error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
