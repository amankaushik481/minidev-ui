"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Switch } from "@/registry/ui/switch"
import { Button } from "@/registry/ui/button"
import { StatusBadge } from "@/registry/ui/status-badge"

function SsoProviderCard({
  name,
  description,
  enabled,
  configured,
  onEnabledChange,
  onConfigure,
  className,
}: {
  name: string
  description: string
  enabled?: boolean
  configured?: boolean
  onEnabledChange?: (v: boolean) => void
  onConfigure?: () => void
  className?: string
}) {
  const id = React.useId()
  return (
    <div data-slot="sso-provider-card" className={cn("flex flex-col gap-3 rounded-xl border border-border bg-surface p-4", className)}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-medium text-fg">{name}</h3>
            <StatusBadge tone={configured ? "success" : "neutral"}>{configured ? "Configured" : "Not set"}</StatusBadge>
          </div>
          <p className="mt-1 text-xs text-fg-muted">{description}</p>
        </div>
        <Switch id={id} checked={enabled} onCheckedChange={onEnabledChange} aria-label={`Enable ${name}`} />
      </div>
      <Button type="button" size="sm" variant="outline" onClick={onConfigure}>Configure</Button>
    </div>
  )
}
export { SsoProviderCard }
