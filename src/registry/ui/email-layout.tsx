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
      className={cn("mx-auto w-full max-w-[560px] overflow-hidden rounded-xl border border-border bg-surface text-fg shadow-highlight", className)}
    >
      {children}
    </div>
  )
}
export { EmailLayout }
