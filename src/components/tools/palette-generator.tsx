"use client"
import * as React from "react"
import { CheckIcon, CopyIcon } from "lucide-react"
import { Slider } from "@/registry/ui/slider"
import { Input } from "@/registry/ui/input"
import { SegmentedControl } from "@/registry/ui/segmented-control"
import { CodeBlock } from "@/registry/ui/code-block"
import { contrast, fmtOklch, hexToOklch, oklchToHex, palette } from "@/lib/color"
import { Control } from "./shadow-generator"

const num = (v: number | readonly number[]) => (Array.isArray(v) ? v[0] : (v as number))

function Swatch({ step, hex, oklch }: { step: number; hex: string; oklch: string }) {
  const [ok, setOk] = React.useState(false)
  const w = contrast(hex, "#FFFFFF")
  const k = contrast(hex, "#000000")
  const best = w >= k ? "#FFFFFF" : "#000000"
  return (
    <button
      type="button"
      onClick={async () => {
        try { await navigator.clipboard.writeText(hex) } catch {}
        setOk(true)
        setTimeout(() => setOk(false), 1000)
      }}
      className="group flex min-w-0 flex-col overflow-hidden rounded-xl border border-border bg-surface text-left shadow-raised outline-none focus-visible:ring-2 focus-visible:ring-accent"
      aria-label={`Copy ${step} ${hex}`}
    >
      <span className="relative flex h-24 items-end justify-between p-2.5" style={{ background: hex, color: best }}>
        <span className="text-[12px] font-semibold">{step}</span>
        {ok ? <CheckIcon className="size-3.5" /> : <CopyIcon className="size-3.5 opacity-0 group-hover:opacity-80" />}
      </span>
      <span className="space-y-0.5 p-2.5 font-mono text-[10.5px] leading-[1.5] text-fg-muted">
        <span className="block text-fg">{hex}</span>
        <span className="block truncate" title={oklch}>{oklch.replace("oklch", "")}</span>
        <span className="flex gap-2">
          <span className={w >= 4.5 ? "text-success" : "text-fg-subtle"}>W {w.toFixed(1)}</span>
          <span className={k >= 4.5 ? "text-success" : "text-fg-subtle"}>B {k.toFixed(1)}</span>
        </span>
      </span>
    </button>
  )
}

export function PaletteGenerator() {
  const [hue, setHue] = React.useState(262)
  const [chroma, setChroma] = React.useState(0.2)
  const [name, setName] = React.useState("brand")
  const [hex, setHex] = React.useState("#6D5BFF")
  const [fmt, setFmt] = React.useState<"Tailwind v4" | "CSS vars" | "Hex">("Tailwind v4")
  const steps = palette(hue, chroma)
  const slug = name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "brand"

  const fromHex = (v: string) => {
    setHex(v)
    const o = hexToOklch(v)
    if (o && o.c > 0.01) {
      setHue(Math.round(o.h))
      setChroma(+Math.min(0.37, o.c).toFixed(3))
    }
  }

  const code =
    fmt === "Tailwind v4"
      ? `@theme {\n${steps.map((s) => `  --color-${slug}-${s.step}: ${fmtOklch(s.oklch)};`).join("\n")}\n}`
      : fmt === "CSS vars"
        ? `:root {\n${steps.map((s) => `  --${slug}-${s.step}: ${fmtOklch(s.oklch)}; /* ${s.hex} */`).join("\n")}\n}`
        : steps.map((s) => `${s.step}: ${s.hex}`).join("\n")

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-5 rounded-2xl border border-border bg-surface p-5 shadow-raised md:grid-cols-[1fr_1fr_1fr]">
        <div className="space-y-2">
          <label htmlFor="pal-hex" className="text-[13px] font-medium text-fg">Start from a hex</label>
          <div className="flex gap-2">
            <input type="color" aria-label="Pick a color" value={/^#[0-9a-f]{6}$/i.test(hex) ? hex : "#6d5bff"} onChange={(e) => fromHex(e.target.value.toUpperCase())} className="h-9 w-12 shrink-0 cursor-pointer rounded-md border border-border bg-transparent" />
            <Input id="pal-hex" value={hex} onChange={(e) => fromHex(e.target.value)} className="font-mono" />
          </div>
          <label htmlFor="pal-name" className="block pt-2 text-[13px] font-medium text-fg">Color name</label>
          <Input id="pal-name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <Control label="Hue" value={`${hue}°`}>
          <Slider value={[hue]} min={0} max={359} onValueChange={(v) => { setHue(num(v)); setHex(oklchToHex({ l: 0.62, c: chroma, h: num(v) })) }} showValue={false} aria-label="Hue" />
          <div aria-hidden className="mt-3 h-3 rounded-full" style={{ background: `linear-gradient(90deg, ${Array.from({ length: 13 }, (_, i) => oklchToHex({ l: 0.68, c: 0.15, h: i * 30 })).join(",")})` }} />
        </Control>
        <Control label="Chroma" value={chroma.toFixed(3)}>
          <Slider value={[Math.round(chroma * 1000)]} min={0} max={370} onValueChange={(v) => { setChroma(num(v) / 1000); setHex(oklchToHex({ l: 0.62, c: num(v) / 1000, h: hue })) }} showValue={false} aria-label="Chroma" />
          <p className="mt-3 text-[12px] leading-[1.5] text-fg-muted">Peak saturation at step 500. Steps outside sRGB are pulled in automatically.</p>
        </Control>
      </div>

      <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-6 lg:grid-cols-11">
        {steps.map((s) => (
          <Swatch key={s.step} step={s.step} hex={s.hex} oklch={fmtOklch(s.oklch)} />
        ))}
      </div>

      <div className="space-y-3">
        <SegmentedControl size="sm" items={["Tailwind v4", "CSS vars", "Hex"]} value={fmt} onChange={(v) => setFmt(v as typeof fmt)} aria-label="Export format" />
        <CodeBlock language={fmt === "Hex" ? "bash" : "css"} filename={fmt === "Tailwind v4" ? "globals.css" : fmt === "CSS vars" ? "tokens.css" : "palette.txt"} code={code} />
      </div>
    </div>
  )
}
