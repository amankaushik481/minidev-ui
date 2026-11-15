"use client"
import { FeatureComparison } from "@/registry/premium/feature-comparison"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Your features",
    description: "Each row has a free and a premium value; label names the table for screen readers.",
    code: `<FeatureComparison
  className="w-full max-w-xl"
  label="Lumen Free and Pro compared"
  rows={[
    { feature: "Invoices per month", free: "10", premium: "Unlimited" },
    { feature: "Recurring invoices", free: false, premium: true },
    { feature: "Payment reminders", free: true, premium: true },
    { feature: "Bank sync", free: false, premium: true },
    { feature: "Support", free: "Email", premium: "Email and chat" },
  ]}
/>`,
    node: (
      <FeatureComparison
        className="w-full max-w-xl"
        label="Lumen Free and Pro compared"
        rows={[
          { feature: "Invoices per month", free: "10", premium: "Unlimited" },
          { feature: "Recurring invoices", free: false, premium: true },
          { feature: "Payment reminders", free: true, premium: true },
          { feature: "Bank sync", free: false, premium: true },
          { feature: "Support", free: "Email", premium: "Email and chat" },
        ]}
      />
    ),
  },
  {
    title: "Limits only",
    description: "When both plans have every feature and differ only in limits, use text in every cell.",
    code: `<FeatureComparison
  className="w-full max-w-xl"
  label="API limits by plan"
  rows={[
    { feature: "Requests per minute", free: "60", premium: "1,200" },
    { feature: "Webhooks", free: "2", premium: "50" },
    { feature: "Log retention", free: "24 hours", premium: "30 days" },
  ]}
/>`,
    node: (
      <FeatureComparison
        className="w-full max-w-xl"
        label="API limits by plan"
        rows={[
          { feature: "Requests per minute", free: "60", premium: "1,200" },
          { feature: "Webhooks", free: "2", premium: "50" },
          { feature: "Log retention", free: "24 hours", premium: "30 days" },
        ]}
      />
    ),
  },
]
