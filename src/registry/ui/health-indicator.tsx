"use client"
import { cn } from "@/lib/utils"
import { StatusDot } from "@/registry/ui/status-dot"

/**
 * HealthIndicator — a coloured dot and a word for a service's health: operational, degraded or down.
 *
 * Use it inline in tables and status lists. For a tinted pill use StatusBadge,
 * for a bare dot use StatusDot, and for a history strip use UptimeBar.
 *
 * @example
 * <HealthIndicator status="degraded" label="API" />
 */
type HealthStatus = "operational" | "degraded" | "down"

type HealthIndicatorProps = {
  /** Health state; sets the dot colour (success, warning, danger). */
  status: HealthStatus
  /** Text beside the dot. Defaults to the status word, capitalised. */
  label?: string
  className?: string
}

function HealthIndicator({ status, label, className }: HealthIndicatorProps) {
  const tone = status === "operational" ? "success" : status === "degraded" ? "warning" : "danger"
  return (
    <span data-slot="health-indicator" data-status={status} className={cn("inline-flex items-center gap-2 text-sm text-fg", className)}>
      <StatusDot tone={tone} />
      <span className={cn("text-fg-muted", label == null && "capitalize")}>{label ?? status}</span>
      {label != null ? <span className="sr-only">: {status}</span> : null}
    </span>
  )
}
export { HealthIndicator }
export type { HealthIndicatorProps, HealthStatus }
