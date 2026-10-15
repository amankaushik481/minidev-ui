"use client"
import * as React from "react"
import { Pagination } from "@/registry/ui/pagination"
import type { Example } from "./types"

function ControlledDemo() {
  const [page, setPage] = React.useState(2)
  return (
    <div className="flex flex-col items-center gap-3">
      <Pagination page={page} pageCount={5} onPageChange={setPage} />
      <p className="text-xs text-fg-muted">Page {page} of 5</p>
    </div>
  )
}

function SummaryDemo() {
  const total = 48
  const pageSize = 10
  const [page, setPage] = React.useState(1)
  const from = (page - 1) * pageSize + 1
  const to = Math.min(page * pageSize, total)
  return (
    <div className="flex w-full max-w-lg flex-wrap items-center justify-between gap-3">
      <p className="text-sm text-fg-muted">
        Showing <span className="font-medium text-fg tabular-nums">{from}</span> to <span className="font-medium text-fg tabular-nums">{to}</span> of {total} invoices
      </p>
      <Pagination page={page} pageCount={Math.ceil(total / pageSize)} onPageChange={setPage} />
    </div>
  )
}

function FewPagesDemo() {
  const [page, setPage] = React.useState(3)
  return <Pagination page={page} pageCount={3} onPageChange={setPage} />
}

export const examples: Example[] = [
  {
    title: "Controlled page",
    description: "Keep the page in state; onPageChange receives the next page number from Prev, Next or a numbered button.",
    code: `function ControlledDemo() {
  const [page, setPage] = React.useState(2)
  return (
    <div className="flex flex-col items-center gap-3">
      <Pagination page={page} pageCount={5} onPageChange={setPage} />
      <p className="text-xs text-fg-muted">Page {page} of 5</p>
    </div>
  )
}`,
    node: <ControlledDemo />,
  },
  {
    title: "Result summary",
    description: "Derive the page count from the total and page size, and show the visible range next to the controls.",
    code: `function SummaryDemo() {
  const total = 48
  const pageSize = 10
  const [page, setPage] = React.useState(1)
  const from = (page - 1) * pageSize + 1
  const to = Math.min(page * pageSize, total)
  return (
    <div className="flex w-full max-w-lg flex-wrap items-center justify-between gap-3">
      <p className="text-sm text-fg-muted">
        Showing <span className="font-medium text-fg tabular-nums">{from}</span> to <span className="font-medium text-fg tabular-nums">{to}</span> of {total} invoices
      </p>
      <Pagination page={page} pageCount={Math.ceil(total / pageSize)} onPageChange={setPage} />
    </div>
  )
}`,
    node: <SummaryDemo />,
  },
  {
    title: "Few pages",
    description: "Only as many numbered buttons as there are pages are shown, and Next is disabled on the last one.",
    code: `function FewPagesDemo() {
  const [page, setPage] = React.useState(3)
  return <Pagination page={page} pageCount={3} onPageChange={setPage} />
}`,
    node: <FewPagesDemo />,
  },
]
