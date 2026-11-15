"use client"
import { ReceiptIcon, SettingsIcon, UsersIcon } from "lucide-react"
import { AppShell } from "@/registry/ui/app-shell"
import { Button } from "@/registry/ui/button"
import { PageHeader } from "@/registry/ui/page-header"
import { SidebarNavItem } from "@/registry/ui/sidebar"
import { Topbar } from "@/registry/ui/topbar"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Workspace with sidebar",
    description: "Navigation goes in sidebar, named by sidebarLabel; children render inside the main landmark.",
    code: `<AppShell
  sidebarLabel="Workspace"
  sidebar={
    <nav aria-label="Main" className="flex flex-col gap-1 py-3">
      <SidebarNavItem icon={<ReceiptIcon />} active>Invoices</SidebarNavItem>
      <SidebarNavItem icon={<UsersIcon />}>Customers</SidebarNavItem>
      <SidebarNavItem icon={<SettingsIcon />}>Settings</SidebarNavItem>
    </nav>
  }
  topbar={<Topbar title="Lumen" right={<Button size="sm">New invoice</Button>} />}
  className="w-full"
>
  <PageHeader title="Invoices" description="12 open, 3 overdue this month." />
  <p className="text-sm text-fg-muted">Your invoice table goes here. Only this area scrolls.</p>
</AppShell>`,
    node: (
      <AppShell
        sidebarLabel="Workspace"
        sidebar={
          <nav aria-label="Main" className="flex flex-col gap-1 py-3">
            <SidebarNavItem icon={<ReceiptIcon />} active>Invoices</SidebarNavItem>
            <SidebarNavItem icon={<UsersIcon />}>Customers</SidebarNavItem>
            <SidebarNavItem icon={<SettingsIcon />}>Settings</SidebarNavItem>
          </nav>
        }
        topbar={<Topbar title="Lumen" right={<Button size="sm">New invoice</Button>} />}
        className="w-full"
      >
        <PageHeader title="Invoices" description="12 open, 3 overdue this month." />
        <p className="text-sm text-fg-muted">Your invoice table goes here. Only this area scrolls.</p>
      </AppShell>
    ),
  },
  {
    title: "Top bar only",
    description: "Leave out sidebar for focused flows like onboarding; the content area still scrolls under the bar.",
    code: `<AppShell
  topbar={<Topbar title="Set up Lumen" right={<Button size="sm" variant="ghost">Skip for now</Button>} />}
  className="min-h-[320px] w-full max-w-xl"
>
  <div className="mx-auto flex max-w-sm flex-col items-center gap-2 py-8 text-center">
    <p className="text-lg font-medium text-fg">Connect your bank</p>
    <p className="text-sm text-fg-muted">Lumen matches incoming payments to open invoices every night.</p>
    <Button className="mt-2">Connect bank account</Button>
  </div>
</AppShell>`,
    node: (
      <AppShell
        topbar={<Topbar title="Set up Lumen" right={<Button size="sm" variant="ghost">Skip for now</Button>} />}
        className="min-h-[320px] w-full max-w-xl"
      >
        <div className="mx-auto flex max-w-sm flex-col items-center gap-2 py-8 text-center">
          <p className="text-lg font-medium text-fg">Connect your bank</p>
          <p className="text-sm text-fg-muted">Lumen matches incoming payments to open invoices every night.</p>
          <Button className="mt-2">Connect bank account</Button>
        </div>
      </AppShell>
    ),
  },
]
