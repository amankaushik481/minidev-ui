"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { StreamingCursor } from "@/registry/ui/streaming-cursor"

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
      className={cn("flex w-full", mine ? "justify-end" : "justify-start", className)}
    >
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-[1.55] shadow-[inset_0_1px_0_oklch(1_0_0/0.45)]",
          mine && "bg-accent text-primary-foreground",
          role === "assistant" && "border border-border bg-surface text-fg",
          role === "system" && "border border-border bg-sunken text-fg-muted"
        )}
      >
        {children}
        {streaming ? <StreamingCursor /> : null}
      </div>
    </div>
  )
}
export { MessageBubble }
