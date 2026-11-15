"use client"
import * as React from "react"
import { CurrencyInput } from "@/registry/ui/currency-input"
import { FormField } from "@/registry/ui/form-field"
import type { Example } from "./types"

function InvoiceAmount() {
  const [amount, setAmount] = React.useState("1,250.00")
  const cents = Math.round(Number(amount.replace(/,/g, "")) * 100)
  return (
    <div className="flex flex-col gap-2">
      <FormField id="invoice-amount" label="Invoice amount">
        <CurrencyInput id="invoice-amount" currency="EUR" value={amount} onChange={setAmount} />
      </FormField>
      <p className="text-xs text-fg-muted tabular-nums">{Number.isFinite(cents) ? "Stored as " + cents + " cents" : "Not a valid amount"}</p>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Parse to minor units",
    description: "The value is the typed string; strip commas, parse it and store cents.",
    code: `function InvoiceAmount() {
  const [amount, setAmount] = React.useState("1,250.00")
  const cents = Math.round(Number(amount.replace(/,/g, "")) * 100)
  return (
    <div className="flex flex-col gap-2">
      <FormField id="invoice-amount" label="Invoice amount">
        <CurrencyInput id="invoice-amount" currency="EUR" value={amount} onChange={setAmount} />
      </FormField>
      <p className="text-xs text-fg-muted tabular-nums">{Number.isFinite(cents) ? "Stored as " + cents + " cents" : "Not a valid amount"}</p>
    </div>
  )
}`,
    node: <InvoiceAmount />,
  },
  {
    title: "With an error",
    description: "FormField marks the input invalid and links the message to it.",
    code: `<FormField id="payout" label="Payout amount" error="Payouts start at 10.00 GBP.">
  <CurrencyInput id="payout" currency="GBP" name="payout" defaultValue="4.50" />
</FormField>`,
    node: (
      <FormField id="payout" label="Payout amount" error="Payouts start at 10.00 GBP.">
        <CurrencyInput id="payout" currency="GBP" name="payout" defaultValue="4.50" />
      </FormField>
    ),
  },
]
