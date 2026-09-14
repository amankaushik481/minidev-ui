"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { SearchInput } from "@/registry/ui/search-input"
import { Button } from "@/registry/ui/button"

function FilterBar({
  children,
  onClear,
  className,
}: {
  children?: React.ReactNode
  onClear?: () => void
  className?: string
}) {
  return (
    <div
      data-slot="filter-bar"
      className={cn(
        "flex flex-wrap items-center gap-2 rounded-xl border border-border bg-surface p-2",
        className
      )}
    >
      <SearchInput aria-label="Filter" placeholder="Filter…" containerClassName="w-48" />
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
