import { Button } from "@/registry/ui/button"
import { Separator } from "@/registry/ui/separator"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Between sections",
    description: "A horizontal rule between a heading block and its details; spacing comes from the parent.",
    code: `<div className="w-72">
  <h4 className="text-sm font-medium text-fg">Northwind Traders</h4>
  <p className="text-xs text-fg-muted">Customer since March 2024</p>
  <Separator className="my-3" />
  <dl className="flex justify-between text-xs">
    <dt className="text-fg-muted">Open invoices</dt>
    <dd className="tabular-nums text-fg">3 · $31,200.00</dd>
  </dl>
</div>`,
    node: (
      <div className="w-72">
        <h4 className="text-sm font-medium text-fg">Northwind Traders</h4>
        <p className="text-xs text-fg-muted">Customer since March 2024</p>
        <Separator className="my-3" />
        <dl className="flex justify-between text-xs">
          <dt className="text-fg-muted">Open invoices</dt>
          <dd className="tabular-nums text-fg">3 · $31,200.00</dd>
        </dl>
      </div>
    ),
  },
  {
    title: "Vertical in a toolbar",
    description: "A vertical separator stretches to the row height; give it a fixed height when the row is taller than the controls.",
    code: `<div className="flex h-8 items-center gap-3 text-sm">
  <Button variant="ghost" size="sm">Invoices</Button>
  <Separator orientation="vertical" className="h-5" />
  <Button variant="ghost" size="sm">Customers</Button>
  <Separator orientation="vertical" className="h-5" />
  <Button variant="ghost" size="sm">Reports</Button>
</div>`,
    node: (
      <div className="flex h-8 items-center gap-3 text-sm">
        <Button variant="ghost" size="sm">Invoices</Button>
        <Separator orientation="vertical" className="h-5" />
        <Button variant="ghost" size="sm">Customers</Button>
        <Separator orientation="vertical" className="h-5" />
        <Button variant="ghost" size="sm">Reports</Button>
      </div>
    ),
  },
  {
    title: "With a label",
    description: "Two flexible separators around a short word make the classic sign in divider.",
    code: `<div className="flex w-72 items-center gap-3">
  <Separator className="flex-1" />
  <span className="text-xs text-fg-muted">or continue with email</span>
  <Separator className="flex-1" />
</div>`,
    node: (
      <div className="flex w-72 items-center gap-3">
        <Separator className="flex-1" />
        <span className="text-xs text-fg-muted">or continue with email</span>
        <Separator className="flex-1" />
      </div>
    ),
  },
]
