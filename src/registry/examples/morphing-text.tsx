import { ArrowRightIcon } from "lucide-react"
import { MorphingText } from "@/registry/premium/morphing-text"
import { Button } from "@/registry/ui/button"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Custom phrases",
    description: "Pass words in order; the slot reserves the height of the tallest phrase so nothing below it moves.",
    code: `<MorphingText words={["Northwind ships every Friday", "Northwind closes the books in a day", "Northwind never chases an invoice"]} />`,
    node: <MorphingText words={["Northwind ships every Friday", "Northwind closes the books in a day", "Northwind never chases an invoice"]} />,
  },
  {
    title: "Quick cycle",
    description: "interval is the hold in milliseconds and duration the melt in seconds; short words can go faster than sentences.",
    code: `<MorphingText words={["Fast", "Calm", "Precise", "Yours"]} interval={1400} duration={0.6} className="text-5xl sm:text-6xl" />`,
    node: <MorphingText words={["Fast", "Calm", "Precise", "Yours"]} interval={1400} duration={0.6} className="text-5xl sm:text-6xl" />,
  },
  {
    title: "Left aligned in a hero",
    description: "Override the centring and size with className to use the morph as the first line of a left aligned hero.",
    code: `<div className="flex w-full max-w-2xl flex-col items-start gap-5">
  <p className="text-xs font-medium tracking-[0.06em] text-accent-fg uppercase">Lumen for finance teams</p>
  <MorphingText className="mx-0 text-left text-3xl sm:text-4xl" words={["Invoices that close themselves", "Reminders that send themselves", "Books that balance themselves"]} />
  <Button>Start free trial <ArrowRightIcon /></Button>
</div>`,
    node: (
      <div className="flex w-full max-w-2xl flex-col items-start gap-5">
        <p className="text-xs font-medium tracking-[0.06em] text-accent-fg uppercase">Lumen for finance teams</p>
        <MorphingText className="mx-0 text-left text-3xl sm:text-4xl" words={["Invoices that close themselves", "Reminders that send themselves", "Books that balance themselves"]} />
        <Button>Start free trial <ArrowRightIcon /></Button>
      </div>
    ),
  },
]
