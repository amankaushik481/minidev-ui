"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"

/** PlanCard — a pricing tier with price per period, feature list and a call to action; highlighted tiers get the accent ring. */

// The Lumen Pro tier.
const SAMPLE_FEATURES = ["Unlimited invoices", "Up to 10 seats", "Bank sync and reconciliation", "Priority support"]

type PlanCardProps = {
  name?: string
  price?: string
  period?: string
  features?: string[]
  cta?: string
  highlighted?: boolean
  className?: string
  onCta?: () => void
}

function PlanCard({ name = "Pro", price = "$49", period = "mo", features = SAMPLE_FEATURES, cta = "Choose plan", highlighted, className, onCta }: PlanCardProps) {
  return (
    <div data-slot="plan-card" className={cn("flex flex-col rounded-xl border border-border bg-surface p-5 shadow-highlight", highlighted && "border-accent shadow-[inset_0_0_0_1px_var(--accent)]", className)}>
      <h3 className="text-sm font-medium text-fg">{name}</h3>
      <p className="mt-3 text-3xl font-medium tracking-[-0.022em] tabular-nums text-fg">{price}<span className="text-sm text-fg-muted">/{period}</span></p>
      <ul className="mt-4 flex-1 space-y-2 text-sm text-fg-muted">{features.map(f=><li key={f}>• {f}</li>)}</ul>
      <Button className="mt-6 w-full" variant={highlighted?"default":"outline"} onClick={onCta}>{cta}</Button>
    </div>
  )
}
export { PlanCard }
export type { PlanCardProps }
