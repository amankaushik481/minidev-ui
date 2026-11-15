"use client"
import { StickyFeatureStory } from "@/registry/premium/sticky-feature-story"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "How it works",
    description: "Three steps for a launch page. The section is 90vh tall per step, so scroll the page to move through them.",
    code: `<StickyFeatureStory
  steps={[
    { label: "01", title: "Connect your bank", body: "Link Acme Bank once. Transactions sync every hour." },
    { label: "02", title: "Payments match themselves", body: "Deposits pair with open invoices by amount and reference." },
    { label: "03", title: "Close the month", body: "Reports are drafted on the last day, ready for review." },
  ]}
/>`,
    node: (
      <StickyFeatureStory
        steps={[
          { label: "01", title: "Connect your bank", body: "Link Acme Bank once. Transactions sync every hour." },
          { label: "02", title: "Payments match themselves", body: "Deposits pair with open invoices by amount and reference." },
          { label: "03", title: "Close the month", body: "Reports are drafted on the last day, ready for review." },
        ]}
      />
    ),
  },
  {
    title: "Security walkthrough",
    description: "Any number of steps works: the scroll is split into one equal slice per step.",
    code: `<StickyFeatureStory
  steps={[
    { label: "Sign in", title: "SSO for every seat", body: "Members sign in with your identity provider. Passwords are optional." },
    { label: "Access", title: "Roles by default", body: "Owners, approvers and viewers see only what their role allows." },
    { label: "Audit", title: "Every change logged", body: "Who changed what and when, exportable for your auditor." },
    { label: "Data", title: "Encrypted at rest", body: "Backups run nightly and are kept for 35 days." },
  ]}
/>`,
    node: (
      <StickyFeatureStory
        steps={[
          { label: "Sign in", title: "SSO for every seat", body: "Members sign in with your identity provider. Passwords are optional." },
          { label: "Access", title: "Roles by default", body: "Owners, approvers and viewers see only what their role allows." },
          { label: "Audit", title: "Every change logged", body: "Who changed what and when, exportable for your auditor." },
          { label: "Data", title: "Encrypted at rest", body: "Backups run nightly and are kept for 35 days." },
        ]}
      />
    ),
  },
]
