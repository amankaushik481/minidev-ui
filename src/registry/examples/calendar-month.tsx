"use client"
import * as React from "react"
import { CalendarIcon } from "lucide-react"
import { Button } from "@/registry/ui/button"
import { CalendarMonth } from "@/registry/ui/calendar-month"
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/ui/popover"
import type { Example } from "./types"

function ControlledDemo() {
  const [day, setDay] = React.useState<number | undefined>(14)
  return (
    <div className="flex flex-col items-center gap-3">
      <CalendarMonth selected={day} onSelect={setDay} />
      <p className="text-xs text-fg-muted">{day ? "Due on September " + day + ", 2026" : "Pick a due date"}</p>
    </div>
  )
}

function PopoverDemo() {
  const [day, setDay] = React.useState<number | undefined>()
  const [open, setOpen] = React.useState(false)
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger render={<Button variant="outline" />}>
        <CalendarIcon /> {day ? "Sep " + day + ", 2026" : "Pick a date"}
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-2">
        <CalendarMonth selected={day} onSelect={(d) => { setDay(d); setOpen(false) }} className="border-0 p-0" />
      </PopoverContent>
    </Popover>
  )
}

export const examples: Example[] = [
  {
    title: "Controlled selection",
    description: "Keep the selected day in state and pass it back in; onSelect gives you the day number.",
    code: `function ControlledDemo() {
  const [day, setDay] = React.useState<number | undefined>(14)
  return (
    <div className="flex flex-col items-center gap-3">
      <CalendarMonth selected={day} onSelect={setDay} />
      <p className="text-xs text-fg-muted">{day ? "Due on September " + day + ", 2026" : "Pick a due date"}</p>
    </div>
  )
}`,
    node: <ControlledDemo />,
  },
  {
    title: "Read only",
    description: "Without onSelect the month only displays a date, which suits a detail panel or a confirmation screen.",
    code: `<CalendarMonth selected={24} />`,
    node: <CalendarMonth selected={24} />,
  },
  {
    title: "In a popover",
    description: "Pair it with Popover for a date field; close the popover as soon as a day is picked.",
    code: `function PopoverDemo() {
  const [day, setDay] = React.useState<number | undefined>()
  const [open, setOpen] = React.useState(false)
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger render={<Button variant="outline" />}>
        <CalendarIcon /> {day ? "Sep " + day + ", 2026" : "Pick a date"}
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-2">
        <CalendarMonth selected={day} onSelect={(d) => { setDay(d); setOpen(false) }} className="border-0 p-0" />
      </PopoverContent>
    </Popover>
  )
}`,
    node: <PopoverDemo />,
  },
]
