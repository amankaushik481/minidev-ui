"use client"
import { TrialBanner } from "@/registry/ui/trial-banner"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Above page content",
    description: "Put it first in the content area so it is read before the page; description says what stays unlocked.",
    code: `<div className="w-full max-w-2xl space-y-4">
  <TrialBanner daysLeft={9} plan="Team" description="Shared dashboards and chat alerts stay on until then." />
  <div className="rounded-xl border border-border bg-surface p-4">
    <h3 className="text-sm font-medium text-fg">Dashboards</h3>
    <p className="mt-1 text-sm text-fg-muted">4 dashboards, last edited by Priya Raman 2 hours ago.</p>
  </div>
</div>`,
    node: (
      <div className="w-full max-w-2xl space-y-4">
        <TrialBanner daysLeft={9} plan="Team" description="Shared dashboards and chat alerts stay on until then." />
        <div className="rounded-xl border border-border bg-surface p-4">
          <h3 className="text-sm font-medium text-fg">Dashboards</h3>
          <p className="mt-1 text-sm text-fg-muted">4 dashboards, last edited by Priya Raman 2 hours ago.</p>
        </div>
      </div>
    ),
  },
  {
    title: "Last day",
    description: "daysLeft of 0 reads \"ends today\"; change the action to what the user actually needs to do.",
    code: `<TrialBanner
  className="w-full max-w-2xl"
  daysLeft={0}
  plan="Pro"
  description="Add a card to keep recurring invoices running tomorrow."
  actionLabel="Add payment method"
/>`,
    node: (
      <TrialBanner
        className="w-full max-w-2xl"
        daysLeft={0}
        plan="Pro"
        description="Add a card to keep recurring invoices running tomorrow."
        actionLabel="Add payment method"
      />
    ),
  },
]
