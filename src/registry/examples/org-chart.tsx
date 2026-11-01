"use client"
import * as React from "react"
import { OrgChart, type OrgNode } from "@/registry/ui/org-chart"
import type { Example } from "./types"

const engineering: OrgNode = {
  id: "theo",
  name: "Theo Okafor",
  role: "CTO",
  team: "Engineering",
  children: [
    {
      id: "priya",
      name: "Priya Raman",
      role: "VP Engineering",
      team: "Engineering",
      children: [
        { id: "sam", name: "Sam Lowe", role: "Staff Engineer", team: "Engineering" },
        { id: "ines", name: "Inès Moreau", role: "Engineer, Payments", team: "Engineering" },
      ],
    },
    {
      id: "lena",
      name: "Lena Fischer",
      role: "Head of Design",
      team: "Design",
      children: [{ id: "kai", name: "Kai Nakamura", role: "Product Designer", team: "Design" }],
    },
    { id: "omar", name: "Omar Siddiqui", role: "Security Lead", team: "Security" },
  ],
}

function SelectDemo() {
  const [person, setPerson] = React.useState<OrgNode>(engineering)
  return (
    <div className="flex w-full max-w-3xl flex-col gap-3">
      <OrgChart data={engineering} defaultExpandDepth={1} selectedId={person.id} onSelect={setPerson} />
      <div className="flex items-center justify-between gap-3 rounded-lg border border-border bg-surface px-3 py-2 text-sm">
        <span>
          <span className="font-medium text-fg">{person.name}</span>
          <span className="text-fg-muted"> · {person.role}</span>
        </span>
        <span className="text-xs text-fg-subtle">
          {person.children?.length ? `${person.children.length} direct ${person.children.length === 1 ? "report" : "reports"}` : "No direct reports"}
        </span>
      </div>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Custom data, fully open",
    description: "data is a nested tree of people; defaultExpandDepth 2 opens every branch of this three level team.",
    code: `const engineering: OrgNode = {
  id: "theo",
  name: "Theo Okafor",
  role: "CTO",
  team: "Engineering",
  children: [
    {
      id: "priya",
      name: "Priya Raman",
      role: "VP Engineering",
      team: "Engineering",
      children: [
        { id: "sam", name: "Sam Lowe", role: "Staff Engineer", team: "Engineering" },
        { id: "ines", name: "Inès Moreau", role: "Engineer, Payments", team: "Engineering" },
      ],
    },
    {
      id: "lena",
      name: "Lena Fischer",
      role: "Head of Design",
      team: "Design",
      children: [{ id: "kai", name: "Kai Nakamura", role: "Product Designer", team: "Design" }],
    },
    { id: "omar", name: "Omar Siddiqui", role: "Security Lead", team: "Security" },
  ],
}

<OrgChart data={engineering} defaultExpandDepth={2} />`,
    node: <OrgChart data={engineering} defaultExpandDepth={2} />,
  },
  {
    title: "Controlled selection",
    description: "selectedId and onSelect make the chart a picker; the clicked node drives whatever detail view sits next to it.",
    code: `function SelectDemo() {
  const [person, setPerson] = React.useState<OrgNode>(engineering)
  return (
    <div className="flex w-full max-w-3xl flex-col gap-3">
      <OrgChart data={engineering} defaultExpandDepth={1} selectedId={person.id} onSelect={setPerson} />
      <div className="flex items-center justify-between gap-3 rounded-lg border border-border bg-surface px-3 py-2 text-sm">
        <span>
          <span className="font-medium text-fg">{person.name}</span>
          <span className="text-fg-muted"> · {person.role}</span>
        </span>
        <span className="text-xs text-fg-subtle">
          {person.children?.length ? \`\${person.children.length} direct \${person.children.length === 1 ? "report" : "reports"}\` : "No direct reports"}
        </span>
      </div>
    </div>
  )
}`,
    node: <SelectDemo />,
  },
  {
    title: "Pinned team colours",
    description: "Teams are coloured in order of appearance by default; teamTones pins names to tones so Finance stays warning coloured on every page.",
    code: `<OrgChart
  defaultExpandDepth={1}
  teamTones={{ Leadership: "neutral", Engineering: "accent", Finance: "warning", Operations: "info", Design: "success" }}
/>`,
    node: (
      <OrgChart
        defaultExpandDepth={1}
        teamTones={{ Leadership: "neutral", Engineering: "accent", Finance: "warning", Operations: "info", Design: "success" }}
      />
    ),
  },
]
