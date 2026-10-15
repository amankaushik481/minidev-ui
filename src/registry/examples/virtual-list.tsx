"use client"
import * as React from "react"
import { Button } from "@/registry/ui/button"
import { VirtualList, type VirtualListHandle } from "@/registry/ui/virtual-list"
import type { Example } from "./types"

type Customer = { id: string; name: string; plan: "Free" | "Pro" | "Scale"; mrr: number }

const NAMES = ["Northwind", "Acme Robotics", "Globex", "Initech", "Umbrella Health", "Hooli", "Stark Industrial", "Wayne Freight", "Vandelay Imports", "Pied Piper"]
const SUFFIXES = ["Labs", "Ltd", "GmbH", "Inc", "Co"]
const PLANS = ["Free", "Pro", "Scale"] as const

const customers: Customer[] = Array.from({ length: 2000 }, (_, i) => ({
  id: "cus_" + (1000 + i),
  name: NAMES[i % NAMES.length] + " " + SUFFIXES[Math.floor(i / NAMES.length) % SUFFIXES.length],
  plan: PLANS[(i * 7) % 3],
  mrr: (((i * 37) % 90) + 10) * 10,
}))

type Note = { id: string; author: string; text: string }

const AUTHORS = ["Maya Chen", "Theo Okafor", "Priya Raman", "Sam Lowe"]
const TEXTS = [
  "Marked INV-2041 as paid.",
  "Sent a reminder to Northwind about the overdue balance on INV-2038, including the updated bank details.",
  "Deployed lumen-web 4.2.0 to production.",
  "Changed the billing plan to Scale after the finance review. The old plan stays active until the end of the month, then the new seats are billed.",
  "Invited Ada Novak to Finance.",
]

const notes: Note[] = Array.from({ length: 500 }, (_, i) => ({
  id: "note-" + i,
  author: AUTHORS[i % AUTHORS.length],
  text: TEXTS[(i * 3) % TEXTS.length],
}))

function ScrollToDemo() {
  const ref = React.useRef<VirtualListHandle>(null)
  return (
    <div className="flex w-full max-w-2xl flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm" onClick={() => ref.current?.scrollToIndex(0, "start")}>Top</Button>
        <Button variant="outline" size="sm" onClick={() => ref.current?.setActiveIndex(4999)}>Row 5,000</Button>
        <Button variant="outline" size="sm" onClick={() => ref.current?.scrollToIndex(9999, "end")}>Bottom</Button>
      </div>
      <VirtualList ref={ref} height={280} showJump={false} />
    </div>
  )
}

