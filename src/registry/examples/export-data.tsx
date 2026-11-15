"use client"
import * as React from "react"
import { ExportData } from "@/registry/ui/export-data"
import type { Example } from "./types"

function RequestDemo() {
  const [requested, setRequested] = React.useState(false)
  return (
    <ExportData
      className="w-full max-w-lg"
      title="Export your data"
      description={
        requested
          ? "Preparing your export. We'll email maya@northwind.com when it's ready."
          : "A ZIP of your invoices, customers and comments, as JSON."
      }
      actionLabel={requested ? "Export requested" : "Request export"}
      onExport={() => setRequested(true)}
    />
  )
}

export const examples: Example[] = [
  {
    title: "Show that the export is on its way",
    description: "The row has no status of its own; change description and actionLabel after onExport.",
    code: `function RequestDemo() {
  const [requested, setRequested] = React.useState(false)
  return (
    <ExportData
      className="w-full max-w-lg"
      title="Export your data"
      description={
        requested
          ? "Preparing your export. We'll email maya@northwind.com when it's ready."
          : "A ZIP of your invoices, customers and comments, as JSON."
      }
      actionLabel={requested ? "Export requested" : "Request export"}
      onExport={() => setRequested(true)}
    />
  )
}`,
    node: <RequestDemo />,
  },
  {
    title: "One row per format",
    description: "Each row has one button, so stack rows when people can export different things.",
    code: `<div className="flex w-full max-w-lg flex-col gap-2">
  <ExportData
    title="Invoices (CSV)"
    description="Every invoice since January 2024, one row each. Opens in any spreadsheet."
    actionLabel="Download CSV"
  />
  <ExportData title="Full workspace (JSON)" description="Projects, members and the audit log. Ready in a few minutes." />
</div>`,
    node: (
      <div className="flex w-full max-w-lg flex-col gap-2">
        <ExportData
          title="Invoices (CSV)"
          description="Every invoice since January 2024, one row each. Opens in any spreadsheet."
          actionLabel="Download CSV"
        />
        <ExportData title="Full workspace (JSON)" description="Projects, members and the audit log. Ready in a few minutes." />
      </div>
    ),
  },
]
