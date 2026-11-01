"use client"
import * as React from "react"
import { MentionInput } from "@/registry/ui/mention-input"
import { Button } from "@/registry/ui/button"
import { FormField } from "@/registry/ui/form-field"
import type { Example } from "./types"

const team = ["maya.chen", "theo.okafor", "priya.raman", "sam.lowe", "lena.fischer"]

function ControlledDemo() {
  const [value, setValue] = React.useState("")
  const mentions = value.match(/@[\w.-]+/g) ?? []
  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      <MentionInput value={value} onChange={setValue} suggestions={team} aria-label="Comment" placeholder="Type @ to mention a teammate" />
      <p className="text-xs text-fg-muted">
        {mentions.length ? `Will notify ${mentions.join(", ")}` : "No one mentioned yet."}
      </p>
    </div>
  )
}

function CommentFormDemo() {
  const [value, setValue] = React.useState("@priya.raman can you check the tax line on INV-2041?")
  const [posting, setPosting] = React.useState(false)
  const post = () => {
    setPosting(true)
    setTimeout(() => {
      setPosting(false)
      setValue("")
    }, 900)
  }
  return (
    <form
      className="flex w-full max-w-md flex-col gap-3"
      onSubmit={(e) => {
        e.preventDefault()
        post()
      }}
    >
      <FormField id="invoice-comment" label="Reply" description="Mentioned teammates get an email with the thread.">
        <MentionInput id="invoice-comment" value={value} onChange={setValue} suggestions={team} disabled={posting} />
      </FormField>
      <div className="flex justify-end">
        <Button type="submit" size="sm" disabled={!value.trim() || posting}>
          {posting ? "Posting…" : "Post comment"}
        </Button>
      </div>
    </form>
  )
}

export const examples: Example[] = [
  {
    title: "Controlled with suggestions",
    description: "Type @ and the matching suggestions appear; picking one completes the handle and the value stays plain text you can parse.",
    code: `const team = ["maya.chen", "theo.okafor", "priya.raman", "sam.lowe", "lena.fischer"]

function ControlledDemo() {
  const [value, setValue] = React.useState("")
  const mentions = value.match(/@[\\w.-]+/g) ?? []
  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      <MentionInput value={value} onChange={setValue} suggestions={team} aria-label="Comment" placeholder="Type @ to mention a teammate" />
      <p className="text-xs text-fg-muted">
        {mentions.length ? \`Will notify \${mentions.join(", ")}\` : "No one mentioned yet."}
      </p>
    </div>
  )
}`,
    node: <ControlledDemo />,
  },
  {
    title: "In a comment form",
    description: "FormField supplies the label and hint, the id links them, and disabled holds the field while the comment posts.",
    code: `function CommentFormDemo() {
  const [value, setValue] = React.useState("@priya.raman can you check the tax line on INV-2041?")
  const [posting, setPosting] = React.useState(false)
  const post = () => {
    setPosting(true)
    setTimeout(() => {
      setPosting(false)
      setValue("")
    }, 900)
  }
  return (
    <form
      className="flex w-full max-w-md flex-col gap-3"
      onSubmit={(e) => {
        e.preventDefault()
        post()
      }}
    >
      <FormField id="invoice-comment" label="Reply" description="Mentioned teammates get an email with the thread.">
        <MentionInput id="invoice-comment" value={value} onChange={setValue} suggestions={team} disabled={posting} />
      </FormField>
      <div className="flex justify-end">
        <Button type="submit" size="sm" disabled={!value.trim() || posting}>
          {posting ? "Posting…" : "Post comment"}
        </Button>
      </div>
    </form>
  )
}`,
    node: <CommentFormDemo />,
  },
]
