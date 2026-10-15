"use client"
import * as React from "react"
import { CreditCardIcon, FileTextIcon, LayoutDashboardIcon, LogOutIcon, PanelLeftIcon, SettingsIcon, UsersIcon } from "lucide-react"
import { Button } from "@/registry/ui/button"
import { Sidebar, SidebarNavItem } from "@/registry/ui/sidebar"
import type { Example } from "./types"

const items = [
  { id: "dashboard", label: "Dashboard", icon: <LayoutDashboardIcon className="size-4" /> },
  { id: "invoices", label: "Invoices", icon: <FileTextIcon className="size-4" /> },
  { id: "customers", label: "Customers", icon: <UsersIcon className="size-4" /> },
  { id: "settings", label: "Settings", icon: <SettingsIcon className="size-4" /> },
]

function NavDemo() {
  const [active, setActive] = React.useState("invoices")
  return (
    <div className="flex h-72 w-full max-w-lg overflow-hidden rounded-xl border border-border bg-bg">
      <Sidebar>
        <div className="px-4 py-3 text-sm font-medium text-fg">Lumen</div>
        <nav aria-label="Main" className="flex flex-col gap-0.5">
          {items.map((item) => (
            <SidebarNavItem key={item.id} icon={item.icon} active={active === item.id} aria-current={active === item.id ? "page" : undefined} onClick={() => setActive(item.id)}>
              {item.label}
            </SidebarNavItem>
          ))}
        </nav>
        <div className="mt-auto border-t border-border px-4 py-3 text-xs text-fg-muted">maya@northwind.io</div>
      </Sidebar>
      <div className="flex-1 p-4 text-sm text-fg-muted">{items.find((item) => item.id === active)?.label}</div>
    </div>
  )
}

