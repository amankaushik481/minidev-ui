"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
function ToolCallCard({ name, status="done", children, className }: { name: string; status?: "running"|"done"|"error"; children?: React.ReactNode; className?: string }) {
  return (
    <div data-slot="tool-call-card" className={cn("rounded-xl border border-border bg-sunken p-3", className)}>
      <div className="flex items-center justify-between gap-2">
        <p className="font-mono text-xs text-fg">{name}</p>
        <span className="text-xs text-fg-muted">{status}</span>
      </div>
      {children ? <div className="mt-2 text-xs text-fg-muted">{children}</div> : null}
    </div>
  )
}
export { ToolCallCard }
