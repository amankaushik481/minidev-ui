"use client"
import { FooterNav } from "@/registry/ui/footer-nav"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Docs footer",
    description: "Pass your own brand and links; they wrap onto a second line on narrow screens.",
    code: `<FooterNav
  brand="Halcyon Docs"
  links={[
    { label: "API reference", href: "#api" },
    { label: "Status", href: "#status" },
    { label: "Support", href: "#support" },
    { label: "Privacy", href: "#privacy" },
  ]}
/>`,
    node: (
      <FooterNav
        brand="Halcyon Docs"
        links={[
          { label: "API reference", href: "#api" },
          { label: "Status", href: "#status" },
          { label: "Support", href: "#support" },
          { label: "Privacy", href: "#privacy" },
        ]}
      />
    ),
  },
  {
    title: "Pinned to the bottom of an app page",
    description: "In a flex column with mt-auto, the footer stays at the bottom even when the page is short.",
    code: `<div className="flex h-64 w-full max-w-2xl flex-col rounded-xl border border-border bg-bg px-6">
  <p className="pt-6 text-sm text-fg-muted">No invoices this month.</p>
  <FooterNav className="mt-auto" brand="Lumen" links={[{ label: "Changelog", href: "#changelog" }, { label: "Terms", href: "#terms" }]} />
</div>`,
    node: (
      <div className="flex h-64 w-full max-w-2xl flex-col rounded-xl border border-border bg-bg px-6">
        <p className="pt-6 text-sm text-fg-muted">No invoices this month.</p>
        <FooterNav className="mt-auto" brand="Lumen" links={[{ label: "Changelog", href: "#changelog" }, { label: "Terms", href: "#terms" }]} />
      </div>
    ),
  },
]
