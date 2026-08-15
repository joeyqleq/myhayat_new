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
// Prompt resources — loaded once at module init
// ---------------------------------------------------------------------------

let SYSTEM_PROMPT_TEMPLATE: string;
try {
  SYSTEM_PROMPT_TEMPLATE = fs.readFileSync(
    path.join(process.cwd(), "knowledge", "system_prompt_slim.txt"),
    "utf-8"
  );
} catch {
  SYSTEM_PROMPT_TEMPLATE =
    "You are My Hayat, a warm Lebanese mental health companion. Never diagnose. Crisis: Embrace Lifeline 1564.\n\n---\n{{CONTEXT}}\n---";
}

let LEBANESE_SURFACE_GUIDE = "";
try {
  LEBANESE_SURFACE_GUIDE = fs.readFileSync(
    path.join(process.cwd(), "knowledge", "lebanese_surface_guide.txt"),
    "utf-8"
  );
} catch {
  // The chat still works without the guide, but Arabizi quality will be lower.
}

// ---------------------------------------------------------------------------
// Inline SSE stream builder
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

function extractDelta(parsed: Record<string, unknown>): string {
  const choices = parsed?.choices as Array<Record<string, unknown>> | undefined;
  return ((choices?.[0]?.delta as Record<string, unknown>)?.content as string)
    ?? (parsed?.response as string)
    ?? "";
}

/** Buffer a CF Workers AI SSE response into text so dialect checks can run BEFORE display. */
async function readCFStreamToText(cfStream: ReadableStream): Promise<string> {
  const decoder = new TextDecoder();
  const reader = cfStream.getReader();
  let buffer = "";
  let fullText = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed.startsWith("data: ")) continue;
      const data = trimmed.slice(6);
      if (!data || data === "[DONE]") continue;
      try {
        fullText += extractDelta(JSON.parse(data) as Record<string, unknown>);
      } catch {
        // Ignore non-JSON SSE lines.
      }
    }
  }

  // Some providers finish without a trailing newline.
  const tail = buffer.trim();
  if (tail.startsWith("data: ")) {
    const data = tail.slice(6);
    if (data && data !== "[DONE]") {
      try {
        fullText += extractDelta(JSON.parse(data) as Record<string, unknown>);
      } catch {
        // Ignore malformed tail.
      }
    }
  }

  return fullText.trim();
}

// ---------------------------------------------------------------------------
// Streaming transform used for non-dialect-gated responses
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
              const delta = extractDelta(JSON.parse(data) as Record<string, unknown>);
              if (delta) {
                fullText += delta;
                send({ type: "text-delta", id: textId, delta });
              }
            } catch {
              // non-JSON SSE line
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

        if (onValidation) onValidation(fullText);
      }
    },
  });
}

// ---------------------------------------------------------------------------
// Shared helpers
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

function serviceErrorText(profile: SessionLanguageProfile): string {
  if (profile.dominantLanguage === "english") {
    return "I'm having trouble responding right now. Please try again in a moment. 💛";
  }
  if (profile.dominantLanguage === "arabic") {
    return "في مشكلة صغيرة هلّق. جرّب ابعتلي كمان مرّة بعد شوي. 💛";
  }
  if (profile.dominantLanguage === "mixed") {
    return "Sorry, fi meshkle zghire hala2. Jarrib marra tene ba3d shway. 💛";
  }
  return "Fi meshkle zghire hala2. Jarrib marra tene ba3d shway. 💛";
}

function dialectFailureFallback(profile: SessionLanguageProfile): string {
  if (profile.dominantLanguage === "mixed") {
    return "Sorry, ma fhemet 3lek mnih. Fik t2oula bi tari2a tene?";
  }
  return "Ma fhemet 3lek mnih. Fik t2oula bi tari2a tene?";
}

// ---------------------------------------------------------------------------
// POST handler
// ---------------------------------------------------------------------------

