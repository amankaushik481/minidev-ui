import { ArrowRightIcon } from "lucide-react"
import { IconCloud } from "@/registry/premium/icon-cloud"
import { Button } from "@/registry/ui/button"
import type { Example } from "./types"

const CURRENCIES = ["USD", "EUR", "GBP", "INR", "BRL", "JPY", "CAD", "AUD", "CHF", "SGD", "MXN", "SEK", "NOK", "NZD", "ZAR", "AED"]

export const examples: Example[] = [
  {
    title: "Text tiles",
    description: "Children replace the icons; any small node works, here the currencies Lumen settles in, on a smaller sphere.",
    code: `const CURRENCIES = ["USD", "EUR", "GBP", "INR", "BRL", "JPY", "CAD", "AUD", "CHF", "SGD", "MXN", "SEK", "NOK", "NZD", "ZAR", "AED"]

<IconCloud size={300} itemSize={52}>
  {CURRENCIES.map((c) => (
    <span key={c} className="font-mono text-xs font-medium tracking-[0.04em]">{c}</span>
  ))}
</IconCloud>`,
    node: (
      <IconCloud size={300} itemSize={52}>
        {CURRENCIES.map((c) => (
          <span key={c} className="font-mono text-xs font-medium tracking-[0.04em]">{c}</span>
        ))}
      </IconCloud>
    ),
  },
  {
    title: "Beside a headline",
    description: "A faster, hands off sphere makes a hero visual; interactive false also removes it from the tab order.",
    code: `<section className="grid w-full items-center gap-8 lg:grid-cols-2">
  <div className="space-y-4">
    <p className="text-xs font-medium tracking-[0.06em] text-accent-fg uppercase">Integrations</p>
    <h2 className="text-3xl font-medium tracking-[-0.03em] text-fg">Lumen talks to the tools Northwind already runs</h2>
    <p className="max-w-md text-sm leading-[1.55] text-fg-muted">Thirty native connectors, webhooks for the rest, and an API that mirrors the app.</p>
    <Button variant="outline">Browse integrations <ArrowRightIcon /></Button>
  </div>
  <IconCloud size={320} speed={1.6} interactive={false} />
</section>`,
    node: (
      <section className="grid w-full items-center gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <p className="text-xs font-medium tracking-[0.06em] text-accent-fg uppercase">Integrations</p>
          <h2 className="text-3xl font-medium tracking-[-0.03em] text-fg">Lumen talks to the tools Northwind already runs</h2>
          <p className="max-w-md text-sm leading-[1.55] text-fg-muted">Thirty native connectors, webhooks for the rest, and an API that mirrors the app.</p>
          <Button variant="outline">Browse integrations <ArrowRightIcon /></Button>
        </div>
        <IconCloud size={320} speed={1.6} interactive={false} />
      </section>
    ),
  },
  {
    title: "Still until dragged",
    description: "speed 0 holds the sphere until someone drags it or presses an arrow key; it then coasts to a stop on its own.",
    code: `<IconCloud speed={0} size={280} itemSize={40} />`,
    node: <IconCloud speed={0} size={280} itemSize={40} />,
  },
]
