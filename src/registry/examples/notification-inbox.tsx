"use client"
import * as React from "react"
import { NotificationInbox } from "@/registry/ui/notification-inbox"
import type { Example } from "./types"

function OpenDemo() {
  const [opened, setOpened] = React.useState<string | null>(null)
  return (
    <div className="flex items-center gap-3">
      <NotificationInbox
        viewAllHref="/activity"
        notes={[
          { id: "a1", kind: "review", who: "Priya Raman", text: "asked you to review the October close", time: "4m", unread: true },
          { id: "a2", kind: "mention", who: "Sam Lowe", text: "mentioned you on INV-2041: \"can you resend this?\"", time: "1h", unread: true },
          { id: "a3", kind: "invite", who: "Halcyon Studio", text: "invited you to the Payroll workspace", time: "Tue" },
        ]}
        onOpenNote={(n) => setOpened(n.who + " " + n.text)}
      />
      <p className="max-w-56 text-xs text-fg-muted" aria-live="polite">{opened ? "Opened: " + opened : "Open the bell and pick a notification."}</p>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Your notifications",
    description: "notes seeds the list once; onOpenNote fires when a row is opened, which also marks it read.",
    code: `function OpenDemo() {
  const [opened, setOpened] = React.useState<string | null>(null)
  return (
    <div className="flex items-center gap-3">
      <NotificationInbox
        viewAllHref="/activity"
        notes={[
          { id: "a1", kind: "review", who: "Priya Raman", text: "asked you to review the October close", time: "4m", unread: true },
          { id: "a2", kind: "mention", who: "Sam Lowe", text: "mentioned you on INV-2041: \\"can you resend this?\\"", time: "1h", unread: true },
          { id: "a3", kind: "invite", who: "Halcyon Studio", text: "invited you to the Payroll workspace", time: "Tue" },
        ]}
        onOpenNote={(n) => setOpened(n.who + " " + n.text)}
      />
      <p className="max-w-56 text-xs text-fg-muted" aria-live="polite">{opened ? "Opened: " + opened : "Open the bell and pick a notification."}</p>
    </div>
  )
}`,
    node: <OpenDemo />,
  },
  {
    title: "Empty inbox, no footer",
    description: "With no notes the bell has no count and the list shows its caught-up message; viewAllHref=\"\" removes the footer link.",
    code: `<NotificationInbox notes={[]} viewAllHref="" />`,
    node: <NotificationInbox notes={[]} viewAllHref="" />,
  },
]
