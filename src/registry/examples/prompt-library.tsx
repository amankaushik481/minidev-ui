"use client"
import * as React from "react"
import { PromptLibrary } from "@/registry/ui/prompt-library"
import { PromptInput } from "@/registry/ui/prompt-input"
import type { Example } from "./types"

const SUPPORT_PROMPTS = [
  { id: "refund", title: "Explain a refund", body: "Explain to the customer when their refund will arrive, based on the payment method on the order.", tag: "Billing" },
  { id: "bug", title: "Turn ticket into bug report", body: "Rewrite this ticket as a bug report with steps to reproduce, expected and actual result.", tag: "Engineering" },
  { id: "tone", title: "Soften the reply", body: "Rewrite my draft so it is calm and short, keeps every fact, and ends with one clear next step.", tag: "Writing" },
]

function LibraryToComposer() {
  const [draft, setDraft] = React.useState("")
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <PromptLibrary onSelect={(p) => setDraft(p.body)} />
      <PromptInput value={draft} onChange={setDraft} onSubmit={() => setDraft("")} placeholder="Pick a prompt or type" />
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Pick into the composer",
    description: "onSelect gets the whole prompt; put its body into a controlled PromptInput so it can be edited before sending.",
    code: `function LibraryToComposer() {
  const [draft, setDraft] = React.useState("")
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <PromptLibrary onSelect={(p) => setDraft(p.body)} />
      <PromptInput value={draft} onChange={setDraft} onSubmit={() => setDraft("")} placeholder="Pick a prompt or type" />
    </div>
  )
}`,
    node: <LibraryToComposer />,
  },
  {
    title: "Team prompts",
    description: "Pass your own prompts. Search matches title, body and tag, so typing billing finds the refund prompt.",
    code: `const SUPPORT_PROMPTS = [
  { id: "refund", title: "Explain a refund", body: "Explain to the customer when their refund will arrive, based on the payment method on the order.", tag: "Billing" },
  { id: "bug", title: "Turn ticket into bug report", body: "Rewrite this ticket as a bug report with steps to reproduce, expected and actual result.", tag: "Engineering" },
  { id: "tone", title: "Soften the reply", body: "Rewrite my draft so it is calm and short, keeps every fact, and ends with one clear next step.", tag: "Writing" },
]

<PromptLibrary className="w-full max-w-sm" prompts={SUPPORT_PROMPTS} />`,
    node: (
      <PromptLibrary className="w-full max-w-sm" prompts={SUPPORT_PROMPTS} />
    ),
  },
]
