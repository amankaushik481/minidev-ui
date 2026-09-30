"use client"
import * as React from "react"
import { Slider } from "@/registry/ui/slider"
import { SegmentedControl } from "@/registry/ui/segmented-control"
import { CodeBlock } from "@/registry/ui/code-block"
import { StatusBadge } from "@/registry/ui/status-badge"
import { contrast, hexToRgb, rgbToHex } from "@/lib/color"
import { Control } from "./shadow-generator"

type Bg = "Aurora" | "Sunset" | "Ocean" | "Mono"
const BACKGROUNDS: Record<Bg, { css: string; avg: string }> = {
  Aurora: { css: "radial-gradient(40% 50% at 25% 30%, #8b5cf6, transparent), radial-gradient(35% 45% at 75% 65%, #22d3ee, transparent), radial-gradient(30% 40% at 60% 20%, #f472b6, transparent), #0f0a1e", avg: "#4a3a8a" },
  Sunset: { css: "radial-gradient(45% 55% at 30% 70%, #fb923c, transparent), radial-gradient(40% 50% at 70% 30%, #f43f5e, transparent), radial-gradient(30% 40% at 50% 90%, #facc15, transparent), #3b0a1a", avg: "#b0473f" },
  Ocean: { css: "radial-gradient(45% 55% at 20% 30%, #06b6d4, transparent), radial-gradient(40% 50% at 80% 70%, #2563eb, transparent), radial-gradient(30% 40% at 55% 45%, #34d399, transparent), #04172b", avg: "#1f6a8a" },
  Mono: { css: "radial-gradient(40% 50% at 30% 35%, #f5f5f5, transparent), radial-gradient(40% 50% at 70% 70%, #737373, transparent), #171717", avg: "#6e6e6e" },
}

type S = { blur: number; alpha: number; sat: number; border: number; radius: number; tint: string; bg: Bg; text: "White" | "Black" }
const INIT: S = { blur: 20, alpha: 18, sat: 160, border: 35, radius: 22, tint: "#ffffff", bg: "Aurora", text: "White" }

const num = (v: number | readonly number[]) => (Array.isArray(v) ? v[0] : (v as number))

export function GlassGenerator() {
  const [s, setS] = React.useState(INIT)
  const set = <K extends keyof S>(k: K, v: S[K]) => setS((p) => ({ ...p, [k]: v }))
  const [r, g, b] = (hexToRgb(s.tint) ?? [1, 1, 1]).map((v) => Math.round(v * 255))
  const a = s.alpha / 100
  const fill = `rgb(${r} ${g} ${b} / ${a})`
  const edge = `rgb(${r} ${g} ${b} / ${s.border / 100})`
  const filter = `blur(${s.blur}px) saturate(${s.sat}%)`
  // Approximate what the text sits on: the tint over the blurred average of the background.
  const avg = hexToRgb(BACKGROUNDS[s.bg].avg) ?? [0.5, 0.5, 0.5]
  const under = rgbToHex(avg.map((v, i) => v * (1 - a) + [r, g, b][i] / 255 * a) as [number, number, number])
  const ratio = contrast(under, s.text === "White" ? "#FFFFFF" : "#000000")
  const css = `.glass {\n  background: ${fill};\n  backdrop-filter: ${filter};\n  -webkit-backdrop-filter: ${filter};\n  border: 1px solid ${edge};\n  border-radius: ${s.radius}px;\n}`
  const isWhite = s.tint.toLowerCase() === "#ffffff"
  const tw = `${isWhite ? `bg-white/${s.alpha}` : `bg-[${fill.replace(/ /g, "_")}]`} backdrop-blur-[${s.blur}px] backdrop-saturate-[${s.sat / 100}] border ${isWhite ? `border-white/${s.border}` : `border-[${edge.replace(/ /g, "_")}]`} rounded-[${s.radius}px]`
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
      <div className="relative grid grid-cols-1 h-[440px] place-items-center overflow-hidden rounded-2xl border border-border" style={{ background: BACKGROUNDS[s.bg].css }}>
        <div aria-hidden className="absolute top-[18%] left-[16%] size-40 rounded-full bg-white/70" />
        <div aria-hidden className="absolute right-[14%] bottom-[14%] size-28 rotate-12 rounded-3xl bg-black/50" />
        <div
          className="relative flex h-[220px] w-[320px] flex-col justify-between p-6"
          style={{ background: fill, backdropFilter: filter, WebkitBackdropFilter: filter, border: `1px solid ${edge}`, borderRadius: s.radius, color: s.text === "White" ? "#fff" : "#0a0a0a" }}
        >
          <span className="text-[13px] opacity-80">Balance</span>
          <span>
            <span className="block text-[34px] leading-none font-semibold tracking-[-0.04em]">$24,810.40</span>
            <span className="mt-2 block text-[13px] opacity-75">Frosted glass card · {s.blur}px blur</span>
          </span>
        </div>
      </div>

      <div className="space-y-5 rounded-2xl border border-border bg-surface p-5 shadow-raised">
        <Control label="Blur" value={`${s.blur}px`}><Slider value={[s.blur]} min={0} max={48} onValueChange={(v) => set("blur", num(v))} showValue={false} aria-label="Blur" /></Control>
        <Control label="Transparency" value={`${s.alpha}%`}><Slider value={[s.alpha]} min={0} max={80} onValueChange={(v) => set("alpha", num(v))} showValue={false} aria-label="Fill opacity" /></Control>
        <Control label="Saturation" value={`${s.sat}%`}><Slider value={[s.sat]} min={100} max={220} onValueChange={(v) => set("sat", num(v))} showValue={false} aria-label="Saturation" /></Control>
        <Control label="Border" value={`${s.border}%`}><Slider value={[s.border]} min={0} max={80} onValueChange={(v) => set("border", num(v))} showValue={false} aria-label="Border opacity" /></Control>
        <Control label="Radius" value={`${s.radius}px`}><Slider value={[s.radius]} min={0} max={40} onValueChange={(v) => set("radius", num(v))} showValue={false} aria-label="Radius" /></Control>
        <div className="flex items-center justify-between gap-3">
          <label htmlFor="glass-tint" className="text-[13px] font-medium text-fg">Tint</label>
          <input id="glass-tint" type="color" value={s.tint} onChange={(e) => set("tint", e.target.value)} className="h-8 w-14 cursor-pointer rounded-md border border-border bg-transparent" />
        </div>
        <div className="space-y-2">
          <span className="text-[13px] font-medium text-fg">Background</span>
          <SegmentedControl size="sm" fullWidth items={["Aurora", "Sunset", "Ocean", "Mono"]} value={s.bg} onChange={(v) => set("bg", v as Bg)} aria-label="Background" />
        </div>
        <div className="flex items-center justify-between gap-3">
          <SegmentedControl size="sm" items={["White", "Black"]} value={s.text} onChange={(v) => set("text", v as S["text"])} aria-label="Text color" />
          <StatusBadge tone={ratio >= 4.5 ? "success" : ratio >= 3 ? "warning" : "danger"}>Text {ratio.toFixed(1)}:1</StatusBadge>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:col-span-2 lg:grid-cols-2">
        <CodeBlock language="css" filename="CSS" code={css} />
        <CodeBlock language="html" filename="Tailwind classes" code={tw} />
      </div>
    </div>
  )
}
