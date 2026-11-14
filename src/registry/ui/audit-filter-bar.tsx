"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { SearchInput } from "@/registry/ui/search-input"
import { ChipFilter, type ChipOption } from "@/registry/ui/chip-filter"
import { DateRangePicker } from "@/registry/ui/date-range-picker"

/**
 * A filter toolbar for an audit log: free-text search, an actor chip filter and a date range.
 *
 * Put it above `AuditTrail` or an audit `DataTable`. Prefer `TableToolbar` for generic tables and
 * `FacetFilter` when several filters can be on at once. Every control works uncontrolled; read the
 * values through the `on*Change` callbacks, or control the actor with `actor` + `onActorChange`.
 *
 * @example
 * <AuditFilterBar
 *   onSearchChange={setQuery}
 *   onActorChange={setActor}
 *   onRangeChange={(r) => setRange(r)}
 * />
 */
type AuditFilterBarProps = {
  /** Called with the search text on every keystroke. */
  onSearchChange?: (query: string) => void
  /** Actor chips. The first is the "everyone" option by convention. */
  actorOptions?: ChipOption[]
  /** Controlled actor value. */
  actor?: string
  /** Initial actor when uncontrolled. */
  defaultActor?: string
  /** Called with the chosen actor's value. */
  onActorChange?: (actor: string) => void
  /** Called with ISO day strings when either end of the range changes. */
  onRangeChange?: (range: { from?: string; to?: string }) => void
  className?: string
}

const ACTOR_OPTIONS: ChipOption[] = [
  { value: "all", label: "All actors" },
  { value: "admins", label: "Admins" },
  { value: "system", label: "System" },
]

function AuditFilterBar({
  onSearchChange,
  actorOptions = ACTOR_OPTIONS,
  actor,
  defaultActor,
  onActorChange,
  onRangeChange,
  className,
}: AuditFilterBarProps) {
  return (
    <div role="search" aria-label="Filter audit log" data-slot="audit-filter-bar" className={cn("flex flex-wrap items-center gap-2 rounded-xl border border-border bg-surface p-2", className)}>
      <SearchInput aria-label="Search audit log" placeholder="Search actions…" containerClassName="w-52" onChange={(e) => onSearchChange?.(e.target.value)} onClear={() => onSearchChange?.("")} />
      <ChipFilter
        label="Actor"
        options={actorOptions}
        value={actor}
        defaultValue={defaultActor ?? actorOptions[0]?.value}
        onChange={onActorChange}
      />
      <DateRangePicker onChange={onRangeChange} />
    </div>
  )
}
export { AuditFilterBar }
export type { AuditFilterBarProps }
