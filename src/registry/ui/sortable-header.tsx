"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { ArrowDownIcon, ArrowUpIcon, ArrowUpDownIcon } from "lucide-react"

function SortableHeader({
  label,
  direction,
  onToggle,
  className,
}: {
  label: string
  direction?: "asc" | "desc" | false
  onToggle?: () => void
  className?: string
}) {
  const Icon = direction === "asc" ? ArrowUpIcon : direction === "desc" ? ArrowDownIcon : ArrowUpDownIcon
  return (
    <button
      type="button"
      data-slot="sortable-header"
      onClick={onToggle}
      className={cn(
        "inline-flex items-center gap-1 text-xs font-medium text-fg outline-none hover:text-accent focus-visible:ring-2 focus-visible:ring-accent",
        className
      )}
    >
      {label}
      <Icon className="size-3.5 text-fg-muted" aria-hidden />
    </button>
  )
}
export { SortableHeader }
