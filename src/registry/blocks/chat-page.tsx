"use client"
import { ChatThread } from "@/registry/ui/chat-thread"
import { PromptInput } from "@/registry/ui/prompt-input"
import { PageHeader } from "@/registry/ui/page-header"

function ChatPage() {
  return (
    <div data-slot="chat-page" className="flex h-[520px] flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-[inset_0_1px_0_oklch(1_0_0/0.55)]">
      <div className="border-b border-border px-4 py-3">
        <PageHeader title="Agent" description="Hairline chat surface" className="mb-0 border-b-0 pb-0" />
      </div>
      <div className="min-h-0 flex-1 overflow-auto p-4" tabIndex={0}>
        <ChatThread
          messages={[
            { id: "1", role: "user", content: "Show me the client showcase path." },
            { id: "2", role: "assistant", content: "Open / then /showcase — pitch hero, OS mock, tier compare." },
          ]}
        />
      </div>
      <div className="border-t border-border p-3">
        <PromptInput />
      </div>
    </div>
  )
}
export { ChatPage }
