"use client"
import * as React from "react"
import { Combobox } from "@/registry/ui/combobox"
import { FormField } from "@/registry/ui/form-field"
import type { Example } from "./types"

const ASSIGNEES = [
  { value: "maya-chen", label: "Maya Chen" },
  { value: "theo-okafor", label: "Theo Okafor" },
  { value: "priya-raman", label: "Priya Raman" },
  { value: "sam-lowe", label: "Sam Lowe" },
]

const CUSTOMERS = [
  { value: "northwind", label: "Northwind Traders" },
  { value: "blue-harbor", label: "Blue Harbor Co." },
  { value: "helix", label: "Helix Biotech" },
  { value: "meridian", label: "Meridian Freight" },
]

function ControlledDemo() {
  const [customer, setCustomer] = React.useState("northwind")
  const label = CUSTOMERS.find((c) => c.value === customer)?.label
  return (
    <div className="flex flex-col gap-3">
      <Combobox items={CUSTOMERS} value={customer} onChange={setCustomer} placeholder="Pick a customer" />
      <p className="text-xs text-fg-muted">
        INV-2041 is billed to <span className="font-medium text-fg">{label}</span>
      </p>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Custom items",
    description: "Pass items as value and label pairs; emptyText shows when the filter matches nothing.",
    code: `const ASSIGNEES = [
  { value: "maya-chen", label: "Maya Chen" },
  { value: "theo-okafor", label: "Theo Okafor" },
  { value: "priya-raman", label: "Priya Raman" },
  { value: "sam-lowe", label: "Sam Lowe" },
]

<Combobox items={ASSIGNEES} placeholder="Assign to" emptyText="No teammate found" />`,
    node: <Combobox items={ASSIGNEES} placeholder="Assign to" emptyText="No teammate found" />,
  },
  {
    title: "Controlled value",
    description: "Hold the selected value in state and look up its label where you need it.",
    code: `const CUSTOMERS = [
  { value: "northwind", label: "Northwind Traders" },
  { value: "blue-harbor", label: "Blue Harbor Co." },
  { value: "helix", label: "Helix Biotech" },
  { value: "meridian", label: "Meridian Freight" },
]

function ControlledDemo() {
  const [customer, setCustomer] = React.useState("northwind")
  const label = CUSTOMERS.find((c) => c.value === customer)?.label
  return (
    <div className="flex flex-col gap-3">
      <Combobox items={CUSTOMERS} value={customer} onChange={setCustomer} placeholder="Pick a customer" />
      <p className="text-xs text-fg-muted">
        INV-2041 is billed to <span className="font-medium text-fg">{label}</span>
      </p>
    </div>
  )
}`,
    node: <ControlledDemo />,
  },
  {
    title: "With form field",
    description: "FormField adds the label and hint; defaultValue preselects an item without taking control.",
    code: `<FormField label="Customer" description="Start typing to filter the list.">
  <Combobox defaultValue="northwind" placeholder="Pick a customer" />
</FormField>`,
    node: (
      <div className="w-64">
        <FormField label="Customer" description="Start typing to filter the list.">
          <Combobox defaultValue="northwind" placeholder="Pick a customer" />
        </FormField>
      </div>
    ),
  },
  {
    title: "Disabled",
    description: "A disabled combobox keeps its value readable but cannot be opened.",
    code: `<Combobox disabled defaultValue="helix" />`,
    node: <Combobox disabled defaultValue="helix" />,
  },
]
