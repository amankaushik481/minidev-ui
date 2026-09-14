"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { QuotaBar } from "@/registry/ui/quota-bar"

type Quota = { label: string; used: number; max: number }

function ResourceQuotaGrid({ items, className }: { items: Quota[]; className?: string }) {
  return (
    <div data-slot="resource-quota-grid" className={cn("grid gap-4 sm:grid-cols-2", className)}>
      {items.map((q) => (
        <div key={q.label} className="rounded-xl border border-border bg-surface p-4">
          <QuotaBar label={q.label} used={q.used} max={q.max} />
        </div>
      ))}
    </div>
  )
}
export { ResourceQuotaGrid }
