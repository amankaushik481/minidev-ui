"use client"
import { ContactSales } from "@/registry/premium/contact-sales"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Sending to an API",
    description: "onSubmit gets { email, company, message }. Return a promise for the Sending state, and throw if your API call fails.",
    code: `<ContactSales
  title="Talk to the Lumen team"
  description="Volume pricing, SSO and a guided migration for finance teams of 20 or more."
  onSubmit={async (data) => {
    // Replace the timeout with your fetch or Server Action call.
    await new Promise((resolve) => setTimeout(resolve, 800))
    console.info("Lead", data.email, data.company)
  }}
/>`,
    node: (
      <ContactSales
        title="Talk to the Lumen team"
        description="Volume pricing, SSO and a guided migration for finance teams of 20 or more."
        onSubmit={async (data) => {
          // Replace the timeout with your fetch or Server Action call.
          await new Promise((resolve) => setTimeout(resolve, 800))
          console.info("Lead", data.email, data.company)
        }}
      />
    ),
  },
  {
    title: "Error state",
    description: "When onSubmit throws, the status line shows the error and every field keeps what was typed.",
    code: `<ContactSales
  onSubmit={async () => {
    await new Promise((resolve) => setTimeout(resolve, 600))
    throw new Error("Sales inbox unavailable")
  }}
/>`,
    node: (
      <ContactSales
        onSubmit={async () => {
          await new Promise((resolve) => setTimeout(resolve, 600))
          throw new Error("Sales inbox unavailable")
        }}
      />
    ),
  },
]
