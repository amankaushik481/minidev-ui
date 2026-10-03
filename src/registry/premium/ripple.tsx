"use client"
import * as React from "react"
import { useInView, useReducedMotion } from "motion/react"
import { Radio } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"

/**
 * Concentric rings behind your content with a soft pulse that travels outward ring by ring, like a sonar ping.
 * Clicking or tapping the panel sends an extra ripple out from the pointer.
 * The rings sit behind the content, pause off screen and hold still for
 * reduced motion.
 */
type RippleProps = {
  /** Number of rings. */
  count?: number
  /** Gap between neighbouring rings in pixels. */
  spacing?: number
  /** Diameter of the innermost ring in pixels. */
  size?: number
  /** Centre of the rings, in percent of the panel width and height. */
  origin?: { x: number; y: number }
  /** Seconds for one pulse to travel out and settle. */
  duration?: number
  /** Send a ripple out from the pointer on click or tap. */
  interactive?: boolean
  className?: string
  children?: React.ReactNode
}

type Burst = { id: number; x: number; y: number }

function Ripple({
  count = 7,
  spacing = 44,
  size = 128,
  origin = { x: 50, y: 50 },
  duration = 4,
  interactive = true,
  className,
  children,
}: RippleProps) {
  const reduce = useReducedMotion()
  const ref = React.useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: "80px" })
  const [bursts, setBursts] = React.useState<Burst[]>([])
  const nextId = React.useRef(0)
  const rings = Math.max(1, Math.round(count))
  // The pulse reaches the outer ring at 45% of the cycle, then the rings rest.
  const step = (duration * 0.45) / rings

  const emit = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!interactive || reduce || e.button !== 0) return
    const r = e.currentTarget.getBoundingClientRect()
    const id = nextId.current++
    setBursts((b) => [...b.slice(-5), { id, x: e.clientX - r.left, y: e.clientY - r.top }])
  }

  return (
    <div
      ref={ref}
      data-slot="ripple"
      onPointerDown={emit}
      className={cn("relative isolate h-[360px] w-full overflow-hidden rounded-2xl border border-border bg-bg", className)}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        {Array.from({ length: rings }, (_, i) => {
          const d = size + i * spacing * 2
          const rest = Math.max(0.12, 0.9 - (i / rings) * 0.8)
          return (
            <span
              key={i}
              data-slot="ripple-ring"
              className="absolute block rounded-full border"
              style={{
                left: `${origin.x}%`,
                top: `${origin.y}%`,
                width: d,
                height: d,
                borderColor: "var(--accent-line)",
                background: i === 0 ? "var(--accent-soft)" : undefined,
                ["--ripple-o" as string]: rest,
                opacity: rest,
                transform: "translate(-50%, -50%)",
                animation: reduce ? undefined : `ripple-ping ${duration}s cubic-bezier(0.2, 0, 0, 1) ${(i * step).toFixed(3)}s infinite`,
                animationPlayState: inView ? "running" : "paused",
              }}
            />
          )
        })}
        {bursts.map((b) => (
          <span
            key={b.id}
            data-slot="ripple-burst"
            onAnimationEnd={() => setBursts((all) => all.filter((x) => x.id !== b.id))}
            className="absolute block -translate-x-1/2 -translate-y-1/2 rounded-full border"
            style={{
              left: b.x,
              top: b.y,
              borderColor: "var(--accent)",
              background: "var(--accent-soft)",
              animation: "ripple-burst 1.1s cubic-bezier(0.2, 0, 0, 1) forwards",
            }}
          />
        ))}
      </div>
      <div className="relative z-10 h-full">
        {children ?? (
          <div className="flex h-full flex-col items-center justify-center gap-4 px-6 text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-accent-line bg-accent-soft px-2.5 py-0.5 text-xs font-medium text-accent-fg">
              <Radio className="size-3.5" aria-hidden />
              Live bank sync
            </span>
            <p className="max-w-[16ch] text-3xl font-medium tracking-[-0.035em] text-balance text-fg">
              Lumen hears every payment
            </p>
            <Button>Connect a bank</Button>
          </div>
        )}
      </div>
      <style>{`@keyframes ripple-ping{0%{transform:translate(-50%,-50%) scale(1);opacity:var(--ripple-o)}10%{transform:translate(-50%,-50%) scale(1.035);opacity:calc(var(--ripple-o) + 0.45)}32%,100%{transform:translate(-50%,-50%) scale(1);opacity:var(--ripple-o)}}@keyframes ripple-burst{from{width:8px;height:8px;opacity:0.9}to{width:440px;height:440px;opacity:0}}`}</style>
    </div>
  )
}

export { Ripple }
export type { RippleProps }
