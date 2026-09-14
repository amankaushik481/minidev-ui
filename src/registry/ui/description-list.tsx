"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

function DescriptionList({ items, className }: {
  items: { label: React.ReactNode; value: React.ReactNode }[]
  className?: string
}) {
  return (
    <dl data-slot="description-list" className={cn("grid gap-3 sm:grid-cols-2", className)}>
      {items.map((item, i) => (
        <div key={i} className="border-b border-border pb-3">
          <dt className="text-xs font-medium tracking-[0.01em] text-fg-muted">{item.label}</dt>
          <dd className="mt-1 text-sm text-fg">{item.value}</dd>
        </div>
      ))}
    </dl>
  )
}
export { DescriptionList }
