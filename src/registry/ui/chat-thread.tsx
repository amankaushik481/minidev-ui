"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { MessageBubble } from "@/registry/ui/message-bubble"

/**
 * A scrolling chat transcript of MessageBubbles that sticks to the newest message unless the reader has scrolled up.
 *
 * Use for AI chat and support threads. Give it a fixed height (e.g. `className="h-96"`) so it scrolls.
 * It is a `role="log"` region, so screen readers hear new messages politely. Pair with PromptInput or AiComposer below it.
 *
 * @example
 * <ChatThread
 *   className="h-96"
 *   messages={[
 *     { id: "1", role: "user", content: "Summarise INV-2041" },
 *     { id: "2", role: "assistant", content: "Northwind owes $12,400, due Friday.", streaming: true },
 *   ]}
 * />
 */
type ChatThreadProps = {
  /** Messages oldest first. `id` must be stable; `streaming` shows the live cursor on that bubble. */
  messages: ChatMessage[]
  /** Shown when `messages` is empty. Defaults to a muted "No messages yet". */
  empty?: React.ReactNode
  /** Accessible name for the log region. Defaults to "Conversation". */
  label?: string
  className?: string
}

type ChatMessage = {
  id: string
  role: "user" | "assistant" | "system"
  content: React.ReactNode
  streaming?: boolean
}

// How close to the bottom (px) still counts as "following" the conversation.
const STICK = 48

function ChatThread({ messages, empty, label = "Conversation", className }: ChatThreadProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const following = React.useRef(true)
  React.useLayoutEffect(() => {
    const el = ref.current
    if (el && following.current) el.scrollTop = el.scrollHeight
  }, [messages])
  return (
    <div
      ref={ref}
      data-slot="chat-thread"
      role="log"
      aria-label={label}
      tabIndex={0}
      onScroll={(e) => {
        const el = e.currentTarget
        following.current = el.scrollHeight - el.scrollTop - el.clientHeight < STICK
      }}
      className={cn(
        "flex min-h-48 flex-col gap-3 overflow-y-auto rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-accent",
        className
      )}
    >
      {messages.length === 0
        ? (empty ?? <p className="py-10 text-center text-sm text-fg-muted">No messages yet</p>)
        : messages.map((m) => (
            <MessageBubble key={m.id} role={m.role} streaming={m.streaming}>
              {m.content}
            </MessageBubble>
          ))}
    </div>
  )
}
export { ChatThread }
export type { ChatThreadProps, ChatMessage as ChatThreadMessage }
