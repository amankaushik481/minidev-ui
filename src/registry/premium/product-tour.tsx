"use client"
import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"

/**
 * ProductTour — a step list beside a stage that fades to the selected step, with Back and Next.
 * The list items are buttons marked `aria-current="step"`; the stage rises in
 * on the morph spring and is announced politely as it changes. Optional
 * `media` per step fills the stage. Reduced motion swaps steps instantly.
 *
 * Use it to walk visitors through four or five features in order. Reach for
 * OnboardingMotion for a compact welcome card, StickyFeatureStory when scroll
 * should drive the steps, and the free OnboardingWizard for real forms.
 *
 * @example
 * <ProductTour steps={[{ title: "Connect your bank", body: "Transactions sync every hour.", media: <img src="/bank.png" alt="" /> }]} />
 */

type TourStep = {
  title: string
  body: string
  /** Optional visual shown on the stage for this step. */
  media?: React.ReactNode
}

// Onboarding steps for a new Lumen workspace.
const SAMPLE_STEPS: TourStep[] = [
  { title: "Connect your bank", body: "Link Northwind's accounts once. Transactions sync every hour and match to invoices automatically." },
  { title: "Send your first invoice", body: "Pick a customer, add line items and Lumen handles the numbering, tax and reminders." },
  { title: "Invite the team", body: "Add Maya, Theo and Priya with roles, so approvals and payouts never wait on one person." },
  { title: "Close the month", body: "Reconcile in one pass, export to your ledger and lock the period." },
]

type ProductTourProps = {
  /** Steps in order. */
  steps?: TourStep[]
  /** Called with the index of the step the visitor moves to. */
  onStepChange?: (index: number) => void
  className?: string
}

const MORPH = { type: "spring", bounce: 0.16, duration: 0.5 } as const

function ProductTour({
  steps = SAMPLE_STEPS,
  onStepChange,
  className,
}: ProductTourProps) {
  const reduce = useReducedMotion()
  const [active, setStep] = React.useState(0)
  const setActive = (next: number) => {
    setStep(next)
    onStepChange?.(next)
  }
  return (
    <div data-slot="product-tour" data-tier="premium" className={cn("grid gap-6 rounded-2xl border border-border bg-surface p-6 lg:grid-cols-2", className)}>
      <div className="space-y-2">
        {steps.map((s, i) => (
          <button
            key={i}
            type="button"
            aria-current={i === active ? "step" : undefined}
            onClick={() => setActive(i)}
            className={cn(
              "w-full rounded-xl border px-4 py-3 text-left outline-none focus-visible:ring-2 focus-visible:ring-accent",
              "transition-colors duration-[70ms]",
              i === active ? "border-accent-line bg-accent-soft" : "border-border hover:border-border-strong"
            )}
          >
            <p className="text-sm font-medium text-fg">{s.title}</p>
            <p className="mt-1 text-xs text-fg-muted">{s.body}</p>
          </button>
        ))}
      </div>
      <p aria-live="polite" className="sr-only">
        Step {active + 1} of {steps.length}: {steps[active]?.title}
      </p>
      <motion.div
        key={active}
        initial={reduce ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={reduce ? { duration: 0 } : MORPH}
        className="flex min-h-64 flex-col justify-between gap-6 rounded-xl border border-border bg-sunken p-6"
      >
        <div>
          <p className="text-xs text-fg-muted tabular-nums">Step {active + 1}/{steps.length}</p>
          <h3 className="mt-2 text-xl font-medium tracking-[-0.014em] text-fg">{steps[active]?.title}</h3>
          <p className="mt-2 text-sm text-fg-muted">{steps[active]?.body}</p>
          {steps[active]?.media ? <div className="mt-4">{steps[active].media}</div> : null}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled={active === 0} onClick={() => setActive(Math.max(0, active - 1))}>Back</Button>
          <Button size="sm" disabled={active === steps.length - 1} onClick={() => setActive(Math.min(steps.length - 1, active + 1))}>Next</Button>
        </div>
      </motion.div>
    </div>
  )
}
export { ProductTour }
export type { ProductTourProps, TourStep }
