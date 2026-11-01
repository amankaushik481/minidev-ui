import { StatsCounter } from "@/registry/premium/stats-counter"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Stats row",
    description: "Three counters in a grid start together when the row scrolls into view and settle on their values.",
    code: `<div className="grid w-full max-w-2xl gap-4 sm:grid-cols-3">
  <StatsCounter value={4200} label="finance teams on Lumen" />
  <StatsCounter value={186000} label="invoices paid last month" />
  <StatsCounter value={9} label="days sooner paid on average" />
</div>`,
    node: (
      <div className="grid w-full max-w-2xl gap-4 sm:grid-cols-3">
        <StatsCounter value={4200} label="finance teams on Lumen" />
        <StatsCounter value={186000} label="invoices paid last month" />
        <StatsCounter value={9} label="days sooner paid on average" />
      </div>
    ),
  },
  {
    title: "Borderless",
    description: "Remove the card chrome with className to drop the numbers straight into a hero or a dark section.",
    code: `<div className="flex flex-wrap items-start justify-center gap-10">
  <StatsCounter value={212} label="invoices cleared on launch day" className="border-0 bg-transparent p-0 shadow-none" />
  <StatsCounter value={4} label="left to check by hand" className="border-0 bg-transparent p-0 shadow-none" />
</div>`,
    node: (
      <div className="flex flex-wrap items-start justify-center gap-10">
        <StatsCounter value={212} label="invoices cleared on launch day" className="border-0 bg-transparent p-0 shadow-none" />
        <StatsCounter value={4} label="left to check by hand" className="border-0 bg-transparent p-0 shadow-none" />
      </div>
    ),
  },
  {
    title: "Inside a report card",
    description: "Left aligned on the sunken surface, a two by two grid of counters makes a quick quarter summary.",
    code: `<div className="w-full max-w-md rounded-2xl border border-border bg-surface p-5 shadow-raised">
  <p className="text-sm font-medium text-fg">Northwind, Q3 2026</p>
  <div className="mt-4 grid grid-cols-2 gap-3">
    <StatsCounter value={1284} label="invoices sent" className="bg-sunken text-left shadow-none" />
    <StatsCounter value={1203} label="paid on time" className="bg-sunken text-left shadow-none" />
    <StatsCounter value={61} label="reminders sent" className="bg-sunken text-left shadow-none" />
    <StatsCounter value={20} label="still open" className="bg-sunken text-left shadow-none" />
  </div>
</div>`,
    node: (
      <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-5 shadow-raised">
        <p className="text-sm font-medium text-fg">Northwind, Q3 2026</p>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <StatsCounter value={1284} label="invoices sent" className="bg-sunken text-left shadow-none" />
          <StatsCounter value={1203} label="paid on time" className="bg-sunken text-left shadow-none" />
          <StatsCounter value={61} label="reminders sent" className="bg-sunken text-left shadow-none" />
          <StatsCounter value={20} label="still open" className="bg-sunken text-left shadow-none" />
        </div>
      </div>
    ),
  },
]
