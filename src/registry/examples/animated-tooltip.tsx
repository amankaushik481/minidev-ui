import * as React from "react"
import { AnimatedTooltip } from "@/registry/premium/animated-tooltip"
import type { Example } from "./types"

function AssignOwner() {
  const [owner, setOwner] = React.useState("Theo Okafor")
  return (
    <div className="flex flex-col items-center gap-4">
      <AnimatedTooltip
        people={[
          { name: "Maya Chen", role: "Founder" },
          { name: "Theo Okafor", role: "Engineering" },
          { name: "Priya Raman", role: "Design" },
          { name: "Sam Lowe", role: "Finance" },
        ]}
        defaultActive={1}
        onSelect={(p) => setOwner(p.name)}
      />
      <p className="text-sm text-fg-muted">
        INV-2041 is assigned to <span className="font-medium text-fg">{owner}</span>
      </p>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Custom team",
    description: "Pass people with a name and a role; initials come from the name when there is no image.",
    code: `<AnimatedTooltip
  people={[
    { name: "Maya Chen", role: "CFO, Northwind" },
    { name: "Theo Okafor", role: "Controller" },
    { name: "Priya Raman", role: "Accounts payable" },
    { name: "Sam Lowe", role: "Treasury" },
  ]}
/>`,
    node: (
      <AnimatedTooltip
        people={[
          { name: "Maya Chen", role: "CFO, Northwind" },
          { name: "Theo Okafor", role: "Controller" },
          { name: "Priya Raman", role: "Accounts payable" },
          { name: "Sam Lowe", role: "Treasury" },
        ]}
      />
    ),
  },
  {
    title: "Large avatars",
    description: "size sets the diameter in pixels; initials overrides the letters taken from the name.",
    code: `<AnimatedTooltip
  size={56}
  defaultActive={0}
  people={[
    { name: "Northwind Traders", role: "Customer since 2021", initials: "NW" },
    { name: "Lumen Labs", role: "Customer since 2023", initials: "LL" },
    { name: "Okafor and Sons", role: "Customer since 2024", initials: "OS" },
  ]}
/>`,
    node: (
      <AnimatedTooltip
        size={56}
        defaultActive={0}
        people={[
          { name: "Northwind Traders", role: "Customer since 2021", initials: "NW" },
          { name: "Lumen Labs", role: "Customer since 2023", initials: "LL" },
          { name: "Okafor and Sons", role: "Customer since 2024", initials: "OS" },
        ]}
      />
    ),
  },
  {
    title: "Select handler",
    description: "onSelect fires on click or Enter with the person and their index, so the row can double as a picker.",
    code: `function AssignOwner() {
  const [owner, setOwner] = React.useState("Theo Okafor")
  return (
    <div className="flex flex-col items-center gap-4">
      <AnimatedTooltip
        people={[
          { name: "Maya Chen", role: "Founder" },
          { name: "Theo Okafor", role: "Engineering" },
          { name: "Priya Raman", role: "Design" },
          { name: "Sam Lowe", role: "Finance" },
        ]}
        defaultActive={1}
        onSelect={(p) => setOwner(p.name)}
      />
      <p className="text-sm text-fg-muted">
        INV-2041 is assigned to <span className="font-medium text-fg">{owner}</span>
      </p>
    </div>
  )
}`,
    node: <AssignOwner />,
  },
]
