"use client"
import * as React from "react"
import { Button } from "@/registry/ui/button"
import { cn } from "@/lib/utils"

/**
 * ExportData — a settings row that explains a data export and offers one button to request it.
 *
 * Use on account or workspace settings pages (GDPR exports, backups). For a
 * destructive action use `DangerZone`; for a download list use `FileList`.
 *
 * @example
 * <ExportData onExport={() => requestExport()} />
 */
type ExportDataProps = {
  /** Heading of the row. */
  title?: React.ReactNode
  /** What the export contains and how long it takes. */
  description?: React.ReactNode
  /** Button label. */
  actionLabel?: string
  /** Called when the button is pressed. */
  onExport?: () => void
  className?: string
}

function ExportData({
  title = "Export workspace data",
  description = "JSON of projects, members, and audit history. Ready in a few minutes.",
  actionLabel = "Request export",
  onExport,
  className,
}: ExportDataProps) {
  return (
    <div data-slot="export-data" className={cn("flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-surface p-4 shadow-highlight", className)}>
      <div>
        <h3 className="text-sm font-medium text-fg">{title}</h3>
        <p className="mt-1 text-xs text-fg-muted">{description}</p>
      </div>
      <Button type="button" size="sm" variant="outline" onClick={onExport}>
        {actionLabel}
      </Button>
    </div>
  )
}
export { ExportData }
export type { ExportDataProps }
