"use client"
import * as React from "react"
import { Button } from "@/registry/ui/button"
import { FormField } from "@/registry/ui/form-field"
import { Input } from "@/registry/ui/input"
import { Sheet } from "@/registry/ui/sheet"
import type { Example } from "./types"

function ControlledDemo() {
  const [open, setOpen] = React.useState(false)
  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>Edit customer</Button>
      <Sheet open={open} onClose={() => setOpen(false)} title="Edit Northwind">
        <div className="flex flex-col gap-4">
          <FormField id="customer-name" label="Company">
            <Input id="customer-name" defaultValue="Northwind Traders" />
          </FormField>
          <FormField id="customer-email" label="Billing email">
            <Input id="customer-email" type="email" defaultValue="billing@northwind.io" />
          </FormField>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => setOpen(false)}>Save</Button>
          </div>
        </div>
      </Sheet>
    </>
  )
}

const NAV = ["Dashboard", "Invoices", "Customers", "Payouts", "Settings"]

export const examples: Example[] = [
  {
    title: "Controlled open",
    description: "Own the open state to use your own trigger and close the sheet from its buttons; Escape and the scrim call onClose too.",
    code: `function ControlledDemo() {
  const [open, setOpen] = React.useState(false)
  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>Edit customer</Button>
      <Sheet open={open} onClose={() => setOpen(false)} title="Edit Northwind">
        <div className="flex flex-col gap-4">
          <FormField id="customer-name" label="Company">
            <Input id="customer-name" defaultValue="Northwind Traders" />
          </FormField>
          <FormField id="customer-email" label="Billing email">
            <Input id="customer-email" type="email" defaultValue="billing@northwind.io" />
          </FormField>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => setOpen(false)}>Save</Button>
          </div>
        </div>
      </Sheet>
    </>
  )
}`,
    node: <ControlledDemo />,
  },
  {
    title: "From the left",
    description: "side=\"left\" makes a mobile navigation panel; the sheet renders its own trigger when left uncontrolled.",
    code: `const NAV = ["Dashboard", "Invoices", "Customers", "Payouts", "Settings"]

<Sheet side="left" title="Lumen">
  <nav className="flex flex-col gap-0.5">
    {NAV.map((item) => (
      <a key={item} href="#" className="rounded-lg px-3 py-2 text-sm text-fg-muted outline-none hover:bg-sunken hover:text-fg focus-visible:ring-2 focus-visible:ring-accent">
        {item}
      </a>
    ))}
  </nav>
</Sheet>`,
    node: (
      <Sheet side="left" title="Lumen">
        <nav className="flex flex-col gap-0.5">
          {NAV.map((item) => (
            <a key={item} href="#" className="rounded-lg px-3 py-2 text-sm text-fg-muted outline-none hover:bg-sunken hover:text-fg focus-visible:ring-2 focus-visible:ring-accent">
              {item}
            </a>
          ))}
        </nav>
      </Sheet>
    ),
  },
  {
    title: "Wider panel",
    description: "className reaches the panel, so max-w-xl gives a detail view room for two columns.",
    code: `<Sheet title="Invoice INV-2041" className="max-w-xl">
  <div className="grid gap-6 sm:grid-cols-2">
    <dl className="space-y-3 text-sm">
      <div className="flex justify-between gap-4"><dt className="text-fg-muted">Customer</dt><dd className="font-medium text-fg">Northwind Traders</dd></div>
      <div className="flex justify-between gap-4"><dt className="text-fg-muted">Amount</dt><dd className="font-medium text-fg tabular-nums">$12,400.00</dd></div>
      <div className="flex justify-between gap-4"><dt className="text-fg-muted">Due</dt><dd className="font-medium text-fg">Oct 24, 2026</dd></div>
    </dl>
    <dl className="space-y-3 text-sm">
      <div className="flex justify-between gap-4"><dt className="text-fg-muted">Status</dt><dd className="font-medium text-fg">Sent</dd></div>
      <div className="flex justify-between gap-4"><dt className="text-fg-muted">Owner</dt><dd className="font-medium text-fg">Maya Chen</dd></div>
      <div className="flex justify-between gap-4"><dt className="text-fg-muted">Reminders</dt><dd className="font-medium text-fg tabular-nums">2 scheduled</dd></div>
    </dl>
  </div>
</Sheet>`,
    node: (
      <Sheet title="Invoice INV-2041" className="max-w-xl">
        <div className="grid gap-6 sm:grid-cols-2">
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between gap-4"><dt className="text-fg-muted">Customer</dt><dd className="font-medium text-fg">Northwind Traders</dd></div>
            <div className="flex justify-between gap-4"><dt className="text-fg-muted">Amount</dt><dd className="font-medium text-fg tabular-nums">$12,400.00</dd></div>
            <div className="flex justify-between gap-4"><dt className="text-fg-muted">Due</dt><dd className="font-medium text-fg">Oct 24, 2026</dd></div>
          </dl>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between gap-4"><dt className="text-fg-muted">Status</dt><dd className="font-medium text-fg">Sent</dd></div>
            <div className="flex justify-between gap-4"><dt className="text-fg-muted">Owner</dt><dd className="font-medium text-fg">Maya Chen</dd></div>
            <div className="flex justify-between gap-4"><dt className="text-fg-muted">Reminders</dt><dd className="font-medium text-fg tabular-nums">2 scheduled</dd></div>
          </dl>
        </div>
      </Sheet>
    ),
  },
]
