"use client"
import * as React from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { cn } from "@/lib/utils"

function ParallaxPanel({
  title = "Depth without blur shadows",
  body = "Scroll-linked motion stays Hairline-legal: transforms only.",
  className,
}: {
  title?: string
  body?: string
  className?: string
}) {
  const reduce = useReducedMotion()
  const ref = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [36, -36])
  const y2 = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-20, 20])
  return (
    <div ref={ref} data-slot="parallax-panel" data-tier="premium" className={cn("relative overflow-hidden rounded-2xl border border-border bg-sunken p-10", className)}>
      <motion.div style={{ y: y2 }} aria-hidden className="pointer-events-none absolute -right-8 -top-8 size-40 rounded-full bg-[radial-gradient(circle,oklch(0.48_0.17_285/0.22),transparent_70%)]" />
      <motion.div style={{ y }} className="relative max-w-lg">
        <p className="text-xs font-medium tracking-[0.01em] text-fg-muted uppercase">Parallax</p>
        <h3 className="mt-2 text-3xl font-medium tracking-[-0.022em] text-fg">{title}</h3>
        <p className="mt-3 text-sm leading-[1.55] text-fg-muted">{body}</p>
      </motion.div>
    </div>
  )
}
export { ParallaxPanel }
