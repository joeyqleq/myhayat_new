import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About My Hayat",
  description: "Learn how My Hayat is building culturally aware AI mental health support for the Lebanese community through clinical research, safety, and local context.",
  path: "/about",
  keywords: ["about My Hayat", "Lebanese mental health AI", "clinical mental health chatbot Lebanon"],
});
