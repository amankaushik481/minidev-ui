"use client"
import { PressQuote } from "@/registry/ui/press-quote"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Single line of coverage",
    description: "Pass the article URL as cite; it is set on the blockquote for machines and is not shown on the page.",
    code: `<PressQuote
  className="w-full max-w-xl"
  quote="Lumen is the first invoicing tool we have seen that treats reconciliation as the main job."
  source="The Ledger Review"
  cite="https://example.com/ledger-review/lumen"
/>`,
    node: (
      <PressQuote
        className="w-full max-w-xl"
        quote="Lumen is the first invoicing tool we have seen that treats reconciliation as the main job."
        source="The Ledger Review"
        cite="https://example.com/ledger-review/lumen"
      />
    ),
  },
  {
    title: "Press row",
    description: "Two or three short quotes side by side; keep each to one sentence so the cards stay a similar height.",
    code: `<div className="grid w-full gap-3 sm:grid-cols-2">
  <PressQuote quote="Month-end close, minus the spreadsheets." source="Finance Weekly" />
  <PressQuote quote="Quietly the best approvals flow in the category." source="Ops Notes" />
</div>`,
    node: (
      <div className="grid w-full gap-3 sm:grid-cols-2">
        <PressQuote quote="Month-end close, minus the spreadsheets." source="Finance Weekly" />
        <PressQuote quote="Quietly the best approvals flow in the category." source="Ops Notes" />
      </div>
    ),
  },
]
