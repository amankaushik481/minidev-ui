"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

function EmailButton({
  children,
  href = "#",
  className,
}: {
  children: React.ReactNode
  href?: string
  className?: string
}) {
  return (
    <a
      data-slot="email-button"
      href={href}
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-lg bg-ink px-4 text-sm font-medium text-on-ink",
        className
      )}
    >
      {children}
    </a>
  )
}
export { EmailButton }
