"use client"
import * as React from "react"
import { CommentComposer } from "@/registry/ui/comment-composer"
import type { Example } from "./types"

function InvoiceComments() {
  const [comments, setComments] = React.useState(["Maya: Sent the reminder on Tuesday."])
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <ul className="space-y-1.5 text-sm text-fg">
        {comments.map((c, i) => (
          <li key={i} className="rounded-lg bg-sunken px-3 py-2">{c}</li>
        ))}
      </ul>
      <CommentComposer onSubmit={(text) => setComments((list) => [...list, "You: " + text])} placeholder="Add a note to INV-2041…" />
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Notes on an invoice",
    description: "onSubmit gets the trimmed text and the box clears itself. ⌘ or Ctrl+Enter also sends.",
    code: `function InvoiceComments() {
  const [comments, setComments] = React.useState(["Maya: Sent the reminder on Tuesday."])
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <ul className="space-y-1.5 text-sm text-fg">
        {comments.map((c, i) => (
          <li key={i} className="rounded-lg bg-sunken px-3 py-2">{c}</li>
        ))}
      </ul>
      <CommentComposer onSubmit={(text) => setComments((list) => [...list, "You: " + text])} placeholder="Add a note to INV-2041…" />
    </div>
  )
}`,
    node: <InvoiceComments />,
  },
  {
    title: "Reply box",
    description: "Change the button text and the textarea's accessible name for a reply.",
    code: `<CommentComposer label="Reply to Theo" submitLabel="Reply" placeholder="Reply to Theo…" className="w-full max-w-md" />`,
    node: <CommentComposer label="Reply to Theo" submitLabel="Reply" placeholder="Reply to Theo…" className="w-full max-w-md" />,
  },
]
