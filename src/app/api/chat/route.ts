export const maxDuration = 60;

import fs from "fs";
import path from "path";
import { getRouter } from "@/lib/router";
import { classifySafety } from "@/lib/safety/classify";
import { retrieveContext } from "@/lib/retrieval";
import { updateSessionProfile, getLanguageInstruction } from "@/lib/language";
import { validateResponse } from "@/lib/language/validate";
import type { SessionLanguageProfile } from "@/lib/language/types";

// ---------------------------------------------------------------------------
// System prompt template — loaded once at module init
// ---------------------------------------------------------------------------

let SYSTEM_PROMPT_TEMPLATE: string;
try {
  SYSTEM_PROMPT_TEMPLATE = fs.readFileSync(
    path.join(process.cwd(), "knowledge", "system_prompt_slim.txt"),
    "utf-8"
  );
} catch {
  SYSTEM_PROMPT_TEMPLATE =
    "You are My Hayat, a warm Lebanese mental health companion. Reply in Lebanese Arabizi. Never diagnose. Crisis: Embrace Lifeline 1564.\n\n---\n{{CONTEXT}}\n---";
}

// ---------------------------------------------------------------------------
// Inline SSE stream builder (crisis / error responses that bypass the router)
// ---------------------------------------------------------------------------

function buildInlineStream(text: string, finishReason = "stop"): ReadableStream {
  const encoder = new TextEncoder();
  return new ReadableStream({
    start(controller) {
      const id = `part-${Math.random().toString(36).slice(2, 10)}`;
      const send = (chunk: object) =>
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(chunk)}\n\n`));
      send({ type: "start" });
      send({ type: "start-step" });
      send({ type: "text-start", id });
      send({ type: "text-delta", id, delta: text });
      send({ type: "text-end", id });
      send({ type: "finish-step" });
      send({ type: "finish", finishReason });
      controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      controller.close();
    },
  });
}

// ---------------------------------------------------------------------------
// CF SSE → AI SDK UIMessage stream transform
// Accumulates the full response text and runs validateResponse() at the end (non-blocking).
// ---------------------------------------------------------------------------

function transformCFStream(
  cfStream: ReadableStream,
  langProfile: SessionLanguageProfile,
  historyTexts: string[],
  onValidation?: (fullText: string) => void,
): ReadableStream {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  const textId = `part-${Date.now()}`;
  let buffer = "";
  let fullText = "";

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
              const parsed = JSON.parse(data) as Record<string, unknown>;
              const choices = parsed?.choices as Array<Record<string, unknown>> | undefined;
              const delta = (choices?.[0]?.delta as Record<string, unknown>)?.content as string
                ?? (parsed?.response as string)
                ?? "";
              if (delta) {
                fullText += delta;
                send({ type: "text-delta", id: textId, delta });
              }
            } catch { /* non-JSON SSE line */ }
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

        // Non-blocking post-stream validation — logs issues, does not affect response
        if (onValidation) onValidation(fullText);
      }
    },
  });
}

// ---------------------------------------------------------------------------
// Shared response headers
// ---------------------------------------------------------------------------

const SSE_HEADERS: HeadersInit = {
  "Content-Type": "text/event-stream",
  "Cache-Control": "no-cache",
  Connection: "keep-alive",
  "x-vercel-ai-ui-message-stream": "v1",
  "X-Accel-Buffering": "no",
};

function sseResponse(stream: ReadableStream): Response {
  return new Response(stream, { headers: SSE_HEADERS });
}

// ---------------------------------------------------------------------------
// POST handler
// ---------------------------------------------------------------------------

export async function POST(req: Request): Promise<Response> {
  const requestId = Math.random().toString(36).slice(2, 10);
  const startMs = Date.now();

  // Log fields collected throughout the handler
  let safetyCategory = "normal";
  let dominantLanguage = "unknown";
  let retrievedChunks = 0;
  let validationOk = false;
  let fallbackUsed = false;
  let usedModel: string | null = null;
  let usedAccount: string | null = null;
  let logErrorClass: string | null = null;
  let langProfile: SessionLanguageProfile | null = null;

  try {
    const body = await req.json() as Record<string, unknown>;
    const rawMessages = body?.messages;

    if (!rawMessages || !Array.isArray(rawMessages) || rawMessages.length === 0) {
      return new Response(JSON.stringify({ error: "No messages provided" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Normalize to { role, content }
    const cfMessages = (rawMessages as Array<Record<string, unknown>>)
      .filter(m => m.role === "user" || m.role === "assistant")
      .map(m => {
        let content = (m.content as string) ?? "";
        if (!content && Array.isArray(m.parts)) {
          content = (m.parts as Array<Record<string, unknown>>)
            .filter(p => p.type === "text")
            .map(p => p.text as string)
            .join("");
        }
        return { role: m.role as string, content };
      })
      .filter(m => m.content);

    // Build query text from last 2 user turns
    const queryText = cfMessages
      .filter(m => m.role === "user")
      .slice(-2)
      .map(m => m.content)
      .join(" ");

    // --- Safety classification (deterministic — no LLM call) ----------------
    const safety = classifySafety(queryText);
    safetyCategory = safety.category;

    if (safety.category === "crisis" || safety.category === "immediate_danger") {
      const crisisText =
        "أنا سمعتك وأنا معك. هلق أهم شي — اتصل بـ Embrace Lifeline على 1564، متاحين 24/7. ما رح تكون لحالك بهيدا.";
      console.log(JSON.stringify({
        requestId, model: null, accountAlias: null,
        latencyMs: Date.now() - startMs,
        safetyCategory, dominantLanguage: "arabic",
        retrievedChunks: 0, validationOk: true,
        fallbackUsed: false, errorClass: null,
      }));
      return sseResponse(buildInlineStream(crisisText));
    }

    // --- Language analysis (single-message session profile) -----------------
    langProfile = updateSessionProfile(null, queryText);
    dominantLanguage = langProfile.dominantLanguage;
    const languageInstruction = getLanguageInstruction(langProfile);
    const semanticEnglish = langProfile.semanticEnglish;

    // --- Parallel: RAG retrieval + (other work if needed) -------------------
    const [context] = await Promise.all([
      retrieveContext(queryText, semanticEnglish).catch(() => ({ text: "", chunks: 0 })),
    ]);

    retrievedChunks = context.chunks;

    // --- Build compact system prompt ----------------------------------------
    const contextBlock = context.text ||
      "No specific knowledge retrieved — use general Lebanese mental health guidance.";

    const systemPrompt = [
      SYSTEM_PROMPT_TEMPLATE.replace("{{CONTEXT}}", contextBlock),
      languageInstruction ? `\n## Language guidance\n${languageInstruction}` : "",
      `\n## Response guidance\n${safety.responseGuidance}`,
    ].join("");

    // --- Router: try all models/accounts with smart fallback ----------------
    const router = getRouter();
    const result = await router.callWithFallback(cfMessages, systemPrompt);

    if (!result) {
      fallbackUsed = true;
      logErrorClass = "all_models_failed";
      const errText = "مع الأسف في مشكلة هلق. جرب معي بعد شوي يا حبيبي 💙";
      console.log(JSON.stringify({
        requestId, model: null, accountAlias: null,
        latencyMs: Date.now() - startMs,
        safetyCategory, dominantLanguage, retrievedChunks,
        validationOk: false, fallbackUsed: true, errorClass: logErrorClass,
      }));
      return sseResponse(buildInlineStream(errText, "error"));
    }

    usedModel = result.model;
    usedAccount = result.accountAlias;

    // Build history text list for loop detection (assistant turns only)
    const historyTexts = cfMessages
      .filter(m => m.role === "assistant")
      .map(m => m.content);

    // Validation callback — runs after stream completes, logs without blocking response
    const onValidation = (fullText: string) => {
      if (!langProfile) return;
      const vr = validateResponse(fullText, langProfile, historyTexts);
      validationOk = vr.valid;
      if (!vr.valid) {
        console.warn(JSON.stringify({
          event: "validation_failed",
          requestId,
          issues: vr.issues,
        }));
      }
      // Final structured log (after stream — latency here reflects full generation time)
      console.log(JSON.stringify({
        requestId,
        model: usedModel,
        accountAlias: usedAccount,
        latencyMs: Date.now() - startMs,
        safetyCategory,
        dominantLanguage,
        retrievedChunks,
        validationOk,
        fallbackUsed,
        errorClass: logErrorClass,
        validationIssues: vr.issues.length,
      }));
    };

    // Log start of stream immediately (TTFB latency)
    console.log(JSON.stringify({
      requestId, event: "stream_start",
      model: usedModel, accountAlias: usedAccount,
      latencyMs: Date.now() - startMs,
      safetyCategory, dominantLanguage, retrievedChunks,
    }));

    return sseResponse(transformCFStream(result.stream, langProfile, historyTexts, onValidation));
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Unexpected error";
    console.error("Chat API Error:", msg, { requestId, latencyMs: Date.now() - startMs });
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
