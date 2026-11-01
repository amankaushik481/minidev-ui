import * as React from "react"
import { CheckIcon, RocketIcon } from "lucide-react"
import { ConfettiButton } from "@/registry/premium/confetti-button"
import type { Example } from "./types"

function MarkPaid() {
  const [paid, setPaid] = React.useState(false)
  return (
    <div className="flex flex-col items-center gap-3">
      <ConfettiButton count={110} onClick={() => setPaid(true)}>
        <CheckIcon className="size-4" /> {paid ? "Paid" : "Mark INV-2041 as paid"}
      </ConfettiButton>
      <p className="text-xs text-fg-muted">{paid ? "Receipt sent to Maya Chen." : "Fires the burst and records the payment."}</p>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "With a handler",
    description: "It is a plain button, so onClick runs first and the burst follows; count sets the pieces per click.",
    code: `function MarkPaid() {
  const [paid, setPaid] = React.useState(false)
  return (
    <div className="flex flex-col items-center gap-3">
      <ConfettiButton count={110} onClick={() => setPaid(true)}>
        <CheckIcon className="size-4" /> {paid ? "Paid" : "Mark INV-2041 as paid"}
      </ConfettiButton>
      <p className="text-xs text-fg-muted">{paid ? "Receipt sent to Maya Chen." : "Fires the burst and records the payment."}</p>
    </div>
  )
}`,
    node: <MarkPaid />,
  },
  {
    title: "Custom colours",
    description: "colors is the paper palette; pass resolved colours, since the canvas cannot read CSS variables.",
    code: `<ConfettiButton colors={["#f5b301", "#ff7a59", "#ff4f8b", "#ffffff"]}>
  <RocketIcon className="size-4" /> Ship Lumen 3.0
</ConfettiButton>`,
    node: (
      <ConfettiButton colors={["#f5b301", "#ff7a59", "#ff4f8b", "#ffffff"]}>
        <RocketIcon className="size-4" /> Ship Lumen 3.0
      </ConfettiButton>
    ),
  },
  {
    title: "Outline style",
    description: "className restyles the face; token classes keep it on theme while the burst stays the same.",
    code: `<ConfettiButton count={40} className="border border-border bg-surface text-fg shadow-key">
  Celebrate quietly
</ConfettiButton>`,
    node: (
      <ConfettiButton count={40} className="border border-border bg-surface text-fg shadow-key">
        Celebrate quietly
      </ConfettiButton>
    ),
  },
]
