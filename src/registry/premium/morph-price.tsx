"use client"
import * as React from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"
import { PricingToggle } from "@/registry/ui/pricing-toggle"

function MorphPrice({ className }: { className?: string }) {
  const reduce = useReducedMotion()
  const [cadence, setCadence] = React.useState<"monthly" | "yearly">("yearly")
  const price = cadence === "yearly" ? "39" : "49"
  return (
    <div data-slot="morph-price" data-tier="premium" className={cn("flex flex-col items-center gap-6 rounded-2xl border border-border bg-surface p-8", className)}>
      <PricingToggle value={cadence} onChange={setCadence} />
      <div className="flex items-end gap-1">
        <span className="text-2xl font-medium text-fg">$</span>
        <AnimatePresence mode="wait">
          <motion.span
            key={price}
            initial={reduce ? false : { y: 16 }}
            animate={{ y: 0 }}
            exit={reduce ? undefined : { y: -16 }}
            transition={{ type: "spring", stiffness: 280, damping: 24 }}
            className="text-6xl font-medium tracking-[-0.034em] tabular-nums text-fg"
          >
            {price}
          </motion.span>
        </AnimatePresence>
        <span className="pb-2 text-sm text-fg-muted">/ seat</span>
      </div>
      <p className="text-sm text-fg-muted">{cadence === "yearly" ? "Billed yearly · save 20%" : "Billed monthly"}</p>
    </div>
  )
}
export { MorphPrice }
