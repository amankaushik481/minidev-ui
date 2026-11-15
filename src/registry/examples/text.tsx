"use client"
import { Text } from "@/registry/ui/text"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Body, muted and subtle",
    description: "Three levels of emphasis for a status message, its detail and its meta line.",
    code: `<div className="max-w-sm space-y-1">
  <Text>Invoice INV-2041 was paid in full.</Text>
  <Text muted>Northwind Traders paid by card on Oct 9.</Text>
  <Text subtle>Updated 2 minutes ago</Text>
</div>`,
    node: (
      <div className="max-w-sm space-y-1">
        <Text>Invoice INV-2041 was paid in full.</Text>
        <Text muted>Northwind Traders paid by card on Oct 9.</Text>
        <Text subtle>Updated 2 minutes ago</Text>
      </div>
    ),
  },
  {
    title: "Mono for ids and amounts",
    description: "mono switches to Geist Mono at 13px, so ids and figures are easy to compare.",
    code: `<div className="grid max-w-sm grid-cols-[auto_1fr] gap-x-6 gap-y-1">
  <Text muted>Invoice</Text>
  <Text mono>LUM-2026-0147</Text>
  <Text muted>Customer</Text>
  <Text mono>cus_n0rthw1nd</Text>
  <Text muted>Total</Text>
  <Text mono className="tabular-nums">$1,840.00</Text>
</div>`,
    node: (
      <div className="grid max-w-sm grid-cols-[auto_1fr] gap-x-6 gap-y-1">
        <Text muted>Invoice</Text>
        <Text mono>LUM-2026-0147</Text>
        <Text muted>Customer</Text>
        <Text mono>cus_n0rthw1nd</Text>
        <Text muted>Total</Text>
        <Text mono className="tabular-nums">$1,840.00</Text>
      </div>
    ),
  },
]
