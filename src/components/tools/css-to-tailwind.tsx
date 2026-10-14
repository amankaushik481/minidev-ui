"use client"
import * as React from "react"
import { Textarea } from "@/registry/ui/textarea"
import { Switch } from "@/registry/ui/switch"
import { CodeBlock } from "@/registry/ui/code-block"
import { StatusBadge } from "@/registry/ui/status-badge"

/*
 * CSS to Tailwind CSS v4. Everything below the UI section is pure and
 * exported so the mapping can be unit tested: parseCss, convertDeclaration,
 * convertRule, variantFor and cssToTailwind.
 */

export type Status = "utility" | "closest" | "arbitrary" | "none"
export type Decl = { prop: string; value: string; important: boolean }
export type Rule = { selector: string; at: string[]; decls: Decl[] }
export type Conv = { classes: string[]; status: Status; note?: string; fallback?: string }
export type Conversion = Decl & Conv
export type RuleResult = {
  selector: string
  at: string[]
  /** Selector without the pseudo parts that became variants. */
  base: string
  /** Variant prefix such as `md:hover:`, or null when the selector cannot be expressed as variants. */
  prefix: string | null
  items: Conversion[]
}
export type Group = { label: string; classes: string; complex: boolean }

/* ------------------------------- parsing -------------------------------- */

/** Splits on a separator that is not inside quotes, parentheses or brackets. */
export function splitTop(s: string, sep: string): string[] {
  const out: string[] = []
  let depth = 0
  let quote = ""
  let cur = ""
  for (const ch of s) {
    if (quote) {
      cur += ch
      if (ch === quote) quote = ""
      continue
    }
    if (ch === '"' || ch === "'") quote = ch
    else if (ch === "(" || ch === "[") depth++
    else if (ch === ")" || ch === "]") depth = Math.max(0, depth - 1)
    if (ch === sep && depth === 0) {
      out.push(cur)
      cur = ""
    } else cur += ch
  }
  out.push(cur)
  return out.map((x) => x.trim()).filter(Boolean)
}

export function parseDecls(body: string): Decl[] {
  const decls: Decl[] = []
  for (const part of splitTop(body, ";")) {
    const i = part.indexOf(":")
    if (i < 1) continue
    const prop = part.slice(0, i).trim().toLowerCase()
    let value = part.slice(i + 1).trim()
    if (!prop || !value) continue
    const important = /!\s*important$/i.test(value)
    if (important) value = value.replace(/\s*!\s*important$/i, "").trim()
    decls.push({ prop, value: value.replace(/\s+/g, " "), important })
  }
  return decls
}

function matchBrace(text: string, open: number): number {
  let depth = 0
  let quote = ""
  for (let i = open; i < text.length; i++) {
    const ch = text[i]
    if (quote) {
      if (ch === quote) quote = ""
      continue
    }
    if (ch === '"' || ch === "'") quote = ch
    else if (ch === "{") depth++
    else if (ch === "}") {
      depth--
      if (depth === 0) return i
    }
  }
  return text.length
}

/** True when the text has a `{` outside quotes and parentheses, meaning it contains rule blocks. */
export function hasBlock(s: string): boolean {
  let quote = ""
  let depth = 0
  for (const ch of s) {
    if (quote) {
      if (ch === quote) quote = ""
      continue
    }
    if (ch === '"' || ch === "'") quote = ch
    else if (ch === "(") depth++
    else if (ch === ")") depth = Math.max(0, depth - 1)
    else if (ch === "{" && depth === 0) return true
  }
  return false
}

function resolveSelector(sel: string, parent: string): string {
  if (!parent) return sel
  return splitTop(sel, ",")
    .map((s) => (s.includes("&") ? s.replace(/&/g, parent) : `${parent} ${s}`))
    .join(", ")
}

function parseBlock(text: string, parent: string, at: string[], out: Rule[]) {
  const start = out.length
  const own: Decl[] = []
  let i = 0
  let buf = ""
  let quote = ""
  let depth = 0
  const flushDecl = () => {
    if (buf.includes(":")) own.push(...parseDecls(buf))
    buf = ""
  }
  while (i < text.length) {
    const ch = text[i]
    if (quote) {
      buf += ch
      if (ch === quote) quote = ""
      i++
      continue
    }
    if (ch === '"' || ch === "'") quote = ch
    else if (ch === "(") depth++
    else if (ch === ")") depth = Math.max(0, depth - 1)
    if (ch === "{" && depth === 0) {
      const end = matchBrace(text, i)
      const body = text.slice(i + 1, end)
      const sel = buf.trim()
      buf = ""
      i = end + 1
      if (sel.startsWith("@")) {
        if (/^@(media|supports|container|layer|scope|starting-style)\b/i.test(sel)) {
          const nextAt = /^@layer\b/i.test(sel) ? at : [...at, sel]
          if (hasBlock(body)) parseBlock(body, parent, nextAt, out)
          else out.push({ selector: parent, at: nextAt, decls: parseDecls(body) })
        }
        // @keyframes, @font-face, @property and friends have no utility form.
        continue
      }
      const selector = resolveSelector(sel, parent)
      if (hasBlock(body)) parseBlock(body, selector, at, out)
      else for (const s of splitTop(selector, ",")) out.push({ selector: s, at, decls: parseDecls(body) })
      continue
    }
    if (ch === ";" && depth === 0) {
      buf += ch
      flushDecl()
      i++
      continue
    }
    if (ch === "}") {
      i++
      continue
    }
    buf += ch
    i++
  }
  flushDecl()
  if (own.length) out.splice(start, 0, { selector: parent, at, decls: own })
}

