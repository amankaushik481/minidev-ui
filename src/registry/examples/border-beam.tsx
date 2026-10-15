import { CheckIcon } from "lucide-react"
import { BorderBeam } from "@/registry/premium/border-beam"
import { Button } from "@/registry/ui/button"
import { Input } from "@/registry/ui/input"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Around a card",
    description: "Wrap your own card; match its radius to the radius prop and the beam hugs the edge.",
    code: `<BorderBeam radius={16}>
  <div className="w-[320px] max-w-full rounded-[inherit] border border-border bg-surface p-5 shadow-raised">
    <div className="flex items-center justify-between">
      <p className="text-sm font-medium text-fg">Lumen Pro</p>
      <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[11px] font-medium text-accent-fg">Recommended</span>
    </div>
    <p className="mt-3 text-3xl font-medium tracking-[-0.04em] text-fg tabular-nums">$24<span className="text-sm text-fg-muted"> / month</span></p>
    <ul className="mt-4 space-y-2 text-sm text-fg">
      <li className="flex items-center gap-2"><CheckIcon className="size-4 text-accent-fg" /> Unlimited invoices</li>
      <li className="flex items-center gap-2"><CheckIcon className="size-4 text-accent-fg" /> Automatic reminders</li>
      <li className="flex items-center gap-2"><CheckIcon className="size-4 text-accent-fg" /> Priority support</li>
    </ul>
    <Button className="mt-5 w-full">Choose Pro</Button>
  </div>
</BorderBeam>`,
    node: (
      <BorderBeam radius={16}>
        <div className="w-[320px] max-w-full rounded-[inherit] border border-border bg-surface p-5 shadow-raised">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-fg">Lumen Pro</p>
            <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[11px] font-medium text-accent-fg">Recommended</span>
          </div>
          <p className="mt-3 text-3xl font-medium tracking-[-0.04em] text-fg tabular-nums">$24<span className="text-sm text-fg-muted"> / month</span></p>
          <ul className="mt-4 space-y-2 text-sm text-fg">
            <li className="flex items-center gap-2"><CheckIcon className="size-4 text-accent-fg" /> Unlimited invoices</li>
            <li className="flex items-center gap-2"><CheckIcon className="size-4 text-accent-fg" /> Automatic reminders</li>
            <li className="flex items-center gap-2"><CheckIcon className="size-4 text-accent-fg" /> Priority support</li>
          </ul>
          <Button className="mt-5 w-full">Choose Pro</Button>
        </div>
      </BorderBeam>
    ),
  },
  {
    title: "Around an input",
    description: "A thin, fast beam draws the eye to one field, for example the invite box on an empty team page.",
    code: `<BorderBeam radius={10} width={1} duration={3} className="w-72">
  <Input type="email" placeholder="teammate@northwind.com" aria-label="Invite by email" />
</BorderBeam>`,
    node: (
      <BorderBeam radius={10} width={1} duration={3} className="w-72">
        <Input type="email" placeholder="teammate@northwind.com" aria-label="Invite by email" />
      </BorderBeam>
    ),
  },
  {
    title: "Slow and long",
    description: "A longer beam on a slower lap reads as a glow rather than a chase; width thickens the ring.",
    code: `<BorderBeam duration={12} length={0.4} width={2} />`,
    node: <BorderBeam duration={12} length={0.4} width={2} />,
  },
]
