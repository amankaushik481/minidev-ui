"use client"
import * as React from "react"
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"

/**
 * A call-to-action button that leans toward the pointer as it nears, like a magnet, and springs back when the pointer leaves.
 * It is the kit Button inside a wrapper that moves on a spring, so every
 * Button prop (variant, size, render, onClick, disabled) works unchanged.
 * Only a mouse or pen pulls it; touch and keyboard use it as a normal button,
 * and reduced motion keeps it still.
 *
 * Use it for the one primary action on a marketing section. Reach for Button
 * everywhere in product UI, and ShimmerButton when the action should glow
 * rather than move.
 *
 * @example
 * <MagneticCta size="lg" strength={20} onClick={startTrial}>Start free trial</MagneticCta>
 * <MagneticCta render={<a href="/signup" />}>Get started</MagneticCta>
 */
type MagneticCtaProps = React.ComponentProps<typeof Button> & {
  /** Furthest the button travels toward the pointer, in pixels. */
  strength?: number
}

/** The roll spring from the spec: enough mass that the button settles rather than snaps. */
const ROLL = { stiffness: 260, damping: 28, mass: 0.9 }

function MagneticCta({ children = "Get started", className, strength = 28, ...props }: MagneticCtaProps) {
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, ROLL)
  const sy = useSpring(y, ROLL)
  const ref = React.useRef<HTMLDivElement>(null)

  const onMove = (e: React.PointerEvent) => {
    if (reduce || e.pointerType === "touch" || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    const dx = e.clientX - (r.left + r.width / 2)
    const dy = e.clientY - (r.top + r.height / 2)
    x.set((dx / (r.width / 2)) * strength)
    y.set((dy / (r.height / 2)) * strength)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      data-slot="magnetic-cta"
      data-tier="premium"
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      onPointerCancel={reset}
      style={reduce ? undefined : { x: sx, y: sy }}
      className={cn("inline-flex", className)}
    >
      <Button type="button" className="w-full" {...props}>
        {children}
      </Button>
    </motion.div>
  )
}
export { MagneticCta }
export type { MagneticCtaProps }
