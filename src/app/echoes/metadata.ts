import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Echoes Grief Support",
  description: "Discover Echoes, My Hayat’s grief support experience designed to help people in Lebanon and the diaspora process loss with cultural sensitivity.",
  path: "/echoes",
  keywords: ["grief support Lebanon", "Echoes My Hayat", "AI grief companion", "bereavement support Arabic"],
});
