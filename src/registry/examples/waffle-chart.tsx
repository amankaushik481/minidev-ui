"use client"
import { WaffleChart } from "@/registry/ui/waffle-chart"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Adoption stats",
    description: "Side by side waffles make two out-of-100 figures easy to compare.",
    code: `<div className="grid w-full max-w-md gap-6 sm:grid-cols-2">
  <WaffleChart label="Invoices paid on time" value={78} />
  <WaffleChart label="Teams using reminders" value={42} />
</div>`,
    node: (
      <div className="grid w-full max-w-md gap-6 sm:grid-cols-2">
        <WaffleChart label="Invoices paid on time" value={78} />
        <WaffleChart label="Teams using reminders" value={42} />
      </div>
    ),
  },
  {
    title: "Scaled from a larger total",
    description: "Keep total at 100 and scale your figure to it; put the real numbers in the label.",
    code: `<WaffleChart className="max-w-[200px]" label="On autopay (2,140 of 5,000 accounts)" value={43} />`,
    node: (
      <WaffleChart className="max-w-[200px]" label="On autopay (2,140 of 5,000 accounts)" value={43} />
    ),
  },
]
