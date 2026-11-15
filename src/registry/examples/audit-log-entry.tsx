"use client"
import { AuditLogEntry } from "@/registry/ui/audit-log-entry"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "History of one record",
    description: "Stack entries about one invoice; action reads after the name and target is emphasised.",
    code: `<div className="w-full max-w-md rounded-xl border border-border bg-surface px-3">
  <AuditLogEntry actor="Maya Chen" action="approved refund on" target="INV-2041" date="2026-11-14T09:12:00Z" />
  <AuditLogEntry actor="Theo Okafor" action="requested a $1,240 refund on" target="INV-2041" date="2026-11-13T17:05:00Z" />
  <AuditLogEntry actor="Lumen Billing" action="sent invoice" target="INV-2041" date="2026-11-01T08:00:00Z" />
</div>`,
    node: (
      <div className="w-full max-w-md rounded-xl border border-border bg-surface px-3">
        <AuditLogEntry actor="Maya Chen" action="approved refund on" target="INV-2041" date="2026-11-14T09:12:00Z" />
        <AuditLogEntry actor="Theo Okafor" action="requested a $1,240 refund on" target="INV-2041" date="2026-11-13T17:05:00Z" />
        <AuditLogEntry actor="Lumen Billing" action="sent invoice" target="INV-2041" date="2026-11-01T08:00:00Z" />
      </div>
    ),
  },
  {
    title: "Actions without a target",
    description: "Leave target out when the action is complete on its own.",
    code: `<div className="w-full max-w-md rounded-xl border border-border bg-surface px-3">
  <AuditLogEntry actor="Priya Raman" action="exported all customers to CSV" date="2026-11-14T11:25:00Z" />
  <AuditLogEntry actor="Sam Lowe" action="turned on two-factor sign-in" date="2026-11-12T08:47:00Z" />
</div>`,
    node: (
      <div className="w-full max-w-md rounded-xl border border-border bg-surface px-3">
        <AuditLogEntry actor="Priya Raman" action="exported all customers to CSV" date="2026-11-14T11:25:00Z" />
        <AuditLogEntry actor="Sam Lowe" action="turned on two-factor sign-in" date="2026-11-12T08:47:00Z" />
      </div>
    ),
  },
]
