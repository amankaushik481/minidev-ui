"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

function Cluster({
  className,
  gap = 2,
  ...props
}: React.ComponentProps<"div"> & { gap?: number }) {
  return (
    <div
      data-slot="cluster"
      className={cn("flex flex-wrap items-center", className)}
      style={{ gap: gap * 4 }}
      {...props}
    />
  )
}
export { Cluster }
