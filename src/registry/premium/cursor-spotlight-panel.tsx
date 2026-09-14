"use client"
import * as React from "react"
import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

function CursorSpotlightPanel({
  title = "Craft under the cursor",
  body = "Hairline panels that respond without blur shadows — spotlight via motion values only.",
  className,
}: {
  title?: string
  body?: string
  className?: string
}) {
  const reduce = useReducedMotion()
  const mx = useMotionValue(50)
  const my = useMotionValue(40)
  const background = useMotionTemplate`radial-gradient(420px circle at ${mx}% ${my}%, oklch(0.48 0.17 285 / 0.18), transparent 55%)`

  return (
    <motion.div
      data-slot="cursor-spotlight-panel"
      data-tier="premium"
      onMouseMove={(e) => {
        if (reduce) return
        const r = e.currentTarget.getBoundingClientRect()
        mx.set(((e.clientX - r.left) / r.width) * 100)
        my.set(((e.clientY - r.top) / r.height) * 100)
      }}
      style={reduce ? undefined : { background }}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border bg-sunken p-8",
        "shadow-[inset_0_1px_0_oklch(1_0_0/0.55)]",
        className
      )}
    >
      <h3 className="text-2xl font-medium tracking-[-0.018em] text-fg">{title}</h3>
      <p className="mt-2 max-w-md text-sm leading-[1.55] text-fg-muted">{body}</p>
    </motion.div>
  )
}
export { CursorSpotlightPanel }
