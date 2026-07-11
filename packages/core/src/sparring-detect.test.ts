import { describe, it, expect } from "vitest";
import { chunkMatcher } from "./sparring-detect";

// A test file = a spec of what the code MUST do. Each `it` is one promise;
// if the code ever breaks that promise, the test goes red and tells you exactly which.
describe("chunkMatcher — conjugation-tolerant target detection", () => {
  it("matches the plain phrase", () => {
    const re = chunkMatcher("figure out")!; // Arrange: build the matcher
    expect(re.test("let me figure out the bug")).toBe(true); // Act + Assert
  });

  it("matches past tense (figured)", () => {
    expect(chunkMatcher("figure out")!.test("I figured out the root cause")).toBe(true);
  });

  it("matches a separable phrasal verb with words in between", () => {
    // "figure it out" — the particle is split off; matcher allows up to 2 filler words
    expect(chunkMatcher("figure out")!.test("I figured it out yesterday")).toBe(true);
  });

  it("does NOT match unrelated speech (guards against false positives)", () => {
    expect(chunkMatcher("figure out")!.test("I really love pizza")).toBe(false);
  });

  it("strips [bracket] slots and still matches the verb", () => {
    // card label carries a slot; the matcher should ignore it
    expect(chunkMatcher("be in [place/situation]")!.test("I am in a tough spot")).toBe(true);
  });

  it("handles irregular verbs (end up → ended up)", () => {
    expect(chunkMatcher("end up")!.test("I ended up rewriting it")).toBe(true);
  });

  it("returns null for empty/garbage input (nothing to detect)", () => {
    expect(chunkMatcher("")).toBeNull();
    expect(chunkMatcher("[]")).toBeNull();
  });
});
