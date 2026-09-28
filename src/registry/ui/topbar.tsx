"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

function Topbar({
  title,
  left,
  right,
  className,
}: {
  title?: React.ReactNode
  left?: React.ReactNode
  right?: React.ReactNode
  className?: string
}) {
  return (
    <header
      data-slot="topbar"
      className={cn(
        "flex h-14 items-center gap-3 border-b border-border bg-surface px-4 shadow-highlight",
        className
      )}
    >
      <div className="flex min-w-0 flex-1 items-center gap-3">
        {left ?? (title ? <p className="truncate text-sm font-medium text-fg">{title}</p> : null)}
      </div>
      {right ? <div className="flex shrink-0 items-center gap-2">{right}</div> : null}
    </header>
  )
}
export { Topbar }
