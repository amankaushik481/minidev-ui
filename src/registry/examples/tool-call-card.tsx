import { ToolCallCard } from "@/registry/ui/tool-call-card"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "With output",
    description: "Children become the collapsible body; args is a short preview of what was passed and duration shows once the call finishes.",
    code: `<ToolCallCard name="get_invoice" args='id="INV-2041"' duration="0.3s" className="w-full max-w-lg">
  <pre className="whitespace-pre-wrap">{\`{ "number": "INV-2041", "customer": "Northwind Traders", "total": 12400, "status": "open", "dueDate": "2026-10-24" }\`}</pre>
</ToolCallCard>`,
    node: (
      <ToolCallCard name="get_invoice" args='id="INV-2041"' duration="0.3s" className="w-full max-w-lg">
        <pre className="whitespace-pre-wrap">{`{ "number": "INV-2041", "customer": "Northwind Traders", "total": 12400, "status": "open", "dueDate": "2026-10-24" }`}</pre>
      </ToolCallCard>
    ),
  },
  {
    title: "Statuses",
    description: "running shows a spinner and hides the duration, done and error get a tinted pill; a card without children is not expandable.",
    code: `<div className="flex w-full max-w-lg flex-col gap-2">
  <ToolCallCard name="search_customers" args='query="northwind"' status="running" />
  <ToolCallCard name="list_payments" args="limit=20" status="done" duration="0.5s" />
  <ToolCallCard name="send_reminder" args='invoice="INV-2041"' status="error" duration="2.1s">
    SMTP 550: mailbox ap@northwind.io is full. The reminder was not delivered.
  </ToolCallCard>
</div>`,
    node: (
      <div className="flex w-full max-w-lg flex-col gap-2">
        <ToolCallCard name="search_customers" args='query="northwind"' status="running" />
        <ToolCallCard name="list_payments" args="limit=20" status="done" duration="0.5s" />
        <ToolCallCard name="send_reminder" args='invoice="INV-2041"' status="error" duration="2.1s">
          SMTP 550: mailbox ap@northwind.io is full. The reminder was not delivered.
        </ToolCallCard>
      </div>
    ),
  },
  {
    title: "Collapsed by default",
    description: "Set defaultOpen to false for long outputs so a stack of calls stays scannable until someone expands one.",
    code: `<ToolCallCard name="run_sql" args="SELECT ... FROM invoices" duration="1.8s" defaultOpen={false} className="w-full max-w-lg">
  <pre className="whitespace-pre-wrap">{\`customer           | open_total
-------------------+-----------
Northwind Traders  |   12400.00
Blue Harbor Co.    |    4150.00
Helix Biotech      |     980.00
(3 rows)\`}</pre>
</ToolCallCard>`,
    node: (
      <ToolCallCard name="run_sql" args="SELECT ... FROM invoices" duration="1.8s" defaultOpen={false} className="w-full max-w-lg">
        <pre className="whitespace-pre-wrap">{`customer           | open_total
-------------------+-----------
Northwind Traders  |   12400.00
Blue Harbor Co.    |    4150.00
Helix Biotech      |     980.00
(3 rows)`}</pre>
      </ToolCallCard>
    ),
  },
]
