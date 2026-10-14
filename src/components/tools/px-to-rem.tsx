"use client"
import * as React from "react"
import { Input } from "@/registry/ui/input"
import { Textarea } from "@/registry/ui/textarea"
import { Slider } from "@/registry/ui/slider"
import { Switch } from "@/registry/ui/switch"
import { SegmentedControl } from "@/registry/ui/segmented-control"
import { CodeBlock } from "@/registry/ui/code-block"
import { Control } from "./shadow-generator"

/*
 * px <-> rem. One division, a Tailwind v4 lookup, and a batch converter that
 * rewrites px values in pasted CSS. All helpers are pure.
 */

/** Rounds to `precision` decimals and drops trailing zeros. */
export const trim = (n: number, precision = 4) => +n.toFixed(precision)

export const pxToRem = (px: number, base = 16, precision = 4) => trim(px / (base || 16), precision)
export const remToPx = (rem: number, base = 16, precision = 4) => trim(rem * (base || 16), precision)

/** Tailwind CSS v4 default text sizes in rem. */
export const TEXT_SIZES: [string, number][] = [
  ["xs", 0.75], ["sm", 0.875], ["base", 1], ["lg", 1.125], ["xl", 1.25], ["2xl", 1.5], ["3xl", 1.875], ["4xl", 2.25], ["5xl", 3], ["6xl", 3.75], ["7xl", 4.5], ["8xl", 6], ["9xl", 8],
]

export type TailwindMatch = { utility: string; exact: boolean }

/**
 * Spacing suffix for a px value: v4 accepts any multiple of 0.25rem as a bare
 * number (`p-3.25`), `px` for 1px, and an arbitrary value for anything else.
 */
export function tailwindSpacing(px: number, base = 16): TailwindMatch {
  if (px === 0) return { utility: "0", exact: true }
  if (px === 1) return { utility: "px", exact: true }
  const n = px / (base / 4)
  const ok = n > 0 && Math.abs(n * 4 - Math.round(n * 4)) < 1e-6
  if (ok) return { utility: String(trim(n, 2)), exact: true }
  return { utility: `[${trim(px, 2)}px]`, exact: false }
}

/** Named text size for a px value, or the nearest one and an arbitrary fallback. */
export function tailwindText(px: number, base = 16): { utility: string; exact: boolean; nearest: string } {
  const rem = px / base
  let best = TEXT_SIZES[0]
  for (const t of TEXT_SIZES) if (Math.abs(t[1] - rem) < Math.abs(best[1] - rem)) best = t
  const exact = Math.abs(best[1] - rem) < 1e-6
  return { utility: exact ? `text-${best[0]}` : `text-[${trim(px, 2)}px]`, exact, nearest: `text-${best[0]}` }
}

export type BatchOptions = { base: number; precision: number; keepBorders: boolean; to: "rem" | "px" }
export type BatchResult = { css: string; converted: number; kept: number }

const PX = /(-?(?:\d+\.?\d*|\.\d+))px(?![a-zA-Z0-9_-])/g
const REM = /(-?(?:\d+\.?\d*|\.\d+))rem(?![a-zA-Z0-9_-])/g

/** Property name of the declaration a match sits in, read backwards from the match. */
export function propertyBefore(css: string, index: number): string {
  const start = Math.max(css.lastIndexOf(";", index), css.lastIndexOf("{", index), css.lastIndexOf("}", index)) + 1
  const m = css.slice(start, index).match(/([a-zA-Z-]+)\s*:/)
  return m ? m[1].toLowerCase() : ""
}

/** Rewrites every px (or rem) value in a stylesheet. 1px and thinner borders and outlines can be kept. */
export function convertCss(css: string, o: BatchOptions): BatchResult {
  let converted = 0
  let kept = 0
  const re = o.to === "rem" ? PX : REM
  const out = css.replace(re, (whole: string, n: string, index: number) => {
    const v = parseFloat(n)
    if (Number.isNaN(v)) return whole
    if (v === 0) {
      converted++
      return "0"
    }
    if (o.to === "rem" && o.keepBorders && Math.abs(v) <= 1 && /^(border|outline)/.test(propertyBefore(css, index))) {
      kept++
      return whole
    }
    converted++
    return o.to === "rem" ? `${pxToRem(v, o.base, o.precision)}rem` : `${remToPx(v, o.base, o.precision)}px`
  })
  return { css: out, converted, kept }
}

