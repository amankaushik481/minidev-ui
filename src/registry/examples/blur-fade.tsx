import { ArrowRightIcon } from "lucide-react"
import { BlurFade } from "@/registry/premium/blur-fade"
import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Staggered list",
    description: "Wrap each row and grow delay per item; the rows arrive one after another as the list scrolls in.",
    code: `<div className="w-full max-w-md divide-y divide-border rounded-xl border border-border bg-surface">
  {[
    { id: "INV-2041", name: "Maya Chen", amount: "$4,200.00", status: "Paid" },
    { id: "INV-2042", name: "Theo Okafor", amount: "$1,850.00", status: "Sent" },
    { id: "INV-2043", name: "Priya Raman", amount: "$12,400.00", status: "Draft" },
  ].map((inv, i) => (
    <BlurFade key={inv.id} delay={i * 0.1}>
      <div className="flex items-center justify-between px-4 py-3 text-sm">
        <span>
          <span className="block font-medium text-fg">{inv.name}</span>
          <span className="font-mono text-xs text-fg-subtle">{inv.id}</span>
        </span>
        <span className="flex items-center gap-3">
          <span className="font-mono text-fg tabular-nums">{inv.amount}</span>
          <Badge variant={inv.status === "Paid" ? "accent" : "outline"}>{inv.status}</Badge>
        </span>
      </div>
    </BlurFade>
  ))}
</div>`,
    node: (
      <div className="w-full max-w-md divide-y divide-border rounded-xl border border-border bg-surface">
        {[
          { id: "INV-2041", name: "Maya Chen", amount: "$4,200.00", status: "Paid" },
          { id: "INV-2042", name: "Theo Okafor", amount: "$1,850.00", status: "Sent" },
          { id: "INV-2043", name: "Priya Raman", amount: "$12,400.00", status: "Draft" },
        ].map((inv, i) => (
          <BlurFade key={inv.id} delay={i * 0.1}>
            <div className="flex items-center justify-between px-4 py-3 text-sm">
              <span>
                <span className="block font-medium text-fg">{inv.name}</span>
                <span className="font-mono text-xs text-fg-subtle">{inv.id}</span>
              </span>
              <span className="flex items-center gap-3">
                <span className="font-mono text-fg tabular-nums">{inv.amount}</span>
                <Badge variant={inv.status === "Paid" ? "accent" : "outline"}>{inv.status}</Badge>
              </span>
            </div>
          </BlurFade>
        ))}
      </div>
    ),
  },
  {
    title: "From the side",
    description: "direction sets where the content travels from; offset is the distance in pixels and blur the starting softness.",
    code: `<BlurFade direction="left" offset={32} blur={12} duration={0.7}>
  <div className="w-80 rounded-2xl border border-border bg-surface p-5 shadow-raised">
    <p className="text-xs font-medium tracking-[0.06em] text-accent-fg uppercase">Lumen 3.0</p>
    <p className="mt-2 text-xl font-medium tracking-[-0.02em] text-fg">Close the books in minutes</p>
    <p className="mt-1 text-sm text-fg-muted">Reconciliation, reminders and receipts, handled overnight.</p>
    <Button variant="outline" size="sm" className="mt-4">See what changed <ArrowRightIcon /></Button>
  </div>
</BlurFade>`,
    node: (
      <BlurFade direction="left" offset={32} blur={12} duration={0.7}>
        <div className="w-80 rounded-2xl border border-border bg-surface p-5 shadow-raised">
          <p className="text-xs font-medium tracking-[0.06em] text-accent-fg uppercase">Lumen 3.0</p>
          <p className="mt-2 text-xl font-medium tracking-[-0.02em] text-fg">Close the books in minutes</p>
          <p className="mt-1 text-sm text-fg-muted">Reconciliation, reminders and receipts, handled overnight.</p>
          <Button variant="outline" size="sm" className="mt-4">See what changed <ArrowRightIcon /></Button>
        </div>
      </BlurFade>
    ),
  },
  {
    title: "Replay on scroll",
    description: "once false reveals again every time the element enters the viewport; amount is how much must be visible first.",
    code: `<BlurFade once={false} amount={0.6} direction="down">
  <p className="max-w-md text-center text-2xl font-medium tracking-[-0.03em] text-balance text-fg">
    Scroll away and back. This headline fades in each time.
  </p>
</BlurFade>`,
    node: (
      <BlurFade once={false} amount={0.6} direction="down">
        <p className="max-w-md text-center text-2xl font-medium tracking-[-0.03em] text-balance text-fg">
          Scroll away and back. This headline fades in each time.
        </p>
      </BlurFade>
    ),
  },
]
