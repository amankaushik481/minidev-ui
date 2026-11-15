"use client"
import { TraceWaterfall } from "@/registry/ui/trace-waterfall"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "API request",
    description: "start and duration are milliseconds from the start of the trace; depth indents child spans.",
    code: `<TraceWaterfall
  className="w-full max-w-xl"
  spans={[
    { name: "POST /v1/invoices", start: 0, duration: 212 },
    { name: "auth.verify", start: 3, duration: 14, depth: 1 },
    { name: "db.insert invoice", start: 20, duration: 46, depth: 1 },
    { name: "pdf.render", start: 70, duration: 118, depth: 1 },
    { name: "queue.publish", start: 192, duration: 12, depth: 1 },
  ]}
/>`,
    node: (
      <TraceWaterfall
        className="w-full max-w-xl"
        spans={[
          { name: "POST /v1/invoices", start: 0, duration: 212 },
          { name: "auth.verify", start: 3, duration: 14, depth: 1 },
          { name: "db.insert invoice", start: 20, duration: 46, depth: 1 },
          { name: "pdf.render", start: 70, duration: 118, depth: 1 },
          { name: "queue.publish", start: 192, duration: 12, depth: 1 },
        ]}
      />
    ),
  },
  {
    title: "Agent run",
    description: "The same shape times the steps of an AI agent, with tool calls nested under the run.",
    code: `<TraceWaterfall
  className="w-full max-w-xl"
  spans={[
    { name: "agent.run", start: 0, duration: 4180 },
    { name: "llm.plan", start: 10, duration: 1240, depth: 1 },
    { name: "tool.search_invoices", start: 1270, duration: 380, depth: 1 },
    { name: "tool.get_customer", start: 1660, duration: 210, depth: 1 },
    { name: "llm.answer", start: 1890, duration: 2270, depth: 1 },
  ]}
/>`,
    node: (
      <TraceWaterfall
        className="w-full max-w-xl"
        spans={[
          { name: "agent.run", start: 0, duration: 4180 },
          { name: "llm.plan", start: 10, duration: 1240, depth: 1 },
          { name: "tool.search_invoices", start: 1270, duration: 380, depth: 1 },
          { name: "tool.get_customer", start: 1660, duration: 210, depth: 1 },
          { name: "llm.answer", start: 1890, duration: 2270, depth: 1 },
        ]}
      />
    ),
  },
]
