import { Avatar, AvatarFallback } from "@/registry/ui/avatar"
import { Badge } from "@/registry/ui/badge"
import { HoverCard } from "@/registry/ui/hover-card"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Person preview",
    description: "Hovering a name shows who they are; the trigger stays a plain link so it reads well without the card.",
    code: `<div className="text-sm text-fg-muted">
  Assigned to{" "}
  <HoverCard
    trigger={<a href="#maya" className="font-medium text-fg underline decoration-border underline-offset-4">Maya Chen</a>}
  >
    <div className="flex items-center gap-3">
      <Avatar><AvatarFallback>MC</AvatarFallback></Avatar>
      <div>
        <p className="font-medium text-fg">Maya Chen</p>
        <p className="text-xs text-fg-muted">Finance lead · Northwind</p>
      </div>
    </div>
    <p className="mt-2 text-xs text-fg-muted">Approves invoices over $10,000. Usually replies within a day.</p>
  </HoverCard>
</div>`,
    node: (
      <div className="pb-32">
        <div className="text-sm text-fg-muted">
          Assigned to{" "}
          <HoverCard
            trigger={<a href="#maya" className="font-medium text-fg underline decoration-border underline-offset-4">Maya Chen</a>}
          >
            <div className="flex items-center gap-3">
              <Avatar><AvatarFallback>MC</AvatarFallback></Avatar>
              <div>
                <p className="font-medium text-fg">Maya Chen</p>
                <p className="text-xs text-fg-muted">Finance lead · Northwind</p>
              </div>
            </div>
            <p className="mt-2 text-xs text-fg-muted">Approves invoices over $10,000. Usually replies within a day.</p>
          </HoverCard>
        </div>
      </div>
    ),
  },
  {
    title: "Record details",
    description: "A badge as the trigger and a wider card with a definition list of the record behind it.",
    code: `<HoverCard trigger={<Badge variant="outline">INV-2041</Badge>} className="w-72">
  <div className="flex items-center justify-between">
    <p className="font-medium text-fg">Invoice INV-2041</p>
    <Badge variant="accent">Open</Badge>
  </div>
  <dl className="mt-2 grid grid-cols-2 gap-y-1 text-xs">
    <dt className="text-fg-muted">Customer</dt><dd className="text-fg">Northwind Traders</dd>
    <dt className="text-fg-muted">Amount</dt><dd className="tabular-nums text-fg">$12,400.00</dd>
    <dt className="text-fg-muted">Due</dt><dd className="text-fg">Oct 24, 2026</dd>
  </dl>
</HoverCard>`,
    node: (
      <div className="pb-36">
        <HoverCard trigger={<Badge variant="outline">INV-2041</Badge>} className="w-72">
          <div className="flex items-center justify-between">
            <p className="font-medium text-fg">Invoice INV-2041</p>
            <Badge variant="accent">Open</Badge>
          </div>
          <dl className="mt-2 grid grid-cols-2 gap-y-1 text-xs">
            <dt className="text-fg-muted">Customer</dt><dd className="text-fg">Northwind Traders</dd>
            <dt className="text-fg-muted">Amount</dt><dd className="tabular-nums text-fg">$12,400.00</dd>
            <dt className="text-fg-muted">Due</dt><dd className="text-fg">Oct 24, 2026</dd>
          </dl>
        </HoverCard>
      </div>
    ),
  },
]
