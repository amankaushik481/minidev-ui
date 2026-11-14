"use client"
import * as React from "react"
import { Switch } from "@/registry/ui/switch"
import { Label } from "@/registry/ui/label"
import { cn } from "@/lib/utils"

/**
 * NotificationPreferences — a list of labelled on/off switches for notification channels (email digests, product updates, security alerts).
 *
 * Each row's label is wired to its switch, ids are unique per instance, and
 * `onCheckedChange` reports which channel changed. Switches are uncontrolled from
 * `defaultChecked`; persist changes in the callback. Use it on settings pages.
 *
 * @example
 * <NotificationPreferences
 *   items={[{ id: "email", label: "Email digests", defaultChecked: true }, { id: "sms", label: "SMS alerts" }]}
 *   onCheckedChange={(id, on) => savePreference(id, on)}
 * />
 */
type NotificationPreference = {
  /** Stable key passed back to onCheckedChange. */
  id: string
  label: string
  /** Initial state. */
  defaultChecked?: boolean
}

type NotificationPreferencesProps = {
  /** Channels in display order. */
  items?: NotificationPreference[]
  /** Fires with the channel id and its new state. */
  onCheckedChange?: (id: string, checked: boolean) => void
  className?: string
}

const ITEMS: NotificationPreference[] = [
  { id: "email", label: "Email digests", defaultChecked: true },
  { id: "product", label: "Product updates", defaultChecked: false },
  { id: "security", label: "Security alerts", defaultChecked: true },
]

function NotificationPreferences({ items = ITEMS, onCheckedChange, className }: NotificationPreferencesProps) {
  const uid = React.useId()
  return (
    <div data-slot="notification-preferences" className={cn("space-y-3", className)}>
      {items.map((item) => {
        const fieldId = `${uid}-${item.id}`
        return (
          <div key={item.id} className="flex items-center justify-between gap-3">
            <Label htmlFor={fieldId}>{item.label}</Label>
            <Switch
              id={fieldId}
              defaultChecked={item.defaultChecked}
              onCheckedChange={(checked) => onCheckedChange?.(item.id, checked)}
            />
          </div>
        )
      })}
    </div>
  )
}
export { NotificationPreferences }
export type { NotificationPreferencesProps, NotificationPreference }
