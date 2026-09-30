"use client"
import * as React from "react"
import { DownloadIcon } from "lucide-react"
import { Button } from "@/registry/ui/button"
import { Slider } from "@/registry/ui/slider"
import { SegmentedControl } from "@/registry/ui/segmented-control"
import { CodeBlock } from "@/registry/ui/code-block"
import { Control } from "./shadow-generator"

const num = (v: number | readonly number[]) => (Array.isArray(v) ? v[0] : (v as number))

type Blend = "overlay" | "soft-light" | "multiply" | "screen"

function svgNoise(freq: number, octaves: number, type: "fractalNoise" | "turbulence") {
  return `<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='${type}' baseFrequency='${freq}' numOctaves='${octaves}' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>`
}

export function NoiseGenerator() {
  const [freq, setFreq] = React.useState(80)
  const [octaves, setOctaves] = React.useState(3)
  const [opacity, setOpacity] = React.useState(22)
  const [blend, setBlend] = React.useState<Blend>("overlay")
  const [type, setType] = React.useState<"Fractal" | "Turbulence">("Fractal")
  const svg = svgNoise(freq / 100, octaves, type === "Fractal" ? "fractalNoise" : "turbulence")
  const url = `url("data:image/svg+xml,${encodeURIComponent(svg)}")`
  const css = `.grain {\n  position: relative;\n  isolation: isolate;\n}\n.grain::after {\n  content: "";\n  position: absolute;\n  inset: 0;\n  pointer-events: none;\n  background-image: ${url};\n  opacity: ${opacity / 100};\n  mix-blend-mode: ${blend};\n}`
  const download = () => {
    const a = document.createElement("a")
    a.href = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }))
    a.download = "noise.svg"
    a.click()
    URL.revokeObjectURL(a.href)
  }
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="relative isolate h-[440px] overflow-hidden rounded-2xl border border-border" style={{ background: "linear-gradient(135deg, #6d5bff, #f472b6 55%, #fbbf24)" }}>
        <div aria-hidden className="absolute inset-0" style={{ backgroundImage: url, opacity: opacity / 100, mixBlendMode: blend }} />
        <div className="relative grid h-full place-items-center">
          <p className="text-4xl font-semibold tracking-[-0.04em] text-white drop-shadow">Grain, not banding</p>
        </div>
      </div>
      <div className="space-y-5 rounded-2xl border border-border bg-surface p-5 shadow-raised">
        <Control label="Frequency" value={(freq / 100).toFixed(2)}>
          <Slider value={[freq]} min={20} max={200} onValueChange={(v) => setFreq(num(v))} showValue={false} aria-label="Frequency" />
        </Control>
        <Control label="Octaves" value={String(octaves)}>
          <Slider value={[octaves]} min={1} max={6} onValueChange={(v) => setOctaves(num(v))} showValue={false} aria-label="Octaves" />
        </Control>
        <Control label="Opacity" value={`${opacity}%`}>
          <Slider value={[opacity]} min={2} max={80} onValueChange={(v) => setOpacity(num(v))} showValue={false} aria-label="Opacity" />
        </Control>
        <div className="space-y-2">
          <span className="text-[13px] font-medium text-fg">Blend</span>
          <SegmentedControl size="sm" fullWidth items={["overlay", "soft-light", "multiply", "screen"]} value={blend} onChange={(v) => setBlend(v as Blend)} aria-label="Blend mode" />
        </div>
        <div className="space-y-2">
          <span className="text-[13px] font-medium text-fg">Noise</span>
          <SegmentedControl size="sm" fullWidth items={["Fractal", "Turbulence"]} value={type} onChange={(v) => setType(v as "Fractal" | "Turbulence")} aria-label="Noise type" />
        </div>
        <Button variant="outline" onClick={download}>
          <DownloadIcon /> Download SVG
        </Button>
      </div>
      <div className="lg:col-span-2">
        <CodeBlock language="css" filename="CSS" code={css} />
      </div>
    </div>
  )
}
