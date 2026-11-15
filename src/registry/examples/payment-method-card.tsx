"use client"
import * as React from "react"
import { PaymentMethodCard } from "@/registry/ui/payment-method-card"
import { StatusBadge } from "@/registry/ui/status-badge"
import type { Example } from "./types"

function CardsDemo() {
  const [editing, setEditing] = React.useState<string | null>(null)
  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-fg">Payment methods</h3>
        <StatusBadge tone="accent">Default: Visa</StatusBadge>
      </div>
      <PaymentMethodCard brand="Visa" last4="4242" exp="09/28" onEdit={() => setEditing("Visa 4242")} />
      <PaymentMethodCard brand="Mastercard" last4="5100" exp="03/27" onEdit={() => setEditing("Mastercard 5100")} />
      <p className="text-xs text-fg-muted" aria-live="polite">{editing ? "Opening the billing portal for " + editing + "." : null}</p>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Cards on file",
    description: "Each Edit button is named after its card, so a list of cards stays clear to screen readers; onEdit says which one.",
    code: `function CardsDemo() {
  const [editing, setEditing] = React.useState<string | null>(null)
  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-fg">Payment methods</h3>
        <StatusBadge tone="accent">Default: Visa</StatusBadge>
      </div>
      <PaymentMethodCard brand="Visa" last4="4242" exp="09/28" onEdit={() => setEditing("Visa 4242")} />
      <PaymentMethodCard brand="Mastercard" last4="5100" exp="03/27" onEdit={() => setEditing("Mastercard 5100")} />
      <p className="text-xs text-fg-muted" aria-live="polite">{editing ? "Opening the billing portal for " + editing + "." : null}</p>
    </div>
  )
}`,
    node: <CardsDemo />,
  },
  {
    title: "Expiring soon",
    description: "There is no expired state, so compare the date yourself and add a warning beside the card.",
    code: `<div className="flex w-full max-w-sm flex-col gap-2">
  <PaymentMethodCard brand="Amex" last4="0005" exp="11/26" />
  <StatusBadge tone="warning" className="self-start">Expires this month</StatusBadge>
</div>`,
    node: (
      <div className="flex w-full max-w-sm flex-col gap-2">
        <PaymentMethodCard brand="Amex" last4="0005" exp="11/26" />
        <StatusBadge tone="warning" className="self-start">Expires this month</StatusBadge>
      </div>
    ),
  },
]
