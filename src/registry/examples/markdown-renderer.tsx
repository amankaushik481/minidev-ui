import { MarkdownRenderer } from "@/registry/ui/markdown-renderer"
import type { Example } from "./types"

const RELEASE_NOTES = `Lumen 2.4 adds bank sync. Connect an account once and matched payments mark their invoices as paid within an hour.

\`\`\`bash
npm i @lumen/sdk@2.4.0
\`\`\`

Existing webhooks keep working. The new invoice.matched event fires alongside invoice.paid when a bank transfer is reconciled.`

const PLAIN = `Thanks for your order, Maya. Invoice INV-2041 for $12,400.00 is attached and due on October 24.

You can pay by card or bank transfer from the customer portal. Reply to this email if anything on the invoice looks wrong and we will fix it the same day.`

export const examples: Example[] = [
  {
    title: "Release note",
    description: "Paragraphs and a fenced block; the language tag after the fence is dropped and the code keeps its indentation.",
    code: `const RELEASE_NOTES = \`Lumen 2.4 adds bank sync. Connect an account once and matched payments mark their invoices as paid within an hour.

\\\`\\\`\\\`bash
npm i @lumen/sdk@2.4.0
\\\`\\\`\\\`

Existing webhooks keep working. The new invoice.matched event fires alongside invoice.paid when a bank transfer is reconciled.\`

<MarkdownRenderer content={RELEASE_NOTES} className="max-w-md" />`,
    node: <MarkdownRenderer content={RELEASE_NOTES} className="max-w-md" />,
  },
  {
    title: "Plain paragraphs",
    description: "Without any fences the content is split on blank lines into paragraphs, which suits emails and notes.",
    code: `const PLAIN = \`Thanks for your order, Maya. Invoice INV-2041 for $12,400.00 is attached and due on October 24.

You can pay by card or bank transfer from the customer portal. Reply to this email if anything on the invoice looks wrong and we will fix it the same day.\`

<MarkdownRenderer content={PLAIN} className="max-w-md rounded-xl border border-border bg-surface p-4" />`,
    node: <MarkdownRenderer content={PLAIN} className="max-w-md rounded-xl border border-border bg-surface p-4" />,
  },
]
