"use client"
import * as React from "react"
import { Button } from "@/registry/ui/button"
import { cn } from "@/lib/utils"

/**
 * A settings row for a linked third-party account: provider, account handle and a Disconnect button.
 *
 * Stack one per provider under an "Connected accounts" heading in settings. For an integration with a Connect state and description
 * use IntegrationCard; for SSO setup use SsoProviderCard. Bring your own provider logo through `icon`.
 *
 * @example
 * <ConnectedAccount provider="GitHub" account="@maya-chen" icon={<GithubIcon />} onDisconnect={() => unlink("github")} />
 */
type ConnectedAccountProps = {
  /** Provider name, e.g. "GitHub". */
  provider: string
  /** The linked account, e.g. an email or handle. */
  account: string
  /** Leading logo or icon, sized to 20px. */
  icon?: React.ReactNode
  /** Runs when Disconnect is pressed. Confirm first if unlinking loses data. */
  onDisconnect?: () => void
  /** Button text. Defaults to "Disconnect". */
  actionLabel?: string
  className?: string
}

function ConnectedAccount({ provider, account, icon, onDisconnect, actionLabel = "Disconnect", className }: ConnectedAccountProps) {
  return (
    <div
      data-slot="connected-account"
      className={cn("flex items-center justify-between gap-3 rounded-xl border border-border px-3 py-3", className)}
    >
      <div className="flex min-w-0 items-center gap-3">
        {icon ? <span aria-hidden className="shrink-0 text-fg [&_svg]:size-5">{icon}</span> : null}
        <div className="min-w-0">
          <p className="text-sm font-medium text-fg">{provider}</p>
          <p className="truncate text-xs text-fg-muted">{account}</p>
        </div>
      </div>
      <Button type="button" size="sm" variant="outline" aria-label={`${actionLabel} ${provider}`} onClick={onDisconnect}>
        {actionLabel}
      </Button>
    </div>
  )
}
export { ConnectedAccount }
export type { ConnectedAccountProps }
