import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "How My Hayat Works",
  description: "See how My Hayat uses anonymized clinical data, safety audits, and Lebanese cultural context to power a more trustworthy mental health companion.",
  path: "/how-it-works",
  keywords: ["how My Hayat works", "AI therapy training", "mental health chatbot safety", "Lebanese Arabic AI"],
});
