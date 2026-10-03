"use client"
import * as React from "react"
import { useReducedMotion } from "motion/react"
import { Activity } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"

/**
 * A canvas grid of small squares whose brightness flickers at random behind your content, like a board of quiet signals.
 * Colour comes from the accent token and an optional radial mask fades the
 * edges. The canvas is sharp on high density screens, resizes with its box,
 * sleeps off screen and draws one still frame for reduced motion.
 */
type FlickeringGridProps = {
  /** Side of one square in pixels. */
  squareSize?: number
  /** Space between squares in pixels. */
  gap?: number
  /** Chance per second that any one square changes brightness, 0 to 1. */
  flickerChance?: number
  /** Brightest a square can get, 0 to 1. */
  maxOpacity?: number
  /** Any CSS colour, including var(--token). Defaults to the accent. */
  color?: string
  /** Fade the grid toward the edges. */
  mask?: "radial" | "none"
  className?: string
  children?: React.ReactNode
}

/** Redraw cap. Flicker reads the same at 30fps and costs half. */
const FRAME = 1000 / 30

function FlickeringGrid({
  squareSize = 4,
  gap = 6,
  flickerChance = 0.4,
  maxOpacity = 0.4,
  color = "var(--accent)",
  mask = "radial",
  className,
  children,
}: FlickeringGridProps) {
  const reduce = useReducedMotion()
  const boxRef = React.useRef<HTMLDivElement>(null)
  const canvasRef = React.useRef<HTMLCanvasElement>(null)

  React.useEffect(() => {
    const box = boxRef.current
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!box || !canvas || !ctx) return

    const sq = Math.max(1, squareSize)
    const pitch = sq + Math.max(0, gap)
    const top = Math.min(1, Math.max(0, maxOpacity))
    let w = 0
    let h = 0
    let cols = 0
    let rows = 0
    let dpr = 1
    let cells = new Float32Array(0)
    let raf = 0
    let last = 0
    let drawn = 0
    let visible = true
    let fill = ""

    const readColor = () => {
      canvas.style.color = color
      fill = getComputedStyle(canvas).color || "currentColor"
    }

    const resize = () => {
      const r = box.getBoundingClientRect()
      w = Math.max(1, Math.round(r.width))
      h = Math.max(1, Math.round(r.height))
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      const nc = Math.ceil(w / pitch)
      const nr = Math.ceil(h / pitch)
      if (nc === cols && nr === rows) return
      // Keep the squares that still fit, seed the new ones.
      const next = new Float32Array(nc * nr)
      for (let y = 0; y < nr; y++)
        for (let x = 0; x < nc; x++) next[y * nc + x] = x < cols && y < rows ? cells[y * cols + x] : Math.random() * top
      cells = next
      cols = nc
      rows = nr
    }

    const draw = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = fill
      // Centre the grid so the leftover space is shared by both edges.
      const ox = Math.floor((w - (cols * pitch - (pitch - sq))) / 2)
      const oy = Math.floor((h - (rows * pitch - (pitch - sq))) / 2)
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const a = cells[y * cols + x]
          if (a < 0.01) continue
          ctx.globalAlpha = a
          ctx.fillRect(ox + x * pitch, oy + y * pitch, sq, sq)
        }
      }
      ctx.globalAlpha = 1
    }

    const step = (dt: number) => {
      const p = Math.min(1, Math.max(0, flickerChance) * dt)
      for (let i = 0; i < cells.length; i++) if (Math.random() < p) cells[i] = Math.random() * top
    }

    const loop = (t: number) => {
      if (!last) last = drawn = t
      if (t - drawn >= FRAME) {
        step((t - last) / 1000)
        last = t
        drawn = t
        draw()
      }
      raf = requestAnimationFrame(loop)
    }
    const stop = () => {
      cancelAnimationFrame(raf)
      raf = 0
      last = 0
    }
    const sync = () => {
      if (reduce) {
        stop()
        draw()
        return
      }
      const run = visible && !document.hidden
      if (run && !raf) raf = requestAnimationFrame(loop)
      if (!run && raf) stop()
    }

    readColor()
    resize()
    const ro = new ResizeObserver(() => {
      resize()
      draw()
    })
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      sync()
    })
    const mo = new MutationObserver(() => {
      readColor()
      draw()
    })
    ro.observe(box)
    io.observe(box)
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "data-material"] })
    document.addEventListener("visibilitychange", sync)
    draw()
    sync()

    return () => {
      stop()
      ro.disconnect()
      io.disconnect()
      mo.disconnect()
      document.removeEventListener("visibilitychange", sync)
    }
  }, [squareSize, gap, flickerChance, maxOpacity, color, reduce])

  const fade = mask === "radial" ? "radial-gradient(ellipse 70% 70% at 50% 50%, black 25%, transparent 100%)" : undefined

  return (
    <div
      ref={boxRef}
      data-slot="flickering-grid"
      className={cn("relative isolate h-[360px] w-full overflow-hidden rounded-2xl border border-border bg-bg", className)}
    >
      <canvas
        ref={canvasRef}
        aria-hidden
        data-slot="flickering-grid-canvas"
        className="pointer-events-none absolute inset-0 z-0 size-full"
        style={{ maskImage: fade, WebkitMaskImage: fade }}
      />
      <div className="relative z-10 h-full">
        {children ?? (
          <div className="flex h-full flex-col items-center justify-center gap-4 px-6 text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-2.5 py-0.5 text-xs font-medium text-fg-muted shadow-xs">
              <span className="size-1.5 rounded-full bg-success" aria-hidden />
              All Northwind systems normal
            </span>
            <p className="max-w-[16ch] text-3xl font-medium tracking-[-0.035em] text-balance text-fg tabular-nums">
              1,284 deploys shipped this week
            </p>
            <Button variant="outline">
              <Activity />
              Open status page
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export { FlickeringGrid }
export type { FlickeringGridProps }