export async function POST(req: Request): Promise<Response> {
  const requestId = Math.random().toString(36).slice(2, 10);
  const startMs = Date.now();

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

    const userMessages = cfMessages.filter(m => m.role === "user");
    const latestUserText = userMessages.at(-1)?.content ?? "";
    const recentSafetyText = userMessages.slice(-2).map(m => m.content).join(" ");

    if (!latestUserText) {
      return new Response(JSON.stringify({ error: "No user message provided" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Language must follow the CURRENT turn. Concatenating earlier turns here caused
    // English questions to receive Arabizi answers after an Arabizi conversation.
    langProfile = updateSessionProfile(null, latestUserText);
    dominantLanguage = langProfile.dominantLanguage;
    const languageInstruction = getLanguageInstruction(langProfile);
    const semanticEnglish = langProfile.semanticEnglish;

    const safety = classifySafety(recentSafetyText || latestUserText);
    safetyCategory = safety.category;

    if (safety.category === "crisis" || safety.category === "immediate_danger") {
      const crisisText =
        "أنا سمعتك وأنا معك. هلق أهم شي — اتصل بـ Embrace Lifeline على 1564، متاحين 24/7. ما رح تكون لحالك بهيدا.";
      console.log(JSON.stringify({
        requestId, model: null, accountAlias: null,
        latencyMs: Date.now() - startMs,
        safetyCategory, dominantLanguage,
        retrievedChunks: 0, validationOk: true,
        fallbackUsed: false, errorClass: null,
      }));
      return sseResponse(buildInlineStream(crisisText));
    }

    const context = await retrieveContext(latestUserText, semanticEnglish)
      .catch(() => ({ text: "", chunks: 0 }));
    retrievedChunks = context.chunks;

    const contextBlock = context.text ||
      "No specific knowledge retrieved — use general mental-health support guidance.";

    const dialectMode = dominantLanguage === "arabizi" || dominantLanguage === "mixed";
    const surfaceGuide = dialectMode && LEBANESE_SURFACE_GUIDE
      ? `\n\n## ALWAYS-ON LEBANESE GENERATION GUIDE\n${LEBANESE_SURFACE_GUIDE}`
      : "";

    const systemPrompt = [
      SYSTEM_PROMPT_TEMPLATE.replace("{{CONTEXT}}", contextBlock),
      surfaceGuide,
      languageInstruction ? `\n\n## CURRENT-TURN LANGUAGE GUIDANCE\n${languageInstruction}` : "",
      `\n\n## RESPONSE GUIDANCE\n${safety.responseGuidance}`,
    ].join("");

    const router = getRouter();
    const generationOptions = {
      maxTokens: dialectMode ? 512 : 1024,
      temperature: dialectMode ? 0.35 : 0.6,
    };
    let result = await router.callWithFallback(cfMessages, systemPrompt, generationOptions);

    if (!result) {
      fallbackUsed = true;
      logErrorClass = "all_models_failed";
      const errText = serviceErrorText(langProfile);
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

    const historyTexts = cfMessages
      .filter(m => m.role === "assistant")
      .map(m => m.content);

    // Arabizi/mixed replies are deliberately buffered. The old implementation
    // validated only after nonsense had already streamed to the user.
    if (dialectMode) {
      let fullText = await readCFStreamToText(result.stream);
      let vr = validateResponse(fullText, langProfile, historyTexts);

      if (vr.rewriteNeeded) {
        fallbackUsed = true;
        console.warn(JSON.stringify({
          event: "dialect_gate_retry",
          requestId,
          model: usedModel,
          issues: vr.issues,
        }));

        const retryPrompt = `${systemPrompt}\n\n## RETRY CONSTRAINT\nYour previous draft failed deterministic Lebanese quality checks. Rewrite from scratch using only simple, high-confidence Lebanese wording. Do not use Egyptian forms, invented Arabizi, repeated filler, or malformed words. Preserve the intended meaning.`;
        const retry = await router.callWithFallback(cfMessages, retryPrompt, {
          maxTokens: 512,
          temperature: 0.2,
        });

        if (retry) {
          usedModel = retry.model;
          usedAccount = retry.accountAlias;
          const retryText = await readCFStreamToText(retry.stream);
          const retryVr = validateResponse(retryText, langProfile, historyTexts);
          if (!retryVr.rewriteNeeded && retryText) {
            fullText = retryText;
            vr = retryVr;
          } else {
            vr = retryVr;
          }
        }
      }

      if (!fullText || vr.rewriteNeeded) {
        fullText = dialectFailureFallback(langProfile);
        logErrorClass = "dialect_validation_failed";
        validationOk = false;
      } else {
        validationOk = true;
      }

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

      return sseResponse(buildInlineStream(fullText, logErrorClass ? "error" : "stop"));
    }

    // English / Arabic-script responses can keep low-latency streaming.
    const onValidation = (fullText: string) => {
      if (!langProfile) return;
      const vr = validateResponse(fullText, langProfile, historyTexts);
      validationOk = !vr.rewriteNeeded;
      if (!vr.valid) {
        console.warn(JSON.stringify({
          event: "validation_failed",
          requestId,
          issues: vr.issues,
        }));
      }
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
