import { Building2Icon, CheckIcon, SendIcon, ClockIcon } from "lucide-react"
import { Badge } from "@/registry/ui/badge"
import { Marquee } from "@/registry/ui/marquee"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Customer logos",
    description: "Pass the logos as children; the strip duplicates them once so the loop has no seam.",
    code: `<Marquee className="w-full max-w-2xl">
  <span className="flex items-center gap-2 font-medium text-fg"><Building2Icon className="size-4" /> Northwind</span>
  <span className="flex items-center gap-2 font-medium text-fg"><Building2Icon className="size-4" /> Atlas Freight</span>
  <span className="flex items-center gap-2 font-medium text-fg"><Building2Icon className="size-4" /> Cadence Labs</span>
  <span className="flex items-center gap-2 font-medium text-fg"><Building2Icon className="size-4" /> Forma Studio</span>
  <span className="flex items-center gap-2 font-medium text-fg"><Building2Icon className="size-4" /> Hale and Co</span>
  <span className="flex items-center gap-2 font-medium text-fg"><Building2Icon className="size-4" /> Kura Health</span>
</Marquee>`,
    node: (
      <Marquee className="w-full max-w-2xl">
        <span className="flex items-center gap-2 font-medium text-fg"><Building2Icon className="size-4" /> Northwind</span>
        <span className="flex items-center gap-2 font-medium text-fg"><Building2Icon className="size-4" /> Atlas Freight</span>
        <span className="flex items-center gap-2 font-medium text-fg"><Building2Icon className="size-4" /> Cadence Labs</span>
        <span className="flex items-center gap-2 font-medium text-fg"><Building2Icon className="size-4" /> Forma Studio</span>
        <span className="flex items-center gap-2 font-medium text-fg"><Building2Icon className="size-4" /> Hale and Co</span>
        <span className="flex items-center gap-2 font-medium text-fg"><Building2Icon className="size-4" /> Kura Health</span>
      </Marquee>
    ),
  },
  {
    title: "Activity ticker",
    description: "Short status lines with a badge each make a live feed for a dashboard header.",
    code: `<Marquee className="w-full max-w-2xl">
  <span className="flex items-center gap-2"><Badge variant="accent"><CheckIcon /> Paid</Badge> INV-2041, Northwind Traders, $1,840</span>
  <span className="flex items-center gap-2"><Badge variant="outline"><SendIcon /> Sent</Badge> INV-2042, Maya Chen, $620</span>
  <span className="flex items-center gap-2"><Badge variant="destructive"><ClockIcon /> Overdue</Badge> INV-2038, Theo Okafor, $2,415</span>
  <span className="flex items-center gap-2"><Badge variant="accent"><CheckIcon /> Paid</Badge> INV-2037, Priya Raman, $980</span>
</Marquee>`,
    node: (
      <Marquee className="w-full max-w-2xl">
        <span className="flex items-center gap-2"><Badge variant="accent"><CheckIcon /> Paid</Badge> INV-2041, Northwind Traders, $1,840</span>
        <span className="flex items-center gap-2"><Badge variant="outline"><SendIcon /> Sent</Badge> INV-2042, Maya Chen, $620</span>
        <span className="flex items-center gap-2"><Badge variant="destructive"><ClockIcon /> Overdue</Badge> INV-2038, Theo Okafor, $2,415</span>
        <span className="flex items-center gap-2"><Badge variant="accent"><CheckIcon /> Paid</Badge> INV-2037, Priya Raman, $980</span>
      </Marquee>
    ),
  },
  {
    title: "Bare strip",
    description: "Drop the borders and background with className for a strip that sits inside another surface.",
    code: `<div className="w-full max-w-2xl rounded-xl border border-border bg-surface py-4 shadow-raised">
  <p className="px-4 text-xs font-medium tracking-[0.06em] text-fg-subtle uppercase">Trusted by</p>
  <Marquee className="mt-2 border-0 bg-transparent py-1">
    <span className="text-fg-muted">Northwind</span>
    <span className="text-fg-muted">Atlas Freight</span>
    <span className="text-fg-muted">Cadence Labs</span>
    <span className="text-fg-muted">Forma Studio</span>
    <span className="text-fg-muted">Hale and Co</span>
    <span className="text-fg-muted">Kura Health</span>
    <span className="text-fg-muted">Ponte Bank</span>
    <span className="text-fg-muted">Relay</span>
  </Marquee>
</div>`,
    node: (
      <div className="w-full max-w-2xl rounded-xl border border-border bg-surface py-4 shadow-raised">
        <p className="px-4 text-xs font-medium tracking-[0.06em] text-fg-subtle uppercase">Trusted by</p>
        <Marquee className="mt-2 border-0 bg-transparent py-1">
          <span className="text-fg-muted">Northwind</span>
          <span className="text-fg-muted">Atlas Freight</span>
          <span className="text-fg-muted">Cadence Labs</span>
          <span className="text-fg-muted">Forma Studio</span>
          <span className="text-fg-muted">Hale and Co</span>
          <span className="text-fg-muted">Kura Health</span>
          <span className="text-fg-muted">Ponte Bank</span>
          <span className="text-fg-muted">Relay</span>
        </Marquee>
      </div>
    ),
  },
]
