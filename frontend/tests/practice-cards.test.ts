import { describe, it, expect } from "vitest";
import { patternKey, collocationKey, cardIndex } from "@/lib/practice-cards";
import { PATTERNS } from "@/lib/patterns";
import { COLLOCATIONS } from "@/lib/collocations";
import { PRACTICE_PACK_SIZES } from "@shadow-ai/core";

describe("card keys", () => {
  it("formats pattern and collocation keys", () => {
    expect(patternKey("on-depend-on", 0)).toBe("pat:on-depend-on#0");
    expect(collocationKey("on-depend-on", 1)).toBe("col:on-depend-on#1");
  });
});

describe("cardIndex", () => {
  it("maps a pattern key to its content", () => {
    const p = PATTERNS[0];
    const info = cardIndex().get(patternKey(p.id, 0));
    expect(info).toBeDefined();
    expect(info!.kind).toBe("pattern");
    expect(info!.title).toBe(p.frame);
    expect(info!.model).toBe(p.items[0].model);
  });

  it("maps a collocation key to its content", () => {
    const c = COLLOCATIONS[0];
    const info = cardIndex().get(collocationKey(c.id, 0));
    expect(info).toBeDefined();
    expect(info!.kind).toBe("collocation");
    expect(info!.title).toBe(c.anchor);
  });

  it("indexes every item across all static SRS packs", () => {
    const expected = Object.values(PRACTICE_PACK_SIZES).reduce((total, size) => total + size, 0);
    expect(cardIndex().size).toBe(expected);
  });
});
