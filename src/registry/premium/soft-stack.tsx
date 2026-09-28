"use client"
import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

function SoftStack({ className }: { className?: string }) {
  const reduce = useReducedMotion()
  const cards = ["Inbox", "Board", "Billing"]
  return (
    <div data-slot="soft-stack" data-tier="premium" className={cn("relative mx-auto h-64 w-full max-w-sm", className)}>
      {cards.map((c, i) => (
        <motion.div
          key={c}
          initial={reduce ? false : { y: 40 + i * 8, scale: 0.94 }}
          whileInView={{ y: i * 18, scale: 1 - i * 0.03 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08, type: "spring", stiffness: 140, damping: 18 }}
          style={{ zIndex: cards.length - i }}
          className="absolute inset-x-0 top-0 rounded-2xl border border-border bg-surface p-5 shadow-highlight"
        >
          <p className="text-sm font-medium text-fg">{c}</p>
          <div className="mt-4 space-y-2">
            <div className="h-2 w-2/3 rounded bg-fg/10" />
            <div className="h-2 w-1/2 rounded bg-fg/5" />
          </div>
        </motion.div>
      ))}
    </div>
  )
}
export { SoftStack }
