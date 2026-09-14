"use client"
import { cn } from "@/lib/utils"
import { PinIcon } from "lucide-react"

function PinnedMessage({
  author = "Ops",
  body = "Client walkthrough lives at /showcase — lead with the OS mock.",
  className,
}: {
  author?: string
  body?: string
  className?: string
}) {
  return (
    <div data-slot="pinned-message" className={cn("flex gap-3 rounded-xl border border-accent/25 bg-accent/5 px-3 py-2.5", className)}>
      <PinIcon className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
      <div>
        <p className="text-xs font-medium text-accent">Pinned · {author}</p>
        <p className="mt-0.5 text-sm text-fg">{body}</p>
      </div>
    </div>
  )
}
export { PinnedMessage }
