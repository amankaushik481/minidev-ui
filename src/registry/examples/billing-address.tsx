"use client"
import * as React from "react"
import { BillingAddress } from "@/registry/ui/billing-address"
import { Button } from "@/registry/ui/button"
import type { Example } from "./types"

function BillingFormDemo() {
  const [city, setCity] = React.useState<string | null>(null)
  return (
    <form
      className="w-full max-w-lg space-y-4"
      onSubmit={(e) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        setCity(String(data.get("city")))
      }}
    >
      <BillingAddress required />
      <div className="flex items-center gap-3">
        <Button type="submit">Save address</Button>
        <p className="text-xs text-fg-muted" aria-live="polite">{city ? "Saved. Invoices will show " + city + "." : null}</p>
      </div>
    </form>
  )
}

export const examples: Example[] = [
  {
    title: "Required fields in a form",
    description: "required marks every field and the browser blocks an empty submit; FormData reads the fields by name.",
    code: `function BillingFormDemo() {
  const [city, setCity] = React.useState<string | null>(null)
  return (
    <form
      className="w-full max-w-lg space-y-4"
      onSubmit={(e) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        setCity(String(data.get("city")))
      }}
    >
      <BillingAddress required />
      <div className="flex items-center gap-3">
        <Button type="submit">Save address</Button>
        <p className="text-xs text-fg-muted" aria-live="polite">{city ? "Saved. Invoices will show " + city + "." : null}</p>
      </div>
    </form>
  )
}`,
    node: <BillingFormDemo />,
  },
  {
    title: "Billing and shipping",
    description: "Two copies with different sections, so autofill puts the right address in each block.",
    code: `<div className="grid w-full max-w-2xl gap-6 md:grid-cols-2">
  <div className="space-y-2">
    <h3 className="text-sm font-medium text-fg">Billing address</h3>
    <BillingAddress section="billing" />
  </div>
  <div className="space-y-2">
    <h3 className="text-sm font-medium text-fg">Ship to</h3>
    <BillingAddress section="shipping" />
  </div>
</div>`,
    node: (
      <div className="grid w-full max-w-2xl gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-fg">Billing address</h3>
          <BillingAddress section="billing" />
        </div>
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-fg">Ship to</h3>
          <BillingAddress section="shipping" />
        </div>
      </div>
    ),
  },
]
