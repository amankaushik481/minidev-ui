"use client"
import * as React from "react"
import { OnboardingChecklist } from "@/registry/ui/onboarding-checklist"
import type { Example } from "./types"

function SaveProgressDemo() {
  const [saved, setSaved] = React.useState<string | null>(null)
  return (
    <div className="flex w-80 flex-col gap-2">
      <OnboardingChecklist
        title="Finish setting up Lumen"
        items={[
          { id: "verify", label: "Verify maya@northwind.io", done: true },
          { id: "tax", label: "Add your VAT number" },
          { id: "reminders", label: "Turn on payment reminders" },
        ]}
        onToggle={(id, done) => setSaved(`${id} ${done ? "done" : "reopened"}`)}
      />
      <p aria-live="polite" className="px-1 text-xs text-fg-muted">{saved ? `Saved: ${saved}` : "Progress saves as you tick."}</p>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Custom items",
    description: "Each item needs an id and a label; done marks the steps already finished and clicking a row toggles it.",
    code: `<OnboardingChecklist
  items={[
    { id: "profile", label: "Add your company details", done: true },
    { id: "bank", label: "Connect a bank account", done: true },
    { id: "customer", label: "Import your first customer" },
    { id: "invoice", label: "Send invoice INV-0001" },
    { id: "team", label: "Invite Theo and Priya" },
  ]}
  className="w-80"
/>`,
    node: (
      <OnboardingChecklist
        items={[
          { id: "profile", label: "Add your company details", done: true },
          { id: "bank", label: "Connect a bank account", done: true },
          { id: "customer", label: "Import your first customer" },
          { id: "invoice", label: "Send invoice INV-0001" },
          { id: "team", label: "Invite Theo and Priya" },
        ]}
        className="w-80"
      />
    ),
  },
  {
    title: "Persist with onToggle",
    description: "The list keeps its own ticks; onToggle hands you the id and new state so you can save progress to your backend.",
    code: `function SaveProgressDemo() {
  const [saved, setSaved] = React.useState<string | null>(null)
  return (
    <div className="flex w-80 flex-col gap-2">
      <OnboardingChecklist
        title="Finish setting up Lumen"
        items={[
          { id: "verify", label: "Verify maya@northwind.io", done: true },
          { id: "tax", label: "Add your VAT number" },
          { id: "reminders", label: "Turn on payment reminders" },
        ]}
        onToggle={(id, done) => setSaved(\`\${id} \${done ? "done" : "reopened"}\`)}
      />
      <p aria-live="polite" className="px-1 text-xs text-fg-muted">{saved ? \`Saved: \${saved}\` : "Progress saves as you tick."}</p>
    </div>
  )
}`,
    node: <SaveProgressDemo />,
  },
  {
    title: "Fresh account",
    description: "Nothing done yet and only three steps keeps a brand new workspace from feeling like homework.",
    code: `<OnboardingChecklist
  title="Welcome to Lumen"
  items={[
    { id: "verify", label: "Verify your email" },
    { id: "workspace", label: "Name your workspace" },
    { id: "invoice", label: "Send your first invoice" },
  ]}
  className="w-72"
/>`,
    node: (
      <OnboardingChecklist
        title="Welcome to Lumen"
        items={[
          { id: "verify", label: "Verify your email" },
          { id: "workspace", label: "Name your workspace" },
          { id: "invoice", label: "Send your first invoice" },
        ]}
        className="w-72"
      />
    ),
  },
]
