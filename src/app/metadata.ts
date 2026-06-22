import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "AI Mental Health Companion for the Lebanese Community",
  description:
    "My Hayat offers culturally aware mental health support for people in Lebanon and the diaspora, with care designed for Lebanese Arabic and English speakers.",
  path: "/",
  keywords: [
    "mental health Lebanon",
    "Lebanese Arabic mental health support",
    "AI mental health companion",
    "mental wellness Lebanon",
    "anxiety support Lebanon",
    "grief support Lebanon",
  ],
});
