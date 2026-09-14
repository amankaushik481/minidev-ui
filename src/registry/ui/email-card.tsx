"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

function EmailCard({
  title,
  children,
  className,
}: {
  title?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div data-slot="email-card" className={cn("mx-6 my-4 rounded-xl border border-border bg-bg p-4", className)}>
      {title ? <h3 className="mb-2 text-sm font-medium text-fg">{title}</h3> : null}
      <div className="text-sm leading-[1.55] text-fg-muted">{children}</div>
    </div>
  )
}
export { EmailCard }
