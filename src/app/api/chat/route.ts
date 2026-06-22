export const maxDuration = 60;

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.AZURE_API_KEY,
  baseURL: "https://joemaari-2546-resource.services.ai.azure.com/openai",
  defaultHeaders: { "api-key": process.env.AZURE_API_KEY || "" },
  defaultQuery: { "api-version": "2025-01-01-preview" },
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: "No messages provided" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const thread = await openai.beta.threads.create();

    for (const msg of messages) {
      if (msg.role === "user" || msg.role === "assistant") {
        let text = msg.content;
        if (!text && Array.isArray(msg.parts)) {
          text = msg.parts
            .filter((p: any) => p.type === "text")
            .map((p: any) => p.text)
            .join("");
        }
        if (!text) continue;
        await openai.beta.threads.messages.create(thread.id, {
          role: msg.role as "user" | "assistant",
          content: text,
        });
      }
    }

    const runStream = openai.beta.threads.runs.stream(thread.id, {
      assistant_id: "asst_dKrtUDPKrvCr9BMhWivw619n",
    });

    let partId = 0;
    const nextId = () => `part-${partId++}`;

    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        const send = (chunk: object) => {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(chunk)}\n\n`));
        };

        try {
          const textId = nextId();
          send({ type: "start" });
          send({ type: "start-step" });
          send({ type: "text-start", id: textId });

          for await (const event of runStream) {
            if (event.event === "thread.message.delta") {
              const content = event.data.delta.content?.[0];
              if (content?.type === "text" && content.text?.value) {
                send({ type: "text-delta", id: textId, delta: content.text.value });
              }
            }
          }

          send({ type: "text-end", id: textId });
          send({ type: "finish-step" });
          send({ type: "finish", finishReason: "stop" });
        } catch (streamError: any) {
          console.error("Stream error:", streamError);
          const errId = nextId();
          send({ type: "text-start", id: errId });
          send({ type: "text-delta", id: errId, delta: "I'm sorry, I encountered an error. Please try again." });
          send({ type: "text-end", id: errId });
          send({ type: "finish-step" });
          send({ type: "finish", finishReason: "error" });
        } finally {
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
        "x-vercel-ai-ui-message-stream": "v1",
        "X-Accel-Buffering": "no",
      },
    });
  } catch (error: any) {
    console.error("Chat API Error:", error);
    return new Response(
      JSON.stringify({
        error: error.message || "An unexpected error occurred",
        details: process.env.NODE_ENV === "development" ? error.toString() : undefined,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
