"use client"
import * as React from "react"
import { ChevronRightIcon } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * ReasoningBlock — the model's thinking, folded by default. While `active`,
 * the title shimmers; when done it reports how long it took.
 */
function ReasoningBlock({
  title = "Thinking",
  children = "Compared density against the table spec, checked contrast on both themes, then chose tabular numerals for the price column.",
  defaultOpen = false,
  active = false,
  duration,
  className,
}: {
  title?: string
  children?: React.ReactNode
  defaultOpen?: boolean
  /** True while the model is still thinking. */
  active?: boolean
  /** e.g. "4s" — renders "Thought for 4s" when not active. */
  duration?: string
  className?: string
}) {
  const [open, setOpen] = React.useState(defaultOpen)
  const label = active ? title + "…" : duration ? `Thought for ${duration}` : title
  return (
    <div data-slot="reasoning-block" className={cn("text-sm", className)}>
      <button
        type="button"
        className="group/r inline-flex items-center gap-1.5 rounded-md py-1 text-left text-[0.8125rem] font-medium text-fg-muted outline-none transition-colors hover:text-fg focus-visible:ring-2 focus-visible:ring-accent"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span
          className={cn(
            active &&
              "bg-[linear-gradient(90deg,var(--fg-muted)_0%,var(--fg-muted)_40%,var(--fg)_50%,var(--fg-muted)_60%,var(--fg-muted)_100%)] bg-[length:250%_100%] bg-clip-text text-transparent animate-[shimmer-text_1.8s_linear_infinite]"
          )}
        >
          {label}
        </span>
        <ChevronRightIcon className={cn("size-3.5 transition-transform duration-200 ease-hairline", open && "rotate-90")} />
      </button>
      <div className={cn("grid transition-[grid-template-rows] duration-200 ease-hairline", open ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
        <div className="min-h-0 overflow-hidden">
          <div className="mt-1 border-l-2 border-border py-0.5 pl-3 text-[0.8125rem] leading-[1.6] text-fg-muted">{children}</div>
        </div>
      </div>
    </div>
  )
}
export { ReasoningBlock }
