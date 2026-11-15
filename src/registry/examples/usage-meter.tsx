"use client"
import { UsageMeter } from "@/registry/ui/usage-meter"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Plan usage card",
    description: "One meter per resource, each labelled; the label also names the bar for screen readers.",
    code: `<div className="w-full max-w-sm space-y-4 rounded-xl border border-border bg-surface p-4">
  <h3 className="text-sm font-medium text-fg">This billing period</h3>
  <UsageMeter label="Seats" used={18} limit={25} />
  <UsageMeter label="Storage (GB)" used={38.5} limit={50} />
  <UsageMeter label="API calls" used={84200} limit={100000} />
</div>`,
    node: (
      <div className="w-full max-w-sm space-y-4 rounded-xl border border-border bg-surface p-4">
        <h3 className="text-sm font-medium text-fg">This billing period</h3>
        <UsageMeter label="Seats" used={18} limit={25} />
        <UsageMeter label="Storage (GB)" used={38.5} limit={50} />
        <UsageMeter label="API calls" used={84200} limit={100000} />
      </div>
    ),
  },
  {
    title: "Over the limit",
    description: "The bar stops at 100% while the numbers stay true; the bar never changes colour, so say what happens next in text.",
    code: `<div className="w-full max-w-sm space-y-2">
  <UsageMeter label="Seats" used={27} limit={25} />
  <p className="text-xs text-fg-muted">2 seats over your plan. They are billed at $12 each on Dec 1.</p>
</div>`,
    node: (
      <div className="w-full max-w-sm space-y-2">
        <UsageMeter label="Seats" used={27} limit={25} />
        <p className="text-xs text-fg-muted">2 seats over your plan. They are billed at $12 each on Dec 1.</p>
      </div>
    ),
  },
]
