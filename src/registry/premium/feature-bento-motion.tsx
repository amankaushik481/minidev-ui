"use client"
import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

const cells = [
  { title: "Hairline", body: "1px structure, no blur soup.", span: "sm:col-span-2" },
  { title: "Audit", body: "Screenshots + axe gate.", span: "" },
  { title: "Motion", body: "Reduced-motion first.", span: "" },
  { title: "Tokens", body: "OKLCH hue 285 only.", span: "sm:col-span-2" },
]

function FeatureBentoMotion({ className }: { className?: string }) {
  const reduce = useReducedMotion()
  return (
    <div data-slot="feature-bento-motion" data-tier="premium" className={cn("grid gap-3 sm:grid-cols-3", className)}>
      {cells.map((c, i) => (
        <motion.div
          key={c.title}
          initial={reduce ? false : { y: 16 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05 }}
          whileHover={reduce ? undefined : { y: -3 }}
          className={cn(
            "rounded-xl border border-border bg-surface p-5 shadow-highlight",
            c.span
          )}
        >
          <div className="mb-3 h-px w-8 bg-accent" aria-hidden />
          <h3 className="text-sm font-medium text-fg">{c.title}</h3>
          <p className="mt-1.5 text-xs leading-[1.55] text-fg-muted">{c.body}</p>
        </motion.div>
      ))}
    </div>
  )
}
export { FeatureBentoMotion }
