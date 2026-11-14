"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { ChatThread } from "@/registry/ui/chat-thread"
import { PageHeader } from "@/registry/ui/page-header"
import { PromptInput } from "@/registry/ui/prompt-input"

/**
 * ChatPage — a full-height AI chat screen: titled header, a scrolling transcript that follows new messages, and a composer.
 *
 * Use for an assistant or support chat that owns the page. Sent messages append to the thread; wire `onSend`
 * to your model and push its reply into your own state when you copy the block. For just the transcript use
 * ChatThread; for a composer with attachments and model picker use AiComposer. Give the block a height.
 *
 * @example
 * <ChatPage className="h-[600px]" onSend={(text) => ask(text)} />
 */
type ChatPageProps = {
  /** Called with the trimmed text each time the user sends a message. */
  onSend?: (text: string) => void
  className?: string
}

type Msg = { id: string; role: "user" | "assistant"; content: string }

const SAMPLE: Msg[] = [
  { id: "m1", role: "user", content: "Why did refunds spike on Sunday?" },
  {
    id: "m2",
    role: "assistant",
    content: "Batch #4411 refunded 38 orders at 14:02, $9,860 in total. All were annual Starter plans bought in the October promo. Want the list?",
  },
]

function ChatPage({ onSend, className }: ChatPageProps) {
  const [messages, setMessages] = React.useState(SAMPLE)
  const [draft, setDraft] = React.useState("")
  return (
    <div data-slot="chat-page" className={cn("flex h-[520px] flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-raised", className)}>
      <div className="border-b border-border px-4 py-3">
        <PageHeader title="Ask Lumen" description="Answers from Stripe, Postgres and HubSpot, with the rows they came from." className="mb-0 border-b-0 pb-0" />
      </div>
      <ChatThread messages={messages} label="Conversation with Lumen" className="min-h-0 flex-1 rounded-none p-4" />
      <div className="border-t border-border p-3">
        <PromptInput
          aria-label="Message Lumen"
          placeholder="Ask about revenue, churn, refunds…"
          value={draft}
          onChange={setDraft}
          onSubmit={(text) => {
            const t = text.trim()
            setMessages((m) => [...m, { id: `u${m.length}`, role: "user", content: t }])
            setDraft("")
            onSend?.(t)
          }}
        />
      </div>
    </div>
  )
}

export { ChatPage }
export type { ChatPageProps }
