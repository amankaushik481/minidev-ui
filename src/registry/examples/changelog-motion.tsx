"use client"
import { ChangelogMotion } from "@/registry/premium/changelog-motion"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Release notes",
    description: "Set title for the section heading and tag each release New, Fix or Premium.",
    code: `<ChangelogMotion
  title="Release notes"
  entries={[
    {
      version: "v4.2.0",
      date: "Nov 10, 2026",
      title: "Saved views",
      tag: "New",
      items: ["Save any filter set as a view", "Pin up to five views to the sidebar"],
    },
    {
      version: "v4.1.3",
      date: "Nov 3, 2026",
      title: "Search fixes",
      tag: "Fix",
      items: ["Search now matches invoice numbers with a prefix", "Fixed results flickering while typing"],
    },
  ]}
/>`,
    node: (
      <ChangelogMotion
        title="Release notes"
        entries={[
          {
            version: "v4.2.0",
            date: "Nov 10, 2026",
            title: "Saved views",
            tag: "New",
            items: ["Save any filter set as a view", "Pin up to five views to the sidebar"],
          },
          {
            version: "v4.1.3",
            date: "Nov 3, 2026",
            title: "Search fixes",
            tag: "Fix",
            items: ["Search now matches invoice numbers with a prefix", "Fixed results flickering while typing"],
          },
        ]}
      />
    ),
  },
  {
    title: "In-app What's new",
    description: "Cap the width with className to show recent releases in a side panel or popover.",
    code: `<ChangelogMotion
  className="max-w-sm"
  title="What's new"
  entries={[
    { version: "v4.2.0", date: "Nov 10, 2026", title: "Saved views", tag: "New", items: ["Save any filter set as a view"] },
    { version: "v4.1.0", date: "Oct 27, 2026", title: "Audit export", tag: "Premium", items: ["Download the audit trail as CSV"] },
  ]}
/>`,
    node: (
      <ChangelogMotion
        className="max-w-sm"
        title="What's new"
        entries={[
          { version: "v4.2.0", date: "Nov 10, 2026", title: "Saved views", tag: "New", items: ["Save any filter set as a view"] },
          { version: "v4.1.0", date: "Oct 27, 2026", title: "Audit export", tag: "Premium", items: ["Download the audit trail as CSV"] },
        ]}
      />
    ),
  },
]
