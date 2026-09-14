"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { SearchInput } from "@/registry/ui/search-input"

function TableToolbar({ className, children, search, onSearchChange, searchPlaceholder="Search…" }: {
  className?: string
  children?: React.ReactNode
  search?: string
  onSearchChange?: (v: string) => void
  searchPlaceholder?: string
}) {
  return (
    <div data-slot="table-toolbar" className={cn("mb-3 flex flex-wrap items-center gap-2", className)}>
      <SearchInput
        aria-label="Search table"
        value={search}
        onChange={(e) => onSearchChange?.(e.target.value)}
        placeholder={searchPlaceholder}
        className="max-w-xs"
        containerClassName="max-w-xs"
      />
      <div className="ml-auto flex flex-wrap items-center gap-2">{children}</div>
    </div>
  )
}
export { TableToolbar }
