"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
function HoverCard({ trigger, children, className }: { trigger: React.ReactNode; children: React.ReactNode; className?: string }) {
  const [open, setOpen] = React.useState(false)
  return (
    <span data-slot="hover-card" className="relative inline-flex" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      {trigger}
      {open ? (
        <span className={cn("absolute top-full left-0 z-50 mt-2 w-64 rounded-xl border border-border bg-raised p-3 text-sm shadow-lg", className)}>
          {children}
        </span>
      ) : null}
    </span>
  )
}
export { HoverCard }
