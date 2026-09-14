"use client"
import * as React from "react"
import { PlusIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { RelativeTime } from "@/registry/ui/relative-time"

type Conv = { id: string; title: string; updatedAt: string | Date }

function ConversationSidebar({
  items,
  activeId,
  onSelect,
  onNew,
  className,
}: {
  items: Conv[]
  activeId?: string
  onSelect?: (id: string) => void
  onNew?: () => void
  className?: string
}) {
  return (
    <aside data-slot="conversation-sidebar" className={cn("flex h-full w-64 flex-col border-r border-border bg-surface", className)}>
      <div className="border-b border-border p-3">
        <Button type="button" className="w-full" size="sm" onClick={onNew}><PlusIcon /> New chat</Button>
      </div>
      <ul className="flex-1 overflow-auto p-2">
        {items.map((c) => (
          <li key={c.id}>
            <button
              type="button"
              onClick={() => onSelect?.(c.id)}
              className={cn(
                "flex w-full flex-col rounded-lg px-2.5 py-2 text-left outline-none focus-visible:ring-2 focus-visible:ring-accent",
                c.id === activeId ? "bg-sunken" : "hover:bg-sunken/60"
              )}
            >
              <span className="truncate text-sm font-medium text-fg">{c.title}</span>
              <RelativeTime date={c.updatedAt} />
            </button>
          </li>
        ))}
      </ul>
    </aside>
  )
}
export { ConversationSidebar }
