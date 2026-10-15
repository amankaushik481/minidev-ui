import { DonutChart } from "@/registry/ui/donut-chart"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Values",
    description: "value is read as a percentage of max, which defaults to 100; the number sits in the centre.",
    code: `<DonutChart value={24} label="Onboarding" />
<DonutChart value={64} label="Storage used" />
<DonutChart value={92} label="Invoices paid" />`,
    node: (
      <div className="flex flex-wrap items-center gap-6">
        <DonutChart value={24} label="Onboarding" />
        <DonutChart value={64} label="Storage used" />
        <DonutChart value={92} label="Invoices paid" />
      </div>
    ),
  },
  {
    title: "Custom max",
    description: "Pass max to chart a count against a limit; the ring shows the share and the label names it.",
    code: `<DonutChart value={340} max={500} label="Seats used" />`,
    node: <DonutChart value={340} max={500} label="Seats used" />,
  },
  {
    title: "Sizes",
    description: "The chart scales with its className; the ring stays proportional at any size.",
    code: `<DonutChart value={72} label="Small" className="size-16" />
<DonutChart value={72} label="Default" />
<DonutChart value={72} label="Large" className="size-32" />`,
    node: (
      <div className="flex flex-wrap items-center gap-6">
        <DonutChart value={72} label="Small" className="size-16" />
        <DonutChart value={72} label="Default" />
        <DonutChart value={72} label="Large" className="size-32" />
      </div>
    ),
  },
  {
    title: "With a caption",
    description: "Put the chart beside the figures it summarises; the label keeps the chart itself accessible.",
    code: `<div className="flex items-center gap-4 rounded-xl border border-border bg-surface p-4 shadow-raised">
  <DonutChart value={64} label="Storage used" className="size-20" />
  <div>
    <p className="text-sm font-medium text-fg">Storage</p>
    <p className="text-xs text-fg-muted">64 GB of 100 GB used</p>
    <p className="mt-1 text-xs text-fg-subtle">Upgrade for 1 TB</p>
  </div>
</div>`,
    node: (
      <div className="flex items-center gap-4 rounded-xl border border-border bg-surface p-4 shadow-raised">
        <DonutChart value={64} label="Storage used" className="size-20" />
        <div>
          <p className="text-sm font-medium text-fg">Storage</p>
          <p className="text-xs text-fg-muted">64 GB of 100 GB used</p>
          <p className="mt-1 text-xs text-fg-subtle">Upgrade for 1 TB</p>
        </div>
      </div>
    ),
  },
]
