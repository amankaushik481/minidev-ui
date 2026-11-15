"use client"
import * as React from "react"
import { FeedbackThumbs } from "@/registry/ui/feedback-thumbs"
import type { Example } from "./types"

function ArticleFeedback() {
  const [vote, setVote] = React.useState<"up" | "down" | null>(null)
  return (
    <div className="flex w-full max-w-md items-center justify-between gap-3 rounded-xl border border-border bg-surface px-4 py-3">
      <p className="text-sm text-fg">
        {vote === "up" ? "Thanks, glad it helped." : vote === "down" ? "Thanks. We'll rewrite this article." : "Was this article helpful?"}
      </p>
      <FeedbackThumbs value={vote} onChange={setVote} />
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Under a help article",
    description: "onChange gets up, down or null; a second press on the same thumb clears the vote.",
    code: `function ArticleFeedback() {
  const [vote, setVote] = React.useState<"up" | "down" | null>(null)
  return (
    <div className="flex w-full max-w-md items-center justify-between gap-3 rounded-xl border border-border bg-surface px-4 py-3">
      <p className="text-sm text-fg">
        {vote === "up" ? "Thanks, glad it helped." : vote === "down" ? "Thanks. We'll rewrite this article." : "Was this article helpful?"}
      </p>
      <FeedbackThumbs value={vote} onChange={setVote} />
    </div>
  )
}`,
    node: <ArticleFeedback />,
  },
  {
    title: "Restoring a saved vote",
    description: "Pass the vote you stored as defaultValue so the thumb shows pressed when the answer is reopened.",
    code: `<div className="flex items-center gap-3">
  <span className="text-xs text-fg-muted">You rated this answer</span>
  <FeedbackThumbs defaultValue="up" />
</div>`,
    node: (
      <div className="flex items-center gap-3">
        <span className="text-xs text-fg-muted">You rated this answer</span>
        <FeedbackThumbs defaultValue="up" />
      </div>
    ),
  },
]
