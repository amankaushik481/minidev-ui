"use client"
import { cn } from "@/lib/utils"
import { StatusDot } from "@/registry/ui/status-dot"

function HealthIndicator({
  status,
  label,
  className,
}: {
  status: "operational" | "degraded" | "down"
  label?: string
  className?: string
}) {
  const tone = status === "operational" ? "success" : status === "degraded" ? "warning" : "danger"
  return (
    <span data-slot="health-indicator" className={cn("inline-flex items-center gap-2 text-sm text-fg", className)}>
      <StatusDot tone={tone} />
      <span className="capitalize text-fg-muted">{label ?? status}</span>
    </span>
  )
}
export { HealthIndicator }
