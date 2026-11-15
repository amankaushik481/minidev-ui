"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Switch } from "@/registry/ui/switch"
import { Button } from "@/registry/ui/button"
import { StatusBadge } from "@/registry/ui/status-badge"

/**
 * A settings card for one SSO identity provider (Okta, Azure AD, Google Workspace): name, status badge, enable switch and Configure button.
 *
 * Render one per provider in an organisation's security settings. The switch is controlled:
 * pass `enabled` and update it in `onEnabledChange`. `configured` only changes the badge, so block
 * enabling an unconfigured provider in your handler. For a third-party app connection use
 * IntegrationCard; for the sign-in screen itself use SignInPage or AuthCard.
 *
 * @example
 * <SsoProviderCard name="Okta" description="SAML 2.0" configured enabled={on} onEnabledChange={setOn} onConfigure={openSetup} />
 */
type SsoProviderCardProps = {
  /** Provider name, e.g. "Okta". */
  name: string
  /** Protocol or a one-line note, e.g. "SAML 2.0 · 12 users". */
  description: string
  /** Whether sign-in through this provider is on. */
  enabled?: boolean
  /** Shows "Configured" (success) instead of "Not set". */
  configured?: boolean
  /** Called with the new value when the switch is toggled. */
  onEnabledChange?: (enabled: boolean) => void
  /** Called by the Configure button. */
  onConfigure?: () => void
  className?: string
}

function SsoProviderCard({
  name,
  description,
  enabled,
  configured,
  onEnabledChange,
  onConfigure,
  className,
}: SsoProviderCardProps) {
  const id = React.useId()
  return (
    <div data-slot="sso-provider-card" className={cn("flex flex-col gap-3 rounded-xl border border-border bg-surface p-4 shadow-highlight", className)}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-sm font-medium text-fg">{name}</h3>
            <StatusBadge tone={configured ? "success" : "neutral"}>{configured ? "Configured" : "Not set"}</StatusBadge>
          </div>
          <p className="mt-1 text-xs text-fg-muted">{description}</p>
        </div>
        <Switch id={id} checked={enabled} onCheckedChange={onEnabledChange} aria-label={`Enable ${name}`} />
      </div>
      <Button type="button" size="sm" variant="outline" onClick={onConfigure} aria-label={`Configure ${name}`}>Configure</Button>
    </div>
  )
}
export { SsoProviderCard }
export type { SsoProviderCardProps }
