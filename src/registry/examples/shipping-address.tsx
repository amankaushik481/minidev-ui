"use client"
import * as React from "react"
import { Button } from "@/registry/ui/button"
import { ShippingAddress } from "@/registry/ui/shipping-address"
import type { Example } from "./types"

function AddressForm() {
  const [sent, setSent] = React.useState<string | null>(null)
  return (
    <form
      className="flex w-full max-w-md flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        setSent([data.get("name"), data.get("address"), data.get("city"), data.get("postalCode")].filter(Boolean).join(", "))
      }}
    >
      <ShippingAddress />
      <div className="flex items-center gap-3">
        <Button type="submit">Continue to payment</Button>
        {sent ? <p className="truncate text-xs text-fg-muted">{sent}</p> : null}
      </div>
    </form>
  )
}

export const examples: Example[] = [
  {
    title: "Read it with FormData",
    description: "The inputs submit as name, address, city and postalCode, with shipping autofill tokens.",
    code: `function AddressForm() {
  const [sent, setSent] = React.useState<string | null>(null)
  return (
    <form
      className="flex w-full max-w-md flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        setSent([data.get("name"), data.get("address"), data.get("city"), data.get("postalCode")].filter(Boolean).join(", "))
      }}
    >
      <ShippingAddress />
      <div className="flex items-center gap-3">
        <Button type="submit">Continue to payment</Button>
        {sent ? <p className="truncate text-xs text-fg-muted">{sent}</p> : null}
      </div>
    </form>
  )
}`,
    node: <AddressForm />,
  },
  {
    title: "Delivery address with a visible heading",
    description: "The legend is for screen readers only, so show a heading too and name the legend to match.",
    code: `<div className="flex w-full max-w-md flex-col gap-3">
  <h3 className="text-sm font-medium text-fg">Where should we send the samples?</h3>
  <ShippingAddress legend="Sample delivery address" />
</div>`,
    node: (
      <div className="flex w-full max-w-md flex-col gap-3">
        <h3 className="text-sm font-medium text-fg">Where should we send the samples?</h3>
        <ShippingAddress legend="Sample delivery address" />
      </div>
    ),
  },
]
