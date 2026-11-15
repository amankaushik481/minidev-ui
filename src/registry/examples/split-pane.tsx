"use client"
import { SplitPane } from "@/registry/ui/split-pane"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Before and after",
    description: "Two equal panes from 768px, stacked on phones with left on top.",
    code: `<SplitPane
  className="w-full max-w-2xl"
  left={
    <div className="space-y-1">
      <p className="text-xs font-medium text-fg-muted">Before</p>
      <p className="text-sm text-fg">Your invoice has been successfully generated and is now available for viewing.</p>
    </div>
  }
  right={
    <div className="space-y-1">
      <p className="text-xs font-medium text-fg-muted">After</p>
      <p className="text-sm text-fg">Invoice INV-2041 is ready.</p>
    </div>
  }
/>`,
    node: (
      <SplitPane
        className="w-full max-w-2xl"
        left={
          <div className="space-y-1">
            <p className="text-xs font-medium text-fg-muted">Before</p>
            <p className="text-sm text-fg">Your invoice has been successfully generated and is now available for viewing.</p>
          </div>
        }
        right={
          <div className="space-y-1">
            <p className="text-xs font-medium text-fg-muted">After</p>
            <p className="text-sm text-fg">Invoice INV-2041 is ready.</p>
          </div>
        }
      />
    ),
  },
  {
    title: "Request and response",
    description: "Override the columns with className for an uneven split; each pre scrolls on its own.",
    code: `<SplitPane
  className="w-full max-w-2xl md:grid-cols-[2fr_3fr]"
  left={<pre tabIndex={0} className="overflow-auto font-mono text-xs text-fg">{'POST /v1/invoices\\n{\\n  "customer": "cus_n0rthw1nd",\\n  "amount": 184000\\n}'}</pre>}
  right={<pre tabIndex={0} className="overflow-auto font-mono text-xs text-fg">{'201 Created\\n{\\n  "id": "inv_8f3a2c",\\n  "status": "open",\\n  "due_date": "2026-12-15"\\n}'}</pre>}
/>`,
    node: (
      <SplitPane
        className="w-full max-w-2xl md:grid-cols-[2fr_3fr]"
        left={<pre tabIndex={0} className="overflow-auto font-mono text-xs text-fg">{'POST /v1/invoices\n{\n  "customer": "cus_n0rthw1nd",\n  "amount": 184000\n}'}</pre>}
        right={<pre tabIndex={0} className="overflow-auto font-mono text-xs text-fg">{'201 Created\n{\n  "id": "inv_8f3a2c",\n  "status": "open",\n  "due_date": "2026-12-15"\n}'}</pre>}
      />
    ),
  },
]
