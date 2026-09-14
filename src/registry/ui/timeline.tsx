"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

function Timeline({ items, className }: {
  items: { title: React.ReactNode; description?: React.ReactNode; time?: React.ReactNode }[]
  className?: string
}) {
  return (
    <ol data-slot="timeline" className={cn("relative space-y-4 border-l border-border pl-6", className)}>
      {items.map((item, i) => (
        <li key={i} className="relative">
          <span className="absolute top-1.5 -left-[1.625rem] size-2.5 rounded-full border border-border bg-surface" />
          <div className="flex items-baseline justify-between gap-3">
            <p className="text-sm font-medium text-fg">{item.title}</p>
            {item.time ? <time className="text-xs tabular-nums text-fg-muted">{item.time}</time> : null}
          </div>
          {item.description ? <p className="mt-1 text-xs text-fg-muted">{item.description}</p> : null}
        </li>
      ))}
    </ol>
  )
}
export { Timeline }
