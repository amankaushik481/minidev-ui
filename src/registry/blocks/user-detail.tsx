"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { ActivityFeed } from "@/registry/ui/activity-feed"
import { Avatar, AvatarFallback } from "@/registry/ui/avatar"
import { BackLink } from "@/registry/ui/back-link"
import { Button } from "@/registry/ui/button"
import { DescriptionList } from "@/registry/ui/description-list"
import { PageHeader } from "@/registry/ui/page-header"
import { StatusBadge } from "@/registry/ui/status-badge"

/**
 * UserDetail — one person's admin page: back link, avatar and name as the title, account facts, then their recent activity.
 *
 * Use as the target of a row in UsersTablePage or AdminConsole. For a non-person record use ProjectDetail;
 * for a single member row inside a list use TeamMemberRow. Swap the sample Lumen user for your data.
 *
 * @example
 * <UserDetail />
 */
type UserDetailProps = {
  className?: string
}

function UserDetail({ className }: UserDetailProps) {
  const id = React.useId()
  return (
    <div data-slot="user-detail" className={cn("space-y-6", className)}>
      <BackLink href="#">Users</BackLink>
      <PageHeader
        title={
          <span className="inline-flex items-center gap-3">
            <Avatar className="size-10">
              <AvatarFallback aria-hidden>PR</AvatarFallback>
            </Avatar>
            Priya Raman
          </span>
        }
        description="VP Finance · priya@halcyon.co"
        actions={
          <>
            <Button size="sm" variant="outline">
              Reset 2FA
            </Button>
            <Button size="sm" variant="destructive">
              Suspend
            </Button>
          </>
        }
      />
      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <section aria-labelledby={`${id}-account`} className="min-w-0">
          <h2 id={`${id}-account`} className="mb-3 text-sm font-medium text-fg">
            Account
          </h2>
          <DescriptionList
            items={[
              { label: "Role", value: "Admin" },
              { label: "Status", value: <StatusBadge tone="success">Active</StatusBadge> },
              { label: "Sign-in", value: "Okta SSO, 2FA on" },
              { label: "Member since", value: <time dateTime="2025-03-12">Mar 12, 2025</time> },
              { label: "Seats managed", value: <span className="tabular-nums">12</span> },
            ]}
          />
        </section>
        <section aria-labelledby={`${id}-activity`} className="min-w-0">
          <h2 id={`${id}-activity`} className="mb-3 text-sm font-medium text-fg">
            Recent activity
          </h2>
          <ActivityFeed
            className="max-w-none"
            items={[
              { id: "u1", user: "Priya Raman", action: "exported the Q3 revenue report", time: "20m ago" },
              { id: "u2", user: "Priya Raman", action: "invited Tom Lindqvist as Member", time: "3h ago" },
              { id: "u3", user: "Priya Raman", action: "connected HubSpot", time: "Mon" },
            ]}
          />
        </section>
      </div>
    </div>
  )
}

export { UserDetail }
export type { UserDetailProps }
