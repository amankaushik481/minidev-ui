"use client"
import * as React from "react"
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react"
import { cn } from "@/lib/utils"

function VoteControl({
  score = 0,
  value,
  onChange,
  className,
}: {
  score?: number
  value?: "up" | "down" | null
  onChange?: (value: "up" | "down" | null) => void
  className?: string
}) {
  return (
    <div data-slot="vote-control" className={cn("inline-flex flex-col items-center gap-0.5", className)}>
      <button
        type="button"
        aria-label="Upvote"
        aria-pressed={value === "up"}
        className={cn("rounded-md p-0.5 outline-none focus-visible:ring-2 focus-visible:ring-accent", value === "up" ? "text-accent" : "text-fg-muted hover:text-fg")}
        onClick={() => onChange?.(value === "up" ? null : "up")}
      >
        <ChevronUpIcon className="size-4" />
      </button>
      <span className="text-xs font-medium tabular-nums text-fg">{score}</span>
      <button
        type="button"
        aria-label="Downvote"
        aria-pressed={value === "down"}
        className={cn("rounded-md p-0.5 outline-none focus-visible:ring-2 focus-visible:ring-accent", value === "down" ? "text-danger" : "text-fg-muted hover:text-fg")}
        onClick={() => onChange?.(value === "down" ? null : "down")}
      >
        <ChevronDownIcon className="size-4" />
      </button>
    </div>
  )
}
export { VoteControl }
