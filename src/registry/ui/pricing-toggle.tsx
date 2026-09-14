"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { SegmentedControl } from "@/registry/ui/segmented-control"

function PricingToggle({
  value = "monthly",
  onChange,
  className,
}: {
  value?: "monthly" | "yearly"
  onChange?: (v: "monthly" | "yearly") => void
  className?: string
}) {
  return (
    <div data-slot="pricing-toggle" className={cn("inline-flex flex-col items-center gap-2", className)}>
      <SegmentedControl
        value={value}
        onChange={(v) => onChange?.(v as "monthly" | "yearly")}
        options={[
          { value: "monthly", label: "Monthly" },
          { value: "yearly", label: "Yearly" },
        ]}
      />
      <p className="text-xs text-fg-muted">Save 20% with yearly</p>
    </div>
  )
}
export { PricingToggle }
