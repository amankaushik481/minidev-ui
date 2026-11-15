"use client"
import { Button } from "@/registry/ui/button"
import { ResourceQuotaGrid } from "@/registry/ui/resource-quota-grid"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Plan usage page",
    description: "Pass `format` for units and `warnAt` to warn earlier than 90%; every bar turns red at the limit.",
    code: `<section className="w-full max-w-2xl space-y-3">
  <div className="flex items-center justify-between">
    <h3 className="text-sm font-medium text-fg">Team plan usage · resets Dec 1</h3>
    <Button size="sm" variant="outline">Upgrade</Button>
  </div>
  <ResourceQuotaGrid
    items={[
      { label: "Seats", used: 21, max: 25, warnAt: 80 },
      { label: "Storage", used: 50, max: 50, format: (n) => \`\${n} GB\` },
      { label: "API requests", used: 41200, max: 100000 },
      { label: "Automations", used: 6, max: 20 },
    ]}
  />
</section>`,
    node: (
      <section className="w-full max-w-2xl space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-fg">Team plan usage · resets Dec 1</h3>
          <Button size="sm" variant="outline">Upgrade</Button>
        </div>
        <ResourceQuotaGrid
          items={[
            { label: "Seats", used: 21, max: 25, warnAt: 80 },
            { label: "Storage", used: 50, max: 50, format: (n) => `${n} GB` },
            { label: "API requests", used: 41200, max: 100000 },
            { label: "Automations", used: 6, max: 20 },
          ]}
        />
      </section>
    ),
  },
  {
    title: "Three across on wide screens",
    description: "Add columns with className when there are many small quotas.",
    code: `<ResourceQuotaGrid
  className="max-w-4xl lg:grid-cols-3"
  items={[
    { label: "Projects", used: 8, max: 10 },
    { label: "Environments", used: 3, max: 5 },
    { label: "Custom domains", used: 2, max: 3 },
  ]}
/>`,
    node: (
      <ResourceQuotaGrid
        className="max-w-4xl lg:grid-cols-3"
        items={[
          { label: "Projects", used: 8, max: 10 },
          { label: "Environments", used: 3, max: 5 },
          { label: "Custom domains", used: 2, max: 3 },
        ]}
      />
    ),
  },
]
