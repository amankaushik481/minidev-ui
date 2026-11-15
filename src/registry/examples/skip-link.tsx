"use client"
import { SkipLink } from "@/registry/ui/skip-link"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Before the site header",
    description: "Click into the frame and press Tab: the link appears at the top left, and Enter moves focus past the header. In your layout the target is the main element with tabIndex -1.",
    code: `<div className="w-full max-w-xl overflow-hidden rounded-xl border border-border bg-bg [transform:translateZ(0)]">
  <SkipLink href="#example-main" />
  <header className="flex items-center gap-4 border-b border-border px-4 py-3 text-sm">
    <span className="font-semibold text-fg">Lumen</span>
    <a href="#pricing" className="text-fg-muted">Pricing</a>
    <a href="#docs" className="text-fg-muted">Docs</a>
    <a href="#signin" className="text-fg-muted">Sign in</a>
  </header>
  <div id="example-main" tabIndex={-1} className="p-4 text-sm text-fg-muted outline-none">
    Invoices, reminders and payouts in one place.
  </div>
</div>`,
    node: (
      <div className="w-full max-w-xl overflow-hidden rounded-xl border border-border bg-bg [transform:translateZ(0)]">
        <SkipLink href="#example-main" />
        <header className="flex items-center gap-4 border-b border-border px-4 py-3 text-sm">
          <span className="font-semibold text-fg">Lumen</span>
          <a href="#pricing" className="text-fg-muted">Pricing</a>
          <a href="#docs" className="text-fg-muted">Docs</a>
          <a href="#signin" className="text-fg-muted">Sign in</a>
        </header>
        <div id="example-main" tabIndex={-1} className="p-4 text-sm text-fg-muted outline-none">
          Invoices, reminders and payouts in one place.
        </div>
      </div>
    ),
  },
  {
    title: "Skip to search",
    description: "Change the text and target to skip somewhere else, such as a search field on a results page.",
    code: `<div className="w-full max-w-xl overflow-hidden rounded-xl border border-border bg-bg p-4 [transform:translateZ(0)]">
  <SkipLink href="#example-search">Skip to search</SkipLink>
  <label htmlFor="example-search" className="text-xs text-fg-muted">Search invoices</label>
  <input id="example-search" className="mt-1 h-9 w-full rounded-lg border border-border bg-surface px-3 text-sm text-fg" />
</div>`,
    node: (
      <div className="w-full max-w-xl overflow-hidden rounded-xl border border-border bg-bg p-4 [transform:translateZ(0)]">
        <SkipLink href="#example-search">Skip to search</SkipLink>
        <label htmlFor="example-search" className="text-xs text-fg-muted">Search invoices</label>
        <input id="example-search" className="mt-1 h-9 w-full rounded-lg border border-border bg-surface px-3 text-sm text-fg" />
      </div>
    ),
  },
]
