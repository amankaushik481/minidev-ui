"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { PricingToggle } from "@/registry/ui/pricing-toggle"
import { NumberRoll } from "@/registry/ui/number-roll"

/**
 * A price card with a Monthly / Yearly toggle whose price digits roll to the new amount instead of swapping.
 * Only the digits that change move, on the roll spring, so $49 to $39 turns
 * one column. The new price and billing note are announced politely to
 * screen readers; reduced motion swaps instantly.
 *
 * Use it for one plan, or above a comparison table. Reach for PricingMotion
 * for a row of plan cards, and the free PricingTable or PlanCard inside
 * product billing screens.
 *
 * @example
 * <MorphPrice monthly={49} yearly={39} unit="/ seat" defaultCadence="yearly" />
 */
type Cadence = "monthly" | "yearly"

type MorphPriceProps = {
  /** Price per unit when billed monthly. */
  monthly?: number
  /** Price per unit when billed yearly (the per-month equivalent). */
  yearly?: number
  /** ISO 4217 currency code. */
  currency?: string
  /** Text after the price. */
  unit?: string
  /** Billing cadence shown first. */
  defaultCadence?: Cadence
  /** Line under the switch. Defaults to PricingToggle's "Save 20% with yearly"; pass your own when the saving differs. */
  note?: React.ReactNode
  /** Called when the visitor switches cadence. */
  onCadenceChange?: (cadence: Cadence) => void
  className?: string
}

function MorphPrice({
  monthly = 49,
  yearly = 39,
  currency = "USD",
  unit = "/ seat",
  defaultCadence = "yearly",
  note,
  onCadenceChange,
  className,
}: MorphPriceProps) {
  const [cadence, setCadence] = React.useState<Cadence>(defaultCadence)
  const price = cadence === "yearly" ? yearly : monthly
  const saving = monthly > 0 ? Math.round((1 - yearly / monthly) * 100) : 0
  return (
    <div data-slot="morph-price" data-tier="premium" className={cn("flex flex-col items-center gap-6 rounded-2xl border border-border bg-surface p-8", className)}>
      <PricingToggle
        value={cadence}
        note={note}
        onChange={(v) => {
          setCadence(v)
          onCadenceChange?.(v)
        }}
      />
      <div aria-live="polite" className="flex flex-col items-center gap-2">
        <p className="flex items-end gap-1">
          <NumberRoll
            value={price}
            format={{ style: "currency", currency, maximumFractionDigits: price % 1 ? 2 : 0 }}
            className="text-6xl font-medium tracking-[-0.034em] text-fg"
          />
          <span className="pb-2 text-sm text-fg-muted">{unit}</span>
        </p>
        <p className="text-sm text-fg-muted">
          {cadence === "yearly" ? `Billed yearly${saving > 0 ? ` · save ${saving}%` : ""}` : "Billed monthly"}
        </p>
      </div>
    </div>
  )
}
export { MorphPrice }
export type { MorphPriceProps }
