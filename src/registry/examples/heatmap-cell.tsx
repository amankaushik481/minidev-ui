"use client"
import { HeatmapCell } from "@/registry/ui/heatmap-cell"
import type { Example } from "./types"

function RunsHeatmap() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  const hours = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22]
  // Busy on weekday afternoons, quiet at night and at weekends.
  const runs = (d: number, h: number) => Math.round((d < 5 ? 40 : 12) * Math.max(0.05, Math.sin(((h - 6) / 18) * Math.PI)))
  return (
    <div className="grid grid-cols-[32px_repeat(12,16px)] gap-1 text-[10px] text-fg-muted">
      {days.map((day, d) => (
        <div key={day} className="contents">
          <span className="self-center">{day}</span>
          {hours.map((h) => (
            <HeatmapCell key={h} intensity={runs(d, h) / 40} label={`${day} ${h}:00, ${runs(d, h)} runs`} />
          ))}
        </div>
      ))}
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Runs by weekday and hour",
    description: "Map rows and columns into a CSS grid and give every cell a label with its time and count.",
    code: `function RunsHeatmap() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  const hours = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22]
  // Busy on weekday afternoons, quiet at night and at weekends.
  const runs = (d: number, h: number) => Math.round((d < 5 ? 40 : 12) * Math.max(0.05, Math.sin(((h - 6) / 18) * Math.PI)))
  return (
    <div className="grid grid-cols-[32px_repeat(12,16px)] gap-1 text-[10px] text-fg-muted">
      {days.map((day, d) => (
        <div key={day} className="contents">
          <span className="self-center">{day}</span>
          {hours.map((h) => (
            <HeatmapCell key={h} intensity={runs(d, h) / 40} label={\`\${day} \${h}:00, \${runs(d, h)} runs\`} />
          ))}
        </div>
      ))}
    </div>
  )
}`,
    node: <RunsHeatmap />,
  },
  {
    title: "Intensity scale",
    description: "Five cells from 0 to 1 make the key for a heatmap; label each step.",
    code: `<div className="flex items-center gap-1.5 text-xs text-fg-muted">
  <span>Less</span>
  <HeatmapCell intensity={0} label="No runs" />
  <HeatmapCell intensity={0.25} label="1 to 10 runs" />
  <HeatmapCell intensity={0.5} label="11 to 20 runs" />
  <HeatmapCell intensity={0.75} label="21 to 30 runs" />
  <HeatmapCell intensity={1} label="More than 30 runs" />
  <span>More</span>
</div>`,
    node: (
      <div className="flex items-center gap-1.5 text-xs text-fg-muted">
        <span>Less</span>
        <HeatmapCell intensity={0} label="No runs" />
        <HeatmapCell intensity={0.25} label="1 to 10 runs" />
        <HeatmapCell intensity={0.5} label="11 to 20 runs" />
        <HeatmapCell intensity={0.75} label="21 to 30 runs" />
        <HeatmapCell intensity={1} label="More than 30 runs" />
        <span>More</span>
      </div>
    ),
  },
]
