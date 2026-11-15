"use client"
import { NewsletterSignup } from "@/registry/ui/newsletter-signup"
import type { Example } from "./types"

// Stands in for your request, e.g. fetch("/api/subscribe", { method: "POST", body: JSON.stringify({ email }) }).
async function subscribe(email: string) {
  await new Promise((resolve) => setTimeout(resolve, 900, email))
}

export const examples: Example[] = [
  {
    title: "Async submit",
    description: "Return a promise from onSubmit: the button reads \"Subscribing…\" until it settles, then the status line confirms.",
    code: `async function subscribe(email: string) {
  // Replace with your request, e.g. fetch("/api/subscribe", { method: "POST", body: JSON.stringify({ email }) }).
  await new Promise((resolve) => setTimeout(resolve, 900, email))
}

<NewsletterSignup onSubmit={subscribe} />`,
    node: <NewsletterSignup onSubmit={subscribe} />,
  },
  {
    title: "Failed request",
    description: "A rejected promise shows the error line and keeps the email in the field, so the reader can retry.",
    code: `<NewsletterSignup
  onSubmit={async () => {
    throw new Error("Mailing service unavailable")
  }}
/>`,
    node: (
      <NewsletterSignup
        onSubmit={async () => {
          throw new Error("Mailing service unavailable")
        }}
      />
    ),
  },
  {
    title: "Footer digest",
    description: "Change the label, placeholder and success text to match what the reader is signing up for.",
    code: `<NewsletterSignup
  buttonLabel="Get the digest"
  placeholder="name@studio.com"
  successMessage="Done. The next digest goes out on Monday."
  onSubmit={subscribe}
/>`,
    node: (
      <NewsletterSignup
        buttonLabel="Get the digest"
        placeholder="name@studio.com"
        successMessage="Done. The next digest goes out on Monday."
        onSubmit={subscribe}
      />
    ),
  },
]
