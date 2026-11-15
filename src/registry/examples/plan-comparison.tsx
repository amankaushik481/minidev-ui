"use client"
import { PlanComparison } from "@/registry/ui/plan-comparison"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Three plans with limits",
    description: "Mix text and booleans in one row set; every row needs one value per plan, in plans order.",
    code: `<PlanComparison
  className="w-full max-w-xl"
  plans={["Starter", "Pro", "Business"]}
  rows={[
    { feature: "Invoices", values: ["5 a month", "Unlimited", "Unlimited"] },
    { feature: "Seats", values: ["1", "10", "Unlimited"] },
    { feature: "Bank sync", values: [false, true, true] },
    { feature: "SSO and audit log", values: [false, false, true] },
  ]}
/>`,
    node: (
      <PlanComparison
        className="w-full max-w-xl"
        plans={["Starter", "Pro", "Business"]}
        rows={[
          { feature: "Invoices", values: ["5 a month", "Unlimited", "Unlimited"] },
          { feature: "Seats", values: ["1", "10", "Unlimited"] },
          { feature: "Bank sync", values: [false, true, true] },
          { feature: "SSO and audit log", values: [false, false, true] },
        ]}
      />
    ),
  },
  {
    title: "Grouped by topic",
    description: "Rows are flat, so use one table per group with its own heading and caption.",
    code: `<div className="w-full max-w-xl space-y-4">
  <h3 className="text-sm font-medium text-fg">Collaboration</h3>
  <PlanComparison
    caption="Collaboration features by plan"
    plans={["Pro", "Business"]}
    rows={[
      { feature: "Shared workspaces", values: [true, true] },
      { feature: "Guest accountants", values: ["2", "Unlimited"] },
    ]}
  />
  <h3 className="text-sm font-medium text-fg">Security</h3>
  <PlanComparison
    caption="Security features by plan"
    plans={["Pro", "Business"]}
    rows={[
      { feature: "Two-factor sign-in", values: [true, true] },
      { feature: "SAML SSO", values: [false, true] },
    ]}
  />
</div>`,
    node: (
      <div className="w-full max-w-xl space-y-4">
        <h3 className="text-sm font-medium text-fg">Collaboration</h3>
        <PlanComparison
          caption="Collaboration features by plan"
          plans={["Pro", "Business"]}
          rows={[
            { feature: "Shared workspaces", values: [true, true] },
            { feature: "Guest accountants", values: ["2", "Unlimited"] },
          ]}
        />
        <h3 className="text-sm font-medium text-fg">Security</h3>
        <PlanComparison
          caption="Security features by plan"
          plans={["Pro", "Business"]}
          rows={[
            { feature: "Two-factor sign-in", values: [true, true] },
            { feature: "SAML SSO", values: [false, true] },
          ]}
        />
      </div>
    ),
  },
]
