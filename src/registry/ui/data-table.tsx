"use client"
import * as React from "react"
import { ArrowDownIcon, ArrowUpIcon, ChevronsUpDownIcon, XIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Checkbox } from "@/registry/ui/checkbox"

/*
 * GOLD STANDARD COMPONENT.
 * A table that feels like a product, not a spreadsheet: sortable headers with
 * aria-sort, row selection with an indeterminate header, a selected-row accent
 * rail, hover-revealed row actions, sticky header that gains a hairline shadow
 * only once you scroll, density, skeleton loading, and a floating bulk bar.
 */

export type Column<T> = {
  id: string
  header: React.ReactNode
  cell: (row: T) => React.ReactNode
  /** Enables sorting on this column. Return the value to compare. */
  sortValue?: (row: T) => string | number | Date | null | undefined
  align?: "left" | "right" | "center"
  /** CSS width, e.g. "30%" or 120. */
  width?: number | string
  className?: string
}

type Sort = { id: string; dir: "asc" | "desc" } | null
type Density = "compact" | "default" | "comfortable"

type DataTableProps<T> = {
  columns: Column<T>[]
  data: T[]
  getRowId?: (row: T, index: number) => string
  /** Adds a checkbox column. */
  selectable?: boolean
  selected?: string[]
  onSelectedChange?: (ids: string[]) => void
  /** Rendered in the floating bar while rows are selected. */
  bulkActions?: (ids: string[]) => React.ReactNode
  /** Rendered at the row's end, revealed on hover/focus. */
  rowActions?: (row: T) => React.ReactNode
  onRowClick?: (row: T) => void
  defaultSort?: Sort
  density?: Density
  loading?: boolean
  /** Fixes the height and makes the header sticky. */
  maxHeight?: number | string
  empty?: React.ReactNode
  caption?: string
  className?: string
}

const ROW_H: Record<Density, string> = { compact: "h-9", default: "h-11", comfortable: "h-14" }
const ALIGN = { left: "text-left", right: "text-right", center: "text-center" }

function compare(a: unknown, b: unknown) {
  if (a == null && b == null) return 0
  if (a == null) return 1
  if (b == null) return -1
  if (a instanceof Date && b instanceof Date) return a.getTime() - b.getTime()
  if (typeof a === "number" && typeof b === "number") return a - b
  return String(a).localeCompare(String(b), undefined, { numeric: true, sensitivity: "base" })
}

