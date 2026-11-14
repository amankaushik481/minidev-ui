"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { SearchInput } from "@/registry/ui/search-input"
import { Button } from "@/registry/ui/button"

/**
 * FilterBar — a toolbar strip with a filter text field, slots for filter controls and an optional Clear button.
 *
 * Use above a list or table. Put `Select`, `ChipFilter` or `MultiSelect`
 * controls in `children`. For a full table toolbar with bulk actions use
 * `TableToolbar`; for audit logs use `AuditFilterBar`.
 *
 * @example
 * const [q, setQ] = React.useState("")
 * <FilterBar query={q} onQueryChange={setQ} onClear={() => setQ("")}>
 *   <Select ... />
 * </FilterBar>
 */
type FilterBarProps = {
  /** Filter controls rendered after the text field. */
  children?: React.ReactNode
  /** Controlled filter text. Leave out for an uncontrolled field. */
  query?: string
  /** Called with the filter text on every keystroke and when cleared. */
  onQueryChange?: (query: string) => void
  /** Placeholder of the text field. */
  placeholder?: string
  /** When set, shows a "Clear" button at the end that calls it. */
  onClear?: () => void
  className?: string
}

function FilterBar({ children, query, onQueryChange, placeholder = "Filter…", onClear, className }: FilterBarProps) {
  return (
    <div
      data-slot="filter-bar"
      role="group"
      aria-label="Filters"
      className={cn("flex flex-wrap items-center gap-2 rounded-xl border border-border bg-surface p-2", className)}
    >
      <SearchInput
        aria-label="Filter"
        placeholder={placeholder}
        containerClassName="w-48"
        value={query}
        onChange={onQueryChange ? (e) => onQueryChange(e.target.value) : undefined}
      />
      {children}
      {onClear ? (
        <Button type="button" variant="ghost" size="sm" className="ml-auto" onClick={onClear}>
          Clear
        </Button>
      ) : null}
    </div>
  )
}
export { FilterBar }
export type { FilterBarProps }
