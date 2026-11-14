"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { StreamingCursor } from "@/registry/ui/streaming-cursor"

/**
 * MessageBubble — one chat turn: user turns sit in a sunken capsule, assistant turns are plain prose, system turns are a quiet rule.
 *
 * Use it for AI chat transcripts. Set `streaming` while tokens arrive to show a
 * blinking cursor and mark the turn aria-busy. Put MessageActions under assistant
 * turns; render markdown inside with MarkdownRenderer.
 *
 * @example
 * <MessageBubble role="user">Summarise invoice INV-2041</MessageBubble>
 * <MessageBubble role="assistant" streaming={isStreaming}>{reply}</MessageBubble>
 */
type MessageBubbleProps = {
  /** Who is speaking. "user" aligns right in a capsule; "assistant" is left-aligned prose; "system" is a centred note. */
  role?: "user" | "assistant" | "system"
  /** Tokens are still arriving: shows a cursor and sets aria-busy. */
  streaming?: boolean
  children: React.ReactNode
  className?: string
}

function MessageBubble({ role = "assistant", streaming, children, className }: MessageBubbleProps) {
  const mine = role === "user"
  return (
    <div
      data-slot="message-bubble"
      data-role={role}
      aria-busy={streaming || undefined}
      className={cn("flex w-full animate-[rise-in_220ms_var(--ease-hairline)_both]", mine ? "justify-end" : "justify-start", className)}
    >
      <div
        className={cn(
          "text-sm leading-[1.6]",
          mine && "max-w-[85%] rounded-2xl rounded-br-md border border-border bg-sunken px-3.5 py-2 text-fg",
          role === "assistant" && "max-w-[92%] py-0.5 text-fg",
          role === "system" && "w-full border-y border-dashed border-border py-2 text-center text-xs text-fg-subtle"
        )}
      >
        {children}
        {streaming ? <StreamingCursor /> : null}
      </div>
    </div>
  )
}
export { MessageBubble }
export type { MessageBubbleProps }
