"use client"
import * as React from "react"
import { ChevronDownIcon } from "lucide-react"
import { Button } from "@/registry/ui/button"
import { Collapsible, CollapsiblePanel, CollapsibleTrigger } from "@/registry/ui/collapsible"
import type { Example } from "./types"

const MORE_INVOICES = ["INV-2038 · Helix Biotech · $4,100.00", "INV-2037 · Meridian Freight · $980.00", "INV-2036 · Blue Harbor Co. · $2,350.00"]

function ShowMoreDemo() {
  const [open, setOpen] = React.useState(false)
  return (
    <div className="w-80 rounded-xl border border-border bg-surface p-2 shadow-raised">
      <ul className="space-y-1 px-3 py-1 text-sm text-fg">
        <li>INV-2041 · Northwind Traders · $12,400.00</li>
        <li>INV-2040 · Summit Dental Group · $1,200.00</li>
      </ul>
      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsiblePanel className="pt-1">
          <ul className="space-y-1 text-sm text-fg">
            {MORE_INVOICES.map((line) => <li key={line}>{line}</li>)}
          </ul>
        </CollapsiblePanel>
        <CollapsibleTrigger className="justify-center" render={<Button variant="ghost" size="sm" className="mt-1 w-full" />}>
          {open ? "Show less" : "Show 3 more"}
        </CollapsibleTrigger>
      </Collapsible>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Expandable section",
    description: "defaultOpen starts it expanded; the trigger carries data-panel-open, so the chevron can rotate with a group class.",
    code: `<Collapsible defaultOpen className="w-80 rounded-xl border border-border bg-surface shadow-raised">
  <CollapsibleTrigger className="group">
    Payment terms
    <ChevronDownIcon className="size-4 text-fg-muted transition-transform group-data-[panel-open]:rotate-180" />
  </CollapsibleTrigger>
  <CollapsiblePanel>
    Net 30 from the invoice date. A 1.5% late fee applies after 45 days, and bank transfers in USD or EUR are accepted.
  </CollapsiblePanel>
</Collapsible>`,
    node: (
      <Collapsible defaultOpen className="w-80 rounded-xl border border-border bg-surface shadow-raised">
        <CollapsibleTrigger className="group">
          Payment terms
          <ChevronDownIcon className="size-4 text-fg-muted transition-transform group-data-[panel-open]:rotate-180" />
        </CollapsibleTrigger>
        <CollapsiblePanel>
          Net 30 from the invoice date. A 1.5% late fee applies after 45 days, and bank transfers in USD or EUR are accepted.
        </CollapsiblePanel>
      </Collapsible>
    ),
  },
  {
    title: "Controlled show more",
    description: "Own the open state to change the trigger label; the panel can sit above the trigger when the content should grow upward.",
    code: `const MORE_INVOICES = ["INV-2038 · Helix Biotech · $4,100.00", "INV-2037 · Meridian Freight · $980.00", "INV-2036 · Blue Harbor Co. · $2,350.00"]

function ShowMoreDemo() {
  const [open, setOpen] = React.useState(false)
  return (
    <div className="w-80 rounded-xl border border-border bg-surface p-2 shadow-raised">
      <ul className="space-y-1 px-3 py-1 text-sm text-fg">
        <li>INV-2041 · Northwind Traders · $12,400.00</li>
        <li>INV-2040 · Summit Dental Group · $1,200.00</li>
      </ul>
      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsiblePanel className="pt-1">
          <ul className="space-y-1 text-sm text-fg">
            {MORE_INVOICES.map((line) => <li key={line}>{line}</li>)}
          </ul>
        </CollapsiblePanel>
        <CollapsibleTrigger className="justify-center" render={<Button variant="ghost" size="sm" className="mt-1 w-full" />}>
          {open ? "Show less" : "Show 3 more"}
        </CollapsibleTrigger>
      </Collapsible>
    </div>
  )
}`,
    node: <ShowMoreDemo />,
  },
  {
    title: "Stacked sections",
    description: "Several collapsibles in a list behave independently, unlike an accordion where one open closes the others.",
    code: `<div className="w-80 divide-y divide-border overflow-hidden rounded-xl border border-border bg-surface shadow-raised">
  <Collapsible>
    <CollapsibleTrigger className="group rounded-none">
      Billing address
      <ChevronDownIcon className="size-4 text-fg-muted transition-transform group-data-[panel-open]:rotate-180" />
    </CollapsibleTrigger>
    <CollapsiblePanel>14 Harbour Street, Portsmouth PO1 3AX, United Kingdom</CollapsiblePanel>
  </Collapsible>
  <Collapsible>
    <CollapsibleTrigger className="group rounded-none">
      Tax details
      <ChevronDownIcon className="size-4 text-fg-muted transition-transform group-data-[panel-open]:rotate-180" />
    </CollapsibleTrigger>
    <CollapsiblePanel>VAT GB 123 4567 89 · Reverse charge applies to EU customers.</CollapsiblePanel>
  </Collapsible>
  <Collapsible>
    <CollapsibleTrigger className="group rounded-none">
      Contacts
      <ChevronDownIcon className="size-4 text-fg-muted transition-transform group-data-[panel-open]:rotate-180" />
    </CollapsibleTrigger>
    <CollapsiblePanel>Maya Chen (billing), Theo Okafor (technical)</CollapsiblePanel>
  </Collapsible>
</div>`,
    node: (
      <div className="w-80 divide-y divide-border overflow-hidden rounded-xl border border-border bg-surface shadow-raised">
        <Collapsible>
          <CollapsibleTrigger className="group rounded-none">
            Billing address
            <ChevronDownIcon className="size-4 text-fg-muted transition-transform group-data-[panel-open]:rotate-180" />
          </CollapsibleTrigger>
          <CollapsiblePanel>14 Harbour Street, Portsmouth PO1 3AX, United Kingdom</CollapsiblePanel>
        </Collapsible>
        <Collapsible>
          <CollapsibleTrigger className="group rounded-none">
            Tax details
            <ChevronDownIcon className="size-4 text-fg-muted transition-transform group-data-[panel-open]:rotate-180" />
          </CollapsibleTrigger>
          <CollapsiblePanel>VAT GB 123 4567 89 · Reverse charge applies to EU customers.</CollapsiblePanel>
        </Collapsible>
        <Collapsible>
          <CollapsibleTrigger className="group rounded-none">
            Contacts
            <ChevronDownIcon className="size-4 text-fg-muted transition-transform group-data-[panel-open]:rotate-180" />
          </CollapsibleTrigger>
          <CollapsiblePanel>Maya Chen (billing), Theo Okafor (technical)</CollapsiblePanel>
        </Collapsible>
      </div>
    ),
  },
]
