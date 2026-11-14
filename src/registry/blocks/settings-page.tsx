"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { PageHeader } from "@/registry/ui/page-header"
import { ProfileForm } from "@/registry/ui/profile-form"
import { ThemePicker } from "@/registry/ui/theme-picker"
import { NotificationPreferences } from "@/registry/ui/notification-preferences"
import { DangerZone } from "@/registry/ui/danger-zone"

/**
 * SettingsPage — an account settings page: profile form, theme picker, notification channels and a danger zone, in that order.
 *
 * Use for a single-column personal or workspace settings screen. For admin-only controls (users, SSO, quotas) use
 * AdminConsole; for billing use BillingPage. Each section is a registry component, so drop the ones you do not need.
 * The theme picker applies to the whole document by default.
 *
 * @example
 * <SettingsPage className="max-w-2xl" />
 */
type SettingsPageProps = {
  className?: string
}

function SettingsPage({ className }: SettingsPageProps) {
  const id = React.useId()
  return (
    <div data-slot="settings-page" className={cn("space-y-8", className)}>
      <PageHeader title="Settings" description="Your profile, appearance and notifications in Lumen." />
      <section aria-labelledby={`${id}-profile`} className="space-y-3">
        <h2 id={`${id}-profile`} className="text-sm font-medium text-fg">
          Profile
        </h2>
        <ProfileForm />
      </section>
      <section aria-labelledby={`${id}-theme`} className="space-y-3">
        <h2 id={`${id}-theme`} className="text-sm font-medium text-fg">
          Theme
        </h2>
        <ThemePicker />
      </section>
      <section aria-labelledby={`${id}-notify`} className="space-y-3">
        <h2 id={`${id}-notify`} className="text-sm font-medium text-fg">
          Notifications
        </h2>
        <NotificationPreferences />
      </section>
      <DangerZone />
    </div>
  )
}

export { SettingsPage }
export type { SettingsPageProps }
