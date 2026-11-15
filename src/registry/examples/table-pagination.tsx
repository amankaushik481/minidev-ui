"use client"
import * as React from "react"
import { TablePagination } from "@/registry/ui/table-pagination"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/registry/ui/table"
import type { Example } from "./types"

const payments = Array.from({ length: 23 }, (_, i) => ({
  id: "PAY-" + (3100 - i),
  amount: ((i * 137) % 900) + 120,
}))
const PAGE_SIZE = 5

function PagedPayments() {
  const [page, setPage] = React.useState(1)
  const rows = payments.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  return (
    <div className="w-full max-w-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Payment</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((p) => (
            <TableRow key={p.id}>
              <TableCell className="font-mono text-xs">{p.id}</TableCell>
              <TableCell className="text-right">${p.amount}.00</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination page={page} pageCount={Math.ceil(payments.length / PAGE_SIZE)} onPageChange={setPage} />
    </div>
  )
}

const TOTAL_EVENTS = 412
const PER_PAGE = 50

function EventPages() {
  const [page, setPage] = React.useState(1)
  return (
    <div className="w-full max-w-sm rounded-xl border border-border bg-surface p-3">
      <p className="text-sm text-fg tabular-nums">
        Events {(page - 1) * PER_PAGE + 1} to {Math.min(page * PER_PAGE, TOTAL_EVENTS)} of {TOTAL_EVENTS}
      </p>
      <TablePagination page={page} pageCount={Math.ceil(TOTAL_EVENTS / PER_PAGE)} onPageChange={setPage} />
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Paging rows on the client",
    description: "Slice the rows for the current page; five payments per page.",
    code: `const payments = Array.from({ length: 23 }, (_, i) => ({
  id: "PAY-" + (3100 - i),
  amount: ((i * 137) % 900) + 120,
}))
const PAGE_SIZE = 5

function PagedPayments() {
  const [page, setPage] = React.useState(1)
  const rows = payments.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  return (
    <div className="w-full max-w-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Payment</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((p) => (
            <TableRow key={p.id}>
              <TableCell className="font-mono text-xs">{p.id}</TableCell>
              <TableCell className="text-right">\${p.amount}.00</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination page={page} pageCount={Math.ceil(payments.length / PAGE_SIZE)} onPageChange={setPage} />
    </div>
  )
}`,
    node: <PagedPayments />,
  },
  {
    title: "Server-side pages",
    description: "When the server pages the data, pass its page count and fetch in onPageChange.",
    code: `const TOTAL_EVENTS = 412
const PER_PAGE = 50

function EventPages() {
  const [page, setPage] = React.useState(1)
  return (
    <div className="w-full max-w-sm rounded-xl border border-border bg-surface p-3">
      <p className="text-sm text-fg tabular-nums">
        Events {(page - 1) * PER_PAGE + 1} to {Math.min(page * PER_PAGE, TOTAL_EVENTS)} of {TOTAL_EVENTS}
      </p>
      <TablePagination page={page} pageCount={Math.ceil(TOTAL_EVENTS / PER_PAGE)} onPageChange={setPage} />
    </div>
  )
}`,
    node: <EventPages />,
  },
]
