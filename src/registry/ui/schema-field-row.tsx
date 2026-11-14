"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Badge } from "@/registry/ui/badge"

/**
 * SchemaFieldRow — one row of an API or data schema: field name, required badge, type and description.
 *
 * Stack several to document a request body, a webhook payload or a database table. Rows are
 * responsive: three columns from `sm`, stacked below. For an interactive table use DataTable.
 *
 * @example
 * <SchemaFieldRow name="amount" type="integer" required description="Amount in cents." />
 * <SchemaFieldRow name="metadata" type="Record<string, string>" description="Up to 50 keys." />
 */
function SchemaFieldRow({
  name,
  type,
  required,
  description,
  className,
}: {
  /** Field name, shown in monospace. */
  name: string
  /** Type signature, shown in monospace, e.g. "string" or "Invoice[]". */
  type: string
  /** Adds a "required" badge. */
  required?: boolean
  /** What the field means. */
  description?: React.ReactNode
  className?: string
}) {
  return (
    <div data-slot="schema-field-row" className={cn("grid gap-1 border-b border-border py-3 sm:grid-cols-[160px_100px_1fr] sm:gap-3", className)}>
      <div className="flex min-w-0 flex-wrap items-center gap-2">
        <code className="font-mono text-sm break-all text-fg">{name}</code>
        {required ? <Badge variant="outline">required</Badge> : null}
      </div>
      <code className="min-w-0 font-mono text-xs break-words text-fg-muted">{type}</code>
      {description ? <p className="text-sm text-fg-muted">{description}</p> : null}
    </div>
  )
}
export { SchemaFieldRow }
