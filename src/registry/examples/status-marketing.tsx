import { StatusMarketing } from "@/registry/premium/status-marketing"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Narrow column",
    description: "Constrain the width with className; the uptime grid still goes two up from the sm breakpoint.",
    code: `<StatusMarketing className="w-full max-w-2xl" />`,
    node: <StatusMarketing className="w-full max-w-2xl" />,
  },
  {
    title: "Framed as a page",
    description: "In a bordered frame the incident banner runs edge to edge while the rest gets horizontal padding.",
    code: `<div className="w-full max-w-3xl overflow-hidden rounded-2xl border border-border bg-bg shadow-raised">
  <StatusMarketing className="pb-8 [&>*:not(:first-child)]:px-6" />
</div>`,
    node: (
      <div className="w-full max-w-3xl overflow-hidden rounded-2xl border border-border bg-bg shadow-raised">
        <StatusMarketing className="pb-8 [&>*:not(:first-child)]:px-6" />
      </div>
    ),
  },
]
