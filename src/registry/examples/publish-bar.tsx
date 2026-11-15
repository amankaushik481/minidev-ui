"use client"
import * as React from "react"
import { PublishBar, type PublishStatus } from "@/registry/ui/publish-bar"
import type { Example } from "./types"

function PostPublishing() {
  const [status, setStatus] = React.useState<PublishStatus>("draft")
  const [isPending, startTransition] = React.useTransition()
  const publish = () =>
    startTransition(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1200))
      startTransition(() => setStatus("published"))
    })
  return (
    <PublishBar
      className="w-full max-w-xl"
      status={status}
      note={status === "published" ? "Live at lumen.app/blog/q4-pricing" : "Changes save automatically"}
      publishing={isPending}
      onPublish={publish}
      onPreview={() => {}}
    />
  )
}

export const examples: Example[] = [
  {
    title: "Publishing with a transition",
    description: "useTransition drives publishing, which disables the button and shows Publishing… until it finishes.",
    code: `function PostPublishing() {
  const [status, setStatus] = React.useState<PublishStatus>("draft")
  const [isPending, startTransition] = React.useTransition()
  const publish = () =>
    startTransition(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1200))
      startTransition(() => setStatus("published"))
    })
  return (
    <PublishBar
      className="w-full max-w-xl"
      status={status}
      note={status === "published" ? "Live at lumen.app/blog/q4-pricing" : "Changes save automatically"}
      publishing={isPending}
      onPublish={publish}
      onPreview={() => {}}
    />
  )
}`,
    node: <PostPublishing />,
  },
  {
    title: "Scheduled",
    description: "Put the go-live time in note; the badge only says Scheduled.",
    code: `<PublishBar status="scheduled" note="Goes live Nov 20 at 09:00" className="w-full max-w-xl" />`,
    node: (
      <PublishBar status="scheduled" note="Goes live Nov 20 at 09:00" className="w-full max-w-xl" />
    ),
  },
]
