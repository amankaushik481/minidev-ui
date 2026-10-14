"use client"
import * as React from "react"
import { useReducedMotion } from "motion/react"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"

/**
 * Layered canvas waves that roll across the bottom of the panel behind your content, each at its own pace.
 * Every wave is two sine harmonics with its own phase, so the layers breathe
 * against each other instead of marching in step. Colours resolve through
 * the cascade, so var(--accent) follows theme and material changes. The
 * canvas is sharp on high density screens, resizes with its box, sleeps off
 * screen and in background tabs, and draws one still frame for reduced motion.
 */
type WavyBackgroundProps = {
  /** Colours of the waves, back to front. Any CSS colour, including var(--token). */
  colors?: string[]
  /** Speed multiplier. 2 is twice as fast, 0.5 half as fast. */
  speed?: number
  /** Height of the swell in pixels. */
  amplitude?: number
  /** Softness in pixels. 0 draws crisp edges. */
  blur?: number
  /** Share of the panel the waves rise to, from the bottom, 0 to 1. */
  coverage?: number
  /** Opacity of each wave, 0 to 1. */
  opacity?: number
  className?: string
  children?: React.ReactNode
}

/** Per-wave character: wavelengths, phase speeds and offsets, chosen so no two waves line up. */
const SHAPES = [
  { l1: 0.92, l2: 0.41, s1: 0.42, s2: -0.27, p1: 0.0, p2: 1.9 },
  { l1: 0.78, l2: 0.36, s1: -0.35, s2: 0.31, p1: 2.1, p2: 0.4 },
  { l1: 1.08, l2: 0.47, s1: 0.29, s2: -0.38, p1: 4.2, p2: 2.8 },
  { l1: 0.66, l2: 0.3, s1: -0.47, s2: 0.22, p1: 1.2, p2: 5.1 },
  { l1: 0.86, l2: 0.52, s1: 0.33, s2: 0.44, p1: 3.3, p2: 1.1 },
]

function WavyBackground({
  colors = ["var(--chart-2)", "var(--info)", "var(--accent-2)", "var(--accent)"],
  speed = 1,
  amplitude = 26,
  blur = 8,
  coverage = 0.46,
  opacity = 0.46,
  className,
  children,
}: WavyBackgroundProps) {
  const reduce = useReducedMotion()
  const boxRef = React.useRef<HTMLDivElement>(null)
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const pad = Math.max(0, Math.round(blur * 2))
  // A string key, so an inline colour array does not restart the waves on every render.
  const colorKey = (colors.length ? colors : ["var(--accent)"]).join("|")

  React.useEffect(() => {
    const box = boxRef.current
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!box || !canvas || !ctx) return

    const list = colorKey.split("|")
    let w = 0
    let h = 0
    let dpr = 1
    let raf = 0
    let last = 0
    let clock = 0
    let colorAt = 0
    let visible = true
    let fills: string[] = []

    // Resolve each colour through the cascade, so tokens follow theme and material.
    // No transition on the canvas colour, or a reduced-motion stylesheet can hand back a mid-transition value.
    canvas.style.setProperty("transition", "none", "important")
    const readColors = () => {
      fills = list.map((c) => {
        canvas.style.color = c
        return getComputedStyle(canvas).color || "currentColor"
      })
    }

    const resize = () => {
      const r = box.getBoundingClientRect()
      w = Math.max(1, Math.round(r.width)) + pad * 2
      h = Math.max(1, Math.round(r.height)) + pad * 2
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
    }

    const draw = (t: number) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)
      const n = fills.length
      const inner = h - pad * 2
      const cover = Math.min(1, Math.max(0.05, coverage))
      const top = pad + inner * (1 - cover)
      const bottom = pad + inner * (1 - cover * 0.42)
      const amp = Math.max(0, amplitude)
      const step = 3
      for (let i = 0; i < n; i++) {
        const s = SHAPES[i % SHAPES.length]
        const base = n === 1 ? top : top + ((bottom - top) * i) / (n - 1)
        const a = amp * (0.7 + (0.3 * i) / Math.max(1, n - 1))
        const k1 = (Math.PI * 2) / (w * s.l1)
        const k2 = (Math.PI * 2) / (w * s.l2)
        ctx.beginPath()
        ctx.moveTo(-step, h + step)
        for (let x = -step; x <= w + step; x += step) {
          const y = base + a * (0.64 * Math.sin(x * k1 + t * s.s1 + s.p1) + 0.36 * Math.sin(x * k2 + t * s.s2 + s.p2))
          ctx.lineTo(x, y)
        }
        ctx.lineTo(w + step, h + step)
        ctx.closePath()
        ctx.globalAlpha = Math.min(1, Math.max(0, opacity))
        ctx.fillStyle = fills[i]
        ctx.fill()
      }
      ctx.globalAlpha = 1
    }

    const loop = (t: number) => {
      const dt = last ? Math.min(0.05, (t - last) / 1000) : 0
      last = t
      clock += dt * Math.max(0, speed)
      if (t - colorAt > 800) {
        colorAt = t
        readColors()
      }
      draw(clock)
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
        draw(0)
        return
      }
      const run = visible && !document.hidden
      if (run && !raf) raf = requestAnimationFrame(loop)
      if (!run && raf) stop()
    }

    readColors()
    resize()
    const ro = new ResizeObserver(() => {
      resize()
      draw(clock)
    })
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      sync()
    })
    // Theme and material can change on any ancestor (a docs stage, a section), so watch the whole tree, one read per frame.
    let pending = 0
    const mo = new MutationObserver(() => {
      if (pending) return
      pending = requestAnimationFrame(() => {
        pending = 0
        readColors()
        if (!raf) draw(clock)
      })
    })
    ro.observe(box)
    io.observe(box)
    mo.observe(document.documentElement, { attributes: true, subtree: true, attributeFilter: ["class", "data-material", "data-theme"] })
    document.addEventListener("visibilitychange", sync)
    sync()

    return () => {
      stop()
      cancelAnimationFrame(pending)
      ro.disconnect()
      io.disconnect()
      mo.disconnect()
      document.removeEventListener("visibilitychange", sync)
    }
  }, [colorKey, speed, amplitude, coverage, opacity, pad, reduce])

  return (
    <div
      ref={boxRef}
      data-slot="wavy-background"
      className={cn("relative isolate h-[360px] w-full overflow-hidden rounded-2xl border border-border bg-bg", className)}
    >
      <canvas
        ref={canvasRef}
        aria-hidden
        data-slot="wavy-background-canvas"
        className="pointer-events-none absolute z-0"
        style={{
          top: -pad,
          left: -pad,
          width: `calc(100% + ${pad * 2}px)`,
          height: `calc(100% + ${pad * 2}px)`,
          filter: blur > 0 ? `blur(${blur}px)` : undefined,
        }}
      />
      <div className="relative z-10 h-full">
        {children ?? (
          <div className="flex h-full flex-col items-center gap-4 px-6 pt-10 text-center">
            <span className="rounded-full border border-accent-line bg-accent-soft px-2.5 py-0.5 text-xs font-medium text-accent-fg">
              Lumen Cash Flow
            </span>
            <p className="max-w-[18ch] text-3xl font-medium tracking-[-0.035em] text-balance text-fg">
              Ride the month, not the spreadsheet
            </p>
            <Button>
              Forecast my runway
              <ArrowRight />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export { WavyBackground }
export type { WavyBackgroundProps }
