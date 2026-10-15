import { SendIcon } from "lucide-react"
import { Breadcrumb } from "@/registry/ui/breadcrumb"
import { Button } from "@/registry/ui/button"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Custom trail",
    description: "Every item but the last gets an href; the last one is the current page and renders as plain text with aria-current.",
    code: `<Breadcrumb
  items={[
    { label: "Settings", href: "#" },
    { label: "Billing", href: "#" },
    { label: "Payment methods" },
  ]}
/>`,
    node: (
      <Breadcrumb
        items={[
          { label: "Settings", href: "#" },
          { label: "Billing", href: "#" },
          { label: "Payment methods" },
        ]}
      />
    ),
  },
  {
    title: "Two levels",
    description: "A short trail still earns its place when the parent is the obvious way back.",
    code: `<Breadcrumb items={[{ label: "Customers", href: "#" }, { label: "Northwind" }]} />`,
    node: <Breadcrumb items={[{ label: "Customers", href: "#" }, { label: "Northwind" }]} />,
  },
  {
    title: "Page header",
    description: "Sit the breadcrumb above the title with the primary action on the right.",
    code: `<div className="flex w-full max-w-xl flex-col gap-2">
  <Breadcrumb items={[{ label: "Invoices", href: "#" }, { label: "INV-2041" }]} />
  <div className="flex flex-wrap items-center justify-between gap-3">
    <div>
      <h2 className="text-xl font-medium tracking-[-0.01em] text-fg">Invoice INV-2041</h2>
      <p className="text-sm text-fg-muted">Northwind Traders · $12,400.00 · due Oct 24</p>
    </div>
    <Button size="sm"><SendIcon /> Send reminder</Button>
  </div>
</div>`,
    node: (
      <div className="flex w-full max-w-xl flex-col gap-2">
        <Breadcrumb items={[{ label: "Invoices", href: "#" }, { label: "INV-2041" }]} />
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-medium tracking-[-0.01em] text-fg">Invoice INV-2041</h2>
            <p className="text-sm text-fg-muted">Northwind Traders · $12,400.00 · due Oct 24</p>
          </div>
          <Button size="sm"><SendIcon /> Send reminder</Button>
        </div>
      </div>
    ),
  },
]
