"use client"
import * as React from "react"
import { PlusIcon, ShuffleIcon, XIcon } from "lucide-react"
import { Button } from "@/registry/ui/button"
import { Input } from "@/registry/ui/input"
import { Slider } from "@/registry/ui/slider"
import { SegmentedControl } from "@/registry/ui/segmented-control"
import { CodeBlock } from "@/registry/ui/code-block"
import { hexToRgb, oklchToHex, toGamut } from "@/lib/color"
import { Control } from "./shadow-generator"

/*
 * CSS gradient generator. The gradient is plain data (kind, angle, position,
 * colour space and stops); `gradientCss` turns it into one gradient function
 * and everything else is derived from that string.
 */

export type GradientKind = "linear" | "radial" | "conic"
export type Space = "srgb" | "oklch" | "oklab"
export type Stop = { color: string; pos: number; alpha: number }
export type Gradient = {
  kind: GradientKind
  /** Degrees clockwise from the top, as CSS counts them. Linear and conic. */
  angle: number
  /** Centre in percent. Radial and conic. */
  x: number
  y: number
  shape: "circle" | "ellipse"
  space: Space
  stops: Stop[]
}

const num = (v: number | readonly number[]) => (Array.isArray(v) ? v[0] : (v as number))
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))

/** One stop as a CSS colour: hex when opaque, rgb() with alpha otherwise. */
export function stopColor(s: Stop): string {
  const rgb = hexToRgb(s.color) ?? [0, 0, 0]
  if (s.alpha >= 100) return s.color.toUpperCase()
  const [r, g, b] = rgb.map((v) => Math.round(v * 255))
  return `rgb(${r} ${g} ${b} / ${+(s.alpha / 100).toFixed(2)})`
}

const stopList = (stops: Stop[]) =>
  [...stops]
    .sort((a, b) => a.pos - b.pos)
    .map((s) => `${stopColor(s)} ${Math.round(s.pos)}%`)
    .join(", ")

/** The gradient function, for example `linear-gradient(135deg in oklch, #6D5BFF 0%, #F472B6 100%)`. */
export function gradientCss(g: Gradient): string {
  const space = g.space === "srgb" ? "" : ` in ${g.space}`
  const stops = stopList(g.stops)
  if (g.kind === "linear") return `linear-gradient(${Math.round(g.angle)}deg${space}, ${stops})`
  if (g.kind === "radial") return `radial-gradient(${g.shape} at ${Math.round(g.x)}% ${Math.round(g.y)}%${space}, ${stops})`
  return `conic-gradient(from ${Math.round(g.angle)}deg at ${Math.round(g.x)}% ${Math.round(g.y)}%${space}, ${stops})`
}

