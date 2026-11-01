import { ArrowRightIcon } from "lucide-react"
import { StackRevealStory } from "@/registry/premium/stack-reveal-story"
import { Button } from "@/registry/ui/button"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Wider column",
    description: "The stack is capped at max-w-md; raise it with className when it has a column to itself.",
    code: `<StackRevealStory className="w-full max-w-lg" />`,
    node: <StackRevealStory className="w-full max-w-lg" />,
  },
  {
    title: "Beside copy",
    description: "Pair the stack with a heading and an action; the cards overlap from md up and list in a column below it.",
    code: `<div className="grid w-full max-w-3xl items-center gap-8 md:grid-cols-2">
  <div>
    <p className="text-xs font-medium tracking-[0.06em] text-accent-fg uppercase">What you get</p>
    <h2 className="mt-2 text-2xl font-medium tracking-[-0.03em] text-fg">A kit, the launch moments, and a showcase</h2>
    <p className="mt-3 text-sm leading-[1.6] text-fg-muted">Everything Northwind needed to ship a product site in a week, without hiring a motion designer.</p>
    <Button variant="outline" className="mt-5">Browse the kit <ArrowRightIcon /></Button>
  </div>
  <StackRevealStory />
</div>`,
    node: (
      <div className="grid w-full max-w-3xl items-center gap-8 md:grid-cols-2">
        <div>
          <p className="text-xs font-medium tracking-[0.06em] text-accent-fg uppercase">What you get</p>
          <h2 className="mt-2 text-2xl font-medium tracking-[-0.03em] text-fg">A kit, the launch moments, and a showcase</h2>
          <p className="mt-3 text-sm leading-[1.6] text-fg-muted">Everything Northwind needed to ship a product site in a week, without hiring a motion designer.</p>
          <Button variant="outline" className="mt-5">Browse the kit <ArrowRightIcon /></Button>
        </div>
        <StackRevealStory />
      </div>
    ),
  },
]
