"use client"
import * as React from "react"
import { EraserIcon, UndoIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"

/**
 * A signature field drawn with pointer events on a canvas: smooth
 * quadratic strokes with pressure-aware width, undo and clear, a typed
 * name fallback for keyboard users, and export to a PNG data URL.
 */
type SignaturePadProps = {
  /** Called with a PNG data URL after each stroke, or null when cleared. */
  onChange?: (dataUrl: string | null) => void
  label?: string
  height?: number
  className?: string
}

type Pt = { x: number; y: number; p: number }

function SignaturePad({ onChange, label = "Signature", height = 180, className }: SignaturePadProps) {
  const canvas = React.useRef<HTMLCanvasElement>(null)
  const strokes = React.useRef<Pt[][]>([])
  const drawing = React.useRef(false)
  const [count, setCount] = React.useState(0)
  const [typed, setTyped] = React.useState("")
  const [mode, setMode] = React.useState<"draw" | "type">("draw")

  const redraw = React.useCallback(() => {
    const c = canvas.current
    if (!c) return
    const ctx = c.getContext("2d")!
    const dpr = window.devicePixelRatio || 1
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.clearRect(0, 0, c.width, c.height)
    ctx.strokeStyle = getComputedStyle(c).color
    ctx.lineCap = "round"
    ctx.lineJoin = "round"
    for (const s of strokes.current) {
      for (let i = 1; i < s.length; i++) {
        const a = s[i - 1]
        const b = s[i]
        const mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }
        ctx.lineWidth = 1.2 + b.p * 2.4
        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.quadraticCurveTo(a.x, a.y, mid.x, mid.y)
        ctx.lineTo(b.x, b.y)
        ctx.stroke()
      }
    }
  }, [])

  React.useEffect(() => {
    const c = canvas.current
    if (!c) return
    const fit = () => {
      const dpr = window.devicePixelRatio || 1
      c.width = c.clientWidth * dpr
      c.height = c.clientHeight * dpr
      redraw()
    }
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(c)
    return () => ro.disconnect()
  }, [redraw])

  const emit = () => onChange?.(strokes.current.length ? canvas.current!.toDataURL("image/png") : null)
  const point = (e: React.PointerEvent): Pt => {
    const r = canvas.current!.getBoundingClientRect()
    return { x: e.clientX - r.left, y: e.clientY - r.top, p: e.pressure && e.pointerType !== "mouse" ? e.pressure : 0.5 }
  }

  return (
    <div data-slot="signature-pad" className={cn("w-full max-w-md", className)}>
      <div className="mb-2 flex items-center justify-between">
        <span id="sig-label" className="text-sm font-medium text-fg">{label}</span>
        <button type="button" onClick={() => setMode(mode === "draw" ? "type" : "draw")} className="text-xs text-fg-muted underline underline-offset-4 outline-none hover:text-fg focus-visible:ring-2 focus-visible:ring-accent">
          {mode === "draw" ? "Type instead" : "Draw instead"}
        </button>
      </div>
      {mode === "draw" ? (
        <div className="relative rounded-xl border border-border bg-surface shadow-raised">
          <canvas
            ref={canvas}
            role="img"
            aria-labelledby="sig-label"
            aria-describedby="sig-hint"
            className="block w-full touch-none text-fg"
            style={{ height }}
            onPointerDown={(e) => {
              ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
              drawing.current = true
              strokes.current.push([point(e)])
              redraw()
            }}
            onPointerMove={(e) => {
              if (!drawing.current) return
              strokes.current[strokes.current.length - 1].push(point(e))
              redraw()
            }}
            onPointerUp={() => {
              if (!drawing.current) return
              drawing.current = false
              setCount(strokes.current.length)
              emit()
            }}
          />
          <span id="sig-hint" className="sr-only">Draw your signature with a mouse, pen or finger, or choose Type instead.</span>
          <span aria-hidden className="pointer-events-none absolute inset-x-6 bottom-9 border-b border-dashed border-border-strong" />
          {!count ? <span aria-hidden className="pointer-events-none absolute bottom-3 left-6 text-xs text-fg-subtle">Sign above the line</span> : null}
        </div>
      ) : (
        <input
          aria-labelledby="sig-label"
          value={typed}
          onChange={(e) => setTyped(e.target.value)}
          placeholder="Type your full name"
          className="h-[120px] w-full rounded-xl border border-border bg-surface px-5 text-center text-4xl text-fg italic shadow-raised outline-none focus-visible:ring-2 focus-visible:ring-accent"
          style={{ fontFamily: '"Snell Roundhand", "Segoe Script", "Brush Script MT", cursive' }}
        />
      )}
      {mode === "draw" ? (
        <div className="mt-2 flex gap-2">
          <Button size="sm" variant="outline" disabled={!count} onClick={() => { strokes.current.pop(); setCount(strokes.current.length); redraw(); emit() }}>
            <UndoIcon /> Undo
          </Button>
          <Button size="sm" variant="ghost" disabled={!count} onClick={() => { strokes.current = []; setCount(0); redraw(); emit() }}>
            <EraserIcon /> Clear
          </Button>
        </div>
      ) : null}
    </div>
  )
}

export { SignaturePad }
export type { SignaturePadProps }