function SelectDemo() {
  const [picked, setPicked] = React.useState<string | null>(null)
  return (
    <div className="flex w-full max-w-2xl flex-col gap-3">
      <VirtualList height={240} title="" showJump={false} showFooter={false} onSelect={(inv) => setPicked(inv.number)} />
      <p className="text-xs text-fg-muted">{picked ? "Selected " + picked : "Click a row, or focus the list and press Enter."}</p>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Custom rows",
    description: "Pass your own items and renderRow; describeRow gives screen readers a plain text version of the active row.",
    code: `type Customer = { id: string; name: string; plan: "Free" | "Pro" | "Scale"; mrr: number }

const NAMES = ["Northwind", "Acme Robotics", "Globex", "Initech", "Umbrella Health", "Hooli", "Stark Industrial", "Wayne Freight", "Vandelay Imports", "Pied Piper"]
const SUFFIXES = ["Labs", "Ltd", "GmbH", "Inc", "Co"]
const PLANS = ["Free", "Pro", "Scale"] as const

const customers: Customer[] = Array.from({ length: 2000 }, (_, i) => ({
  id: "cus_" + (1000 + i),
  name: NAMES[i % NAMES.length] + " " + SUFFIXES[Math.floor(i / NAMES.length) % SUFFIXES.length],
  plan: PLANS[(i * 7) % 3],
  mrr: (((i * 37) % 90) + 10) * 10,
}))

<VirtualList
  items={customers}
  title="Customers"
  height={300}
  renderRow={(c, _i, { active }) => (
    <div className={"flex h-10 items-center gap-3 border-b border-border px-3 text-[0.8125rem] " + (active ? "bg-accent-soft" : "hover:bg-sunken")}>
      <span className="min-w-0 flex-1 truncate text-fg">{c.name}</span>
      <span className="w-12 text-xs text-fg-muted">{c.plan}</span>
      <span className="w-20 text-right text-fg tabular-nums">\${c.mrr}/mo</span>
    </div>
  )}
  describeRow={(c) => c.name + ", " + c.plan + ", $" + c.mrr + " per month"}
/>`,
    node: (
      <VirtualList
        items={customers}
        title="Customers"
        height={300}
        renderRow={(c, _i, { active }) => (
          <div className={"flex h-10 items-center gap-3 border-b border-border px-3 text-[0.8125rem] " + (active ? "bg-accent-soft" : "hover:bg-sunken")}>
            <span className="min-w-0 flex-1 truncate text-fg">{c.name}</span>
            <span className="w-12 text-xs text-fg-muted">{c.plan}</span>
            <span className="w-20 text-right text-fg tabular-nums">${c.mrr}/mo</span>
          </div>
        )}
        describeRow={(c) => c.name + ", " + c.plan + ", $" + c.mrr + " per month"}
      />
    ),
  },
  {
    title: "Scroll to index",
    description: "The ref exposes scrollToIndex with an alignment and setActiveIndex, which also moves the keyboard cursor.",
    code: `function ScrollToDemo() {
  const ref = React.useRef<VirtualListHandle>(null)
  return (
    <div className="flex w-full max-w-2xl flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm" onClick={() => ref.current?.scrollToIndex(0, "start")}>Top</Button>
        <Button variant="outline" size="sm" onClick={() => ref.current?.setActiveIndex(4999)}>Row 5,000</Button>
        <Button variant="outline" size="sm" onClick={() => ref.current?.scrollToIndex(9999, "end")}>Bottom</Button>
      </div>
      <VirtualList ref={ref} height={280} showJump={false} />
    </div>
  )
}`,
    node: <ScrollToDemo />,
  },
  {
    title: "Measured row heights",
    description: "rowHeight=\"auto\" measures every row as it mounts, so rows with wrapping text keep the scroll position honest.",
    code: `type Note = { id: string; author: string; text: string }

const AUTHORS = ["Maya Chen", "Theo Okafor", "Priya Raman", "Sam Lowe"]
const TEXTS = [
  "Marked INV-2041 as paid.",
  "Sent a reminder to Northwind about the overdue balance on INV-2038, including the updated bank details.",
  "Deployed lumen-web 4.2.0 to production.",
  "Changed the billing plan to Scale after the finance review. The old plan stays active until the end of the month, then the new seats are billed.",
  "Invited Ada Novak to Finance.",
]

const notes: Note[] = Array.from({ length: 500 }, (_, i) => ({
  id: "note-" + i,
  author: AUTHORS[i % AUTHORS.length],
  text: TEXTS[(i * 3) % TEXTS.length],
}))

<VirtualList
  items={notes}
  title="Activity"
  rowHeight="auto"
  estimatedRowHeight={56}
  height={320}
  showJump={false}
  renderRow={(n, _i, { active }) => (
    <div className={"border-b border-border px-3 py-2.5 text-[0.8125rem] " + (active ? "bg-accent-soft" : "hover:bg-sunken")}>
      <p className="font-medium text-fg">{n.author}</p>
      <p className="text-fg-muted">{n.text}</p>
    </div>
  )}
  describeRow={(n) => n.author + ": " + n.text}
/>`,
    node: (
      <VirtualList
        items={notes}
        title="Activity"
        rowHeight="auto"
        estimatedRowHeight={56}
        height={320}
        showJump={false}
        renderRow={(n, _i, { active }) => (
          <div className={"border-b border-border px-3 py-2.5 text-[0.8125rem] " + (active ? "bg-accent-soft" : "hover:bg-sunken")}>
            <p className="font-medium text-fg">{n.author}</p>
            <p className="text-fg-muted">{n.text}</p>
          </div>
        )}
        describeRow={(n) => n.author + ": " + n.text}
      />
    ),
  },
  {
    title: "Select handler",
    description: "onSelect fires on click, Enter or Space; an empty title plus showJump and showFooter off leaves only the rows.",
    code: `function SelectDemo() {
  const [picked, setPicked] = React.useState<string | null>(null)
  return (
    <div className="flex w-full max-w-2xl flex-col gap-3">
      <VirtualList height={240} title="" showJump={false} showFooter={false} onSelect={(inv) => setPicked(inv.number)} />
      <p className="text-xs text-fg-muted">{picked ? "Selected " + picked : "Click a row, or focus the list and press Enter."}</p>
    </div>
  )
}`,
    node: <SelectDemo />,
  },
]
