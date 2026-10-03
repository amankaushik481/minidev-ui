"use client"
import * as React from "react"
import { useReducedMotion } from "motion/react"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"

/**
 * A canvas particle field that drifts behind your content and parts around the pointer, or gathers toward it.
 * Colour comes from the accent token and follows theme and material changes.
 * The canvas is sharp on high density screens, resizes with its box, sleeps
 * off screen and in background tabs, and draws one still frame for reduced
 * motion.
 */
type ParticlesProps = {
  /** Number of particles. */
  quantity?: number
  /** Radius of the nearest particles in pixels. Farther ones are smaller. */
  size?: number
  /** Any CSS colour, including var(--token). Defaults to the accent. */
  color?: string
  /** Push particles away from the pointer, or pull them toward it. */
  mode?: "repel" | "attract"
  /** Reach of the pointer in pixels. */
  radius?: number
  /** Drift speed multiplier. 0 holds the field still apart from the pointer. */
  drift?: number
  className?: string
  children?: React.ReactNode
}

type Dot = { x: number; y: number; z: number; vx: number; vy: number; ox: number; oy: number; a: number; ph: number }

function Particles({
  quantity = 110,
  size = 2,
  color = "var(--accent)",
  mode = "repel",
  radius = 120,
  drift = 1,
  className,
  children,
}: ParticlesProps) {
  const reduce = useReducedMotion()
  const boxRef = React.useRef<HTMLDivElement>(null)
  const canvasRef = React.useRef<HTMLCanvasElement>(null)

  React.useEffect(() => {
    const box = boxRef.current
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!box || !canvas || !ctx) return

    let w = 0
    let h = 0
    let dpr = 1
    let raf = 0
    let last = 0
    let visible = true
    let fill = ""
    const pointer = { x: 0, y: 0, on: false }
    const dots: Dot[] = []

    // Resolve the colour through the cascade, so var(--accent) follows theme and material.
    const readColor = () => {
      canvas.style.color = color
      fill = getComputedStyle(canvas).color || "currentColor"
    }

    const seed = () => {
      dots.length = 0
      for (let i = 0; i < Math.max(0, Math.round(quantity)); i++) {
        const z = [0.45, 0.7, 1][i % 3]
        const dir = Math.random() * Math.PI * 2
        const v = (4 + Math.random() * 8) * z
        dots.push({
          x: Math.random() * w,
          y: Math.random() * h,
          z,
          vx: Math.cos(dir) * v,
          vy: Math.sin(dir) * v - 3 * z,
          ox: 0,
          oy: 0,
          a: 0.25 + 0.55 * z * (0.6 + Math.random() * 0.4),
          ph: Math.random() * Math.PI * 2,
        })
      }
    }

    const resize = () => {
      const r = box.getBoundingClientRect()
      const nw = Math.max(1, Math.round(r.width))
      const nh = Math.max(1, Math.round(r.height))
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(nw * dpr)
      canvas.height = Math.round(nh * dpr)
      if (!dots.length || !w || !h) {
        w = nw
        h = nh
        seed()
      } else {
        // Keep each particle's relative place, so a resize never reshuffles the field.
        for (const d of dots) {
          d.x = (d.x / w) * nw
          d.y = (d.y / h) * nh
        }
        w = nw
        h = nh
      }
    }

    const draw = (t: number, dt: number) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = fill
      const pull = mode === "attract"
      const m = 12
      for (const d of dots) {
        if (dt > 0) {
          d.x += d.vx * drift * dt
          d.y += d.vy * drift * dt
          if (d.x < -m) d.x += w + m * 2
          else if (d.x > w + m) d.x -= w + m * 2
          if (d.y < -m) d.y += h + m * 2
          else if (d.y > h + m) d.y -= h + m * 2

          let tx = 0
          let ty = 0
          if (pointer.on) {
            const dx = d.x - pointer.x
            const dy = d.y - pointer.y
            const dist = Math.hypot(dx, dy) || 1
            if (dist < radius) {
              const k = 1 - dist / radius
              const ease = k * k * (3 - 2 * k)
              if (pull) {
                tx = -dx * ease * 0.55
                ty = -dy * ease * 0.55
              } else {
                tx = (dx / dist) * ease * radius * 0.5 * d.z
                ty = (dy / dist) * ease * radius * 0.5 * d.z
              }
            }
          }
          // Ease toward the pointer's target offset; settles back when the pointer leaves.
          const follow = 1 - Math.pow(0.0025, dt)
          d.ox += (tx - d.ox) * follow
          d.oy += (ty - d.oy) * follow
        }
        const twinkle = 0.75 + 0.25 * Math.sin(t * 0.0012 + d.ph)
        ctx.globalAlpha = d.a * twinkle
        ctx.beginPath()
        ctx.arc(d.x + d.ox, d.y + d.oy, Math.max(0.4, size * d.z), 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
    }

    const loop = (t: number) => {
      const dt = last ? Math.min(0.05, (t - last) / 1000) : 0
      last = t
      draw(t, dt)
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
        draw(0, 0)
        return
      }
      const run = visible && !document.hidden
      if (run && !raf) raf = requestAnimationFrame(loop)
      if (!run && raf) stop()
    }

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      const x = e.clientX - r.left
      const y = e.clientY - r.top
      pointer.on = x >= -radius && y >= -radius && x <= r.width + radius && y <= r.height + radius
      pointer.x = x
      pointer.y = y
    }
    const onLeave = () => {
      pointer.on = false
    }

    readColor()
    resize()
    const ro = new ResizeObserver(() => {
      resize()
      if (reduce || !raf) draw(0, 0)
    })
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      sync()
    })
    const mo = new MutationObserver(() => {
      readColor()
      if (reduce || !raf) draw(0, 0)
    })
    ro.observe(box)
    io.observe(box)
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "data-material"] })
    document.addEventListener("visibilitychange", sync)
    if (!reduce) {
      window.addEventListener("pointermove", onMove, { passive: true })
      document.documentElement.addEventListener("pointerleave", onLeave)
    }
    sync()

    return () => {
      stop()
      ro.disconnect()
      io.disconnect()
      mo.disconnect()
      document.removeEventListener("visibilitychange", sync)
      window.removeEventListener("pointermove", onMove)
      document.documentElement.removeEventListener("pointerleave", onLeave)
    }
  }, [quantity, size, color, mode, radius, drift, reduce])

  return (
    <div
      ref={boxRef}
      data-slot="particles"
      className={cn("relative isolate h-[360px] w-full overflow-hidden rounded-2xl border border-border bg-bg", className)}
    >
      <canvas ref={canvasRef} aria-hidden data-slot="particles-canvas" className="pointer-events-none absolute inset-0 z-0 size-full" />
      <div className="relative z-10 h-full">
        {children ?? (
          <div className="flex h-full flex-col items-center justify-center gap-4 px-6 text-center">
            <span className="rounded-full border border-accent-line bg-accent-soft px-2.5 py-0.5 text-xs font-medium text-accent-fg">
              Lumen for teams
            </span>
            <p className="max-w-[16ch] text-3xl font-medium tracking-[-0.035em] text-balance text-fg">
              Every invoice, accounted for
            </p>
            <Button>
              Start free trial
              <ArrowRight />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export { Particles }
export type { ParticlesProps }
