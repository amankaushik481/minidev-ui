"use client"
import * as React from "react"
import { Button } from "@/registry/ui/button"
import { Progress, ProgressLabel, ProgressValue } from "@/registry/ui/progress"
import type { Example } from "./types"

function UploadDemo() {
  const [value, setValue] = React.useState<number | null>(null)
  const start = () => {
    setValue(0)
    const id = window.setInterval(() => {
      setValue((v) => {
        const next = Math.min(100, (v ?? 0) + 4 + Math.round(Math.random() * 10))
        if (next >= 100) window.clearInterval(id)
        return next
      })
    }, 160)
  }
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <Progress value={value ?? 0}>
        <ProgressLabel>invoices-q3.csv</ProgressLabel>
        <ProgressValue>{(formatted) => (value === null ? "Ready" : value === 100 ? "Done" : formatted)}</ProgressValue>
      </Progress>
      <Button variant="outline" size="sm" className="self-start" onClick={start} disabled={value !== null && value < 100}>
        {value === 100 ? "Upload again" : "Upload"}
      </Button>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Basic",
    description: "A 4px track that fills with the accent; give it a width and an accessible name.",
    code: `<Progress value={64} aria-label="Storage used" className="w-full max-w-sm" />`,
    node: <Progress value={64} aria-label="Storage used" className="w-full max-w-sm" />,
  },
  {
    title: "Label and value",
    description: "ProgressLabel and ProgressValue render above the track; the value is formatted as a percentage for you.",
    code: `<Progress value={38} className="w-full max-w-sm">
  <ProgressLabel>Importing customers</ProgressLabel>
  <ProgressValue />
</Progress>`,
    node: (
      <Progress value={38} className="w-full max-w-sm">
        <ProgressLabel>Importing customers</ProgressLabel>
        <ProgressValue />
      </Progress>
    ),
  },
  {
    title: "Simulated upload",
    description: "Drive the value from state; ProgressValue takes a function so you can swap in your own text.",
    code: `function UploadDemo() {
  const [value, setValue] = React.useState<number | null>(null)
  const start = () => {
    setValue(0)
    const id = window.setInterval(() => {
      setValue((v) => {
        const next = Math.min(100, (v ?? 0) + 4 + Math.round(Math.random() * 10))
        if (next >= 100) window.clearInterval(id)
        return next
      })
    }, 160)
  }
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <Progress value={value ?? 0}>
        <ProgressLabel>invoices-q3.csv</ProgressLabel>
        <ProgressValue>{(formatted) => (value === null ? "Ready" : value === 100 ? "Done" : formatted)}</ProgressValue>
      </Progress>
      <Button variant="outline" size="sm" className="self-start" onClick={start} disabled={value !== null && value < 100}>
        {value === 100 ? "Upload again" : "Upload"}
      </Button>
    </div>
  )
}`,
    node: <UploadDemo />,
  },
  {
    title: "Counts with max",
    description: "Set max to map a count onto the track and read the raw value back in ProgressValue.",
    code: `<div className="flex w-full max-w-sm flex-col gap-5">
  <Progress value={12} max={12}>
    <ProgressLabel>Connect bank</ProgressLabel>
    <ProgressValue>{(_, value) => \`\${value} of 12\`}</ProgressValue>
  </Progress>
  <Progress value={7} max={12}>
    <ProgressLabel>Match transactions</ProgressLabel>
    <ProgressValue>{(_, value) => \`\${value} of 12\`}</ProgressValue>
  </Progress>
  <Progress value={0} max={12}>
    <ProgressLabel>Send statements</ProgressLabel>
    <ProgressValue>{(_, value) => \`\${value} of 12\`}</ProgressValue>
  </Progress>
</div>`,
    node: (
      <div className="flex w-full max-w-sm flex-col gap-5">
        <Progress value={12} max={12}>
          <ProgressLabel>Connect bank</ProgressLabel>
          <ProgressValue>{(_, value) => `${value} of 12`}</ProgressValue>
        </Progress>
        <Progress value={7} max={12}>
          <ProgressLabel>Match transactions</ProgressLabel>
          <ProgressValue>{(_, value) => `${value} of 12`}</ProgressValue>
        </Progress>
        <Progress value={0} max={12}>
          <ProgressLabel>Send statements</ProgressLabel>
          <ProgressValue>{(_, value) => `${value} of 12`}</ProgressValue>
        </Progress>
      </div>
    ),
  },
]
