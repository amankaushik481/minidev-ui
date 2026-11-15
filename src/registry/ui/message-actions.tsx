"use client"
import * as React from "react"
import { CopyIcon, RefreshCwIcon, ThumbsDownIcon, ThumbsUpIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { IconButton } from "@/registry/ui/icon-button"

/**
 * MessageActions — the copy, retry, thumbs up and thumbs down row under an AI reply.
 *
 * Place it under a MessageBubble with role="assistant". It holds no state: each button only calls
 * its handler, so copy the text in `onCopy` and pass the stored vote back as `feedback` to show
 * the pressed thumb. A button renders only when its handler is set (the thumbs also when
 * `feedback` is set), so pass just the actions you support. For a vote that toggles itself use
 * `FeedbackThumbs`; for a "Not quite right?" footer with Regenerate use `RegenerateBar`.
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
  if (!onCopy && !onRetry && !onGood && !onBad && !feedback) return null
  return (
    <div data-slot="message-actions" role="group" aria-label="Message actions" className={cn("flex items-center gap-0.5", className)}>
      {onCopy ? <IconButton type="button" size="icon-sm" variant="ghost" aria-label="Copy" onClick={onCopy}><CopyIcon /></IconButton> : null}
      {onRetry ? <IconButton type="button" size="icon-sm" variant="ghost" aria-label="Retry" onClick={onRetry}><RefreshCwIcon /></IconButton> : null}
      {onGood || feedback ? (
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
      ) : null}
      {onBad || feedback ? (
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
      ) : null}
    </div>
  )
}
export { MessageActions }
export type { MessageActionsProps }
