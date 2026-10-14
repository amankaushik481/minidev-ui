"use client"
import * as React from "react"
import { useInView, useReducedMotion } from "motion/react"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"

/**
 * A skewed grid of hairline boxes behind your content where the box under the pointer lights up in colour and fades out behind it.
 * One pointer handler maps the cursor into the skewed grid with a little
 * matrix maths and writes the colour straight to the box, so React never
 * re-renders a box. Neighbours catch a softer glow. It works through the
 * content on top and with touch. Left alone, a box lights now and then so
 * the panel looks alive; that idle flicker pauses off screen and stops for
 * reduced motion, and the fade is instant for reduced motion too.
 */
type BackgroundBoxesProps = {
  /** Box density. 1 draws 64px boxes, 2 draws them half the size. */
  density?: number
  /** Colours the boxes light up in. Any CSS colour, including var(--token). */
  colors?: string[]
  /** Seconds a lit box takes to fade back. */
  fade?: number
  /** Boxes that light on their own each second while nobody hovers. 0 turns the idle flicker off. */
  idle?: number
  /** Tilt of the grid in degrees: skew along x, then along y. */
  skew?: [number, number]
  className?: string
  children?: React.ReactNode
}

type Geometry = { cols: number; rows: number; cell: number; gw: number; gh: number }

