"use client"
import * as React from "react"
import { ShuffleIcon } from "lucide-react"
import { Button } from "@/registry/ui/button"
import { Slider } from "@/registry/ui/slider"
import { CodeBlock } from "@/registry/ui/code-block"
import { oklchToHex } from "@/lib/color"
import { Control } from "./shadow-generator"

type Blob = { x: number; y: number; color: string; size: number }
const num = (v: number | readonly number[]) => (Array.isArray(v) ? v[0] : (v as number))

const INIT: Blob[] = [
  { x: 18, y: 22, color: "#8B5CF6", size: 55 },
  { x: 82, y: 18, color: "#22D3EE", size: 50 },
  { x: 70, y: 80, color: "#F472B6", size: 55 },
  { x: 20, y: 82, color: "#FACC15", size: 45 },
]

function randomPalette(): Blob[] {
  const h = Math.random() * 360
  return [0, 1, 2, 3].map((i) => ({
    x: 10 + Math.random() * 80,
    y: 10 + Math.random() * 80,
    color: oklchToHex({ l: 0.7 + Math.random() * 0.12, c: 0.16, h: (h + i * (50 + Math.random() * 40)) % 360 }),
    size: 40 + Math.random() * 25,
  }))
}

export function MeshGradient() {
  const [blobs, setBlobs] = React.useState(INIT)
  const [base, setBase] = React.useState("#0F0A1E")
  const [soft, setSoft] = React.useState(70)
  const [drag, setDrag] = React.useState<number | null>(null)
  const stage = React.useRef<HTMLDivElement>(null)
  const layers = blobs.map((b) => `radial-gradient(at ${b.x.toFixed(0)}% ${b.y.toFixed(0)}%, ${b.color} 0px, transparent ${Math.round(b.size * (soft / 70))}%)`)
  const css = `background-color: ${base};\nbackground-image:\n  ${layers.join(",\n  ")};`
  const move = (e: React.PointerEvent) => {
    if (drag === null) return
    const r = stage.current!.getBoundingClientRect()
    const x = Math.min(100, Math.max(0, ((e.clientX - r.left) / r.width) * 100))
    const y = Math.min(100, Math.max(0, ((e.clientY - r.top) / r.height) * 100))
    setBlobs((bs) => bs.map((b, i) => (i === drag ? { ...b, x, y } : b)))
  }
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div
        ref={stage}
        onPointerMove={move}
        onPointerUp={() => setDrag(null)}
        onPointerLeave={() => setDrag(null)}
        className="relative h-[440px] touch-none overflow-hidden rounded-2xl border border-border"
        style={{ backgroundColor: base, backgroundImage: layers.join(", ") }}
      >
        {blobs.map((b, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Color point ${i + 1}. Drag, or use arrow keys to move.`}
            onPointerDown={(e) => {
              ;(e.target as HTMLElement).setPointerCapture?.(e.pointerId)
              setDrag(i)
            }}
            onKeyDown={(e) => {
              const d = e.shiftKey ? 10 : 2
              const dx = e.key === "ArrowLeft" ? -d : e.key === "ArrowRight" ? d : 0
              const dy = e.key === "ArrowUp" ? -d : e.key === "ArrowDown" ? d : 0
              if (!dx && !dy) return
              e.preventDefault()
              setBlobs((bs) => bs.map((x, j) => (j === i ? { ...x, x: Math.min(100, Math.max(0, x.x + dx)), y: Math.min(100, Math.max(0, x.y + dy)) } : x)))
            }}
            className="absolute size-6 -translate-x-1/2 -translate-y-1/2 cursor-grab rounded-full border-2 border-white shadow-[0_2px_8px_rgb(0_0_0/0.4)] outline-none focus-visible:ring-4 focus-visible:ring-white/60 active:cursor-grabbing"
            style={{ left: `${b.x}%`, top: `${b.y}%`, background: b.color }}
          />
        ))}
      </div>
      <div className="space-y-5 rounded-2xl border border-border bg-surface p-5 shadow-raised">
        <div className="space-y-2">
          <span className="text-[13px] font-medium text-fg">Colors</span>
          <div className="flex flex-wrap gap-2">
            {blobs.map((b, i) => (
              <input key={i} type="color" aria-label={`Color ${i + 1}`} value={b.color.toLowerCase()} onChange={(e) => setBlobs((bs) => bs.map((x, j) => (j === i ? { ...x, color: e.target.value.toUpperCase() } : x)))} className="h-9 w-11 cursor-pointer rounded-md border border-border bg-transparent" />
            ))}
            <input type="color" aria-label="Base color" value={base.toLowerCase()} onChange={(e) => setBase(e.target.value.toUpperCase())} className="h-9 w-11 cursor-pointer rounded-md border border-dashed border-border-strong bg-transparent" title="Base" />
          </div>
        </div>
        <Control label="Softness" value={`${soft}%`}>
          <Slider value={[soft]} min={30} max={120} onValueChange={(v) => setSoft(num(v))} showValue={false} aria-label="Softness" />
        </Control>
        <Button variant="outline" onClick={() => setBlobs(randomPalette())}>
          <ShuffleIcon /> Randomize
        </Button>
      </div>
      <div className="lg:col-span-2">
        <CodeBlock language="css" filename="CSS" code={css} />
      </div>
    </div>
  )
}
