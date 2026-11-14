"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { ActivityFeed } from "@/registry/ui/activity-feed"
import { BackLink } from "@/registry/ui/back-link"
import { Button } from "@/registry/ui/button"
import { DescriptionList } from "@/registry/ui/description-list"
import { PageHeader } from "@/registry/ui/page-header"
import { StatusBadge } from "@/registry/ui/status-badge"

/**
 * ProjectDetail — a record page: back link, title with status and actions, a facts list, then recent activity.
 *
 * Use for any "one item" screen (a project, customer, invoice) reached from a list. For the list itself use
 * ProjectList; for a person use UserDetail. Composes PageHeader, DescriptionList and ActivityFeed; swap the
 * sample Lumen board-pack data for your record.
 *
 * @example
 * <ProjectDetail />
 */
type ProjectDetailProps = {
  className?: string
}

function ProjectDetail({ className }: ProjectDetailProps) {
  const id = React.useId()
  return (
    <div data-slot="project-detail" className={cn("space-y-6", className)}>
      <BackLink href="#">Projects</BackLink>
      <PageHeader
        title="Q4 board pack"
        description="Monthly close and board reporting for Northwind Traders."
        actions={
          <>
            <StatusBadge tone="success" className="self-center">
              On track
            </StatusBadge>
            <Button size="sm" variant="outline">
              Share
            </Button>
            <Button size="sm">Open report</Button>
          </>
        }
      />
      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <section aria-labelledby={`${id}-facts`} className="min-w-0">
          <h2 id={`${id}-facts`} className="mb-3 text-sm font-medium text-fg">
            Details
          </h2>
          <DescriptionList
            items={[
              { label: "Owner", value: "Priya Raman" },
              { label: "Sources", value: "Stripe, Postgres, HubSpot" },
              { label: "Due", value: <time dateTime="2026-12-05">Dec 5, 2026</time> },
              { label: "Reviewers", value: "Hana Ito, Tom Lindqvist" },
              { label: "Last refresh", value: <span className="tabular-nums">Today, 08:02</span> },
            ]}
          />
        </section>
        <section aria-labelledby={`${id}-activity`} className="min-w-0">
          <h2 id={`${id}-activity`} className="mb-3 text-sm font-medium text-fg">
            Activity
          </h2>
          <ActivityFeed
            className="max-w-none"
            items={[
              { id: "a1", user: "Priya Raman", action: "approved the revenue section", time: "12m ago" },
              { id: "a2", user: "Lumen", action: "refreshed 38 tables from Postgres", time: "1h ago" },
              { id: "a3", user: "Tom Lindqvist", action: "commented on deferred revenue", time: "Yesterday" },
            ]}
          />
        </section>
      </div>
    </div>
  )
}

export { ProjectDetail }
export type { ProjectDetailProps }
