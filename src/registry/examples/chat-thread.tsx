"use client"
import * as React from "react"
import { ChatThread } from "@/registry/ui/chat-thread"
import { PromptInput } from "@/registry/ui/prompt-input"
import type { Example } from "./types"

type Msg = React.ComponentProps<typeof ChatThread>["messages"][number]

const THREAD: Msg[] = [
  { id: "1", role: "system", content: "Today, 9:41" },
  { id: "2", role: "user", content: "Which Northwind invoices are still open?" },
  { id: "3", role: "assistant", content: "Two are open: INV-2041 for $12,400.00 due Oct 24, and INV-2033 for $3,150.00 which is 6 days overdue." },
  { id: "4", role: "user", content: "Send a reminder for the overdue one." },
  { id: "5", role: "assistant", content: "Done. The reminder for INV-2033 went to Maya Chen with the payment link attached." },
]

function ComposerDemo() {
  const [messages, setMessages] = React.useState<Msg[]>([
    { id: "1", role: "assistant", content: "Hi Theo. Ask me anything about your Lumen account." },
  ])
  const [draft, setDraft] = React.useState("")
  const send = () => {
    const text = draft.trim()
    if (!text) return
    const id = String(Date.now())
    setMessages((m) => [...m, { id, role: "user", content: text }, { id: id + "-r", role: "assistant", content: "Looking that up", streaming: true }])
    setDraft("")
    setTimeout(() => {
      setMessages((m) => m.map((x) => (x.id === id + "-r" ? { ...x, content: "You have 3 open invoices totalling $16,530.00. The oldest is INV-2033.", streaming: false } : x)))
    }, 1200)
  }
  return (
    <div className="flex w-full max-w-md flex-col gap-3 rounded-2xl border border-border bg-surface p-4 shadow-raised">
      <ChatThread messages={messages} className="h-56" />
      <PromptInput value={draft} onChange={setDraft} onSubmit={send} placeholder="Ask about invoices" />
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Conversation",
    description: "User, assistant and system roles each get their own treatment; the thread keeps itself scrolled to the newest message.",
    code: `type Msg = React.ComponentProps<typeof ChatThread>["messages"][number]

const THREAD: Msg[] = [
  { id: "1", role: "system", content: "Today, 9:41" },
  { id: "2", role: "user", content: "Which Northwind invoices are still open?" },
  { id: "3", role: "assistant", content: "Two are open: INV-2041 for $12,400.00 due Oct 24, and INV-2033 for $3,150.00 which is 6 days overdue." },
  { id: "4", role: "user", content: "Send a reminder for the overdue one." },
  { id: "5", role: "assistant", content: "Done. The reminder for INV-2033 went to Maya Chen with the payment link attached." },
]

<div className="w-full max-w-md rounded-2xl border border-border bg-surface p-4 shadow-raised">
  <ChatThread messages={THREAD} className="h-64" />
</div>`,
    node: (
      <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-4 shadow-raised">
        <ChatThread messages={THREAD} className="h-64" />
      </div>
    ),
  },
  {
    title: "Streaming reply",
    description: "Set streaming on the last assistant message while tokens arrive; the cursor stops when you clear it.",
    code: `<div className="w-full max-w-md rounded-2xl border border-border bg-surface p-4 shadow-raised">
  <ChatThread
    messages={[
      { id: "1", role: "user", content: "Summarise September churn." },
      { id: "2", role: "assistant", content: "Net churn fell to 1.8%, down 0.4 points. Most of the drop came from annual plans renewing early after", streaming: true },
    ]}
  />
</div>`,
    node: (
      <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-4 shadow-raised">
        <ChatThread
          messages={[
            { id: "1", role: "user", content: "Summarise September churn." },
            { id: "2", role: "assistant", content: "Net churn fell to 1.8%, down 0.4 points. Most of the drop came from annual plans renewing early after", streaming: true },
          ]}
        />
      </div>
    ),
  },
  {
    title: "With a composer",
    description: "Append the user's message and a streaming placeholder, then replace the placeholder when the reply lands.",
    code: `type Msg = React.ComponentProps<typeof ChatThread>["messages"][number]

function ComposerDemo() {
  const [messages, setMessages] = React.useState<Msg[]>([
    { id: "1", role: "assistant", content: "Hi Theo. Ask me anything about your Lumen account." },
  ])
  const [draft, setDraft] = React.useState("")
  const send = () => {
    const text = draft.trim()
    if (!text) return
    const id = String(Date.now())
    setMessages((m) => [...m, { id, role: "user", content: text }, { id: id + "-r", role: "assistant", content: "Looking that up", streaming: true }])
    setDraft("")
    setTimeout(() => {
      setMessages((m) => m.map((x) => (x.id === id + "-r" ? { ...x, content: "You have 3 open invoices totalling $16,530.00. The oldest is INV-2033.", streaming: false } : x)))
    }, 1200)
  }
  return (
    <div className="flex w-full max-w-md flex-col gap-3 rounded-2xl border border-border bg-surface p-4 shadow-raised">
      <ChatThread messages={messages} className="h-56" />
      <PromptInput value={draft} onChange={setDraft} onSubmit={send} placeholder="Ask about invoices" />
    </div>
  )
}`,
    node: <ComposerDemo />,
  },
]
