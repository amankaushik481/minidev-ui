"use client"
import * as React from "react"
import { RetryBlock } from "@/registry/ui/retry-block"
import type { Example } from "./types"

function RetryDemo() {
  const [retrying, setRetrying] = React.useState(false)
  const [attempts, setAttempts] = React.useState(1)
  const retry = () => {
    setRetrying(true)
    window.setTimeout(() => {
      setRetrying(false)
      setAttempts((a) => a + 1)
    }, 1200)
  }
  return (
    <RetryBlock
      className="w-full max-w-md"
      title="Could not load transactions"
      description={"The bank feed timed out. Attempt " + attempts + " of 3."}
      onRetry={retry}
      retrying={retrying}
    />
  )
}

export const examples: Example[] = [
  {
    title: "Retry with a pending state",
    description: "retrying disables the button, spins its icon and changes the label while the request runs.",
    code: `function RetryDemo() {
  const [retrying, setRetrying] = React.useState(false)
  const [attempts, setAttempts] = React.useState(1)
  const retry = () => {
    setRetrying(true)
    window.setTimeout(() => {
      setRetrying(false)
      setAttempts((a) => a + 1)
    }, 1200)
  }
  return (
    <RetryBlock
      className="w-full max-w-md"
      title="Could not load transactions"
      description={"The bank feed timed out. Attempt " + attempts + " of 3."}
      onRetry={retry}
      retrying={retrying}
    />
  )
}`,
    node: <RetryDemo />,
  },
  {
    title: "Failed AI request",
    description: "description takes nodes, so it can say what was kept.",
    code: `<RetryBlock
  className="w-full max-w-md"
  title="The summary could not be generated"
  description={<>The model did not respond in time. Your notes for <strong>Q3 board pack</strong> are saved.</>}
  onRetry={() => {}}
/>`,
    node: (
      <RetryBlock
        className="w-full max-w-md"
        title="The summary could not be generated"
        description={<>The model did not respond in time. Your notes for <strong>Q3 board pack</strong> are saved.</>}
        onRetry={() => {}}
      />
    ),
  },
]
