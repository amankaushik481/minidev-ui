"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

function SplitPane({
  left,
  right,
  className,
}: {
  left: React.ReactNode
  right: React.ReactNode
  className?: string
}) {
  return (
    <div data-slot="split-pane" className={cn("grid min-h-64 grid-cols-1 overflow-hidden rounded-xl border border-border md:grid-cols-2", className)}>
      <div className="border-b border-border p-4 md:border-r md:border-b-0">{left}</div>
      <div className="p-4">{right}</div>
    </div>
  )
}
export { SplitPane }
