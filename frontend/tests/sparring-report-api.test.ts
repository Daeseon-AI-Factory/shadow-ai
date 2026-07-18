import { afterEach, describe, expect, it, vi } from "vitest";
import { practiceApi, type SparringReport } from "@shadow-ai/core";

const originalFetch = global.fetch;

afterEach(() => {
  global.fetch = originalFetch;
  vi.restoreAllMocks();
});

describe("practiceApi.sparringReport", () => {
  it("posts user turns and keyed targets to the report endpoint", async () => {
    const report: SparringReport = {
      usedTargets: [{ cardKey: "ep:0", label: "as a result", ko: "결과적으로" }],
      missedTargets: [{ cardKey: "ep:1", label: "on the other hand", ko: null }],
      corrections: [{
        original: "I explained it bad.",
        corrected: "I explained it poorly.",
        explanation: "Use an adverb to modify explained.",
      }],
      recurringMistakes: ["adverb choice"],
    };
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ data: report, error: null, timestamp: "" }), { status: 200 }),
    );
    global.fetch = fetchMock;

    const userTurns = ["I explained it bad."];
    const targets = [
      { cardKey: "ep:0", label: "as a result", ko: "결과적으로" },
      { cardKey: "ep:1", label: "on the other hand" },
    ];

    await expect(practiceApi.sparringReport(userTurns, targets)).resolves.toEqual(report);

    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("http://localhost:8080/api/practice/sparring/report");
    expect(init.method).toBe("POST");
    expect(init.body).toBe(JSON.stringify({ userTurns, targets }));
  });
});
