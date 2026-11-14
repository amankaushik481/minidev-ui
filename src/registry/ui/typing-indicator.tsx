"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Three pulsing dots in a pill that say someone (or the model) is typing; announced once to screen readers.
 *
 * Render it while waiting for the first token of a reply, then swap in the message. Use `StreamingCursor` once text is arriving, and `Spinner` for non-chat loading.
 *
 * @example
 * {isWaiting ? <TypingIndicator label="Lumen Assistant is typing" /> : null}
 */
type TypingIndicatorProps = {
  /** Screen-reader text, e.g. "Maya is typing". */
  label?: string
  className?: string
}

function TypingIndicator({ className, label = "Typing" }: TypingIndicatorProps) {
  return (
    <div
      data-slot="typing-indicator"
      role="status"
      className={cn("inline-flex items-center gap-1 rounded-full border border-border bg-sunken px-2.5 py-1.5", className)}
    >
      <span className="sr-only">{label}</span>
      {[0, 1, 2].map((i) => (
        <span key={i} aria-hidden className="size-1.5 animate-pulse rounded-full bg-fg-muted" style={{ animationDelay: `${i * 120}ms` }} />
      ))}
    </div>
  )
}
export { TypingIndicator }
export type { TypingIndicatorProps }
