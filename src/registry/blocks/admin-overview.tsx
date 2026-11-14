"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { ActivityFeed } from "@/registry/ui/activity-feed"
import { AdminStatStrip } from "@/registry/ui/admin-stat-strip"
import { Button } from "@/registry/ui/button"
import { PageHeader } from "@/registry/ui/page-header"

/**
 * AdminOverview — an admin landing page: title with "Invite admin", four org KPIs with deltas, then recent admin activity.
 *
 * Use as the first screen of an admin area. For the full tabbed admin (users, SSO, quotas, import) use
 * AdminConsole; for product metrics with charts use AnalyticsPage. Composes AdminStatStrip and ActivityFeed.
 *
 * @example
 * <AdminOverview onInvite={() => setInviteOpen(true)} />
 */
type AdminOverviewProps = {
  /** Called by the "Invite admin" button. */
  onInvite?: () => void
  className?: string
}

function AdminOverview({ onInvite, className }: AdminOverviewProps) {
  const id = React.useId()
  return (
    <div data-slot="admin-overview" className={cn("space-y-6", className)}>
      <PageHeader
        title="Admin overview"
        description="Seats, revenue and security events for the Halcyon workspace."
        actions={
          <Button size="sm" onClick={onInvite}>
            Invite admin
          </Button>
        }
      />
      <AdminStatStrip
        stats={[
          { label: "Seats", value: "42", delta: 4 },
          { label: "MRR", value: "$48,290", delta: 3.1 },
          { label: "Active today", value: "31", delta: 12 },
          { label: "Failed sign-ins", value: "6", delta: -40 },
        ]}
      />
      <section aria-labelledby={`${id}-activity`} className="space-y-3">
        <h2 id={`${id}-activity`} className="text-sm font-medium text-fg">
          Recent admin activity
        </h2>
        <ActivityFeed
          className="max-w-none"
          items={[
            { id: "a1", user: "Priya Raman", action: "upgraded the workspace to Team", time: "2m ago" },
            { id: "a2", user: "Hana Ito", action: "rotated the production API key", time: "14m ago" },
            { id: "a3", user: "Aisha Karim", action: "turned on SAML single sign-on", time: "1h ago" },
            { id: "a4", user: "Tom Lindqvist", action: "removed 2 inactive seats", time: "Yesterday" },
          ]}
        />
      </section>
    </div>
  )
}

export { AdminOverview }
export type { AdminOverviewProps }
