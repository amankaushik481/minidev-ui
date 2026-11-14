"use client"
import * as React from "react"
import { FormField } from "@/registry/ui/form-field"
import { Input } from "@/registry/ui/input"
import { Textarea } from "@/registry/ui/textarea"
import { cn } from "@/lib/utils"
/**
 * Billing address fields (street, city, state, postal code) with browser autofill hints, for checkout and billing settings.
 *
 * Drop it inside your own `<form>`; it renders fields only, no submit button. Field names are
 * `address`, `city`, `state` and `postal-code`, so `new FormData(form)` reads them directly. Ids
 * are generated, so it can appear twice on a page (billing and shipping) with different `section`s.
 *
 * @example
 * <form onSubmit={save}>
 *   <BillingAddress section="billing" />
 *   <Button type="submit">Save</Button>
 * </form>
 */
type BillingAddressProps = {
  /** Autofill section, e.g. "billing" or "shipping". Becomes the autocomplete token prefix. */
  section?: "billing" | "shipping"
  /** Marks every field required. */
  required?: boolean
  className?: string
}

function BillingAddress({ section = "billing", required, className }: BillingAddressProps) {
  const id = React.useId()
  return (
    <fieldset data-slot="billing-address" className={cn("min-w-0 space-y-3", className)}>
      <legend className="sr-only">{section === "shipping" ? "Shipping address" : "Billing address"}</legend>
      <FormField id={`${id}-line`} label="Address" required={required}>
        <Textarea id={`${id}-line`} name="address" placeholder="Street, building" autoComplete={`${section} street-address`} required={required} />
      </FormField>
      <div className="grid gap-3 sm:grid-cols-3">
        <FormField id={`${id}-city`} label="City" required={required}>
          <Input id={`${id}-city`} name="city" autoComplete={`${section} address-level2`} required={required} />
        </FormField>
        <FormField id={`${id}-state`} label="State" required={required}>
          <Input id={`${id}-state`} name="state" autoComplete={`${section} address-level1`} required={required} />
        </FormField>
        <FormField id={`${id}-zip`} label="Postal code" required={required}>
          <Input id={`${id}-zip`} name="postal-code" autoComplete={`${section} postal-code`} required={required} />
        </FormField>
      </div>
    </fieldset>
  )
}
export { BillingAddress }
export type { BillingAddressProps }
