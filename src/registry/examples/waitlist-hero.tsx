"use client"
import { WaitlistHero } from "@/registry/premium/waitlist-hero"
import type { Example } from "./types"

// Stands in for your request, e.g. fetch("/api/waitlist", { method: "POST", body: JSON.stringify({ email }) }).
async function joinWaitlist(email: string) {
  await new Promise((resolve) => setTimeout(resolve, 900, email))
}

export const examples: Example[] = [
  {
    title: "Gated beta",
    description: "Return a promise: the button reads \"Sending…\" until it settles, then the confirmation replaces the form. proof={null} hides the sample avatar row.",
    code: `<WaitlistHero
  className="w-full"
  eyebrow="Private beta"
  title="Lumen for agencies"
  description="Client billing, retainers and time tracking in one ledger. We are letting in ten agencies a week."
  submitLabel="Request an invite"
  successMessage="You are on the list. Invites go out every Tuesday."
  proof={null}
  onSubmit={joinWaitlist}
/>`,
    node: (
      <WaitlistHero
        className="w-full"
        eyebrow="Private beta"
        title="Lumen for agencies"
        description="Client billing, retainers and time tracking in one ledger. We are letting in ten agencies a week."
        submitLabel="Request an invite"
        successMessage="You are on the list. Invites go out every Tuesday."
        proof={null}
        onSubmit={joinWaitlist}
      />
    ),
  },
  {
    title: "Server error message",
    description: "Throw an Error and its message shows under the field while the email stays, so the visitor can fix it and resend.",
    code: `<WaitlistHero
  className="w-full"
  title="Lumen 3.0 is almost here"
  proof={null}
  onSubmit={async () => {
    throw new Error("That address is already on the list.")
  }}
/>`,
    node: (
      <WaitlistHero
        className="w-full"
        title="Lumen 3.0 is almost here"
        proof={null}
        onSubmit={async () => {
          throw new Error("That address is already on the list.")
        }}
      />
    ),
  },
]
