"use client"
import { ChangelogMarketing } from "@/registry/premium/changelog-marketing"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "What's new page",
    description: "Releases newest first, with the one worth selling marked highlight. Always pass dateTime so the time element is machine-readable.",
    code: `<ChangelogMarketing
  className="w-full max-w-2xl"
  entries={[
    {
      version: "v2.4",
      date: "Nov 12",
      dateTime: "2026-11-12",
      title: "Approvals for refunds",
      highlight: true,
      items: ["Refunds over $1,000 wait for an approver", "Every decision lands in the audit log", "Approvers get a Slack message with one-click approve"],
    },
    {
      version: "v2.3",
      date: "Oct 29",
      dateTime: "2026-10-29",
      title: "Scheduled payouts",
      items: ["Pick a weekday for bank transfers", "Payout summary email with each transfer"],
    },
    {
      version: "v2.2",
      date: "Oct 15",
      dateTime: "2026-10-15",
      title: "Faster exports",
      items: ["CSV exports stream instead of waiting", "Exports over 100k rows no longer time out"],
    },
  ]}
/>`,
    node: (
      <ChangelogMarketing
        className="w-full max-w-2xl"
        entries={[
          {
            version: "v2.4",
            date: "Nov 12",
            dateTime: "2026-11-12",
            title: "Approvals for refunds",
            highlight: true,
            items: ["Refunds over $1,000 wait for an approver", "Every decision lands in the audit log", "Approvers get a Slack message with one-click approve"],
          },
          {
            version: "v2.3",
            date: "Oct 29",
            dateTime: "2026-10-29",
            title: "Scheduled payouts",
            items: ["Pick a weekday for bank transfers", "Payout summary email with each transfer"],
          },
          {
            version: "v2.2",
            date: "Oct 15",
            dateTime: "2026-10-15",
            title: "Faster exports",
            items: ["CSV exports stream instead of waiting", "Exports over 100k rows no longer time out"],
          },
        ]}
      />
    ),
  },
  {
    title: "Single launch",
    description: "One highlighted entry works as a launch announcement block on a homepage.",
    code: `<ChangelogMarketing
  className="w-full max-w-2xl"
  entries={[
    {
      version: "v3.0",
      date: "Dec 1",
      dateTime: "2026-12-01",
      title: "Lumen for teams",
      highlight: true,
      items: ["Shared inboxes for invoices", "Roles for finance, sales and support", "One bill for the whole workspace"],
    },
  ]}
/>`,
    node: (
      <ChangelogMarketing
        className="w-full max-w-2xl"
        entries={[
          {
            version: "v3.0",
            date: "Dec 1",
            dateTime: "2026-12-01",
            title: "Lumen for teams",
            highlight: true,
            items: ["Shared inboxes for invoices", "Roles for finance, sales and support", "One bill for the whole workspace"],
          },
        ]}
      />
    ),
  },
]
