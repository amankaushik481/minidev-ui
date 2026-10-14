"use client"
import * as React from "react"
import { useReducedMotion } from "motion/react"
import { ArrowRightIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"

/**
 * A card whose border is a band of coloured light sweeping around it, masked to the border ring so the content is untouched.
 * A conic gradient of your colours turns on a registered CSS angle behind
 * a mask that keeps only the ring, so it stays crisp at any radius. It
 * holds still for reduced motion.
 */
type ShineBorderProps = {
  children?: React.ReactNode
  /** Colours in the band, in order. Any CSS colour; tokens like var(--accent) work. */
  colors?: string[]
  /** Seconds per lap. */
  duration?: number
  /** Border width in pixels. */
  borderWidth?: number
  /** Corner radius in pixels. */
  radius?: number
  className?: string
}

function ShineBorder({ children, colors = ["var(--accent)", "var(--accent-2)", "var(--info)"], duration = 8, borderWidth = 2, radius = 18, className }: ShineBorderProps) {
  const reduce = useReducedMotion()
  const list = colors.length ? colors : ["var(--accent)"]
  // The band covers two thirds of the lap and fades back into the plain border at both ends.
  const span = 240
  const stops = list.map((c, i) => `${c} ${Math.round(30 + (i * (span - 60)) / Math.max(1, list.length - 1))}deg`).join(", ")
  const ring = `conic-gradient(from var(--shine-border-angle), var(--border) 0deg, ${stops}, var(--border) ${span}deg, var(--border) 360deg)`
  return (
    <div data-slot="shine-border" className={cn("relative isolate mx-auto w-fit max-w-full", className)} style={{ borderRadius: radius }}>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          borderRadius: radius,
          padding: borderWidth,
          background: ring,
          WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          maskComposite: "exclude",
          animation: reduce ? undefined : `shine-border-turn ${duration}s linear infinite`,
        }}
      />
      {children ?? (
        <div className="w-[420px] max-w-full rounded-[inherit] bg-surface p-7 shadow-raised">
          <p className="text-[12px] font-medium tracking-[0.06em] text-accent-fg uppercase">Introducing Lumen 3.0</p>
          <h3 className="mt-3 text-2xl font-medium tracking-[-0.03em] text-balance text-fg sm:text-[1.75rem] sm:leading-[1.15]">Invoices that close themselves</h3>
          <p className="mt-3 text-sm leading-[1.6] text-pretty text-fg-muted">Lumen chases, reconciles and marks every invoice paid, so you never send another reminder by hand.</p>
          <Button variant="outline" size="sm" className="mt-5">
            Read the release notes <ArrowRightIcon />
          </Button>
        </div>
      )}
      <style>{`@property --shine-border-angle{syntax:"<angle>";inherits:false;initial-value:0deg}@keyframes shine-border-turn{to{--shine-border-angle:360deg}}`}</style>
    </div>
  )
}

export { ShineBorder }
export type { ShineBorderProps }
