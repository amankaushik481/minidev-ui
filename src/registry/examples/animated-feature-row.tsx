"use client"
import { AnimatedFeatureRow } from "@/registry/premium/animated-feature-row"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Why teams switch",
    description: "Three short reasons under a landing page headline; the cards rise once as the row scrolls in.",
    code: `<AnimatedFeatureRow
  features={[
    { title: "Payroll in one click", description: "Lumen works out tax, pension and overtime, then pays everyone on the same morning." },
    { title: "Payslips people understand", description: "Every line on the slip links to the rule that produced it, in plain words." },
    { title: "Year end without the scramble", description: "Filings are drafted through the year, so December is a review, not a rebuild." },
  ]}
/>`,
    node: (
      <AnimatedFeatureRow
        features={[
          { title: "Payroll in one click", description: "Lumen works out tax, pension and overtime, then pays everyone on the same morning." },
          { title: "Payslips people understand", description: "Every line on the slip links to the rule that produced it, in plain words." },
          { title: "Year end without the scramble", description: "Filings are drafted through the year, so December is a review, not a rebuild." },
        ]}
      />
    ),
  },
  {
    title: "Two columns under a pricing table",
    description: "Pass two features and override the grid with className when the row sits in a narrower section.",
    code: `<AnimatedFeatureRow
  className="max-w-2xl md:grid-cols-2"
  features={[
    { title: "Cancel any month", description: "Plans run month to month. Your data stays exportable for 90 days after you leave." },
    { title: "Seats, not tiers", description: "Every feature is on every plan. You only pay for the people who log in." },
  ]}
/>`,
    node: (
      <AnimatedFeatureRow
        className="max-w-2xl md:grid-cols-2"
        features={[
          { title: "Cancel any month", description: "Plans run month to month. Your data stays exportable for 90 days after you leave." },
          { title: "Seats, not tiers", description: "Every feature is on every plan. You only pay for the people who log in." },
        ]}
      />
    ),
  },
]
