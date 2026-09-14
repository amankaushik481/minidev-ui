"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

function Text({
  className,
  muted,
  subtle,
  mono,
  ...props
}: React.ComponentProps<"p"> & { muted?: boolean; subtle?: boolean; mono?: boolean }) {
  return (
    <p
      data-slot="text"
      className={cn(
        "text-sm leading-[1.55] text-fg",
        muted && "text-fg-muted",
        subtle && "text-fg-subtle",
        mono && "font-mono text-[0.8125rem] tracking-[0.005em]",
        className
      )}
      {...props}
    />
  )
}
export { Text }
