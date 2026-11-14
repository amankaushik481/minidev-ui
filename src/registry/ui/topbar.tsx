"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * A 56px app header bar with a title (or custom left content) and a right-hand slot for actions.
 *
 * Renders a `<header>`. Use it at the top of an `AppShell` content area. Use `PageHeader` for a page title with description and actions inside the content, and `NavMarketing` for a marketing site nav.
 *
 * @example
 * <Topbar title="Invoices" right={<><SearchInput /><Button size="sm">New invoice</Button></>} />
 */
type TopbarProps = {
  /** Page or section name, used when `left` is not given. */
  title?: React.ReactNode
  /** Replaces the title, e.g. breadcrumbs or an org switcher. */
  left?: React.ReactNode
  /** Actions on the right: search, buttons, avatar menu. */
  right?: React.ReactNode
  className?: string
}

function Topbar({ title, left, right, className }: TopbarProps) {
  return (
    <header data-slot="topbar" className={cn("flex h-14 items-center gap-3 border-b border-border bg-surface px-4 shadow-highlight", className)}>
      <div className="flex min-w-0 flex-1 items-center gap-3">
        {left ?? (title ? <p className="truncate text-sm font-medium text-fg">{title}</p> : null)}
      </div>
      {right ? <div className="flex shrink-0 items-center gap-2">{right}</div> : null}
    </header>
  )
}
export { Topbar }
export type { TopbarProps }
