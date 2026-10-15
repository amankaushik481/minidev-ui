import { BellIcon, CreditCardIcon, GlobeIcon, ShieldCheckIcon, TrendingUpIcon, ZapIcon } from "lucide-react"
import { AreaChart } from "@/registry/ui/area-chart"
import { Badge } from "@/registry/ui/badge"
import { BentoGrid } from "@/registry/ui/bento-grid"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Custom items",
    description: "Each item takes a title, copy, an icon and a span out of six columns; rows 2 makes a tall tile.",
    code: `<BentoGrid
  items={[
    { title: "Paid in 140 currencies", description: "Customers pay in their own currency and you settle in yours, at the rate locked on send.", icon: GlobeIcon, span: 4, rows: 2 },
    { title: "Reminders that send themselves", description: "Three days before, seven days after, then stop.", icon: BellIcon, span: 2 },
    { title: "Cards and bank transfer", description: "Every rail your customers already use.", icon: CreditCardIcon, span: 2 },
  ]}
/>`,
    node: (
      <BentoGrid
        items={[
          { title: "Paid in 140 currencies", description: "Customers pay in their own currency and you settle in yours, at the rate locked on send.", icon: GlobeIcon, span: 4, rows: 2 },
          { title: "Reminders that send themselves", description: "Three days before, seven days after, then stop.", icon: BellIcon, span: 2 },
          { title: "Cards and bank transfer", description: "Every rail your customers already use.", icon: CreditCardIcon, span: 2 },
        ]}
      />
    ),
  },
  {
    title: "Linked tiles",
    description: "Give an item an href and the tile becomes a link with a hover border and a focus ring.",
    code: `<BentoGrid
  items={[
    { title: "Automations", description: "Trigger a workflow from any invoice event.", icon: ZapIcon, span: 2, href: "#automations" },
    { title: "Security", description: "SSO, SCIM and audit logs on every plan.", icon: ShieldCheckIcon, span: 2, href: "#security" },
    { title: "Reporting", description: "Revenue, churn and cash flow without a spreadsheet.", icon: TrendingUpIcon, span: 2, href: "#reporting" },
  ]}
/>`,
    node: (
      <BentoGrid
        items={[
          { title: "Automations", description: "Trigger a workflow from any invoice event.", icon: ZapIcon, span: 2, href: "#automations" },
          { title: "Security", description: "SSO, SCIM and audit logs on every plan.", icon: ShieldCheckIcon, span: 2, href: "#security" },
          { title: "Reporting", description: "Revenue, churn and cash flow without a spreadsheet.", icon: TrendingUpIcon, span: 2, href: "#reporting" },
        ]}
      />
    ),
  },
  {
    title: "Custom visuals",
    description: "The visual slot takes any node, so a tile can hold a chart, a list or a screenshot.",
    code: `<BentoGrid
  items={[
    {
      title: "Revenue in real time",
      description: "Every chart updates as payments land.",
      icon: TrendingUpIcon,
      span: 4,
      visual: <AreaChart label="Revenue" className="mt-6 h-24" />,
    },
    {
      title: "Status at a glance",
      description: "Open, paid and overdue, always current.",
      icon: BellIcon,
      span: 2,
      visual: (
        <ul className="mt-auto flex flex-col gap-2 pt-6 text-sm">
          <li className="flex items-center justify-between"><span className="font-mono text-xs text-fg-muted">INV-2041</span><Badge variant="accent">Paid</Badge></li>
          <li className="flex items-center justify-between"><span className="font-mono text-xs text-fg-muted">INV-2042</span><Badge variant="outline">Pending</Badge></li>
          <li className="flex items-center justify-between"><span className="font-mono text-xs text-fg-muted">INV-2038</span><Badge variant="destructive">Overdue</Badge></li>
        </ul>
      ),
    },
  ]}
/>`,
    node: (
      <BentoGrid
        items={[
          {
            title: "Revenue in real time",
            description: "Every chart updates as payments land.",
            icon: TrendingUpIcon,
            span: 4,
            visual: <AreaChart label="Revenue" className="mt-6 h-24" />,
          },
          {
            title: "Status at a glance",
            description: "Open, paid and overdue, always current.",
            icon: BellIcon,
            span: 2,
            visual: (
              <ul className="mt-auto flex flex-col gap-2 pt-6 text-sm">
                <li className="flex items-center justify-between"><span className="font-mono text-xs text-fg-muted">INV-2041</span><Badge variant="accent">Paid</Badge></li>
                <li className="flex items-center justify-between"><span className="font-mono text-xs text-fg-muted">INV-2042</span><Badge variant="outline">Pending</Badge></li>
                <li className="flex items-center justify-between"><span className="font-mono text-xs text-fg-muted">INV-2038</span><Badge variant="destructive">Overdue</Badge></li>
              </ul>
            ),
          },
        ]}
      />
    ),
  },
]
