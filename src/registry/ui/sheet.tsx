"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { XIcon } from "lucide-react"
function Sheet({
  open,
  onClose,
  side = "right",
  title,
  children,
  className,
}: {
  open: boolean
  onClose: () => void
  side?: "left" | "right" | "top" | "bottom"
  title?: string
  children: React.ReactNode
  className?: string
}) {
  if (!open) return null
  const pos =
    side === "right"
      ? "inset-y-0 right-0 w-full max-w-md border-l"
      : side === "left"
        ? "inset-y-0 left-0 w-full max-w-md border-r"
        : side === "top"
          ? "inset-x-0 top-0 max-h-[80vh] border-b"
          : "inset-x-0 bottom-0 max-h-[80vh] border-t"
  return (
    <div data-slot="sheet" className="fixed inset-0 z-50">
      <button type="button" aria-label="Close" className="absolute inset-0 bg-fg/40" onClick={onClose} />
      <aside
        role="dialog"
        aria-modal
        aria-label={title ?? "Sheet"}
        className={cn(
          "absolute flex flex-col border-border bg-surface shadow-lg",
          pos,
          className
        )}
      >
        <div className="flex h-12 items-center justify-between border-b border-border px-4">
          <h2 className="text-sm font-medium text-fg">{title}</h2>
          <button type="button" aria-label="Close sheet" className="text-fg-muted hover:text-fg" onClick={onClose}>
            <XIcon className="size-4" />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-auto p-4">{children}</div>
      </aside>
    </div>
  )
}
export { Sheet }
