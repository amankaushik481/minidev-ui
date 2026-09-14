"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/registry/ui/table"

export type Column<T> = {
  id: string
  header: React.ReactNode
  cell: (row: T) => React.ReactNode
  className?: string
}

type DataTableProps<T> = {
  columns: Column<T>[]
  data: T[]
  getRowId?: (row: T, index: number) => string
  className?: string
  empty?: React.ReactNode
}

function DataTable<T>({ columns, data, getRowId, className, empty }: DataTableProps<T>) {
  return (
    <div data-slot="data-table" className={cn("w-full overflow-hidden rounded-xl border border-border bg-surface", className)}>
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            {columns.map((c) => (
              <TableHead key={c.id} className={cn("h-10 text-xs font-medium tracking-[0.01em] text-fg-muted", c.className)}>{c.header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center text-sm text-fg-muted">{empty ?? "No results"}</TableCell>
            </TableRow>
          ) : (
            data.map((row, i) => (
              <TableRow key={getRowId?.(row, i) ?? String(i)} className="border-border">
                {columns.map((c) => (
                  <TableCell key={c.id} className={cn("text-sm text-fg", c.className)}>{c.cell(row)}</TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
export { DataTable }
