"use client"
import { InlineCodeDiff } from "@/registry/ui/inline-code-diff"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Config change",
    description: "One removed line over one added line. Screen readers hear Removed and Added before each.",
    code: `<InlineCodeDiff className="w-full max-w-md" before="reminderDays: [3, 7]" after="reminderDays: [3, 7, 14]" />`,
    node: <InlineCodeDiff className="w-full max-w-md" before="reminderDays: [3, 7]" after="reminderDays: [3, 7, 14]" />,
  },
  {
    title: "In an agent's proposed fix",
    description: "Pair it with a sentence on why the line changed. For several lines or context use DiffView.",
    code: `<div className="flex w-full max-w-md flex-col gap-2">
  <p className="text-sm text-fg">Totals were rounded before tax was added. Round once, at the end:</p>
  <InlineCodeDiff
    before="const total = Math.round(subtotal) + tax"
    after="const total = Math.round(subtotal + tax)"
  />
</div>`,
    node: (
      <div className="flex w-full max-w-md flex-col gap-2">
        <p className="text-sm text-fg">Totals were rounded before tax was added. Round once, at the end:</p>
        <InlineCodeDiff
          before="const total = Math.round(subtotal) + tax"
          after="const total = Math.round(subtotal + tax)"
        />
      </div>
    ),
  },
]
