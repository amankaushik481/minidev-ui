"use client"
import * as React from "react"
import { DownloadIcon, ShuffleIcon } from "lucide-react"
import { Button } from "@/registry/ui/button"
import { Input } from "@/registry/ui/input"
import { Slider } from "@/registry/ui/slider"
import { Switch } from "@/registry/ui/switch"
import { SegmentedControl } from "@/registry/ui/segmented-control"
import { CodeBlock } from "@/registry/ui/code-block"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"
import { mulberry32 } from "./blob-generator"
import { Control } from "./shadow-generator"

/*
 * SVG wave divider generator. Each wave is a sum of a few sine harmonics with
 * seeded random amplitudes, frequencies and phases, normalised to the chosen
 * height, then sampled into a filled path. Layers are the same wave shifted in
 * phase and pushed toward the opposite section at lower opacity.
 */

export type WaveOptions = {
  /** SVG height in px. The viewBox is always 1440 wide. */
  height: number
  /** Number of harmonics, 1 to 5. */
  complexity: number
  /** 0 to 100. */
  randomness: number
  seed: number
  /** 1 to 3 stacked waves with falling opacity. */
  layers: number
  flip: boolean
  /** Which edge the fill reaches: `bottom` sits on top of the section below, `top` hangs from the section above. */
  direction: "top" | "bottom"
  color: string
}

export const WAVE_WIDTH = 1440
const SAMPLES = 144
const OPACITY = [1, 0.5, 0.25]
const r1 = (n: number) => Math.round(n * 10) / 10

type Harmonic = { freq: number; amp: number; phase: number }

/** The harmonics for a seed: fewer, stronger low frequencies, randomness widening every term. */
export function waveHarmonics(o: WaveOptions): Harmonic[] {
  const rnd = mulberry32(o.seed)
  const r = Math.max(0, Math.min(1, o.randomness / 100))
  const n = Math.max(1, Math.min(5, Math.round(o.complexity)))
  const out: Harmonic[] = []
  for (let k = 1; k <= n; k++) {
    out.push({
      freq: k * (1 + (rnd() - 0.5) * 0.6 * r),
      amp: (1 / Math.pow(k, 1.15)) * (1 - r * 0.6 + rnd() * r * 1.2),
      phase: k * 0.9 + (rnd() - 0.5) * Math.PI * 2 * r,
    })
  }
  return out
}

/** Centre-line of layer `layer` sampled across the width, in SVG units. */
export function waveSamples(o: WaveOptions, layer = 0): { x: number; y: number }[] {
  const hs = waveHarmonics(o)
  const W = WAVE_WIDTH
  const shape = (x: number) => hs.reduce((s, h) => s + h.amp * Math.sin((2 * Math.PI * h.freq * x) / W + h.phase + layer * 1.1), 0)
  // Normalise so the biggest swing uses the available height.
  let peak = 0
  for (let i = 0; i <= SAMPLES; i++) peak = Math.max(peak, Math.abs(shape((i / SAMPLES) * W)))
  const usable = (o.height / 2) * 0.86
  const amp = (peak ? usable / peak : 0) * (1 - layer * 0.12)
  // Back layers lean toward the other section so they stay visible.
  const lift = layer * o.height * 0.14 * (o.direction === "bottom" ? -1 : 1)
  const pts: { x: number; y: number }[] = []
  for (let i = 0; i <= SAMPLES; i++) {
    const x = (i / SAMPLES) * W
    const sx = o.flip ? W - x : x
    pts.push({ x, y: o.height / 2 + shape(sx) * amp + lift })
  }
  return pts
}

/** Filled path for one layer. */
export function wavePath(o: WaveOptions, layer = 0): string {
  const H = o.height
  const pts = waveSamples(o, layer)
  const line = pts.map((p, i) => `${i === 0 ? "M" : "L"}${r1(p.x)} ${r1(Math.max(-H, Math.min(H * 2, p.y)))}`).join(" ")
  return o.direction === "bottom" ? `${line} L${WAVE_WIDTH} ${H} L0 ${H} Z` : `${line} L${WAVE_WIDTH} 0 L0 0 Z`
}

const layerList = (o: WaveOptions) => {
  const n = Math.max(1, Math.min(3, Math.round(o.layers)))
  // Faint, far layers first so the solid one draws on top.
  return Array.from({ length: n }, (_, i) => n - 1 - i).map((layer) => ({ layer, d: wavePath(o, layer), opacity: OPACITY[layer] }))
}

