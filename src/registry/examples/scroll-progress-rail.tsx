import { ScrollProgressRail } from "@/registry/premium/scroll-progress-rail"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Custom labels",
    description: "labels are the section names spread under the bar; the bar fills with the page scroll.",
    code: `<ScrollProgressRail className="w-full" labels={["Overview", "Invoices", "Payments", "Reports", "Pricing"]} />`,
    node: <ScrollProgressRail className="w-full" labels={["Overview", "Invoices", "Payments", "Reports", "Pricing"]} />,
  },
  {
    title: "Framed, not sticky",
    description: "Override the position with static and add a border and radius to show the rail inside a card instead of pinned to the top.",
    code: `<ScrollProgressRail className="static w-full rounded-xl border" labels={["Intro", "Demo", "Pricing"]} />`,
    node: <ScrollProgressRail className="static w-full rounded-xl border" labels={["Intro", "Demo", "Pricing"]} />,
  },
]
