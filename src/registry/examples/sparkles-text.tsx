import { SparklesText } from "@/registry/premium/sparkles-text"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Custom text",
    description: "The text is a normal text node; stars are decorative and hidden from assistive tech.",
    code: `<SparklesText>Lumen 3.0 is here</SparklesText>`,
    node: <SparklesText>Lumen 3.0 is here</SparklesText>,
  },
  {
    title: "More stars, smaller text",
    description: "count is how many stars are alive at once; size the text with className.",
    code: `<SparklesText count={16} className="text-2xl sm:text-3xl">Autopilot for invoices</SparklesText>`,
    node: <SparklesText count={16} className="text-2xl sm:text-3xl">Autopilot for invoices</SparklesText>,
  },
  {
    title: "Inside a headline",
    description: "Match the headline's size and weight with className to sparkle one phrase in a longer line.",
    code: `<h2 className="max-w-lg px-4 text-center text-3xl font-medium tracking-[-0.035em] text-fg sm:text-4xl">
  Close the books with <SparklesText count={6} className="text-3xl font-medium sm:text-4xl">zero chasing</SparklesText>
</h2>`,
    node: (
      <h2 className="max-w-lg px-4 text-center text-3xl font-medium tracking-[-0.035em] text-fg sm:text-4xl">
        Close the books with <SparklesText count={6} className="text-3xl font-medium sm:text-4xl">zero chasing</SparklesText>
      </h2>
    ),
  },
]
