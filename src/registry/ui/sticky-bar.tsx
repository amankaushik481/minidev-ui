"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

function StickyBar({ children, className }: { children?: React.ReactNode; className?: string }) {
  return (
    <div
      data-slot="sticky-bar"
      className={cn(
        "sticky bottom-0 z-30 flex flex-wrap items-center justify-between gap-3 border-t border-border bg-surface/95 px-4 py-3 backdrop-blur-md",
        className
      )}
    >
      {children}
    </div>
  )
}
export { StickyBar }
