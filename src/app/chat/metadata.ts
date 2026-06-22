import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Chat Demo",
  description: "Try the My Hayat chat demo to experience culturally aware emotional support designed for Lebanese Arabic and English speakers.",
  path: "/chat",
  keywords: ["AI chat demo mental health", "Lebanese Arabic chatbot", "mental health demo Lebanon"],
});
