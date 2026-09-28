"use client"
import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

type Feature = { title: string; description: string }

function AnimatedFeatureRow({
  features,
  className,
}: {
  features: Feature[]
  className?: string
}) {
  const reduce = useReducedMotion()
  return (
    <div data-slot="animated-feature-row" data-tier="premium" className={cn("grid gap-4 md:grid-cols-3", className)}>
      {features.map((f, i) => (
        <motion.div
          key={f.title}
          initial={reduce ? false : { y: 16 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.06, duration: 0.45 }}
          className="rounded-xl border border-border bg-surface p-5 shadow-highlight"
        >
          <div className="mb-3 h-px w-8 bg-accent" aria-hidden />
          <h3 className="text-sm font-medium text-fg">{f.title}</h3>
          <p className="mt-2 text-sm leading-[1.55] text-fg-muted">{f.description}</p>
        </motion.div>
      ))}
    </div>
  )
}
export { AnimatedFeatureRow }
