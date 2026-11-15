"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * A compact result grid for SQL query output: uppercase column headers, mono cells, NULL shown dimmed, and a scrollable frame.
 *
 * Use it under a query editor or in an AI agent's tool-call output. For an app data table with
 * sorting, selection and pagination use Table with SortableHeader and TablePagination.
 *
 * @example
 * <SqlResultTable columns={["id", "email"]} rows={[[1, "maya@lumen.example"], [2, null]]} caption="users, 2 rows" />
 */
type SqlCell = string | number | boolean | null

type SqlResultTableProps = {
  /** Column names in order. */
  columns?: string[]
  /** Result rows; each row lines up with `columns`. `null` renders as a dimmed NULL. */
  rows?: SqlCell[][]
  /** Screen-reader caption, e.g. the table name and row count. */
  caption?: string
  className?: string
}

function SqlResultTable({
  columns = ["id", "email", "plan"],
  rows = [
    ["1", "maya@acme.com", "studio"],
    ["2", "casey@acme.com", "premium"],
    ["3", "riley@acme.com", "free"],
  ],
  caption = "Query result",
  className,
}: SqlResultTableProps) {
  return (
    // focusable so keyboard users can scroll wide results
    <div
      data-slot="sql-result-table"
      role="region"
      aria-label={caption}
      tabIndex={0}
      className={cn("overflow-auto rounded-xl border border-border outline-none focus-visible:ring-2 focus-visible:ring-accent", className)}
    >
      <table className="w-full min-w-[420px] border-collapse text-left text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead className="bg-sunken text-xs tracking-[0.01em] text-fg-muted uppercase">
          <tr>
            {columns.map((c, i) => (
              <th key={`${c}-${i}`} scope="col" className="border-b border-border px-3 py-2 font-medium whitespace-nowrap">{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-border last:border-b-0">
              {row.map((cell, j) => (
                <td key={j} className={cn("px-3 py-2 font-mono text-xs whitespace-nowrap tabular-nums", cell === null ? "text-fg-subtle italic" : "text-fg")}>
                  {cell === null ? "NULL" : String(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
export { SqlResultTable }
export type { SqlResultTableProps, SqlCell }
