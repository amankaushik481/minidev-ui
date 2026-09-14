"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { MessageBubble } from "@/registry/ui/message-bubble"

type Msg = {
  id: string
  role: "user" | "assistant" | "system"
  content: React.ReactNode
  streaming?: boolean
}

function ChatThread({
  messages,
  className,
  empty,
}: {
  messages: Msg[]
  className?: string
  empty?: React.ReactNode
}) {
  const ref = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    el.scrollTop = el.scrollHeight
  }, [messages])
  return (
    <div
      ref={ref}
      data-slot="chat-thread"
      role="log"
      aria-live="polite"
      className={cn("flex min-h-48 flex-col gap-3 overflow-y-auto", className)}
    >
      {messages.length === 0 ? empty ?? (
        <p className="py-10 text-center text-sm text-fg-muted">No messages yet</p>
      ) : (
        messages.map((m) => (
          <MessageBubble key={m.id} role={m.role} streaming={m.streaming}>
            {m.content}
          </MessageBubble>
        ))
      )}
    </div>
  )
}
export { ChatThread }
