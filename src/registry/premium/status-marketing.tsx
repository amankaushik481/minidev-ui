"use client"
import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"
import { UptimeBar } from "@/registry/ui/uptime-bar"
import { IncidentBanner } from "@/registry/ui/incident-banner"
import { StatusBadge } from "@/registry/ui/status-badge"
import { MaskedGradientHeadline } from "@/registry/premium/masked-gradient-headline"

function StatusMarketing({ className }: { className?: string }) {
  const reduce = useReducedMotion()
  return (
    <div data-slot="status-marketing" data-tier="premium" className={cn("space-y-8", className)}>
      <IncidentBanner title="All systems nominal — demo banner" severity="minor" />
      <div className="space-y-3 px-2">
        <StatusBadge tone="success">Operational</StatusBadge>
        <MaskedGradientHeadline>Uptime you can screenshot.</MaskedGradientHeadline>
        <motion.p initial={reduce ? false : { y: 8 }} whileInView={{ y: 0 }} viewport={{ once: true }} className="max-w-lg text-sm text-fg-muted">
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
