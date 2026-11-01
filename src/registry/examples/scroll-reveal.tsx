import { ArrowRightIcon } from "lucide-react"
import { ScrollReveal } from "@/registry/premium/scroll-reveal"
import { Button } from "@/registry/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/registry/ui/card"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Staggered cards",
    description: "Step delay by 80 milliseconds per card and a row of stats rises one after another.",
    code: `<div className="grid w-full max-w-2xl gap-4 sm:grid-cols-3">
  <ScrollReveal>
    <div className="rounded-xl border border-border bg-surface p-4 shadow-raised">
      <p className="text-2xl font-medium tracking-[-0.03em] text-fg tabular-nums">9 days</p>
      <p className="mt-1 text-xs text-fg-muted">sooner paid on average</p>
    </div>
  </ScrollReveal>
  <ScrollReveal delay={0.08}>
    <div className="rounded-xl border border-border bg-surface p-4 shadow-raised">
      <p className="text-2xl font-medium tracking-[-0.03em] text-fg tabular-nums">4,200</p>
      <p className="mt-1 text-xs text-fg-muted">finance teams on Lumen</p>
    </div>
  </ScrollReveal>
  <ScrollReveal delay={0.16}>
    <div className="rounded-xl border border-border bg-surface p-4 shadow-raised">
      <p className="text-2xl font-medium tracking-[-0.03em] text-fg tabular-nums">0</p>
      <p className="mt-1 text-xs text-fg-muted">reminders written by hand</p>
    </div>
  </ScrollReveal>
</div>`,
    node: (
      <div className="grid w-full max-w-2xl gap-4 sm:grid-cols-3">
        <ScrollReveal>
          <div className="rounded-xl border border-border bg-surface p-4 shadow-raised">
            <p className="text-2xl font-medium tracking-[-0.03em] text-fg tabular-nums">9 days</p>
            <p className="mt-1 text-xs text-fg-muted">sooner paid on average</p>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.08}>
          <div className="rounded-xl border border-border bg-surface p-4 shadow-raised">
            <p className="text-2xl font-medium tracking-[-0.03em] text-fg tabular-nums">4,200</p>
            <p className="mt-1 text-xs text-fg-muted">finance teams on Lumen</p>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.16}>
          <div className="rounded-xl border border-border bg-surface p-4 shadow-raised">
            <p className="text-2xl font-medium tracking-[-0.03em] text-fg tabular-nums">0</p>
            <p className="mt-1 text-xs text-fg-muted">reminders written by hand</p>
          </div>
        </ScrollReveal>
      </div>
    ),
  },
  {
    title: "Longer travel",
    description: "y is the distance in pixels the child rises from; 48 reads as a lift, the default 18 as a settle.",
    code: `<ScrollReveal y={48} className="w-full max-w-md">
  <Card>
    <CardHeader>
      <CardTitle>Invoice INV-2041</CardTitle>
      <CardDescription>Northwind Traders · due 28 October</CardDescription>
    </CardHeader>
    <CardContent>
      <p className="text-2xl font-medium tracking-[-0.03em] text-fg tabular-nums">$1,840.00</p>
      <p className="mt-1 text-xs text-fg-muted">Opened by Maya Chen twice this week.</p>
    </CardContent>
  </Card>
</ScrollReveal>`,
    node: (
      <ScrollReveal y={48} className="w-full max-w-md">
        <Card>
          <CardHeader>
            <CardTitle>Invoice INV-2041</CardTitle>
            <CardDescription>Northwind Traders · due 28 October</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-medium tracking-[-0.03em] text-fg tabular-nums">$1,840.00</p>
            <p className="mt-1 text-xs text-fg-muted">Opened by Maya Chen twice this week.</p>
          </CardContent>
        </Card>
      </ScrollReveal>
    ),
  },
  {
    title: "Section copy",
    description: "Wrap a heading block and give the action its own reveal with a small delay, so the eye lands on the title first.",
    code: `<div className="flex max-w-xl flex-col items-center gap-4 px-4 text-center">
  <ScrollReveal>
    <h2 className="text-3xl font-medium tracking-[-0.035em] text-balance text-fg">Nothing to close at month end</h2>
    <p className="mt-3 text-sm leading-[1.6] text-fg-muted">The numbers are already current, the reports already drafted, and the board pack is waiting in your inbox on the first Monday.</p>
  </ScrollReveal>
  <ScrollReveal delay={0.12}>
    <Button variant="outline">See how Northwind does it <ArrowRightIcon /></Button>
  </ScrollReveal>
</div>`,
    node: (
      <div className="flex max-w-xl flex-col items-center gap-4 px-4 text-center">
        <ScrollReveal>
          <h2 className="text-3xl font-medium tracking-[-0.035em] text-balance text-fg">Nothing to close at month end</h2>
          <p className="mt-3 text-sm leading-[1.6] text-fg-muted">The numbers are already current, the reports already drafted, and the board pack is waiting in your inbox on the first Monday.</p>
        </ScrollReveal>
        <ScrollReveal delay={0.12}>
          <Button variant="outline">See how Northwind does it <ArrowRightIcon /></Button>
        </ScrollReveal>
      </div>
    ),
  },
]
