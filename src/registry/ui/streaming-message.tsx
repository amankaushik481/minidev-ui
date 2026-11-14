"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { StreamingCursor } from "@/registry/ui/streaming-cursor"

/**
 * An assistant message bubble that shows text as it streams, with a blinking caret while `streaming` is true.
 *
 * Marked `aria-busy` while streaming so screen readers wait for the finished text instead of
 * reading every token. Pair with StopGenerating; render finished markdown in your own message view.
 *
 * @example
 * <StreamingMessage content={partialText} streaming={!done} />
 */
type StreamingMessageProps = {
  /** The text received so far. */
  content?: React.ReactNode
  /** Shows the caret and marks the message busy. Set false when the stream ends. */
  streaming?: boolean
  className?: string
}

function StreamingMessage({
  content = "Three tests fail because the fixture still uses the old invoice shape. Here is a fix for each…",
  streaming = true,
  className,
}: StreamingMessageProps) {
  return (
    <div
      data-slot="streaming-message"
      data-streaming={streaming || undefined}
      aria-live="polite"
      aria-busy={streaming}
      className={cn("rounded-2xl border border-border bg-sunken px-4 py-3 text-sm leading-[1.55] text-pretty text-fg", className)}
    >
      {content}
      {streaming ? <StreamingCursor /> : null}
    </div>
  )
}
export { StreamingMessage }
export type { StreamingMessageProps }
