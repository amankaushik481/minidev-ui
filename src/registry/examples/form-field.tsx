"use client"
import * as React from "react"
import { FormField } from "@/registry/ui/form-field"
import { Input } from "@/registry/ui/input"
import { Textarea } from "@/registry/ui/textarea"
import { Button } from "@/registry/ui/button"
import type { Example } from "./types"

function ValidationDemo() {
  const [email, setEmail] = React.useState("maya@gmail")
  const [touched, setTouched] = React.useState(false)
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const error = touched && !valid ? "Enter a full email address, like maya@northwind.io." : undefined
  return (
    <form
      className="flex w-full max-w-xs flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault()
        setTouched(true)
      }}
    >
      <FormField id="billing-email" label="Billing email" description="Invoices and receipts go here." error={error} required>
        <Input
          id="billing-email"
          type="email"
          value={email}
          aria-invalid={error ? true : undefined}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setTouched(true)}
        />
      </FormField>
      <Button type="submit" className="self-start">Save</Button>
    </form>
  )
}

export const examples: Example[] = [
  {
    title: "Label and description",
    description: "Give the field and its control the same id so the label focuses the input; the description sits under it in muted text.",
    code: `<FormField id="company" label="Company" description="Shown in the header of every invoice.">
  <Input id="company" defaultValue="Northwind Traders" />
</FormField>`,
    node: (
      <div className="w-full max-w-xs">
        <FormField id="company" label="Company" description="Shown in the header of every invoice.">
          <Input id="company" defaultValue="Northwind Traders" />
        </FormField>
      </div>
    ),
  },
  {
    title: "Required with validation",
    description: "required adds the asterisk; when error is set it replaces the description and is announced as an alert, so pair it with aria-invalid on the control.",
    code: `function ValidationDemo() {
  const [email, setEmail] = React.useState("maya@gmail")
  const [touched, setTouched] = React.useState(false)
  const valid = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)
  const error = touched && !valid ? "Enter a full email address, like maya@northwind.io." : undefined
  return (
    <form
      className="flex w-full max-w-xs flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault()
        setTouched(true)
      }}
    >
      <FormField id="billing-email" label="Billing email" description="Invoices and receipts go here." error={error} required>
        <Input
          id="billing-email"
          type="email"
          value={email}
          aria-invalid={error ? true : undefined}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setTouched(true)}
        />
      </FormField>
      <Button type="submit" className="self-start">Save</Button>
    </form>
  )
}`,
    node: <ValidationDemo />,
  },
  {
    title: "Any control inside",
    description: "FormField only lays out the label, the control and the message, so a Textarea or any other input works the same way.",
    code: `<FormField id="invoice-note" label="Note to customer" description="Printed under the line items on INV-2041.">
  <Textarea id="invoice-note" defaultValue="Thanks for your business. Payment is due within 30 days." />
</FormField>`,
    node: (
      <div className="w-full max-w-sm">
        <FormField id="invoice-note" label="Note to customer" description="Printed under the line items on INV-2041.">
          <Textarea id="invoice-note" defaultValue="Thanks for your business. Payment is due within 30 days." />
        </FormField>
      </div>
    ),
  },
]
