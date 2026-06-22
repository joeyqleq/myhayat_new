import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Education Hub",
  description: "Explore My Hayat’s education hub with articles on mental health in Lebanon, grief, anxiety, wellness, and culturally relevant AI support.",
  path: "/education-hub",
  keywords: ["mental health blog Lebanon", "education hub My Hayat", "Lebanese wellness articles", "AI mental health research"],
});
