"use client"
import * as React from "react"
import { VoteControl } from "@/registry/ui/vote-control"
import type { Example } from "./types"

type Vote = "up" | "down" | null
const delta = (v: Vote) => (v === "up" ? 1 : v === "down" ? -1 : 0)

function FeatureRequest() {
  const [vote, setVote] = React.useState<Vote>(null)
  const [score, setScore] = React.useState(41)
  return (
    <div className="flex w-full max-w-md items-start gap-3 rounded-xl border border-border bg-surface p-4">
      <VoteControl
        score={score}
        value={vote}
        onChange={(next) => {
          setScore(score - delta(vote) + delta(next))
          setVote(next)
        }}
      />
      <div>
        <p className="text-sm font-medium text-fg">Recurring invoices in other currencies</p>
        <p className="mt-1 text-xs text-fg-muted">Requested by 41 workspaces · Planned</p>
      </div>
    </div>
  )
}

function AnswerVote() {
  const [vote, setVote] = React.useState<Vote>("up")
  const [score, setScore] = React.useState(12)
  return (
    <div className="w-full max-w-md rounded-xl border border-border bg-surface p-4">
      <p className="text-sm text-fg">Set the payment terms on the customer, not the invoice, and every new invoice picks them up.</p>
      <VoteControl
        className="mt-3 flex-row gap-1"
        score={score}
        value={vote}
        onChange={(next) => {
          setScore(score - delta(vote) + delta(next))
          setVote(next)
        }}
      />
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Feature board",
    description: "score is shown as given, so recompute it from the old and new vote in onChange.",
    code: `type Vote = "up" | "down" | null
const delta = (v: Vote) => (v === "up" ? 1 : v === "down" ? -1 : 0)

function FeatureRequest() {
  const [vote, setVote] = React.useState<Vote>(null)
  const [score, setScore] = React.useState(41)
  return (
    <div className="flex w-full max-w-md items-start gap-3 rounded-xl border border-border bg-surface p-4">
      <VoteControl
        score={score}
        value={vote}
        onChange={(next) => {
          setScore(score - delta(vote) + delta(next))
          setVote(next)
        }}
      />
      <div>
        <p className="text-sm font-medium text-fg">Recurring invoices in other currencies</p>
        <p className="mt-1 text-xs text-fg-muted">Requested by 41 workspaces · Planned</p>
      </div>
    </div>
  )
}`,
    node: <FeatureRequest />,
  },
  {
    title: "Horizontal, under an answer",
    description: "flex-row lays the arrows either side of the score; pressing the active arrow again clears the vote.",
    code: `type Vote = "up" | "down" | null
const delta = (v: Vote) => (v === "up" ? 1 : v === "down" ? -1 : 0)

function AnswerVote() {
  const [vote, setVote] = React.useState<Vote>("up")
  const [score, setScore] = React.useState(12)
  return (
    <div className="w-full max-w-md rounded-xl border border-border bg-surface p-4">
      <p className="text-sm text-fg">Set the payment terms on the customer, not the invoice, and every new invoice picks them up.</p>
      <VoteControl
        className="mt-3 flex-row gap-1"
        score={score}
        value={vote}
        onChange={(next) => {
          setScore(score - delta(vote) + delta(next))
          setVote(next)
        }}
      />
    </div>
  )
}`,
    node: <AnswerVote />,
  },
]
