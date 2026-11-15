"use client"
import { StatusBadge } from "@/registry/ui/status-badge"
import { Switch } from "@/registry/ui/switch"
import { WindowChrome } from "@/registry/ui/window-chrome"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Product preview",
    description: "Frame a live slice of the app on a landing page; always set title.",
    code: `<WindowChrome title="Lumen — Invoices" className="w-full max-w-md">
  <ul className="divide-y divide-border text-sm">
    <li className="flex items-center justify-between py-2"><span className="text-fg">Northwind Traders</span><StatusBadge tone="success">Paid</StatusBadge></li>
    <li className="flex items-center justify-between py-2"><span className="text-fg">Summit Dental</span><StatusBadge tone="warning">Due in 3 days</StatusBadge></li>
    <li className="flex items-center justify-between py-2"><span className="text-fg">Blue Harbor Co.</span><StatusBadge tone="danger">Overdue</StatusBadge></li>
  </ul>
</WindowChrome>`,
    node: (
      <WindowChrome title="Lumen — Invoices" className="w-full max-w-md">
        <ul className="divide-y divide-border text-sm">
          <li className="flex items-center justify-between py-2"><span className="text-fg">Northwind Traders</span><StatusBadge tone="success">Paid</StatusBadge></li>
          <li className="flex items-center justify-between py-2"><span className="text-fg">Summit Dental</span><StatusBadge tone="warning">Due in 3 days</StatusBadge></li>
          <li className="flex items-center justify-between py-2"><span className="text-fg">Blue Harbor Co.</span><StatusBadge tone="danger">Overdue</StatusBadge></li>
        </ul>
      </WindowChrome>
    ),
  },
  {
    title: "Settings screen",
    description: "Any UI fits inside; here two working switches show the feature in a changelog post.",
    code: `<WindowChrome title="Lumen — Notifications" className="w-full max-w-md">
  <div className="space-y-4">
    <Switch label="Payment reminders" description="Email customers before and after the due date." defaultChecked />
    <Switch label="Skip weekends" description="Hold reminders that would land on a Saturday or Sunday." />
  </div>
</WindowChrome>`,
    node: (
      <WindowChrome title="Lumen — Notifications" className="w-full max-w-md">
        <div className="space-y-4">
          <Switch label="Payment reminders" description="Email customers before and after the due date." defaultChecked />
          <Switch label="Skip weekends" description="Hold reminders that would land on a Saturday or Sunday." />
        </div>
      </WindowChrome>
    ),
  },
]
