import { ArrowUpRightIcon } from "lucide-react"
import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"
import { TiltCard } from "@/registry/premium/tilt-card"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Custom content",
    description: "Any children work; here a customer card with the figure and the action on their own layers.",
    code: `<TiltCard>
  <div data-depth="0.5" className="flex items-center justify-between">
    <span className="text-sm font-medium text-fg">Northwind Traders</span>
    <Badge variant="accent">Pro</Badge>
  </div>
  <p data-depth="1" className="mt-5 text-3xl font-medium tracking-[-0.03em] text-fg tabular-nums">$4,120.00</p>
  <p className="mt-1 text-sm text-fg-muted">Outstanding across 3 invoices</p>
  <div data-depth="1.2" className="mt-6">
    <Button variant="outline" className="w-full">Open customer <ArrowUpRightIcon /></Button>
  </div>
</TiltCard>`,
    node: (
      <TiltCard>
        <div data-depth="0.5" className="flex items-center justify-between">
          <span className="text-sm font-medium text-fg">Northwind Traders</span>
          <Badge variant="accent">Pro</Badge>
        </div>
        <p data-depth="1" className="mt-5 text-3xl font-medium tracking-[-0.03em] text-fg tabular-nums">$4,120.00</p>
        <p className="mt-1 text-sm text-fg-muted">Outstanding across 3 invoices</p>
        <div data-depth="1.2" className="mt-6">
          <Button variant="outline" className="w-full">Open customer <ArrowUpRightIcon /></Button>
        </div>
      </TiltCard>
    ),
  },
  {
    title: "Subtle tilt",
    description: "Lower maxTilt and glare for cards in a grid, where a strong effect would fight the content.",
    code: `<TiltCard maxTilt={5} glare={0.25} parallax={4} />`,
    node: <TiltCard maxTilt={5} glare={0.25} parallax={4} />,
  },
  {
    title: "Deep parallax",
    description: "A short perspective and a big parallax value make the layers float well clear of the card.",
    code: `<TiltCard perspective={600} parallax={24} className="w-72">
  <p data-depth="0.4" className="text-xs font-medium tracking-[0.06em] text-accent-fg uppercase">Lumen 3.0</p>
  <p data-depth="1" className="mt-3 text-2xl font-medium tracking-[-0.03em] text-fg">Invoices that close themselves</p>
  <p data-depth="0.6" className="mt-2 text-sm text-fg-muted">Reminders, receipts and reconciliation, handled.</p>
</TiltCard>`,
    node: (
      <TiltCard perspective={600} parallax={24} className="w-72">
        <p data-depth="0.4" className="text-xs font-medium tracking-[0.06em] text-accent-fg uppercase">Lumen 3.0</p>
        <p data-depth="1" className="mt-3 text-2xl font-medium tracking-[-0.03em] text-fg">Invoices that close themselves</p>
        <p data-depth="0.6" className="mt-2 text-sm text-fg-muted">Reminders, receipts and reconciliation, handled.</p>
      </TiltCard>
    ),
  },
]
