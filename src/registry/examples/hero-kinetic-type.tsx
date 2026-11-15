"use client"
import { HeroKineticType } from "@/registry/premium/hero-kinetic-type"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Three-line launch",
    description: "One string per line; the last line takes the accent gradient, so end on the word you want remembered.",
    code: `<HeroKineticType
  className="w-full"
  lines={["Close the books", "every single", "day."]}
  description="Lumen matches card payouts, bank lines and invoices as they land, so month-end is a review, not a project."
/>`,
    node: (
      <HeroKineticType
        className="w-full"
        lines={["Close the books", "every single", "day."]}
        description="Lumen matches card payouts, bank lines and invoices as they land, so month-end is a review, not a project."
      />
    ),
  },
  {
    title: "Two-line feature announcement",
    description: "Two short lines suit a feature page: the break is fixed, so it reads the same on a phone and a wide screen.",
    code: `<HeroKineticType
  className="w-full"
  lines={["Invoices that", "chase themselves."]}
  description="Reminders go out three days before the due date and a week after it. You set the tone once."
/>`,
    node: (
      <HeroKineticType
        className="w-full"
        lines={["Invoices that", "chase themselves."]}
        description="Reminders go out three days before the due date and a week after it. You set the tone once."
      />
    ),
  },
]
