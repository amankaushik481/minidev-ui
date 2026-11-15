"use client"
import { Well } from "@/registry/ui/well"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Note under a setting",
    description: "Sets a short explanation back from the form it belongs to.",
    code: `<Well className="max-w-md">
  Payouts land in your bank 2 business days after an invoice is paid. Weekends and bank holidays add a day.
</Well>`,
    node: (
      <Well className="max-w-md">
        Payouts land in your bank 2 business days after an invoice is paid. Weekends and bank holidays add a day.
      </Well>
    ),
  },
  {
    title: "Read-only summary",
    description: "A description list inside a Well reads as a record you can check but not edit, such as an order review step.",
    code: `<Well className="max-w-md">
  <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2">
    <dt className="text-fg-muted">Customer</dt>
    <dd>Northwind Traders</dd>
    <dt className="text-fg-muted">Plan</dt>
    <dd>Team, billed yearly</dd>
    <dt className="text-fg-muted">Seats</dt>
    <dd className="tabular-nums">12</dd>
    <dt className="text-fg-muted">Total</dt>
    <dd className="font-medium tabular-nums">$2,880.00</dd>
  </dl>
</Well>`,
    node: (
      <Well className="max-w-md">
        <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2">
          <dt className="text-fg-muted">Customer</dt>
          <dd>Northwind Traders</dd>
          <dt className="text-fg-muted">Plan</dt>
          <dd>Team, billed yearly</dd>
          <dt className="text-fg-muted">Seats</dt>
          <dd className="tabular-nums">12</dd>
          <dt className="text-fg-muted">Total</dt>
          <dd className="font-medium tabular-nums">$2,880.00</dd>
        </dl>
      </Well>
    ),
  },
  {
    title: "Code sample",
    description: "A monospace block for a snippet that is shown, not copied; use CodeBlock when it needs a copy button.",
    code: `<Well className="max-w-md font-mono text-xs">
  <pre className="overflow-x-auto">{\`curl https://api.lumen.example/v1/invoices \\\\
  -H "Authorization: Bearer $LUMEN_KEY"\`}</pre>
</Well>`,
    node: (
      <Well className="max-w-md font-mono text-xs">
        <pre className="overflow-x-auto">{`curl https://api.lumen.example/v1/invoices \\
  -H "Authorization: Bearer $LUMEN_KEY"`}</pre>
      </Well>
    ),
  },
]