function CollapsibleDemo() {
  const [collapsed, setCollapsed] = React.useState(false)
  return (
    <div className="flex h-72 w-full max-w-lg overflow-hidden rounded-xl border border-border bg-bg">
      <Sidebar collapsed={collapsed}>
        <div className="flex h-12 items-center px-3">
          <Button variant="ghost" size="icon-sm" aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"} aria-expanded={!collapsed} onClick={() => setCollapsed((c) => !c)}>
            <PanelLeftIcon />
          </Button>
        </div>
        <nav aria-label="Main" className="flex flex-col gap-0.5">
          {items.map((item) => (
            <SidebarNavItem
              key={item.id}
              icon={item.icon}
              active={item.id === "invoices"}
              aria-label={item.label}
              title={collapsed ? item.label : undefined}
              className={collapsed ? "justify-center gap-0 px-0" : undefined}
            >
              {collapsed ? null : item.label}
            </SidebarNavItem>
          ))}
        </nav>
      </Sidebar>
      <div className="flex-1 p-4 text-sm text-fg-muted">Invoices</div>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "App navigation",
    description: "Nav items are buttons; keep the active id in state or derive it from the route, and add aria-current for the current page.",
    code: `const items = [
  { id: "dashboard", label: "Dashboard", icon: <LayoutDashboardIcon className="size-4" /> },
  { id: "invoices", label: "Invoices", icon: <FileTextIcon className="size-4" /> },
  { id: "customers", label: "Customers", icon: <UsersIcon className="size-4" /> },
  { id: "settings", label: "Settings", icon: <SettingsIcon className="size-4" /> },
]

function NavDemo() {
  const [active, setActive] = React.useState("invoices")
  return (
    <div className="flex h-72 w-full max-w-lg overflow-hidden rounded-xl border border-border bg-bg">
      <Sidebar>
        <div className="px-4 py-3 text-sm font-medium text-fg">Lumen</div>
        <nav aria-label="Main" className="flex flex-col gap-0.5">
          {items.map((item) => (
            <SidebarNavItem key={item.id} icon={item.icon} active={active === item.id} aria-current={active === item.id ? "page" : undefined} onClick={() => setActive(item.id)}>
              {item.label}
            </SidebarNavItem>
          ))}
        </nav>
        <div className="mt-auto border-t border-border px-4 py-3 text-xs text-fg-muted">maya@northwind.io</div>
      </Sidebar>
      <div className="flex-1 p-4 text-sm text-fg-muted">{items.find((item) => item.id === active)?.label}</div>
    </div>
  )
}`,
    node: <NavDemo />,
  },
  {
    title: "Collapsible",
    description: "collapsed narrows the rail to icons; keep an aria-label and title on each item so the labels survive.",
    code: `// items is the nav list from the "App navigation" example.
function CollapsibleDemo() {
  const [collapsed, setCollapsed] = React.useState(false)
  return (
    <div className="flex h-72 w-full max-w-lg overflow-hidden rounded-xl border border-border bg-bg">
      <Sidebar collapsed={collapsed}>
        <div className="flex h-12 items-center px-3">
          <Button variant="ghost" size="icon-sm" aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"} aria-expanded={!collapsed} onClick={() => setCollapsed((c) => !c)}>
            <PanelLeftIcon />
          </Button>
        </div>
        <nav aria-label="Main" className="flex flex-col gap-0.5">
          {items.map((item) => (
            <SidebarNavItem
              key={item.id}
              icon={item.icon}
              active={item.id === "invoices"}
              aria-label={item.label}
              title={collapsed ? item.label : undefined}
              className={collapsed ? "justify-center gap-0 px-0" : undefined}
            >
              {collapsed ? null : item.label}
            </SidebarNavItem>
          ))}
        </nav>
      </Sidebar>
      <div className="flex-1 p-4 text-sm text-fg-muted">Invoices</div>
    </div>
  )
}`,
    node: <CollapsibleDemo />,
  },
  {
    title: "Grouped sections",
    description: "Section labels and a pinned footer are plain elements between the nav items.",
    code: `<div className="flex h-80 w-full max-w-lg overflow-hidden rounded-xl border border-border bg-bg">
  <Sidebar>
    <div className="flex items-center gap-2 px-4 py-3">
      <span className="grid size-6 place-items-center rounded-md bg-ink text-[10px] font-semibold text-on-ink">N</span>
      <span className="text-sm font-medium text-fg">Northwind</span>
    </div>
    <p className="px-4 pt-2 pb-1 text-[11px] font-medium tracking-[0.04em] text-fg-subtle uppercase">Workspace</p>
    <SidebarNavItem icon={<LayoutDashboardIcon className="size-4" />} active>Overview</SidebarNavItem>
    <SidebarNavItem icon={<FileTextIcon className="size-4" />}>Invoices</SidebarNavItem>
    <SidebarNavItem icon={<UsersIcon className="size-4" />}>Customers</SidebarNavItem>
    <p className="px-4 pt-4 pb-1 text-[11px] font-medium tracking-[0.04em] text-fg-subtle uppercase">Account</p>
    <SidebarNavItem icon={<CreditCardIcon className="size-4" />}>Billing</SidebarNavItem>
    <SidebarNavItem icon={<SettingsIcon className="size-4" />}>Settings</SidebarNavItem>
    <div className="mt-auto border-t border-border py-2">
      <SidebarNavItem icon={<LogOutIcon className="size-4" />}>Log out</SidebarNavItem>
    </div>
  </Sidebar>
  <div className="flex-1 p-4 text-sm text-fg-muted">Overview</div>
</div>`,
    node: (
      <div className="flex h-80 w-full max-w-lg overflow-hidden rounded-xl border border-border bg-bg">
        <Sidebar>
          <div className="flex items-center gap-2 px-4 py-3">
            <span className="grid size-6 place-items-center rounded-md bg-ink text-[10px] font-semibold text-on-ink">N</span>
            <span className="text-sm font-medium text-fg">Northwind</span>
          </div>
          <p className="px-4 pt-2 pb-1 text-[11px] font-medium tracking-[0.04em] text-fg-subtle uppercase">Workspace</p>
          <SidebarNavItem icon={<LayoutDashboardIcon className="size-4" />} active>Overview</SidebarNavItem>
          <SidebarNavItem icon={<FileTextIcon className="size-4" />}>Invoices</SidebarNavItem>
          <SidebarNavItem icon={<UsersIcon className="size-4" />}>Customers</SidebarNavItem>
          <p className="px-4 pt-4 pb-1 text-[11px] font-medium tracking-[0.04em] text-fg-subtle uppercase">Account</p>
          <SidebarNavItem icon={<CreditCardIcon className="size-4" />}>Billing</SidebarNavItem>
          <SidebarNavItem icon={<SettingsIcon className="size-4" />}>Settings</SidebarNavItem>
          <div className="mt-auto border-t border-border py-2">
            <SidebarNavItem icon={<LogOutIcon className="size-4" />}>Log out</SidebarNavItem>
          </div>
        </Sidebar>
        <div className="flex-1 p-4 text-sm text-fg-muted">Overview</div>
      </div>
    ),
  },
]
