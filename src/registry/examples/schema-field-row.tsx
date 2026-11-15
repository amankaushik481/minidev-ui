"use client"
import { SchemaFieldRow } from "@/registry/ui/schema-field-row"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Request body",
    description: "Stack rows to document an endpoint; description takes a node for inline code.",
    code: `<div className="w-full max-w-2xl">
  <SchemaFieldRow name="customer" type="string" required description={<>ID of the customer to bill, such as <code>cus_n0rthw1nd</code>.</>} />
  <SchemaFieldRow name="amount" type="integer" required description="Total in the smallest currency unit, so 184000 is $1,840.00." />
  <SchemaFieldRow name="currency" type="string" description={<>Three-letter ISO code. Defaults to <code>usd</code>.</>} />
  <SchemaFieldRow name="metadata" type="Record<string, string>" description="Up to 50 keys of your own, returned on every webhook." />
</div>`,
    node: (
      <div className="w-full max-w-2xl">
        <SchemaFieldRow name="customer" type="string" required description={<>ID of the customer to bill, such as <code>cus_n0rthw1nd</code>.</>} />
        <SchemaFieldRow name="amount" type="integer" required description="Total in the smallest currency unit, so 184000 is $1,840.00." />
        <SchemaFieldRow name="currency" type="string" description={<>Three-letter ISO code. Defaults to <code>usd</code>.</>} />
        <SchemaFieldRow name="metadata" type="Record<string, string>" description="Up to 50 keys of your own, returned on every webhook." />
      </div>
    ),
  },
  {
    title: "Nested webhook payload",
    description: "Indent child fields with pl-4 and give them dotted names so each row reads on its own.",
    code: `<div className="w-full max-w-2xl">
  <SchemaFieldRow name="type" type="string" required description="Event name, such as invoice.paid." />
  <SchemaFieldRow name="data.object" type="Invoice" required description="The invoice as it was when the event fired." />
  <SchemaFieldRow className="pl-4" name="data.object.status" type={'"paid" | "open"'} required />
  <SchemaFieldRow className="pl-4" name="data.object.paid_at" type="string | null" description="ISO 8601 time, or null while unpaid." />
</div>`,
    node: (
      <div className="w-full max-w-2xl">
        <SchemaFieldRow name="type" type="string" required description="Event name, such as invoice.paid." />
        <SchemaFieldRow name="data.object" type="Invoice" required description="The invoice as it was when the event fired." />
        <SchemaFieldRow className="pl-4" name="data.object.status" type={'"paid" | "open"'} required />
        <SchemaFieldRow className="pl-4" name="data.object.paid_at" type="string | null" description="ISO 8601 time, or null while unpaid." />
      </div>
    ),
  },
]
