"use client"
import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"

type Plan = { name: string; price: string; blurb: string; featured?: boolean; features: string[] }

function PricingMotion({ plans, className }: { plans: Plan[]; className?: string }) {
  const reduce = useReducedMotion()
  return (
    <div data-slot="pricing-motion" data-tier="premium" className={cn("grid gap-4 md:grid-cols-3", className)}>
      {plans.map((p, i) => (
        <motion.div
          key={p.name}
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08 }}
          className={cn(
            "flex flex-col rounded-xl border bg-surface p-6",
            p.featured ? "border-accent shadow-lg" : "border-border"
          )}
        >
          <h3 className="text-sm font-medium text-fg">{p.name}</h3>
          <p className="mt-2 text-3xl font-medium tracking-[-0.022em] tabular-nums text-fg">{p.price}</p>
          <p className="mt-1 text-xs text-fg-muted">{p.blurb}</p>
          <ul className="mt-4 flex-1 space-y-2 text-sm text-fg-muted">
            {p.features.map((f) => (
              <li key={f}>• {f}</li>
            ))}
          </ul>
          <Button className="mt-6 w-full" variant={p.featured ? "default" : "outline"}>
            Choose {p.name}
          </Button>
        </motion.div>
      ))}
    </div>
  )
}
export { PricingMotion }
