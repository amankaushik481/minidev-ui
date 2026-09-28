"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

function ChartCard({ title, description, children, className }: {
  title: React.ReactNode
  description?: React.ReactNode
  children?: React.ReactNode
  className?: string
}) {
  return (
    <section data-slot="chart-card" className={cn("rounded-xl border border-border bg-surface p-5 shadow-raised", className)}>
      <header className="mb-4">
        <h3 className="text-[0.9375rem] font-medium tracking-[-0.01em] text-fg">{title}</h3>
        {description ? <p className="mt-1 text-xs text-fg-muted">{description}</p> : null}
      </header>
      <div className="min-h-40">{children}</div>
    </section>
  )
}
export { ChartCard }
