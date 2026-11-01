import { TextReveal } from "@/registry/premium/text-reveal"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Custom copy",
    description: "text is split on spaces and each word brightens in turn as the paragraph moves up the viewport.",
    code: `<TextReveal text="Lumen watches every invoice from the moment it leaves: opened, viewed, paid or overdue, with the next step already queued. Nobody on your team writes a chasing email again." />`,
    node: <TextReveal text="Lumen watches every invoice from the moment it leaves: opened, viewed, paid or overdue, with the next step already queued. Nobody on your team writes a chasing email again." />,
  },
  {
    title: "Larger type",
    description: "Size and width come from className; a wider column keeps long sentences to three or four lines.",
    code: `<TextReveal className="max-w-3xl text-3xl sm:text-4xl" text="Most finance tools are assembled. Lumen is drawn: every number, reminder and report placed on purpose." />`,
    node: <TextReveal className="max-w-3xl text-3xl sm:text-4xl" text="Most finance tools are assembled. Lumen is drawn: every number, reminder and report placed on purpose." />,
  },
  {
    title: "With an eyebrow",
    description: "A small label above the paragraph sets the context before the words light up.",
    code: `<div className="w-full max-w-2xl">
  <p className="mb-4 text-xs font-medium tracking-[0.06em] text-accent-fg uppercase">Why Northwind switched</p>
  <TextReveal text="We used to spend the first week of every month closing the last one. Now the numbers are current on the first Monday, and the board pack writes itself." />
</div>`,
    node: (
      <div className="w-full max-w-2xl">
        <p className="mb-4 text-xs font-medium tracking-[0.06em] text-accent-fg uppercase">Why Northwind switched</p>
        <TextReveal text="We used to spend the first week of every month closing the last one. Now the numbers are current on the first Monday, and the board pack writes itself." />
      </div>
    ),
  },
]
