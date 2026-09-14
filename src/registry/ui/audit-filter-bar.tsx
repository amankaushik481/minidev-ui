"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { SearchInput } from "@/registry/ui/search-input"
import { ChipFilter } from "@/registry/ui/chip-filter"
import { DateRangePicker } from "@/registry/ui/date-range-picker"

function AuditFilterBar({
  className,
}: {
  className?: string
}) {
  const [actor, setActor] = React.useState("all")
  return (
    <div data-slot="audit-filter-bar" className={cn("flex flex-wrap items-center gap-2 rounded-xl border border-border bg-surface p-2", className)}>
      <SearchInput aria-label="Search audit log" placeholder="Search actions…" containerClassName="w-52" />
      <ChipFilter
        value={actor}
        onChange={setActor}
        options={[
          { value: "all", label: "All actors" },
          { value: "admins", label: "Admins" },
          { value: "system", label: "System" },
        ]}
      />
      <DateRangePicker />
    </div>
  )
}
export { AuditFilterBar }
