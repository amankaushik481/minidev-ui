"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

function ReasoningBlock({
  title = "Thinking",
  children = "Compare free product density vs Premium kinetic moments, then propose the client showcase as the walkthrough.",
  defaultOpen = false,
  className,
}: {
  title?: string
  children?: React.ReactNode
  defaultOpen?: boolean
  className?: string
}) {
  const [open, setOpen] = React.useState(defaultOpen)
  return (
    <div data-slot="reasoning-block" className={cn("rounded-xl border border-border bg-sunken", className)}>
      <button
        type="button"
        className="flex w-full items-center justify-between px-3 py-2 text-left text-xs font-medium text-fg-muted outline-none focus-visible:ring-2 focus-visible:ring-accent"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {title}
        <span className="font-mono tabular-nums">{open ? "−" : "+"}</span>
      </button>
      {open ? (
        <div className="border-t border-border px-3 py-2 text-sm leading-[1.55] text-fg-muted">{children}</div>
      ) : null}
    </div>
  )
}
export { ReasoningBlock }
