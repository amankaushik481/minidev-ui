"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

function TypingIndicator({ className, label = "Typing" }: { className?: string; label?: string }) {
  return (
    <div
      data-slot="typing-indicator"
      role="status"
      aria-label={label}
      className={cn("inline-flex items-center gap-1 rounded-full border border-border bg-sunken px-2.5 py-1.5", className)}
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="size-1.5 animate-pulse rounded-full bg-fg-muted"
          style={{ animationDelay: `${i * 120}ms` }}
        />
      ))}
    </div>
  )
}
export { TypingIndicator }
