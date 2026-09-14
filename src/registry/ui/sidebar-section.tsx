"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

function SidebarSection({
  title,
  children,
  className,
}: {
  title?: string
  children?: React.ReactNode
  className?: string
}) {
  return (
    <div data-slot="sidebar-section" className={cn("space-y-1 px-2 py-3", className)}>
      {title ? (
        <p className="px-2 pb-1 text-[11px] font-medium uppercase tracking-[0.01em] text-fg-muted">{title}</p>
      ) : null}
      <div className="space-y-0.5">{children}</div>
    </div>
  )
}
export { SidebarSection }
