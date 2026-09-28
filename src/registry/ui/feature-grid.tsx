"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

type Feature = { title: string; description: string; icon?: React.ReactNode }

function FeatureGrid({
  features,
  className,
}: {
  features: Feature[]
  className?: string
}) {
  return (
    <div data-slot="feature-grid" className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {features.map((f) => (
        <div key={f.title} className="rounded-xl border border-border bg-surface p-5 shadow-highlight">
          {f.icon ? <div className="mb-3 text-accent">{f.icon}</div> : null}
          <h3 className="text-sm font-medium text-fg">{f.title}</h3>
          <p className="mt-1.5 text-sm leading-[1.55] text-fg-muted">{f.description}</p>
        </div>
      ))}
    </div>
  )
}
export { FeatureGrid }
