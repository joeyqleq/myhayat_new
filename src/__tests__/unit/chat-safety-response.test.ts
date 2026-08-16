import { describe, expect, it } from "vitest";
import { crisisResponseText } from "@/app/api/chat/route";
import { updateSessionProfile } from "@/lib/language";

describe("deterministic crisis response", () => {
  it("keeps an English crisis turn readable and includes 1564", () => {
    const text = crisisResponseText(updateSessionProfile(null, "I want to kill myself"));
    expect(text).toContain("1564");
    expect(text).toContain("immediate danger");
    expect(text).not.toMatch(/[؀-ۿ]/);
  });

  it("keeps an Arabic-script crisis turn readable and includes 1564", () => {
    const text = crisisResponseText(updateSessionProfile(null, "بدي موت"));
    expect(text).toContain("1564");
    expect(text).toMatch(/[؀-ۿ]/);
  });

  it("uses a meaningful Latin-script fallback for Arabizi crisis turns", () => {
    const text = crisisResponseText(updateSessionProfile(null, "badde mout"));
    expect(text).toContain("1564");
    expect(text).not.toMatch(/[؀-ۿ]/);
  });
});
