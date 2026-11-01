import { OnboardingChecklist } from "@/registry/ui/onboarding-checklist"
import type { Example } from "./types"

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
    title: "Fresh account",
    description: "Nothing done yet and only three steps keeps a brand new workspace from feeling like homework.",
    code: `<OnboardingChecklist
  items={[
    { id: "verify", label: "Verify your email" },
    { id: "workspace", label: "Name your workspace" },
    { id: "first", label: "Create something" },
  ]}
  className="w-72"
/>`,
    node: (
      <OnboardingChecklist
        items={[
          { id: "verify", label: "Verify your email" },
          { id: "workspace", label: "Name your workspace" },
          { id: "first", label: "Create something" },
        ]}
        className="w-72"
      />
    ),
  },
]
