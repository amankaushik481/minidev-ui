import { QuotaBar } from "@/registry/ui/quota-bar"
import { Button } from "@/registry/ui/button"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "A usage panel",
    description: "Stack one bar per limit so the panel scans in a glance; format turns the raw numbers into units, here gigabytes for storage.",
    code: `<div className="flex w-full max-w-sm flex-col gap-4 rounded-xl border border-border bg-surface p-4 shadow-raised">
  <QuotaBar label="API requests" used={72400} max={100000} />
  <QuotaBar label="Seats" used={8} max={10} />
  <QuotaBar label="Storage" used={164} max={250} format={(n) => \`\${n} GB\`} />
  <QuotaBar label="Webhook endpoints" used={3} max={25} />
</div>`,
    node: (
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-xl border border-border bg-surface p-4 shadow-raised">
        <QuotaBar label="API requests" used={72400} max={100000} />
        <QuotaBar label="Seats" used={8} max={10} />
        <QuotaBar label="Storage" used={164} max={250} format={(n) => `${n} GB`} />
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
  {
    title: "Warn earlier",
    description: "warnAt is the percent where the fill turns amber; lower it for limits that take a while to raise, like seats on an annual plan.",
    code: `<div className="flex w-full max-w-sm flex-col gap-4">
  <QuotaBar label="Seats" used={8} max={10} warnAt={75} />
  <QuotaBar label="Invoices this month" used={412} max={500} warnAt={75} />
</div>`,
    node: (
      <div className="flex w-full max-w-sm flex-col gap-4">
        <QuotaBar label="Seats" used={8} max={10} warnAt={75} />
        <QuotaBar label="Invoices this month" used={412} max={500} warnAt={75} />
      </div>
    ),
  },
]
