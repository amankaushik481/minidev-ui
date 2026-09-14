"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Switch } from "@/registry/ui/switch"
import { Label } from "@/registry/ui/label"

function FeatureFlagToggle({
  name,
  description,
  checked,
  onCheckedChange,
  className,
}: {
  name: string
  description?: string
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  className?: string
}) {
  const id = React.useId()
  return (
    <div
      data-slot="feature-flag-toggle"
      className={cn(
        "flex items-start justify-between gap-4 rounded-xl border border-border bg-surface px-4 py-3",
        className
      )}
    >
      <div className="min-w-0">
        <Label htmlFor={id} className="text-sm font-medium text-fg">{name}</Label>
        {description ? <p className="mt-0.5 text-xs text-fg-muted">{description}</p> : null}
      </div>
      <Switch id={id} checked={checked} onCheckedChange={onCheckedChange} aria-label={name} />
    </div>
  )
}
export { FeatureFlagToggle }
