"use client"
import * as React from "react"
import { ChevronDownIcon } from "lucide-react"
import { cn } from "@/lib/utils"

function ThinkingBlock({
  children,
  defaultOpen = false,
  className,
}: {
  children: React.ReactNode
  defaultOpen?: boolean
  className?: string
}) {
  const [open, setOpen] = React.useState(defaultOpen)
  return (
    <div data-slot="thinking-block" className={cn("rounded-xl border border-border bg-sunken", className)}>
      <button
        type="button"
        aria-expanded={open}
        className="flex w-full items-center justify-between px-3 py-2 text-left text-xs font-medium text-fg-muted outline-none focus-visible:ring-2 focus-visible:ring-accent"
        onClick={() => setOpen((o) => !o)}
      >
        Thinking
        <ChevronDownIcon className={cn("size-4 transition-transform duration-[140ms]", open && "rotate-180")} />
      </button>
      {open ? <div className="border-t border-border px-3 py-2 text-xs leading-[1.55] text-fg-muted">{children}</div> : null}
    </div>
  )
}
export { ThinkingBlock }