/** Parses CSS into flat rules. Handles rule blocks, nesting with &, @media/@supports/@container, or a bare declaration list. */
export function parseCss(src: string): Rule[] {
  const text = src.replace(/\/\*[\s\S]*?\*\//g, "")
  if (!text.trim()) return []
  if (!hasBlock(text)) return [{ selector: "", at: [], decls: parseDecls(text) }]
  const rules: Rule[] = []
  parseBlock(text, "", [], rules)
  return rules.filter((r) => r.decls.length)
}

/* ------------------------------- helpers -------------------------------- */

const ok = (...classes: string[]): Conv => ({ classes, status: "utility" })
const closest = (note: string, ...classes: string[]): Conv => ({ classes, status: "closest", note })
const arbVal = (v: string) => v.trim().replace(/_/g, "\\_").replace(/\s*,\s*/g, ",").replace(/\s*\/\s*/g, "/").replace(/\s+/g, "_")
const arb = (prefix: string, v: string, note?: string): Conv => ({ classes: [`${prefix}-[${arbVal(v)}]`], status: "arbitrary", note })
const none = (note: string): Conv => ({ classes: [], status: "none", note })
const varRef = (v: string) => /^var\((--[\w-]+)\)$/.exec(v.trim())?.[1] ?? null

/** Length in CSS px for px and rem values (rem at 16px). Other units are not assumed. */
export function lengthPx(v: string): number | null {
  const m = /^(-?\d*\.?\d+)(px|rem)?$/i.exec(v.trim())
  if (!m) return null
  const n = parseFloat(m[1])
  if (!m[2]) return n === 0 ? 0 : null
  return m[2].toLowerCase() === "px" ? n : n * 16
}

/** Tailwind spacing token for a px value: 4px is 1, 6px is 1.5, 1px is px. Null when not on the scale. */
export function spacingToken(px: number): string | null {
  const a = Math.abs(px)
  if (a === 0) return "0"
  if (a === 1) return "px"
  if (!Number.isInteger(a) || a > 384) return null
  return String(a / 4)
}

export function fraction(pct: number): string | null {
  if (Math.abs(pct - 100) < 0.01) return "full"
  for (const d of [2, 3, 4, 5, 6, 12]) {
    for (let n = 1; n < d; n++) {
      if (Math.abs(pct - (100 * n) / d) < 0.02) return `${n}/${d}`
    }
  }
  return null
}

const CONTAINERS: [number, string][] = [[256, "3xs"], [288, "2xs"], [320, "xs"], [384, "sm"], [448, "md"], [512, "lg"], [576, "xl"], [672, "2xl"], [768, "3xl"], [896, "4xl"], [1024, "5xl"], [1152, "6xl"], [1280, "7xl"]]

type LengthKind = "spacing" | "width" | "height" | "size" | "inset" | "basis"

/** Converts a length for spacing or sizing utilities, with the right keywords per axis. */
export function lengthClass(prefix: string, raw: string, kind: LengthKind): Conv {
  const v = raw.trim()
  const lv = v.toLowerCase()
  const neg = lv.startsWith("-") && lv !== "-0"
  const cls = (t: string) => (neg ? `-${prefix}-${t}` : `${prefix}-${t}`)
  if (lv === "auto") return ok(`${prefix}-auto`)
  const ref = varRef(v)
  if (ref) return ok(`${prefix}-(${ref})`)
  const px = lengthPx(lv)
  if (px !== null) {
    if (kind !== "spacing" && kind !== "inset" && kind !== "basis" && px > 0) {
      const c = CONTAINERS.find(([p]) => p === px)
      if (c && (prefix === "max-w" || prefix === "w" || prefix === "min-w")) return ok(`${prefix}-${c[1]}`)
    }
    const t = spacingToken(px)
    if (t) return ok(cls(t))
  }
  if (kind !== "spacing") {
    const pct = /^(-?)(\d*\.?\d+)%$/.exec(lv)
    if (pct) {
      const f = fraction(parseFloat(pct[2]))
      if (f) return ok(cls(f))
    }
    const kw: Record<string, string | undefined> = {
      "min-content": "min",
      "max-content": "max",
      "fit-content": "fit",
      none: prefix.startsWith("max-") ? "none" : undefined,
      "100vw": kind === "width" ? "screen" : undefined,
      "100vh": kind === "height" ? "screen" : undefined,
      "100dvh": kind === "height" ? "dvh" : undefined,
      "100svh": kind === "height" ? "svh" : undefined,
      "100lvh": kind === "height" ? "lvh" : undefined,
      "100dvw": kind === "width" ? "dvw" : undefined,
      "100svw": kind === "width" ? "svw" : undefined,
      "100lvw": kind === "width" ? "lvw" : undefined,
      "65ch": prefix === "max-w" ? "prose" : undefined,
    }
    const k = kw[lv]
    if (k) return ok(`${prefix}-${k}`)
  }
  return arb(prefix, v)
}

const NAMED_COLORS = new Set(
  (
    "aliceblue antiquewhite aqua aquamarine azure beige bisque blanchedalmond blue blueviolet brown burlywood cadetblue chartreuse chocolate coral cornflowerblue cornsilk crimson cyan " +
    "darkblue darkcyan darkgoldenrod darkgray darkgreen darkgrey darkkhaki darkmagenta darkolivegreen darkorange darkorchid darkred darksalmon darkseagreen darkslateblue darkslategray darkslategrey " +
    "darkturquoise darkviolet deeppink deepskyblue dimgray dimgrey dodgerblue firebrick floralwhite forestgreen fuchsia gainsboro ghostwhite gold goldenrod gray green greenyellow grey honeydew hotpink " +
    "indianred indigo ivory khaki lavender lavenderblush lawngreen lemonchiffon lightblue lightcoral lightcyan lightgoldenrodyellow lightgray lightgreen lightgrey lightpink lightsalmon lightseagreen " +
    "lightskyblue lightslategray lightslategrey lightsteelblue lightyellow lime limegreen linen magenta maroon mediumaquamarine mediumblue mediumorchid mediumpurple mediumseagreen mediumslateblue " +
    "mediumspringgreen mediumturquoise mediumvioletred midnightblue mintcream mistyrose moccasin navajowhite navy oldlace olive olivedrab orange orangered orchid palegoldenrod palegreen paleturquoise " +
    "palevioletred papayawhip peachpuff peru pink plum powderblue purple rebeccapurple red rosybrown royalblue saddlebrown salmon sandybrown seagreen seashell sienna silver skyblue slateblue slategray " +
    "slategrey snow springgreen steelblue tan teal thistle tomato turquoise violet wheat whitesmoke yellow yellowgreen"
  ).split(" "),
)

export function isColor(v: string): boolean {
  const lv = v.trim().toLowerCase()
  return /^#[0-9a-f]{3,8}$/.test(lv) || /^(rgb|rgba|hsl|hsla|oklch|oklab|lab|lch|hwb|color|color-mix|light-dark)\(/.test(lv) || NAMED_COLORS.has(lv) || ["transparent", "currentcolor", "inherit", "white", "black"].includes(lv) || !!varRef(lv)
}

export function colorClass(prefix: string, raw: string): Conv {
  const v = raw.trim()
  const lv = v.toLowerCase()
  const kw: Record<string, string> = { transparent: "transparent", currentcolor: "current", inherit: "inherit", white: "white", black: "black" }
  if (kw[lv]) return ok(`${prefix}-${kw[lv]}`)
  const ref = varRef(v)
  if (ref) return ok(`${prefix}-(${ref})`)
  if (isColor(lv)) return arb(prefix, lv, "Tailwind v4 colors are OKLCH tokens, so exact hex values stay arbitrary. Map it to a theme color if one matches.")
  return none(`"${v}" is not a color this tool recognises.`)
}

const TEXT_SIZES: [number, string][] = [[12, "xs"], [14, "sm"], [16, "base"], [18, "lg"], [20, "xl"], [24, "2xl"], [30, "3xl"], [36, "4xl"], [48, "5xl"], [60, "6xl"], [72, "7xl"], [96, "8xl"], [128, "9xl"]]
const TEXT_LH: Record<string, string> = { xs: "16px", sm: "20px", base: "24px", lg: "28px", xl: "28px", "2xl": "32px", "3xl": "36px", "4xl": "40px" }
const RADII: [number, string][] = [[0, "none"], [2, "xs"], [4, "sm"], [6, "md"], [8, "lg"], [12, "xl"], [16, "2xl"], [24, "3xl"], [32, "4xl"]]
const BLURS: [number, string][] = [[4, "xs"], [8, "sm"], [12, "md"], [16, "lg"], [24, "xl"], [40, "2xl"], [64, "3xl"]]
const SHADOWS: Record<string, string> = {
  "0 1px rgb(0 0 0/0.05)": "2xs",
  "0 1px 2px 0 rgb(0 0 0/0.05)": "xs",
  "0 1px 3px 0 rgb(0 0 0/0.1),0 1px 2px -1px rgb(0 0 0/0.1)": "sm",
  "0 4px 6px -1px rgb(0 0 0/0.1),0 2px 4px -2px rgb(0 0 0/0.1)": "md",
  "0 10px 15px -3px rgb(0 0 0/0.1),0 4px 6px -4px rgb(0 0 0/0.1)": "lg",
  "0 20px 25px -5px rgb(0 0 0/0.1),0 8px 10px -6px rgb(0 0 0/0.1)": "xl",
  "0 25px 50px -12px rgb(0 0 0/0.25)": "2xl",
  "inset 0 2px 4px 0 rgb(0 0 0/0.05)": "inner",
}

function radiusToken(raw: string): Conv {
  const v = raw.trim()
  const lv = v.toLowerCase()
  const ref = varRef(v)
  if (ref) return ok(`(${ref})`)
  if (lv === "50%" || lv === "100%") return closest("rounded-full uses a 9999px radius, which rounds the shorter side fully like 50% does on squares.", "full")
  const px = lengthPx(lv)
  if (px !== null) {
    if (px >= 9999) return ok("full")
    const r = RADII.find(([p]) => p === px)
    if (r) return ok(r[1])
  }
  return arb("", v)
}

const withPrefix = (prefix: string, c: Conv): Conv => ({ ...c, classes: c.classes.map((x) => `${prefix}-${x.replace(/^-/, "")}`) })

const SIDES = { t: "top", r: "right", b: "bottom", l: "left" } as const

/** Expands a 1 to 4 value box shorthand into [top, right, bottom, left]. */
export function expandBox(value: string): [string, string, string, string] | null {
  const p = splitTop(value, " ")
  if (p.length === 1) return [p[0], p[0], p[0], p[0]]
  if (p.length === 2) return [p[0], p[1], p[0], p[1]]
  if (p.length === 3) return [p[0], p[1], p[2], p[1]]
  if (p.length === 4) return [p[0], p[1], p[2], p[3]]
  return null
}

/** Applies a converter per side, collapsing equal pairs into x and y axis utilities. */
function perSide(value: string, all: string, axis: { x: string; y: string }, side: (s: keyof typeof SIDES) => string, conv: (prefix: string, v: string) => Conv): Conv {
  const box = expandBox(value)
  if (!box) return none("Expected one to four values.")
  const [t, r, b, l] = box
  if (t === r && r === b && b === l) return conv(all, t)
  if (t === b && r === l) return mergeConvs([conv(axis.y, t), conv(axis.x, r)])
  if (t === b) return mergeConvs([conv(axis.y, t), conv(side("r"), r), conv(side("l"), l)])
  if (r === l) return mergeConvs([conv(side("t"), t), conv(side("b"), b), conv(axis.x, r)])
  return mergeConvs([conv(side("t"), t), conv(side("r"), r), conv(side("b"), b), conv(side("l"), l)])
}

function boxShorthand(prefix: string, value: string, kind: LengthKind, axisNames: { x: string; y: string }, each: (side: keyof typeof SIDES) => string): Conv {
  return perSide(value, prefix, axisNames, each, (p, v) => lengthClass(p, v, kind))
}

const KEYWORDS: Record<string, Record<string, string>> = {
  display: { block: "block", "inline-block": "inline-block", inline: "inline", flex: "flex", "inline-flex": "inline-flex", grid: "grid", "inline-grid": "inline-grid", contents: "contents", "flow-root": "flow-root", table: "table", "inline-table": "inline-table", "table-row": "table-row", "table-cell": "table-cell", "table-caption": "table-caption", "table-column": "table-column", "table-column-group": "table-column-group", "table-footer-group": "table-footer-group", "table-header-group": "table-header-group", "table-row-group": "table-row-group", "list-item": "list-item", none: "hidden" },
  position: { static: "static", relative: "relative", absolute: "absolute", fixed: "fixed", sticky: "sticky" },
  "flex-direction": { row: "flex-row", "row-reverse": "flex-row-reverse", column: "flex-col", "column-reverse": "flex-col-reverse" },
  "flex-wrap": { wrap: "flex-wrap", nowrap: "flex-nowrap", "wrap-reverse": "flex-wrap-reverse" },
  "justify-content": { "flex-start": "justify-start", start: "justify-start", left: "justify-start", "flex-end": "justify-end", end: "justify-end", right: "justify-end", center: "justify-center", "space-between": "justify-between", "space-around": "justify-around", "space-evenly": "justify-evenly", stretch: "justify-stretch", normal: "justify-normal", baseline: "justify-baseline" },
  "align-items": { "flex-start": "items-start", start: "items-start", "flex-end": "items-end", end: "items-end", center: "items-center", baseline: "items-baseline", stretch: "items-stretch", normal: "items-stretch" },
  "align-self": { auto: "self-auto", "flex-start": "self-start", start: "self-start", "flex-end": "self-end", end: "self-end", center: "self-center", stretch: "self-stretch", baseline: "self-baseline" },
  "align-content": { normal: "content-normal", center: "content-center", "flex-start": "content-start", start: "content-start", "flex-end": "content-end", end: "content-end", "space-between": "content-between", "space-around": "content-around", "space-evenly": "content-evenly", baseline: "content-baseline", stretch: "content-stretch" },
  "justify-items": { start: "justify-items-start", end: "justify-items-end", center: "justify-items-center", stretch: "justify-items-stretch", normal: "justify-items-normal" },
  "justify-self": { auto: "justify-self-auto", start: "justify-self-start", end: "justify-self-end", center: "justify-self-center", stretch: "justify-self-stretch" },
  "place-items": { start: "place-items-start", end: "place-items-end", center: "place-items-center", baseline: "place-items-baseline", stretch: "place-items-stretch" },
  "place-content": { center: "place-content-center", start: "place-content-start", end: "place-content-end", "space-between": "place-content-between", "space-around": "place-content-around", "space-evenly": "place-content-evenly", baseline: "place-content-baseline", stretch: "place-content-stretch" },
  "place-self": { auto: "place-self-auto", start: "place-self-start", end: "place-self-end", center: "place-self-center", stretch: "place-self-stretch" },
  "text-align": { left: "text-left", center: "text-center", right: "text-right", justify: "text-justify", start: "text-start", end: "text-end" },
  "text-decoration-line": { underline: "underline", overline: "overline", "line-through": "line-through", none: "no-underline" },
  "text-decoration-style": { solid: "decoration-solid", double: "decoration-double", dotted: "decoration-dotted", dashed: "decoration-dashed", wavy: "decoration-wavy" },
  "text-transform": { uppercase: "uppercase", lowercase: "lowercase", capitalize: "capitalize", none: "normal-case" },
  "font-style": { italic: "italic", normal: "not-italic", oblique: "italic" },
  "white-space": { normal: "whitespace-normal", nowrap: "whitespace-nowrap", pre: "whitespace-pre", "pre-line": "whitespace-pre-line", "pre-wrap": "whitespace-pre-wrap", "break-spaces": "whitespace-break-spaces" },
  "text-overflow": { ellipsis: "text-ellipsis", clip: "text-clip" },
  "word-break": { normal: "break-normal", "break-all": "break-all", "keep-all": "break-keep" },
  "overflow-wrap": { normal: "wrap-normal", "break-word": "wrap-break-word", anywhere: "wrap-anywhere" },
  "text-wrap": { wrap: "text-wrap", nowrap: "text-nowrap", balance: "text-balance", pretty: "text-pretty" },
  "vertical-align": { baseline: "align-baseline", top: "align-top", middle: "align-middle", bottom: "align-bottom", "text-top": "align-text-top", "text-bottom": "align-text-bottom", sub: "align-sub", super: "align-super" },
  "font-variant-numeric": { normal: "normal-nums", ordinal: "ordinal", "slashed-zero": "slashed-zero", "lining-nums": "lining-nums", "oldstyle-nums": "oldstyle-nums", "proportional-nums": "proportional-nums", "tabular-nums": "tabular-nums", "diagonal-fractions": "diagonal-fractions", "stacked-fractions": "stacked-fractions" },
  "list-style-type": { none: "list-none", disc: "list-disc", decimal: "list-decimal" },
  "list-style-position": { inside: "list-inside", outside: "list-outside" },
  "overscroll-behavior": { auto: "overscroll-auto", contain: "overscroll-contain", none: "overscroll-none" },
  "overscroll-behavior-x": { auto: "overscroll-x-auto", contain: "overscroll-x-contain", none: "overscroll-x-none" },
  "overscroll-behavior-y": { auto: "overscroll-y-auto", contain: "overscroll-y-contain", none: "overscroll-y-none" },
  visibility: { visible: "visible", hidden: "invisible", collapse: "collapse" },
  "box-sizing": { "border-box": "box-border", "content-box": "box-content" },
  float: { left: "float-left", right: "float-right", none: "float-none", "inline-start": "float-start", "inline-end": "float-end" },
  clear: { left: "clear-left", right: "clear-right", both: "clear-both", none: "clear-none", "inline-start": "clear-start", "inline-end": "clear-end" },
  isolation: { isolate: "isolate", auto: "isolation-auto" },
  "object-fit": { contain: "object-contain", cover: "object-cover", fill: "object-fill", none: "object-none", "scale-down": "object-scale-down" },
  "object-position": { top: "object-top", bottom: "object-bottom", left: "object-left", right: "object-right", center: "object-center", "center center": "object-center", "left top": "object-top-left", "top left": "object-top-left", "right top": "object-top-right", "top right": "object-top-right", "left bottom": "object-bottom-left", "bottom left": "object-bottom-left", "right bottom": "object-bottom-right", "bottom right": "object-bottom-right" },
  "background-position": { top: "bg-top", bottom: "bg-bottom", left: "bg-left", right: "bg-right", center: "bg-center", "center center": "bg-center", "left top": "bg-top-left", "top left": "bg-top-left", "right top": "bg-top-right", "top right": "bg-top-right", "left bottom": "bg-bottom-left", "bottom left": "bg-bottom-left", "right bottom": "bg-bottom-right", "bottom right": "bg-bottom-right" },
  "background-size": { auto: "bg-auto", cover: "bg-cover", contain: "bg-contain" },
  "background-repeat": { repeat: "bg-repeat", "no-repeat": "bg-no-repeat", "repeat-x": "bg-repeat-x", "repeat-y": "bg-repeat-y", round: "bg-repeat-round", space: "bg-repeat-space" },
  "background-attachment": { fixed: "bg-fixed", local: "bg-local", scroll: "bg-scroll" },
  "background-clip": { "border-box": "bg-clip-border", "padding-box": "bg-clip-padding", "content-box": "bg-clip-content", text: "bg-clip-text" },
  "background-origin": { "border-box": "bg-origin-border", "padding-box": "bg-origin-padding", "content-box": "bg-origin-content" },
  "pointer-events": { none: "pointer-events-none", auto: "pointer-events-auto" },
  "user-select": { none: "select-none", text: "select-text", all: "select-all", auto: "select-auto" },
  resize: { none: "resize-none", both: "resize", horizontal: "resize-x", vertical: "resize-y" },
  "scroll-behavior": { smooth: "scroll-smooth", auto: "scroll-auto" },
  appearance: { none: "appearance-none", auto: "appearance-auto" },
  "-webkit-appearance": { none: "appearance-none", auto: "appearance-auto" },
  "border-style": { solid: "border-solid", dashed: "border-dashed", dotted: "border-dotted", double: "border-double", hidden: "border-hidden", none: "border-none" },
  "outline-style": { solid: "outline-solid", dashed: "outline-dashed", dotted: "outline-dotted", double: "outline-double", none: "outline-none" },
  "grid-auto-flow": { row: "grid-flow-row", column: "grid-flow-col", dense: "grid-flow-dense", "row dense": "grid-flow-row-dense", "column dense": "grid-flow-col-dense" },
  "grid-auto-columns": { auto: "auto-cols-auto", "min-content": "auto-cols-min", "max-content": "auto-cols-max", "minmax(0, 1fr)": "auto-cols-fr", "minmax(0,1fr)": "auto-cols-fr" },
  "grid-auto-rows": { auto: "auto-rows-auto", "min-content": "auto-rows-min", "max-content": "auto-rows-max", "minmax(0, 1fr)": "auto-rows-fr", "minmax(0,1fr)": "auto-rows-fr" },
  "table-layout": { auto: "table-auto", fixed: "table-fixed" },
  "border-collapse": { collapse: "border-collapse", separate: "border-separate" },
  "caption-side": { top: "caption-top", bottom: "caption-bottom" },
  "touch-action": { auto: "touch-auto", none: "touch-none", "pan-x": "touch-pan-x", "pan-y": "touch-pan-y", "pan-left": "touch-pan-left", "pan-right": "touch-pan-right", "pan-up": "touch-pan-up", "pan-down": "touch-pan-down", "pinch-zoom": "touch-pinch-zoom", manipulation: "touch-manipulation" },
  "scroll-snap-type": { none: "snap-none", x: "snap-x", y: "snap-y", both: "snap-both", "x mandatory": "snap-x snap-mandatory", "y mandatory": "snap-y snap-mandatory", "both mandatory": "snap-both snap-mandatory", "x proximity": "snap-x snap-proximity", "y proximity": "snap-y snap-proximity", "both proximity": "snap-both snap-proximity" },
  "scroll-snap-align": { start: "snap-start", end: "snap-end", center: "snap-center", none: "snap-align-none" },
  "scroll-snap-stop": { always: "snap-always", normal: "snap-normal" },
  hyphens: { none: "hyphens-none", manual: "hyphens-manual", auto: "hyphens-auto" },
  "field-sizing": { content: "field-sizing-content", fixed: "field-sizing-fixed" },
  "will-change": { auto: "will-change-auto", "scroll-position": "will-change-scroll", contents: "will-change-contents", transform: "will-change-transform" },
  "transform-style": { "preserve-3d": "transform-3d", flat: "transform-flat" },
  "backface-visibility": { visible: "backface-visible", hidden: "backface-hidden" },
  "forced-color-adjust": { auto: "forced-color-adjust-auto", none: "forced-color-adjust-none" },
  "color-scheme": { normal: "scheme-normal", light: "scheme-light", dark: "scheme-dark", "light dark": "scheme-light-dark", "only light": "scheme-only-light", "only dark": "scheme-only-dark" },
  "box-decoration-break": { clone: "box-decoration-clone", slice: "box-decoration-slice" },
  "-webkit-font-smoothing": { antialiased: "antialiased", auto: "subpixel-antialiased", "subpixel-antialiased": "subpixel-antialiased" },
  "container-type": { "inline-size": "@container", normal: "@container-normal" },
}

const BLEND = new Set("normal multiply screen overlay darken lighten color-dodge color-burn hard-light soft-light difference exclusion hue saturation color luminosity plus-darker plus-lighter".split(" "))
const CURSORS = new Set("auto default pointer wait text move help not-allowed none context-menu progress cell crosshair vertical-text alias copy no-drop grab grabbing all-scroll col-resize row-resize n-resize e-resize s-resize w-resize ne-resize nw-resize se-resize sw-resize ew-resize ns-resize nesw-resize nwse-resize zoom-in zoom-out".split(" "))
const ORIGINS: Record<string, string> = { center: "center", "center center": "center", "50% 50%": "center", top: "top", "top center": "top", "center top": "top", "top right": "top-right", "right top": "top-right", right: "right", "right center": "right", "center right": "right", "bottom right": "bottom-right", "right bottom": "bottom-right", bottom: "bottom", "bottom center": "bottom", "center bottom": "bottom", "bottom left": "bottom-left", "left bottom": "bottom-left", left: "left", "left center": "left", "center left": "left", "top left": "top-left", "left top": "top-left" }

const SPACING_PROPS: Record<string, [string, LengthKind]> = {
  "padding-top": ["pt", "spacing"], "padding-right": ["pr", "spacing"], "padding-bottom": ["pb", "spacing"], "padding-left": ["pl", "spacing"],
  "padding-inline": ["px", "spacing"], "padding-block": ["py", "spacing"], "padding-inline-start": ["ps", "spacing"], "padding-inline-end": ["pe", "spacing"],
  "margin-top": ["mt", "spacing"], "margin-right": ["mr", "spacing"], "margin-bottom": ["mb", "spacing"], "margin-left": ["ml", "spacing"],
  "margin-inline": ["mx", "spacing"], "margin-block": ["my", "spacing"], "margin-inline-start": ["ms", "spacing"], "margin-inline-end": ["me", "spacing"],
  "row-gap": ["gap-y", "spacing"], "column-gap": ["gap-x", "spacing"],
  top: ["top", "inset"], right: ["right", "inset"], bottom: ["bottom", "inset"], left: ["left", "inset"],
  "inset-inline": ["inset-x", "inset"], "inset-block": ["inset-y", "inset"], "inset-inline-start": ["start", "inset"], "inset-inline-end": ["end", "inset"],
  width: ["w", "width"], "min-width": ["min-w", "width"], "max-width": ["max-w", "width"], "inline-size": ["w", "width"],
  height: ["h", "height"], "min-height": ["min-h", "height"], "max-height": ["max-h", "height"], "block-size": ["h", "height"],
  "flex-basis": ["basis", "basis"], "text-indent": ["indent", "spacing"],
  "scroll-margin-top": ["scroll-mt", "spacing"], "scroll-margin-right": ["scroll-mr", "spacing"], "scroll-margin-bottom": ["scroll-mb", "spacing"], "scroll-margin-left": ["scroll-ml", "spacing"],
  "scroll-padding-top": ["scroll-pt", "spacing"], "scroll-padding-right": ["scroll-pr", "spacing"], "scroll-padding-bottom": ["scroll-pb", "spacing"], "scroll-padding-left": ["scroll-pl", "spacing"],
  "border-spacing": ["border-spacing", "spacing"],
}

const COLOR_PROPS: Record<string, string> = {
  color: "text", "background-color": "bg", "border-color": "border", "border-top-color": "border-t", "border-right-color": "border-r", "border-bottom-color": "border-b", "border-left-color": "border-l",
  "border-inline-start-color": "border-s", "border-inline-end-color": "border-e", "outline-color": "outline", "text-decoration-color": "decoration", "caret-color": "caret", "accent-color": "accent",
  fill: "fill", stroke: "stroke", "column-rule-color": "divide",
}

const BORDER_SIDES: Record<string, string> = { "border-top": "t", "border-right": "r", "border-bottom": "b", "border-left": "l", "border-inline-start": "s", "border-inline-end": "e", "border-inline": "x", "border-block": "y" }
const BORDER_STYLES = new Set(["none", "hidden", "dotted", "dashed", "solid", "double", "groove", "ridge", "inset", "outset"])

function borderWidthToken(v: string): string | null {
  const lv = v.toLowerCase()
  if (lv === "thin") return ""
  if (lv === "medium") return "3"
  if (lv === "thick") return "5"
  const px = lengthPx(lv)
  if (px === null || px < 0 || !Number.isInteger(px)) return null
  return px === 1 ? "" : String(px)
}

function borderWidthClass(prefix: string, v: string): Conv {
  const t = borderWidthToken(v)
  if (t !== null) return ok(t === "" ? prefix : `${prefix}-${t}`)
  const ref = varRef(v)
  if (ref) return ok(`${prefix}-(length:${ref})`)
  return arb(prefix, v)
}

function borderShorthand(side: string | null, value: string): Conv {
  const lv = value.toLowerCase()
  const prefix = side ? `border-${side}` : "border"
  if (lv === "none" || lv === "0") return ok(`${prefix}-0`)
  const parts = splitTop(value, " ")
  const classes: string[] = []
  const notes: string[] = []
  let status: Status = "utility"
  let sawWidth = false
  for (const p of parts) {
    const lp = p.toLowerCase()
    if (BORDER_STYLES.has(lp)) {
      if (lp !== "solid") {
        if (side) notes.push("Tailwind has no per-side border style, so border-" + lp + " applies to every side.")
        classes.push(`border-${lp}`)
        if (side) status = "closest"
      }
      continue
    }
    const w = borderWidthToken(lp)
    if (w !== null && !sawWidth) {
      sawWidth = true
      classes.push(w === "" ? prefix : `${prefix}-${w}`)
      continue
    }
    if (isColor(lp)) {
      const c = colorClass(prefix, p)
      classes.push(...c.classes)
      if (c.status === "arbitrary" && status === "utility") status = "arbitrary"
      continue
    }
    return none(`Could not read "${p}" as a border width, style or color.`)
  }
  if (!sawWidth) classes.unshift(prefix)
  return { classes, status, note: notes.join(" ") || undefined }
}

function shadowClass(prefix: string, value: string): Conv {
  const lv = value.toLowerCase()
  if (lv === "none") return ok(`${prefix}-none`)
  const ref = varRef(value)
  if (ref) return ok(`${prefix}-(${ref})`)
  const norm = lv.replace(/\s*,\s*/g, ",").replace(/\s*\/\s*/g, "/").replace(/\s+/g, " ").replace(/rgba\((\d+),(\d+),(\d+),([\d.]+)\)/g, "rgb($1 $2 $3/$4)")
  const named = SHADOWS[norm]
  if (named) return ok(`${prefix}-${named}`)
  return arb(prefix, value)
}

function timeMs(v: string): number | null {
  const m = /^(\d*\.?\d+)(ms|s)$/i.exec(v.trim())
  if (!m) return null
  return m[2].toLowerCase() === "s" ? Math.round(parseFloat(m[1]) * 1000 * 1000) / 1000 : parseFloat(m[1])
}

const TIMING: Record<string, string> = { linear: "ease-linear", "ease-in": "ease-in", "ease-out": "ease-out", "ease-in-out": "ease-in-out", initial: "ease-initial" }
const COLOR_TRANSITION = new Set(["color", "background-color", "border-color", "text-decoration-color", "fill", "stroke", "outline-color"])

function transitionProperty(props: string[]): Conv {
  const lp = props.map((p) => p.toLowerCase())
  if (lp.length === 1 && lp[0] === "all") return ok("transition-all")
  if (lp.length === 1 && lp[0] === "none") return ok("transition-none")
  if (lp.every((p) => COLOR_TRANSITION.has(p))) return lp.length >= 6 ? ok("transition-colors") : closest("transition-colors covers color, background-color, border-color, text-decoration-color, fill and stroke.", "transition-colors")
  if (lp.length === 1 && lp[0] === "opacity") return ok("transition-opacity")
  if (lp.length === 1 && lp[0] === "box-shadow") return ok("transition-shadow")
  if (lp.every((p) => ["transform", "translate", "scale", "rotate"].includes(p))) return lp.length === 1 && lp[0] === "transform" ? closest("transition-transform also covers translate, scale and rotate.", "transition-transform") : ok("transition-transform")
  return arb("transition", lp.join(","))
}

function durationClass(prefix: string, v: string): Conv {
  const ms = timeMs(v)
  if (ms === null) return arb(prefix, v)
  return Number.isInteger(ms) ? ok(`${prefix}-${ms}`) : arb(prefix, `${ms}ms`)
}

function timingClass(v: string): Conv {
  const lv = v.toLowerCase()
  if (TIMING[lv]) return ok(TIMING[lv])
  if (lv === "ease") return arb("ease", "ease", "CSS ease is cubic-bezier(0.25, 0.1, 0.25, 1); Tailwind's named curves differ, so it stays arbitrary.")
  return arb("ease", v)
}

function transitionShorthand(value: string): Conv {
  const lists = splitTop(value, ",")
  if (lists.length > 1) return arb("transition", value, "Several transitions in one declaration stay arbitrary; split them if you want named utilities.")
  const parts = splitTop(lists[0], " ")
  const props: string[] = []
  const times: string[] = []
  let timing: string | null = null
  for (const p of parts) {
    const lp = p.toLowerCase()
    if (timeMs(lp) !== null) times.push(lp)
    else if (TIMING[lp] || lp === "ease" || /^(cubic-bezier|steps|linear)\(/.test(lp) || lp === "step-start" || lp === "step-end") timing = p
    else props.push(p)
  }
  const out: Conv[] = [props.length ? transitionProperty(props) : closest("Without a property, Tailwind's default transition list (colors, opacity, shadow, transform, filters) is the nearest match.", "transition")]
  if (times[0]) out.push(durationClass("duration", times[0]))
  if (timing) out.push(timingClass(timing))
  if (times[1]) out.push(durationClass("delay", times[1]))
  return mergeConvs(out)
}

export function mergeConvs(convs: Conv[]): Conv {
  const rank: Status[] = ["utility", "closest", "arbitrary", "none"]
  const status = convs.reduce<Status>((s, c) => (rank.indexOf(c.status) > rank.indexOf(s) ? c.status : s), "utility")
  const note = convs.map((c) => c.note).filter(Boolean).join(" ")
  return { classes: convs.flatMap((c) => c.classes), status, note: note || undefined }
}

function percentInt(v: string): number | null {
  const lv = v.trim().toLowerCase()
  const pct = /^(\d*\.?\d+)%$/.exec(lv)
  const n = pct ? parseFloat(pct[1]) : /^\d*\.?\d+$/.test(lv) ? parseFloat(lv) * 100 : null
  if (n === null) return null
  const r = Math.round(n * 1000) / 1000
  return Number.isInteger(r) ? r : null
}

function transformFunctions(value: string): Conv {
  const lv = value.toLowerCase()
  if (lv === "none") return ok("transform-none")
  const re = /([a-z0-9]+)\(([^)]*)\)/gi
  const out: Conv[] = []
  let m: RegExpExecArray | null
  while ((m = re.exec(value))) {
    const fn = m[1].toLowerCase()
    const args = splitTop(m[2], ",")
    const deg = (a: string) => {
      const d = /^(-?\d*\.?\d+)deg$/i.exec(a.trim())
      return d && Number.isInteger(parseFloat(d[1])) ? parseFloat(d[1]) : null
    }
    const signed = (prefix: string, n: number) => (n < 0 ? `-${prefix}-${-n}` : `${prefix}-${n}`)
    if (fn === "translatex") out.push(lengthClass("translate-x", args[0], "inset"))
    else if (fn === "translatey") out.push(lengthClass("translate-y", args[0], "inset"))
    else if (fn === "translate") out.push(lengthClass("translate-x", args[0], "inset"), ...(args[1] ? [lengthClass("translate-y", args[1], "inset")] : []))
    else if (fn === "scale" || fn === "scalex" || fn === "scaley") {
      const p = fn === "scalex" ? "scale-x" : fn === "scaley" ? "scale-y" : "scale"
      const a = percentInt(args[0])
      const b = args[1] ? percentInt(args[1]) : null
      if (a === null) out.push(arb(p, args.join(",")))
      else if (args[1] && b !== null && fn === "scale") out.push(ok(`scale-x-${a}`, `scale-y-${b}`))
      else out.push(ok(`${p}-${a}`))
    } else if (fn === "rotate" || fn === "skewx" || fn === "skewy" || fn === "skew") {
      const p = fn === "rotate" ? "rotate" : fn === "skewx" ? "skew-x" : fn === "skewy" ? "skew-y" : "skew"
      const d = deg(args[0])
      out.push(d === null ? arb(p, args[0]) : ok(signed(p, d)))
    } else out.push(arb("transform", m[0]))
  }
  return out.length ? mergeConvs(out) : arb("transform", value)
}

function filterFunctions(prefix: string, value: string): Conv {
  const lv = value.toLowerCase()
  if (lv === "none") return ok(prefix === "backdrop" ? "backdrop-filter-none" : "filter-none")
  const re = /([a-z-]+)\(([^)]*)\)/gi
  const out: Conv[] = []
  const p = (name: string) => (prefix === "backdrop" ? `backdrop-${name}` : name)
  let m: RegExpExecArray | null
  while ((m = re.exec(value))) {
    const fn = m[1].toLowerCase()
    const arg = m[2].trim()
    if (fn === "blur") {
      const px = lengthPx(arg)
      const b = px !== null ? BLURS.find(([n]) => n === px) : null
      out.push(b ? ok(p(`blur-${b[1]}`)) : px === 0 ? ok(p("blur-none")) : arb(p("blur"), arg))
    } else if (["brightness", "contrast", "saturate", "grayscale", "invert", "sepia", "opacity"].includes(fn)) {
      const n = percentInt(arg === "" ? "1" : arg)
      const name = fn === "saturate" ? "saturate" : fn
      if (n === null) out.push(arb(p(name), arg))
      else if ((fn === "grayscale" || fn === "invert" || fn === "sepia") && n === 100) out.push(ok(p(name)))
      else out.push(ok(p(`${name}-${n}`)))
    } else if (fn === "hue-rotate") {
      const d = /^(-?\d+)deg$/.exec(arg)
      out.push(d ? ok(parseInt(d[1]) < 0 ? `-${p("hue-rotate")}-${-parseInt(d[1])}` : p(`hue-rotate-${d[1]}`)) : arb(p("hue-rotate"), arg))
    } else if (fn === "drop-shadow") out.push(arb(p("drop-shadow"), arg))
    else out.push(arb(prefix === "backdrop" ? "backdrop-filter" : "filter", m[0]))
  }
  return out.length ? mergeConvs(out) : arb(prefix === "backdrop" ? "backdrop-filter" : "filter", value)
}

