"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { StatusDot } from "@/registry/ui/status-dot"

/**
 * IncidentBanner — a full-width strip announcing an ongoing incident, its severity, and a link to the status page.
 *
 * Use it at the top of an app or dashboard during an outage. For a dismissible
 * product announcement use AnnouncementBar, for a message inside a page use
 * InlineAlert or Callout, and for a service's current state use HealthIndicator.
 *
 * @example
 * <IncidentBanner severity="critical" title="Payments are failing in eu-west" href="https://status.example.com" />
 */
type IncidentSeverity = "minor" | "major" | "critical"

type IncidentBannerProps = {
  /** One line describing the incident. */
  title?: string
  /** Sets the dot colour: minor is accent, major is warning, critical is danger. */
  severity?: IncidentSeverity
  /** Status page URL; the link is hidden when empty. */
  href?: string
  /** Text of the status page link. */
  linkLabel?: string
  className?: string
}

const TONE = { minor: "accent", major: "warning", critical: "danger" } as const

function IncidentBanner({
  title = "Elevated API errors in us-east",
  severity = "major",
  href = "#",
  linkLabel = "Status page",
  className,
}: IncidentBannerProps) {
  return (
    <div
      data-slot="incident-banner"
      data-severity={severity}
      role="status"
      className={cn("flex flex-wrap items-center justify-between gap-3 border-b border-border bg-surface px-4 py-2.5", className)}
    >
      <div className="flex items-center gap-2 text-sm text-fg">
        <StatusDot tone={TONE[severity]} />
        <span className="font-medium capitalize">{severity}</span>
        <span aria-hidden>·</span>
        <span>{title}</span>
      </div>
      {href ? (
        <a
          href={href}
          className="inline-flex h-8 items-center rounded-lg border border-border bg-surface px-2.5 text-xs font-medium text-fg shadow-xs outline-none transition-[border-color] duration-[70ms] hover:border-fg-subtle focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        >
          {linkLabel}
        </a>
      ) : null}
    </div>
  )
}
export { IncidentBanner }
export type { IncidentBannerProps, IncidentSeverity }
