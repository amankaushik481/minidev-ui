"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * A titled group inside a Sidebar: a small uppercase label above a stack of SidebarNavItems.
 *
 * The title names the group for screen readers (`role="group"`). Use one per cluster of links
 * ("Workspace", "Settings"); the Sidebar itself is the outer frame.
 *
 * @example
 * <SidebarSection title="Workspace">
 *   <SidebarNavItem active>Inbox</SidebarNavItem>
 *   <SidebarNavItem>Projects</SidebarNavItem>
 * </SidebarSection>
 */
type SidebarSectionProps = {
  /** Group label. Leave it out for an unlabelled group. */
  title?: string
  /** The SidebarNavItems in this group. */
  children?: React.ReactNode
  className?: string
}

function SidebarSection({ title, children, className }: SidebarSectionProps) {
  const id = React.useId()
  return (
    <div
      data-slot="sidebar-section"
      role={title ? "group" : undefined}
      aria-labelledby={title ? id : undefined}
      className={cn("space-y-1 px-2 py-3", className)}
    >
      {title ? (
        <p id={id} className="px-2 pb-1 text-xs font-medium tracking-[0.01em] text-fg-muted uppercase">{title}</p>
      ) : null}
      <div className="space-y-0.5">{children}</div>
    </div>
  )
}
export { SidebarSection }
export type { SidebarSectionProps }
