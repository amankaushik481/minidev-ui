"use client"
import * as React from "react"
import { Input } from "@/registry/ui/input"
import { Slider } from "@/registry/ui/slider"
import { SegmentedControl } from "@/registry/ui/segmented-control"
import { CodeBlock } from "@/registry/ui/code-block"
import { Control } from "./shadow-generator"

const num = (v: number | readonly number[]) => (Array.isArray(v) ? v[0] : (v as number))
const RATIOS = { "1.125": 1.125, "1.2": 1.2, "1.25": 1.25, "1.333": 1.333, "1.414": 1.414 } as const
const STEPS = ["xs", "sm", "base", "lg", "xl", "2xl", "3xl", "4xl", "5xl"] as const

/** clamp(min, preferred, max) where the preferred value is a line between two viewport widths. */
function clampFor(minPx: number, maxPx: number, vwMin: number, vwMax: number) {
  const slope = (maxPx - minPx) / (vwMax - vwMin)
  const intercept = minPx - slope * vwMin
  const r = (n: number) => +n.toFixed(4)
  // clamp() needs its lower bound first, even when a step shrinks on large screens
  const lo = Math.min(minPx, maxPx)
  const hi = Math.max(minPx, maxPx)
  return `clamp(${r(lo / 16)}rem, ${r(intercept / 16)}rem + ${r(slope * 100)}vw, ${r(hi / 16)}rem)`
}

/** Validates the four number fields. Returns the numbers, or a message for the first problem. */
export function validateRange(f: { vwMin: string; vwMax: string; baseMin: string; baseMax: string }): { ok: true; vwMin: number; vwMax: number; baseMin: number; baseMax: number } | { ok: false; field: keyof typeof f; error: string } {
  const n = (s: string) => (s.trim() === "" ? NaN : Number(s))
  const vwMin = n(f.vwMin), vwMax = n(f.vwMax), baseMin = n(f.baseMin), baseMax = n(f.baseMax)
  if (!(vwMin >= 200 && vwMin <= 3840)) return { ok: false, field: "vwMin", error: "Minimum viewport must be between 200 and 3840px." }
  if (!(vwMax >= 200 && vwMax <= 3840)) return { ok: false, field: "vwMax", error: "Maximum viewport must be between 200 and 3840px." }
  if (vwMax - vwMin < 100) return { ok: false, field: "vwMax", error: "Maximum viewport must be at least 100px wider than the minimum." }
  if (!(baseMin >= 8 && baseMin <= 64)) return { ok: false, field: "baseMin", error: "Base sizes must be between 8 and 64px." }
  if (!(baseMax >= 8 && baseMax <= 64)) return { ok: false, field: "baseMax", error: "Base sizes must be between 8 and 64px." }
  return { ok: true, vwMin, vwMax, baseMin, baseMax }
}

const INIT = { vwMin: "360", vwMax: "1280", baseMin: "16", baseMax: "18" }
const LAST_GOOD = { ok: true as const, vwMin: 360, vwMax: 1280, baseMin: 16, baseMax: 18 }

