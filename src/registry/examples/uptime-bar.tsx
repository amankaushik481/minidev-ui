"use client"
import { UptimeBar } from "@/registry/ui/uptime-bar"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Status page services",
    description: "One bar per service; downtimes are day indexes counted from the oldest day on the left.",
    code: `<div className="w-full max-w-xl space-y-5 rounded-xl border border-border bg-surface p-4">
  <UptimeBar label="Dashboard" days={90} downtimes={[]} />
  <UptimeBar label="Payments API" days={90} downtimes={[31]} />
  <UptimeBar label="Webhooks" days={90} downtimes={[12, 13, 87]} />
</div>`,
    node: (
      <div className="w-full max-w-xl space-y-5 rounded-xl border border-border bg-surface p-4">
        <UptimeBar label="Dashboard" days={90} downtimes={[]} />
        <UptimeBar label="Payments API" days={90} downtimes={[31]} />
        <UptimeBar label="Webhooks" days={90} downtimes={[12, 13, 87]} />
      </div>
    ),
  },
  {
    title: "Last 30 days in a small card",
    description: "Fewer days keep the bars readable in a narrow card or on a phone; index 29 is today.",
    code: `<div className="w-full max-w-xs rounded-xl border border-border bg-surface p-4">
  <UptimeBar label="Search" days={30} downtimes={[29]} />
</div>`,
    node: (
      <div className="w-full max-w-xs rounded-xl border border-border bg-surface p-4">
        <UptimeBar label="Search" days={30} downtimes={[29]} />
      </div>
    ),
  },
]
