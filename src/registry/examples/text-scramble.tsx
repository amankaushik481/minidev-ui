import { TextScramble } from "@/registry/premium/text-scramble"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Custom text",
    description: "Letters resolve left to right the first time the text scrolls into view; spaces are never scrambled.",
    code: `<TextScramble text="NORTHWIND Q3 REPORT" />`,
    node: <TextScramble text="NORTHWIND Q3 REPORT" />,
  },
  {
    title: "Proportional type",
    description: "Swap the mono face and tracking with className; lower case settles from upper case glyphs, which reads as decoding.",
    code: `<TextScramble text="Invoices that close themselves" className="font-sans text-3xl tracking-[-0.03em] sm:text-4xl" />`,
    node: <TextScramble text="Invoices that close themselves" className="font-sans text-3xl tracking-[-0.03em] sm:text-4xl" />,
  },
  {
    title: "As a status label",
    description: "Small, wide tracked and in the success colour, the scramble makes a quiet reveal for a status line.",
    code: `<div className="flex flex-col items-center gap-3 text-center">
  <TextScramble text="ALL SYSTEMS OPERATIONAL" className="text-xs tracking-[0.18em] text-success sm:text-xs" />
  <p className="text-3xl font-medium tracking-[-0.035em] text-fg">Lumen status</p>
</div>`,
    node: (
      <div className="flex flex-col items-center gap-3 text-center">
        <TextScramble text="ALL SYSTEMS OPERATIONAL" className="text-xs tracking-[0.18em] text-success sm:text-xs" />
        <p className="text-3xl font-medium tracking-[-0.035em] text-fg">Lumen status</p>
      </div>
    ),
  },
]
