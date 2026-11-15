"use client"
import { OnboardingMotion } from "@/registry/premium/onboarding-motion"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Workspace welcome",
    description: "Four short steps after sign-up; the last button runs onFinish, for example a router push into the app.",
    code: `<OnboardingMotion
  steps={[
    { title: "Connect your bank", body: "Transactions from Acme Bank sync every hour. Nothing is moved without your approval." },
    { title: "Add your first customer", body: "Paste an email address. Lumen fills in the company details it can find." },
    { title: "Send an invoice", body: "Numbering, tax and reminders are handled. You can edit every default later." },
    { title: "Invite your accountant", body: "They get a read-only seat at no cost, with the same live numbers you see." },
  ]}
  finishLabel="Open dashboard"
  onFinish={() => console.log("finished")}
/>`,
    node: (
      <OnboardingMotion
        steps={[
          { title: "Connect your bank", body: "Transactions from Acme Bank sync every hour. Nothing is moved without your approval." },
          { title: "Add your first customer", body: "Paste an email address. Lumen fills in the company details it can find." },
          { title: "Send an invoice", body: "Numbering, tax and reminders are handled. You can edit every default later." },
          { title: "Invite your accountant", body: "They get a read-only seat at no cost, with the same live numbers you see." },
        ]}
        finishLabel="Open dashboard"
        onFinish={() => console.log("finished")}
      />
    ),
  },
  {
    title: "What is new",
    description: "Three steps walk existing users through a release; the progress segments let them jump straight to one.",
    code: `<OnboardingMotion
  steps={[
    { title: "Saved views", body: "Filter the invoice list once, name it, and it stays in the sidebar for the whole team." },
    { title: "Partial payments", body: "Record part of a payment and the balance stays open with its own reminder." },
    { title: "Faster exports", body: "CSV exports for a full year now finish in seconds instead of minutes." },
  ]}
  finishLabel="Got it"
/>`,
    node: (
      <OnboardingMotion
        steps={[
          { title: "Saved views", body: "Filter the invoice list once, name it, and it stays in the sidebar for the whole team." },
          { title: "Partial payments", body: "Record part of a payment and the balance stays open with its own reminder." },
          { title: "Faster exports", body: "CSV exports for a full year now finish in seconds instead of minutes." },
        ]}
        finishLabel="Got it"
      />
    ),
  },
]
