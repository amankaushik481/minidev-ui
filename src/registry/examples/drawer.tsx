"use client"
import * as React from "react"
import { Button } from "@/registry/ui/button"
import { Drawer } from "@/registry/ui/drawer"
import { FormField } from "@/registry/ui/form-field"
import { Input } from "@/registry/ui/input"
import type { Example } from "./types"

function ControlledDemo() {
  const [open, setOpen] = React.useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>Record payment</Button>
      <Drawer open={open} onClose={() => setOpen(false)} title="Record payment for INV-2041">
        <div className="mx-auto flex max-w-md flex-col gap-4">
          <FormField id="payment-amount" label="Amount received" description="$12,400.00 is outstanding.">
            <Input id="payment-amount" defaultValue="12,400.00" inputMode="decimal" />
          </FormField>
          <FormField id="payment-ref" label="Bank reference">
            <Input id="payment-ref" placeholder="NW-2041" />
          </FormField>
          <Button onClick={() => setOpen(false)}>Save payment</Button>
        </div>
      </Drawer>
    </>
  )
}

export const examples: Example[] = [
  {
    title: "Custom content",
    description: "Pass a title and children; the drawer keeps its own open state and renders the trigger button for you.",
    code: `<Drawer title="Filter invoices">
  <div className="mx-auto flex max-w-md flex-col gap-4">
    <FormField id="filter-customer" label="Customer">
      <Input id="filter-customer" placeholder="Northwind" />
    </FormField>
    <FormField id="filter-min" label="Minimum amount">
      <Input id="filter-min" type="number" placeholder="1000" />
    </FormField>
    <Button>Apply filters</Button>
  </div>
</Drawer>`,
    node: (
      <Drawer title="Filter invoices">
        <div className="mx-auto flex max-w-md flex-col gap-4">
          <FormField id="filter-customer" label="Customer">
            <Input id="filter-customer" placeholder="Northwind" />
          </FormField>
          <FormField id="filter-min" label="Minimum amount">
            <Input id="filter-min" type="number" placeholder="1000" />
          </FormField>
          <Button>Apply filters</Button>
        </div>
      </Drawer>
    ),
  },
  {
    title: "Controlled open",
    description: "Own the open state to use your own trigger and to close the drawer from a button inside it.",
    code: `function ControlledDemo() {
  const [open, setOpen] = React.useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>Record payment</Button>
      <Drawer open={open} onClose={() => setOpen(false)} title="Record payment for INV-2041">
        <div className="mx-auto flex max-w-md flex-col gap-4">
          <FormField id="payment-amount" label="Amount received" description="$12,400.00 is outstanding.">
            <Input id="payment-amount" defaultValue="12,400.00" inputMode="decimal" />
          </FormField>
          <FormField id="payment-ref" label="Bank reference">
            <Input id="payment-ref" placeholder="NW-2041" />
          </FormField>
          <Button onClick={() => setOpen(false)}>Save payment</Button>
        </div>
      </Drawer>
    </>
  )
}`,
    node: <ControlledDemo />,
  },
  {
    title: "From the right",
    description: "side changes the edge it slides from; right suits filters and detail panels on desktop.",
    code: `<Drawer side="right" title="Northwind">
  <dl className="space-y-3 text-sm">
    <div className="flex justify-between gap-4"><dt className="text-fg-muted">Plan</dt><dd className="font-medium text-fg">Scale</dd></div>
    <div className="flex justify-between gap-4"><dt className="text-fg-muted">Owner</dt><dd className="font-medium text-fg">Maya Chen</dd></div>
    <div className="flex justify-between gap-4"><dt className="text-fg-muted">Open invoices</dt><dd className="font-medium text-fg tabular-nums">3</dd></div>
    <div className="flex justify-between gap-4"><dt className="text-fg-muted">Outstanding</dt><dd className="font-medium text-fg tabular-nums">$21,450.00</dd></div>
  </dl>
</Drawer>`,
    node: (
      <Drawer side="right" title="Northwind">
        <dl className="space-y-3 text-sm">
          <div className="flex justify-between gap-4"><dt className="text-fg-muted">Plan</dt><dd className="font-medium text-fg">Scale</dd></div>
          <div className="flex justify-between gap-4"><dt className="text-fg-muted">Owner</dt><dd className="font-medium text-fg">Maya Chen</dd></div>
          <div className="flex justify-between gap-4"><dt className="text-fg-muted">Open invoices</dt><dd className="font-medium text-fg tabular-nums">3</dd></div>
          <div className="flex justify-between gap-4"><dt className="text-fg-muted">Outstanding</dt><dd className="font-medium text-fg tabular-nums">$21,450.00</dd></div>
        </dl>
      </Drawer>
    ),
  },
]
