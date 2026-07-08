#!/usr/bin/env python3
"""Generate packages/core/src/phrasal-verbs.ts from docs/default_verb_v3.md.

docs/default_verb_v3.md is the SOURCE OF TRUTH (human-editable, frequency-tiered,
with easy-English glosses for idioms). This script parses it and emits a typed,
bundled TS dataset — same shape/convention as patterns.ts / collocations.ts.

Run from repo root:  python3 scripts/build-verb-pack.py
Re-run any time you edit docs/default_verb_v3.md.

Notes:
- card_key is `pv:<groupId>#<index>` (see verbKey in practice-cards.ts); index is the
  document order in v3.md (T1 first), so keys are stable as long as entries aren't reordered.
- cue = Korean gloss, model = English phrasal (drill = recall English from Korean).
"""
import re, json, sys, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "docs", "default_verb_v3.md")
OUT = os.path.join(ROOT, "packages", "core", "src", "phrasal-verbs.ts")
# AI-generated example sentences (one natural EN sentence + KO translation per entry),
# keyed "<groupId>#<index>". Committed data, merged in here so re-parsing v3.md keeps examples.
EXAMPLES = os.path.join(ROOT, "scripts", "data", "verb-examples.json")


def merge_examples(groups):
    if not os.path.exists(EXAMPLES):
        return 0
    ex = json.load(open(EXAMPLES, encoding="utf-8"))
    n = 0
    for g in groups:
        for i, it in enumerate(g["items"]):
            pair = ex.get(f"{g['id']}#{i}")
            if pair and pair[0]:
                it["example"] = pair[0]
                if len(pair) > 1 and pair[1]:
                    it["exampleKo"] = pair[1]
                n += 1
    return n

def parse(md_path):
    groups = []
    cur = None
    tier = 2
    for raw in open(md_path, encoding="utf-8"):
        line = raw.rstrip("\n")
        h = re.match(r"^###\s+(?:(\d+)\.\s+)?([A-Za-z]+)\s*$", line)
        if h:
            verb = h.group(2)
            cur = {
                "id": "extra" if verb == "APPENDIX" else verb.lower(),
                "verb": verb,
                "gloss": "",
                "items": [],
            }
            groups.append(cur)
            tier = 2
            continue
        if cur is None:
            continue
        t = re.match(r"^\*\*T(\d)\b", line)
        if t:
            tier = int(t.group(1))
            continue
        if line.startswith("* "):
            s = line[2:]
            star = s.startswith("★ ")  # ★
            if star:
                s = s[2:]
            if " — " in s:  # " — "
                pat, rest = s.split(" — ", 1)
            else:
                pat, rest = s, ""
            easy = None
            if "*easy EN:*" in rest:
                ko_part, easy = rest.split("*easy EN:*", 1)
                ko = re.sub(r"\s*·\s*$", "", ko_part).strip()  # drop trailing " · "
                easy = easy.strip()
            else:
                ko = rest.strip()
            item = {"cue": ko, "model": pat.strip(), "tier": tier}
            if star:
                item["star"] = True
            if easy:
                item["easyEn"] = easy
            cur["items"].append(item)
            continue
        # role / gloss: first plain line after a header
        if (not cur["gloss"] and line.strip()
                and not line.startswith(("#", "*", ">"))):
            cur["gloss"] = line.strip()
    return [g for g in groups if g["items"]]

def emit(groups):
    total = sum(len(g["items"]) for g in groups)
    dist = {1: 0, 2: 0, 3: 0}
    for g in groups:
        for it in g["items"]:
            dist[it["tier"]] += 1
    body = json.dumps(groups, ensure_ascii=False, indent=2)
    banner = (
        "// AUTO-GENERATED from docs/default_verb_v3.md — DO NOT EDIT BY HAND.\n"
        "// Regenerate: python3 scripts/build-verb-pack.py\n"
        "//\n"
        "// 102 base verbs + their phrasal verbs / patterns, frequency-tiered (T1 daily core,\n"
        "// T2 common, T3 idiom/low-freq) with easy-English glosses for idioms. The premise:\n"
        "// master the base verbs + the chunks that hang off them and you can describe almost\n"
        "// any action; learn new words by re-expressing them through these patterns.\n"
        f"// {len(groups)} groups, {total} entries (T1 {dist[1]} / T2 {dist[2]} / T3 {dist[3]}).\n"
        "// Pairs with verbKey() in practice-cards.ts for SRS (card_key = `pv:<id>#<index>`).\n\n"
    )
    types = (
        "export interface VerbItem {\n"
        "  cue: string; // Korean gloss (the prompt: recall the English from this)\n"
        "  model: string; // the English phrasal verb / pattern (the answer)\n"
        "  tier: 1 | 2 | 3; // 1 = daily core, 2 = common, 3 = idiom / low-frequency\n"
        "  star?: boolean; // author's within-verb priority (separate axis from tier)\n"
        "  easyEn?: string; // plain-English meaning for idioms / opaque entries\n"
        "  example?: string; // one natural example sentence using the pattern\n"
        "  exampleKo?: string; // Korean translation of the example\n"
        "}\n\n"
        "export interface VerbGroup {\n"
        "  id: string; // stable slug, e.g. \"cut\" (\"extra\" for the appendix group)\n"
        "  verb: string; // base verb in caps, e.g. \"CUT\"\n"
        "  gloss: string; // one-line Korean description of the verb's role\n"
        "  items: VerbItem[];\n"
        "}\n\n"
    )
    with open(OUT, "w", encoding="utf-8") as f:
        f.write(banner + types + "export const VERB_PACK: VerbGroup[] = " + body + ";\n")
    return len(groups), total, dist

if __name__ == "__main__":
    if not os.path.exists(SRC):
        sys.exit(f"source not found: {SRC}")
    groups = parse(SRC)
    merged = merge_examples(groups)
    n, total, dist = emit(groups)
    print(f"wrote {OUT}")
    print(f"groups: {n} | entries: {total} | T1 {dist[1]} / T2 {dist[2]} / T3 {dist[3]}")
    print(f"examples merged: {merged}/{total}")
