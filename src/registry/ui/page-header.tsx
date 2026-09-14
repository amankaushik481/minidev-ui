"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
function PageHeader({ title, description, actions, className }: { title: React.ReactNode; description?: React.ReactNode; actions?: React.ReactNode; className?: string }) {
  return (
    <div data-slot="page-header" className={cn("mb-6 flex flex-wrap items-start justify-between gap-3 border-b border-border pb-4", className)}>
      <div>
        <h1 className="text-2xl font-medium tracking-[-0.018em] text-fg">{title}</h1>
        {description ? <p className="mt-1 text-sm text-fg-muted">{description}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
    </div>
  )
}
export { PageHeader }
