import { ParallaxPanel } from "@/registry/premium/parallax-panel"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Custom copy",
    description: "title and body take plain strings; the text drifts up as the panel scrolls through the viewport while the glow drifts down.",
    code: `<ParallaxPanel
  className="w-full max-w-2xl"
  title="Cash flow you can see coming"
  body="Lumen blends recurring bills, payroll and the invoices most likely to be paid this month into one runway line for Northwind."
/>`,
    node: (
      <ParallaxPanel
        className="w-full max-w-2xl"
        title="Cash flow you can see coming"
        body="Lumen blends recurring bills, payroll and the invoices most likely to be paid this month into one runway line for Northwind."
      />
    ),
  },
  {
    title: "Compact",
    description: "Tighter padding and a narrower width for a sidebar or a secondary section.",
    code: `<ParallaxPanel
  className="w-full max-w-md p-6"
  title="Approvals by amount"
  body="Anything under 5,000 routes to Priya. Larger spends wait for Sam."
/>`,
    node: (
      <ParallaxPanel
        className="w-full max-w-md p-6"
        title="Approvals by amount"
        body="Anything under 5,000 routes to Priya. Larger spends wait for Sam."
      />
    ),
  },
  {
    title: "Two up",
    description: "Panels in a grid scroll at the same rate, so a pair reads as one composition.",
    code: `<div className="grid w-full max-w-3xl gap-4 sm:grid-cols-2">
  <ParallaxPanel className="p-8" title="Reminders in your voice" body="Scheduled, signed by you, and stopped the moment money lands." />
  <ParallaxPanel className="p-8" title="Reconciliation on autopilot" body="Bank lines match to invoices by amount, reference and timing." />
</div>`,
    node: (
      <div className="grid w-full max-w-3xl gap-4 sm:grid-cols-2">
        <ParallaxPanel className="p-8" title="Reminders in your voice" body="Scheduled, signed by you, and stopped the moment money lands." />
        <ParallaxPanel className="p-8" title="Reconciliation on autopilot" body="Bank lines match to invoices by amount, reference and timing." />
      </div>
    ),
  },
]
