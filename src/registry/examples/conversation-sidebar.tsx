"use client"
import * as React from "react"
import { ConversationSidebar, type Conversation } from "@/registry/ui/conversation-sidebar"
import type { Example } from "./types"

function ThreadList() {
  const [items, setItems] = React.useState<Conversation[]>(() => {
    const now = Math.floor(Date.now() / 60_000) * 60_000
    return [
      { id: "t1", title: "Renewal terms for Halcyon Labs", updatedAt: new Date(now - 20 * 60_000) },
      { id: "t2", title: "Why is MRR down 3% in October?", updatedAt: new Date(now - 5 * 3_600_000) },
      { id: "t3", title: "Draft onboarding email for Priya", updatedAt: new Date(now - 30 * 3_600_000) },
    ]
  })
  const [active, setActive] = React.useState("t1")
  return (
    <div className="h-80 overflow-hidden rounded-xl border border-border">
      <ConversationSidebar
        className="border-r-0"
        items={items}
        activeId={active}
        onSelect={setActive}
        onNew={() => {
          const id = `t${items.length + 1}`
          setItems((all) => [{ id, title: "New chat", updatedAt: new Date() }, ...all])
          setActive(id)
        }}
      />
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Controlled threads",
    description: "Own the list and the active id: New chat adds a thread at the top and selects it.",
    code: `function ThreadList() {
  const [items, setItems] = React.useState<Conversation[]>(() => {
    const now = Math.floor(Date.now() / 60_000) * 60_000
    return [
      { id: "t1", title: "Renewal terms for Halcyon Labs", updatedAt: new Date(now - 20 * 60_000) },
      { id: "t2", title: "Why is MRR down 3% in October?", updatedAt: new Date(now - 5 * 3_600_000) },
      { id: "t3", title: "Draft onboarding email for Priya", updatedAt: new Date(now - 30 * 3_600_000) },
    ]
  })
  const [active, setActive] = React.useState("t1")
  return (
    <div className="h-80 overflow-hidden rounded-xl border border-border">
      <ConversationSidebar
        className="border-r-0"
        items={items}
        activeId={active}
        onSelect={setActive}
        onNew={() => {
          const id = \`t\${items.length + 1}\`
          setItems((all) => [{ id, title: "New chat", updatedAt: new Date() }, ...all])
          setActive(id)
        }}
      />
    </div>
  )
}`,
    node: <ThreadList />,
  },
  {
    title: "Next to the chat",
    description: "Without items it shows sample threads, which is enough to lay out the screen before your data is wired.",
    code: `<div className="flex h-80 w-full max-w-2xl overflow-hidden rounded-xl border border-border">
  <ConversationSidebar />
  <div className="grid flex-1 place-items-center bg-bg text-sm text-fg-muted">Select a conversation</div>
</div>`,
    node: (
      <div className="flex h-80 w-full max-w-2xl overflow-hidden rounded-xl border border-border">
        <ConversationSidebar />
        <div className="grid flex-1 place-items-center bg-bg text-sm text-fg-muted">Select a conversation</div>
      </div>
    ),
  },
]
