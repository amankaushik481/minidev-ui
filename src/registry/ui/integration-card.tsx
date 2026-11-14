"use client"
import * as React from "react"
import { Button } from "@/registry/ui/button"
import { Badge } from "@/registry/ui/badge"
import { cn } from "@/lib/utils"

/**
 * IntegrationCard — a third-party integration with its name, a one-line description, a Connected or Available badge and a Connect or Manage button.
 *
 * Use it in an integrations or app directory grid. For an account the user has
 * already linked (with its identity and a disconnect action) use
 * ConnectedAccount, and for single sign-on providers use SsoProviderCard.
 *
 * @example
 * <IntegrationCard name="Slack" description="Post invoice events to a channel." icon={<SlackLogo />} connected onManage={openSettings} />
 */
type IntegrationCardProps = {
  /** Integration name, also used to name the action button for screen readers. */
  name?: string
  /** One line about what the integration does. */
  description?: string
  /** Logo or icon shown before the name. */
  icon?: React.ReactNode
  /** Connected shows "Manage"; otherwise "Connect". */
  connected?: boolean
  /** Called by the Connect button. */
  onConnect?: () => void
  /** Called by the Manage button. */
  onManage?: () => void
  className?: string
}

function IntegrationCard({
  name = "Linear",
  description = "Sync issues into the engineering gallery.",
  icon,
  connected = false,
  onConnect,
  onManage,
  className,
}: IntegrationCardProps) {
  return (
    <div data-slot="integration-card" className={cn("rounded-xl border border-border bg-surface p-4 shadow-highlight", className)}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          {icon ? (
            <span aria-hidden className="grid size-8 shrink-0 place-items-center rounded-lg border border-border bg-raised [&_svg]:size-4">
              {icon}
            </span>
          ) : null}
          <div className="min-w-0">
            <h3 className="text-sm font-medium text-fg">{name}</h3>
            <p className="mt-1 text-xs leading-[1.55] text-pretty text-fg-muted">{description}</p>
          </div>
        </div>
        <Badge variant={connected ? "accent" : "outline"}>{connected ? "Connected" : "Available"}</Badge>
      </div>
      <Button
        type="button"
        className="mt-4 w-full"
        size="sm"
        variant={connected ? "outline" : "default"}
        aria-label={`${connected ? "Manage" : "Connect"} ${name}`}
        onClick={connected ? onManage : onConnect}
      >
        {connected ? "Manage" : "Connect"}
      </Button>
    </div>
  )
}
export { IntegrationCard }
export type { IntegrationCardProps }