/** Standalone SVG. It stretches to any width because preserveAspectRatio is none. */
export function waveSvg(o: WaveOptions): string {
  const H = Math.round(o.height)
  const paths = layerList(o)
    .map((l) => `  <path d="${l.d}" fill="${o.color}"${l.opacity < 1 ? ` fill-opacity="${l.opacity}"` : ""}/>`)
    .join("\n")
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${WAVE_WIDTH} ${H}" width="100%" height="${H}" preserveAspectRatio="none" aria-hidden="true">\n${paths}\n</svg>`
}

/** The same wave as a React component that takes a `fill` colour. */
export function waveComponent(o: WaveOptions, name = "WaveDivider"): string {
  const H = Math.round(o.height)
  const paths = layerList(o)
    .map((l) => `      <path d="${l.d}" fill="currentColor"${l.opacity < 1 ? ` fillOpacity={${l.opacity}}` : ""} />`)
    .join("\n")
  return `import type { SVGProps } from "react"\n\n/** Section divider. Set the colour with \`className="text-..."\` or a \`color\` style. */\nexport function ${name}(props: SVGProps<SVGSVGElement>) {\n  return (\n    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${WAVE_WIDTH} ${H}" width="100%" height={${H}} preserveAspectRatio="none" aria-hidden="true" {...props}>\n${paths}\n    </svg>\n  )\n}\n`
}

/* ----------------------------------- UI ----------------------------------- */

const num = (v: number | readonly number[]) => (Array.isArray(v) ? v[0] : (v as number))
const INIT: WaveOptions = { height: 140, complexity: 3, randomness: 50, seed: 2024, layers: 2, flip: false, direction: "bottom", color: "#F6F5FB" }
const SECTIONS = { top: "#17162B", bottom: "#F6F5FB" }

