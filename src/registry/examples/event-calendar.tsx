"use client"
import * as React from "react"
import { EventCalendar, type CalendarEvent, type CalendarSource } from "@/registry/ui/event-calendar"
import type { Example } from "./types"

const monday = new Date(2026, 9, 12)
const at = (day: number, hour: number, minute = 0) => new Date(2026, 9, 12 + day, hour, minute)

const calendars: CalendarSource[] = [
  { id: "support", label: "Support", tone: "info" },
  { id: "launch", label: "Launch", tone: "warning" },
]

const events: CalendarEvent[] = [
  { id: "1", title: "Onboarding: Northwind", start: at(0, 10), end: at(0, 11), calendar: "support", location: "Zoom" },
  { id: "2", title: "Launch review", start: at(1, 14), end: at(1, 15, 30), calendar: "launch", location: "Room Atlas" },
  { id: "3", title: "Support rota", start: at(2, 9), end: at(2, 12), calendar: "support" },
  { id: "4", title: "Lumen 2.4 ships", start: at(3, 0), end: at(4, 0), calendar: "launch", allDay: true },
  { id: "5", title: "Office hours", start: at(4, 15), end: at(4, 16), calendar: "support", location: "Google Meet" },
]

function HandlersDemo() {
  const [message, setMessage] = React.useState("Click an empty slot or an event.")
  return (
    <div className="flex w-full max-w-4xl flex-col gap-3">
      <EventCalendar
        height={360}
        slotMinutes={15}
        onCreate={({ start }) => setMessage("New event at " + start.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }))}
        onEventClick={(ev) => setMessage("Opened " + ev.title)}
      />
      <p aria-live="polite" className="text-xs text-fg-muted">{message}</p>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Day view",
    description: "defaultView picks the layout, scrollToHour sets where the grid starts and locale drives the time format.",
    code: `<EventCalendar defaultView="day" height={360} scrollToHour={9} locale="en-GB" />`,
    node: <EventCalendar defaultView="day" height={360} scrollToHour={9} locale="en-GB" />,
  },
  {
    title: "Custom events and calendars",
    description: "Events reference a calendar id for their colour; defaultDate opens the week that holds them.",
    code: `const monday = new Date(2026, 9, 12)
const at = (day: number, hour: number, minute = 0) => new Date(2026, 9, 12 + day, hour, minute)

const calendars: CalendarSource[] = [
  { id: "support", label: "Support", tone: "info" },
  { id: "launch", label: "Launch", tone: "warning" },
]

const events: CalendarEvent[] = [
  { id: "1", title: "Onboarding: Northwind", start: at(0, 10), end: at(0, 11), calendar: "support", location: "Zoom" },
  { id: "2", title: "Launch review", start: at(1, 14), end: at(1, 15, 30), calendar: "launch", location: "Room Atlas" },
  { id: "3", title: "Support rota", start: at(2, 9), end: at(2, 12), calendar: "support" },
  { id: "4", title: "Lumen 2.4 ships", start: at(3, 0), end: at(4, 0), calendar: "launch", allDay: true },
  { id: "5", title: "Office hours", start: at(4, 15), end: at(4, 16), calendar: "support", location: "Google Meet" },
]

<EventCalendar events={events} calendars={calendars} defaultDate={monday} defaultView="week" height={400} />`,
    node: <EventCalendar events={events} calendars={calendars} defaultDate={monday} defaultView="week" height={400} />,
  },
  {
    title: "Create and click handlers",
    description: "onCreate receives the snapped range for an empty slot and onEventClick the event, with slotMinutes setting the snap.",
    code: `function HandlersDemo() {
  const [message, setMessage] = React.useState("Click an empty slot or an event.")
  return (
    <div className="flex w-full max-w-4xl flex-col gap-3">
      <EventCalendar
        height={360}
        slotMinutes={15}
        onCreate={({ start }) => setMessage("New event at " + start.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }))}
        onEventClick={(ev) => setMessage("Opened " + ev.title)}
      />
      <p aria-live="polite" className="text-xs text-fg-muted">{message}</p>
    </div>
  )
}`,
    node: <HandlersDemo />,
  },
]
