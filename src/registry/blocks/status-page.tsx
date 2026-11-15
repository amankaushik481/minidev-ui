"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { HealthIndicator } from "@/registry/ui/health-indicator"
import { StatusBadge } from "@/registry/ui/status-badge"
import { UptimeBar } from "@/registry/ui/uptime-bar"

/**
 * StatusPage — a public status page: an overall verdict derived from every service, then each service with its health and 90-day uptime.
 *
 * Use for status.yourapp.com or an in-app "System status" panel. The headline badge is computed from the worst
 * service, so it never disagrees with the list. For a single live dot use HealthIndicator; for an outage notice
 * across the app use IncidentBanner.
 *
 * @example
 * <StatusPage />
 */
type StatusPageProps = {
  className?: string
}

type Health = "operational" | "degraded" | "down"

const SERVICES: { name: string; status: Health; downtimes: number[] }[] = [
  { name: "Dashboard", status: "operational", downtimes: [] },
  { name: "Ask Lumen", status: "operational", downtimes: [61] },
  { name: "Stripe sync", status: "degraded", downtimes: [33, 89] },
  { name: "Slack alerts", status: "operational", downtimes: [] },
]

const VERDICT: Record<Health, { tone: "success" | "warning" | "danger"; title: string; body: string }> = {
  operational: { tone: "success", title: "All systems operational", body: "Everything is running normally." },
  degraded: { tone: "warning", title: "Partial degradation", body: "Stripe sync is running about 10 minutes behind. Data is safe." },
  down: { tone: "danger", title: "Major outage", body: "We are on it. Updates every 30 minutes." },
}

function StatusPage({ className }: StatusPageProps) {
  const headingId = React.useId()
  const worst: Health = SERVICES.some((s) => s.status === "down") ? "down" : SERVICES.some((s) => s.status === "degraded") ? "degraded" : "operational"
  const v = VERDICT[worst]
  return (
    <section data-slot="status-page" aria-labelledby={headingId} className={cn("space-y-4 rounded-2xl border border-border bg-surface p-4 shadow-raised sm:p-6", className)}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 id={headingId} className="text-xl font-medium tracking-[-0.014em] text-fg">
            Lumen status
          </h2>
          <p className="mt-1 text-sm text-fg-muted">{v.body}</p>
        </div>
        <StatusBadge tone={v.tone}>{v.title}</StatusBadge>
      </div>
      <ul className="space-y-2">
        {SERVICES.map((s) => (
          <li key={s.name} className="space-y-2 rounded-xl border border-border bg-bg px-3 py-3">
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-medium text-fg">{s.name}</span>
              <HealthIndicator status={s.status} />
            </div>
            <UptimeBar label={`${s.name}, last 90 days`} days={90} downtimes={s.downtimes} />
          </li>
        ))}
      </ul>
    </section>
  )
}

export { StatusPage }
export type { StatusPageProps }
