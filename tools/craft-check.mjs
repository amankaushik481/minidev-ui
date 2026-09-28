#!/usr/bin/env node
// Craft check: mechanical rules from DESIGN.md. Usage:
//   node tools/craft-check.mjs                 (all of src/registry)
//   node tools/craft-check.mjs data-table otp  (only files whose name matches)
// Exit code 1 if any error is found. Warnings do not fail.
import fs from "node:fs"
import path from "node:path"

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..")
const DIRS = ["src/registry/ui", "src/registry/blocks", "src/registry/premium"]
const filter = process.argv.slice(2)

const RULES = [
  // [level, id, regex, message]
  ["error", "hex", /(?<![\w&-])#[0-9a-fA-F]{6}(?:[0-9a-fA-F]{2})?\b|[\[(:]\s*#[0-9a-fA-F]{3,4}\b/g, "Hex colour. Use a token (bg-surface, text-fg-muted, border-border...)."],
  ["error", "palette", /\b(?:bg|text|border|ring|fill|stroke|from|to|via|outline|decoration|shadow)-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d{2,3}\b/g, "Tailwind palette step. Use semantic tokens only."],
  ["error", "transition-all", /\btransition-all\b|transition:\s*all/g, "transition-all. List the properties: transition-[color,background-color] etc."],
  ["error", "legacy-token", /\b(?:bg|text|border|ring)-(?:muted-foreground|muted|primary-foreground|primary|secondary-foreground|background|foreground|card-foreground|popover|destructive-foreground|input)\b(?!-)/g, "shadcn legacy token. Map: muted→sunken, muted-foreground→fg-muted, background→bg, foreground→fg, primary→ink or accent."],
  ["error", "press-scale", /\bactive:scale-/g, "Press never scales. Use active:translate-y-px."],
  ["error", "em-dash-copy", />[^<{}]*—[^<{}]*</g, "Em dash in visible copy. Rewrite the sentence."],
  ["warn", "arbitrary-shadow", /\bshadow-\[(?!inset_0_0_0_1px|0_0_0_3px)/g, "Arbitrary shadow. Prefer shadow-xs/sm/raised/key/ink/overlay."],
  ["warn", "raw-oklch", /oklch\((?!0_0_0|1_0_0)[^)]*\)/g, "Raw oklch in a component. Prefer a token or color-mix(in_oklch,var(--token)_N%,transparent)."],
  ["warn", "duration", /\bduration-(?:75|100|150|300|500|700|1000)\b/g, "Off-scale duration. Use duration-[70ms] (colour), duration-[140ms] (transform/shadow), duration-200 (enter)."],
  ["warn", "text-gray", /\btext-(?:sm|xs|base)\s+text-(?:gray|zinc)/g, "Grey text. Use text-fg-muted or text-fg-subtle."],
]

const FILE_RULES = [
  ["warn", "no-data-slot", (src) => /export\s*\{/.test(src) && !/data-slot=/.test(src), "No data-slot attribute on the root element."],
  ["warn", "no-focus", (src) => /<button|role="button"|onClick=/.test(src) && !/focus-visible:/.test(src), "Interactive element without a focus-visible style."],
  ["warn", "tiny-file", (src) => src.split("\n").length < 30 && /"use client"/.test(src), "Under 30 lines. Probably a thin wrapper that needs real craft (states, keyboard, empty/loading)."],
]

let errors = 0, warns = 0
const perFile = []
for (const d of DIRS) {
  const dir = path.join(ROOT, d)
  if (!fs.existsSync(dir)) continue
  for (const f of fs.readdirSync(dir)) {
    if (!f.endsWith(".tsx")) continue
    if (filter.length && !filter.some((x) => f.includes(x))) continue
    const p = path.join(dir, f)
    const src = fs.readFileSync(p, "utf8")
    const hits = []
    const lines = src.split("\n")
    for (const [level, id, rx, msg] of RULES) {
      lines.forEach((line, i) => {
        if (/craft-check-ignore/.test(line)) return
        rx.lastIndex = 0
        const m = line.match(rx)
        if (m) hits.push({ level, id, line: i + 1, sample: m[0].slice(0, 50), msg })
      })
    }
    for (const [level, id, test, msg] of FILE_RULES) if (test(src)) hits.push({ level, id, line: 0, sample: "", msg })
    if (!hits.length) continue
    perFile.push({ file: path.join(d, f), hits })
    for (const h of hits) h.level === "error" ? errors++ : warns++
  }
}

const quiet = process.env.QUIET
for (const { file, hits } of perFile) {
  const e = hits.filter((h) => h.level === "error")
  if (quiet && !e.length) continue
  console.log(`\n${file}`)
  for (const h of quiet ? e : hits) console.log(`  ${h.level === "error" ? "ERROR" : "warn "} ${h.id}${h.line ? ` L${h.line}` : ""} ${h.sample ? `\`${h.sample}\`` : ""}  ${h.msg}`)
}
console.log(`\n${errors} errors, ${warns} warnings in ${perFile.length} files`)
process.exit(errors ? 1 : 0)