function BackgroundBoxes({
  density = 1,
  colors = ["var(--accent)", "var(--accent-2)", "var(--info)", "var(--success)", "var(--warning)"],
  fade = 1.6,
  idle = 2,
  skew = [-24, 12],
  className,
  children,
}: BackgroundBoxesProps) {
  const reduce = useReducedMotion()
  const ref = React.useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: "80px" })
  const gridRef = React.useRef<HTMLDivElement>(null)
  const current = React.useRef(-1)
  const [geo, setGeo] = React.useState<Geometry | null>(null)
  const palette = colors.length ? colors : ["var(--accent)"]
  const cell = Math.max(12, Math.round(64 / Math.max(0.25, density)))
  const [sx, sy] = skew
  const ta = Math.tan((sx * Math.PI) / 180)
  const tb = Math.tan((sy * Math.PI) / 180)

  // Measure on the client only, so the server renders an empty grid and hydration matches.
  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => {
      const w = e.contentRect.width
      const h = e.contentRect.height
      const cols = Math.ceil((w * 1.6) / cell) + 1
      const rows = Math.ceil((h * 2.1) / cell) + 1
      setGeo((g) => (g && g.cols === cols && g.rows === rows && g.cell === cell ? g : { cols, rows, cell, gw: cols * cell, gh: rows * cell }))
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [cell])

  const boxAt = (i: number) => gridRef.current?.children[i] as HTMLElement | undefined
  const light = (i: number, pct: number) => {
    const el = boxAt(i)
    if (!el) return
    el.style.transitionDuration = "0s"
    el.style.backgroundColor = `color-mix(in oklch, var(--c) ${pct}%, transparent)`
  }
  const release = (i: number) => {
    const el = boxAt(i)
    if (!el) return
    // Flush the lit state first, so the browser has something to transition from.
    void getComputedStyle(el).backgroundColor
    el.style.transitionDuration = ""
    el.style.backgroundColor = ""
  }

  // Idle flicker: a box near the middle lights and lets go, on a fixed pseudo-random walk.
  React.useEffect(() => {
    if (!geo || reduce || !inView || idle <= 0) return
    let seed = 3
    const rand = () => (seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648
    const tick = () => {
      if (document.hidden) return
      const col = Math.floor(geo.cols * (0.22 + 0.56 * rand()))
      const row = Math.floor(geo.rows * (0.28 + 0.44 * rand()))
      const i = row * geo.cols + col
      if (i === current.current) return
      light(i, 54)
      requestAnimationFrame(() => {
        if (i !== current.current) release(i)
      })
    }
    const timer = window.setInterval(tick, Math.max(120, 1000 / idle))
    return () => window.clearInterval(timer)
    // light and release only touch refs.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geo, reduce, inView, idle])

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el || !geo) return
    const r = el.getBoundingClientRect()
    // Pointer relative to the panel centre, then through the inverse skew into grid space.
    const qx = e.clientX - r.left - r.width / 2
    const qy = e.clientY - r.top - r.height / 2
    const px = qx - ta * qy + geo.gw / 2
    const py = -tb * qx + (1 + ta * tb) * qy + geo.gh / 2
    const col = Math.floor(px / geo.cell)
    const row = Math.floor(py / geo.cell)
    const idx = col < 0 || row < 0 || col >= geo.cols || row >= geo.rows ? -1 : row * geo.cols + col
    if (idx === current.current) return
    if (current.current >= 0) release(current.current)
    current.current = idx
    if (idx < 0) return
    light(idx, 64)
    // Neighbours catch a softer glow and let go at once, so a trail forms behind the pointer.
    const around = [col > 0 ? idx - 1 : -1, col < geo.cols - 1 ? idx + 1 : -1, row > 0 ? idx - geo.cols : -1, row < geo.rows - 1 ? idx + geo.cols : -1]
    for (const n of around) if (n >= 0) light(n, 26)
    requestAnimationFrame(() => {
      for (const n of around) if (n >= 0 && n !== current.current) release(n)
    })
  }
  const onPointerLeave = () => {
    if (current.current >= 0) release(current.current)
    current.current = -1
  }

  return (
    <div
      ref={ref}
      data-slot="background-boxes"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      onPointerCancel={onPointerLeave}
      className={cn("relative isolate h-[360px] w-full overflow-hidden rounded-2xl border border-border bg-bg", className)}
      style={{ "--bb-fade": reduce ? "0s" : `${Math.max(0, fade)}s` } as React.CSSProperties}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          maskImage: "radial-gradient(120% 130% at 50% 50%, black 35%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(120% 130% at 50% 50%, black 35%, transparent 100%)",
        }}
      >
        {geo && (
          <div
            ref={gridRef}
            data-slot="background-boxes-grid"
            className="absolute top-1/2 left-1/2 grid border-t border-l border-border will-change-transform"
            style={{
              width: geo.gw,
              height: geo.gh,
              gridTemplateColumns: `repeat(${geo.cols}, ${geo.cell}px)`,
              gridAutoRows: `${geo.cell}px`,
              transform: `translate(-50%, -50%) skewX(${sx}deg) skewY(${sy}deg)`,
            }}
          >
            {Array.from({ length: geo.cols * geo.rows }, (_, i) => {
              const col = i % geo.cols
              const row = (i - col) / geo.cols
              const c = palette[(col * 7 + row * 11 + ((col * row) % 3)) % palette.length]
              return (
                <div
                  key={i}
                  data-slot="background-boxes-box"
                  className="border-r border-b border-border"
                  style={{ "--c": c } as React.CSSProperties}
                />
              )
            })}
          </div>
        )}
      </div>
      <div className="relative z-10 h-full">
        {children ?? (
          <div className="flex h-full flex-col items-center justify-center gap-4 px-6 text-center">
            <span className="rounded-full border border-accent-line bg-accent-soft px-2.5 py-0.5 text-xs font-medium text-accent-fg">
              Northwind on Lumen
            </span>
            <p className="max-w-[16ch] text-3xl font-medium tracking-[-0.035em] text-balance text-fg">
              Built on a grid you can feel
            </p>
            <Button>
              Explore the system
              <ArrowRight />
            </Button>
          </div>
        )}
      </div>
      <style>{`[data-slot="background-boxes-box"]{transition:background-color var(--bb-fade,1.6s) cubic-bezier(0.3,0,0.8,0.15)}`}</style>
    </div>
  )
}

export { BackgroundBoxes }
export type { BackgroundBoxesProps }
