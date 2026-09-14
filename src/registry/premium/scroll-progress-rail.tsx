"use client"
import * as React from "react"
import { motion, useScroll, useSpring, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

function ScrollProgressRail({
  labels = ["Intro", "Product", "Proof", "Pricing"],
  className,
}: {
  labels?: string[]
  className?: string
}) {
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })
  return (
    <div
      data-slot="scroll-progress-rail"
      data-tier="premium"
      className={cn("sticky top-0 z-50 border-b border-border bg-raised/90 backdrop-blur-sm", className)}
    >
      <div className="relative h-0.5 w-full bg-sunken">
        <motion.div
          className="absolute inset-y-0 left-0 origin-left bg-accent"
          style={reduce ? { scaleX: 0 } : { scaleX }}
        />
      </div>
      <div className="mx-auto flex max-w-5xl justify-between gap-2 px-6 py-2">
        {labels.map((l) => (
          <span key={l} className="text-[10px] font-medium tracking-[0.01em] text-fg-muted uppercase">
            {l}
          </span>
        ))}
      </div>
    </div>
  )
}
export { ScrollProgressRail }
