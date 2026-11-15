"use client"
import { Link } from "@/registry/ui/link"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Inside running text",
    description: "In a paragraph, add underline and match the text size so the link doesn't rely on colour alone.",
    code: `<p className="max-w-md text-sm leading-[1.6] text-fg-muted">
  Invoices are emailed on the 1st. To change the day, open{" "}
  <Link href="#billing" className="underline">billing settings</Link>.
</p>`,
    node: (
      <p className="max-w-md text-sm leading-[1.6] text-fg-muted">
        Invoices are emailed on the 1st. To change the day, open{" "}
        <Link href="#billing" className="underline">billing settings</Link>.
      </p>
    ),
  },
  {
    title: "External link in help text",
    description: "With target=\"_blank\", Link adds rel=\"noopener noreferrer\" for you. Say in the text that it opens a new tab.",
    code: `<p className="max-w-md text-xs text-fg-muted">
  Need the raw data?{" "}
  <Link href="https://example.com/api" target="_blank" className="text-xs">
    API docs (opens in a new tab)
  </Link>
</p>`,
    node: (
      <p className="max-w-md text-xs text-fg-muted">
        Need the raw data?{" "}
        <Link href="https://example.com/api" target="_blank" className="text-xs">
          API docs (opens in a new tab)
        </Link>
      </p>
    ),
  },
  {
    title: "Under a form",
    description: "A standalone link below a form, where its position already marks it as a link.",
    code: `<div className="flex w-full max-w-xs flex-col items-center gap-3 rounded-xl border border-border bg-surface p-5">
  <p className="text-sm text-fg">Check your inbox for a sign-in link.</p>
  <Link href="#resend">No email? Send it again</Link>
</div>`,
    node: (
      <div className="flex w-full max-w-xs flex-col items-center gap-3 rounded-xl border border-border bg-surface p-5">
        <p className="text-sm text-fg">Check your inbox for a sign-in link.</p>
        <Link href="#resend">No email? Send it again</Link>
      </div>
    ),
  },
]
