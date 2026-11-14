"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Input } from "@/registry/ui/input"
import { FormField } from "@/registry/ui/form-field"

/**
 * A shipping address fieldset: full name, street address, city and postal code, with labels wired to inputs and browser autofill tokens.
 *
 * Drop it inside a checkout `<form>`; inputs carry `name` attributes so FormData picks them up.
 * Use BillingAddress for the payment address.
 *
 * @example
 * <form action={save}><ShippingAddress /><Button type="submit">Continue</Button></form>
 */
type ShippingAddressProps = {
  /** Legend read before the fields by screen readers. */
  legend?: string
  className?: string
}

function ShippingAddress({ legend = "Shipping address", className }: ShippingAddressProps) {
  const id = React.useId()
  return (
    <fieldset data-slot="shipping-address" className={cn("min-w-0 space-y-3", className)}>
      <legend className="sr-only">{legend}</legend>
      <FormField id={`${id}-name`} label="Full name">
        <Input id={`${id}-name`} name="name" autoComplete="shipping name" />
      </FormField>
      <FormField id={`${id}-address`} label="Address">
        <Input id={`${id}-address`} name="address" autoComplete="shipping street-address" />
      </FormField>
      <div className="grid gap-3 sm:grid-cols-2">
        <FormField id={`${id}-city`} label="City">
          <Input id={`${id}-city`} name="city" autoComplete="shipping address-level2" />
        </FormField>
        <FormField id={`${id}-postal`} label="Postal code">
          <Input id={`${id}-postal`} name="postalCode" autoComplete="shipping postal-code" />
        </FormField>
      </div>
    </fieldset>
  )
}
export { ShippingAddress }
export type { ShippingAddressProps }
