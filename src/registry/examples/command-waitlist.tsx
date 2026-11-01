import { CommandWaitlist } from "@/registry/premium/command-waitlist"
import { DotPattern } from "@/registry/premium/dot-pattern"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Launch section",
    description: "Pair the card with your headline in a two column section; the card keeps its own width and centres on narrow screens.",
    code: `<section className="grid w-full items-center gap-8 lg:grid-cols-2">
  <div className="space-y-3">
    <p className="text-xs font-medium tracking-[0.06em] text-accent-fg uppercase">Lumen 2.0</p>
    <h2 className="text-3xl font-medium tracking-[-0.03em] text-fg">Reconciliation that runs itself</h2>
    <p className="max-w-md text-sm leading-[1.55] text-fg-muted">Bank feeds, card payouts and invoices matched overnight. Early access opens to the waitlist first.</p>
  </div>
  <CommandWaitlist />
</section>`,
    node: (
      <section className="grid w-full items-center gap-8 lg:grid-cols-2">
        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.06em] text-accent-fg uppercase">Lumen 2.0</p>
          <h2 className="text-3xl font-medium tracking-[-0.03em] text-fg">Reconciliation that runs itself</h2>
          <p className="max-w-md text-sm leading-[1.55] text-fg-muted">Bank feeds, card payouts and invoices matched overnight. Early access opens to the waitlist first.</p>
        </div>
        <CommandWaitlist />
      </section>
    ),
  },
  {
    title: "On a dot pattern",
    description: "Place it inside DotPattern with its height set to auto and the panel wraps the card with a faded hairline grid behind it.",
    code: `<DotPattern variant="grid" gap={28} glow={false} className="h-auto px-6 py-12">
  <CommandWaitlist />
</DotPattern>`,
    node: (
      <DotPattern variant="grid" gap={28} glow={false} className="h-auto px-6 py-12">
        <CommandWaitlist />
      </DotPattern>
    ),
  },
  {
    title: "Narrow card",
    description: "className caps the width for a sidebar or a footer slot.",
    code: `<CommandWaitlist className="max-w-sm" />`,
    node: <CommandWaitlist className="max-w-sm" />,
  },
]