function gridTemplate(prefix: string, value: string): Conv {
  const lv = value.toLowerCase().replace(/\s+/g, " ")
  if (lv === "none") return ok(`${prefix}-none`)
  if (lv === "subgrid") return ok(`${prefix}-subgrid`)
  const rep = /^repeat\(\s*(\d+)\s*,\s*(.+)\)$/.exec(lv)
  if (rep) {
    const inner = rep[2].replace(/\s/g, "")
    if (inner === "minmax(0,1fr)") return ok(`${prefix}-${rep[1]}`)
    if (inner === "1fr") return closest(`${prefix}-${rep[1]} uses repeat(${rep[1]}, minmax(0, 1fr)), which stops long content from stretching a track.`, `${prefix}-${rep[1]}`)
  }
  return arb(prefix, value)
}

function gridLine(prefix: string, value: string): Conv {
  const lv = value.toLowerCase().replace(/\s+/g, " ")
  if (lv === "auto") return ok(`${prefix}-auto`)
  const span = /^span (\d+)(?: \/ span \1)?$/.exec(lv)
  if (span) return ok(`${prefix}-span-${span[1]}`)
  if (lv === "1 / -1") return ok(`${prefix}-span-full`)
  const range = /^(-?\d+) \/ (-?\d+)$/.exec(lv)
  if (range) return ok(`${prefix}-start-${range[1]}`, `${prefix}-end-${range[2]}`)
  if (/^-?\d+$/.test(lv)) return ok(`${prefix}-start-${lv}`)
  return arb(prefix, value)
}

