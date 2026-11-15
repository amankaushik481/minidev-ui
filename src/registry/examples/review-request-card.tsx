"use client"
import * as React from "react"
import { ReviewRequestCard } from "@/registry/ui/review-request-card"
import type { Example } from "./types"

function ReviewWithActions() {
  const [last, setLast] = React.useState("Nothing opened yet")
  return (
    <div className="w-full max-w-sm space-y-2">
      <ReviewRequestCard
        title="Move invoice PDFs to edge storage"
        repo="lumen/web"
        author="Priya Raman"
        onReview={() => setLast("Opened review for #482")}
        onViewDiff={() => setLast("Opened diff for #482")}
      />
      <p aria-live="polite" className="text-xs text-fg-muted">{last}</p>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Review inbox",
    description: "Pass title, repo and author for every card; each has sample defaults.",
    code: `<div className="grid w-full max-w-2xl gap-3 sm:grid-cols-2">
  <ReviewRequestCard title="Add CSV export to invoices" repo="lumen/web" author="Maya Chen" />
  <ReviewRequestCard title="Retry webhook deliveries with backoff" repo="lumen/api" author="Theo Okafor" />
</div>`,
    node: (
      <div className="grid w-full max-w-2xl gap-3 sm:grid-cols-2">
        <ReviewRequestCard title="Add CSV export to invoices" repo="lumen/web" author="Maya Chen" />
        <ReviewRequestCard title="Retry webhook deliveries with backoff" repo="lumen/api" author="Theo Okafor" />
      </div>
    ),
  },
  {
    title: "Wired to actions",
    description: "onReview and onViewDiff are plain callbacks; call your router or open a panel from them.",
    code: `function ReviewWithActions() {
  const [last, setLast] = React.useState("Nothing opened yet")
  return (
    <div className="w-full max-w-sm space-y-2">
      <ReviewRequestCard
        title="Move invoice PDFs to edge storage"
        repo="lumen/web"
        author="Priya Raman"
        onReview={() => setLast("Opened review for #482")}
        onViewDiff={() => setLast("Opened diff for #482")}
      />
      <p aria-live="polite" className="text-xs text-fg-muted">{last}</p>
    </div>
  )
}`,
    node: <ReviewWithActions />,
  },
]
