import { Badge } from "@/registry/ui/badge"
import { Timeline } from "@/registry/ui/timeline"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Deploy history",
    description: "Items are plain objects with a title, an optional description and a time string, newest first.",
    code: `<Timeline
  items={[
    { title: "Deploy #412 is live", description: "lumen-web · production · 1m 48s", time: "09:41" },
    { title: "Checks passed", description: "lint, typecheck and 212 tests", time: "09:38" },
    { title: "Build started", description: "Triggered by Theo Okafor from main", time: "09:36" },
    { title: "Commit pushed", description: "fix: VAT rounding on EU invoices (a41c9e2)", time: "09:35" },
  ]}
/>`,
    node: (
      <Timeline
        items={[
          { title: "Deploy #412 is live", description: "lumen-web · production · 1m 48s", time: "09:41" },
          { title: "Checks passed", description: "lint, typecheck and 212 tests", time: "09:38" },
          { title: "Build started", description: "Triggered by Theo Okafor from main", time: "09:36" },
          { title: "Commit pushed", description: "fix: VAT rounding on EU invoices (a41c9e2)", time: "09:35" },
        ]}
      />
    ),
  },
  {
    title: "Rich content",
    description: "Title and description accept any node, so badges and links drop in without changing the layout.",
    code: `<Timeline
  items={[
    {
      title: <span className="inline-flex items-center gap-2">Invoice INV-2041 <Badge variant="accent">Paid</Badge></span>,
      description: "$12,400 from Northwind via bank transfer",
      time: "Today",
    },
    {
      title: <span className="inline-flex items-center gap-2">Reminder sent <Badge variant="secondary">Auto</Badge></span>,
      description: <span>To <a href="#" className="text-accent-fg underline decoration-accent-line underline-offset-4">billing@northwind.io</a>, 3 days before the due date</span>,
      time: "Oct 11",
    },
    {
      title: <span className="inline-flex items-center gap-2">Invoice sent <Badge variant="outline">Email</Badge></span>,
      description: "Issued by Maya Chen",
      time: "Sep 24",
    },
  ]}
/>`,
    node: (
      <Timeline
        items={[
          {
            title: <span className="inline-flex items-center gap-2">Invoice INV-2041 <Badge variant="accent">Paid</Badge></span>,
            description: "$12,400 from Northwind via bank transfer",
            time: "Today",
          },
          {
            title: <span className="inline-flex items-center gap-2">Reminder sent <Badge variant="secondary">Auto</Badge></span>,
            description: <span>To <a href="#" className="text-accent-fg underline decoration-accent-line underline-offset-4">billing@northwind.io</a>, 3 days before the due date</span>,
            time: "Oct 11",
          },
          {
            title: <span className="inline-flex items-center gap-2">Invoice sent <Badge variant="outline">Email</Badge></span>,
            description: "Issued by Maya Chen",
            time: "Sep 24",
          },
        ]}
      />
    ),
  },
  {
    title: "Titles only",
    description: "Leave out descriptions and tighten the spacing for a compact status column.",
    code: `<Timeline
  className="max-w-xs space-y-3"
  items={[
    { title: "Order placed", time: "Oct 12" },
    { title: "Payment confirmed", time: "Oct 12" },
    { title: "Shipped from Rotterdam", time: "Oct 14" },
    { title: "Out for delivery", time: "Today" },
  ]}
/>`,
    node: (
      <Timeline
        className="max-w-xs space-y-3"
        items={[
          { title: "Order placed", time: "Oct 12" },
          { title: "Payment confirmed", time: "Oct 12" },
          { title: "Shipped from Rotterdam", time: "Oct 14" },
          { title: "Out for delivery", time: "Today" },
        ]}
      />
    ),
  },
]
