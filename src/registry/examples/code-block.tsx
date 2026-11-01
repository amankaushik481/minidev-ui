import { CodeBlock } from "@/registry/ui/code-block"
import type { Example } from "./types"

const ROUTE = `import { lumen } from "@/lib/lumen"

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const invoice = await lumen.invoices.get(params.id)
  if (!invoice) return new Response("Not found", { status: 404 })
  return Response.json(invoice)
}
`

const WEBHOOK = `{
  "event": "invoice.paid",
  "invoice": "INV-2041",
  "customer": "Northwind Traders",
  "amount": 1240000,
  "currency": "USD"
}`

export const examples: Example[] = [
  {
    title: "Filename and line numbers",
    description: "A filename in the header and showLineNumbers for snippets people will refer to by line.",
    code: `const ROUTE = \`import { lumen } from "@/lib/lumen"

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const invoice = await lumen.invoices.get(params.id)
  if (!invoice) return new Response("Not found", { status: 404 })
  return Response.json(invoice)
}
\`

<CodeBlock filename="app/api/invoices/[id]/route.ts" language="ts" showLineNumbers code={ROUTE} />`,
    node: (
      <div className="w-full max-w-2xl">
        <CodeBlock filename="app/api/invoices/[id]/route.ts" language="ts" showLineNumbers code={ROUTE} />
      </div>
    ),
  },
  {
    title: "Shell command",
    description: "A one line install command; the copy button copies the exact text, so leave out the prompt sign.",
    code: `<CodeBlock language="bash" code="npx shadcn@latest add @minidev/code-block" />`,
    node: (
      <div className="w-full max-w-md">
        <CodeBlock language="bash" code="npx shadcn@latest add @minidev/code-block" />
      </div>
    ),
  },
  {
    title: "JSON payload",
    description: "Strings and numbers get colour with no grammar for the language, which is enough for a payload.",
    code: `const WEBHOOK = \`{
  "event": "invoice.paid",
  "invoice": "INV-2041",
  "customer": "Northwind Traders",
  "amount": 1240000,
  "currency": "USD"
}\`

<CodeBlock language="json" filename="webhook.json" code={WEBHOOK} />`,
    node: (
      <div className="w-full max-w-md">
        <CodeBlock language="json" filename="webhook.json" code={WEBHOOK} />
      </div>
    ),
  },
]
