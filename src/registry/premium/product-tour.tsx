"use client"
import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"

/** ProductTour — a step list beside a stage that fades to the selected step, with Back and Next. */

type TourStep = { title: string; body: string }

// Onboarding steps for a new Lumen workspace.
const SAMPLE_STEPS: TourStep[] = [
  { title: "Connect your bank", body: "Link Northwind's accounts once. Transactions sync every hour and match to invoices automatically." },
  { title: "Send your first invoice", body: "Pick a customer, add line items and Lumen handles the numbering, tax and reminders." },
  { title: "Invite the team", body: "Add Maya, Theo and Priya with roles, so approvals and payouts never wait on one person." },
  { title: "Close the month", body: "Reconcile in one pass, export to your ledger and lock the period." },
]

type ProductTourProps = {
  steps?: TourStep[]
  className?: string
}

function ProductTour({
  steps = SAMPLE_STEPS,
  className,
}: ProductTourProps) {
  const reduce = useReducedMotion()
  const [active, setActive] = React.useState(0)
  return (
    <div data-slot="product-tour" data-tier="premium" className={cn("grid gap-6 rounded-2xl border border-border bg-surface p-6 lg:grid-cols-2", className)}>
      <div className="space-y-2">
        {steps.map((s, i) => (
          <button
            key={s.title}
            type="button"
            aria-current={i === active ? "step" : undefined}
            onClick={() => setActive(i)}
            className={cn(
              "w-full rounded-xl border px-4 py-3 text-left outline-none focus-visible:ring-2 focus-visible:ring-accent",
              i === active ? "border-accent/40 bg-accent/5" : "border-border hover:border-fg-subtle"
            )}
          >
            <p className="text-sm font-medium text-fg">{s.title}</p>
            <p className="mt-1 text-xs text-fg-muted">{s.body}</p>
          </button>
        ))}
      </div>
      <motion.div
        key={active}
        initial={reduce ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex min-h-64 flex-col justify-between rounded-xl border border-border bg-sunken p-6"
      >
        <div>
          <p className="text-xs text-fg-muted">Step {active + 1}/{steps.length}</p>
          <h3 className="mt-2 text-xl font-medium tracking-[-0.014em] text-fg">{steps[active]?.title}</h3>
          <p className="mt-2 text-sm text-fg-muted">{steps[active]?.body}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled={active === 0} onClick={() => setActive((a) => Math.max(0, a - 1))}>Back</Button>
          <Button size="sm" disabled={active === steps.length - 1} onClick={() => setActive((a) => Math.min(steps.length - 1, a + 1))}>Next</Button>
        </div>
      </motion.div>
    </div>
  )
}
export { ProductTour }
export type { ProductTourProps, TourStep }
