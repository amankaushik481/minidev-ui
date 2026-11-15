"use client"
import { SourceCard } from "@/registry/ui/source-card"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Retrieved sources",
    description: "One card per source under the answer. href makes the title a link that opens in a new tab.",
    code: `<div className="grid w-full max-w-2xl gap-3 sm:grid-cols-2">
  <SourceCard
    title="Refund policy"
    url="docs.acme.example/billing/refunds"
    href="https://docs.acme.example/billing/refunds"
    snippet="Refunds return to the original payment method within 5 to 10 business days."
    badge="1"
  />
  <SourceCard
    title="Refunds API"
    url="docs.acme.example/api/refunds"
    href="https://docs.acme.example/api/refunds"
    snippet="A refund can be partial. The total refunded cannot exceed the captured amount."
    badge="2"
  />
</div>`,
    node: (
      <div className="grid w-full max-w-2xl gap-3 sm:grid-cols-2">
        <SourceCard
          title="Refund policy"
          url="docs.acme.example/billing/refunds"
          href="https://docs.acme.example/billing/refunds"
          snippet="Refunds return to the original payment method within 5 to 10 business days."
          badge="1"
        />
        <SourceCard
          title="Refunds API"
          url="docs.acme.example/api/refunds"
          href="https://docs.acme.example/api/refunds"
          snippet="A refund can be partial. The total refunded cannot exceed the captured amount."
          badge="2"
        />
      </div>
    ),
  },
  {
    title: "Internal document",
    description: "For files with no public URL, show the path and leave out href; badge={null} hides the badge.",
    code: `<SourceCard
  className="w-full max-w-md"
  title="Security review, October"
  url="drive://Engineering/Security/2026-10-review.pdf"
  snippet="Session tokens now expire after 12 hours of inactivity, down from 7 days."
  badge={null}
/>`,
    node: (
      <SourceCard
        className="w-full max-w-md"
        title="Security review, October"
        url="drive://Engineering/Security/2026-10-review.pdf"
        snippet="Session tokens now expire after 12 hours of inactivity, down from 7 days."
        badge={null}
      />
    ),
  },
]
