"use client"
import * as React from "react"
import { MoreHorizontalIcon } from "lucide-react"
import { cn } from "@/lib/utils"

function BreadcrumbEllipsis({ className }: { className?: string }) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden
      className={cn("inline-flex size-6 items-center justify-center text-fg-muted", className)}
    >
      <MoreHorizontalIcon className="size-4" />
    </span>
  )
}
export { BreadcrumbEllipsis }
