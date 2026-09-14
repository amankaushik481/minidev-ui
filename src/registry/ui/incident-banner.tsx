"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { StatusDot } from "@/registry/ui/status-dot"

function IncidentBanner({
  title = "Elevated API errors in us-east",
  severity = "major",
  href = "#",
  className,
}: {
  title?: string
  severity?: "minor" | "major" | "critical"
  href?: string
  className?: string
}) {
  const tone = severity === "critical" ? "danger" : severity === "major" ? "warning" : "accent"
  return (
    <div
      data-slot="incident-banner"
      role="status"
      className={cn(
        "flex flex-wrap items-center justify-between gap-3 border-b border-border bg-surface px-4 py-2.5",
        className
      )}
    >
      <div className="flex items-center gap-2 text-sm text-fg">
        <StatusDot tone={tone === "accent" ? "accent" : tone === "warning" ? "warning" : "danger"} />
        <span className="font-medium capitalize">{severity}</span>
        <span aria-hidden>·</span>
        <span>{title}</span>
      </div>
      <a href={href} className="inline-flex h-8 items-center rounded-lg border border-border bg-surface px-2.5 text-xs font-medium text-fg outline-none hover:border-fg-subtle focus-visible:ring-2 focus-visible:ring-accent">Status page</a>
    </div>
  )
}
export { IncidentBanner }
