"use client"
import { Receipt } from "@/registry/ui/receipt"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Order confirmation",
    description: "Format every amount before passing it; total is shown as given.",
    code: `<div className="flex w-full max-w-xs flex-col gap-3">
  <p className="text-sm text-fg">Payment received. A copy is on its way to maya@halcyon.studio.</p>
  <Receipt
    id="RCP-5521"
    lines={[
      { label: "Field notebook × 2", amount: "$36.00" },
      { label: "Brass pen", amount: "$24.00" },
      { label: "Shipping", amount: "$6.50" },
      { label: "Tax (7%)", amount: "$4.66" },
    ]}
    total="$71.16"
  />
</div>`,
    node: (
      <div className="flex w-full max-w-xs flex-col gap-3">
        <p className="text-sm text-fg">Payment received. A copy is on its way to maya@halcyon.studio.</p>
        <Receipt
          id="RCP-5521"
          lines={[
            { label: "Field notebook × 2", amount: "$36.00" },
            { label: "Brass pen", amount: "$24.00" },
            { label: "Shipping", amount: "$6.50" },
            { label: "Tax (7%)", amount: "$4.66" },
          ]}
          total="$71.16"
        />
      </div>
    ),
  },
  {
    title: "Partial refund",
    description: "Refunds and credits are lines with negative amounts; the total is what actually moved.",
    code: `<Receipt
  id="RFD-0193"
  lines={[
    { label: "Pro plan, Nov 2026", amount: "$49.00" },
    { label: "Unused days refunded", amount: "-$32.67" },
  ]}
  total="$16.33"
/>`,
    node: (
      <Receipt
        id="RFD-0193"
        lines={[
          { label: "Pro plan, Nov 2026", amount: "$49.00" },
          { label: "Unused days refunded", amount: "-$32.67" },
        ]}
        total="$16.33"
      />
    ),
  },
]