function DataTable<T>({
  columns,
  data,
  getRowId = (_r, i) => String(i),
  selectable,
  selected: selectedProp,
  onSelectedChange,
  bulkActions,
  rowActions,
  onRowClick,
  defaultSort = null,
  density = "default",
  loading,
  maxHeight,
  empty,
  caption,
  className,
}: DataTableProps<T>) {
  const [sort, setSort] = React.useState<Sort>(defaultSort)
  const [innerSel, setInnerSel] = React.useState<string[]>([])
  const selected = selectedProp ?? innerSel
  const setSelected = (ids: string[]) => {
    if (selectedProp === undefined) setInnerSel(ids)
    onSelectedChange?.(ids)
  }
  const [scrolled, setScrolled] = React.useState(false)

  const rows = React.useMemo(() => {
    const withIds = data.map((row, i) => ({ row, id: getRowId(row, i) }))
    const col = sort && columns.find((c) => c.id === sort.id)
    if (!col?.sortValue) return withIds
    const sv = col.sortValue
    const sorted = [...withIds].sort((a, b) => compare(sv(a.row), sv(b.row)))
    return sort!.dir === "desc" ? sorted.reverse() : sorted
  }, [data, sort, columns, getRowId])

  const ids = rows.map((r) => r.id)
  const selCount = ids.filter((id) => selected.includes(id)).length
  const allChecked = ids.length > 0 && selCount === ids.length
  const someChecked = selCount > 0 && !allChecked

  const toggleSort = (id: string) =>
    setSort((s) => (s?.id !== id ? { id, dir: "asc" } : s.dir === "asc" ? { id, dir: "desc" } : null))

  const colCount = columns.length + (selectable ? 1 : 0) + (rowActions ? 1 : 0)
  const pad = density === "compact" ? "px-3" : "px-4"

  return (
    <div data-slot="data-table" data-density={density} className={cn("relative w-full", className)}>
      <div
        className="w-full overflow-auto rounded-xl border border-border bg-surface shadow-raised"
        style={maxHeight !== undefined ? { maxHeight } : undefined}
        onScroll={(e) => setScrolled(e.currentTarget.scrollTop > 0)}
      >
        <table className="w-full border-separate border-spacing-0 text-sm" aria-busy={loading || undefined}>
          {caption ? <caption className="sr-only">{caption}</caption> : null}
          <thead
            className={cn(
              "text-xs font-medium text-fg-muted",
              maxHeight !== undefined && "sticky top-0 z-10",
              "[&_th]:border-b [&_th]:border-border [&_th]:bg-[color-mix(in_oklch,var(--sunken)_70%,var(--surface))]",
              scrolled && "[&_th]:shadow-[0_1px_0_0_var(--border),0_6px_12px_-8px_oklch(0_0_0/0.18)]"
            )}
          >
            <tr>
              {selectable ? (
                <th scope="col" className="h-10 w-10 pl-4 text-left">
                  <Checkbox
                    aria-label="Select all rows"
                    checked={allChecked}
                    indeterminate={someChecked}
                    onCheckedChange={() => setSelected(allChecked || someChecked ? selected.filter((s) => !ids.includes(s)) : [...new Set([...selected, ...ids])])}
                  />
                </th>
              ) : null}
              {columns.map((c) => {
                const dir = sort?.id === c.id ? sort.dir : null
                const align = c.align ?? "left"
                return (
                  <th
                    key={c.id}
                    scope="col"
                    aria-sort={dir ? (dir === "asc" ? "ascending" : "descending") : c.sortValue ? "none" : undefined}
                    style={c.width !== undefined ? { width: c.width } : undefined}
                    className={cn("h-10 font-medium whitespace-nowrap", pad, ALIGN[align], c.className)}
                  >
                    {c.sortValue ? (
                      <button
                        type="button"
                        onClick={() => toggleSort(c.id)}
                        className={cn(
                          "group/sort -mx-1.5 inline-flex h-7 items-center gap-1 rounded-md px-1.5 outline-none",
                          "transition-colors duration-[70ms] hover:bg-fg/5 hover:text-fg focus-visible:ring-2 focus-visible:ring-accent",
                          dir && "text-fg",
                          align === "right" && "flex-row-reverse"
                        )}
                      >
                        {c.header}
                        <span className="grid size-3.5 place-items-center">
                          {dir === "asc" ? (
                            <ArrowUpIcon className="size-3 text-accent-fg" />
                          ) : dir === "desc" ? (
                            <ArrowDownIcon className="size-3 text-accent-fg" />
                          ) : (
                            <ChevronsUpDownIcon className="size-3 opacity-0 transition-opacity group-hover/sort:opacity-60 group-focus-visible/sort:opacity-60" />
                          )}
                        </span>
                      </button>
                    ) : (
                      c.header
                    )}
                  </th>
                )
              })}
              {rowActions ? <th scope="col" className="h-10 w-12"><span className="sr-only">Actions</span></th> : null}
            </tr>
          </thead>
          <tbody className="[&>tr:last-child>td]:border-b-0">
            {loading ? (
              Array.from({ length: 5 }, (_, r) => (
                <tr key={r}>
                  {Array.from({ length: colCount }, (_, c) => (
                    <td key={c} className={cn(ROW_H[density], pad, "border-b border-border")}>
                      <span
                        className="block h-2.5 animate-pulse rounded-full bg-sunken"
                        style={{ width: `${[62, 44, 78, 36, 55][(r + c) % 5]}%`, animationDelay: `${r * 80}ms` }}
                      />
                    </td>
                  ))}
                </tr>
              ))
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={colCount} className="h-40 text-center">
                  {empty ?? (
                    <div className="grid place-items-center gap-1">
                      <p className="text-sm font-medium text-fg">No results</p>
                      <p className="text-xs text-fg-muted">Try a different search or clear the filters.</p>
                    </div>
                  )}
                </td>
              </tr>
            ) : (
              rows.map(({ row, id }) => {
                const isSel = selected.includes(id)
                return (
                  <tr
                    key={id}
                    data-selected={isSel || undefined}
                    tabIndex={onRowClick ? 0 : undefined}
                    onClick={onRowClick ? () => onRowClick(row) : undefined}
                    onKeyDown={onRowClick ? (e) => { if (e.key === "Enter" && e.target === e.currentTarget) onRowClick(row) } : undefined}
                    className={cn(
                      "group/row outline-none transition-colors duration-[70ms]",
                      "[&>td]:border-b [&>td]:border-border",
                      "hover:bg-[color-mix(in_oklch,var(--sunken)_55%,transparent)]",
                      "focus-visible:bg-[color-mix(in_oklch,var(--sunken)_55%,transparent)] focus-visible:[&>td:first-child]:shadow-[inset_2px_0_0_var(--accent)]",
                      isSel && "bg-accent-soft hover:bg-accent-soft [&>td:first-child]:shadow-[inset_2px_0_0_var(--accent)]",
                      onRowClick && "cursor-pointer"
                    )}
                  >
                    {selectable ? (
                      <td className={cn(ROW_H[density], "w-10 pl-4")} onClick={(e) => e.stopPropagation()}>
                        <Checkbox
                          aria-label={`Select row ${id}`}
                          checked={isSel}
                          onCheckedChange={(v) => setSelected(v ? [...selected, id] : selected.filter((s) => s !== id))}
                        />
                      </td>
                    ) : null}
                    {columns.map((c) => (
                      <td
                        key={c.id}
                        className={cn(ROW_H[density], pad, "text-fg", ALIGN[c.align ?? "left"], c.align === "right" && "tabular-nums", c.className)}
                      >
                        {c.cell(row)}
                      </td>
                    ))}
                    {rowActions ? (
                      <td className={cn(ROW_H[density], "w-12 pr-2 text-right")} onClick={(e) => e.stopPropagation()}>
                        <div className="inline-flex opacity-0 transition-opacity duration-[70ms] group-hover/row:opacity-100 group-focus-within/row:opacity-100 group-data-[selected]/row:opacity-100 [@media(hover:none)]:opacity-100">
                          {rowActions(row)}
                        </div>
                      </td>
                    ) : null}
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {selectable && selCount > 0 ? (
        <div
          role="toolbar"
          aria-label="Bulk actions"
          className="pointer-events-none sticky bottom-3 z-20 mt-3 flex justify-center"
        >
          <div className="pointer-events-auto flex animate-[rise-in_200ms_var(--ease-hairline)_both] items-center gap-1 rounded-xl border border-border bg-raised p-1 pl-3 text-[0.8125rem] shadow-overlay">
            <span className="mr-1 font-medium text-fg tabular-nums">{selCount} selected</span>
            <span className="mx-1 h-4 w-px bg-border" />
            {bulkActions?.(selected)}
            <button
              type="button"
              aria-label="Clear selection"
              onClick={() => setSelected([])}
              className="grid size-7 place-items-center rounded-md text-fg-subtle outline-none hover:bg-sunken hover:text-fg focus-visible:ring-2 focus-visible:ring-accent"
            >
              <XIcon className="size-3.5" />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export { DataTable }
export type { DataTableProps, Sort as DataTableSort }
