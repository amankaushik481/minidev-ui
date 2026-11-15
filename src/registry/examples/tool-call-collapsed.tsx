"use client"
import { ToolCallCollapsed } from "@/registry/ui/tool-call-collapsed"
import { MessageBubble } from "@/registry/ui/message-bubble"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "In a transcript",
    description: "Tool calls stay one quiet line between turns until someone opens them.",
    code: `<div className="flex w-full max-w-md flex-col gap-3">
  <MessageBubble role="user">Is Halcyon Labs on the annual plan?</MessageBubble>
  <ToolCallCollapsed name="get_subscription">customer: Halcyon Labs · plan: Team (annual) · renews: Dec 1</ToolCallCollapsed>
  <MessageBubble role="assistant">Yes. They are on the annual Team plan, renewing Dec 1.</MessageBubble>
</div>`,
    node: (
      <div className="flex w-full max-w-md flex-col gap-3">
        <MessageBubble role="user">Is Halcyon Labs on the annual plan?</MessageBubble>
        <ToolCallCollapsed name="get_subscription">customer: Halcyon Labs · plan: Team (annual) · renews: Dec 1</ToolCallCollapsed>
        <MessageBubble role="assistant">Yes. They are on the annual Team plan, renewing Dec 1.</MessageBubble>
      </div>
    ),
  },
  {
    title: "Open with formatted output",
    description: "defaultOpen starts it expanded. Wrap JSON in pre to keep its line breaks.",
    code: `<ToolCallCollapsed name="search_customers" defaultOpen className="w-full max-w-md">
  <pre className="font-mono whitespace-pre-wrap">{JSON.stringify({ query: "northwind", matches: 2, ids: ["cus_81", "cus_207"] }, null, 2)}</pre>
</ToolCallCollapsed>`,
    node: (
      <ToolCallCollapsed name="search_customers" defaultOpen className="w-full max-w-md">
        <pre className="font-mono whitespace-pre-wrap">{JSON.stringify({ query: "northwind", matches: 2, ids: ["cus_81", "cus_207"] }, null, 2)}</pre>
      </ToolCallCollapsed>
    ),
  },
]
