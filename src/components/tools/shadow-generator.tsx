"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Slider } from "@/registry/ui/slider"
import { SegmentedControl } from "@/registry/ui/segmented-control"
import { CodeBlock } from "@/registry/ui/code-block"
import { hexToRgb } from "@/lib/color"

type State = { lx: number; ly: number; elevation: number; softness: number; layers: number; opacity: number; color: string; radius: number; bg: "Light" | "Dark" | "Tint" }

const INIT: State = { lx: 0.3, ly: 0.12, elevation: 24, softness: 60, layers: 5, opacity: 30, color: "#0b0b14", radius: 20, bg: "Light" }

/** Doubling offsets and blur, fading opacity: a contact shadow plus penumbra. */
function shadows(s: State) {
  // direction: away from the light, relative to the card at the centre of the stage
  const dx = 0.5 - s.lx
  const dy = 0.5 - s.ly
  const len = Math.hypot(dx, dy) || 1
  const ux = dx / len
  const uy = dy / len
  const reach = Math.min(1, len * 1.8) // light straight above casts a short shadow
  const rgb = hexToRgb(s.color) ?? [0, 0, 0]
  const [r, g, b] = rgb.map((v) => Math.round(v * 255))
  const out: string[] = []
  for (let i = 0; i < s.layers; i++) {
    const k = Math.pow(2, i) / Math.pow(2, s.layers - 1) // 1/2^(n-1) .. 1
    const dist = s.elevation * k * reach
    const x = +(ux * dist).toFixed(1)
    const y = +(uy * dist + s.elevation * k * 0.15).toFixed(1)
    const blur = +(s.elevation * k * (0.6 + (s.softness / 100) * 1.6)).toFixed(1)
    const spread = i === 0 ? 0 : -+(blur * 0.08).toFixed(1)
    const alpha = +((s.opacity / 100) * (1 - (i / s.layers) * 0.5) / Math.pow(s.layers, 0.35)).toFixed(3)
    out.push(`${x}px ${y}px ${blur}px ${spread}px rgb(${r} ${g} ${b} / ${alpha})`)
  }
  return out
}

export function ShadowGenerator() {
  const [s, setS] = React.useState(INIT)
  const stage = React.useRef<HTMLDivElement>(null)
  const set = <K extends keyof State>(k: K, v: State[K]) => setS((p) => ({ ...p, [k]: v }))
  const list = shadows(s)
  const css = `box-shadow:\n  ${list.join(",\n  ")};`
  const tw = `shadow-[${list.join(",").replace(/ /g, "_")}]`
  const drag = (e: React.PointerEvent) => {
    const r = stage.current!.getBoundingClientRect()
    setS((p) => ({ ...p, lx: Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)), ly: Math.min(1, Math.max(0, (e.clientY - r.top) / r.height)) }))
  }
  const bg = s.bg === "Light" ? "#f4f4f6" : s.bg === "Dark" ? "#16161b" : "#e9e4ff"
  const card = s.bg === "Dark" ? "#22222a" : "#ffffff"
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
      <div
        ref={stage}
        onPointerDown={(e) => {
          ;(e.target as HTMLElement).setPointerCapture?.(e.pointerId)
          drag(e)
        }}
        onPointerMove={(e) => e.buttons === 1 && drag(e)}
        className="relative h-[440px] cursor-crosshair touch-none overflow-hidden rounded-2xl border border-border select-none"
        style={{ background: bg }}
        role="application"
        aria-label="Drag to move the light source"
      >
        <div
          className="pointer-events-none absolute"
          style={{ left: `${s.lx * 100}%`, top: `${s.ly * 100}%`, width: 520, height: 520, transform: "translate(-50%,-50%)", background: "radial-gradient(closest-side, rgb(255 255 255 / 0.55), transparent)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute grid grid-cols-1 size-9 place-items-center rounded-full bg-white shadow-[0_0_24px_6px_rgb(255_240_200/0.9)]"
          style={{ left: `calc(${s.lx * 100}% - 18px)`, top: `calc(${s.ly * 100}% - 18px)` }}
        >
          <span className="size-3 rounded-full bg-amber-300" />
        </div>
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 flex h-[180px] w-[280px] -translate-x-1/2 -translate-y-1/2 flex-col justify-end p-5"
          style={{ background: card, borderRadius: s.radius, boxShadow: list.join(", ") }}
        >
          <span className={cn("text-[15px] font-medium", s.bg === "Dark" ? "text-white" : "text-neutral-900")}>Elevation {s.elevation}</span>
          <span className={cn("text-[13px]", s.bg === "Dark" ? "text-white/60" : "text-neutral-500")}>{s.layers} layers · drag the light</span>
        </div>
      </div>

      <div className="space-y-5 rounded-2xl border border-border bg-surface p-5 shadow-raised">
        <Control label="Elevation" value={`${s.elevation}px`}><Slider value={[s.elevation]} min={2} max={80} onValueChange={(v: number | readonly number[]) => set("elevation", Array.isArray(v) ? v[0] : (v as number))} showValue={false} aria-label="Elevation" /></Control>
        <Control label="Softness" value={`${s.softness}%`}><Slider value={[s.softness]} min={0} max={100} onValueChange={(v: number | readonly number[]) => set("softness", Array.isArray(v) ? v[0] : (v as number))} showValue={false} aria-label="Softness" /></Control>
        <Control label="Layers" value={String(s.layers)}><Slider value={[s.layers]} min={1} max={6} onValueChange={(v: number | readonly number[]) => set("layers", Array.isArray(v) ? v[0] : (v as number))} showValue={false} aria-label="Layers" /></Control>
        <Control label="Opacity" value={`${s.opacity}%`}><Slider value={[s.opacity]} min={2} max={60} onValueChange={(v: number | readonly number[]) => set("opacity", Array.isArray(v) ? v[0] : (v as number))} showValue={false} aria-label="Opacity" /></Control>
        <Control label="Radius" value={`${s.radius}px`}><Slider value={[s.radius]} min={0} max={40} onValueChange={(v: number | readonly number[]) => set("radius", Array.isArray(v) ? v[0] : (v as number))} showValue={false} aria-label="Radius" /></Control>
        <div className="flex items-center justify-between gap-3">
          <label htmlFor="shadow-color" className="text-[13px] font-medium text-fg">Shadow color</label>
          <input id="shadow-color" type="color" value={s.color} onChange={(e) => set("color", e.target.value)} className="h-8 w-14 cursor-pointer rounded-md border border-border bg-transparent" />
        </div>
        <div className="flex items-center justify-between gap-3">
          <span className="text-[13px] font-medium text-fg">Background</span>
          <SegmentedControl size="sm" items={["Light", "Dark", "Tint"]} value={s.bg} onChange={(v) => set("bg", v as State["bg"])} aria-label="Background" />
        </div>
        <button type="button" onClick={() => setS(INIT)} className="text-[12.5px] text-fg-muted underline underline-offset-4 hover:text-fg">Reset</button>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:col-span-2 lg:grid-cols-2">
        <CodeBlock language="css" filename="CSS" code={css} />
        <CodeBlock language="html" filename="Tailwind class" code={tw} />
      </div>
    </div>
  )
}

export function Control({ label, value, children }: { label: string; value: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-[13px]">
        <span className="font-medium text-fg">{label}</span>
        <span className="font-mono text-fg-muted tabular-nums">{value}</span>
      </div>
      {children}
    </div>
  )
}
