"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

function EmailLayout({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      data-slot="email-layout"
      className={cn("mx-auto w-full max-w-[560px] overflow-hidden rounded-xl border border-border bg-surface text-fg shadow-[inset_0_1px_0_oklch(1_0_0/0.5)]", className)}
    >
      {children}
    </div>
  )
}
export { EmailLayout }
