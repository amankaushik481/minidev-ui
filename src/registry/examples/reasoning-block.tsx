import { ReasoningBlock } from "@/registry/ui/reasoning-block"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Finished with duration",
    description: "Pass duration once the model is done and the label reads Thought for Ns; the body stays folded until clicked.",
    code: `<ReasoningBlock duration="6s" className="w-full max-w-md">
  Northwind has three open invoices. INV-2041 is the largest and already past due, so the reminder should lead with it and
  mention the Friday payment run their AP team confirmed.
</ReasoningBlock>`,
    node: (
      <ReasoningBlock duration="6s" className="w-full max-w-md">
        Northwind has three open invoices. INV-2041 is the largest and already past due, so the reminder should lead with it and
        mention the Friday payment run their AP team confirmed.
      </ReasoningBlock>
    ),
  },
  {
    title: "While thinking",
    description: "active shimmers the label and appends an ellipsis; stream the partial reasoning into children as it arrives.",
    code: `<ReasoningBlock active defaultOpen className="w-full max-w-md">
  Checking which invoices are overdue for Northwind and whether a reminder already went out this week
</ReasoningBlock>`,
    node: (
      <ReasoningBlock active defaultOpen className="w-full max-w-md">
        Checking which invoices are overdue for Northwind and whether a reminder already went out this week
      </ReasoningBlock>
    ),
  },
  {
    title: "Custom title, open by default",
    description: "title renames the toggle and defaultOpen shows the body on first render, useful for a planning step people should read.",
    code: `<ReasoningBlock title="Plan" defaultOpen className="w-full max-w-md">
  <ol className="list-decimal space-y-1 pl-4">
    <li>Pull every invoice for Northwind with status open or overdue.</li>
    <li>Group them by due date and total the amounts.</li>
    <li>Draft one reminder that lists all of them, not one email per invoice.</li>
  </ol>
</ReasoningBlock>`,
    node: (
      <ReasoningBlock title="Plan" defaultOpen className="w-full max-w-md">
        <ol className="list-decimal space-y-1 pl-4">
          <li>Pull every invoice for Northwind with status open or overdue.</li>
          <li>Group them by due date and total the amounts.</li>
          <li>Draft one reminder that lists all of them, not one email per invoice.</li>
        </ol>
      </ReasoningBlock>
    ),
  },
]
