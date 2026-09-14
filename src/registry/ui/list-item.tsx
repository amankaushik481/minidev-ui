"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

function ListItem({
  heading,
  description,
  leading,
  trailing,
  className,
  ...props
}: Omit<React.ComponentProps<"div">, "title"> & {
  heading: React.ReactNode
  description?: React.ReactNode
  leading?: React.ReactNode
  trailing?: React.ReactNode
}) {
  return (
    <div data-slot="list-item" className={cn("flex items-center gap-3 border-b border-border px-3 py-3 last:border-b-0", className)} {...props}>
      {leading}
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-medium text-fg">{heading}</div>
        {description ? <div className="truncate text-xs text-fg-muted">{description}</div> : null}
      </div>
      {trailing}
    </div>
  )
}
export { ListItem }
