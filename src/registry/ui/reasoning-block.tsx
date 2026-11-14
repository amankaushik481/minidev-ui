"use client"
import * as React from "react"
import { ChevronRightIcon } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * ReasoningBlock — the model's thinking, folded by default; the title shimmers while active and reports how long it took when done.
 *
 * Use it above an assistant message to hold chain-of-thought or tool reasoning. Folded content
 * is inert, so it is skipped by Tab and screen readers until opened. Controlled with `open` +
 * `onOpenChange`, or uncontrolled with `defaultOpen`. For generic disclosure use Collapsible.
 *
 * @example
 * <ReasoningBlock active={isThinking} duration="4s">{reasoningText}</ReasoningBlock>
 */
function ReasoningBlock({
  title = "Thinking",
  children = "Compared density against the table spec, checked contrast on both themes, then chose tabular numerals for the price column.",
  defaultOpen = false,
  open: openProp,
  onOpenChange,
  active = false,
  duration,
  className,
}: {
  title?: string
  /** The reasoning text or nodes shown when expanded. */
  children?: React.ReactNode
  /** Start expanded when uncontrolled. */
  defaultOpen?: boolean
  /** Controlled expanded state. */
  open?: boolean
  /** Fires with the new expanded state when the header is pressed. */
  onOpenChange?: (open: boolean) => void
  /** True while the model is still thinking. */
  active?: boolean
  /** e.g. "4s" — renders "Thought for 4s" when not active. */
  duration?: string
  className?: string
}) {
  const [inner, setInner] = React.useState(defaultOpen)
  const open = openProp ?? inner
  const panelId = React.useId()
  const label = active ? title + "…" : duration ? `Thought for ${duration}` : title
  return (
    <div data-slot="reasoning-block" className={cn("text-sm", className)}>
      <button
        type="button"
        className="group/r inline-flex items-center gap-1.5 rounded-md py-1 text-left text-[0.8125rem] font-medium text-fg-muted outline-none transition-colors hover:text-fg focus-visible:ring-2 focus-visible:ring-accent"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => {
          if (openProp === undefined) setInner(!open)
          onOpenChange?.(!open)
        }}
      >
        <span
          className={cn(
            active &&
              "bg-[linear-gradient(90deg,var(--fg-muted)_0%,var(--fg-muted)_40%,var(--fg)_50%,var(--fg-muted)_60%,var(--fg-muted)_100%)] bg-[length:250%_100%] bg-clip-text text-transparent animate-[shimmer-text_1.8s_linear_infinite]"
          )}
        >
          {label}
        </span>
        <ChevronRightIcon aria-hidden className={cn("size-3.5 transition-transform duration-200 ease-hairline", open && "rotate-90")} />
      </button>
      <div className={cn("grid transition-[grid-template-rows] duration-200 ease-hairline", open ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
        <div id={panelId} inert={!open} className="min-h-0 overflow-hidden">
          <div className="mt-1 border-l-2 border-border py-0.5 pl-3 text-[0.8125rem] leading-[1.6] text-fg-muted">{children}</div>
        </div>
      </div>
    </div>
  )
}
export { ReasoningBlock }
