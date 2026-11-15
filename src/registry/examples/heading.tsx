"use client"
import { Heading } from "@/registry/ui/heading"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "A settings page outline",
    description: "Pick each level by the outline; the size follows the level.",
    code: `<div className="space-y-3">
  <Heading as="h1">Billing</Heading>
  <Heading as="h2">Payment methods</Heading>
  <Heading as="h3">Default card</Heading>
  <Heading as="h4">Billing address</Heading>
</div>`,
    node: (
      <div className="space-y-3">
        <Heading as="h1">Billing</Heading>
        <Heading as="h2">Payment methods</Heading>
        <Heading as="h3">Default card</Heading>
        <Heading as="h4">Billing address</Heading>
      </div>
    ),
  },
  {
    title: "An h2 at display size",
    description: "A marketing section is an h2 in the outline but needs a bigger size, so change it with className.",
    code: `<section className="max-w-md">
  <Heading as="h2" className="text-3xl">Plans for every team</Heading>
  <p className="mt-2 text-sm text-fg-muted">Start free with 20 invoices a month. Move to Pro when you need reminders and more seats.</p>
</section>`,
    node: (
      <section className="max-w-md">
        <Heading as="h2" className="text-3xl">Plans for every team</Heading>
        <p className="mt-2 text-sm text-fg-muted">Start free with 20 invoices a month. Move to Pro when you need reminders and more seats.</p>
      </section>
    ),
  },
]
