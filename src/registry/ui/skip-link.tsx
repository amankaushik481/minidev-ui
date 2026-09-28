"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

function SkipLink({ className, children = "Skip to content", ...props }: React.ComponentProps<"a">) {
  return (
    <a
      data-slot="skip-link"
      className={cn(
        "sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100]",
        "rounded-lg border border-border bg-raised px-3 py-2 text-sm font-medium text-fg shadow-lg",
        "focus-visible:ring-2 focus-visible:ring-accent",
        className
      )}
      {...props}
    >
      {children}
    </a>
  )
}
export { SkipLink }
