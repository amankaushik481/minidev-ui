"use client"
import * as React from "react"
import { Button } from "@/registry/ui/button"
import { GoalRing } from "@/registry/ui/goal-ring"
import type { Example } from "./types"

function LoggedDemos() {
  const [booked, setBooked] = React.useState(18)
  const target = 25
  return (
    <div className="flex items-center gap-4">
      <GoalRing value={(booked / target) * 100} label={`${booked} of ${target} demos booked`} />
      <Button size="sm" variant="outline" disabled={booked >= target} onClick={() => setBooked((b) => b + 1)}>
        Log a demo
      </Button>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Count toward a target",
    description: "value is a percentage, so work it out from the count and put the count in the label.",
    code: `function LoggedDemos() {
  const [booked, setBooked] = React.useState(18)
  const target = 25
  return (
    <div className="flex items-center gap-4">
      <GoalRing value={(booked / target) * 100} label={\`\${booked} of \${target} demos booked\`} />
      <Button size="sm" variant="outline" disabled={booked >= target} onClick={() => setBooked((b) => b + 1)}>
        Log a demo
      </Button>
    </div>
  )
}`,
    node: <LoggedDemos />,
  },
  {
    title: "Team goals side by side",
    description: "Several rings in a row read as a quick status board; resize them through the svg selector.",
    code: `<div className="flex flex-wrap gap-6 [&_svg]:size-20">
  <GoalRing value={92} label="Q4 revenue" />
  <GoalRing value={64} label="New logos" />
  <GoalRing value={38} label="Support CSAT survey" />
</div>`,
    node: (
      <div className="flex flex-wrap gap-6 [&_svg]:size-20">
        <GoalRing value={92} label="Q4 revenue" />
        <GoalRing value={64} label="New logos" />
        <GoalRing value={38} label="Support CSAT survey" />
      </div>
    ),
  },
]
