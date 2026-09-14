"use client"
import { cn } from "@/lib/utils"
import { StreamingCursor } from "@/registry/ui/streaming-cursor"

function StreamingMessage({
  content = "Raising the Premium bar with a living OS mock and client pitch kit…",
  className,
}: {
  content?: string
  className?: string
}) {
  return (
    <div data-slot="streaming-message" className={cn("rounded-2xl border border-border bg-sunken px-4 py-3 text-sm leading-[1.55] text-fg", className)}>
      {content}
      <StreamingCursor />
    </div>
  )
}
export { StreamingMessage }
