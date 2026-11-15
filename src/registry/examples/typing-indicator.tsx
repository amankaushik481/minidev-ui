"use client"
import { TypingIndicator } from "@/registry/ui/typing-indicator"
import { MessageBubble } from "@/registry/ui/message-bubble"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Waiting for the first token",
    description: "Show it after the user sends and replace it with the reply once text arrives.",
    code: `<div className="flex w-full max-w-md flex-col gap-3">
  <MessageBubble role="user">Summarise the failed payments from yesterday.</MessageBubble>
  <TypingIndicator label="Assistant is typing" />
</div>`,
    node: (
      <div className="flex w-full max-w-md flex-col gap-3">
        <MessageBubble role="user">Summarise the failed payments from yesterday.</MessageBubble>
        <TypingIndicator label="Assistant is typing" />
      </div>
    ),
  },
  {
    title: "With a visible name",
    description: "label is for screen readers only, so in a team chat show the name next to the dots.",
    code: `<div className="flex items-center gap-2">
  <TypingIndicator label="Maya Chen is typing" />
  <span aria-hidden className="text-xs text-fg-muted">Maya Chen is typing</span>
</div>`,
    node: (
      <div className="flex items-center gap-2">
        <TypingIndicator label="Maya Chen is typing" />
        <span aria-hidden className="text-xs text-fg-muted">Maya Chen is typing</span>
      </div>
    ),
  },
]
