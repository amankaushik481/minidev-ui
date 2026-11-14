"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Switch } from "@/registry/ui/switch"
import { Label } from "@/registry/ui/label"

/**
 * FeatureFlagToggle — a bordered row with a flag name, a description and a switch that turns the flag on or off.
 *
 * Use in admin and settings screens for named flags or experiments. The
 * switch is labelled by the name and described by the description. For a
 * plain labelled switch use `Switch` with `label`; for a grid of notification
 * channels use `NotificationPreferences`.
 *
 * @example
 * <FeatureFlagToggle
 *   name="new-invoice-editor"
 *   description="Roll out the v2 editor to this workspace."
 *   checked={enabled}
 *   onCheckedChange={setEnabled}
 * />
 */
type FeatureFlagToggleProps = {
  /** Flag name; also the switch's accessible name. */
  name: string
  /** What the flag changes. */
  description?: string
  /** Controlled on/off state. */
  checked?: boolean
  /** Initial state when uncontrolled. */
  defaultChecked?: boolean
  /** Called with the new state. */
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  className?: string
}

function FeatureFlagToggle({ name, description, checked, defaultChecked, onCheckedChange, disabled, className }: FeatureFlagToggleProps) {
  const id = React.useId()
  return (
    <div
      data-slot="feature-flag-toggle"
      className={cn("flex items-start justify-between gap-4 rounded-xl border border-border bg-surface px-4 py-3", className)}
    >
      <div className="min-w-0">
        <Label htmlFor={id} className="text-sm font-medium text-fg">
          {name}
        </Label>
        {description ? (
          <p id={`${id}-desc`} className="mt-0.5 text-xs text-fg-muted">
            {description}
          </p>
        ) : null}
      </div>
      <Switch
        id={id}
        checked={checked}
        defaultChecked={defaultChecked}
        onCheckedChange={(next) => onCheckedChange?.(next)}
        disabled={disabled}
        aria-label={name}
        aria-describedby={description ? `${id}-desc` : undefined}
      />
    </div>
  )
}
export { FeatureFlagToggle }
export type { FeatureFlagToggleProps }