export function WaveGenerator() {
  const [o, setO] = React.useState<WaveOptions>(INIT)
  const [sections, setSections] = React.useState(SECTIONS)
  const set = <K extends keyof WaveOptions>(k: K, v: WaveOptions[K]) => setO((p) => ({ ...p, [k]: v }))
  const layers = React.useMemo(() => layerList(o), [o])
  const svg = waveSvg(o)
  const H = Math.round(o.height)
  const download = () => {
    const a = document.createElement("a")
    a.href = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }))
    a.download = `wave-${o.seed}.svg`
    a.click()
    URL.revokeObjectURL(a.href)
  }
  const setDirection = (d: WaveOptions["direction"]) => setO((p) => ({ ...p, direction: d, color: d === "bottom" ? sections.bottom : sections.top }))
  const setSection = (k: "top" | "bottom", v: string) => {
    setSections((s) => ({ ...s, [k]: v }))
    setO((p) => (p.color === sections[k] ? { ...p, color: v } : p))
  }
  const css = `.divider {\n  height: ${H}px;\n  background: url("data:image/svg+xml,${encodeURIComponent(svg).replace(/%20/g, " ").replace(/%3D/g, "=").replace(/%3A/g, ":").replace(/%2F/g, "/").replace(/%22/g, "'")}") center / 100% 100% no-repeat;\n}`
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="flex h-[360px] flex-col overflow-hidden rounded-2xl border border-border lg:h-auto lg:min-h-[440px]" role="img" aria-label={`Wave divider between two sections, ${o.layers} layer${o.layers > 1 ? "s" : ""}`}>
          <div className="flex min-h-0 flex-1 flex-col justify-end px-6 pb-2" style={{ background: sections.top, color: "#ffffff" }}>
            <p className="text-[12px] font-medium tracking-[0.06em] uppercase opacity-60">Section one</p>
          </div>
          <svg viewBox={`0 0 ${WAVE_WIDTH} ${H}`} preserveAspectRatio="none" className="block w-full shrink-0" style={{ height: Math.min(H, 260) }} aria-hidden>
            <rect width={WAVE_WIDTH} height={H} fill={o.direction === "bottom" ? sections.top : sections.bottom} />
            {layers.map((l) => (
              <path key={l.layer} d={l.d} fill={o.color} fillOpacity={l.opacity} />
            ))}
          </svg>
          <div className="flex min-h-0 flex-1 flex-col justify-start px-6 pt-2" style={{ background: sections.bottom, color: "#17162B" }}>
            <p className="text-[12px] font-medium tracking-[0.06em] uppercase opacity-60">Section two</p>
          </div>
        </div>

        <div className="space-y-5 self-start rounded-2xl border border-border bg-surface p-5 shadow-raised">
          <Control label="Height" value={`${H}px`}>
            <Slider value={[o.height]} min={40} max={400} step={2} onValueChange={(v) => set("height", num(v))} showValue={false} aria-label="Height" />
          </Control>
          <Control label="Complexity" value={`${o.complexity} harmonic${o.complexity > 1 ? "s" : ""}`}>
            <Slider value={[o.complexity]} min={1} max={5} onValueChange={(v) => set("complexity", num(v))} showValue={false} aria-label="Complexity" />
          </Control>
          <Control label="Randomness" value={`${o.randomness}%`}>
            <Slider value={[o.randomness]} min={0} max={100} onValueChange={(v) => set("randomness", num(v))} showValue={false} aria-label="Randomness" />
          </Control>
          <Control label="Layers" value={String(o.layers)}>
            <Slider value={[o.layers]} min={1} max={3} onValueChange={(v) => set("layers", num(v))} showValue={false} aria-label="Layers" />
          </Control>
          <div className="space-y-2">
            <label htmlFor="wave-seed" className="text-[13px] font-medium text-fg">Seed</label>
            <div className="flex gap-2">
              <Input id="wave-seed" type="number" min={0} value={o.seed} onChange={(e) => set("seed", Math.max(0, Math.floor(+e.target.value || 0)))} className="font-mono" />
              <Button variant="outline" onClick={() => set("seed", Math.floor(Math.random() * 100000))}>
                <ShuffleIcon /> Shuffle
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <span className="text-[13px] font-medium text-fg">Fill reaches</span>
            <SegmentedControl size="sm" fullWidth items={["bottom", "top"]} value={o.direction} onChange={(v) => setDirection(v as WaveOptions["direction"])} aria-label="Fill direction" />
          </div>
          <Switch size="sm" label="Flip" description="Mirror the wave left to right" checked={o.flip} onCheckedChange={(v) => set("flip", v)} />
          <div className="space-y-2">
            <span className="text-[13px] font-medium text-fg">Colors</span>
            <div className="flex flex-wrap items-center gap-3 text-[12px] text-fg-muted">
              <label className="flex items-center gap-1.5">
                <input type="color" aria-label="Wave color" value={o.color.toLowerCase()} onChange={(e) => set("color", e.target.value.toUpperCase())} className="h-9 w-11 cursor-pointer rounded-md border border-border bg-transparent" />
                wave
              </label>
              <label className="flex items-center gap-1.5">
                <input type="color" aria-label="Section one color" value={sections.top.toLowerCase()} onChange={(e) => setSection("top", e.target.value.toUpperCase())} className="h-9 w-11 cursor-pointer rounded-md border border-dashed border-border-strong bg-transparent" />
                one
              </label>
              <label className="flex items-center gap-1.5">
                <input type="color" aria-label="Section two color" value={sections.bottom.toLowerCase()} onChange={(e) => setSection("bottom", e.target.value.toUpperCase())} className="h-9 w-11 cursor-pointer rounded-md border border-dashed border-border-strong bg-transparent" />
                two
              </label>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button onClick={download}>
              <DownloadIcon /> Download SVG
            </Button>
            <button type="button" onClick={() => { setO(INIT); setSections(SECTIONS) }} className="px-2 text-[12.5px] text-fg-muted underline underline-offset-4 hover:text-fg">Reset</button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="svg">
        <TabsList aria-label="Output format">
          <TabsTrigger value="svg">SVG</TabsTrigger>
          <TabsTrigger value="react">React</TabsTrigger>
          <TabsTrigger value="css">CSS background</TabsTrigger>
        </TabsList>
        <TabsContent value="svg">
          <CodeBlock language="html" filename={`wave-${o.seed}.svg`} code={svg} />
        </TabsContent>
        <TabsContent value="react">
          <CodeBlock language="tsx" filename="WaveDivider.tsx" code={waveComponent(o)} />
        </TabsContent>
        <TabsContent value="css">
          <CodeBlock language="css" filename="CSS" code={css} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
