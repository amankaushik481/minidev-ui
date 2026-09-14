"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

function Inset({ children, className }: { children?: React.ReactNode; className?: string }) {
  return (
    <div data-slot="inset" className={cn("rounded-xl border border-border bg-sunken p-4 md:p-6", className)}>
      {children}
    </div>
  )
}
export { Inset }
