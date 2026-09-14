"use client"
import * as React from "react"
import { ArrowLeftIcon } from "lucide-react"
import { cn } from "@/lib/utils"

function BackLink({
  href = "#",
  children = "Back",
  className,
}: {
  href?: string
  children?: React.ReactNode
  className?: string
}) {
  return (
    <a
      data-slot="back-link"
      href={href}
      className={cn(
        "inline-flex items-center gap-1.5 text-sm font-medium text-fg-muted outline-none transition-[color] duration-[70ms]",
        "hover:text-fg focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
        className
      )}
    >
      <ArrowLeftIcon className="size-3.5" aria-hidden />
      {children}
    </a>
  )
}
export { BackLink }
