"use client"
import * as React from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { Button } from "@/registry/ui/button"
import { ButtonGroup } from "@/registry/ui/button-group"
import type { Example } from "./types"

const RANGES = ["Day", "Week", "Month"] as const

function RangeDemo() {
  const [range, setRange] = React.useState<(typeof RANGES)[number]>("Week")
  return (
    <div className="flex flex-col items-center gap-3">
      <ButtonGroup aria-label="Date range">
        {RANGES.map((r) => (
          <Button key={r} variant={r === range ? "secondary" : "outline"} aria-pressed={r === range} onClick={() => setRange(r)}>
            {r}
          </Button>
        ))}
      </ButtonGroup>
      <p className="text-xs text-fg-muted">Showing revenue by {range.toLowerCase()}</p>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Segmented actions",
    description: "Adjacent outline buttons share borders and only the outer corners stay rounded.",
    code: `<ButtonGroup aria-label="Export">
  <Button variant="outline">CSV</Button>
  <Button variant="outline">PDF</Button>
  <Button variant="outline">Print</Button>
</ButtonGroup>`,
    node: (
      <ButtonGroup aria-label="Export">
        <Button variant="outline">CSV</Button>
        <Button variant="outline">PDF</Button>
        <Button variant="outline">Print</Button>
      </ButtonGroup>
    ),
  },
  {
    title: "Controlled selection",
    description: "Swap the variant of the active button and set aria-pressed so the choice is announced.",
    code: `const RANGES = ["Day", "Week", "Month"] as const

function RangeDemo() {
  const [range, setRange] = React.useState<(typeof RANGES)[number]>("Week")
  return (
    <div className="flex flex-col items-center gap-3">
      <ButtonGroup aria-label="Date range">
        {RANGES.map((r) => (
          <Button key={r} variant={r === range ? "secondary" : "outline"} aria-pressed={r === range} onClick={() => setRange(r)}>
            {r}
          </Button>
        ))}
      </ButtonGroup>
      <p className="text-xs text-fg-muted">Showing revenue by {range.toLowerCase()}</p>
    </div>
  )
}`,
    node: <RangeDemo />,
  },
  {
    title: "Pager",
    description: "Square buttons for page numbers with arrows at each end; mark the current page with aria-current.",
    code: `<ButtonGroup aria-label="Pagination">
  <Button variant="outline" size="icon" aria-label="Previous page"><ChevronLeftIcon /></Button>
  <Button variant="outline" size="icon">1</Button>
  <Button variant="secondary" size="icon" aria-current="page">2</Button>
  <Button variant="outline" size="icon">3</Button>
  <Button variant="outline" size="icon" aria-label="Next page"><ChevronRightIcon /></Button>
</ButtonGroup>`,
    node: (
      <ButtonGroup aria-label="Pagination">
        <Button variant="outline" size="icon" aria-label="Previous page"><ChevronLeftIcon /></Button>
        <Button variant="outline" size="icon">1</Button>
        <Button variant="secondary" size="icon" aria-current="page">2</Button>
        <Button variant="outline" size="icon">3</Button>
        <Button variant="outline" size="icon" aria-label="Next page"><ChevronRightIcon /></Button>
      </ButtonGroup>
    ),
  },
]
