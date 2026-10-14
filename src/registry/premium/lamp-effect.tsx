"use client"
import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"

/**
 * A glowing strip light at the top of a dark panel that switches on and widens to light the headline beneath it.
 * The lamp is a thin bright line with a soft trapezoid of light falling from
 * it. On first view the line stretches open and the light follows a beat
 * later, with springs. The panel stays dark in both themes by default so the
 * light has something to fall on; reduced motion shows the lamp already on.
 */
type LampEffectProps = {
  /** Width of the lamp line in pixels. The light scales with it and never exceeds the panel. */
  width?: number
  /** Any CSS colour, including var(--token). Defaults to the accent. */
  color?: string
  /** Strength of the glow, 0 to 2. */
  glow?: number
  /** Keep the panel dark in both themes. Turn off to follow the page theme. */
  dark?: boolean
  className?: string
  children?: React.ReactNode
}

/** Where the lamp line sits, as a share of the panel height. */
const LINE = 0.34

const MORPH = { type: "spring", bounce: 0.16, duration: 0.5 } as const

function LampEffect({ width = 440, color = "var(--accent)", glow = 1, dark = true, className, children }: LampEffectProps) {
  const reduce = useReducedMotion()
  const power = Math.min(2, Math.max(0, glow))
  const w = Math.max(80, width)
  const vars = {
    "--lamp-w": `min(${w}px, 84cqw)`,
    "--lamp-c": color,
  } as React.CSSProperties
  const soft = (pct: number) => `color-mix(in oklch, var(--lamp-c) ${Math.round(pct * Math.min(1.25, power))}%, transparent)`
  const trapezoid = (top: string) => `polygon(calc(50% - ${top}) 0, calc(50% + ${top}) 0, 100% 100%, 0 100%)`
  const view = { once: true, amount: 0.3 } as const

  return (
    <div
      data-slot="lamp-effect"
      className={cn(
        "@container relative isolate h-[360px] w-full overflow-hidden rounded-2xl border border-border bg-bg",
        dark && "dark",
        className
      )}
      style={vars}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        {/* The wide, faint fall of light. Blur is on the wrapper so the clipped shape keeps soft edges. */}
        <div className="absolute inset-x-0 bottom-0" style={{ top: `${LINE * 100}%`, filter: `blur(${18 + 10 * power}px)` }}>
          <motion.div
            className="absolute left-1/2 h-full w-[calc(var(--lamp-w)*2.6)] -translate-x-1/2"
            style={{
              clipPath: trapezoid("var(--lamp-w) / 2"),
              background: `linear-gradient(to bottom, ${soft(42)}, ${soft(16)} 45%, transparent 100%)`,
              transformOrigin: "50% 0%",
            }}
            initial={reduce ? false : { scaleX: 0.08, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={view}
            transition={reduce ? { duration: 0 } : { scaleX: { ...MORPH, delay: 0.12 }, opacity: { duration: 0.5, delay: 0.12, ease: [0.2, 0, 0, 1] } }}
          />
        </div>
        {/* A tighter, brighter core right under the line. */}
        <div className="absolute inset-x-0" style={{ top: `${LINE * 100}%`, height: "46%", filter: `blur(${10 + 6 * power}px)` }}>
          <motion.div
            className="absolute left-1/2 h-full w-[calc(var(--lamp-w)*1.5)] -translate-x-1/2"
            style={{
              clipPath: trapezoid("var(--lamp-w) / 2.2"),
              background: `linear-gradient(to bottom, ${soft(70)}, ${soft(24)} 40%, transparent 100%)`,
              transformOrigin: "50% 0%",
            }}
            initial={reduce ? false : { scaleX: 0.08, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={view}
            transition={reduce ? { duration: 0 } : { scaleX: { ...MORPH, delay: 0.06 }, opacity: { duration: 0.4, delay: 0.06, ease: [0.2, 0, 0, 1] } }}
          />
        </div>
        {/* The housing: a solid block above the line keeps the light below it. */}
        <div className="absolute inset-x-0 top-0 bg-bg" style={{ height: `${LINE * 100}%` }} />
        {/* The lamp line and its halo. */}
        <motion.div
          data-slot="lamp-effect-line"
          className="absolute left-1/2 h-0.5 w-(--lamp-w) -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            top: `${LINE * 100}%`,
            background: `linear-gradient(to right, transparent, var(--lamp-c) 12%, var(--lamp-c) 88%, transparent)`,
            boxShadow: `0 0 ${Math.round(14 * power + 6)}px ${Math.round(2 * power)}px ${soft(60)}, 0 0 ${Math.round(40 * power + 12)}px ${Math.round(6 * power + 2)}px ${soft(28)}`,
          }}
          initial={reduce ? false : { scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={view}
          transition={reduce ? { duration: 0 } : { scaleX: MORPH, opacity: { duration: 0.2 } }}
        />
      </div>
      <div className="relative z-10 h-full">
        {children ?? (
          <div className="flex h-full flex-col items-center justify-end gap-4 px-6 pb-10 text-center">
            <span className="rounded-full border border-accent-line bg-accent-soft px-2.5 py-0.5 text-xs font-medium text-accent-fg">
              Lumen 3.0
            </span>
            <p className="max-w-[18ch] text-3xl font-medium tracking-[-0.035em] text-balance text-fg">
              Close the books in minutes, not days
            </p>
            <Button>
              See what changed
              <ArrowRight />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export { LampEffect }
export type { LampEffectProps }
