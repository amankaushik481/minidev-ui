"use client"
import * as React from "react"
import { CopyIcon, RefreshCwIcon, ThumbsDownIcon, ThumbsUpIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { IconButton } from "@/registry/ui/icon-button"

/**
 * MessageActions — the copy, retry, thumbs up and thumbs down row under an AI reply.
 *
 * Pass `feedback` to show which thumb is on; the buttons expose it as aria-pressed.
 * Place it under a MessageBubble with role="assistant".
 *
 * @example
 * <MessageActions
 *   onCopy={() => navigator.clipboard.writeText(reply)}
 *   onRetry={regenerate}
 *   feedback={vote}
 *   onGood={() => setVote("good")}
 *   onBad={() => setVote("bad")}
 * />
 */
type MessageActionsProps = {
  /** Copy the reply. */
  onCopy?: () => void
  /** Regenerate the reply. */
  onRetry?: () => void
  /** Thumbs up. */
  onGood?: () => void
  /** Thumbs down. */
  onBad?: () => void
  /** The vote already given, shown as a pressed thumb. */
  feedback?: "good" | "bad" | null
  className?: string
}

function MessageActions({ onCopy, onRetry, onGood, onBad, feedback = null, className }: MessageActionsProps) {
  return (
    <div data-slot="message-actions" role="group" aria-label="Message actions" className={cn("flex items-center gap-0.5", className)}>
      <IconButton type="button" size="icon-sm" variant="ghost" aria-label="Copy" onClick={onCopy}><CopyIcon /></IconButton>
      <IconButton type="button" size="icon-sm" variant="ghost" aria-label="Retry" onClick={onRetry}><RefreshCwIcon /></IconButton>
      <IconButton
        type="button"
        size="icon-sm"
        variant="ghost"
        aria-label="Good response"
        aria-pressed={feedback === "good"}
        className={cn(feedback === "good" && "text-fg")}
        onClick={onGood}
      >
        <ThumbsUpIcon />
      </IconButton>
      <IconButton
        type="button"
        size="icon-sm"
        variant="ghost"
        aria-label="Bad response"
        aria-pressed={feedback === "bad"}
        className={cn(feedback === "bad" && "text-fg")}
        onClick={onBad}
      >
        <ThumbsDownIcon />
      </IconButton>
    </div>
  )
}
export { MessageActions }
export type { MessageActionsProps }
