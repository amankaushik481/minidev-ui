"use client"
import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { CopyIcon, CheckIcon } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * A scratch card: a foil you rub away with the pointer or a finger to reveal what is underneath, which clears itself once enough is gone.
 * The foil is a canvas painted with a gradient from your tokens. Progress is
 * tracked on a coarse grid, so there is no pixel reading on every move. Past
 * the threshold the rest lifts away on its own and onComplete fires. A Reveal
 * button serves keyboard users, and reduced motion skips the fade.
 */
type ScratchToRevealProps = {
  /** Percent of the foil that must be scratched before the rest clears itself. */
  threshold?: number
  /** Brush radius in pixels. */
  brush?: number
  /** Colours of the foil gradient. CSS colours and var(--token) both work. */
  gradient?: string[]
  /** Hint printed on the foil. */
  label?: string
  /** Called once the card is fully revealed. */
  onComplete?: () => void
  /** Called with the scratched percentage as it changes. */
  onProgress?: (percent: number) => void
  children?: React.ReactNode
  className?: string
}

const CELL = 6
const DEFAULT_GRADIENT = ["var(--accent)", "var(--accent-2)"]

/** The sample reward: a discount code for Lumen. */
function SampleReward() {
  const [copied, setCopied] = React.useState(false)
  return (
    <div data-slot="scratch-to-reveal-sample" className="flex flex-col items-center gap-2 px-4 py-6 text-center">
      <span className="text-[11px] font-medium tracking-[0.08em] text-fg-subtle uppercase">Your reward</span>
      <p className="text-2xl font-medium tracking-[-0.018em] text-fg">20% off Lumen Pro</p>
      <button
        type="button"
        onClick={() => {
          try {
            void navigator.clipboard?.writeText("LUMEN20")
          } catch {}
          setCopied(true)
          setTimeout(() => setCopied(false), 1600)
        }}
        className="mt-1 inline-flex h-9 items-center gap-2 rounded-lg border border-dashed border-border-strong bg-sunken px-3 font-mono text-sm text-fg outline-none transition-colors duration-[140ms] hover:border-accent-line focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
      >
        LUMEN20
        {copied ? <CheckIcon className="size-3.5 text-success" /> : <CopyIcon className="size-3.5 text-fg-subtle" />}
      </button>
      <p className="text-xs text-fg-muted">Valid on annual plans until 31 December.</p>
    </div>
  )
}

