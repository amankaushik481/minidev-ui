"use client"
import { BellIcon, CreditCardIcon, ShieldIcon, UserIcon } from "lucide-react"
import { SettingsLayout, SettingsSection } from "@/registry/ui/settings-layout"
import { SidebarNavItem } from "@/registry/ui/sidebar"
import { FormField } from "@/registry/ui/form-field"
import { Input } from "@/registry/ui/input"
import { NotificationPreferences } from "@/registry/ui/notification-preferences"
import { SessionList } from "@/registry/ui/session-list"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Account settings",
    description: "The nav rail takes any items; the active one gets aria-current. Each SettingsSection is a named region with its own h2.",
    code: `<SettingsLayout
  className="w-full max-w-3xl"
  navLabel="Account settings"
  nav={
    <>
      <SidebarNavItem icon={<UserIcon />} active>Profile</SidebarNavItem>
      <SidebarNavItem icon={<BellIcon />}>Notifications</SidebarNavItem>
      <SidebarNavItem icon={<ShieldIcon />}>Security</SidebarNavItem>
      <SidebarNavItem icon={<CreditCardIcon />}>Billing</SidebarNavItem>
    </>
  }
>
  <SettingsSection title="Profile" description="Shown on invoices you send.">
    <FormField id="settings-name" label="Display name">
      <Input id="settings-name" defaultValue="Ines Duarte" />
    </FormField>
  </SettingsSection>
  <SettingsSection title="Notifications" description="Where we reach you about your workspace.">
    <NotificationPreferences />
  </SettingsSection>
</SettingsLayout>`,
    node: (
      <SettingsLayout
        className="w-full max-w-3xl"
        navLabel="Account settings"
        nav={
          <>
            <SidebarNavItem icon={<UserIcon />} active>Profile</SidebarNavItem>
            <SidebarNavItem icon={<BellIcon />}>Notifications</SidebarNavItem>
            <SidebarNavItem icon={<ShieldIcon />}>Security</SidebarNavItem>
            <SidebarNavItem icon={<CreditCardIcon />}>Billing</SidebarNavItem>
          </>
        }
      >
        <SettingsSection title="Profile" description="Shown on invoices you send.">
          <FormField id="settings-name" label="Display name">
            <Input id="settings-name" defaultValue="Ines Duarte" />
          </FormField>
        </SettingsSection>
        <SettingsSection title="Notifications" description="Where we reach you about your workspace.">
          <NotificationPreferences />
        </SettingsSection>
      </SettingsLayout>
    ),
  },
  {
    title: "Security section",
    description: "Any control fits inside a section. Here the Security page lists signed-in sessions.",
    code: `<SettingsLayout
  className="w-full max-w-3xl"
  nav={
    <>
      <SidebarNavItem icon={<UserIcon />}>Profile</SidebarNavItem>
      <SidebarNavItem icon={<ShieldIcon />} active>Security</SidebarNavItem>
    </>
  }
>
  <SettingsSection title="Sessions" description="Sign out devices you don't recognise.">
    <SessionList />
  </SettingsSection>
</SettingsLayout>`,
    node: (
      <SettingsLayout
        className="w-full max-w-3xl"
        nav={
          <>
            <SidebarNavItem icon={<UserIcon />}>Profile</SidebarNavItem>
            <SidebarNavItem icon={<ShieldIcon />} active>Security</SidebarNavItem>
          </>
        }
      >
        <SettingsSection title="Sessions" description="Sign out devices you don't recognise.">
          <SessionList />
        </SettingsSection>
      </SettingsLayout>
    ),
  },
]
