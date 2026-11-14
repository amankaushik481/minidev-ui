"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { SegmentedControl } from "@/registry/ui/segmented-control"

/**
 * PricingToggle — a Monthly / Yearly segmented switch with a savings note underneath.
 *
 * Use it above a PricingTable to flip prices between billing periods. For any other two or
 * three way choice use SegmentedControl directly.
 *
 * @example
 * const [cadence, setCadence] = React.useState<BillingCadence>("monthly")
 * <PricingToggle value={cadence} onChange={setCadence} note="Two months free on yearly" />
 */

type BillingCadence = "monthly" | "yearly"

function PricingToggle({
  value,
  defaultValue = "monthly",
  onChange,
  note = "Save 20% with yearly",
  className,
}: {
  /** Controlled billing period. Leave unset to let the toggle keep its own state. */
  value?: BillingCadence
  /** Starting period when uncontrolled. */
  defaultValue?: BillingCadence
  /** Fires with the newly picked period. */
  onChange?: (value: BillingCadence) => void
  /** Line under the switch. Pass an empty string or null to hide it. Use your real discount. */
  note?: React.ReactNode
  className?: string
}) {
  const [inner, setInner] = React.useState<BillingCadence>(defaultValue)
  const current = value ?? inner
  return (
    <div data-slot="pricing-toggle" className={cn("inline-flex flex-col items-center gap-2", className)}>
      <SegmentedControl
        aria-label="Billing period"
        value={current}
        onChange={(v) => {
          if (value === undefined) setInner(v as BillingCadence)
          onChange?.(v as BillingCadence)
        }}
        options={[
          { value: "monthly", label: "Monthly" },
          { value: "yearly", label: "Yearly" },
        ]}
      />
      {note ? <p className="text-xs text-fg-muted">{note}</p> : null}
    </div>
  )
}
export { PricingToggle }
export type { BillingCadence }
