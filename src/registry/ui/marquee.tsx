"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

function Marquee({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      data-slot="marquee"
      className={cn("overflow-hidden border-y border-border bg-sunken py-3", className)}
    >
      <div className="flex w-max gap-8 px-4 text-sm text-fg-muted [animation:marquee_30s_linear_infinite] motion-reduce:[animation:none]">
        <div className="flex gap-8">{children}</div>
        <div className="flex gap-8" aria-hidden>{children}</div>
      </div>
    </div>
  )
}
export { Marquee }
