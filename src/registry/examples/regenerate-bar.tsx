"use client"
import * as React from "react"
import { RegenerateBar } from "@/registry/ui/regenerate-bar"
import { MessageBubble } from "@/registry/ui/message-bubble"
import type { Example } from "./types"

function RegenerateAnswer() {
  const answers = ["Churn rose to 3.1% because 14 annual Starter plans did not renew.", "Most of October's churn came from Starter plans bought in last year's promo."]
  const [i, setI] = React.useState(0)
  const [pending, setPending] = React.useState(false)
  const timer = React.useRef<ReturnType<typeof setTimeout>>(undefined)
  React.useEffect(() => () => clearTimeout(timer.current), [])
  return (
    <div className="w-full max-w-md space-y-3">
      <MessageBubble role="assistant" streaming={pending}>{pending ? "" : answers[i]}</MessageBubble>
      <RegenerateBar
        pending={pending}
        onEdit={() => {}}
        onRegenerate={() => {
          setPending(true)
          timer.current = setTimeout(() => {
            setI((n) => (n + 1) % answers.length)
            setPending(false)
          }, 1500)
        }}
      />
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Regenerate with pending state",
    description: "pending disables Regenerate and spins its icon while the new answer streams.",
    code: `function RegenerateAnswer() {
  const answers = ["Churn rose to 3.1% because 14 annual Starter plans did not renew.", "Most of October's churn came from Starter plans bought in last year's promo."]
  const [i, setI] = React.useState(0)
  const [pending, setPending] = React.useState(false)
  const timer = React.useRef<ReturnType<typeof setTimeout>>(undefined)
  React.useEffect(() => () => clearTimeout(timer.current), [])
  return (
    <div className="w-full max-w-md space-y-3">
      <MessageBubble role="assistant" streaming={pending}>{pending ? "" : answers[i]}</MessageBubble>
      <RegenerateBar
        pending={pending}
        onEdit={() => {}}
        onRegenerate={() => {
          setPending(true)
          timer.current = setTimeout(() => {
            setI((n) => (n + 1) % answers.length)
            setPending(false)
          }, 1500)
        }}
      />
    </div>
  )
}`,
    node: <RegenerateAnswer />,
  },
  {
    title: "Custom label",
    description: "Use label to say what the answer was based on. Without onEdit only Regenerate shows.",
    code: `<RegenerateBar className="w-full max-w-md" label="Based on data up to Oct 31." onRegenerate={() => {}} />`,
    node: (
      <RegenerateBar className="w-full max-w-md" label="Based on data up to Oct 31." onRegenerate={() => {}} />
    ),
  },
]
