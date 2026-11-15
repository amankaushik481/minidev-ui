"use client"
import { FeatureBentoMotion } from "@/registry/premium/feature-bento-motion"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Platform overview",
    description: "Mark the one or two headline features wide; each row should add up to three columns.",
    code: `<FeatureBentoMotion
  className="w-full max-w-3xl"
  items={[
    { title: "Bank feeds", body: "Transactions arrive every hour from over 40 banks and match to invoices on their own.", wide: true },
    { title: "Approvals", body: "Large refunds wait for a second pair of eyes." },
    { title: "Audit log", body: "Every change, who made it and when." },
    { title: "API and webhooks", body: "Build on the same API the Lumen apps use, with an event for every payment.", wide: true },
  ]}
/>`,
    node: (
      <FeatureBentoMotion
        className="w-full max-w-3xl"
        items={[
          { title: "Bank feeds", body: "Transactions arrive every hour from over 40 banks and match to invoices on their own.", wide: true },
          { title: "Approvals", body: "Large refunds wait for a second pair of eyes." },
          { title: "Audit log", body: "Every change, who made it and when." },
          { title: "API and webhooks", body: "Build on the same API the Lumen apps use, with an event for every payment.", wide: true },
        ]}
      />
    ),
  },
  {
    title: "Three equal tiles",
    description: "Leave wide off for one even row, for example security points on a trust page.",
    code: `<FeatureBentoMotion
  className="w-full max-w-3xl"
  items={[
    { title: "SSO", body: "SAML and OAuth sign-in on every plan." },
    { title: "Encryption", body: "Data encrypted in transit and at rest." },
    { title: "Data residency", body: "Choose EU or US storage at signup." },
  ]}
/>`,
    node: (
      <FeatureBentoMotion
        className="w-full max-w-3xl"
        items={[
          { title: "SSO", body: "SAML and OAuth sign-in on every plan." },
          { title: "Encryption", body: "Data encrypted in transit and at rest." },
          { title: "Data residency", body: "Choose EU or US storage at signup." },
        ]}
      />
    ),
  },
]
