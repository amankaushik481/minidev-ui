"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * A product layout frame: optional sidebar on the left (from md up), optional top bar, and a scrolling `<main>` content area.
 *
 * Use as the outer frame of an app page or an app preview. Prefer `Sidebar` for the navigation
 * itself (pass it as `sidebar`) and `Topbar` for the header. Below md the sidebar is hidden, so
 * also render a mobile menu (for example a `Sheet`) inside `topbar`.
 *
 * @example
 * <AppShell sidebar={<Sidebar />} topbar={<Topbar />} sidebarLabel="Workspace">
 *   <PageHeader title="Invoices" />
 * </AppShell>
 */
type AppShellProps = {
  /** Left column content, usually navigation. Hidden below the md breakpoint. */
  sidebar?: React.ReactNode
  /** Accessible name of the sidebar landmark. */
  sidebarLabel?: string
  /** Rendered above the content, full width of the main column. */
  topbar?: React.ReactNode
  /** Page content, rendered inside the `<main>` landmark; this area scrolls. */
  children?: React.ReactNode
  className?: string
}

function AppShell({ sidebar, sidebarLabel = "Sidebar", topbar, children, className }: AppShellProps) {
  return (
    <div data-slot="app-shell" className={cn("flex min-h-[420px] overflow-hidden rounded-2xl border border-border bg-bg", className)}>
      {sidebar ? (
        <aside aria-label={sidebarLabel} className="hidden w-56 shrink-0 border-r border-border bg-sunken md:block">{sidebar}</aside>
      ) : null}
      <div className="flex min-w-0 flex-1 flex-col">
        {topbar}
        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
export { AppShell }
export type { AppShellProps }
