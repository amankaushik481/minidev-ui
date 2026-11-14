"use client"
import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"
import { UptimeBar } from "@/registry/ui/uptime-bar"
import { IncidentBanner } from "@/registry/ui/incident-banner"
import { StatusBadge } from "@/registry/ui/status-badge"
import { MaskedGradientHeadline } from "@/registry/premium/masked-gradient-headline"

/**
 * A status page section: incident banner, operational badge, a gradient headline that wipes in, and a grid of uptime bars per service.
 * It composes the free IncidentBanner, StatusBadge and UptimeBar with
 * MaskedGradientHeadline, so the data components stay accessible and the
 * motion stays to one headline wipe and one rise. Copy the file and feed it
 * your real services and downtime days.
 *
 * Use it on a public status or reliability page. Reach for UptimeBar alone
 * inside product UI, and HealthIndicator for one service's state.
 *
 * @example
 * <StatusMarketing />
 */
const MORPH = { type: "spring", bounce: 0.16, duration: 0.5 } as const

function StatusMarketing({ className }: { className?: string }) {
  const reduce = useReducedMotion()
  return (
    <div data-slot="status-marketing" data-tier="premium" className={cn("space-y-8", className)}>
      <IncidentBanner title="All systems nominal — demo banner" severity="minor" />
      <div className="space-y-3 px-2">
        <StatusBadge tone="success">Operational</StatusBadge>
        <MaskedGradientHeadline>Uptime you can screenshot.</MaskedGradientHeadline>
        <motion.p initial={reduce ? false : { y: 8 }} whileInView={{ y: 0 }} viewport={{ once: true }} transition={reduce ? { duration: 0 } : MORPH} className="max-w-lg text-sm text-fg-muted">
          Status marketing page kit with real uptime bars and Hairline incident chrome.
        </motion.p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-surface p-4"><UptimeBar label="API" /></div>
        <div className="rounded-xl border border-border bg-surface p-4"><UptimeBar label="Dashboard" downtimes={[7]} /></div>
        <div className="rounded-xl border border-border bg-surface p-4"><UptimeBar label="Webhooks" downtimes={[20, 21]} /></div>
        <div className="rounded-xl border border-border bg-surface p-4"><UptimeBar label="Realtime" /></div>
      </div>
    </div>
  )
}
export { StatusMarketing }
