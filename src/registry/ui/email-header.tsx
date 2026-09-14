"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

function EmailHeader({
  brand = "MiniDev",
  className,
}: {
  brand?: string
  className?: string
}) {
  return (
    <div data-slot="email-header" className={cn("border-b border-border bg-sunken px-6 py-5", className)}>
      <p className="text-sm font-medium tracking-[0.005em] text-fg">{brand}</p>
    </div>
  )
}
export { EmailHeader }
