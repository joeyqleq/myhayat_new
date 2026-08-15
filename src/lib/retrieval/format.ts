import type { RetrievedChunk } from "./types";

const MAX_TOTAL = 2000;
const SEPARATOR = "\n---\n";

export function formatContext(chunks: RetrievedChunk[]): string {
  const clinical = chunks.filter((c) => c.category === "clinical" || c.category === "context");
  const language = chunks.filter((c) => c.category === "language");

  const sections: string[] = [];
  let remaining = MAX_TOTAL;

  if (clinical.length > 0) {
    const header = "## Relevant Clinical Knowledge\n";
    remaining -= header.length;
    const texts = buildSection(clinical, remaining);
    remaining -= texts.length;
    sections.push(header + texts);
  }

  if (language.length > 0 && remaining > 100) {
    const header = "## Lebanese Language & Style Reference\n";
    remaining -= header.length;
    const texts = buildSection(language, remaining);
    sections.push(header + texts);
  }

  return sections.join("\n\n");
}

function buildSection(chunks: RetrievedChunk[], budget: number): string {
  const parts: string[] = [];
  let used = 0;

  for (const chunk of chunks) {
    const isFirst = parts.length === 0;
    const sepLen = isFirst ? 0 : SEPARATOR.length;
    const available = budget - used - sepLen;
    if (available <= 0) break;
    const text = chunk.text.slice(0, available);
    parts.push(isFirst ? text : SEPARATOR + text);
    used += sepLen + text.length;
  }

  return parts.join("");
}
