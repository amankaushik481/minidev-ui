"use client"
import * as React from "react"
import { OrderSummary } from "@/registry/ui/order-summary"
import type { Example } from "./types"

const eur = new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR" })

function SeatOrder() {
  const seats = 8
  const subtotal = seats * 1500
  const vat = Math.round(subtotal * 0.23)
  return (
    <OrderSummary
      lines={[
        { label: seats + " seats × €15.00", value: eur.format(subtotal / 100) },
        { label: "VAT (23%)", value: eur.format(vat / 100) },
      ]}
      total={eur.format((subtotal + vat) / 100)}
      totalLabel="Due today"
    />
  )
}

export const examples: Example[] = [
  {
    title: "Computed from cents",
    description: "Add up in minor units, then format every value with Intl.NumberFormat before passing it in.",
    code: `const eur = new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR" })

function SeatOrder() {
  const seats = 8
  const subtotal = seats * 1500
  const vat = Math.round(subtotal * 0.23)
  return (
    <OrderSummary
      lines={[
        { label: seats + " seats × €15.00", value: eur.format(subtotal / 100) },
        { label: "VAT (23%)", value: eur.format(vat / 100) },
      ]}
      total={eur.format((subtotal + vat) / 100)}
      totalLabel="Due today"
    />
  )
}`,
    node: <SeatOrder />,
  },
  {
    title: "Discount and free shipping",
    description: "Values are plain strings, so a discount uses a real minus sign and shipping can read Free.",
    code: `<OrderSummary
  lines={[
    { label: "Subtotal", value: "$214.00" },
    { label: "Discount (WELCOME15)", value: "−$32.10" },
    { label: "Shipping", value: "Free" },
  ]}
  total="$181.90"
/>`,
    node: (
      <OrderSummary
        lines={[
          { label: "Subtotal", value: "$214.00" },
          { label: "Discount (WELCOME15)", value: "−$32.10" },
          { label: "Shipping", value: "Free" },
        ]}
        total="$181.90"
      />
    ),
  },
]
