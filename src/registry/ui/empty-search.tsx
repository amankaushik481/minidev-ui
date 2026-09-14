"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { EmptyState } from "@/registry/ui/empty-state"

function EmptySearch({
  query,
  className,
}: {
  query?: string
  className?: string
}) {
  return (
    <div data-slot="empty-search">
      <EmptyState
      className={cn(className)}
      title={query ? `No results for “${query}”` : "No results"}
      description="Try a different query or clear filters."
    />
    </div>
  )
}
export { EmptySearch }
