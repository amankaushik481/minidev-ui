"use client"
import * as React from "react"
import { Rating } from "@/registry/ui/rating"
import { Textarea } from "@/registry/ui/textarea"
import { Button } from "@/registry/ui/button"
import type { Example } from "./types"

const LABELS = ["Not rated", "Poor", "Fair", "Good", "Great", "Excellent"]

function ControlledDemo() {
  const [score, setScore] = React.useState(4)
  return (
    <div className="flex items-center gap-3">
      <Rating value={score} onChange={setScore} aria-label="Rate your onboarding" />
      <span className="text-xs text-fg-muted">{LABELS[score]}</span>
    </div>
  )
}

function FeedbackDemo() {
  const [score, setScore] = React.useState(0)
  const [sent, setSent] = React.useState(false)
  return (
    <form
      className="flex w-full max-w-sm flex-col gap-3"
      onSubmit={(e) => {
        e.preventDefault()
        setSent(true)
      }}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-medium text-fg">How was your call with Theo?</span>
        <Rating value={score} onChange={setScore} aria-label="Call rating" />
      </div>
      <Textarea placeholder="Anything we should know?" aria-label="Comments" className="min-h-20" />
      <Button type="submit" size="sm" className="self-end" disabled={score === 0 || sent}>
        {sent ? "Thanks for the feedback" : "Send feedback"}
      </Button>
    </form>
  )
}

export const examples: Example[] = [
  {
    title: "Default value",
    description: "defaultValue sets the starting stars without taking control of the value.",
    code: `<Rating defaultValue={4} aria-label="Support rating" />`,
    node: <Rating defaultValue={4} aria-label="Support rating" />,
  },
  {
    title: "Controlled with label",
    description: "Keep the score in state and look up a word for it.",
    code: `const LABELS = ["Not rated", "Poor", "Fair", "Good", "Great", "Excellent"]

function ControlledDemo() {
  const [score, setScore] = React.useState(4)
  return (
    <div className="flex items-center gap-3">
      <Rating value={score} onChange={setScore} aria-label="Rate your onboarding" />
      <span className="text-xs text-fg-muted">{LABELS[score]}</span>
    </div>
  )
}`,
    node: <ControlledDemo />,
  },
  {
    title: "Scale and disabled",
    description: "max changes the number of stars; disabled shows a fixed score such as an average.",
    code: `<Rating max={10} defaultValue={7} aria-label="How likely are you to recommend Lumen?" />
<div className="flex items-center gap-2">
  <Rating value={4} disabled aria-label="Average rating" />
  <span className="text-xs text-fg-muted">4.0 from 128 reviews</span>
</div>`,
    node: (
      <div className="flex flex-col items-start gap-3">
        <Rating max={10} defaultValue={7} aria-label="How likely are you to recommend Lumen?" />
        <div className="flex items-center gap-2">
          <Rating value={4} disabled aria-label="Average rating" />
          <span className="text-xs text-fg-muted">4.0 from 128 reviews</span>
        </div>
      </div>
    ),
  },
  {
    title: "In a feedback form",
    description: "Pair the stars with a Textarea and keep the submit button disabled until a score is chosen.",
    code: `function FeedbackDemo() {
  const [score, setScore] = React.useState(0)
  const [sent, setSent] = React.useState(false)
  return (
    <form
      className="flex w-full max-w-sm flex-col gap-3"
      onSubmit={(e) => {
        e.preventDefault()
        setSent(true)
      }}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-medium text-fg">How was your call with Theo?</span>
        <Rating value={score} onChange={setScore} aria-label="Call rating" />
      </div>
      <Textarea placeholder="Anything we should know?" aria-label="Comments" className="min-h-20" />
      <Button type="submit" size="sm" className="self-end" disabled={score === 0 || sent}>
        {sent ? "Thanks for the feedback" : "Send feedback"}
      </Button>
    </form>
  )
}`,
    node: <FeedbackDemo />,
  },
]
