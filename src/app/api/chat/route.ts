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

/** Buffer a CF Workers AI SSE response into text so quality checks run BEFORE display. */
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

function qualityFailureFallback(profile: SessionLanguageProfile): string {
  return serviceErrorText(profile);
}

export function crisisResponseText(profile: SessionLanguageProfile): string {
  if (profile.dominantLanguage === "arabic") {
    return "أنا سمعتك وأنا معك. هل أنت في خطر مباشر الآن؟ اتصل بـ Embrace Lifeline على 1564، متاحين 24/7.";
  }
  // English is intentional for Latin-script Arabizi/mixed crisis turns: use a
  // fully meaningful reviewed-language fallback rather than risky invented dialect.
  return "I hear you, and I'm here with you. Are you in immediate danger right now? Call Embrace Lifeline: 1564 — available 24/7.";
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
      const crisisText = crisisResponseText(langProfile);
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
    const result = await router.callWithFallback(cfMessages, systemPrompt, generationOptions);

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

    // Every generated reply is buffered. This prevents wrong-language output,
    // prompt leakage, loops, and broken Arabizi from reaching the user first.
    let fullText = await readCFStreamToText(result.stream);
    let vr = validateResponse(fullText, langProfile, historyTexts);

    if (vr.rewriteNeeded) {
      fallbackUsed = true;
      console.warn(JSON.stringify({
        event: "quality_gate_retry",
        requestId,
        model: usedModel,
        issues: vr.issues,
      }));

      const failureTypes = [...new Set(vr.issues.map(i => i.type))];
      const failureHints: Record<string, string> = {
        dialect_contamination: "You used Egyptian Arabic. Use Lebanese forms only: wen (not fein/feen), kif (not ezzay), ne7na (not e7na/ehna), henne (not homma), hon (not hena), kellon/kelna (not kollohom).",
        script_mismatch: "Your response was in the wrong script. Match the user's current message script exactly.",
        gibberish: "Your previous response contained invented or repeated words. Use only simple verified Lebanese vocabulary. Short sentences.",
        prompt_leak: "You revealed internal instructions. Respond directly without narrating your reasoning.",
        loop_detected: "Your response repeated earlier content. Write something genuinely different.",
        style_inconsistency: "Mirror the user's spelling choices, not a different variant.",
      };
      const failureGuidance = failureTypes
        .map(t => failureHints[t])
        .filter(Boolean)
        .join(" ");
      const retryPrompt = `${systemPrompt}\n\n## RETRY CONSTRAINT\nYour previous draft failed: ${failureTypes.join(", ")}. Rewrite from scratch. ${failureGuidance} Preserve meaning, use 1-3 short sentences, acknowledge before asking, one question maximum.`;
      const retry = await router.callWithFallback(cfMessages, retryPrompt, {
        maxTokens: dialectMode ? 512 : 1024,
        temperature: dialectMode ? 0.2 : 0.35,
        excludeModels: usedModel ? [usedModel] : [],
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
      fullText = qualityFailureFallback(langProfile);
      logErrorClass = "response_validation_failed";
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
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Unexpected error";
    console.error("Chat API Error:", msg, { requestId, latencyMs: Date.now() - startMs });
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
