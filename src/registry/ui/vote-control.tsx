"use client"
import * as React from "react"
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * A vertical up/down vote control with the score between, for feature boards and Q&A. Pressing the active arrow again clears the vote.
 *
 * The arrows are toggle buttons (`aria-pressed`). `score` is displayed as given, so include the viewer's vote in it. Use `FeedbackThumbs` for rating an AI answer and `ReactionBar` for emoji reactions.
 *
 * @example
 * <VoteControl score={score} value={vote} onChange={(v) => { setScore(score - delta(vote) + delta(v)); setVote(v) }} />
 */
type Vote = "up" | "down" | null

type VoteControlProps = {
  /** Net score to display, including the viewer's vote. */
  score?: number
  /** Controlled vote. Pair with `onChange`. */
  value?: Vote
  /** Initial vote for the uncontrolled control. */
  defaultValue?: Vote
  /** Called with the new vote; null when cleared. */
  onChange?: (value: Vote) => void
  className?: string
}

function VoteControl({ score = 0, value, defaultValue = null, onChange, className }: VoteControlProps) {
  const [internal, setInternal] = React.useState<Vote>(defaultValue)
  const vote = value === undefined ? internal : value
  const set = (next: Vote) => {
    if (value === undefined) setInternal(next)
    onChange?.(next)
  }
  const btn = "grid size-7 place-items-center rounded-md outline-none transition-colors duration-[70ms] focus-visible:ring-2 focus-visible:ring-accent"
  return (
    <div data-slot="vote-control" role="group" aria-label="Vote" className={cn("inline-flex flex-col items-center", className)}>
      <button
        type="button"
        aria-label="Upvote"
        aria-pressed={vote === "up"}
        className={cn(btn, vote === "up" ? "text-accent-fg" : "text-fg-muted hover:text-fg")}
        onClick={() => set(vote === "up" ? null : "up")}
      >
        <ChevronUpIcon className="size-4" aria-hidden />
      </button>
      <span aria-live="polite" className="text-xs font-medium tabular-nums text-fg">
        <span className="sr-only">Score </span>
        {score}
      </span>
      <button
        type="button"
        aria-label="Downvote"
        aria-pressed={vote === "down"}
        className={cn(btn, vote === "down" ? "text-danger" : "text-fg-muted hover:text-fg")}
        onClick={() => set(vote === "down" ? null : "down")}
      >
        <ChevronDownIcon className="size-4" aria-hidden />
      </button>
    </div>
  )
}
export { VoteControl }
export type { VoteControlProps }
