"use client"
import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { CheckIcon } from "lucide-react"

const FREE = ["MIT product primitives", "Forms · tables · AI chat", "Billing & admin surfaces", "Gallery + docs + playground", "DESIGN.md as law"]
const PREM = ["Kinetic heroes & sticky stories", "Launch / investor / pricing kits", "Magnetic CTAs & wipe compares", "Client pitch showcase", "Same tokens — zero theme drift"]

function FreePremiumCompare({ className }: { className?: string }) {
  const reduce = useReducedMotion()
  return (
    <section
      data-slot="free-premium-compare"
      data-tier="premium"
      className={cn("grid gap-4 lg:grid-cols-2", className)}
    >
      {[
        { tier: "Free", price: "$0", blurb: "Forever MIT for product teams.", items: FREE, cta: "Browse free UI", href: "/gallery", featured: false },
        { tier: "Premium", price: "Soft-gate", blurb: "The moments that win clients.", items: PREM, cta: "See Premium motion", href: "/gallery/premium-motion", featured: true },
      ].map((col, i) => (
        <motion.div
          key={col.tier}
          initial={reduce ? false : { y: 16 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08, duration: 0.3 }}
          className={cn(
            "rounded-2xl border bg-surface p-6 shadow-[inset_0_1px_0_oklch(1_0_0/0.55)] sm:p-8",
            col.featured ? "border-accent shadow-[inset_0_0_0_1px_var(--accent)]" : "border-border"
          )}
        >
          <p className="text-xs font-medium uppercase tracking-[0.01em] text-fg-muted">{col.tier}</p>
          <p className="mt-2 text-3xl font-medium tracking-[-0.022em] text-fg">{col.price}</p>
          <p className="mt-2 text-sm text-fg-muted">{col.blurb}</p>
          <ul className="mt-6 space-y-2.5">
            {col.items.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-fg">
                <CheckIcon className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
          <Button className="mt-8 w-full" variant={col.featured ? "default" : "outline"} render={<a href={col.href} />}>
            {col.cta}
          </Button>
        </motion.div>
      ))}
    </section>
  )
}
export { FreePremiumCompare }
