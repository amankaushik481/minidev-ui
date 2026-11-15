"use client"
import { GanttRow } from "@/registry/ui/gantt-row"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "A two-week sprint",
    description: "Positions are day numbers on a 14 day scale.",
    code: `<div className="flex w-full max-w-xl flex-col gap-2">
  <GanttRow label="Invoice PDF API" start={0} end={5} max={14} />
  <GanttRow label="Reminder emails" start={3} end={10} max={14} />
  <GanttRow label="QA and release" start={10} end={14} max={14} />
</div>`,
    node: (
      <div className="flex w-full max-w-xl flex-col gap-2">
        <GanttRow label="Invoice PDF API" start={0} end={5} max={14} />
        <GanttRow label="Reminder emails" start={3} end={10} max={14} />
        <GanttRow label="QA and release" start={10} end={14} max={14} />
      </div>
    ),
  },
  {
    title: "Rollout by region",
    description: "A 0 to 100 scale for the share of accounts on a new version, with a wider label column.",
    code: `<div className="flex w-full max-w-xl flex-col gap-2">
  <GanttRow label="EU (Frankfurt)" start={0} end={100} className="grid-cols-[180px_1fr]" />
  <GanttRow label="US East (Virginia)" start={0} end={40} className="grid-cols-[180px_1fr]" />
  <GanttRow label="Asia Pacific (Sydney)" start={0} end={10} className="grid-cols-[180px_1fr]" />
</div>`,
    node: (
      <div className="flex w-full max-w-xl flex-col gap-2">
        <GanttRow label="EU (Frankfurt)" start={0} end={100} className="grid-cols-[180px_1fr]" />
        <GanttRow label="US East (Virginia)" start={0} end={40} className="grid-cols-[180px_1fr]" />
        <GanttRow label="Asia Pacific (Sydney)" start={0} end={10} className="grid-cols-[180px_1fr]" />
      </div>
    ),
  },
]
