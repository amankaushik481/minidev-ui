"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { ThumbsDownIcon, ThumbsUpIcon } from "lucide-react"

function FeedbackThumbs({
  value,
  onChange,
  className,
}: {
  value?: "up" | "down" | null
  onChange?: (v: "up" | "down" | null) => void
  className?: string
}) {
  const [inner, setInner] = React.useState<"up" | "down" | null>(null)
  const v = value !== undefined ? value : inner
  const setV = (next: "up" | "down" | null) => {
    onChange?.(next)
    if (value === undefined) setInner(next)
  }
  return (
    <div data-slot="feedback-thumbs" className={cn("inline-flex items-center gap-1 rounded-xl border border-border bg-surface p-1 shadow-highlight", className)}>
      <button
        type="button"
        aria-pressed={v === "up"}
        aria-label="Helpful"
        onClick={() => setV(v === "up" ? null : "up")}
        className={cn("inline-flex size-8 items-center justify-center rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-accent", v === "up" ? "bg-accent/15 text-accent" : "text-fg-muted hover:text-fg")}
      >
        <ThumbsUpIcon className="size-4" />
      </button>
      <button
        type="button"
        aria-pressed={v === "down"}
        aria-label="Not helpful"
        onClick={() => setV(v === "down" ? null : "down")}
        className={cn("inline-flex size-8 items-center justify-center rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-accent", v === "down" ? "bg-danger/15 text-danger" : "text-fg-muted hover:text-fg")}
      >
        <ThumbsDownIcon className="size-4" />
      </button>
    </div>
  )
}
export { FeedbackThumbs }
