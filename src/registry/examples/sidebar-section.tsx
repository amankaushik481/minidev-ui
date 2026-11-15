"use client"
import { ChartColumnIcon, InboxIcon, LifeBuoyIcon, ReceiptIcon, SettingsIcon, UsersIcon } from "lucide-react"
import { Sidebar, SidebarNavItem } from "@/registry/ui/sidebar"
import { SidebarSection } from "@/registry/ui/sidebar-section"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Grouped app navigation",
    description: "One titled section per cluster of pages; screen readers announce the title as the group name.",
    code: `<div className="flex h-96 rounded-xl border border-border bg-bg">
  <Sidebar>
    <nav aria-label="Main">
      <SidebarSection title="Workspace">
        <SidebarNavItem icon={<InboxIcon />} active>Inbox</SidebarNavItem>
        <SidebarNavItem icon={<ChartColumnIcon />}>Reports</SidebarNavItem>
      </SidebarSection>
      <SidebarSection title="Billing">
        <SidebarNavItem icon={<ReceiptIcon />}>Invoices</SidebarNavItem>
        <SidebarNavItem icon={<UsersIcon />}>Customers</SidebarNavItem>
      </SidebarSection>
    </nav>
  </Sidebar>
</div>`,
    node: (
      <div className="flex h-96 rounded-xl border border-border bg-bg">
        <Sidebar>
          <nav aria-label="Main">
            <SidebarSection title="Workspace">
              <SidebarNavItem icon={<InboxIcon />} active>Inbox</SidebarNavItem>
              <SidebarNavItem icon={<ChartColumnIcon />}>Reports</SidebarNavItem>
            </SidebarSection>
            <SidebarSection title="Billing">
              <SidebarNavItem icon={<ReceiptIcon />}>Invoices</SidebarNavItem>
              <SidebarNavItem icon={<UsersIcon />}>Customers</SidebarNavItem>
            </SidebarSection>
          </nav>
        </Sidebar>
      </div>
    ),
  },
  {
    title: "Untitled footer group",
    description: "Leave out the title for a group pinned to the bottom of the sidebar; it renders as a plain div.",
    code: `<div className="flex h-80 rounded-xl border border-border bg-bg">
  <Sidebar>
    <nav aria-label="Main">
      <SidebarSection title="Projects">
        <SidebarNavItem active>Q4 board pack</SidebarNavItem>
        <SidebarNavItem>Starter churn review</SidebarNavItem>
      </SidebarSection>
    </nav>
    <SidebarSection className="mt-auto border-t border-border">
      <SidebarNavItem icon={<LifeBuoyIcon />}>Help</SidebarNavItem>
      <SidebarNavItem icon={<SettingsIcon />}>Settings</SidebarNavItem>
    </SidebarSection>
  </Sidebar>
</div>`,
    node: (
      <div className="flex h-80 rounded-xl border border-border bg-bg">
        <Sidebar>
          <nav aria-label="Main">
            <SidebarSection title="Projects">
              <SidebarNavItem active>Q4 board pack</SidebarNavItem>
              <SidebarNavItem>Starter churn review</SidebarNavItem>
            </SidebarSection>
          </nav>
          <SidebarSection className="mt-auto border-t border-border">
            <SidebarNavItem icon={<LifeBuoyIcon />}>Help</SidebarNavItem>
            <SidebarNavItem icon={<SettingsIcon />}>Settings</SidebarNavItem>
          </SidebarSection>
        </Sidebar>
      </div>
    ),
  },
]
