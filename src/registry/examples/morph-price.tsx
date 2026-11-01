import { CheckIcon } from "lucide-react"
import { MorphPrice } from "@/registry/premium/morph-price"
import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Wide card",
    description: "The card is as wide as its content by default; give it a width with className to line it up with a pricing grid.",
    code: `<MorphPrice className="w-full max-w-md" />`,
    node: <MorphPrice className="w-full max-w-md" />,
  },
  {
    title: "Inside a plan card",
    description: "Strip the border, background and padding with className and the toggle and price sit inside your own plan card.",
    code: `<div className="w-full max-w-sm rounded-2xl border border-border bg-surface p-6 shadow-raised">
  <div className="flex items-center justify-between">
    <p className="text-sm font-medium text-fg">Lumen Pro</p>
    <Badge variant="accent">Most popular</Badge>
  </div>
  <MorphPrice className="mt-4 border-0 bg-transparent p-0" />
  <ul className="mt-6 space-y-2 text-sm text-fg">
    <li className="flex items-center gap-2"><CheckIcon className="size-4 text-accent-fg" /> Unlimited invoices</li>
    <li className="flex items-center gap-2"><CheckIcon className="size-4 text-accent-fg" /> Automatic reminders</li>
    <li className="flex items-center gap-2"><CheckIcon className="size-4 text-accent-fg" /> Bank reconciliation</li>
  </ul>
  <Button className="mt-6 w-full">Choose Pro</Button>
</div>`,
    node: (
      <div className="w-full max-w-sm rounded-2xl border border-border bg-surface p-6 shadow-raised">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-fg">Lumen Pro</p>
          <Badge variant="accent">Most popular</Badge>
        </div>
        <MorphPrice className="mt-4 border-0 bg-transparent p-0" />
        <ul className="mt-6 space-y-2 text-sm text-fg">
          <li className="flex items-center gap-2"><CheckIcon className="size-4 text-accent-fg" /> Unlimited invoices</li>
          <li className="flex items-center gap-2"><CheckIcon className="size-4 text-accent-fg" /> Automatic reminders</li>
          <li className="flex items-center gap-2"><CheckIcon className="size-4 text-accent-fg" /> Bank reconciliation</li>
        </ul>
        <Button className="mt-6 w-full">Choose Pro</Button>
      </div>
    ),
  },
]
