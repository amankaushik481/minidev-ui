"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

function Stack({
  className,
  gap = 3,
  ...props
}: React.ComponentProps<"div"> & { gap?: 1 | 2 | 3 | 4 | 5 | 6 | 8 }) {
  return (
    <div
      data-slot="stack"
      className={cn("flex flex-col", `gap-${gap}`, className)}
      style={{ gap: gap * 4 }}
      {...props}
    />
  )
}
export { Stack }
