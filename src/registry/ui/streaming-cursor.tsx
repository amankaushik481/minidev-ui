"use client"
import { cn } from "@/lib/utils"

function StreamingCursor({ className }: { className?: string }) {
  return (
    <span
      data-slot="streaming-cursor"
      aria-hidden
      className={cn(
        "ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.1em] bg-accent align-baseline",
        "animate-[caret-blink_1.05s_steps(1)_infinite]",
        className
      )}
    />
  )
}
export { StreamingCursor }
