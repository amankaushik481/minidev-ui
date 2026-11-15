"use client"
import { UpgradePrompt } from "@/registry/ui/upgrade-prompt"
import { QuotaBar } from "@/registry/ui/quota-bar"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "In place of a locked feature",
    description: "Render it where the feature would be, and name the plan in the button so several prompts stay distinct.",
    code: `<div className="grid w-full max-w-2xl gap-4 sm:grid-cols-2">
  <div className="rounded-xl border border-border bg-surface p-5">
    <h3 className="text-sm font-medium text-fg">Revenue this month</h3>
    <p className="mt-2 text-2xl font-medium tabular-nums text-fg">$48,210</p>
  </div>
  <UpgradePrompt
    title="Forecasts are on Scale"
    description="See the next 90 days of cash flow from your open invoices."
    actionLabel="Upgrade to Scale"
  />
</div>`,
    node: (
      <div className="grid w-full max-w-2xl gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-surface p-5">
          <h3 className="text-sm font-medium text-fg">Revenue this month</h3>
          <p className="mt-2 text-2xl font-medium tabular-nums text-fg">$48,210</p>
        </div>
        <UpgradePrompt
          title="Forecasts are on Scale"
          description="See the next 90 days of cash flow from your open invoices."
          actionLabel="Upgrade to Scale"
        />
      </div>
    ),
  },
  {
    title: "At a usage limit",
    description: "Pair it with the meter that hit the limit, so the reason for the prompt is on screen.",
    code: `<div className="w-full max-w-sm space-y-3">
  <QuotaBar label="Projects" used={3} max={3} />
  <UpgradePrompt
    title="You've used all 3 projects"
    description="Archive a project or move to Pro for unlimited projects."
    actionLabel="See Pro"
  />
</div>`,
    node: (
      <div className="w-full max-w-sm space-y-3">
        <QuotaBar label="Projects" used={3} max={3} />
        <UpgradePrompt
          title="You've used all 3 projects"
          description="Archive a project or move to Pro for unlimited projects."
          actionLabel="See Pro"
        />
      </div>
    ),
  },
]
