"use client"
import * as React from "react"
import { CommentThread } from "@/registry/ui/comment-thread"
import { Textarea } from "@/registry/ui/textarea"
import { Button } from "@/registry/ui/button"
import type { Example } from "./types"

const DEPLOY_THREAD = [
  { id: "d1", author: "Theo Okafor", body: "Rolled lumen-web 2.14 to production. Checkout p95 went from 820ms to 410ms.", time: "Yesterday" },
  { id: "d2", author: "Sam Lowe", body: "Seeing a handful of 500s on the PDF export route after the deploy, all for invoices with more than 200 line items.", time: "Yesterday" },
  { id: "d3", author: "Theo Okafor", body: "Found it, the new renderer times out at 10 seconds. Fix is in review, will hotfix tonight.", time: "3h ago" },
]

function ReplyDemo() {
  const [comments, setComments] = React.useState([
    { id: "r1", author: "Maya Chen", body: "Can we split INV-2041 into two invoices? Northwind wants hardware and services billed separately.", time: "1h ago" },
    { id: "r2", author: "Priya Raman", body: "Yes, I will void it and issue INV-2041-A and INV-2041-B this afternoon.", time: "40m ago" },
  ])
  const [draft, setDraft] = React.useState("")
  const post = () => {
    const body = draft.trim()
    if (!body) return
    setComments((c) => [...c, { id: `r${c.length + 1}`, author: "Sam Lowe", body, time: "Just now" }])
    setDraft("")
  }
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <CommentThread comments={comments} />
      <form
        className="flex flex-col gap-2"
        onSubmit={(e) => {
          e.preventDefault()
          post()
        }}
      >
        <Textarea
          aria-label="Reply"
          placeholder="Write a reply"
          className="min-h-20"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
        />
        <Button type="submit" size="sm" className="self-end" disabled={!draft.trim()}>Reply</Button>
      </form>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Custom comments",
    description: "Each comment needs an id, an author and a body; time is optional and shows next to the name.",
    code: `const DEPLOY_THREAD = [
  { id: "d1", author: "Theo Okafor", body: "Rolled lumen-web 2.14 to production. Checkout p95 went from 820ms to 410ms.", time: "Yesterday" },
  { id: "d2", author: "Sam Lowe", body: "Seeing a handful of 500s on the PDF export route after the deploy, all for invoices with more than 200 line items.", time: "Yesterday" },
  { id: "d3", author: "Theo Okafor", body: "Found it, the new renderer times out at 10 seconds. Fix is in review, will hotfix tonight.", time: "3h ago" },
]

<CommentThread comments={DEPLOY_THREAD} className="w-full max-w-md" />`,
    node: <CommentThread comments={DEPLOY_THREAD} className="w-full max-w-md" />,
  },
  {
    title: "With a reply box",
    description: "Keep the comments in state and append to the array when the form submits; the thread is read-only on its own.",
    code: `function ReplyDemo() {
  const [comments, setComments] = React.useState([
    { id: "r1", author: "Maya Chen", body: "Can we split INV-2041 into two invoices? Northwind wants hardware and services billed separately.", time: "1h ago" },
    { id: "r2", author: "Priya Raman", body: "Yes, I will void it and issue INV-2041-A and INV-2041-B this afternoon.", time: "40m ago" },
  ])
  const [draft, setDraft] = React.useState("")
  const post = () => {
    const body = draft.trim()
    if (!body) return
    setComments((c) => [...c, { id: \`r\${c.length + 1}\`, author: "Sam Lowe", body, time: "Just now" }])
    setDraft("")
  }
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <CommentThread comments={comments} />
      <form
        className="flex flex-col gap-2"
        onSubmit={(e) => {
          e.preventDefault()
          post()
        }}
      >
        <Textarea
          aria-label="Reply"
          placeholder="Write a reply"
          className="min-h-20"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
        />
        <Button type="submit" size="sm" className="self-end" disabled={!draft.trim()}>Reply</Button>
      </form>
    </div>
  )
}`,
    node: <ReplyDemo />,
  },
]