function ScratchToReveal({
  threshold = 50,
  brush = 24,
  gradient = DEFAULT_GRADIENT,
  label = "Scratch to reveal",
  onComplete,
  onProgress,
  children,
  className,
}: ScratchToRevealProps) {
  const reduce = useReducedMotion()
  const boxRef = React.useRef<HTMLDivElement>(null)
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const grid = React.useRef<{ cells: Uint8Array; cols: number; rows: number; cleared: number }>({ cells: new Uint8Array(0), cols: 0, rows: 0, cleared: 0 })
  const last = React.useRef<{ x: number; y: number } | null>(null)
  const [percent, setPercent] = React.useState(0)
  const [complete, setComplete] = React.useState(false)
  const [gone, setGone] = React.useState(false)
  const statusId = React.useId()

  const completeRef = React.useRef(onComplete)
  const progressRef = React.useRef(onProgress)
  React.useEffect(() => {
    completeRef.current = onComplete
    progressRef.current = onProgress
  }, [onComplete, onProgress])

  // Key on the colours themselves, so an inline array literal does not repaint on every render.
  const gradientKey = gradient.join("|")
  const paint = React.useCallback(() => {
    const canvas = canvasRef.current
    const box = boxRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !box || !ctx) return
    const stopsIn = gradientKey.split("|").filter(Boolean)
    const w = Math.max(1, Math.round(box.clientWidth))
    const h = Math.max(1, Math.round(box.clientHeight))
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = Math.round(w * dpr)
    canvas.height = Math.round(h * dpr)
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.globalCompositeOperation = "source-over"
    // Resolve var(--token) colours through the cascade so the foil follows the theme.
    const stops = (stopsIn.length ? stopsIn : DEFAULT_GRADIENT).map((c) => {
      canvas.style.color = c
      return getComputedStyle(canvas).color || c
    })
    canvas.style.color = ""
    const g = ctx.createLinearGradient(0, 0, w, h)
    stops.forEach((c, i) => g.addColorStop(stops.length === 1 ? 0 : i / (stops.length - 1), c))
    ctx.fillStyle = g
    ctx.fillRect(0, 0, w, h)
    // Foil sheen: a few soft diagonal bands.
    ctx.globalCompositeOperation = "overlay"
    for (let i = -2; i < 6; i++) {
      const band = ctx.createLinearGradient(0, 0, w, h)
      band.addColorStop(0, "rgba(255,255,255,0)")
      band.addColorStop(0.5, "rgba(255,255,255,0.35)")
      band.addColorStop(1, "rgba(255,255,255,0)")
      ctx.fillStyle = band
      ctx.save()
      ctx.translate(i * (w / 4), 0)
      ctx.transform(1, 0, -0.9, 1, 0, 0)
      ctx.fillRect(0, 0, w / 9, h)
      ctx.restore()
    }
    ctx.globalCompositeOperation = "destination-out"
    ctx.lineCap = "round"
    ctx.lineJoin = "round"
    ctx.lineWidth = brush * 2
    const cols = Math.ceil(w / CELL)
    const rows = Math.ceil(h / CELL)
    grid.current = { cells: new Uint8Array(cols * rows), cols, rows, cleared: 0 }
    setPercent(0)
  }, [gradientKey, brush])

  React.useEffect(() => {
    if (complete) return
    paint()
    const box = boxRef.current
    if (!box) return
    const ro = new ResizeObserver(() => paint())
    ro.observe(box)
    const mo = new MutationObserver(() => paint())
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "data-material"] })
    return () => {
      ro.disconnect()
      mo.disconnect()
    }
  }, [paint, complete])

  const finish = React.useCallback(() => {
    setComplete(true)
    setPercent(100)
    progressRef.current?.(100)
    completeRef.current?.()
  }, [])

  // Reduced motion skips the fade, so the foil goes straight away.
  React.useEffect(() => {
    if (complete && reduce) setGone(true)
  }, [complete, reduce])

  const mark = (x: number, y: number) => {
    const g = grid.current
    const r = brush
    const c0 = Math.max(0, Math.floor((x - r) / CELL))
    const c1 = Math.min(g.cols - 1, Math.floor((x + r) / CELL))
    const r0 = Math.max(0, Math.floor((y - r) / CELL))
    const r1 = Math.min(g.rows - 1, Math.floor((y + r) / CELL))
    for (let row = r0; row <= r1; row++) {
      for (let col = c0; col <= c1; col++) {
        const i = row * g.cols + col
        if (g.cells[i]) continue
        const cx = col * CELL + CELL / 2
        const cy = row * CELL + CELL / 2
        if ((cx - x) ** 2 + (cy - y) ** 2 <= r * r) {
          g.cells[i] = 1
          g.cleared++
        }
      }
    }
  }

  const scratch = (x: number, y: number) => {
    const ctx = canvasRef.current?.getContext("2d")
    if (!ctx || complete) return
    const from = last.current ?? { x, y }
    ctx.beginPath()
    ctx.moveTo(from.x, from.y)
    ctx.lineTo(x, y)
    ctx.stroke()
    const dist = Math.hypot(x - from.x, y - from.y)
    const steps = Math.max(1, Math.ceil(dist / (brush / 2)))
    for (let s = 0; s <= steps; s++) mark(from.x + ((x - from.x) * s) / steps, from.y + ((y - from.y) * s) / steps)
    last.current = { x, y }
    const g = grid.current
    const p = g.cells.length ? Math.min(100, Math.round((g.cleared / g.cells.length) * 100)) : 0
    if (p !== percent) {
      setPercent(p)
      progressRef.current?.(p)
    }
    if (p >= threshold) finish()
  }

  const point = (e: React.PointerEvent) => {
    const r = canvasRef.current!.getBoundingClientRect()
    return { x: e.clientX - r.left, y: e.clientY - r.top }
  }

  const foilOpacity = complete ? 0 : 1
  const hintOpacity = Math.max(0, 1 - percent / Math.max(1, threshold))

  return (
    <div
      ref={boxRef}
      data-slot="scratch-to-reveal"
      data-tier="premium"
      data-state={gone ? "revealed" : complete ? "revealing" : "covered"}
      className={cn("relative mx-auto w-full max-w-sm overflow-hidden rounded-xl border border-border bg-surface shadow-raised", className)}
    >
      <div aria-hidden={!complete} inert={!complete} data-slot="scratch-to-reveal-content">
        {children ?? <SampleReward />}
      </div>
      {!gone ? (
        <motion.canvas
          ref={canvasRef}
          aria-hidden
          data-slot="scratch-to-reveal-foil"
          initial={false}
          animate={{ opacity: foilOpacity }}
          transition={reduce ? { duration: 0 } : { duration: 0.5, ease: [0.3, 0, 0.8, 0.15] }}
          onAnimationComplete={() => {
            if (complete) setGone(true)
          }}
          className={cn("absolute inset-0 size-full touch-none", complete ? "pointer-events-none" : "cursor-crosshair")}
          onPointerDown={(e) => {
            if (complete || e.button !== 0) return
            e.currentTarget.setPointerCapture(e.pointerId)
            last.current = null
            const p = point(e)
            scratch(p.x, p.y)
          }}
          onPointerMove={(e) => {
            if (complete || !e.currentTarget.hasPointerCapture(e.pointerId)) return
            const p = point(e)
            scratch(p.x, p.y)
          }}
          onPointerUp={() => {
            last.current = null
          }}
          onPointerCancel={() => {
            last.current = null
          }}
        />
      ) : null}
      {!complete ? (
        <div aria-hidden className="pointer-events-none absolute inset-0 grid place-items-center" style={{ opacity: hintOpacity }}>
          <span data-slot="scratch-to-reveal-label" className="rounded-full bg-ink/85 px-3 py-1 text-xs font-medium text-on-ink shadow-ink">
            {label}
          </span>
        </div>
      ) : null}
      {!complete ? (
        <button
          type="button"
          onClick={finish}
          data-slot="scratch-to-reveal-reveal"
          className="absolute right-3 bottom-3 inline-flex h-7 items-center rounded-md border border-border bg-surface px-2.5 text-xs font-medium text-fg-muted shadow-key outline-none transition-colors duration-[140ms] hover:text-fg focus-visible:ring-2 focus-visible:ring-accent"
        >
          Reveal
        </button>
      ) : null}
      <span id={statusId} role="status" aria-live="polite" className="sr-only">
        {complete ? "Revealed." : percent ? `${percent}% scratched.` : ""}
      </span>
    </div>
  )
}

export { ScratchToReveal }
export type { ScratchToRevealProps }
