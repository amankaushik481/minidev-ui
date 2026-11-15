"use client"
import { InvoiceDetail } from "@/registry/ui/invoice-detail"
import { Button } from "@/registry/ui/button"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Paid, with a discount and tax",
    description: "Discounts and tax are ordinary lines; amount is the total you computed, not a sum of the lines.",
    code: `<InvoiceDetail
  id="INV-3107"
  status="paid"
  date="Issued Oct 1, 2026 · Paid Oct 3, 2026"
  amount="$1,213.92"
  lines={[
    { label: "Pro plan, 14 seats × $89", amount: "$1,246.00" },
    { label: "Annual commitment discount (10%)", amount: "-$124.60" },
    { label: "Sales tax (8.25%)", amount: "$92.52" },
  ]}
/>`,
    node: (
      <InvoiceDetail
        id="INV-3107"
        status="paid"
        date="Issued Oct 1, 2026 · Paid Oct 3, 2026"
        amount="$1,213.92"
        lines={[
          { label: "Pro plan, 14 seats × $89", amount: "$1,246.00" },
          { label: "Annual commitment discount (10%)", amount: "-$124.60" },
          { label: "Sales tax (8.25%)", amount: "$92.52" },
        ]}
      />
    ),
  },
  {
    title: "Open, with a pay action",
    description: "There is no actions slot, so put the buttons under the card.",
    code: `<div className="flex w-full max-w-md flex-col gap-3">
  <InvoiceDetail
    id="INV-3122"
    date="Issued Nov 1, 2026 · Due Nov 15, 2026"
    amount="€640.00"
    lines={[{ label: "Starter plan, 8 seats × €80", amount: "€640.00" }]}
  />
  <div className="flex justify-end gap-2">
    <Button variant="outline" size="sm">Download PDF</Button>
    <Button size="sm">Pay €640.00</Button>
  </div>
</div>`,
    node: (
      <div className="flex w-full max-w-md flex-col gap-3">
        <InvoiceDetail
          id="INV-3122"
          date="Issued Nov 1, 2026 · Due Nov 15, 2026"
          amount="€640.00"
          lines={[{ label: "Starter plan, 8 seats × €80", amount: "€640.00" }]}
        />
        <div className="flex justify-end gap-2">
          <Button variant="outline" size="sm">Download PDF</Button>
          <Button size="sm">Pay €640.00</Button>
        </div>
      </div>
    ),
  },
]
