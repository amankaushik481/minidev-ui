import { QuotaBar } from "@/registry/ui/quota-bar"
import { Button } from "@/registry/ui/button"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "A usage panel",
    description: "Stack one bar per limit; each reads used over max and fills to the same percentage, so the panel scans in a glance.",
    code: `<div className="flex w-full max-w-sm flex-col gap-4 rounded-xl border border-border bg-surface p-4 shadow-raised">
  <QuotaBar label="API requests" used={72400} max={100000} />
  <QuotaBar label="Seats" used={8} max={10} />
  <QuotaBar label="Storage (GB)" used={164} max={250} />
  <QuotaBar label="Webhook endpoints" used={3} max={25} />
</div>`,
    node: (
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-xl border border-border bg-surface p-4 shadow-raised">
        <QuotaBar label="API requests" used={72400} max={100000} />
        <QuotaBar label="Seats" used={8} max={10} />
        <QuotaBar label="Storage (GB)" used={164} max={250} />
        <QuotaBar label="Webhook endpoints" used={3} max={25} />
      </div>
    ),
  },
  {
    title: "At the limit with an action",
    description: "Values above max clamp to a full bar; pair it with the upgrade path so the number has somewhere to go.",
    code: `<div className="flex w-full max-w-md items-end gap-4">
  <QuotaBar label="Seats" used={10} max={10} className="flex-1" />
  <Button size="sm">Add seats</Button>
</div>`,
    node: (
      <div className="flex w-full max-w-md items-end gap-4">
        <QuotaBar label="Seats" used={10} max={10} className="flex-1" />
        <Button size="sm">Add seats</Button>
      </div>
    ),
  },
]
