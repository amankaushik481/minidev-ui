"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

function AppShell({
  sidebar,
  topbar,
  children,
  className,
}: {
  sidebar?: React.ReactNode
  topbar?: React.ReactNode
  children?: React.ReactNode
  className?: string
}) {
  return (
    <div data-slot="app-shell" className={cn("flex min-h-[420px] overflow-hidden rounded-2xl border border-border bg-bg", className)}>
      {sidebar ? (
        <aside className="hidden w-56 shrink-0 border-r border-border bg-sunken md:block">{sidebar}</aside>
      ) : null}
      <div className="flex min-w-0 flex-1 flex-col">
        {topbar}
        <div className="flex-1 overflow-auto p-4 md:p-6">{children}</div>
      </div>
    </div>
  )
}
export { AppShell }
