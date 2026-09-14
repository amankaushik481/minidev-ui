"use client"
import { PageHeader } from "@/registry/ui/page-header"
import { ProfileForm } from "@/registry/ui/profile-form"
import { ThemePicker } from "@/registry/ui/theme-picker"
import { NotificationPreferences } from "@/registry/ui/notification-preferences"
import { DangerZone } from "@/registry/ui/danger-zone"

function SettingsPage() {
  return (
    <div data-slot="settings-page" className="space-y-8">
      <PageHeader title="Settings" description="Profile, theme, and notifications for this workspace." />
      <ProfileForm />
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-fg">Theme</h3>
        <ThemePicker />
      </div>
      <NotificationPreferences />
      <DangerZone />
    </div>
  )
}
export { SettingsPage }
