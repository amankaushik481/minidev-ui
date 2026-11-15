"use client"
import * as React from "react"
import { MessageBranch } from "@/registry/ui/message-branch"
import { MessageActions } from "@/registry/ui/message-actions"
import type { Example } from "./types"

const DRAFTS = [
  "INV-2033 is 6 days overdue. A reminder went to Maya Chen on Monday, and she has not opened it yet.",
  "Northwind Traders owes $4,180 on INV-2033, due 6 days ago. Lumen sent one reminder on Monday. A call may work better than a second email.",
  "Overdue: INV-2033, $4,180, 6 days. Next step: a second reminder goes out automatically on Thursday.",
]

function RegenerateReply() {
  const [replies, setReplies] = React.useState([DRAFTS[0]!])
  return (
    <div className="w-full max-w-md">
      <MessageBranch
        versions={replies.map((text) => (
          <p key={text} className="text-sm leading-[1.6] text-fg">{text}</p>
        ))}
        actions={
          <MessageActions
            onRetry={() => setReplies((r) => [...r, DRAFTS[r.length % DRAFTS.length]!])}
          />
        }
      />
    </div>
  )
}

const TURNS = [
  {
    prompt: "Which invoices are overdue?",
    reply: "Two: INV-2033 for Northwind Traders ($4,180, 6 days) and INV-2029 for Helix Biotech ($960, 2 days).",
  },
  {
    prompt: "Which invoices are more than 5 days overdue?",
    reply: "One: INV-2033 for Northwind Traders, $4,180, due 6 days ago.",
  },
]

function EditedPrompt() {
  const [turn, setTurn] = React.useState(1)
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <MessageBranch
        label="Prompt"
        index={turn}
        onIndexChange={setTurn}
        className="items-end"
        versions={TURNS.map((t) => (
          <p key={t.prompt} className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md border border-border bg-sunken px-3.5 py-2 text-sm text-fg">
            {t.prompt}
          </p>
        ))}
      />
      <p className="text-sm leading-[1.6] text-fg">{TURNS[turn]!.reply}</p>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Regenerate adds a version",
    description: "Retry appends a reply; uncontrolled, the branch jumps to the new one. Alt+Left and Alt+Right switch while focus is inside.",
    code: `function RegenerateReply() {
  const [replies, setReplies] = React.useState([firstReply])
  return (
    <MessageBranch
      versions={replies.map((text) => (
        <p key={text} className="text-sm leading-[1.6] text-fg">{text}</p>
      ))}
      actions={
        <MessageActions onRetry={async () => setReplies((r) => [...r, await regenerate()])} />
      }
    />
  )
}`,
    node: <RegenerateReply />,
  },
  {
    title: "Edited prompt, controlled",
    description: "Branch the user's message with label=\"Prompt\" and keep the index in state, so the reply below follows the prompt version. className=\"items-end\" moves the switcher under the message.",
    code: `function EditedPrompt() {
  const [turn, setTurn] = React.useState(1)
  return (
    <div className="flex flex-col gap-3">
      <MessageBranch
        label="Prompt"
        index={turn}
        onIndexChange={setTurn}
        className="items-end"
        versions={turns.map((t) => (
          <p key={t.id} className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md border border-border bg-sunken px-3.5 py-2 text-sm text-fg">
            {t.prompt}
          </p>
        ))}
      />
      <Markdown>{turns[turn].reply}</Markdown>
    </div>
  )
}`,
    node: <EditedPrompt />,
  },
  {
    title: "One version",
    description: "With a single version the switcher hides itself and only the actions show. Pass hideWhenSingle={false} to keep \"1 / 1\".",
    code: `<MessageBranch
  versions={[<p key="a" className="text-sm leading-[1.6] text-fg">Helix Biotech paid INV-2029 this morning.</p>]}
  actions={<MessageActions onCopy={() => navigator.clipboard.writeText("Helix Biotech paid INV-2029 this morning.")} />}
/>`,
    node: (
      <div className="w-full max-w-md">
        <MessageBranch
          versions={[<p key="a" className="text-sm leading-[1.6] text-fg">Helix Biotech paid INV-2029 this morning.</p>]}
          actions={<MessageActions onCopy={() => navigator.clipboard.writeText("Helix Biotech paid INV-2029 this morning.")} />}
        />
      </div>
    ),
  },
]
