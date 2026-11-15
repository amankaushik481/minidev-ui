"use client"
import * as React from "react"
import { TaxFields } from "@/registry/ui/tax-fields"
import { BillingAddress } from "@/registry/ui/billing-address"
import { Button } from "@/registry/ui/button"
import type { Example } from "./types"

function BillingDetailsDemo() {
  const [saved, setSaved] = React.useState<string | null>(null)
  return (
    <form
      className="w-full max-w-lg space-y-4"
      onSubmit={(e) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        setSaved(data.get("country") + ", tax ID " + (data.get("taxId") || "none"))
      }}
    >
      <TaxFields />
      <BillingAddress />
      <div className="flex items-center gap-3">
        <Button type="submit">Save billing details</Button>
        <p className="text-xs text-fg-muted" aria-live="polite">{saved}</p>
      </div>
    </form>
  )
}

export const examples: Example[] = [
  {
    title: "Full billing details",
    description: "With BillingAddress in one form; the fields submit as country and taxId with no state to wire up.",
    code: `function BillingDetailsDemo() {
  const [saved, setSaved] = React.useState<string | null>(null)
  return (
    <form
      className="w-full max-w-lg space-y-4"
      onSubmit={(e) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        setSaved(data.get("country") + ", tax ID " + (data.get("taxId") || "none"))
      }}
    >
      <TaxFields />
      <BillingAddress />
      <div className="flex items-center gap-3">
        <Button type="submit">Save billing details</Button>
        <p className="text-xs text-fg-muted" aria-live="polite">{saved}</p>
      </div>
    </form>
  )
}`,
    node: <BillingDetailsDemo />,
  },
  {
    title: "Prefilled company details",
    description: "defaultCountry and defaultTaxId set the starting values; namePrefix keeps the names apart from a second set on the page.",
    code: `<TaxFields className="w-full max-w-lg" namePrefix="company_" defaultCountry="Netherlands" defaultTaxId="NL123456789B01" />`,
    node: <TaxFields className="w-full max-w-lg" namePrefix="company_" defaultCountry="Netherlands" defaultTaxId="NL123456789B01" />,
  },
]
