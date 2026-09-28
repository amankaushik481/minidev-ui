"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

function Well({ children, className }: { children?: React.ReactNode; className?: string }) {
  return (
    <div
      data-slot="well"
      className={cn(
        "rounded-xl border border-border bg-sunken p-4 text-sm leading-[1.55] text-fg shadow-highlight",
        className
      )}
    >
      {children}
    </div>
  )
}
export { Well }
