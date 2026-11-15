"use client"
import { CommitRow } from "@/registry/ui/commit-row"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Commit history",
    description: "Stack rows in a bordered container. Pass the commit's real timestamp as date so server and client render the same time.",
    code: `<div className="w-full max-w-lg overflow-hidden rounded-xl border border-border bg-surface [&>*:last-child]:border-b-0">
  <CommitRow sha="9c41e07" message="Send overdue reminders at the customer's local 9am" author="Ines Duarte" date="2026-11-14T08:12:00Z" />
  <CommitRow sha="3fa8b21" message="Round prorated seat charges to the cent, not the dollar" author="Theo Okafor" date="2026-11-13T17:40:00Z" />
  <CommitRow sha="e02d5c9" message="Retry ledger export on 429 with backoff" author="Lena Fischer" date="2026-11-11T10:05:00Z" />
</div>`,
    node: (
      <div className="w-full max-w-lg overflow-hidden rounded-xl border border-border bg-surface [&>*:last-child]:border-b-0">
        <CommitRow sha="9c41e07" message="Send overdue reminders at the customer's local 9am" author="Ines Duarte" date="2026-11-14T08:12:00Z" />
        <CommitRow sha="3fa8b21" message="Round prorated seat charges to the cent, not the dollar" author="Theo Okafor" date="2026-11-13T17:40:00Z" />
        <CommitRow sha="e02d5c9" message="Retry ledger export on 429 with backoff" author="Lena Fischer" date="2026-11-11T10:05:00Z" />
      </div>
    ),
  },
  {
    title: "Long message",
    description: "The subject truncates to one line and the full text stays in the title tooltip.",
    code: `<CommitRow
  className="w-full max-w-sm rounded-xl border bg-surface"
  sha="b7710fa"
  message="Move invoice PDF rendering to a background job so large statements stop timing out"
  author="Priya Raman"
  date="2026-11-12T14:30:00Z"
/>`,
    node: (
      <CommitRow
        className="w-full max-w-sm rounded-xl border bg-surface"
        sha="b7710fa"
        message="Move invoice PDF rendering to a background job so large statements stop timing out"
        author="Priya Raman"
        date="2026-11-12T14:30:00Z"
      />
    ),
  },
]
