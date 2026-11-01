import { HorizontalProductRail } from "@/registry/premium/horizontal-product-rail"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Custom items",
    description: "items takes a title, a blurb and an optional tag per card; ariaLabel names the scrolling region for assistive tech.",
    code: `<HorizontalProductRail
  ariaLabel="Lumen modules"
  items={[
    { title: "Invoicing", blurb: "Send, chase and reconcile from one screen.", tag: "Core" },
    { title: "Payments", blurb: "Cards, transfers and wallets in 140 currencies.", tag: "Core" },
    { title: "Reminders", blurb: "Polite, timed and escalating. Nine days sooner.", tag: "Automation" },
    { title: "Reports", blurb: "Board packs on the first Monday, written for you.", tag: "Finance" },
    { title: "Approvals", blurb: "Approve a bill from your phone in one tap.", tag: "Workflow" },
    { title: "Audit log", blurb: "Every change, who made it and why, kept forever.", tag: "Compliance" },
  ]}
  className="w-full"
/>`,
    node: (
      <HorizontalProductRail
        ariaLabel="Lumen modules"
        items={[
          { title: "Invoicing", blurb: "Send, chase and reconcile from one screen.", tag: "Core" },
          { title: "Payments", blurb: "Cards, transfers and wallets in 140 currencies.", tag: "Core" },
          { title: "Reminders", blurb: "Polite, timed and escalating. Nine days sooner.", tag: "Automation" },
          { title: "Reports", blurb: "Board packs on the first Monday, written for you.", tag: "Finance" },
          { title: "Approvals", blurb: "Approve a bill from your phone in one tap.", tag: "Workflow" },
          { title: "Audit log", blurb: "Every change, who made it and why, kept forever.", tag: "Compliance" },
        ]}
        className="w-full"
      />
    ),
  },
  {
    title: "Narrow rail, no tags",
    description: "Leave tag off to drop the eyebrow line; a capped width shows the snap scrolling even on a wide page.",
    code: `<HorizontalProductRail
  ariaLabel="Northwind templates"
  items={[
    { title: "Quarterly close", blurb: "Checklist, owners and sign-off in one board." },
    { title: "Vendor onboarding", blurb: "Tax forms, bank details and a first approval." },
    { title: "Expense policy", blurb: "Limits by role, receipts required above $50." },
    { title: "Board pack", blurb: "Revenue, cash and runway on the first Monday." },
  ]}
  className="w-full max-w-xl"
/>`,
    node: (
      <HorizontalProductRail
        ariaLabel="Northwind templates"
        items={[
          { title: "Quarterly close", blurb: "Checklist, owners and sign-off in one board." },
          { title: "Vendor onboarding", blurb: "Tax forms, bank details and a first approval." },
          { title: "Expense policy", blurb: "Limits by role, receipts required above $50." },
          { title: "Board pack", blurb: "Revenue, cash and runway on the first Monday." },
        ]}
        className="w-full max-w-xl"
      />
    ),
  },
]
