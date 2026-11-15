"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * A mono version tag ("v2.4.1") with an optional release-channel pill: stable, beta or canary.
 *
 * Use it in changelogs, release notes, footers and package or API headers to show which release
 * something belongs to. Pass the version with or without a leading "v". Use `EnvBadge` for deploy
 * environments, `StatusBadge` for a state, and `Badge` for anything else.
 *
 * @example
 * <VersionBadge version="2.4.1" channel="beta" />
 */
type VersionBadgeProps = {
  /** Semver string, e.g. "2.4.1" or "v2.4.1". */
  version: string
  /** Release channel pill. Omit to hide. */
  channel?: "stable" | "beta" | "canary"
  className?: string
}

function VersionBadge({ version, channel, className }: VersionBadgeProps) {
  return (
    <span
      data-slot="version-badge"
      className={cn(
        "inline-flex h-6 items-center gap-1.5 rounded-md border border-border bg-sunken px-2 font-mono text-[11px] text-fg-muted shadow-highlight",
        className
      )}
    >
      <span className="text-fg tabular-nums">v{version.replace(/^v/i, "")}</span>
      {channel ? (
        <span
          className={cn(
            "rounded px-1 py-px font-sans text-[10px] font-medium tracking-[0.01em] uppercase",
            channel === "stable" && "bg-success/15 text-fg",
            channel === "beta" && "bg-accent-soft text-fg",
            channel === "canary" && "bg-warning/20 text-fg"
          )}
        >
          {channel}
        </span>
      ) : null}
    </span>
  )
}
export { VersionBadge }
export type { VersionBadgeProps }
