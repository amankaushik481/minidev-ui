"use client"
import * as React from "react"
import { Autocomplete } from "@/registry/ui/autocomplete"
import { FormField } from "@/registry/ui/form-field"
import type { Example } from "./types"

const TEAM = ["Maya Chen", "Theo Okafor", "Priya Raman", "Sam Lowe", "Noor Haddad", "Elena Petrova"]

const CITIES = ["Amsterdam", "Austin", "Bangalore", "Berlin", "Lisbon", "London", "Melbourne", "New York", "Singapore", "Toronto"]

function ControlledDemo() {
  const [customer, setCustomer] = React.useState("")
  return (
    <div className="flex flex-col gap-3">
      <Autocomplete value={customer} onChange={setCustomer} placeholder="Bill to" aria-label="Customer" />
      <p className="text-xs text-fg-muted">
        {customer ? <>INV-2041 will be billed to <span className="font-medium text-fg">{customer}</span></> : "Pick a customer to continue"}
      </p>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Custom options",
    description: "Pass plain strings; matching is case insensitive and the list shows the first eight hits.",
    code: `const TEAM = ["Maya Chen", "Theo Okafor", "Priya Raman", "Sam Lowe", "Noor Haddad", "Elena Petrova"]

<Autocomplete options={TEAM} placeholder="Assign to" />`,
    node: (
      <div className="pb-48">
        <Autocomplete options={TEAM} placeholder="Assign to" />
      </div>
    ),
  },
  {
    title: "Controlled value",
    description: "Hold the text in state; onChange fires on every keystroke and when an option is picked.",
    code: `function ControlledDemo() {
  const [customer, setCustomer] = React.useState("")
  return (
    <div className="flex flex-col gap-3">
      <Autocomplete value={customer} onChange={setCustomer} placeholder="Bill to" aria-label="Customer" />
      <p className="text-xs text-fg-muted">
        {customer ? <>INV-2041 will be billed to <span className="font-medium text-fg">{customer}</span></> : "Pick a customer to continue"}
      </p>
    </div>
  )
}`,
    node: (
      <div className="pb-48">
        <ControlledDemo />
      </div>
    ),
  },
  {
    title: "In a form field",
    description: "FormField supplies the label and hint; share the id so the label focuses the input.",
    code: `const CITIES = ["Amsterdam", "Austin", "Bangalore", "Berlin", "Lisbon", "London", "Melbourne", "New York", "Singapore", "Toronto"]

<FormField id="office-city" label="Office city" description="Used for the default time zone on invoices.">
  <Autocomplete id="office-city" options={CITIES} placeholder="Start typing a city" className="w-full" />
</FormField>`,
    node: (
      <div className="w-72 pb-48">
        <FormField id="office-city" label="Office city" description="Used for the default time zone on invoices.">
          <Autocomplete id="office-city" options={CITIES} placeholder="Start typing a city" className="w-full" />
        </FormField>
      </div>
    ),
  },
]
