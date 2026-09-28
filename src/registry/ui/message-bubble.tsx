"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { StreamingCursor } from "@/registry/ui/streaming-cursor"

/**
 * MessageBubble — user turns sit in a sunken capsule; assistant turns are
 * plain prose (the way the best AI products render them). System is a quiet rule.
 */
function MessageBubble({
  role = "assistant",
  streaming,
  children,
  className,
}: {
  role?: "user" | "assistant" | "system"
  streaming?: boolean
  children: React.ReactNode
  className?: string
}) {
  const mine = role === "user"
  return (
    <div
      data-slot="message-bubble"
      data-role={role}
      className={cn("flex w-full animate-[rise-in_220ms_var(--ease-hairline)_both]", mine ? "justify-end" : "justify-start", className)}
    >
      <div
        className={cn(
          "text-sm leading-[1.6]",
          mine && "max-w-[85%] rounded-2xl rounded-br-md border border-border bg-sunken px-3.5 py-2 text-fg",
          role === "assistant" && "max-w-[92%] py-0.5 text-fg",
          role === "system" && "w-full border-y border-dashed border-border py-2 text-center text-xs text-fg-subtle"
        )}
      >
        {children}
        {streaming ? <StreamingCursor /> : null}
      </div>
    </div>
  )
}
export { MessageBubble }
