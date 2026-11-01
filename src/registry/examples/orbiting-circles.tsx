import { ArrowRightIcon, BellIcon, CalendarIcon, CloudIcon, CreditCardIcon, DatabaseIcon, FileTextIcon, GitBranchIcon, GlobeIcon, LandmarkIcon, MailIcon, MessageSquareIcon, ReceiptIcon, ShieldIcon, WebhookIcon } from "lucide-react"
import { OrbitingCircles } from "@/registry/premium/orbiting-circles"
import { Button } from "@/registry/ui/button"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Three rings",
    description: "Each ring sets its own radius, lap time and direction; keep the inner radius above 56 so icons clear the centre tile.",
    code: `<OrbitingCircles
  size={296}
  rings={[
    { radius: 56, duration: 14, icons: [MailIcon, BellIcon] },
    { radius: 96, duration: 24, reverse: true, icons: [CalendarIcon, FileTextIcon, ReceiptIcon, LandmarkIcon] },
    { radius: 128, duration: 40, reverse: true, icons: [DatabaseIcon, CloudIcon, GlobeIcon, ShieldIcon, WebhookIcon, CreditCardIcon] },
  ]}
/>`,
    node: (
      <OrbitingCircles
        size={296}
        rings={[
          { radius: 56, duration: 14, icons: [MailIcon, BellIcon] },
          { radius: 96, duration: 24, reverse: true, icons: [CalendarIcon, FileTextIcon, ReceiptIcon, LandmarkIcon] },
          { radius: 128, duration: 40, reverse: true, icons: [DatabaseIcon, CloudIcon, GlobeIcon, ShieldIcon, WebhookIcon, CreditCardIcon] },
        ]}
      />
    ),
  },
  {
    title: "Custom centre",
    description: "center replaces the bolt with your own mark; it sits on the ink tile so a letter or small logo reads well.",
    code: `<OrbitingCircles
  size={260}
  center={<span className="font-mono text-lg font-semibold tracking-[-0.02em]">Lu</span>}
  rings={[{ radius: 100, duration: 20, icons: [GitBranchIcon, MailIcon, MessageSquareIcon, CalendarIcon] }]}
/>`,
    node: (
      <OrbitingCircles
        size={260}
        center={<span className="font-mono text-lg font-semibold tracking-[-0.02em]">Lu</span>}
        rings={[{ radius: 100, duration: 20, icons: [GitBranchIcon, MailIcon, MessageSquareIcon, CalendarIcon] }]}
      />
    ),
  },
  {
    title: "Integrations section",
    description: "Copy on one side and the orbit on the other; the grid stacks on small screens with the orbit centred.",
    code: `<div className="grid w-full max-w-3xl items-center gap-8 md:grid-cols-2">
  <div>
    <p className="text-xs font-medium tracking-[0.06em] text-accent-fg uppercase">Integrations</p>
    <h2 className="mt-2 text-2xl font-medium tracking-[-0.03em] text-fg">Works with the tools Northwind already runs on</h2>
    <p className="mt-3 text-sm leading-[1.6] text-fg-muted">Bank feeds, payroll, your CRM and your inbox all land in Lumen without an export.</p>
    <Button variant="outline" className="mt-5">Browse all 40 integrations <ArrowRightIcon /></Button>
  </div>
  <OrbitingCircles
    size={290}
    className="mx-auto"
    rings={[
      { radius: 60, duration: 16, icons: [MailIcon, CalendarIcon, MessageSquareIcon] },
      { radius: 125, duration: 28, reverse: true, icons: [LandmarkIcon, CreditCardIcon, DatabaseIcon, WebhookIcon, CloudIcon] },
    ]}
  />
</div>`,
    node: (
      <div className="grid w-full max-w-3xl items-center gap-8 md:grid-cols-2">
        <div>
          <p className="text-xs font-medium tracking-[0.06em] text-accent-fg uppercase">Integrations</p>
          <h2 className="mt-2 text-2xl font-medium tracking-[-0.03em] text-fg">Works with the tools Northwind already runs on</h2>
          <p className="mt-3 text-sm leading-[1.6] text-fg-muted">Bank feeds, payroll, your CRM and your inbox all land in Lumen without an export.</p>
          <Button variant="outline" className="mt-5">Browse all 40 integrations <ArrowRightIcon /></Button>
        </div>
        <OrbitingCircles
          size={290}
          className="mx-auto"
          rings={[
            { radius: 60, duration: 16, icons: [MailIcon, CalendarIcon, MessageSquareIcon] },
            { radius: 125, duration: 28, reverse: true, icons: [LandmarkIcon, CreditCardIcon, DatabaseIcon, WebhookIcon, CloudIcon] },
          ]}
        />
      </div>
    ),
  },
]
