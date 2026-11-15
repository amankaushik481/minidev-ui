"use client"
import * as React from "react"
import { HouseIcon, InboxIcon, ReceiptIcon, SettingsIcon, UsersIcon } from "lucide-react"
import { CollapsibleSidebar } from "@/registry/ui/collapsible-sidebar"
import { SidebarNavItem } from "@/registry/ui/sidebar"
import { SidebarSection } from "@/registry/ui/sidebar-section"
import type { Example } from "./types"

function ControlledSidebar() {
  const [collapsed, setCollapsed] = React.useState(false)
  return (
    <div className="flex h-80 w-full max-w-lg rounded-xl border border-border bg-bg">
      <CollapsibleSidebar collapsed={collapsed} onCollapsedChange={setCollapsed}>
        <nav aria-label="Main">
          <SidebarSection title={collapsed ? undefined : "Billing"}>
            <SidebarNavItem icon={<ReceiptIcon />} active>Invoices</SidebarNavItem>
            <SidebarNavItem icon={<UsersIcon />}>Customers</SidebarNavItem>
          </SidebarSection>
          <SidebarSection title={collapsed ? undefined : "Workspace"}>
            <SidebarNavItem icon={<SettingsIcon />}>Settings</SidebarNavItem>
          </SidebarSection>
        </nav>
      </CollapsibleSidebar>
      <p className="p-6 text-sm text-fg-muted">Sidebar is {collapsed ? "collapsed" : "expanded"}.</p>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Uncontrolled rail",
    description: "Press the edge toggle to shrink it to icons; labels stay readable by screen readers.",
    code: `<div className="flex h-72 w-full max-w-lg rounded-xl border border-border bg-bg">
  <CollapsibleSidebar>
    <nav aria-label="Main" className="space-y-0.5 py-3">
      <SidebarNavItem icon={<HouseIcon />} active>Home</SidebarNavItem>
      <SidebarNavItem icon={<InboxIcon />}>Inbox</SidebarNavItem>
      <SidebarNavItem icon={<ReceiptIcon />}>Invoices</SidebarNavItem>
      <SidebarNavItem icon={<SettingsIcon />}>Settings</SidebarNavItem>
    </nav>
  </CollapsibleSidebar>
</div>`,
    node: (
      <div className="flex h-72 w-full max-w-lg rounded-xl border border-border bg-bg">
        <CollapsibleSidebar>
          <nav aria-label="Main" className="space-y-0.5 py-3">
            <SidebarNavItem icon={<HouseIcon />} active>Home</SidebarNavItem>
            <SidebarNavItem icon={<InboxIcon />}>Inbox</SidebarNavItem>
            <SidebarNavItem icon={<ReceiptIcon />}>Invoices</SidebarNavItem>
            <SidebarNavItem icon={<SettingsIcon />}>Settings</SidebarNavItem>
          </nav>
        </CollapsibleSidebar>
      </div>
    ),
  },
  {
    title: "Controlled, with sections",
    description: "Hold the state yourself to save it, and drop section titles while the rail is collapsed.",
    code: `function ControlledSidebar() {
  const [collapsed, setCollapsed] = React.useState(false)
  return (
    <div className="flex h-80 w-full max-w-lg rounded-xl border border-border bg-bg">
      <CollapsibleSidebar collapsed={collapsed} onCollapsedChange={setCollapsed}>
        <nav aria-label="Main">
          <SidebarSection title={collapsed ? undefined : "Billing"}>
            <SidebarNavItem icon={<ReceiptIcon />} active>Invoices</SidebarNavItem>
            <SidebarNavItem icon={<UsersIcon />}>Customers</SidebarNavItem>
          </SidebarSection>
          <SidebarSection title={collapsed ? undefined : "Workspace"}>
            <SidebarNavItem icon={<SettingsIcon />}>Settings</SidebarNavItem>
          </SidebarSection>
        </nav>
      </CollapsibleSidebar>
      <p className="p-6 text-sm text-fg-muted">Sidebar is {collapsed ? "collapsed" : "expanded"}.</p>
    </div>
  )
}`,
    node: <ControlledSidebar />,
  },
]
