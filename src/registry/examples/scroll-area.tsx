import { Badge } from "@/registry/ui/badge"
import { ScrollArea, ScrollBar } from "@/registry/ui/scroll-area"
import { Separator } from "@/registry/ui/separator"
import type { Example } from "./types"

const DEPLOYS = Array.from({ length: 14 }, (_, i) => ({
  version: "v2." + (14 - i) + ".0",
  by: ["Maya Chen", "Theo Okafor", "Priya Raman", "Sam Lowe"][i % 4],
  when: i + 1 + "d ago",
}))

const CUSTOMERS = ["Northwind Traders", "Blue Harbor Co.", "Helix Biotech", "Meridian Freight", "Granite Peak Outfitters", "Summit Dental Group", "Cobalt Systems", "Juniper Studio"]

export const examples: Example[] = [
  {
    title: "Vertical list",
    description: "Give the area a fixed height and let the content overflow; the thin thumb appears on hover.",
    code: `const DEPLOYS = Array.from({ length: 14 }, (_, i) => ({
  version: "v2." + (14 - i) + ".0",
  by: ["Maya Chen", "Theo Okafor", "Priya Raman", "Sam Lowe"][i % 4],
  when: i + 1 + "d ago",
}))

<ScrollArea className="h-64 w-72 rounded-xl border border-border bg-surface">
  <div className="p-3">
    <p className="mb-2 px-1 text-xs font-medium text-fg-muted">Deploys</p>
    {DEPLOYS.map((d) => (
      <div key={d.version} className="flex items-center justify-between rounded-lg px-1 py-1.5 text-sm">
        <span className="font-mono text-xs text-fg">{d.version}</span>
        <span className="text-xs text-fg-muted">{d.by} · {d.when}</span>
      </div>
    ))}
  </div>
</ScrollArea>`,
    node: (
      <ScrollArea className="h-64 w-72 rounded-xl border border-border bg-surface">
        <div className="p-3">
          <p className="mb-2 px-1 text-xs font-medium text-fg-muted">Deploys</p>
          {DEPLOYS.map((d) => (
            <div key={d.version} className="flex items-center justify-between rounded-lg px-1 py-1.5 text-sm">
              <span className="font-mono text-xs text-fg">{d.version}</span>
              <span className="text-xs text-fg-muted">{d.by} · {d.when}</span>
            </div>
          ))}
        </div>
      </ScrollArea>
    ),
  },
  {
    title: "Horizontal",
    description: "Lay the content out in a row that is wider than the area and add a horizontal ScrollBar.",
    code: `const CUSTOMERS = ["Northwind Traders", "Blue Harbor Co.", "Helix Biotech", "Meridian Freight", "Granite Peak Outfitters", "Summit Dental Group", "Cobalt Systems", "Juniper Studio"]

<ScrollArea className="w-full max-w-md rounded-xl border border-border bg-surface">
  <div className="flex w-max gap-3 p-3">
    {CUSTOMERS.map((name) => (
      <div key={name} className="w-40 shrink-0 rounded-lg border border-border bg-bg p-3">
        <p className="truncate text-sm font-medium text-fg">{name}</p>
        <p className="mt-1 text-xs text-fg-muted">2 open invoices</p>
      </div>
    ))}
  </div>
  <ScrollBar orientation="horizontal" />
</ScrollArea>`,
    node: (
      <ScrollArea className="w-full max-w-md rounded-xl border border-border bg-surface">
        <div className="flex w-max gap-3 p-3">
          {CUSTOMERS.map((name) => (
            <div key={name} className="w-40 shrink-0 rounded-lg border border-border bg-bg p-3">
              <p className="truncate text-sm font-medium text-fg">{name}</p>
              <p className="mt-1 text-xs text-fg-muted">2 open invoices</p>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    ),
  },
  {
    title: "List with separators",
    description: "A compact picker list; Separator between rows keeps the hairline rhythm inside the viewport.",
    code: `<ScrollArea className="h-48 w-56 rounded-xl border border-border bg-surface">
  <div className="p-2">
    {CUSTOMERS.map((name, i) => (
      <div key={name}>
        {i > 0 ? <Separator className="my-1" /> : null}
        <div className="flex items-center justify-between px-2 py-1.5 text-sm text-fg">
          <span className="truncate">{name}</span>
          {i % 3 === 0 ? <Badge variant="accent">New</Badge> : null}
        </div>
      </div>
    ))}
  </div>
</ScrollArea>`,
    node: (
      <ScrollArea className="h-48 w-56 rounded-xl border border-border bg-surface">
        <div className="p-2">
          {CUSTOMERS.map((name, i) => (
            <div key={name}>
              {i > 0 ? <Separator className="my-1" /> : null}
              <div className="flex items-center justify-between px-2 py-1.5 text-sm text-fg">
                <span className="truncate">{name}</span>
                {i % 3 === 0 ? <Badge variant="accent">New</Badge> : null}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    ),
  },
]
