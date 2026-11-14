"use client"
import * as React from "react"
import { PanelLeftIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Sidebar } from "@/registry/ui/sidebar"
import { Button } from "@/registry/ui/button"

/**
 * A Sidebar with a built-in collapse toggle on its edge that shrinks it to an icon rail.
 *
 * Use as the left rail of an app shell. Uncontrolled by default; pass `collapsed` + `onCollapsedChange` to persist the state.
 * Put SidebarNavItem children inside; their labels truncate when collapsed. For a full layout use AppShell; on mobile use MobileNavDrawer.
 *
 * @example
 * <CollapsibleSidebar>
 *   <SidebarNavItem icon={<HomeIcon />} active>Home</SidebarNavItem>
 *   <SidebarNavItem icon={<ReceiptIcon />}>Invoices</SidebarNavItem>
 * </CollapsibleSidebar>
 */
type CollapsibleSidebarProps = {
  /** Sidebar content, usually SidebarNavItems. */
  children: React.ReactNode
  /** Controlled collapsed state. Leave undefined for an uncontrolled sidebar. */
  collapsed?: boolean
  /** Initial state for the uncontrolled sidebar. */
  defaultCollapsed?: boolean
  /** Called with the next state when the toggle is pressed. */
  onCollapsedChange?: (collapsed: boolean) => void
  className?: string
}

function CollapsibleSidebar({ children, collapsed, defaultCollapsed = false, onCollapsedChange, className }: CollapsibleSidebarProps) {
  const [inner, setInner] = React.useState(defaultCollapsed)
  const isCollapsed = collapsed ?? inner
  return (
    <div data-slot="collapsible-sidebar" data-collapsed={isCollapsed || undefined} className={cn("relative", className)}>
      <Sidebar collapsed={isCollapsed}>{children}</Sidebar>
      <Button
        size="icon-sm"
        variant="outline"
        className="absolute top-2 -right-3 z-20"
        // A stable name plus aria-expanded, per the APG disclosure pattern; the tooltip text says what will happen.
        aria-label="Toggle sidebar"
        aria-expanded={!isCollapsed}
        title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        onClick={() => {
          if (collapsed === undefined) setInner(!isCollapsed)
          onCollapsedChange?.(!isCollapsed)
        }}
      >
        <PanelLeftIcon aria-hidden />
      </Button>
    </div>
  )
}
export { CollapsibleSidebar }
export type { CollapsibleSidebarProps }
