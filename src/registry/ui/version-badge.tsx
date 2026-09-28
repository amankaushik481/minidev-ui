"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

function VersionBadge({
  version,
  channel,
  className,
}: {
  version: string
  channel?: "stable" | "beta" | "canary"
  className?: string
}) {
  return (
    <span
      data-slot="version-badge"
      className={cn(
        "inline-flex h-6 items-center gap-1.5 rounded-md border border-border bg-sunken px-2 font-mono text-[11px] text-fg-muted shadow-highlight",
        className
      )}
    >
      <span className="text-fg">v{version}</span>
      {channel ? (
        <span className={cn(
          "rounded px-1 py-px text-[10px] font-sans font-medium tracking-[0.01em] uppercase",
          channel === "stable" && "bg-success/15 text-fg",
          channel === "beta" && "bg-accent/15 text-fg",
          channel === "canary" && "bg-warning/20 text-fg",
        )}>{channel}</span>
      ) : null}
    </span>
  )
}
export { VersionBadge }
