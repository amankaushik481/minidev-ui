"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * A blinking 2px accent caret to append after text that is still streaming in.
 *
 * Decorative (aria-hidden). Render it only while tokens arrive and remove it when the stream ends.
 * StreamingMessage already includes it.
 *
 * @example
 * <p>{text}{isStreaming ? <StreamingCursor /> : null}</p>
 */
function StreamingCursor({ className }: { className?: string }) {
  return (
    <span
      data-slot="streaming-cursor"
      aria-hidden
      className={cn(
        "ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.1em] bg-accent align-baseline",
        "animate-[caret-blink_1.05s_steps(1)_infinite]",
        className
      )}
    />
  )
}
export { StreamingCursor }
