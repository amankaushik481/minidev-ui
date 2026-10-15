import { WordRotate } from "@/registry/premium/word-rotate"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Custom words",
    description: "Pass words and a prefix; the slot keeps the width of the longest word so nothing jumps.",
    code: `<WordRotate prefix="Invoices for" words={["agencies", "consultants", "studios", "freelancers"]} />`,
    node: <WordRotate prefix="Invoices for" words={["agencies", "consultants", "studios", "freelancers"]} />,
  },
  {
    title: "Faster interval",
    description: "interval is the time each word stays in milliseconds; keep it above a second for reading.",
    code: `<WordRotate prefix="Paid in" words={["USD", "EUR", "GBP", "INR", "BRL"]} interval={1200} />`,
    node: <WordRotate prefix="Paid in" words={["USD", "EUR", "GBP", "INR", "BRL"]} interval={1200} />,
  },
  {
    title: "Inside a headline",
    description: "Size it with className and drop the prefix to use the slot in the middle of your own sentence.",
    code: `<h2 className="max-w-md text-center text-2xl font-medium tracking-[-0.03em] text-fg sm:text-3xl">
  Lumen gets your <WordRotate prefix={null} words={["invoices", "reminders", "receipts", "statements"]} className="text-2xl sm:text-3xl" /> out the door
</h2>`,
    node: (
      <h2 className="max-w-md text-center text-2xl font-medium tracking-[-0.03em] text-fg sm:text-3xl">
        Lumen gets your <WordRotate prefix={null} words={["invoices", "reminders", "receipts", "statements"]} className="text-2xl sm:text-3xl" /> out the door
      </h2>
    ),
  },
]
