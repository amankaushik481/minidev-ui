"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
function ContextMenu({
  children,
  items,
  className,
}: {
  children: React.ReactNode
  items: { id: string; label: string; destructive?: boolean; onSelect?: () => void }[]
  className?: string
}) {
  const [pos, setPos] = React.useState<{ x: number; y: number } | null>(null)
  return (
    <div
      data-slot="context-menu"
      className={cn("relative", className)}
      onContextMenu={(e) => {
        e.preventDefault()
        setPos({ x: e.clientX, y: e.clientY })
      }}
      onClick={() => setPos(null)}
    >
      {children}
      {pos ? (
        <div
          role="menu"
          className="fixed z-50 min-w-44 rounded-xl border border-border bg-raised p-1 shadow-lg"
          style={{ left: pos.x, top: pos.y }}
        >
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              role="menuitem"
              className={cn(
                "flex w-full rounded-lg px-2.5 py-1.5 text-left text-sm hover:bg-sunken",
                item.destructive && "text-danger"
              )}
              onClick={() => {
                item.onSelect?.()
                setPos(null)
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}
export { ContextMenu }
