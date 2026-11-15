"use client"
import { ComparisonTable } from "@/registry/ui/comparison-table"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Your plans",
    description: "Each plan's values follow the features by index: true is a check, false a dash, a string is shown as text.",
    code: `<ComparisonTable
  className="w-full max-w-xl"
  featureLabel="Included"
  features={["Projects", "Members", "Version history", "Guest links", "SAML SSO"]}
  plans={[
    { name: "Free", values: ["3", "2", "7 days", false, false] },
    { name: "Team", values: ["Unlimited", "25", "1 year", true, false] },
    { name: "Enterprise", values: ["Unlimited", "Unlimited", "Forever", true, true] },
  ]}
/>`,
    node: (
      <ComparisonTable
        className="w-full max-w-xl"
        featureLabel="Included"
        features={["Projects", "Members", "Version history", "Guest links", "SAML SSO"]}
        plans={[
          { name: "Free", values: ["3", "2", "7 days", false, false] },
          { name: "Team", values: ["Unlimited", "25", "1 year", true, false] },
          { name: "Enterprise", values: ["Unlimited", "Unlimited", "Forever", true, true] },
        ]}
      />
    ),
  },
  {
    title: "Hosting options",
    description: "Not only for plans: compare ways to run the product, and set caption so screen readers know what the table is.",
    code: `<ComparisonTable
  className="w-full max-w-lg"
  caption="Cloud and self-hosted compared"
  featureLabel="Option"
  features={["Setup time", "Updates", "Data location", "Support"]}
  plans={[
    { name: "Cloud", values: ["2 minutes", "Automatic", "EU or US", "Email and chat"] },
    { name: "Self-hosted", values: ["About an hour", "You run them", "Your servers", "Email"] },
  ]}
/>`,
    node: (
      <ComparisonTable
        className="w-full max-w-lg"
        caption="Cloud and self-hosted compared"
        featureLabel="Option"
        features={["Setup time", "Updates", "Data location", "Support"]}
        plans={[
          { name: "Cloud", values: ["2 minutes", "Automatic", "EU or US", "Email and chat"] },
          { name: "Self-hosted", values: ["About an hour", "You run them", "Your servers", "Email"] },
        ]}
      />
    ),
  },
]
