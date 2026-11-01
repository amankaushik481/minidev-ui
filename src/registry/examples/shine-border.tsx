import { ArrowRightIcon, CheckIcon, SparklesIcon } from "lucide-react"
import { ShineBorder } from "@/registry/premium/shine-border"
import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Your colours",
    description: "colors fill the band in order; give the child rounded-[inherit] so its corners follow the radius prop.",
    code: `<ShineBorder colors={["var(--success)", "var(--info)"]} radius={16}>
  <div className="w-[320px] max-w-full rounded-[inherit] bg-surface p-5 shadow-raised">
    <div className="flex items-center justify-between">
      <p className="text-sm font-medium text-fg">Lumen Pro</p>
      <Badge variant="accent">Recommended</Badge>
    </div>
    <p className="mt-3 text-3xl font-medium tracking-[-0.04em] text-fg tabular-nums">$24<span className="text-sm text-fg-muted"> / month</span></p>
    <ul className="mt-4 space-y-2 text-sm text-fg">
      <li className="flex items-center gap-2"><CheckIcon className="size-4 text-success" /> Unlimited invoices</li>
      <li className="flex items-center gap-2"><CheckIcon className="size-4 text-success" /> Bank reconciliation</li>
      <li className="flex items-center gap-2"><CheckIcon className="size-4 text-success" /> Priority support</li>
    </ul>
    <Button className="mt-5 w-full">Choose Pro</Button>
  </div>
</ShineBorder>`,
    node: (
      <ShineBorder colors={["var(--success)", "var(--info)"]} radius={16}>
        <div className="w-[320px] max-w-full rounded-[inherit] bg-surface p-5 shadow-raised">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-fg">Lumen Pro</p>
            <Badge variant="accent">Recommended</Badge>
          </div>
          <p className="mt-3 text-3xl font-medium tracking-[-0.04em] text-fg tabular-nums">$24<span className="text-sm text-fg-muted"> / month</span></p>
          <ul className="mt-4 space-y-2 text-sm text-fg">
            <li className="flex items-center gap-2"><CheckIcon className="size-4 text-success" /> Unlimited invoices</li>
            <li className="flex items-center gap-2"><CheckIcon className="size-4 text-success" /> Bank reconciliation</li>
            <li className="flex items-center gap-2"><CheckIcon className="size-4 text-success" /> Priority support</li>
          </ul>
          <Button className="mt-5 w-full">Choose Pro</Button>
        </div>
      </ShineBorder>
    ),
  },
  {
    title: "Thick and fast",
    description: "borderWidth thickens the ring and a short duration makes the band chase; good for one announcement, not a grid of cards.",
    code: `<ShineBorder borderWidth={4} duration={3} radius={24}>
  <div className="flex w-[360px] max-w-full items-center gap-4 rounded-[inherit] bg-surface p-5 shadow-raised">
    <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-ink text-on-ink"><SparklesIcon className="size-5" /></div>
    <div className="min-w-0">
      <p className="text-sm font-medium text-fg">Autopilot is live</p>
      <p className="text-xs text-fg-muted">Lumen now matches payments to invoices on its own.</p>
    </div>
  </div>
</ShineBorder>`,
    node: (
      <ShineBorder borderWidth={4} duration={3} radius={24}>
        <div className="flex w-[360px] max-w-full items-center gap-4 rounded-[inherit] bg-surface p-5 shadow-raised">
          <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-ink text-on-ink"><SparklesIcon className="size-5" /></div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-fg">Autopilot is live</p>
            <p className="text-xs text-fg-muted">Lumen now matches payments to invoices on its own.</p>
          </div>
        </div>
      </ShineBorder>
    ),
  },
  {
    title: "Around a button",
    description: "Match radius to the button's corner (10px for the lg size) and a thin ring makes the one action on the page glow.",
    code: `<ShineBorder radius={10} borderWidth={1.5} duration={4}>
  <Button size="lg" variant="outline">Upgrade to Pro <ArrowRightIcon /></Button>
</ShineBorder>`,
    node: (
      <ShineBorder radius={10} borderWidth={1.5} duration={4}>
        <Button size="lg" variant="outline">Upgrade to Pro <ArrowRightIcon /></Button>
      </ShineBorder>
    ),
  },
]