function gridLineEdge(prefix: string, value: string): Conv {
  const lv = value.toLowerCase()
  if (lv === "auto") return ok(`${prefix}-auto`)
  if (/^-?\d+$/.test(lv)) return ok(`${prefix}-${lv}`)
  return arb(prefix, value)
}

function fontSizeClass(value: string): Conv {
  const lv = value.toLowerCase()
  const ref = varRef(value)
  if (ref) return ok(`text-(length:${ref})`)
  const px = lengthPx(lv)
  if (px !== null) {
    const t = TEXT_SIZES.find(([p]) => p === px)
    if (t) return { classes: [`text-${t[1]}`], status: "utility", note: TEXT_LH[t[1]] ? `text-${t[1]} also sets line-height ${TEXT_LH[t[1]]}. Add leading-* or text-${t[1]}/<n> to change it.` : undefined }
  }
  return arb("text", value)
}

function lineHeightClass(value: string): Conv {
  const lv = value.toLowerCase()
  const ref = varRef(value)
  if (ref) return ok(`leading-(${ref})`)
  const named: Record<string, string> = { "1": "none", "1.25": "tight", "1.375": "snug", "1.5": "normal", "1.625": "relaxed", "2": "loose" }
  if (named[lv]) return ok(`leading-${named[lv]}`)
  if (lv === "normal") return closest("line-height: normal is browser dependent (about 1.2); leading-normal is 1.5.", "leading-normal")
  const px = lengthPx(lv)
  if (px !== null) {
    const t = spacingToken(px)
    if (t) return ok(`leading-${t}`)
  }
  return arb("leading", value)
}