/** The gradient function split over lines, one stop per line, for the CSS output. */
export function gradientCssPretty(g: Gradient): string {
  const one = gradientCss(g)
  const open = one.indexOf("(")
  const head = one.slice(0, open + 1)
  const args = one.slice(open + 1, -1)
  // The first argument (angle, shape or `from`) is everything before the first stop.
  const parts = args.split(/,\s(?=(?:#|rgb\())/)
  return `${head}\n  ${parts.join(",\n  ")}\n)`
}

/** The same gradient as a Tailwind arbitrary value: spaces become underscores. */
export const tailwindClass = (g: Gradient) => `bg-[${gradientCss(g).replace(/\s+/g, "_")}]`

/** Linear sRGB mix of the stops at `pos`, used when a stop is added by clicking the bar. */
export function colorAt(stops: Stop[], pos: number): Stop {
  const s = [...stops].sort((a, b) => a.pos - b.pos)
  if (!s.length) return { color: "#6D5BFF", pos, alpha: 100 }
  if (pos <= s[0].pos) return { ...s[0], pos }
  if (pos >= s[s.length - 1].pos) return { ...s[s.length - 1], pos }
  const i = s.findIndex((x) => x.pos > pos)
  const a = s[i - 1], b = s[i]
  const t = b.pos === a.pos ? 0 : (pos - a.pos) / (b.pos - a.pos)
  const ra = hexToRgb(a.color) ?? [0, 0, 0], rb = hexToRgb(b.color) ?? [0, 0, 0]
  const mix = ra.map((v, k) => v + (rb[k] - v) * t)
  const hex = "#" + mix.map((v) => Math.round(clamp(v, 0, 1) * 255).toString(16).padStart(2, "0")).join("").toUpperCase()
  return { color: hex, pos, alpha: Math.round(a.alpha + (b.alpha - a.alpha) * t) }
}

/**
 * Harmonious stops from OKLCH: one hue, a short walk around the wheel and a
 * gentle lightness drift, so neighbours never pass through grey. `rand` is
 * injectable so tests are deterministic.
 */
export function randomStops(rand: () => number = Math.random, closed = false): Stop[] {
  const n = rand() < 0.55 ? 2 : 3
  const h = rand() * 360
  const dir = rand() < 0.5 ? 1 : -1
  const spread = 28 + rand() * 48
  const l0 = 0.58 + rand() * 0.22
  const drift = (rand() - 0.5) * 0.24
  const c = 0.13 + rand() * 0.09
  const stops: Stop[] = []
  for (let i = 0; i < n; i++) {
    const o = toGamut({ l: clamp(l0 + drift * (i - (n - 1) / 2), 0.32, 0.93), c, h: (h + dir * spread * i + 720) % 360 })
    stops.push({ color: oklchToHex(o), pos: Math.round((i / (n - 1)) * 100), alpha: 100 })
  }
  if (closed) {
    // A conic gradient meets itself, so end where it started.
    const scaled = stops.map((s, i) => ({ ...s, pos: Math.round((i / n) * 100) }))
    return [...scaled, { ...stops[0], pos: 100 }]
  }
  return stops
}

export const PRESETS: { name: string; g: Gradient }[] = [
  { name: "Violet dusk", g: { kind: "linear", angle: 135, x: 50, y: 50, shape: "circle", space: "oklch", stops: [{ color: "#6D5BFF", pos: 0, alpha: 100 }, { color: "#F472B6", pos: 100, alpha: 100 }] } },
  { name: "Ocean", g: { kind: "linear", angle: 160, x: 50, y: 50, shape: "circle", space: "oklch", stops: [{ color: "#0369A1", pos: 0, alpha: 100 }, { color: "#0EA5E9", pos: 55, alpha: 100 }, { color: "#A5F3FC", pos: 100, alpha: 100 }] } },
  { name: "Sunset", g: { kind: "linear", angle: 20, x: 50, y: 50, shape: "circle", space: "oklch", stops: [{ color: "#F97316", pos: 0, alpha: 100 }, { color: "#EC4899", pos: 55, alpha: 100 }, { color: "#8B5CF6", pos: 100, alpha: 100 }] } },
  { name: "Mint", g: { kind: "linear", angle: 180, x: 50, y: 50, shape: "circle", space: "srgb", stops: [{ color: "#ECFDF5", pos: 0, alpha: 100 }, { color: "#6EE7B7", pos: 100, alpha: 100 }] } },
  { name: "Midnight", g: { kind: "linear", angle: 180, x: 50, y: 50, shape: "circle", space: "oklab", stops: [{ color: "#0F172A", pos: 0, alpha: 100 }, { color: "#312E81", pos: 100, alpha: 100 }] } },
  { name: "Peach", g: { kind: "linear", angle: 135, x: 50, y: 50, shape: "circle", space: "oklch", stops: [{ color: "#FDE68A", pos: 0, alpha: 100 }, { color: "#FCA5A5", pos: 60, alpha: 100 }, { color: "#F9A8D4", pos: 100, alpha: 100 }] } },
  { name: "Spotlight", g: { kind: "radial", angle: 0, x: 30, y: 25, shape: "circle", space: "oklch", stops: [{ color: "#C4B5FD", pos: 0, alpha: 100 }, { color: "#4C1D95", pos: 100, alpha: 100 }] } },
  { name: "Hue ring", g: { kind: "conic", angle: 0, x: 50, y: 50, shape: "circle", space: "oklch", stops: [{ color: "#FF5A5A", pos: 0, alpha: 100 }, { color: "#FFD15A", pos: 17, alpha: 100 }, { color: "#5AE37A", pos: 33, alpha: 100 }, { color: "#5AD6FF", pos: 50, alpha: 100 }, { color: "#6B7BFF", pos: 67, alpha: 100 }, { color: "#E35AFF", pos: 83, alpha: 100 }, { color: "#FF5A5A", pos: 100, alpha: 100 }] } },
]

const CHECKER = "repeating-conic-gradient(rgb(0 0 0 / 0.08) 0% 25%, transparent 0% 50%) 0 0 / 16px 16px"

/* ----------------------------------- UI ----------------------------------- */

/** Hex text field that only commits complete colours and shows the draft while typing. */
function HexField({ value, onChange, label }: { value: string; onChange: (hex: string) => void; label: string }) {
  const [draft, setDraft] = React.useState(value)
  const [editing, setEditing] = React.useState(false)
  const shown = editing ? draft : value
  const valid = !!hexToRgb(shown)
  return (
    <Input
      aria-label={label}
      value={shown}
      spellCheck={false}
      aria-invalid={!valid}
      className="w-24 font-mono text-[12.5px]"
      onFocus={() => { setDraft(value); setEditing(true) }}
      onBlur={() => setEditing(false)}
      onChange={(e) => {
        const v = e.target.value.trim()
        setDraft(v)
        const rgb = hexToRgb(v)
        if (rgb) onChange(("#" + v.replace(/^#/, "")).toUpperCase().replace(/^#([0-9A-F])([0-9A-F])([0-9A-F])$/, "#$1$1$2$2$3$3"))
      }}
    />
  )
}

/** Rotary angle control: drag around the dial, or use arrow keys (Shift for 15 degree steps). */
function Dial({ value, onChange }: { value: number; onChange: (deg: number) => void }) {
  const ref = React.useRef<HTMLDivElement>(null)
  const fromPointer = (e: React.PointerEvent) => {
    const r = ref.current!.getBoundingClientRect()
    const a = (Math.atan2(e.clientX - (r.left + r.width / 2), -(e.clientY - (r.top + r.height / 2))) * 180) / Math.PI
    onChange(Math.round((a + 360) % 360))
  }
  return (
    <div className="flex items-center gap-4">
      <div
        ref={ref}
        role="slider"
        tabIndex={0}
        aria-label="Angle"
        aria-valuemin={0}
        aria-valuemax={359}
        aria-valuenow={value}
        aria-valuetext={`${value} degrees`}
        onPointerDown={(e) => {
          ;(e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId)
          fromPointer(e)
        }}
        onPointerMove={(e) => e.buttons === 1 && fromPointer(e)}
        onKeyDown={(e) => {
          const step = e.shiftKey ? 15 : 1
          const d = e.key === "ArrowRight" || e.key === "ArrowUp" ? step : e.key === "ArrowLeft" || e.key === "ArrowDown" ? -step : e.key === "Home" ? -value : e.key === "End" ? 359 - value : 0
          if (!d) return
          e.preventDefault()
          onChange((value + d + 360) % 360)
        }}
        className="relative size-16 shrink-0 cursor-grab touch-none rounded-full border border-border bg-sunken shadow-highlight outline-none select-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface active:cursor-grabbing"
      >
        <span aria-hidden className="absolute top-1/2 left-1/2 h-1/2 w-0.5 origin-top -translate-x-1/2 rounded-full bg-fg" style={{ transform: `translateX(-50%) rotate(${value + 180}deg)` }} />
        <span aria-hidden className="absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent" />
      </div>
      <div className="flex items-center gap-2">
        <Input type="number" aria-label="Angle in degrees" value={value} min={0} max={359} onChange={(e) => onChange(((Math.round(+e.target.value) % 360) + 360) % 360)} className="w-20 font-mono text-[12.5px]" />
        <span className="text-[12.5px] text-fg-subtle">deg</span>
      </div>
    </div>
  )
}

const INIT: Gradient = PRESETS[0].g

export function GradientGenerator() {
  const [g, setG] = React.useState<Gradient>(INIT)
  const [active, setActive] = React.useState(0)
  const [drag, setDrag] = React.useState<number | null>(null)
  const [supported, setSupported] = React.useState(true)
  const bar = React.useRef<HTMLDivElement>(null)
  const set = <K extends keyof Gradient>(k: K, v: Gradient[K]) => setG((p) => ({ ...p, [k]: v }))
  const setStop = (i: number, patch: Partial<Stop>) => setG((p) => ({ ...p, stops: p.stops.map((s, j) => (j === i ? { ...s, ...patch } : s)) }))

  React.useEffect(() => {
    try {
      setSupported(typeof CSS !== "undefined" && CSS.supports("background-image", "linear-gradient(in oklch, red, blue)"))
    } catch {
      setSupported(false)
    }
  }, [])

  const css = gradientCss(g)
  const shown = supported ? g : { ...g, space: "srgb" as Space }
  const previewCss = gradientCss(shown)
  const barCss = `linear-gradient(90deg${shown.space === "srgb" ? "" : ` in ${shown.space}`}, ${stopList(g.stops)})`
  const first = [...g.stops].sort((a, b) => a.pos - b.pos)[0]
  const cssOut = `background-color: ${stopColor(first)};\nbackground-image: ${gradientCssPretty(g)};`

  const posFromPointer = (e: { clientX: number }) => {
    const r = bar.current!.getBoundingClientRect()
    return Math.round(clamp(((e.clientX - r.left) / r.width) * 100, 0, 100))
  }
  const addAt = (pos: number) => {
    setG((p) => ({ ...p, stops: [...p.stops, colorAt(p.stops, pos)] }))
    setActive(g.stops.length)
  }
  const remove = (i: number) => {
    if (g.stops.length <= 2) return
    setG((p) => ({ ...p, stops: p.stops.filter((_, j) => j !== i) }))
    setActive((a) => Math.max(0, Math.min(a, g.stops.length - 2)))
  }
  const random = () => {
    setG((p) => ({ ...p, stops: randomStops(Math.random, p.kind === "conic"), angle: p.kind === "linear" ? Math.round(Math.random() * 360) : p.angle, x: p.kind === "radial" ? 20 + Math.round(Math.random() * 60) : p.x, y: p.kind === "radial" ? 20 + Math.round(Math.random() * 60) : p.y }))
    setActive(0)
  }

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-5">
          <div className="relative h-[360px] overflow-hidden rounded-2xl border border-border lg:h-[440px]" style={{ background: CHECKER }} aria-label="Gradient preview" role="img">
            <div className="absolute inset-0" style={{ backgroundImage: previewCss }} />
            {!supported && g.space !== "srgb" ? (
              <p className="absolute right-3 bottom-3 rounded-md bg-ink/80 px-2 py-1 text-[11.5px] text-on-ink">Your browser cannot show `in {g.space}` yet, so the preview uses sRGB.</p>
            ) : null}
          </div>
          <div className="rounded-2xl border border-border bg-surface p-5 shadow-raised">
            <div className="mb-3 flex items-center justify-between gap-3">
              <span className="text-[13px] font-medium text-fg">Color stops</span>
              <span className="hidden text-[12px] text-fg-subtle sm:inline">Click the bar to add a stop, drag handles to move them</span>
            </div>
            <div
              ref={bar}
              className="relative h-10 rounded-lg border border-border"
              style={{ background: `${barCss}, ${CHECKER}` }}
              onClick={(e) => {
                if ((e.target as HTMLElement).closest("[data-stop]")) return
                addAt(posFromPointer(e))
              }}
            >
              {g.stops.map((s, i) => (
                <button
                  key={i}
                  type="button"
                  data-stop
                  role="slider"
                  aria-label={`Stop ${i + 1}, ${s.color}. Drag or use arrow keys to move.`}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={s.pos}
                  aria-valuetext={`${s.pos}%`}
                  onPointerDown={(e) => {
                    e.stopPropagation()
                    ;(e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId)
                    setDrag(i)
                    setActive(i)
                  }}
                  onPointerMove={(e) => drag === i && setStop(i, { pos: posFromPointer(e) })}
                  onPointerUp={() => setDrag(null)}
                  onPointerCancel={() => setDrag(null)}
                  onKeyDown={(e) => {
                    const step = e.shiftKey ? 10 : 1
                    const d = e.key === "ArrowRight" ? step : e.key === "ArrowLeft" ? -step : 0
                    if (e.key === "Delete" || e.key === "Backspace") { e.preventDefault(); remove(i); return }
                    if (!d) return
                    e.preventDefault()
                    setStop(i, { pos: clamp(s.pos + d, 0, 100) })
                  }}
                  onFocus={() => setActive(i)}
                  className={"absolute top-1/2 size-6 -translate-x-1/2 -translate-y-1/2 cursor-grab touch-none rounded-full border-2 border-white shadow-[0_1px_6px_rgb(0_0_0/0.45)] outline-none focus-visible:ring-2 focus-visible:ring-accent active:cursor-grabbing" + (active === i ? " ring-2 ring-accent ring-offset-1" : "")}
                  style={{ left: `${s.pos}%`, background: stopColor(s) }}
                />
              ))}
            </div>
            <ul className="mt-4 space-y-2">
              {g.stops.map((s, i) => (
                <li key={i} className={"flex flex-wrap items-center gap-2 rounded-lg px-2 py-1.5 " + (active === i ? "bg-sunken" : "")}>
                  <input type="color" aria-label={`Stop ${i + 1} color`} value={s.color.toLowerCase()} onChange={(e) => setStop(i, { color: e.target.value.toUpperCase() })} onFocus={() => setActive(i)} className="h-8 w-10 shrink-0 cursor-pointer rounded-md border border-border bg-transparent" />
                  <HexField label={`Stop ${i + 1} hex`} value={s.color} onChange={(hex) => setStop(i, { color: hex })} />
                  <label className="flex items-center gap-1.5 text-[12px] text-fg-muted">
                    <span>at</span>
                    <Input type="number" aria-label={`Stop ${i + 1} position`} value={s.pos} min={0} max={100} onChange={(e) => setStop(i, { pos: clamp(Math.round(+e.target.value), 0, 100) })} onFocus={() => setActive(i)} className="w-[68px] font-mono text-[12.5px]" />
                    <span>%</span>
                  </label>
                  <label className="flex items-center gap-1.5 text-[12px] text-fg-muted">
                    <span>opacity</span>
                    <Input type="number" aria-label={`Stop ${i + 1} opacity`} value={s.alpha} min={0} max={100} onChange={(e) => setStop(i, { alpha: clamp(Math.round(+e.target.value), 0, 100) })} onFocus={() => setActive(i)} className="w-[68px] font-mono text-[12.5px]" />
                    <span>%</span>
                  </label>
                  <Button variant="ghost" size="icon-sm" aria-label={`Remove stop ${i + 1}`} disabled={g.stops.length <= 2} onClick={() => remove(i)} className="ml-auto">
                    <XIcon />
                  </Button>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={() => addAt(50)}>
                <PlusIcon /> Add stop
              </Button>
              <Button variant="outline" size="sm" onClick={random}>
                <ShuffleIcon /> Random
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-5 self-start rounded-2xl border border-border bg-surface p-5 shadow-raised">
          <div className="space-y-2">
            <span className="text-[13px] font-medium text-fg">Type</span>
            <SegmentedControl size="sm" fullWidth items={["linear", "radial", "conic"]} value={g.kind} onChange={(v) => set("kind", v as GradientKind)} aria-label="Gradient type" />
          </div>
          {g.kind !== "radial" ? (
            <div className="space-y-2">
              <span className="text-[13px] font-medium text-fg">{g.kind === "conic" ? "Start angle" : "Angle"}</span>
              <Dial value={g.angle} onChange={(deg) => set("angle", deg)} />
            </div>
          ) : (
            <div className="space-y-2">
              <span className="text-[13px] font-medium text-fg">Shape</span>
              <SegmentedControl size="sm" fullWidth items={["circle", "ellipse"]} value={g.shape} onChange={(v) => set("shape", v as Gradient["shape"])} aria-label="Radial shape" />
            </div>
          )}
          {g.kind !== "linear" ? (
            <>
              <Control label="Center x" value={`${g.x}%`}>
                <Slider value={[g.x]} min={0} max={100} onValueChange={(v) => set("x", num(v))} showValue={false} aria-label="Center x" />
              </Control>
              <Control label="Center y" value={`${g.y}%`}>
                <Slider value={[g.y]} min={0} max={100} onValueChange={(v) => set("y", num(v))} showValue={false} aria-label="Center y" />
              </Control>
            </>
          ) : null}
          <div className="space-y-2">
            <span className="text-[13px] font-medium text-fg">Interpolation</span>
            <SegmentedControl size="sm" fullWidth items={["srgb", "oklch", "oklab"]} value={g.space} onChange={(v) => set("space", v as Space)} aria-label="Interpolation color space" />
            <p className="text-[12px] leading-[1.5] text-fg-muted">OKLCH and OKLAB blend without the grey band sRGB makes between two saturated colors.</p>
          </div>
          <div className="space-y-2">
            <span className="text-[13px] font-medium text-fg">Presets</span>
            <div className="grid grid-cols-4 gap-2">
              {PRESETS.map((p) => (
                <button
                  key={p.name}
                  type="button"
                  title={p.name}
                  aria-label={`Preset ${p.name}`}
                  onClick={() => { setG(p.g); setActive(0) }}
                  className="h-10 rounded-lg border border-border outline-none hover:border-border-strong focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                  style={{ backgroundImage: gradientCss(supported ? p.g : { ...p.g, space: "srgb" }) }}
                />
              ))}
            </div>
          </div>
          <button type="button" onClick={() => { setG(INIT); setActive(0) }} className="text-[12.5px] text-fg-muted underline underline-offset-4 hover:text-fg">Reset</button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <CodeBlock language="css" filename="CSS" code={cssOut} />
        <CodeBlock language="html" filename="Tailwind v4 class" code={tailwindClass(g)} />
      </div>
    </div>
  )
}
