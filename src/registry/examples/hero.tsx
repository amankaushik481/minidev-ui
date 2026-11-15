"use client"
import { Hero } from "@/registry/ui/hero"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Product launch",
    description: "Eyebrow, headline, one line of copy and two actions; href actions render as links.",
    code: `<Hero
  eyebrow="New in 2.4"
  title="Invoices that chase themselves"
  description="Reminders go out before and after the due date, and stop the moment a payment lands."
  primaryAction={{ label: "Start free", href: "#" }}
  secondaryAction={{ label: "See how it works", href: "#" }}
/>`,
    node: (
      <Hero
        eyebrow="New in 2.4"
        title="Invoices that chase themselves"
        description="Reminders go out before and after the due date, and stop the moment a payment lands."
        primaryAction={{ label: "Start free", href: "#" }}
        secondaryAction={{ label: "See how it works", href: "#" }}
      />
    ),
  },
  {
    title: "Docs home",
    description: "A title and description with no actions makes a plain page header for a docs or help site.",
    code: `<Hero
  className="py-10"
  title="Lumen help center"
  description="Guides for invoicing, payments and reconciliation, written by the people who build them."
/>`,
    node: (
      <Hero
        className="py-10"
        title="Lumen help center"
        description="Guides for invoicing, payments and reconciliation, written by the people who build them."
      />
    ),
  },
]
