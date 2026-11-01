"use client"
import * as React from "react"
import { AnimatedTabs } from "@/registry/premium/animated-tabs"
import { DescriptionList } from "@/registry/ui/description-list"
import { UsageBreakdown } from "@/registry/ui/usage-breakdown"
import type { Example } from "./types"

const INVOICE_TABS = [
  { id: "summary", label: "Summary", content: <p>INV-2041 for Northwind Traders, $12,400.00, issued Sep 24 and due Oct 24. Sent by Maya Chen.</p> },
  { id: "items", label: "Line items", content: <p>Implementation (40h at $250), onboarding workshop, and 12 months of the Growth plan billed annually.</p> },
  { id: "payments", label: "Payments", content: <p>No payments yet. A reminder went out on Oct 10 and Northwind confirmed the Friday payment run.</p> },
  { id: "history", label: "History", content: <p>Created Sep 24, approved by Theo Okafor Sep 25, sent Sep 25, reminder Oct 10.</p> },
]

function TrackedDemo() {
  const [tab, setTab] = React.useState("items")
  const label = INVOICE_TABS.find((t) => t.id === tab)?.label
  return (
    <div className="flex w-full max-w-lg flex-col gap-3">
      <AnimatedTabs tabs={INVOICE_TABS} defaultValue="items" onValueChange={setTab} />
      <p className="text-xs text-fg-muted">
        Viewing <span className="font-medium text-fg">{label}</span> (id <code className="font-mono">{tab}</code>)
      </p>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Custom tabs",
    description: "Each tab is an id, a label and any content node; the pill slides and the panel fades toward the direction of travel.",
    code: `const INVOICE_TABS = [
  { id: "summary", label: "Summary", content: <p>INV-2041 for Northwind Traders, $12,400.00, issued Sep 24 and due Oct 24. Sent by Maya Chen.</p> },
  { id: "items", label: "Line items", content: <p>Implementation (40h at $250), onboarding workshop, and 12 months of the Growth plan billed annually.</p> },
  { id: "payments", label: "Payments", content: <p>No payments yet. A reminder went out on Oct 10 and Northwind confirmed the Friday payment run.</p> },
  { id: "history", label: "History", content: <p>Created Sep 24, approved by Theo Okafor Sep 25, sent Sep 25, reminder Oct 10.</p> },
]

<AnimatedTabs tabs={INVOICE_TABS} />`,
    node: <AnimatedTabs tabs={INVOICE_TABS} />,
  },
  {
    title: "Default tab and change handler",
    description: "defaultValue picks the starting tab and onValueChange reports the id, which is enough to sync the tab with the URL.",
    code: `function TrackedDemo() {
  const [tab, setTab] = React.useState("items")
  const label = INVOICE_TABS.find((t) => t.id === tab)?.label
  return (
    <div className="flex w-full max-w-lg flex-col gap-3">
      <AnimatedTabs tabs={INVOICE_TABS} defaultValue="items" onValueChange={setTab} />
      <p className="text-xs text-fg-muted">
        Viewing <span className="font-medium text-fg">{label}</span> (id <code className="font-mono">{tab}</code>)
      </p>
    </div>
  )
}`,
    node: <TrackedDemo />,
  },
  {
    title: "Rich panel content",
    description: "Panels take whole components, so a record view can switch between a description list and usage bars.",
    code: `<AnimatedTabs
  tabs={[
    {
      id: "account",
      label: "Account",
      content: (
        <DescriptionList
          className="max-w-none gap-4"
          items={[
            { label: "Customer", value: "Northwind Traders" },
            { label: "Owner", value: "Priya Raman" },
            { label: "Plan", value: "Growth, annual" },
            { label: "Renews", value: "Jan 9, 2027" },
          ]}
        />
      ),
    },
    {
      id: "usage",
      label: "Usage",
      content: (
        <UsageBreakdown
          className="max-w-none"
          items={[
            { label: "Invoices sent", used: 1840, limit: 2500 },
            { label: "Seats", used: 18, limit: 25 },
            { label: "Storage (GB)", used: 38, limit: 50 },
          ]}
        />
      ),
    },
  ]}
/>`,
    node: (
      <AnimatedTabs
        tabs={[
          {
            id: "account",
            label: "Account",
            content: (
              <DescriptionList
                className="max-w-none gap-4"
                items={[
                  { label: "Customer", value: "Northwind Traders" },
                  { label: "Owner", value: "Priya Raman" },
                  { label: "Plan", value: "Growth, annual" },
                  { label: "Renews", value: "Jan 9, 2027" },
                ]}
              />
            ),
          },
          {
            id: "usage",
            label: "Usage",
            content: (
              <UsageBreakdown
                className="max-w-none"
                items={[
                  { label: "Invoices sent", used: 1840, limit: 2500 },
                  { label: "Seats", used: 18, limit: 25 },
                  { label: "Storage (GB)", used: 38, limit: 50 },
                ]}
              />
            ),
          },
        ]}
      />
    ),
  },
]
