"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

const sizes = {
  h1: "text-3xl tracking-[-0.022em] font-medium",
  h2: "text-2xl tracking-[-0.018em] font-medium",
  h3: "text-lg tracking-[-0.008em] font-medium",
  h4: "text-base tracking-[0] font-medium",
  h5: "text-sm tracking-[0.005em] font-medium",
  h6: "text-xs tracking-[0.01em] font-medium uppercase text-fg-muted",
} as const

function Heading({
  as: Comp = "h2",
  className,
  ...props
}: React.ComponentProps<"h2"> & { as?: keyof typeof sizes }) {
  return (
    <Comp
      data-slot="heading"
      className={cn("text-fg", sizes[Comp], className)}
      {...props}
    />
  )
}
export { Heading }
