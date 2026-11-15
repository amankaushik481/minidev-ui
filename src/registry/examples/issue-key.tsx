"use client"
import { IssueKey } from "@/registry/ui/issue-key"
import type { Example } from "./types"

const ISSUE_KEY = /\b([A-Z]+-\d+)\b/g

function LinkedComment({ text }: { text: string }) {
  return (
    <p className="max-w-md text-sm text-fg">
      {text.split(ISSUE_KEY).map((part, i) => (i % 2 ? <IssueKey key={i} value={part} href={"#" + part} /> : part))}
    </p>
  )
}

function CommentWithKeys() {
  return <LinkedComment text="Fixed in LUM-409. The follow-up is LUM-418, and OPS-77 has to land first." />
}

export const examples: Example[] = [
  {
    title: "Commits that reference issues",
    description: "Each key links to its issue; the commit message gives the context.",
    code: `<ul className="w-full max-w-md space-y-2 text-sm">
  <li className="flex items-baseline gap-3">
    <IssueKey value="LUM-412" href="#LUM-412" />
    <span className="text-fg">Add VAT reverse charge to EU invoices</span>
  </li>
  <li className="flex items-baseline gap-3">
    <IssueKey value="LUM-409" href="#LUM-409" />
    <span className="text-fg">Run payout reconciliation at 02:00 UTC</span>
  </li>
  <li className="flex items-baseline gap-3">
    <IssueKey value="OPS-77" />
    <span className="text-fg-muted">Rotate the staging database password</span>
  </li>
</ul>`,
    node: (
      <ul className="w-full max-w-md space-y-2 text-sm">
        <li className="flex items-baseline gap-3">
          <IssueKey value="LUM-412" href="#LUM-412" />
          <span className="text-fg">Add VAT reverse charge to EU invoices</span>
        </li>
        <li className="flex items-baseline gap-3">
          <IssueKey value="LUM-409" href="#LUM-409" />
          <span className="text-fg">Run payout reconciliation at 02:00 UTC</span>
        </li>
        <li className="flex items-baseline gap-3">
          <IssueKey value="OPS-77" />
          <span className="text-fg-muted">Rotate the staging database password</span>
        </li>
      </ul>
    ),
  },
  {
    title: "Linking keys inside text",
    description: "Split a comment on a key pattern and render an IssueKey for each match.",
    code: `const ISSUE_KEY = /\\b([A-Z]+-\\d+)\\b/g

function LinkedComment({ text }: { text: string }) {
  return (
    <p className="max-w-md text-sm text-fg">
      {text.split(ISSUE_KEY).map((part, i) => (i % 2 ? <IssueKey key={i} value={part} href={"#" + part} /> : part))}
    </p>
  )
}

function CommentWithKeys() {
  return <LinkedComment text="Fixed in LUM-409. The follow-up is LUM-418, and OPS-77 has to land first." />
}`,
    node: <CommentWithKeys />,
  },
]