export function FluidTypeCalculator() {
  // Fields hold what was typed, so a value can be cleared and retyped; the scale uses the last valid set.
  const [fields, setFields] = React.useState(INIT)
  const [ratioMin, setRatioMin] = React.useState<keyof typeof RATIOS>("1.2")
  const [ratioMax, setRatioMax] = React.useState<keyof typeof RATIOS>("1.333")
  const [preview, setPreview] = React.useState(900)
  const [good, setGood] = React.useState(LAST_GOOD)
  const check = validateRange(fields)
  const { vwMin, vwMax, baseMin, baseMax } = good
  const at = Math.min(vwMax, Math.max(vwMin, preview))
  const setField = (k: keyof typeof INIT) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = { ...fields, [k]: e.target.value }
    setFields(next)
    const v = validateRange(next)
    if (v.ok) setGood(v)
  }
  const bad = (k: keyof typeof INIT) => !check.ok && check.field === k
  const scale = STEPS.map((name, i) => {
    const k = i - 2
    const min = baseMin * Math.pow(RATIOS[ratioMin], k)
    const max = baseMax * Math.pow(RATIOS[ratioMax], k)
    const t = Math.min(1, Math.max(0, (at - vwMin) / (vwMax - vwMin)))
    return { name, min, max, clamp: clampFor(min, max, vwMin, vwMax), at: min + (max - min) * t }
  })
  const css = `@theme {\n${scale.map((s) => `  --text-${s.name}: ${s.clamp};`).join("\n")}\n}`
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-5 rounded-2xl border border-border bg-surface p-5 shadow-raised md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-2">
          <span className="text-[13px] font-medium text-fg">Viewport range (px)</span>
          <div className="flex items-center gap-2">
            <Input aria-label="Minimum viewport" type="number" inputMode="numeric" value={fields.vwMin} onChange={setField("vwMin")} aria-invalid={bad("vwMin")} aria-describedby={bad("vwMin") ? "ft-err" : undefined} className="font-mono" />
            <span className="text-fg-subtle">to</span>
            <Input aria-label="Maximum viewport" type="number" inputMode="numeric" value={fields.vwMax} onChange={setField("vwMax")} aria-invalid={bad("vwMax")} aria-describedby={bad("vwMax") ? "ft-err" : undefined} className="font-mono" />
          </div>
        </div>
        <div className="space-y-2">
          <span className="text-[13px] font-medium text-fg">Base size (px)</span>
          <div className="flex items-center gap-2">
            <Input aria-label="Minimum base size" type="number" inputMode="decimal" value={fields.baseMin} onChange={setField("baseMin")} aria-invalid={bad("baseMin")} aria-describedby={bad("baseMin") ? "ft-err" : undefined} className="font-mono" />
            <span className="text-fg-subtle">to</span>
            <Input aria-label="Maximum base size" type="number" inputMode="decimal" value={fields.baseMax} onChange={setField("baseMax")} aria-invalid={bad("baseMax")} aria-describedby={bad("baseMax") ? "ft-err" : undefined} className="font-mono" />
          </div>
        </div>
        <div className="space-y-2">
          <span className="text-[13px] font-medium text-fg">Scale on small screens</span>
          <SegmentedControl size="sm" fullWidth items={Object.keys(RATIOS)} value={ratioMin} onChange={(v) => setRatioMin(v as keyof typeof RATIOS)} aria-label="Scale on small screens" />
        </div>
        <div className="space-y-2">
          <span className="text-[13px] font-medium text-fg">Scale on large screens</span>
          <SegmentedControl size="sm" fullWidth items={Object.keys(RATIOS)} value={ratioMax} onChange={(v) => setRatioMax(v as keyof typeof RATIOS)} aria-label="Scale on large screens" />
        </div>
        <p id="ft-err" className={check.ok ? "sr-only" : "text-[12.5px] text-danger md:col-span-2 lg:col-span-4"} aria-live="polite">
          {check.ok ? "" : `${check.error} The output below uses the last valid values.`}
        </p>
      </div>
      <div className="rounded-2xl border border-border bg-surface p-5 shadow-raised">
        <Control label="Preview at viewport width" value={`${at}px`}>
          <Slider value={[at]} min={vwMin} max={vwMax} onValueChange={(v) => setPreview(num(v))} showValue={false} aria-label="Preview viewport width" />
        </Control>
        <div className="mt-5 space-y-3 overflow-hidden">
          {[...scale].reverse().map((s) => (
            <div key={s.name} className="flex items-baseline gap-4">
              <span className="w-24 shrink-0 font-mono text-[11px] text-fg-subtle">{s.name} · {s.at.toFixed(1)}px</span>
              <span className="truncate font-medium tracking-[-0.02em] text-fg" style={{ fontSize: s.at, lineHeight: 1.15 }}>Every pixel, accounted for</span>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <CodeBlock language="css" filename="Tailwind CSS v4 @theme" code={css} />
        <CodeBlock language="css" filename="Plain CSS" code={`:root {\n${scale.map((s) => `  --step-${s.name}: ${s.clamp};`).join("\n")}\n}`} />
      </div>
    </div>
  )
}
