"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * A two-column settings page: a 200px nav rail beside stacked, divided SettingsSection blocks (one column on mobile).
 *
 * Use SettingsLayout for the page frame and SettingsSection for each titled group of controls.
 * For app-wide navigation use Sidebar instead.
 *
 * @example
 * <SettingsLayout nav={<SidebarNavItem active>Profile</SidebarNavItem>}>
 *   <SettingsSection title="Profile" description="How others see you.">…</SettingsSection>
 * </SettingsLayout>
 */
type SettingsLayoutProps = {
  /** Navigation rail content, usually links or SidebarNavItems. */
  nav: React.ReactNode
  /** Accessible name for the navigation rail. */
  navLabel?: string
  /** The SettingsSection blocks. */
  children: React.ReactNode
  className?: string
}

function SettingsLayout({ nav, navLabel = "Settings", children, className }: SettingsLayoutProps) {
  return (
    <div data-slot="settings-layout" className={cn("grid gap-6 md:grid-cols-[200px_1fr]", className)}>
      <nav aria-label={navLabel} className="space-y-1">{nav}</nav>
      <div className="min-w-0">{children}</div>
    </div>
  )
}

type SettingsSectionProps = {
  /** Section heading; also names the region for screen readers. */
  title: string
  /** One line under the heading. */
  description?: string
  children: React.ReactNode
  className?: string
}

function SettingsSection({ title, description, children, className }: SettingsSectionProps) {
  const id = React.useId()
  return (
    <section data-slot="settings-section" aria-labelledby={id} className={cn("border-b border-border py-6 last:border-b-0", className)}>
      <h2 id={id} className="text-sm font-medium text-fg">{title}</h2>
      {description ? <p className="mt-1 text-xs text-fg-muted">{description}</p> : null}
      <div className="mt-4">{children}</div>
    </section>
  )
}
export { SettingsLayout, SettingsSection }
export type { SettingsLayoutProps, SettingsSectionProps }
