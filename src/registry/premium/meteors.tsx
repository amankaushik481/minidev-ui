"use client"
import * as React from "react"
import { useInView, useReducedMotion } from "motion/react"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"

/**
 * Meteor streaks with fading tails that fall diagonally behind your content at random intervals.
 * Each meteor takes a fresh path every time it comes round. The streaks sit
 * behind the content, ignore the pointer, pause off screen and hold still for
 * reduced motion.
 */
type MeteorsProps = {
  /** How many meteors are in flight at once. */
  count?: number
  /** Direction of travel in degrees. 0 points right, 90 falls straight down. */
  angle?: number
  /** Speed multiplier. 2 is twice as fast, 0.5 half as fast. */
  speed?: number
  /** Tail length in pixels. */
  tail?: number
  className?: string
  children?: React.ReactNode
}

type Meteor = { id: number; x: number; y: number; duration: number; delay: number; glow: number }

/** Share of each cycle a meteor spends in flight; the rest is the pause before it comes round again. */
const FLIGHT = 0.7

function Meteors({ count = 16, angle = 140, speed = 1, tail = 110, className, children }: MeteorsProps) {
  const reduce = useReducedMotion()
  const ref = React.useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: "80px" })
  const [box, setBox] = React.useState<{ w: number; h: number } | null>(null)
  const [meteors, setMeteors] = React.useState<Meteor[]>([])

  const rad = (angle * Math.PI) / 180
  const dx = Math.cos(rad)
  const dy = Math.sin(rad)
  const travel = box ? Math.hypot(box.w, box.h) + tail * 2 : 0

  // Measure on the client only, so the server renders no meteors and hydration matches.
  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => {
      const w = Math.round(e.contentRect.width)
      const h = Math.round(e.contentRect.height)
      setBox((b) => (b && b.w === w && b.h === h ? b : { w, h }))
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // A path through a random point of the panel, entering and leaving off screen.
  const place = React.useCallback(
    (w: number, h: number) => {
      const px = Math.random() * w
      const py = Math.random() * h
      const half = (Math.hypot(w, h) + tail * 2) / 2
      return { x: px - dx * half, y: py - dy * half }
    },
    [dx, dy, tail]
  )

  React.useEffect(() => {
    if (!box) return
    const s = Math.max(0.1, speed)
    setMeteors(
      Array.from({ length: Math.max(0, Math.round(count)) }, (_, id) => ({
        id,
        ...place(box.w, box.h),
        duration: (1.4 + Math.random() * 1.8) / FLIGHT / s,
        delay: Math.random() * 3,
        glow: 0.55 + Math.random() * 0.45,
      }))
    )
  }, [box, count, speed, place])

  // Each lap, the meteor re-enters on a fresh path while it is invisible.
  const reroll = (id: number) => {
    if (!box) return
    setMeteors((all) => all.map((m) => (m.id === id ? { ...m, ...place(box.w, box.h) } : m)))
  }

  return (
    <div
      ref={ref}
      data-slot="meteors"
      className={cn("relative isolate h-[360px] w-full overflow-hidden rounded-2xl border border-border bg-bg", className)}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(120% 70% at 85% -10%, var(--accent-soft), transparent 70%)" }}
        />
        {meteors.map((m) => {
          const vars = {
            "--x": `${m.x}px`,
            "--y": `${m.y}px`,
            "--a": `${angle}deg`,
            "--t": `${tail}px`,
            "--d": `${travel}px`,
            "--o": m.glow,
          } as React.CSSProperties
          return (
            <span
              key={m.id}
              data-slot="meteors-meteor"
              onAnimationIteration={() => reroll(m.id)}
              className="absolute top-0 left-0 block h-px origin-[0_50%]"
              style={{
                ...vars,
                width: tail,
                background: "linear-gradient(to right, transparent, var(--accent))",
                transform: reduce
                  ? `translate(${m.x + (dx * travel) / 2}px, ${m.y + (dy * travel) / 2}px) rotate(${angle}deg) translateX(-${tail}px)`
                  : undefined,
                opacity: reduce ? m.glow * 0.5 : 0,
                animation: reduce ? undefined : `meteors-fall ${m.duration}s linear ${m.delay}s infinite`,
                animationPlayState: inView ? "running" : "paused",
              }}
            >
              <span
                className="absolute top-1/2 right-0 block size-[3px] -translate-y-1/2 translate-x-1/2 rounded-full"
                style={{ background: "var(--accent)", boxShadow: "0 0 8px 2px var(--accent-line)" }}
              />
            </span>
          )
        })}
      </div>
      <div className="relative z-10 h-full">
        {children ?? (
          <div className="flex h-full flex-col items-center justify-center gap-4 px-6 text-center">
            <span className="rounded-full border border-accent-line bg-accent-soft px-2.5 py-0.5 text-xs font-medium text-accent-fg">
              Lumen 3.0
            </span>
            <p className="max-w-[16ch] text-3xl font-medium tracking-[-0.035em] text-balance text-fg">
              Invoices that close themselves
            </p>
            <Button>
              Read the release notes
              <ArrowRight />
            </Button>
          </div>
        )}
      </div>
      <style>{`@keyframes meteors-fall{0%{transform:translate(var(--x),var(--y)) rotate(var(--a)) translateX(calc(var(--t) * -1));opacity:0}6%{opacity:var(--o)}${Math.round(FLIGHT * 80)}%{opacity:var(--o)}${Math.round(FLIGHT * 100)}%,100%{transform:translate(var(--x),var(--y)) rotate(var(--a)) translateX(calc(var(--d) - var(--t)));opacity:0}}`}</style>
    </div>
  )
}

export { Meteors }
export type { MeteorsProps }
