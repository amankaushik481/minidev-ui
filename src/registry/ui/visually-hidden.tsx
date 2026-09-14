"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

function VisuallyHidden({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span data-slot="visually-hidden" className={cn("sr-only", className)}>
      {children}
    </span>
  )
}
export { VisuallyHidden }
