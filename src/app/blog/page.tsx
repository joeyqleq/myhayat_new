import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Blog",
  description: "Browse My Hayat’s latest mental health articles, Lebanese community stories, and educational resources.",
  path: "/blog",
});

export default function BlogPage() {
  redirect("/education-hub");
}
