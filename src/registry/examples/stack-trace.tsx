"use client"
import { StackTrace } from "@/registry/ui/stack-trace"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Client error",
    description: "Pass error.stack as is; line breaks and indentation are kept.",
    code: `<StackTrace
  className="w-full max-w-2xl"
  stack={"TypeError: Cannot read properties of undefined (reading 'total')\\n    at formatInvoice (app/invoices/format.ts:18:24)\\n    at InvoiceRow (app/invoices/row.tsx:9:17)\\n    at renderWithHooks (react-dom.development.js:15486:18)"}
/>`,
    node: (
      <StackTrace
        className="w-full max-w-2xl"
        stack={"TypeError: Cannot read properties of undefined (reading 'total')\n    at formatInvoice (app/invoices/format.ts:18:24)\n    at InvoiceRow (app/invoices/row.tsx:9:17)\n    at renderWithHooks (react-dom.development.js:15486:18)"}
      />
    ),
  },
  {
    title: "Capped height with a label",
    description: "max-h-32 keeps a long trace from pushing the page down; label names the region.",
    code: `<StackTrace
  className="max-h-32 w-full max-w-2xl"
  label="Webhook delivery error"
  stack={"Error: connect ECONNREFUSED 10.0.4.12:443\\n    at TCPConnectWrap.afterConnect (node:net:1607:16)\\n    at deliver (workers/webhooks/deliver.ts:41:11)\\n    at retry (workers/webhooks/retry.ts:22:9)\\n    at processBatch (workers/queue.ts:88:5)\\n    at runWorker (workers/queue.ts:31:3)"}
/>`,
    node: (
      <StackTrace
        className="max-h-32 w-full max-w-2xl"
        label="Webhook delivery error"
        stack={"Error: connect ECONNREFUSED 10.0.4.12:443\n    at TCPConnectWrap.afterConnect (node:net:1607:16)\n    at deliver (workers/webhooks/deliver.ts:41:11)\n    at retry (workers/webhooks/retry.ts:22:9)\n    at processBatch (workers/queue.ts:88:5)\n    at runWorker (workers/queue.ts:31:3)"}
      />
    ),
  },
]
