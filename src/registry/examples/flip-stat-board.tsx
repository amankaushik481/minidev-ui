import { FlipStatBoard } from "@/registry/premium/flip-stat-board"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Custom stats",
    description: "stats takes a value and a label per cell; each counts up to its value as the board scrolls into view.",
    code: `<FlipStatBoard
  stats={[
    { value: 12840, label: "Invoices sent this quarter" },
    { value: 4200, label: "Companies on Lumen" },
    { value: 9, label: "Days sooner customers pay" },
  ]}
  className="w-full"
/>`,
    node: (
      <FlipStatBoard
        stats={[
          { value: 12840, label: "Invoices sent this quarter" },
          { value: 4200, label: "Companies on Lumen" },
          { value: 9, label: "Days sooner customers pay" },
        ]}
        className="w-full"
      />
    ),
  },
  {
    title: "Four across",
    description: "Override the column count with className when you have more or fewer cells than three.",
    code: `<FlipStatBoard
  stats={[
    { value: 1284, label: "Deploys this week" },
    { value: 99, label: "Uptime, percent" },
    { value: 42, label: "Days since last incident" },
    { value: 6, label: "Regions" },
  ]}
  className="w-full sm:grid-cols-2 lg:grid-cols-4"
/>`,
    node: (
      <FlipStatBoard
        stats={[
          { value: 1284, label: "Deploys this week" },
          { value: 99, label: "Uptime, percent" },
          { value: 42, label: "Days since last incident" },
          { value: 6, label: "Regions" },
        ]}
        className="w-full sm:grid-cols-2 lg:grid-cols-4"
      />
    ),
  },
]
