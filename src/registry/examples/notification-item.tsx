"use client"
import * as React from "react"
import { NotificationItem } from "@/registry/ui/notification-item"
import type { Example } from "./types"

// Floored to the minute so the server and client render the same label.
const minutesAgo = (m: number) => new Date(Math.floor(Date.now() / 60000) * 60000 - m * 60000)

const NOTES = [
  { id: "n1", title: "Invoice INV-2041 paid", body: "Northwind paid $12,400.00 by bank transfer.", minutes: 6 },
  { id: "n2", title: "Halcyon Labs opened INV-2042", body: "Viewed twice since it was sent on Monday.", minutes: 95 },
  { id: "n3", title: "Payout of $8,920.00 sent", body: "Arrives in the account ending 0142 by Friday.", minutes: 1500 },
]

function MarkReadList() {
  const [unread, setUnread] = React.useState(() => new Set(["n1", "n2"]))
  const dates = React.useMemo(() => NOTES.map((n) => minutesAgo(n.minutes)), [])
  return (
    <ul className="w-full max-w-md overflow-hidden rounded-xl border border-border bg-surface [&>li:last-child_[data-slot=notification-item]]:border-b-0">
      {NOTES.map((n, i) => (
        <li key={n.id}>
          <button
            type="button"
            className="block w-full text-left outline-none hover:bg-sunken focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset"
            onClick={() => setUnread((s) => new Set([...s].filter((id) => id !== n.id)))}
          >
            <NotificationItem title={n.title} body={n.body} date={dates[i]} unread={unread.has(n.id)} />
          </button>
        </li>
      ))}
    </ul>
  )
}

export const examples: Example[] = [
  {
    title: "Click a row to mark it read",
    description: "NotificationItem is a plain row, so wrap it in a button or link and update unread in the handler.",
    code: `// Floored to the minute so the server and client render the same label.
const minutesAgo = (m: number) => new Date(Math.floor(Date.now() / 60000) * 60000 - m * 60000)

const NOTES = [
  { id: "n1", title: "Invoice INV-2041 paid", body: "Northwind paid $12,400.00 by bank transfer.", minutes: 6 },
  { id: "n2", title: "Halcyon Labs opened INV-2042", body: "Viewed twice since it was sent on Monday.", minutes: 95 },
  { id: "n3", title: "Payout of $8,920.00 sent", body: "Arrives in the account ending 0142 by Friday.", minutes: 1500 },
]

function MarkReadList() {
  const [unread, setUnread] = React.useState(() => new Set(["n1", "n2"]))
  const dates = React.useMemo(() => NOTES.map((n) => minutesAgo(n.minutes)), [])
  return (
    <ul className="w-full max-w-md overflow-hidden rounded-xl border border-border bg-surface [&>li:last-child_[data-slot=notification-item]]:border-b-0">
      {NOTES.map((n, i) => (
        <li key={n.id}>
          <button
            type="button"
            className="block w-full text-left outline-none hover:bg-sunken focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset"
            onClick={() => setUnread((s) => new Set([...s].filter((id) => id !== n.id)))}
          >
            <NotificationItem title={n.title} body={n.body} date={dates[i]} unread={unread.has(n.id)} />
          </button>
        </li>
      ))}
    </ul>
  )
}`,
    node: <MarkReadList />,
  },
  {
    title: "From an ISO timestamp",
    description: "date takes the string your API returns; hover the time for the full local date.",
    code: `<div className="w-full max-w-md overflow-hidden rounded-xl border border-border bg-surface">
  <NotificationItem
    title="Trial ending for Halcyon Labs"
    body="3 days left on 12 seats. Owner: Priya Raman."
    date="2026-11-12T09:30:00Z"
    className="border-b-0"
  />
</div>`,
    node: (
      <div className="w-full max-w-md overflow-hidden rounded-xl border border-border bg-surface">
        <NotificationItem
          title="Trial ending for Halcyon Labs"
          body="3 days left on 12 seats. Owner: Priya Raman."
          date="2026-11-12T09:30:00Z"
          className="border-b-0"
        />
      </div>
    ),
  },
]
