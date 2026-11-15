"use client"
import { Button } from "@/registry/ui/button"
import { Container } from "@/registry/ui/container"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Reading width",
    description: "size=\"sm\" (672px) keeps release notes at a comfortable line length inside a full-width band.",
    code: `<section className="w-full bg-sunken py-8">
  <Container size="sm">
    <h2 className="text-xl font-medium text-fg">What changed in November</h2>
    <p className="mt-2 text-sm text-fg-muted">Invoices export to CSV with line items, reminders can skip weekends, and the customer page loads twice as fast on large accounts.</p>
  </Container>
</section>`,
    node: (
      <section className="w-full bg-sunken py-8">
        <Container size="sm">
          <h2 className="text-xl font-medium text-fg">What changed in November</h2>
          <p className="mt-2 text-sm text-fg-muted">Invoices export to CSV with line items, reminders can skip weekends, and the customer page loads twice as fast on large accounts.</p>
        </Container>
      </section>
    ),
  },
  {
    title: "Dashboard band",
    description: "The background spans the page while size=\"lg\" (1280px) holds the content; padding steps from 16px to 24px at sm.",
    code: `<section className="w-full border-y border-border bg-surface py-4">
  <Container size="lg" className="flex flex-wrap items-center justify-between gap-3">
    <p className="text-sm text-fg">You have used 18 of 20 invoices on Starter this month.</p>
    <Button size="sm">Upgrade to Pro</Button>
  </Container>
</section>`,
    node: (
      <section className="w-full border-y border-border bg-surface py-4">
        <Container size="lg" className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-fg">You have used 18 of 20 invoices on Starter this month.</p>
          <Button size="sm">Upgrade to Pro</Button>
        </Container>
      </section>
    ),
  },
]
