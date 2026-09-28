"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/registry/ui/avatar"

function LiveCursorsBar({
  people = [
    { name: "Aman", color: "var(--accent)" },
    { name: "Casey", color: "oklch(0.52 0.12 150)" },
    { name: "Riley", color: "oklch(0.55 0.19 25)" },
  ],
  className,
}: {
  people?: { name: string; color: string }[]
  className?: string
}) {
  return (
    <div data-slot="live-cursors-bar" className={cn("flex items-center gap-2", className)}>
      <div className="flex -space-x-2">
        {people.map((p) => (
          <Avatar key={p.name} className="size-7 ring-2 ring-bg" title={p.name}>
            <AvatarFallback style={{ background: p.color, color: "oklch(0.98 0 0)" }}>{p.name.slice(0, 1)}</AvatarFallback>
          </Avatar>
        ))}
      </div>
      <p className="text-xs text-fg-muted"><span className="font-medium text-fg">{people.length}</span> editing now</p>
    </div>
  )
}
export { LiveCursorsBar }
