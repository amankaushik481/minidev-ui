import { CheckIcon, ClockIcon, CircleAlertIcon, ArrowRightIcon } from "lucide-react"
import { Badge } from "@/registry/ui/badge"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Variants",
    description: "Seven variants share one 20px height, so they line up inside table cells and titles.",
    code: `<Badge>Default</Badge>
<Badge variant="accent">Accent</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Destructive</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="ghost">Ghost</Badge>
<Badge variant="link">Link</Badge>`,
    node: (
      <div className="flex flex-wrap items-center gap-2">
        <Badge>Default</Badge>
        <Badge variant="accent">Accent</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="ghost">Ghost</Badge>
        <Badge variant="link">Link</Badge>
      </div>
    ),
  },
  {
    title: "Status with icons",
    description: "Icons are sized to 12px automatically; pick the variant by meaning, not by colour.",
    code: `<Badge variant="accent"><CheckIcon /> Paid</Badge>
<Badge variant="outline"><ClockIcon /> Pending</Badge>
<Badge variant="destructive"><CircleAlertIcon /> Overdue</Badge>`,
    node: (
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="accent"><CheckIcon /> Paid</Badge>
        <Badge variant="outline"><ClockIcon /> Pending</Badge>
        <Badge variant="destructive"><CircleAlertIcon /> Overdue</Badge>
      </div>
    ),
  },
  {
    title: "As a link",
    description: "Pass render to make the badge an anchor; hover styles switch on for the a element.",
    code: `<Badge variant="accent" render={<a href="#changelog" />}>
  v2.4 release notes <ArrowRightIcon />
</Badge>
<Badge variant="outline" render={<a href="#invoices" />}>
  12 open invoices
</Badge>`,
    node: (
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="accent" render={<a href="#changelog" />}>
          v2.4 release notes <ArrowRightIcon />
        </Badge>
        <Badge variant="outline" render={<a href="#invoices" />}>
          12 open invoices
        </Badge>
      </div>
    ),
  },
  {
    title: "Inline with text",
    description: "Badges sit on the text baseline, so a status can follow a title or a row label.",
    code: `<div className="flex items-center gap-2">
  <span className="font-mono text-sm text-fg">INV-2041</span>
  <span className="text-sm text-fg-muted">Northwind Traders</span>
  <Badge variant="accent">Paid</Badge>
</div>
<div className="flex items-center gap-2">
  <span className="font-mono text-sm text-fg">INV-2042</span>
  <span className="text-sm text-fg-muted">Maya Chen</span>
  <Badge variant="outline">Draft</Badge>
</div>`,
    node: (
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm text-fg">INV-2041</span>
          <span className="text-sm text-fg-muted">Northwind Traders</span>
          <Badge variant="accent">Paid</Badge>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm text-fg">INV-2042</span>
          <span className="text-sm text-fg-muted">Maya Chen</span>
          <Badge variant="outline">Draft</Badge>
        </div>
      </div>
    ),
  },
]
