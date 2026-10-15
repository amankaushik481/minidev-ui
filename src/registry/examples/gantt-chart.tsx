"use client"
import * as React from "react"
import { GanttChart, type GanttTask } from "@/registry/ui/gantt-chart"
import type { Example } from "./types"

const tasks: GanttTask[] = [
  { id: "kickoff", name: "Kickoff and access", start: "2026-10-05", end: "2026-10-07", progress: 100, group: "Onboarding" },
  { id: "import", name: "Import customers", start: "2026-10-08", end: "2026-10-14", progress: 60, group: "Onboarding", dependsOn: ["kickoff"] },
  { id: "sso", name: "SSO setup", start: "2026-10-12", end: "2026-10-16", progress: 20, group: "Onboarding", dependsOn: ["kickoff"] },
  { id: "training", name: "Finance team training", start: "2026-10-19", end: "2026-10-21", group: "Rollout", dependsOn: ["import", "sso"] },
  { id: "golive", name: "Go live", start: "2026-10-26", end: "2026-10-27", group: "Rollout", dependsOn: ["training"], tone: "success" },
]

function TaskClickDemo() {
  const [task, setTask] = React.useState<GanttTask | null>(null)
  return (
    <div className="flex w-full max-w-4xl flex-col gap-3">
      <GanttChart title="" nameWidth={150} onTaskClick={setTask} />
      <p className="text-xs text-fg-muted">{task ? task.name + ": " + (task.progress ?? 0) + "% done" : "Click a bar, or tab to one and press Enter."}</p>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Week scale",
    description: "defaultScale=\"week\" zooms out to 16px per day for plans that run over a quarter.",
    code: `<GanttChart defaultScale="week" />`,
    node: <GanttChart defaultScale="week" />,
  },
  {
    title: "Fixed dates",
    description: "Tasks take ISO day strings, group under a heading, and today pins the marker so the chart looks the same every day.",
    code: `const tasks: GanttTask[] = [
  { id: "kickoff", name: "Kickoff and access", start: "2026-10-05", end: "2026-10-07", progress: 100, group: "Onboarding" },
  { id: "import", name: "Import customers", start: "2026-10-08", end: "2026-10-14", progress: 60, group: "Onboarding", dependsOn: ["kickoff"] },
  { id: "sso", name: "SSO setup", start: "2026-10-12", end: "2026-10-16", progress: 20, group: "Onboarding", dependsOn: ["kickoff"] },
  { id: "training", name: "Finance team training", start: "2026-10-19", end: "2026-10-21", group: "Rollout", dependsOn: ["import", "sso"] },
  { id: "golive", name: "Go live", start: "2026-10-26", end: "2026-10-27", group: "Rollout", dependsOn: ["training"], tone: "success" },
]

<GanttChart tasks={tasks} today="2026-10-14" title="Northwind onboarding" />`,
    node: <GanttChart tasks={tasks} today="2026-10-14" title="Northwind onboarding" />,
  },
  {
    title: "Task click",
    description: "onTaskClick fires for a click or Enter on a bar; an empty title drops the header and nameWidth trims the task column.",
    code: `function TaskClickDemo() {
  const [task, setTask] = React.useState<GanttTask | null>(null)
  return (
    <div className="flex w-full max-w-4xl flex-col gap-3">
      <GanttChart title="" nameWidth={150} onTaskClick={setTask} />
      <p className="text-xs text-fg-muted">{task ? task.name + ": " + (task.progress ?? 0) + "% done" : "Click a bar, or tab to one and press Enter."}</p>
    </div>
  )
}`,
    node: <TaskClickDemo />,
  },
]
