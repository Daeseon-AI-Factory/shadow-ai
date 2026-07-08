// Conjugation-tolerant detection of a target chunk inside a live speech transcript.
// Heuristic on purpose: sparring grades generously (a hit = "correct" in Leitner terms) and
// the SRS will resurface the card anyway, so false negatives are cheaper than a rigid matcher
// that misses "figured it out" because the card says "figure out".

const IRREGULAR: Record<string, string[]> = {
  be: ["am", "is", "are", "was", "were", "been", "being", "'m", "'s", "'re"],
  come: ["came"],
  go: ["went", "gone"],
  get: ["got", "gotten"],
  take: ["took", "taken"],
  make: ["made"],
  run: ["ran"],
  give: ["gave", "given"],
  keep: ["kept"],
  bring: ["brought"],
  think: ["thought"],
  catch: ["caught"],
  buy: ["bought"],
  find: ["found"],
  hold: ["held"],
  stand: ["stood"],
  break: ["broke", "broken"],
  speak: ["spoke", "spoken"],
  write: ["wrote", "written"],
  fall: ["fell", "fallen"],
  throw: ["threw", "thrown"],
  grow: ["grew", "grown"],
  blow: ["blew", "blown"],
  draw: ["drew", "drawn"],
  see: ["saw", "seen"],
  do: ["did", "does", "done"],
  have: ["has", "had"],
  say: ["said"],
  tell: ["told"],
  sell: ["sold"],
  leave: ["left"],
  feel: ["felt"],
  meet: ["met"],
  lose: ["lost"],
  pay: ["paid"],
  hear: ["heard"],
  deal: ["dealt"],
  mean: ["meant"],
  stick: ["stuck"],
  hang: ["hung"],
  win: ["won"],
  sit: ["sat"],
  eat: ["ate", "eaten"],
};

function esc(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Build a lenient matcher for a chunk like "figure out" / "be in [place/situation]" / "end up doing".
 *  - [bracketed] slots and (parenthesized) notes are dropped
 *  - every word tolerates common inflections (s/es/ed/d/ing) plus irregular forms
 *  - up to two filler words may sit between chunk words, so separable phrasal verbs match
 *    ("figure it out", "put the meeting off")
 * Returns null when nothing usable remains (detection then simply never fires for that card).
 */
export function chunkMatcher(label: string): RegExp | null {
  const cleaned = label
    .toLowerCase()
    .replace(/\[[^\]]*\]|\([^)]*\)/g, " ")
    .replace(/[^a-z' ]/g, " ");
  const SKIP = new Set(["sth", "sb", "something", "someone", "somebody", "one's", "oneself", "a", "an", "the"]);
  const words = cleaned.split(/\s+/).filter((w) => w && !SKIP.has(w));
  if (!words.length || words.length > 5) return null;
  const parts = words.map((w) => {
    const irr = IRREGULAR[w] ?? [];
    return "(?:" + [esc(w) + "(?:s|es|ed|d|ing)?", ...irr.map(esc)].join("|") + ")";
  });
  return new RegExp("\\b" + parts.join("\\s+(?:[\\w'’]+\\s+){0,2}") + "\\b", "i");
}
