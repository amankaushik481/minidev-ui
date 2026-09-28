"use client"
import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

function GridReveal({
  items = ["Buttons", "Tables", "AI chat", "Billing", "Admin", "Heroes", "Pricing", "Showcase"],
  className,
}: {
  items?: string[]
  className?: string
}) {
  const reduce = useReducedMotion()
  return (
    <section data-slot="grid-reveal" data-tier="premium" className={cn("grid grid-cols-2 gap-3 sm:grid-cols-4", className)}>
      {items.map((item, i) => (
        <motion.div
          key={item}
          initial={reduce ? false : { y: 16 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: i * 0.04, duration: 0.28, ease: [0.2, 0, 0, 1] }}
          className="rounded-xl border border-border bg-surface px-4 py-6 text-center shadow-highlight"
        >
          <p className="text-sm font-medium text-fg">{item}</p>
          <p className="mt-1 font-mono text-[10px] text-fg-muted">0{i + 1}</p>
        </motion.div>
      ))}
    </section>
  )
}
export { GridReveal }
