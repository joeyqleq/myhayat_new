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

    // 1. Create a new thread for this interaction
    const thread = await openai.beta.threads.create();
    
    // 2. Add the conversation history to the thread
    for (const msg of messages) {
      if (msg.role === "user" || msg.role === "assistant") {
        // AI SDK v3 sends parts array; fall back to content for older format
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

    // 3. Start streaming the assistant's run
    const runStream = openai.beta.threads.runs.stream(thread.id, {
      assistant_id: "asst_dKrtUDPKrvCr9BMhWivw619n",
    });

    // 4. Create a ReadableStream formatted for Vercel AI SDK Data Stream protocol
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        try {
          for await (const event of runStream) {
            if (event.event === "thread.message.delta") {
              const content = event.data.delta.content?.[0];
              if (content?.type === "text" && content.text?.value) {
                // Vercel AI SDK Data Stream Protocol: text parts
                controller.enqueue(encoder.encode(`0:${JSON.stringify(content.text.value)}\n`));
              }
            }
          }
          // Signal finish with stop reason (required by AI SDK data stream protocol)
          controller.enqueue(encoder.encode(`d:{"finishReason":"stop","usage":{"promptTokens":0,"completionTokens":0}}\n`));
        } catch (streamError: any) {
          console.error("Stream error:", streamError);
          // Send error as text so the user sees something
          controller.enqueue(encoder.encode(`0:${JSON.stringify("I'm sorry, I encountered an error. Please try again.")}\n`));
          controller.enqueue(encoder.encode(`d:{"finishReason":"error","usage":{"promptTokens":0,"completionTokens":0}}\n`));
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "X-Vercel-AI-Data-Stream": "v1",
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
