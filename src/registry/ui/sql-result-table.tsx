"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

function SqlResultTable({
  columns = ["id", "email", "plan"],
  rows = [
    ["1", "aman@minidev.pro", "studio"],
    ["2", "casey@acme.com", "premium"],
    ["3", "riley@acme.com", "free"],
  ],
  className,
}: {
  columns?: string[]
  rows?: string[][]
  className?: string
}) {
  return (
    <div data-slot="sql-result-table" className={cn("overflow-auto rounded-xl border border-border", className)}>
      <table className="w-full min-w-[420px] border-collapse text-left text-sm">
        <thead className="bg-sunken text-xs tracking-[0.01em] text-fg-muted uppercase">
          <tr>
            {columns.map((c) => (
              <th key={c} className="border-b border-border px-3 py-2 font-medium">{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-border last:border-b-0">
              {row.map((cell, j) => (
                <td key={j} className="px-3 py-2 font-mono text-xs text-fg">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
export { SqlResultTable }
