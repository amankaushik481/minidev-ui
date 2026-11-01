import { GridReveal } from "@/registry/premium/grid-reveal"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Custom items",
    description: "items is a list of labels; each tile is numbered in order and rises as the grid scrolls into view.",
    code: `<GridReveal items={["Invoices", "Payments", "Customers", "Reports", "Reminders", "Statements", "Approvals", "Audit log"]} className="w-full" />`,
    node: <GridReveal items={["Invoices", "Payments", "Customers", "Reports", "Reminders", "Statements", "Approvals", "Audit log"]} className="w-full" />,
  },
  {
    title: "Three columns",
    description: "Override the column count with className when the list does not split into four.",
    code: `<GridReveal items={["Starter", "Growth", "Scale", "Agencies", "Marketplaces", "Enterprise"]} className="w-full sm:grid-cols-3" />`,
    node: <GridReveal items={["Starter", "Growth", "Scale", "Agencies", "Marketplaces", "Enterprise"]} className="w-full sm:grid-cols-3" />,
  },
  {
    title: "Under a heading",
    description: "Pair it with a short heading to use it as an at a glance section on a marketing page.",
    code: `<div className="w-full space-y-6">
  <div className="text-center">
    <h2 className="text-2xl font-medium tracking-[-0.02em] text-fg">Everything Northwind runs on Lumen</h2>
    <p className="mt-1 text-sm text-fg-muted">Four modules, one ledger, no spreadsheets.</p>
  </div>
  <GridReveal items={["Invoicing", "Payments", "Reconciliation", "Reporting"]} className="grid-cols-2 sm:grid-cols-4" />
</div>`,
    node: (
      <div className="w-full space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-medium tracking-[-0.02em] text-fg">Everything Northwind runs on Lumen</h2>
          <p className="mt-1 text-sm text-fg-muted">Four modules, one ledger, no spreadsheets.</p>
        </div>
        <GridReveal items={["Invoicing", "Payments", "Reconciliation", "Reporting"]} className="grid-cols-2 sm:grid-cols-4" />
      </div>
    ),
  },
]
