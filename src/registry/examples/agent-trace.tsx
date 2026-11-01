import { AgentTrace } from "@/registry/ui/agent-trace"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Run in progress",
    description: "Mix done, running and pending steps; the header dot pulses while anything is running and the count comes from the steps.",
    code: `<AgentTrace
  title="Chase overdue invoices"
  steps={[
    { id: "1", name: "list_invoices(status=overdue)", status: "done", duration: "0.4s", detail: "3 invoices: INV-2038, INV-2041, INV-2044" },
    { id: "2", name: "get_customer(northwind)", status: "done", duration: "0.2s" },
    { id: "3", name: "draft_reminder(INV-2041)", status: "running" },
    { id: "4", name: "send_email", status: "pending" },
  ]}
/>`,
    node: (
      <AgentTrace
        title="Chase overdue invoices"
        steps={[
          { id: "1", name: "list_invoices(status=overdue)", status: "done", duration: "0.4s", detail: "3 invoices: INV-2038, INV-2041, INV-2044" },
          { id: "2", name: "get_customer(northwind)", status: "done", duration: "0.2s" },
          { id: "3", name: "draft_reminder(INV-2041)", status: "running" },
          { id: "4", name: "send_email", status: "pending" },
        ]}
      />
    ),
  },
  {
    title: "Completed with summary",
    description: "When every step is done the dot turns green; meta replaces the step count with your own totals.",
    code: `<AgentTrace
  title="Reconcile September"
  meta="4 tools · 3.1s · $0.012"
  steps={[
    { id: "1", name: "fetch_bank_transactions(sep)", status: "done", duration: "1.2s", detail: "412 transactions from 2 accounts" },
    { id: "2", name: "match_invoices", status: "done", duration: "0.9s", detail: "398 matched automatically, 14 need review" },
    { id: "3", name: "flag_for_review", status: "done", duration: "0.3s" },
    { id: "4", name: "post_summary(#finance)", status: "done", duration: "0.7s" },
  ]}
/>`,
    node: (
      <AgentTrace
        title="Reconcile September"
        meta="4 tools · 3.1s · $0.012"
        steps={[
          { id: "1", name: "fetch_bank_transactions(sep)", status: "done", duration: "1.2s", detail: "412 transactions from 2 accounts" },
          { id: "2", name: "match_invoices", status: "done", duration: "0.9s", detail: "398 matched automatically, 14 need review" },
          { id: "3", name: "flag_for_review", status: "done", duration: "0.3s" },
          { id: "4", name: "post_summary(#finance)", status: "done", duration: "0.7s" },
        ]}
      />
    ),
  },
  {
    title: "Failed step",
    description: "An error step gets a red marker; put the message in detail so people can expand it, and leave later steps pending.",
    code: `<AgentTrace
  title="Export audit log"
  meta="Stopped after 2 of 4 steps"
  steps={[
    { id: "1", name: "collect_events(90d)", status: "done", duration: "2.1s" },
    { id: "2", name: "upload_to_s3(northwind-audit.csv)", status: "error", duration: "8.0s", detail: "AccessDenied: the bucket policy does not allow PutObject from this role." },
    { id: "3", name: "notify_requester", status: "pending" },
    { id: "4", name: "close_ticket", status: "pending" },
  ]}
/>`,
    node: (
      <AgentTrace
        title="Export audit log"
        meta="Stopped after 2 of 4 steps"
        steps={[
          { id: "1", name: "collect_events(90d)", status: "done", duration: "2.1s" },
          { id: "2", name: "upload_to_s3(northwind-audit.csv)", status: "error", duration: "8.0s", detail: "AccessDenied: the bucket policy does not allow PutObject from this role." },
          { id: "3", name: "notify_requester", status: "pending" },
          { id: "4", name: "close_ticket", status: "pending" },
        ]}
      />
    ),
  },
]