function convertOne(prop: string, value: string): Conv {
  const v = value.trim()
  const lv = v.toLowerCase()
  if (prop.startsWith("--")) return none("Custom properties have no utility. Keep them in CSS, or set them inline with [--name:value].")
  if (lv === "inherit" || lv === "initial" || lv === "unset" || lv === "revert") {
    if (prop === "color" || prop === "background-color" || prop === "border-color") return lv === "inherit" ? ok(`${COLOR_PROPS[prop]}-inherit`) : none(`${lv} has no utility for ${prop}.`)
    return none(`${lv} has no utility for ${prop}.`)
  }

  const kw = KEYWORDS[prop]
  if (kw) {
    const hit = kw[lv]
    if (hit) return ok(...hit.split(" "))
    if (Object.keys(kw).length) return none(`${prop}: ${v} has no utility.`)
  }
  if (prop === "text-decoration") {
    const parts = splitTop(v, " ")
    const out: Conv[] = []
    for (const p of parts) {
      const lp = p.toLowerCase()
      if (KEYWORDS["text-decoration-line"][lp]) out.push(ok(KEYWORDS["text-decoration-line"][lp]))
      else if (KEYWORDS["text-decoration-style"][lp]) out.push(ok(KEYWORDS["text-decoration-style"][lp]))
      else if (isColor(lp)) out.push(colorClass("decoration", p))
      else if (lengthPx(lp) !== null) out.push(convertOne("text-decoration-thickness", p))
      else return none(`Could not read "${p}" in text-decoration.`)
    }
    return mergeConvs(out)
  }
  if (prop === "text-decoration-thickness") {
    if (lv === "auto") return ok("decoration-auto")
    if (lv === "from-font") return ok("decoration-from-font")
    const px = lengthPx(lv)
    return px !== null && Number.isInteger(px) ? ok(`decoration-${px}`) : arb("decoration", v)
  }
  if (prop === "text-underline-offset") {
    if (lv === "auto") return ok("underline-offset-auto")
    const px = lengthPx(lv)
    return px !== null && Number.isInteger(px) ? ok(px < 0 ? `-underline-offset-${-px}` : `underline-offset-${px}`) : arb("underline-offset", v)
  }
  if (prop === "list-style") {
    const out: Conv[] = []
    for (const p of splitTop(v, " ")) {
      const lp = p.toLowerCase()
      if (KEYWORDS["list-style-type"][lp]) out.push(ok(KEYWORDS["list-style-type"][lp]))
      else if (KEYWORDS["list-style-position"][lp]) out.push(ok(KEYWORDS["list-style-position"][lp]))
      else if (lp.startsWith("url(")) out.push(arb("list-image", p))
      else return none(`list-style: ${v} has no utility.`)
    }
    return mergeConvs(out)
  }
  if (prop === "list-style-image") return lv === "none" ? ok("list-image-none") : arb("list-image", v)
  if (prop === "mix-blend-mode") return BLEND.has(lv) ? ok(`mix-blend-${lv}`) : none(`${lv} is not a blend mode.`)
  if (prop === "background-blend-mode") return BLEND.has(lv) ? ok(`bg-blend-${lv}`) : none(`${lv} is not a blend mode.`)
  if (prop === "cursor") return CURSORS.has(lv) ? ok(`cursor-${lv}`) : arb("cursor", v)
  if (prop === "-moz-osx-font-smoothing") return lv === "grayscale" ? closest("Covered by antialiased, which sets both font smoothing properties.", "antialiased") : ok("subpixel-antialiased")
  if (prop === "-webkit-line-clamp" || prop === "line-clamp") return lv === "none" ? ok("line-clamp-none") : /^\d+$/.test(lv) ? ok(`line-clamp-${lv}`) : arb("line-clamp", v)
  if (prop === "-webkit-box-orient") return none("Only used with -webkit-line-clamp, which line-clamp-* already sets.")

  if (prop === "padding") return boxShorthand("p", v, "spacing", { x: "px", y: "py" }, (s) => `p${s}`)
  if (prop === "margin") return boxShorthand("m", v, "spacing", { x: "mx", y: "my" }, (s) => `m${s}`)
  if (prop === "inset") return boxShorthand("inset", v, "inset", { x: "inset-x", y: "inset-y" }, (s) => SIDES[s])
  if (prop === "scroll-margin") return boxShorthand("scroll-m", v, "spacing", { x: "scroll-mx", y: "scroll-my" }, (s) => `scroll-m${s}`)
  if (prop === "scroll-padding") return boxShorthand("scroll-p", v, "spacing", { x: "scroll-px", y: "scroll-py" }, (s) => `scroll-p${s}`)
  if (prop === "gap") {
    const p = splitTop(v, " ")
    if (p.length === 1) return lengthClass("gap", p[0], "spacing")
    if (p.length === 2) return mergeConvs([lengthClass("gap-y", p[0], "spacing"), lengthClass("gap-x", p[1], "spacing")])
    return none("Expected one or two values.")
  }
  const sp = SPACING_PROPS[prop]
  if (sp) return lengthClass(sp[0], v, sp[1])
  if (prop === "size") {
    const p = splitTop(v, " ")
    return p.length === 1 ? lengthClass("size", p[0], "size") : mergeConvs([lengthClass("w", p[0], "width"), lengthClass("h", p[1], "height")])
  }

  if (prop === "overflow" || prop === "overflow-x" || prop === "overflow-y") {
    const p = splitTop(lv, " ")
    const okv = (x: string) => ["auto", "hidden", "clip", "visible", "scroll"].includes(x)
    if (!p.every(okv)) return none(`${prop}: ${v} has no utility.`)
    if (prop !== "overflow") return ok(`${prop}-${p[0]}`)
    if (p.length === 1) return ok(`overflow-${p[0]}`)
    return p[0] === p[1] ? ok(`overflow-${p[0]}`) : ok(`overflow-x-${p[0]}`, `overflow-y-${p[1]}`)
  }
  if (prop === "z-index") {
    if (lv === "auto") return ok("z-auto")
    if (/^-?\d+$/.test(lv)) return ok(lv.startsWith("-") ? `-z-${lv.slice(1)}` : `z-${lv}`)
    return arb("z", v)
  }
  if (prop === "order") {
    if (lv === "-9999") return ok("order-first")
    if (lv === "9999") return ok("order-last")
    if (lv === "0") return ok("order-none")
    if (/^-?\d+$/.test(lv)) return ok(lv.startsWith("-") ? `-order-${lv.slice(1)}` : `order-${lv}`)
    return arb("order", v)
  }
  if (prop === "opacity") {
    const n = percentInt(lv)
    return n !== null ? ok(`opacity-${n}`) : arb("opacity", v)
  }
  if (prop === "flex") {
    const n = lv.replace(/\s+/g, " ")
    if (n === "1" || n === "1 1 0%" || n === "1 1 0" || n === "1 1 0px") return ok("flex-1")
    if (n === "auto" || n === "1 1 auto") return ok("flex-auto")
    if (n === "initial" || n === "0 1 auto") return ok("flex-initial")
    if (n === "none" || n === "0 0 auto") return ok("flex-none")
    if (/^\d+$/.test(n)) return ok(`flex-${n}`)
    return arb("flex", v)
  }
  if (prop === "flex-grow" || prop === "flex-shrink") {
    const p = prop === "flex-grow" ? "grow" : "shrink"
    if (lv === "1") return ok(p)
    if (/^\d+$/.test(lv)) return ok(`${p}-${lv}`)
    return arb(p, v)
  }
  if (prop === "grid-template-columns") return gridTemplate("grid-cols", v)
  if (prop === "grid-template-rows") return gridTemplate("grid-rows", v)
  if (prop === "grid-column") return gridLine("col", v)
  if (prop === "grid-row") return gridLine("row", v)
  if (prop === "grid-column-start") return gridLineEdge("col-start", v)
  if (prop === "grid-column-end") return gridLineEdge("col-end", v)
  if (prop === "grid-row-start") return gridLineEdge("row-start", v)
  if (prop === "grid-row-end") return gridLineEdge("row-end", v)

  if (prop === "font-size") return fontSizeClass(v)
  if (prop === "line-height") return lineHeightClass(v)
  if (prop === "font-weight") {
    const names: Record<string, string> = { "100": "thin", "200": "extralight", "300": "light", "400": "normal", normal: "normal", "500": "medium", "600": "semibold", "700": "bold", bold: "bold", "800": "extrabold", "900": "black" }
    if (names[lv]) return ok(`font-${names[lv]}`)
    if (/^\d+$/.test(lv)) return arb("font", v)
    return none(`font-weight: ${v} has no utility.`)
  }
  if (prop === "letter-spacing") {
    const names: Record<string, string> = { "-0.05em": "tighter", "-0.025em": "tight", "0": "normal", "0em": "normal", normal: "normal", "0.025em": "wide", "0.05em": "wider", "0.1em": "widest" }
    if (names[lv]) return ok(`tracking-${names[lv]}`)
    return arb("tracking", v)
  }
  if (prop === "font-family") {
    if (/monospace|\bmono\b|menlo|consolas|courier/.test(lv)) return closest("Mapped to the project's mono font stack rather than this exact family list.", "font-mono")
    if (/sans-serif|system-ui|-apple-system|segoe ui|roboto|helvetica|arial|inter/.test(lv)) return closest("Mapped to the project's sans font stack rather than this exact family list.", "font-sans")
    if (/serif|georgia|times/.test(lv)) return closest("Mapped to the project's serif font stack rather than this exact family list.", "font-serif")
    return arb("font", v.replace(/"/g, "'"))
  }
  if (prop === "font") return none("The font shorthand mixes size, line-height, weight and family. Write them as separate declarations.")
  if (prop === "stroke-width") return /^\d+$/.test(lv) ? ok(`stroke-${lv}`) : arb("stroke", v)
  if (prop === "columns") {
    if (/^\d+$/.test(lv)) return ok(`columns-${lv}`)
    if (lv === "auto") return ok("columns-auto")
    const px = lengthPx(lv)
    const c = px !== null ? CONTAINERS.find(([p]) => p === px) : null
    return c ? ok(`columns-${c[1]}`) : arb("columns", v)
  }
  if (prop === "aspect-ratio") {
    const n = lv.replace(/\s+/g, "")
    if (n === "16/9") return ok("aspect-video")
    if (n === "1" || n === "1/1") return ok("aspect-square")
    if (n === "auto") return ok("aspect-auto")
    return arb("aspect", n)
  }
  if (prop === "content") {
    if (lv === "none" || lv === "normal") return ok("content-none")
    if (lv === '""' || lv === "''") return ok("content-['']")
    return arb("content", v.replace(/"/g, "'"))
  }

  const cp = COLOR_PROPS[prop]
  if (cp) return colorClass(cp, v)
  if (prop === "background") {
    if (lv === "none") return ok("bg-none")
    if (lv === "transparent") return ok("bg-transparent")
    if (isColor(lv)) return colorClass("bg", v)
    if (/^(linear|radial|conic|repeating-linear|repeating-radial|repeating-conic)-gradient\(/.test(lv) && splitTop(v, " ").length === 1) return arb("bg", v)
    if (/^url\(/.test(lv) && splitTop(v, " ").length === 1) return arb("bg", v)
    return none("The background shorthand mixes color, image, position, size and repeat. Write them as separate declarations.")
  }
  if (prop === "background-image") {
    if (lv === "none") return ok("bg-none")
    return arb("bg", v)
  }
  if (prop === "border" || BORDER_SIDES[prop]) return borderShorthand(BORDER_SIDES[prop] ?? null, v)
  if (prop === "border-width") return perSide(v, "border", { x: "border-x", y: "border-y" }, (s) => `border-${s}`, borderWidthClass)
  const bw = /^border-(top|right|bottom|left|inline-start|inline-end|inline|block)-width$/.exec(prop)
  if (bw) return borderWidthClass(`border-${BORDER_SIDES[`border-${bw[1]}`]}`, v)
  if (prop === "border-radius") {
    if (v.includes("/")) return arb("rounded", v)
    const p = splitTop(v, " ")
    const tok = p.map(radiusToken)
    const corners = ["tl", "tr", "br", "bl"] as const
    const pick = (i: number) => withPrefix(`rounded-${corners[i]}`, tok[Math.min(i, tok.length - 1)])
    if (p.length === 1) return withPrefix("rounded", tok[0])
    if (p.length === 2) return mergeConvs([withPrefix("rounded-tl", tok[0]), withPrefix("rounded-br", tok[0]), withPrefix("rounded-tr", tok[1]), withPrefix("rounded-bl", tok[1])])
    if (p.length === 3) return mergeConvs([withPrefix("rounded-tl", tok[0]), withPrefix("rounded-tr", tok[1]), withPrefix("rounded-bl", tok[1]), withPrefix("rounded-br", tok[2])])
    if (p.length === 4) return mergeConvs([0, 1, 2, 3].map(pick))
    return none("Expected one to four values.")
  }
  const corner = /^border-(top-left|top-right|bottom-right|bottom-left|start-start|start-end|end-start|end-end)-radius$/.exec(prop)
  if (corner) {
    const map: Record<string, string> = { "top-left": "tl", "top-right": "tr", "bottom-right": "br", "bottom-left": "bl", "start-start": "ss", "start-end": "se", "end-start": "es", "end-end": "ee" }
    return withPrefix(`rounded-${map[corner[1]]}`, radiusToken(v))
  }
  if (prop === "outline") {
    if (lv === "none" || lv === "0") return ok("outline-none")
    const out: Conv[] = []
    for (const p of splitTop(v, " ")) {
      const lp = p.toLowerCase()
      if (KEYWORDS["outline-style"][lp]) {
        if (lp !== "solid") out.push(ok(KEYWORDS["outline-style"][lp]))
      } else if (lengthPx(lp) !== null || lp === "thin" || lp === "medium" || lp === "thick") out.push(borderWidthClass("outline", p === "thin" ? "1px" : p))
      else if (isColor(lp)) out.push(colorClass("outline", p))
      else return none(`Could not read "${p}" in outline.`)
    }
    return mergeConvs(out)
  }
  if (prop === "outline-width") return borderWidthClass("outline", v)
  if (prop === "outline-offset") {
    const px = lengthPx(lv)
    return px !== null && Number.isInteger(px) ? ok(px < 0 ? `-outline-offset-${-px}` : `outline-offset-${px}`) : arb("outline-offset", v)
  }
  if (prop === "box-shadow") return shadowClass("shadow", v)
  if (prop === "text-shadow") return lv === "none" ? ok("text-shadow-none") : arb("text-shadow", v)
  if (prop === "transition") return transitionShorthand(v)
  if (prop === "transition-property") return transitionProperty(splitTop(v, ","))
  if (prop === "transition-duration") return durationClass("duration", v)
  if (prop === "transition-delay") return durationClass("delay", v)
  if (prop === "transition-timing-function") return timingClass(v)
  if (prop === "animation") {
    if (lv === "none") return ok("animate-none")
    const m = /^(spin|ping|pulse|bounce)\b/.exec(lv)
    if (m) return closest(`animate-${m[1]} uses Tailwind's own timing for ${m[1]}.`, `animate-${m[1]}`)
    return arb("animate", v)
  }
  if (prop === "transform") return transformFunctions(v)
  if (prop === "translate") {
    const p = splitTop(v, " ")
    if (lv === "none") return ok("translate-none")
    if (p.length === 1) return lengthClass("translate", p[0], "inset")
    return mergeConvs([lengthClass("translate-x", p[0], "inset"), lengthClass("translate-y", p[1], "inset")])
  }
  if (prop === "rotate") {
    if (lv === "none") return ok("rotate-none")
    const d = /^(-?\d+)deg$/.exec(lv)
    return d ? ok(parseInt(d[1]) < 0 ? `-rotate-${-parseInt(d[1])}` : `rotate-${d[1]}`) : arb("rotate", v)
  }
  if (prop === "scale") {
    const p = splitTop(v, " ")
    if (lv === "none") return ok("scale-none")
    const a = percentInt(p[0])
    const b = p[1] ? percentInt(p[1]) : null
    if (a === null) return arb("scale", v)
    if (p[1] && b !== null && a !== b) return ok(`scale-x-${a}`, `scale-y-${b}`)
    return ok(`scale-${a}`)
  }
  if (prop === "transform-origin") return ORIGINS[lv] ? ok(`origin-${ORIGINS[lv]}`) : arb("origin", v)
  if (prop === "filter") return filterFunctions("", v)
  if (prop === "backdrop-filter" || prop === "-webkit-backdrop-filter") return filterFunctions("backdrop", v)
  if (prop === "perspective") {
    if (lv === "none") return ok("perspective-none")
    const px = lengthPx(lv)
    const named: Record<number, string> = { 100: "dramatic", 300: "near", 500: "normal", 800: "midrange", 1200: "distant" }
    return px !== null && named[px] ? ok(`perspective-${named[px]}`) : arb("perspective", v)
  }
  if (prop === "container-name") return none("Name the container with @container/name in the markup instead.")
  return none("No Tailwind utility for this property.")
}

/** Converts one declaration. Returns classes (without variants) and how faithful the match is. */
export function convertDeclaration(prop: string, value: string): Conv {
  const p = prop.trim().toLowerCase()
  const v = value.trim()
  const c = convertOne(p, v)
  if (c.status === "none" && !p.startsWith("--")) return { ...c, fallback: `[${p}:${arbVal(v)}]` }
  return c
}

/* ------------------------------- variants ------------------------------- */

const PSEUDO: Record<string, string> = {
  ":hover": "hover", ":focus": "focus", ":focus-visible": "focus-visible", ":focus-within": "focus-within", ":active": "active", ":visited": "visited", ":target": "target",
  ":disabled": "disabled", ":enabled": "enabled", ":checked": "checked", ":indeterminate": "indeterminate", ":default": "default", ":required": "required", ":optional": "optional",
  ":valid": "valid", ":invalid": "invalid", ":user-valid": "user-valid", ":user-invalid": "user-invalid", ":in-range": "in-range", ":out-of-range": "out-of-range",
  ":placeholder-shown": "placeholder-shown", ":autofill": "autofill", ":read-only": "read-only", ":empty": "empty", ":first-child": "first", ":last-child": "last",
  ":only-child": "only", ":first-of-type": "first-of-type", ":last-of-type": "last-of-type", ":only-of-type": "only-of-type", ":nth-child(odd)": "odd", ":nth-child(even)": "even",
  ":nth-child(2n+1)": "odd", ":nth-child(2n)": "even", ":open": "open", ":link": "link", ":inert": "inert",
  "::before": "before", "::after": "after", "::placeholder": "placeholder", "::selection": "selection", "::marker": "marker", "::first-line": "first-line",
  "::first-letter": "first-letter", "::backdrop": "backdrop", "::file-selector-button": "file", "::details-content": "details-content",
}

const BREAKPOINTS: [number, string][] = [[640, "sm"], [768, "md"], [1024, "lg"], [1280, "xl"], [1536, "2xl"]]

function mediaVariant(q: string): string | null {
  const lq = q.trim().toLowerCase().replace(/\s+/g, " ")
  if (lq === "print") return "print"
  if (lq === "screen") return ""
  const min = /^\(\s*(?:min-width:\s*|width\s*>=\s*)([\d.]+)(px|rem)\s*\)$/.exec(lq)
  if (min) {
    const px = min[2] === "rem" ? parseFloat(min[1]) * 16 : parseFloat(min[1])
    const bp = BREAKPOINTS.find(([p]) => p === px)
    return bp ? bp[1] : `min-[${min[1]}${min[2]}]`
  }
  const max = /^\(\s*(?:max-width:\s*|width\s*<=?\s*)([\d.]+)(px|rem)\s*\)$/.exec(lq)
  if (max) {
    const px = max[2] === "rem" ? parseFloat(max[1]) * 16 : parseFloat(max[1])
    const bp = BREAKPOINTS.find(([p]) => Math.abs(p - px) <= 1)
    return bp ? `max-${bp[1]}` : `max-[${max[1]}${max[2]}]`
  }
  const simple: Record<string, string> = {
    "(prefers-color-scheme: dark)": "dark", "(prefers-reduced-motion: reduce)": "motion-reduce", "(prefers-reduced-motion: no-preference)": "motion-safe",
    "(orientation: portrait)": "portrait", "(orientation: landscape)": "landscape", "(prefers-contrast: more)": "contrast-more", "(prefers-contrast: less)": "contrast-less",
    "(forced-colors: active)": "forced-colors", "(pointer: fine)": "pointer-fine", "(pointer: coarse)": "pointer-coarse", "(pointer: none)": "pointer-none",
    "(any-pointer: fine)": "any-pointer-fine", "(any-pointer: coarse)": "any-pointer-coarse", "(any-pointer: none)": "any-pointer-none", "(scripting: none)": "noscript",
    "(inverted-colors: inverted)": "inverted-colors",
  }
  return simple[lq] ?? null
}

/** Variants for an at-rule prelude such as `@media (min-width: 768px)`. Null when it has no Tailwind form. */
export function atRuleVariants(at: string): string[] | null {
  const m = /^@(media|supports|container|starting-style|scope)\b\s*(.*)$/i.exec(at.trim())
  if (!m) return null
  const kind = m[1].toLowerCase()
  const rest = m[2].trim()
  if (kind === "starting-style") return ["starting"]
  if (kind === "scope") return null
  if (kind === "supports") {
    const inner = /^\(\s*([^:]+?)\s*:\s*(.+?)\s*\)$/.exec(rest)
    if (!inner) return null
    return [`supports-[${inner[1]}:${arbVal(inner[2])}]`]
  }
  if (kind === "container") {
    const named = /^([a-z][\w-]*)?\s*\(\s*(?:min-width:\s*|width\s*>=\s*)([\d.]+)(px|rem)\s*\)$/i.exec(rest)
    if (!named) return null
    const px = named[3] === "rem" ? parseFloat(named[2]) * 16 : parseFloat(named[2])
    const c = CONTAINERS.find(([p]) => p === px)
    const base = c ? `@${c[1]}` : `@min-[${named[2]}${named[3]}]`
    return [named[1] ? `${base}/${named[1]}` : base]
  }
  const parts = rest.split(/\s+and\s+/i)
  const out: string[] = []
  for (const p of parts) {
    const v = mediaVariant(p)
    if (v === null) return null
    if (v) out.push(v)
  }
  return out
}

/** Splits a selector into its base and Tailwind variants. Returns prefix null for selectors with combinators, :not() and the like. */
export function variantFor(selector: string, at: string[]): { base: string; prefix: string | null; note?: string } {
  const variants: string[] = []
  for (const a of at) {
    const v = atRuleVariants(a)
    if (v === null) return { base: selector, prefix: null, note: `${a} has no variant.` }
    variants.push(...v)
  }
  let base = selector.trim()
  const trailing: string[] = []
  const re = /(::?[a-z-]+(?:\([^()]*\))?)$/i
  let m: RegExpExecArray | null
  while ((m = re.exec(base))) {
    trailing.unshift(m[1].toLowerCase())
    base = base.slice(0, -m[1].length)
  }
  for (const t of trailing) {
    const nth = /^:nth-(last-)?child\((\d+)\)$/.exec(t)
    if (nth) {
      variants.push(nth[1] ? `nth-last-${nth[2]}` : `nth-${nth[2]}`)
      continue
    }
    const v = PSEUDO[t]
    if (!v) return { base: selector, prefix: null, note: `${t} has no variant.` }
    variants.push(v)
  }
  const stripped = base.replace(/\[[^\]]*\]/g, "").replace(/\([^)]*\)/g, "")
  if (/[\s>+~]/.test(stripped.trim()) || /:(not|is|where|has)\(/i.test(base) || /::?[a-z]/i.test(stripped.replace(/^[^:]*/, ""))) {
    return { base: selector, prefix: null, note: "Compound selectors cannot be written as variants on one element." }
  }
  return { base: base.trim(), prefix: variants.length ? variants.join(":") + ":" : "" }
}

/* --------------------------------- rules -------------------------------- */

/** Converts one rule: declarations become classes, pseudo selectors and at-rules become variant prefixes. */
export function convertRule(rule: Rule): RuleResult {
  const { base, prefix, note } = variantFor(rule.selector, rule.at)
  const items: Conversion[] = rule.decls.map((d) => ({ ...d, ...convertDeclaration(d.prop, d.value) }))
  // font-size + line-height collapse into text-sm/5.
  const fs = items.find((i) => i.prop === "font-size" && i.classes.length === 1 && /^text-[a-z0-9]+$/.test(i.classes[0]))
  const lh = items.find((i) => i.prop === "line-height" && i.classes.length === 1 && i.classes[0].startsWith("leading-"))
  if (fs && lh) {
    fs.classes = [`${fs.classes[0]}/${lh.classes[0].slice("leading-".length).replace(/^\(/, "(")}`]
    fs.note = undefined
    lh.classes = []
    lh.note = `Folded into ${fs.classes[0]}.`
    if (lh.status === "arbitrary") fs.status = "arbitrary"
  }
  // display: -webkit-box and -webkit-box-orient are implied by line-clamp-*.
  if (items.some((i) => i.prop === "-webkit-line-clamp" || i.prop === "line-clamp")) {
    for (const i of items) {
      if ((i.prop === "display" && i.value.toLowerCase() === "-webkit-box") || i.prop === "-webkit-box-orient" || (i.prop === "overflow" && i.value.toLowerCase() === "hidden")) {
        i.classes = []
        i.status = "utility"
        i.note = "Already set by line-clamp-*."
        i.fallback = undefined
      }
    }
  }
  if (note) items.forEach((i) => (i.note = i.note ? `${note} ${i.note}` : note))
  return { selector: rule.selector, at: rule.at, base, prefix, items }
}

function applyPrefix(prefix: string, cls: string, important: boolean): string {
  const bang = important ? "!" : ""
  return `${prefix}${cls}${bang}`
}

/** Full pipeline: CSS text to converted rules and copy-ready class groups. */
export function cssToTailwind(src: string, fallbacks = false): { rules: RuleResult[]; groups: Group[] } {
  const rules = parseCss(src).map(convertRule)
  const groups: Group[] = []
  const byBase = new Map<string, Group>()
  for (const r of rules) {
    const classes = r.items.flatMap((i) => {
      const list = i.classes.length ? i.classes : fallbacks && i.fallback ? [i.fallback] : []
      return list.map((c) => applyPrefix(r.prefix ?? "", c, i.important))
    })
    if (!classes.length) continue
    if (r.prefix === null) {
      groups.push({ label: [...r.at, r.selector].filter(Boolean).join(" "), classes: classes.join(" "), complex: true })
      continue
    }
    const key = r.base || "declarations"
    const g = byBase.get(key)
    if (g) g.classes += " " + classes.join(" ")
    else {
      const ng: Group = { label: key, classes: classes.join(" "), complex: false }
      byBase.set(key, ng)
      groups.push(ng)
    }
  }
  return { rules, groups }
}

/* ----------------------------------- UI ----------------------------------- */

const SAMPLE = `.card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 24px;
  margin: 0 auto;
  max-width: 448px;
  background-color: #ffffff;
  color: #111827;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  box-shadow: 0 1px 2px rgb(0 0 0 / 0.06), 0 4px 12px rgb(0 0 0 / 0.08);
  font-size: 14px;
  line-height: 20px;
  transition: box-shadow 150ms ease-out;
  scroll-margin-top: 13px;
  grid-area: main;
}

.card:hover {
  box-shadow: 0 8px 24px rgb(0 0 0 / 0.12);
}

@media (min-width: 768px) {
  .card {
    padding: 32px;
  }
}`

/** Wraps a class list at a column so the code block reads without horizontal scrolling; newlines are fine inside class attributes. */
export function wrapClasses(classes: string, width = 100): string {
  const lines: string[] = []
  let cur = ""
  for (const c of classes.split(" ")) {
    if (cur && cur.length + 1 + c.length > width) {
      lines.push(cur)
      cur = c
    } else cur = cur ? `${cur} ${c}` : c
  }
  if (cur) lines.push(cur)
  return lines.join("\n")
}

const TONE: Record<Status, { tone: "success" | "info" | "warning" | "danger"; label: string }> = {
  utility: { tone: "success", label: "Utility" },
  closest: { tone: "warning", label: "Closest" },
  arbitrary: { tone: "info", label: "Arbitrary" },
  none: { tone: "danger", label: "Not converted" },
}

export function CssToTailwind() {
  const [src, setSrc] = React.useState(SAMPLE)
  const [fallbacks, setFallbacks] = React.useState(false)
  const { rules, groups } = React.useMemo(() => cssToTailwind(src, fallbacks), [src, fallbacks])
  const items = rules.flatMap((r) => r.items.map((i) => ({ r, i })))
  const total = items.length
  const missed = items.filter(({ i }) => i.status === "none").length
  const empty = !src.trim()
  const multi = rules.length > 1
  const code = groups.length
    ? groups.map((g) => (groups.length === 1 && g.label === "declarations" ? wrapClasses(g.classes) : `/* ${g.label}${g.complex ? " (apply to the matching element)" : ""} */\n${wrapClasses(g.classes)}`)).join("\n\n") + "\n"
    : `/* ${empty ? "Paste CSS above to see the classes." : total ? "Nothing here maps to a utility." : "No declarations found. Paste rules like .card { padding: 16px } or a plain list of declarations."} */\n`
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="rounded-2xl border border-border bg-surface p-5 shadow-raised">
          <div className="flex items-center justify-between gap-3">
            <label htmlFor="css-in" className="text-[13px] font-medium text-fg">CSS</label>
            <button type="button" onClick={() => setSrc(SAMPLE)} className="text-[12.5px] text-fg-muted underline underline-offset-4 hover:text-fg">Load example</button>
          </div>
          <Textarea id="css-in" value={src} onChange={(e) => setSrc(e.target.value)} rows={16} spellCheck={false} placeholder="Paste declarations or whole rules" className="mt-2 min-h-[320px] font-mono text-[12.5px] leading-[1.6]" />
          <p className="mt-2 text-[12.5px] text-fg-muted" aria-live="polite">
            {empty ? "Paste CSS declarations, or whole rules with selectors and media queries." : total ? `${total - missed} of ${total} declarations converted${missed ? `, ${missed} without a utility` : ""}.` : "No declarations found."}
          </p>
        </div>
        <div className="space-y-4 self-start rounded-2xl border border-border bg-surface p-5 shadow-raised">
          <Switch size="sm" label="Include [property:value] fallbacks" description="Emit unconverted declarations as arbitrary properties" checked={fallbacks} onCheckedChange={setFallbacks} />
          <ul className="space-y-1.5 text-[12.5px] leading-[1.5] text-fg-muted">
            <li><StatusBadge tone="success">Utility</StatusBadge> <span className="ml-1">a named Tailwind class</span></li>
            <li><StatusBadge tone="warning">Closest</StatusBadge> <span className="ml-1">a named class with a slightly different value</span></li>
            <li><StatusBadge tone="info">Arbitrary</StatusBadge> <span className="ml-1">exact value in square brackets</span></li>
            <li><StatusBadge tone="danger">Not converted</StatusBadge> <span className="ml-1">keep it in CSS</span></li>
          </ul>
        </div>
      </div>
      <CodeBlock language="css" filename="Tailwind classes" code={code} />
      {total ? (
        <div className="overflow-x-auto rounded-2xl border border-border bg-surface shadow-raised">
          <table className="w-full min-w-[720px] text-left text-[13px]">
            <thead className="bg-sunken text-fg">
              <tr>
                {[...(multi ? ["Selector"] : []), "Declaration", "Tailwind", "Match"].map((h) => (
                  <th key={h} scope="col" className="px-3 py-2.5 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map(({ r, i }, k) => (
                <tr key={k} className="border-t border-border align-top">
                  {multi ? <td className="max-w-[200px] truncate px-3 py-2 font-mono text-[12px] text-fg-muted">{[...r.at, r.selector].filter(Boolean).join(" ") || "declarations"}</td> : null}
                  <td className="px-3 py-2 font-mono text-[12px] text-fg">{i.prop}: {i.value}{i.important ? " !important" : ""}</td>
                  <td className="px-3 py-2 font-mono text-[12px] text-fg">
                    {i.classes.length ? i.classes.map((c) => applyPrefix(r.prefix ?? "", c, i.important)).join(" ") : i.fallback && fallbacks ? applyPrefix(r.prefix ?? "", i.fallback, i.important) : <span className="text-fg-subtle">{i.note ? "" : "none"}</span>}
                    {i.note ? <div className="mt-1 max-w-[380px] font-sans text-[12px] text-fg-muted">{i.note}</div> : null}
                  </td>
                  <td className="px-3 py-2"><StatusBadge tone={TONE[i.status].tone}>{TONE[i.status].label}</StatusBadge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  )
}
