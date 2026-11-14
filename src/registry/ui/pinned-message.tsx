"use client"
import * as React from "react"
import { PinIcon } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * PinnedMessage — an accent-tinted note pinned to the top of a channel or thread, with its author.
 *
 * Use it for one standing announcement above a message list; for page-wide notices use
 * Banner, for inline warnings use Callout. Pass `onUnpin` to show an Unpin button.
 *
 * @example
 * <PinnedMessage author="Maya" body="Release freeze starts Friday at 18:00 UTC." onUnpin={unpin} />
 */
type PinnedMessageProps = {
  /** Who pinned or wrote it. */
  author?: string
  /** The message text. */
  body?: React.ReactNode
  /** Shows an Unpin button that calls this. */
  onUnpin?: () => void
  className?: string
}

function PinnedMessage({
  author = "Ops",
  body = "Client walkthrough lives at /showcase. Lead with the OS mock.",
  onUnpin,
  className,
}: PinnedMessageProps) {
  return (
    <div data-slot="pinned-message" className={cn("flex gap-3 rounded-xl border border-accent/25 bg-accent/5 px-3 py-2.5", className)}>
      <PinIcon className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium text-accent">Pinned · {author}</p>
        <p className="mt-0.5 text-sm text-pretty text-fg">{body}</p>
      </div>
      {onUnpin ? (
        <button
          type="button"
          onClick={onUnpin}
          className="-my-0.5 h-6 shrink-0 self-start rounded-md px-2 text-xs font-medium text-fg-muted outline-none transition-[background-color,color] duration-[70ms] hover:bg-accent-soft hover:text-fg focus-visible:ring-2 focus-visible:ring-accent"
        >
          Unpin
        </button>
      ) : null}
    </div>
  )
}
export { PinnedMessage }
export type { PinnedMessageProps }
