"use client"
import * as React from "react"
import { XIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { IconButton } from "@/registry/ui/icon-button"

function PeekPanel({
  title,
  children,
  onClose,
  className,
}: {
  title: string
  children: React.ReactNode
  onClose?: () => void
  className?: string
}) {
  return (
    <aside
      data-slot="peek-panel"
      aria-label={title}
      className={cn(
        "flex h-full w-full max-w-md flex-col border-l border-border bg-surface shadow-highlight",
        className
      )}
    >
      <div className="flex h-12 items-center justify-between border-b border-border px-4">
        <h2 className="text-sm font-medium text-fg">{title}</h2>
        <IconButton type="button" size="icon-sm" variant="ghost" aria-label="Close peek" onClick={onClose}>
          <XIcon />
        </IconButton>
      </div>
      <div className="flex-1 overflow-auto p-4">{children}</div>
    </aside>
  )
}
export { PeekPanel }
