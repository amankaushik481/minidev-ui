"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

function CommandItem({
  children,
  shortcut,
  active,
  onSelect,
  className,
}: {
  children: React.ReactNode
  shortcut?: string
  active?: boolean
  onSelect?: () => void
  className?: string
}) {
  return (
    <button
      type="button"
      data-slot="command-item"
      onClick={onSelect}
      className={cn(
        "flex w-full items-center justify-between gap-3 rounded-lg px-2.5 py-2 text-left text-sm outline-none",
        active ? "bg-accent/10 text-fg" : "text-fg hover:bg-sunken",
        "focus-visible:ring-2 focus-visible:ring-accent",
        className
      )}
    >
      <span>{children}</span>
      {shortcut ? <kbd className="font-mono text-[10px] text-fg-muted">{shortcut}</kbd> : null}
    </button>
  )
}
export { CommandItem }
