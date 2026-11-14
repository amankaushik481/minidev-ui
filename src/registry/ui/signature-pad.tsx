"use client"
import * as React from "react"
import { EraserIcon, UndoIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"

/**
 * A signature field drawn on a canvas with smooth, pressure-aware strokes, undo and clear, a typed-name fallback for keyboard users, and PNG export.
 *
 * Both modes report through one `onChange`: a drawn signature or the typed
 * name rendered in a script face, as a transparent PNG data URL, or null
 * when empty. Store the data URL or upload it as an image.
 *
 * @example
 * const [sig, setSig] = React.useState<string | null>(null)
 * <SignaturePad label="Sign to accept" onChange={setSig} />
 * <Button disabled={!sig}>Accept</Button>
 */
type SignaturePadProps = {
  /** Called with a PNG data URL after each stroke or typed change, or null when empty. */
  onChange?: (dataUrl: string | null) => void
  /** Visible label; also names the canvas and the typed input. */
  label?: string
  /** Canvas height in px. */
  height?: number
  className?: string
}

const SCRIPT_FONT = '"Snell Roundhand", "Segoe Script", "Brush Script MT", cursive'

/** Render a typed name to a transparent PNG so typed and drawn signatures share one output. */
function typedToPng(name: string, color: string): string | null {
  if (!name.trim()) return null
  const c = document.createElement("canvas")
  const ctx = c.getContext("2d")
  if (!ctx) return null
  const font = `italic 64px ${SCRIPT_FONT}`
  ctx.font = font
  c.width = Math.ceil(ctx.measureText(name).width) + 48
  c.height = 112
  ctx.font = font
  ctx.fillStyle = color
  ctx.textBaseline = "middle"
  ctx.fillText(name, 24, 56)
  return c.toDataURL("image/png")
}

type Pt = { x: number; y: number; p: number }

function SignaturePad({ onChange, label = "Signature", height = 180, className }: SignaturePadProps) {
  const canvas = React.useRef<HTMLCanvasElement>(null)
  const strokes = React.useRef<Pt[][]>([])
  const drawing = React.useRef(false)
  const drawn = React.useRef<string | null>(null)
  const [count, setCount] = React.useState(0)
  const [typed, setTyped] = React.useState("")
  const [mode, setMode] = React.useState<"draw" | "type">("draw")
  const id = React.useId()
  const labelId = `${id}-label`
  const hintId = `${id}-hint`

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
      if (s.length === 1) {
        // a tap leaves a dot
        ctx.beginPath()
        ctx.arc(s[0].x, s[0].y, (1.2 + s[0].p * 2.4) / 2, 0, Math.PI * 2)
        ctx.fillStyle = ctx.strokeStyle
        ctx.fill()
        continue
      }
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
    // the canvas remounts when switching back from "type", so re-observe it
  }, [redraw, mode])

  const emit = () => {
    drawn.current = strokes.current.length && canvas.current ? canvas.current.toDataURL("image/png") : null
    onChange?.(drawn.current)
  }
  const endStroke = () => {
    if (!drawing.current) return
    drawing.current = false
    setCount(strokes.current.length)
    emit()
  }
  const point = (e: React.PointerEvent): Pt => {
    const r = canvas.current!.getBoundingClientRect()
    return { x: e.clientX - r.left, y: e.clientY - r.top, p: e.pressure && e.pointerType !== "mouse" ? e.pressure : 0.5 }
  }

  return (
    <div data-slot="signature-pad" className={cn("w-full max-w-md", className)}>
      <div className="mb-2 flex items-center justify-between">
        <span id={labelId} className="text-sm font-medium text-fg">{label}</span>
        <button
          type="button"
          onClick={() => {
            const next = mode === "draw" ? "type" : "draw"
            setMode(next)
            if (next === "type") onChange?.(typedToPng(typed, getComputedStyle(document.documentElement).color))
            else onChange?.(drawn.current)
          }}
          className="rounded-sm text-xs text-fg-muted underline underline-offset-4 outline-none hover:text-fg focus-visible:ring-2 focus-visible:ring-accent"
        >
          {mode === "draw" ? "Type instead" : "Draw instead"}
        </button>
      </div>
      {mode === "draw" ? (
        <div className="relative rounded-xl border border-border bg-surface shadow-raised">
          <canvas
            ref={canvas}
            role="img"
            aria-labelledby={labelId}
            aria-describedby={hintId}
            className="block w-full touch-none text-fg"
            style={{ height }}
            onPointerDown={(e) => {
              if (e.pointerType === "mouse" && e.button !== 0) return
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
            onPointerUp={endStroke}
            onPointerCancel={endStroke}
          />
          <span id={hintId} className="sr-only">Draw your signature with a mouse, pen or finger, or choose Type instead.</span>
          <span aria-hidden className="pointer-events-none absolute inset-x-6 bottom-9 border-b border-dashed border-border-strong" />
          {!count ? <span aria-hidden className="pointer-events-none absolute bottom-3 left-6 text-xs text-fg-subtle">Sign above the line</span> : null}
        </div>
      ) : (
        <input
          aria-labelledby={labelId}
          value={typed}
          onChange={(e) => {
            setTyped(e.target.value)
            onChange?.(typedToPng(e.target.value, getComputedStyle(e.currentTarget).color))
          }}
          placeholder="Type your full name"
          className="h-[120px] w-full rounded-xl border border-border bg-surface px-5 text-center text-4xl text-fg italic shadow-raised outline-none focus-visible:ring-2 focus-visible:ring-accent"
          style={{ fontFamily: SCRIPT_FONT }}
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
