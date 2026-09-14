"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
function StickyColumn({ children, side = "left", className }: { children: React.ReactNode; side?: "left" | "right"; className?: string }) {
  return (
    <div
      data-slot="sticky-column"
      className={cn(
        "sticky z-10 bg-surface",
        side === "left" ? "left-0 border-r border-border" : "right-0 border-l border-border",
        className
      )}
    >
      {children}
    </div>
  )
}
export { StickyColumn }
