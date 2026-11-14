"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { ArrowDownIcon, ArrowUpIcon, ArrowUpDownIcon } from "lucide-react"

/**
 * A table column header button that shows and toggles sort direction (none, ascending, descending).
 *
 * Put it inside a `<TableHead>` and set `aria-sort` on that header cell to match
 * ("ascending" | "descending" | "none"); screen readers read sort state from the cell.
 * Use TableToolbar for filters and search above the table.
 *
 * @example
 * <TableHead aria-sort={dir === "asc" ? "ascending" : dir === "desc" ? "descending" : "none"}>
 *   <SortableHeader label="Amount" direction={dir} onToggle={cycle} />
 * </TableHead>
 */
type SortableHeaderProps = Omit<React.ComponentProps<"button">, "children"> & {
  /** Column name. */
  label: string
  /** Current sort; `false` or undefined means unsorted. */
  direction?: "asc" | "desc" | false
  /** Called on click; cycle the direction in your state. */
  onToggle?: () => void
}

function SortableHeader({ label, direction, onToggle, className, ...props }: SortableHeaderProps) {
  const Icon = direction === "asc" ? ArrowUpIcon : direction === "desc" ? ArrowDownIcon : ArrowUpDownIcon
  return (
    <button
      type="button"
      data-slot="sortable-header"
      data-sort={direction || undefined}
      onClick={onToggle}
      className={cn(
        "inline-flex items-center gap-1 rounded-sm text-xs font-medium text-fg outline-none transition-colors duration-[70ms] hover:text-accent-fg focus-visible:ring-2 focus-visible:ring-accent",
        className
      )}
      {...props}
    >
      {label}
      <span className="sr-only">{direction === "asc" ? ", sorted ascending" : direction === "desc" ? ", sorted descending" : ""}</span>
      <Icon className={cn("size-3.5", direction ? "text-fg" : "text-fg-muted")} aria-hidden />
    </button>
  )
}
export { SortableHeader }
export type { SortableHeaderProps }
