"use client"
import { Breadcrumb } from "@/registry/ui/breadcrumb"
import { Button } from "@/registry/ui/button"
import { PageHeader } from "@/registry/ui/page-header"
import { StatusBadge } from "@/registry/ui/status-badge"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "List page",
    description: "A primary and a secondary action; they wrap under the title on narrow screens.",
    code: `<PageHeader
  title="Invoices"
  description="Everything billed to customers this year."
  actions={
    <>
      <Button size="sm" variant="outline">Export CSV</Button>
      <Button size="sm">New invoice</Button>
    </>
  }
  className="w-full"
/>`,
    node: (
      <PageHeader
        title="Invoices"
        description="Everything billed to customers this year."
        actions={
          <>
            <Button size="sm" variant="outline">Export CSV</Button>
            <Button size="sm">New invoice</Button>
          </>
        }
        className="w-full"
      />
    ),
  },
  {
    title: "Record page",
    description: "A Breadcrumb sits above it, and title takes a node, so a status badge can join the h1.",
    code: `<div className="w-full space-y-3">
  <Breadcrumb items={[{ label: "Invoices", href: "/invoices" }, { label: "INV-2041" }]} />
  <PageHeader
    title={<>INV-2041 <StatusBadge tone="success" className="ml-1 align-middle">Paid</StatusBadge></>}
    description="Northwind Traders · $12,400.00 · paid Oct 9"
    actions={<Button size="sm" variant="outline">Download PDF</Button>}
  />
</div>`,
    node: (
      <div className="w-full space-y-3">
        <Breadcrumb items={[{ label: "Invoices", href: "/invoices" }, { label: "INV-2041" }]} />
        <PageHeader
          title={<>INV-2041 <StatusBadge tone="success" className="ml-1 align-middle">Paid</StatusBadge></>}
          description="Northwind Traders · $12,400.00 · paid Oct 9"
          actions={<Button size="sm" variant="outline">Download PDF</Button>}
        />
      </div>
    ),
  },
]
