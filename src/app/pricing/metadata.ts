import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Pricing",
  description: "Compare My Hayat pricing plans for culturally aware mental health support, premium features, and launch pricing details.",
  path: "/pricing",
  keywords: ["My Hayat pricing", "mental health app pricing", "AI therapy pricing Lebanon"],
});
