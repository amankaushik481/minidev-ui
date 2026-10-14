"use client"
import * as React from "react"
import { useInView, useReducedMotion } from "motion/react"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"

/**
 * Soft northern-lights curtains that drift and sway across the panel behind your content.
 * Three blurred bands of accent colour move at different periods, so the
 * motion never reads as a loop. The light sits behind the content, ignores
 * the pointer, pauses off screen and holds still for reduced motion.
 */
type AuroraBackgroundProps = {
  /** Strength of the light, 0 to 1. */
  intensity?: number
  /** Speed multiplier. 2 is twice as fast, 0.5 half as fast. */
  speed?: number
  /** Softness of the bands in pixels. */
  blur?: number
  /** Colours of the bands. Any CSS colour, including var(--token). */
  colors?: string[]
  className?: string
  children?: React.ReactNode
}

/**
 * The three curtains: gradient angle, band edges in pixels (each band fades in, holds, fades out, then a gap),
 * seconds per sway and drift direction. Both ends of a repeat are transparent, so the pattern tiles without a seam.
 */
const CURTAINS = [
  { angle: 104, bands: [0, 70, 150, 230, 300, 360, 420, 500, 560, 620, 690, 780], period: 17, dir: 1, alpha: 0.7, mask: "transparent 0%, black 16%, black 46%, transparent 86%" },
  { angle: 76, bands: [0, 60, 120, 190, 270, 330, 380, 450, 520, 580, 640, 720], period: 23, dir: -1, alpha: 0.5, mask: "transparent 4%, black 24%, black 54%, transparent 90%" },
  { angle: 94, bands: [0, 90, 180, 260, 340, 420, 490, 570, 660, 740, 820, 900], period: 31, dir: 1, alpha: 0.4, mask: "transparent 10%, black 32%, black 60%, transparent 94%" },
]

function AuroraBackground({
  intensity = 1,
  speed = 1,
  blur = 28,
  colors = ["var(--accent)", "var(--accent-2)", "var(--info)"],
  className,
  children,
}: AuroraBackgroundProps) {
  const reduce = useReducedMotion()
  const ref = React.useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: "80px" })
  const level = Math.min(1.5, Math.max(0, intensity))
  const rate = Math.max(0.05, speed)
  const palette = colors.length ? colors : ["var(--accent)"]
  const tint = (c: string, pct: number) => `color-mix(in oklch, ${c} ${pct}%, transparent)`

  return (
    <div
      ref={ref}
      data-slot="aurora-background"
      className={cn("relative isolate h-[360px] w-full overflow-hidden rounded-2xl border border-border bg-bg", className)}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-(--aurora-light) dark:opacity-(--aurora-dark)"
        style={{ "--aurora-light": level * 0.64, "--aurora-dark": level } as React.CSSProperties}
      >
        {CURTAINS.map((c, i) => {
          const [a, b, d] = [palette[i % palette.length], palette[(i + 1) % palette.length], palette[(i + 2) % palette.length]]
          const s = c.bands
          const stripes = `repeating-linear-gradient(${c.angle}deg, transparent ${s[0]}px, ${tint(a, 72)} ${s[1]}px, ${tint(a, 72)} ${s[2]}px, transparent ${s[3]}px, transparent ${s[4]}px, ${tint(b, 68)} ${s[5]}px, ${tint(b, 68)} ${s[6]}px, transparent ${s[7]}px, transparent ${s[8]}px, ${tint(d, 60)} ${s[9]}px, ${tint(d, 60)} ${s[10]}px, transparent ${s[11]}px)`
          const mask = `linear-gradient(to bottom, ${c.mask})`
          return (
            <div
              key={i}
              data-slot="aurora-background-curtain"
              className="absolute will-change-transform"
              style={{
                inset: "-30% -28%",
                background: stripes,
                opacity: c.alpha,
                filter: blur > 0 ? `blur(${blur}px)` : undefined,
                maskImage: mask,
                WebkitMaskImage: mask,
                ["--aurora-dir" as string]: c.dir,
                transform: reduce ? `translate3d(${c.dir * 2}%, 0, 0) skewX(${c.dir * 2}deg)` : undefined,
                animation: reduce ? undefined : `aurora-sway ${(c.period / rate).toFixed(2)}s ease-in-out ${(-c.period / rate / (2 + i)).toFixed(2)}s infinite alternate`,
                animationPlayState: inView ? "running" : "paused",
              }}
            />
          )
        })}
        <div
          className="absolute inset-0"
          style={{ background: `radial-gradient(70% 55% at 50% 0%, ${tint(palette[0], 22)}, transparent 70%)` }}
        />
      </div>
      <div className="relative z-10 h-full">
        {children ?? (
          <div className="flex h-full flex-col items-center justify-center gap-4 px-6 text-center">
            <span className="rounded-full border border-accent-line bg-accent-soft px-2.5 py-0.5 text-xs font-medium text-accent-fg">
              Lumen Insights
            </span>
            <p className="max-w-[18ch] text-3xl font-medium tracking-[-0.035em] text-balance text-fg">
              See your runway in a new light
            </p>
            <Button>
              Open the report
              <ArrowRight />
            </Button>
          </div>
        )}
      </div>
      <style>{`@keyframes aurora-sway{0%{transform:translate3d(calc(var(--aurora-dir) * -7%),0,0) skewX(calc(var(--aurora-dir) * -5deg))}100%{transform:translate3d(calc(var(--aurora-dir) * 7%),0,0) skewX(calc(var(--aurora-dir) * 5deg))}}`}</style>
    </div>
  )
}

export { AuroraBackground }
export type { AuroraBackgroundProps }
