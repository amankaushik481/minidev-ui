"use client"
import * as React from "react"
import { AnnouncementBar } from "@/registry/ui/announcement-bar"
import { Button } from "@/registry/ui/button"
import type { Example } from "./types"

function DismissDemo() {
  const [open, setOpen] = React.useState(true)
  if (!open) {
    return <Button variant="outline" size="sm" onClick={() => setOpen(true)}>Show the bar again</Button>
  }
  return (
    <AnnouncementBar className="w-full" onDismiss={() => setOpen(false)}>
      Maintenance on Saturday 18 October, 02:00 to 03:00 UTC. Exports will pause for the hour.
    </AnnouncementBar>
  )
}

export const examples: Example[] = [
  {
    title: "With a link",
    description: "children is free content, so a release note can end in a link; keep the bar to one line and the link to a few words.",
    code: `<AnnouncementBar className="w-full">
  Lumen 2.4 is out: scheduled payouts and faster exports.{" "}
  <a href="#" className="font-medium text-accent-fg underline decoration-accent-line underline-offset-4 hover:decoration-accent">Read the changelog</a>
</AnnouncementBar>`,
    node: (
      <AnnouncementBar className="w-full">
        Lumen 2.4 is out: scheduled payouts and faster exports.{" "}
        <a href="#" className="font-medium text-accent-fg underline decoration-accent-line underline-offset-4 hover:decoration-accent">Read the changelog</a>
      </AnnouncementBar>
    ),
  },
  {
    title: "Dismissible",
    description: "Pass onDismiss to get the close button; the bar does not hide itself, so drop it from the tree when the handler runs.",
    code: `function DismissDemo() {
  const [open, setOpen] = React.useState(true)
  if (!open) {
    return <Button variant="outline" size="sm" onClick={() => setOpen(true)}>Show the bar again</Button>
  }
  return (
    <AnnouncementBar className="w-full" onDismiss={() => setOpen(false)}>
      Maintenance on Saturday 18 October, 02:00 to 03:00 UTC. Exports will pause for the hour.
    </AnnouncementBar>
  )
}`,
    node: <DismissDemo />,
  },
  {
    title: "Inverted",
    description: "Swap the surface tokens through className for a marketing bar that stands apart from the page header.",
    code: `<AnnouncementBar className="w-full border-0 bg-ink text-on-ink">
  Early access: Lumen for agencies opens on 1 November.{" "}
  <a href="#" className="font-medium underline underline-offset-4">Join the list</a>
</AnnouncementBar>`,
    node: (
      <AnnouncementBar className="w-full border-0 bg-ink text-on-ink">
        Early access: Lumen for agencies opens on 1 November.{" "}
        <a href="#" className="font-medium underline underline-offset-4">Join the list</a>
      </AnnouncementBar>
    ),
  },
]
