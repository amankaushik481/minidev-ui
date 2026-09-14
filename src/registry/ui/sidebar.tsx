"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
function Sidebar({ children, className, collapsed=false }: { children: React.ReactNode; className?: string; collapsed?: boolean }) {
  return (
    <aside data-slot="sidebar" data-collapsed={collapsed || undefined} className={cn("flex h-full flex-col border-r border-border bg-surface", collapsed ? "w-14" : "w-56", className)}>
      {children}
    </aside>
  )
}
function SidebarNavItem({ active, icon, children, className, ...props }: React.ComponentProps<"button"> & { active?: boolean; icon?: React.ReactNode }) {
  return (
    <button type="button" data-slot="sidebar-nav-item" data-active={active || undefined} className={cn("mx-2 flex h-9 items-center gap-2 rounded-lg px-2.5 text-sm text-fg-muted transition-[background-color,color] duration-[70ms] hover:bg-sunken hover:text-fg data-[active]:bg-sunken data-[active]:text-fg", className)} {...props}>
      {icon}<span className="truncate">{children}</span>
    </button>
  )
}
export { Sidebar, SidebarNavItem }
