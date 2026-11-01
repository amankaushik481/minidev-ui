import { DiffView } from "@/registry/ui/diff-view"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Config change",
    description: "Lines are typed add, del or ctx; filename adds the header bar and names the region for screen readers.",
    code: `<DiffView
  filename="config/billing.ts"
  className="w-full max-w-lg"
  lines={[
    { type: "ctx", text: "export const billing = {" },
    { type: "ctx", text: "  currency: \\"USD\\"," },
    { type: "del", text: "  reminderDays: [3, 7]," },
    { type: "add", text: "  reminderDays: [3, 7, 14]," },
    { type: "add", text: "  stopOnPayment: true," },
    { type: "ctx", text: "  taxInclusive: false," },
    { type: "ctx", text: "}" },
  ]}
/>`,
    node: (
      <DiffView
        filename="config/billing.ts"
        className="w-full max-w-lg"
        lines={[
          { type: "ctx", text: "export const billing = {" },
          { type: "ctx", text: "  currency: \"USD\"," },
          { type: "del", text: "  reminderDays: [3, 7]," },
          { type: "add", text: "  reminderDays: [3, 7, 14]," },
          { type: "add", text: "  stopOnPayment: true," },
          { type: "ctx", text: "  taxInclusive: false," },
          { type: "ctx", text: "}" },
        ]}
      />
    ),
  },
  {
    title: "Without a header",
    description: "Leave filename out when the surrounding UI already says what changed, like a template version history.",
    code: `<DiffView
  className="w-full max-w-lg"
  lines={[
    { type: "ctx", text: "Hi {{customer.firstName}}," },
    { type: "ctx", text: "" },
    { type: "del", text: "Invoice {{invoice.number}} is overdue. Please pay now." },
    { type: "add", text: "Invoice {{invoice.number}} was due on {{invoice.dueDate}}." },
    { type: "add", text: "Pay by card or bank transfer from the link below." },
    { type: "ctx", text: "" },
    { type: "ctx", text: "Thanks, the Northwind finance team" },
  ]}
/>`,
    node: (
      <DiffView
        className="w-full max-w-lg"
        lines={[
          { type: "ctx", text: "Hi {{customer.firstName}}," },
          { type: "ctx", text: "" },
          { type: "del", text: "Invoice {{invoice.number}} is overdue. Please pay now." },
          { type: "add", text: "Invoice {{invoice.number}} was due on {{invoice.dueDate}}." },
          { type: "add", text: "Pay by card or bank transfer from the link below." },
          { type: "ctx", text: "" },
          { type: "ctx", text: "Thanks, the Northwind finance team" },
        ]}
      />
    ),
  },
]