/* ----------------------------------- UI ----------------------------------- */

const num = (v: number | readonly number[]) => (Array.isArray(v) ? v[0] : (v as number))
const TABLE = [4, 6, 8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 40, 48, 56, 64, 72, 80, 96]
const SAMPLE = `.card {
  padding: 24px 20px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  font-size: 14px;
  line-height: 20px;
  box-shadow: 0 1px 2px rgb(0 0 0 / 0.06);
}
.card h2 {
  margin: 0 0 8px;
  font-size: 18px;
  letter-spacing: -0.2px;
}
@media (min-width: 768px) {
  .card { padding: 32px; }
}`

const parse = (s: string) => {
  const v = parseFloat(s)
  return Number.isFinite(v) ? v : null
}

export function PxToRem() {
  const [base, setBase] = React.useState(16)
  const [px, setPx] = React.useState("20")
  const [rem, setRem] = React.useState("1.25")
  const [css, setCss] = React.useState(SAMPLE)
  const [precision, setPrecision] = React.useState(4)
  const [keepBorders, setKeepBorders] = React.useState(true)
  const [to, setTo] = React.useState<"rem" | "px">("rem")
  const b = base > 0 ? base : 16
  const onPx = (v: string) => {
    setPx(v)
    const n = parse(v)
    setRem(n === null ? "" : String(pxToRem(n, b)))
  }
  const onRem = (v: string) => {
    setRem(v)
    const n = parse(v)
    setPx(n === null ? "" : String(remToPx(n, b)))
  }
  const onBase = (v: number) => {
    setBase(v)
    const n = parse(px)
    if (n !== null && v > 0) setRem(String(pxToRem(n, v)))
  }
  const pxN = parse(px)
  const spacing = pxN !== null ? tailwindSpacing(pxN, b) : null
  const text = pxN !== null ? tailwindText(pxN, b) : null
  const result = React.useMemo(() => convertCss(css, { base: b, precision, keepBorders, to }), [css, b, precision, keepBorders, to])
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-5 rounded-2xl border border-border bg-surface p-5 shadow-raised md:grid-cols-[1fr_1fr_1fr]">
        <div className="space-y-2">
          <label htmlFor="pr-px" className="text-[13px] font-medium text-fg">Pixels</label>
          <div className="flex items-center gap-2">
            <Input id="pr-px" type="number" inputMode="decimal" value={px} onChange={(e) => onPx(e.target.value)} className="font-mono" aria-invalid={px !== "" && pxN === null} />
            <span className="text-[13px] text-fg-subtle">px</span>
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor="pr-rem" className="text-[13px] font-medium text-fg">Rem</label>
          <div className="flex items-center gap-2">
            <Input id="pr-rem" type="number" inputMode="decimal" value={rem} onChange={(e) => onRem(e.target.value)} className="font-mono" aria-invalid={rem !== "" && parse(rem) === null} />
            <span className="text-[13px] text-fg-subtle">rem</span>
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor="pr-base" className="text-[13px] font-medium text-fg">Root font size</label>
          <div className="flex items-center gap-2">
            <Input id="pr-base" type="number" min={1} value={base} onChange={(e) => onBase(Math.max(0, +e.target.value))} className="font-mono" aria-invalid={!(base > 0)} />
            <span className="text-[13px] text-fg-subtle">px</span>
          </div>
        </div>
        <p className="text-[13px] text-fg-muted md:col-span-3" aria-live="polite">
          {pxN === null ? (
            "Type a number in either field. The other one updates as you type."
          ) : (
            <>
              <span className="font-mono text-fg">{trim(pxN, 4)}px ÷ {b} = {pxToRem(pxN, b)}rem</span>
              {spacing && text ? (
                <>
                  {" "}· Tailwind spacing <span className="font-mono text-fg">p-{spacing.utility}</span>
                  {spacing.exact ? "" : " (not on the 0.25rem scale, so an arbitrary value)"}
                  {" "}· text size <span className="font-mono text-fg">{text.utility}</span>
                  {text.exact ? "" : <> (nearest named size is <span className="font-mono text-fg">{text.nearest}</span>)</>}
                </>
              ) : null}
            </>
          )}
        </p>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border bg-surface shadow-raised">
        <table className="w-full min-w-[560px] text-left text-[13px]">
          <caption className="sr-only">Common pixel sizes converted to rem at a {b}px root, with Tailwind CSS v4 utilities</caption>
          <thead className="bg-sunken text-fg">
            <tr>
              {["px", "rem", "Tailwind spacing", "Tailwind text size"].map((h) => (
                <th key={h} scope="col" className="px-4 py-2.5 font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE.map((p) => {
              const s = tailwindSpacing(p, b)
              const t = tailwindText(p, b)
              return (
                <tr key={p} className="border-t border-border">
                  <td className="px-4 py-2 font-mono text-fg tabular-nums">{p}px</td>
                  <td className="px-4 py-2 font-mono text-fg tabular-nums">{pxToRem(p, b)}rem</td>
                  <td className="px-4 py-2 font-mono whitespace-nowrap text-fg-muted">{s.exact ? `p-${s.utility} · gap-${s.utility} · w-${s.utility}` : `p-${s.utility}`}</td>
                  <td className="px-4 py-2 font-mono text-fg-muted">
                    {t.exact ? t.utility : <>{t.utility} <span className="text-fg-subtle">(near {t.nearest})</span></>}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="rounded-2xl border border-border bg-surface p-5 shadow-raised">
          <div className="flex items-center justify-between gap-3">
            <label htmlFor="pr-css" className="text-[13px] font-medium text-fg">Batch: paste CSS</label>
            <button type="button" onClick={() => setCss(SAMPLE)} className="text-[12.5px] text-fg-muted underline underline-offset-4 hover:text-fg">Load example</button>
          </div>
          <Textarea id="pr-css" value={css} onChange={(e) => setCss(e.target.value)} rows={12} spellCheck={false} placeholder="Paste CSS with px values" className="mt-2 min-h-[240px] font-mono text-[12.5px] leading-[1.6]" />
          <p className="mt-2 text-[12.5px] text-fg-muted" aria-live="polite">
            {!css.trim() ? "Paste a stylesheet to convert it." : result.converted === 0 && result.kept === 0 ? `No ${to === "rem" ? "px" : "rem"} values found.` : `Converted ${result.converted} value${result.converted === 1 ? "" : "s"}${result.kept ? `, kept ${result.kept} thin border${result.kept === 1 ? "" : "s"} in px` : ""}.`}
          </p>
        </div>
        <div className="space-y-5 self-start rounded-2xl border border-border bg-surface p-5 shadow-raised">
          <div className="space-y-2">
            <span className="text-[13px] font-medium text-fg">Direction</span>
            <SegmentedControl size="sm" fullWidth items={["rem", "px"]} value={to} onChange={(v) => setTo(v as "rem" | "px")} aria-label="Convert to" />
            <p className="text-[12px] text-fg-muted">{to === "rem" ? "Every px value becomes rem." : "Every rem value becomes px."}</p>
          </div>
          <Control label="Decimals" value={String(precision)}>
            <Slider value={[precision]} min={1} max={5} onValueChange={(v) => setPrecision(num(v))} showValue={false} aria-label="Decimals" />
          </Control>
          <Switch size="sm" label="Keep 1px borders" description="Borders and outlines of 1px or less stay in px" checked={keepBorders} onCheckedChange={setKeepBorders} disabled={to !== "rem"} />
        </div>
        <div className="lg:col-span-2">
          <CodeBlock language="css" filename={to === "rem" ? "converted-to-rem.css" : "converted-to-px.css"} code={css.trim() ? result.css : "/* Paste CSS above to convert it. */"} />
        </div>
      </div>
    </div>
  )
}
