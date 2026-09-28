"use client"
import * as React from "react"
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

function CardTilt({
  title = "Crafted details",
  body = "Tilt responds to pointer. Reduced motion stays flat.",
  className,
}: {
  title?: string
  body?: string
  className?: string
}) {
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 })
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 200, damping: 20 })
  const glareX = useTransform(x, [-0.5, 0.5], [20, 80])
  const glareY = useTransform(y, [-0.5, 0.5], [20, 80])
  const glare = useMotionTemplate`radial-gradient(420px circle at ${glareX}% ${glareY}%, color-mix(in oklch, var(--accent) 16%, transparent), transparent 55%)`

  return (
    <motion.div
      data-slot="card-tilt"
      data-tier="premium"
      onMouseMove={(e) => {
        if (reduce) return
        const r = e.currentTarget.getBoundingClientRect()
        x.set((e.clientX - r.left) / r.width - 0.5)
        y.set((e.clientY - r.top) / r.height - 0.5)
      }}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      style={reduce ? undefined : { rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border bg-surface p-6 shadow-highlight",
        className
      )}
    >
      <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={reduce ? undefined : { background: glare }} />
      <p className="relative text-xs font-medium tracking-[0.01em] text-fg-muted uppercase">Featured</p>
      <h3 className="relative mt-2 text-xl font-medium tracking-[-0.014em] text-fg">{title}</h3>
      <p className="relative mt-2 text-sm leading-[1.55] text-fg-muted">{body}</p>
    </motion.div>
  )
}
export { CardTilt }
