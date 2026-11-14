"use client"
import * as React from "react"
import { FormField } from "@/registry/ui/form-field"
import { Input } from "@/registry/ui/input"
import { Button } from "@/registry/ui/button"
import { cn } from "@/lib/utils"

/**
 * A payment card form: card number, expiry and CVC with the right autofill hints, and a save button.
 *
 * Use in billing settings or checkout when you collect card details yourself. If you use a hosted
 * payment element (Stripe Elements and similar), render that instead and keep only the layout.
 * Field ids are generated, so several forms can share a page.
 *
 * @example
 * <AddCardForm onSubmit={(data) => saveCard(Object.fromEntries(data))} />
 *
 * Fields are submitted as `cc-number`, `cc-exp` and `cc-csc` in the FormData.
 */
type AddCardFormProps = {
  /** Called on submit with the form's FormData. The page does not reload. */
  onSubmit?: (data: FormData) => void
  /** Text on the submit button. */
  submitLabel?: React.ReactNode
  className?: string
}

function AddCardForm({ className, onSubmit, submitLabel = "Save card" }: AddCardFormProps) {
  const id = React.useId()
  return (
    <form
      data-slot="add-card-form"
      className={cn("space-y-3", className)}
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit?.(new FormData(e.currentTarget))
      }}
    >
      <FormField id={`${id}-number`} label="Card number">
        <Input id={`${id}-number`} name="cc-number" inputMode="numeric" placeholder="4242 4242 4242 4242" autoComplete="cc-number" required />
      </FormField>
      <div className="grid grid-cols-2 gap-3">
        <FormField id={`${id}-exp`} label="Expiry">
          <Input id={`${id}-exp`} name="cc-exp" inputMode="numeric" placeholder="MM/YY" autoComplete="cc-exp" required />
        </FormField>
        <FormField id={`${id}-cvc`} label="CVC">
          <Input id={`${id}-cvc`} name="cc-csc" inputMode="numeric" placeholder="123" autoComplete="cc-csc" maxLength={4} required />
        </FormField>
      </div>
      <Button type="submit" className="w-full">
        {submitLabel}
      </Button>
    </form>
  )
}
export { AddCardForm }
export type { AddCardFormProps }
