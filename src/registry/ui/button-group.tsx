"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

function ButtonGroup({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      role="group"
      data-slot="button-group"
      className={cn(
        "inline-flex items-stretch [&>[data-slot=button]]:rounded-none",
        "[&>[data-slot=button]]:border-border",
        "[&>[data-slot=button]:first-child]:rounded-l-lg",
        "[&>[data-slot=button]:last-child]:rounded-r-lg",
        "[&>[data-slot=button]:not(:first-child)]:border-l-0",
        "[&>[data-slot=button]:not(:first-child)]:-ml-px",
        className
      )}
      {...props}
    />
  )
}

export { ButtonGroup }
