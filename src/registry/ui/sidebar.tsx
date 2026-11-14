"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * An app sidebar frame (224px, or a 56px icon rail when `collapsed`) and its nav items.
 *
 * Put a `<nav aria-label="Main">` of SidebarNavItems inside, grouped with SidebarSection.
 * When the Sidebar is collapsed, nav item labels become screen-reader only, so items stay named.
 * For a settings page frame use SettingsLayout; for a mobile slide-over use MobileNavDrawer or Sheet.
 *
 * @example
 * <Sidebar collapsed={collapsed}>
 *   <nav aria-label="Main">
 *     <SidebarNavItem icon={<InboxIcon />} active>Inbox</SidebarNavItem>
 *   </nav>
 * </Sidebar>
 */
type SidebarProps = React.ComponentProps<"aside"> & {
  /** Narrow icon rail; labels are hidden visually but still read by screen readers. */
  collapsed?: boolean
}

function Sidebar({ children, className, collapsed = false, ...props }: SidebarProps) {
  return (
    <aside
      data-slot="sidebar"
      data-collapsed={collapsed || undefined}
      className={cn(
        "group/sidebar flex h-full shrink-0 flex-col border-r border-border bg-surface transition-[width] duration-200 ease-hairline",
        collapsed ? "w-14" : "w-56",
        className
      )}
      {...props}
    >
      {children}
    </aside>
  )
}

type SidebarNavItemProps = React.ComponentProps<"button"> & {
  /** Marks the current page: highlighted and `aria-current="page"` unless you pass your own aria-current. */
  active?: boolean
  /** Leading icon, sized to 16px. */
  icon?: React.ReactNode
}

function SidebarNavItem({ active, icon, children, className, ...props }: SidebarNavItemProps) {
  return (
    <button
      type="button"
      data-slot="sidebar-nav-item"
      data-active={active || undefined}
      aria-current={active ? "page" : undefined}
      className={cn(
        "mx-2 flex h-9 items-center gap-2 rounded-lg px-2.5 text-sm text-fg-muted outline-none transition-[background-color,color] duration-[70ms]",
        "hover:bg-sunken hover:text-fg focus-visible:ring-2 focus-visible:ring-accent data-[active]:bg-sunken data-[active]:text-fg",
        "[&_svg]:size-4 [&_svg]:shrink-0 group-data-[collapsed]/sidebar:justify-center group-data-[collapsed]/sidebar:gap-0 group-data-[collapsed]/sidebar:px-0",
        className
      )}
      {...props}
    >
      {icon}
      {children != null ? <span className="truncate group-data-[collapsed]/sidebar:sr-only">{children}</span> : null}
    </button>
  )
}
export { Sidebar, SidebarNavItem }
export type { SidebarProps, SidebarNavItemProps }
