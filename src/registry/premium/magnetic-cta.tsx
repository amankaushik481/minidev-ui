"use client"
import * as React from "react"
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"

function MagneticCta({
  children = "Get Premium",
  className,
  strength = 28,
  ...props
}: React.ComponentProps<typeof Button> & { strength?: number }) {
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 })
  const ref = React.useRef<HTMLDivElement>(null)

  const onMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    const dx = e.clientX - (r.left + r.width / 2)
    const dy = e.clientY - (r.top + r.height / 2)
    x.set((dx / (r.width / 2)) * strength)
    y.set((dy / (r.height / 2)) * strength)
  }

  return (
    <motion.div
      data-slot="magnetic-cta"
      data-tier="premium"
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      style={reduce ? undefined : { x: sx, y: sy }}
      className={cn("inline-flex", className)}>
      <Button type="button" className="w-full" {...props}>{children}</Button>
    </motion.div>
  )
}
export { MagneticCta }
