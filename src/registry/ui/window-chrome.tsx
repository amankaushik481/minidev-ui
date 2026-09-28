"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

function WindowChrome({
  title = "minidev — gallery",
  children,
  className,
}: {
  title?: string
  children?: React.ReactNode
  className?: string
}) {
  return (
    <div data-slot="window-chrome" className={cn("overflow-hidden rounded-xl border border-border bg-surface shadow-highlight", className)}>
      <div className="flex h-9 items-center gap-2 border-b border-border bg-sunken px-3">
        <span className="size-2.5 rounded-full bg-fg-subtle/40" aria-hidden />
        <span className="size-2.5 rounded-full bg-fg-subtle/40" aria-hidden />
        <span className="size-2.5 rounded-full bg-fg-subtle/40" aria-hidden />
        <span className="ml-2 truncate text-xs text-fg-muted">{title}</span>
      </div>
      <div className="p-4">{children}</div>
    </div>
  )
}
export { WindowChrome }
