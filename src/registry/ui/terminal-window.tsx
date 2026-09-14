"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

function TerminalWindow({
  title = "Terminal",
  children,
  className,
}: {
  title?: string
  children?: React.ReactNode
  className?: string
}) {
  return (
    <div
      data-slot="terminal-window"
      className={cn("overflow-hidden rounded-xl border border-border bg-sunken", className)}
    >
      <div className="flex items-center gap-2 border-b border-border bg-surface px-3 py-2">
        <span className="size-2.5 rounded-full bg-danger/70" aria-hidden />
        <span className="size-2.5 rounded-full bg-warning/70" aria-hidden />
        <span className="size-2.5 rounded-full bg-success/70" aria-hidden />
        <span className="ml-2 text-xs text-fg-muted">{title}</span>
      </div>
      <pre className="overflow-auto p-4 font-mono text-[12px] leading-relaxed text-fg">{children}</pre>
    </div>
  )
}
export { TerminalWindow }
