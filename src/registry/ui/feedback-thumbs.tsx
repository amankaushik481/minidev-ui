"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { ThumbsDownIcon, ThumbsUpIcon } from "lucide-react"

/**
 * FeedbackThumbs — a pair of thumbs up / thumbs down toggle buttons for rating an answer or article.
 *
 * Use under AI responses and help articles. Pressing the active thumb again
 * clears the vote (value becomes null). For message actions like copy and
 * retry use `MessageActions`; for star ratings use `Rating`; for up/down vote
 * counts use `VoteControl`.
 *
 * @example
 * <FeedbackThumbs onChange={(v) => track("answer_feedback", { vote: v })} />
 */
type FeedbackValue = "up" | "down" | null

type FeedbackThumbsProps = {
  /** Controlled vote. null means no vote. */
  value?: "up" | "down" | null
  /** Initial vote when uncontrolled. */
  defaultValue?: "up" | "down" | null
  /** Called with the new vote, or null when cleared. */
  onChange?: (v: "up" | "down" | null) => void
  className?: string
}

const thumb =
  "inline-flex size-8 items-center justify-center rounded-lg outline-none transition-[background-color,color] duration-[70ms] focus-visible:ring-2 focus-visible:ring-accent"

function FeedbackThumbs({ value, defaultValue = null, onChange, className }: FeedbackThumbsProps) {
  const [inner, setInner] = React.useState<FeedbackValue>(defaultValue)
  const v = value !== undefined ? value : inner
  const setV = (next: FeedbackValue) => {
    onChange?.(next)
    if (value === undefined) setInner(next)
  }
  return (
    <div
      data-slot="feedback-thumbs"
      role="group"
      aria-label="Was this helpful?"
      className={cn("inline-flex items-center gap-1 rounded-xl border border-border bg-surface p-1 shadow-highlight", className)}
    >
      <button
        type="button"
        aria-pressed={v === "up"}
        aria-label="Helpful"
        onClick={() => setV(v === "up" ? null : "up")}
        className={cn(thumb, v === "up" ? "bg-accent-soft text-accent-fg" : "text-fg-muted hover:text-fg")}
      >
        <ThumbsUpIcon className="size-4" aria-hidden />
      </button>
      <button
        type="button"
        aria-pressed={v === "down"}
        aria-label="Not helpful"
        onClick={() => setV(v === "down" ? null : "down")}
        className={cn(thumb, v === "down" ? "bg-danger/10 text-danger" : "text-fg-muted hover:text-fg")}
      >
        <ThumbsDownIcon className="size-4" aria-hidden />
      </button>
    </div>
  )
}
export { FeedbackThumbs }
export type { FeedbackThumbsProps, FeedbackValue }
