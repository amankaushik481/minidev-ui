"use client"
import * as React from "react"
import { SuggestionChips } from "@/registry/ui/suggestion-chips"
import { PromptInput } from "@/registry/ui/prompt-input"
import { MessageBubble } from "@/registry/ui/message-bubble"
import type { Example } from "./types"

function EmptyChatStarters() {
  const [draft, setDraft] = React.useState("")
  return (
    <div className="flex w-full max-w-lg flex-col gap-3">
      <p className="text-sm font-medium text-fg">What do you want to know about your revenue?</p>
      <SuggestionChips
        label="Starter questions"
        items={["Top 5 customers by revenue", "Which invoices are overdue?", "MRR change since June"]}
        onSelect={setDraft}
      />
      <PromptInput value={draft} onChange={setDraft} onSubmit={() => setDraft("")} />
    </div>
  )
}

function FollowUps() {
  const [asked, setAsked] = React.useState<string[]>([])
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <MessageBubble role="assistant">Northwind has 2 open invoices totalling $15,550.00.</MessageBubble>
      {asked.map((q, i) => (
        <MessageBubble key={i} role="user">{q}</MessageBubble>
      ))}
      <SuggestionChips label="Follow-up questions" items={["Send a reminder", "Show payment history"]} onSelect={(q) => setAsked((a) => [...a, q])} />
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Empty chat starters",
    description: "On an empty chat, a chip fills the composer so people can adjust it before sending.",
    code: `function EmptyChatStarters() {
  const [draft, setDraft] = React.useState("")
  return (
    <div className="flex w-full max-w-lg flex-col gap-3">
      <p className="text-sm font-medium text-fg">What do you want to know about your revenue?</p>
      <SuggestionChips
        label="Starter questions"
        items={["Top 5 customers by revenue", "Which invoices are overdue?", "MRR change since June"]}
        onSelect={setDraft}
      />
      <PromptInput value={draft} onChange={setDraft} onSubmit={() => setDraft("")} />
    </div>
  )
}`,
    node: <EmptyChatStarters />,
  },
  {
    title: "Follow-ups that send",
    description: "Under an answer, a chip can send straight away; here it adds the user's turn to the thread.",
    code: `function FollowUps() {
  const [asked, setAsked] = React.useState<string[]>([])
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <MessageBubble role="assistant">Northwind has 2 open invoices totalling $15,550.00.</MessageBubble>
      {asked.map((q, i) => (
        <MessageBubble key={i} role="user">{q}</MessageBubble>
      ))}
      <SuggestionChips label="Follow-up questions" items={["Send a reminder", "Show payment history"]} onSelect={(q) => setAsked((a) => [...a, q])} />
    </div>
  )
}`,
    node: <FollowUps />,
  },
]
