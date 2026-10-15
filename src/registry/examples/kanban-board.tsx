import { KanbanBoard, type KanbanColumn } from "@/registry/ui/kanban-board"
import type { Example } from "./types"

const pipeline: KanbanColumn[] = [
  {
    id: "lead",
    title: "Lead",
    cards: [
      { id: "d1", title: "Northwind Labs", meta: "$12,400 · Maya Chen" },
      { id: "d2", title: "Globex", meta: "$3,200 · Sam Lowe" },
    ],
  },
  { id: "qualified", title: "Qualified", cards: [{ id: "d3", title: "Initech", meta: "$8,900 · Theo Okafor" }] },
  {
    id: "proposal",
    title: "Proposal sent",
    cards: [
      { id: "d4", title: "Umbrella Health", meta: "$21,750 · Priya Raman" },
      { id: "d5", title: "Wayne Freight", meta: "$6,300 · Maya Chen" },
    ],
  },
  { id: "won", title: "Won", cards: [{ id: "d6", title: "Stark Industrial", meta: "Closed Oct 9" }] },
]

const sprint: KanbanColumn[] = [
  {
    id: "todo",
    title: "To do",
    cards: [
      { id: "s1", title: "Rate limit the public API", meta: "LUM-430" },
      { id: "s2", title: "Add SEPA as a payment method", meta: "LUM-431 · Priya Raman" },
    ],
  },
  { id: "doing", title: "In progress", cards: [{ id: "s3", title: "Invoice PDF in customer locale", meta: "LUM-425 · Maya Chen" }] },
  { id: "blocked", title: "Blocked", cards: [] },
  { id: "done", title: "Done", cards: [{ id: "s4", title: "Nightly payout reconciliation", meta: "Shipped Oct 13" }] },
]

const review: KanbanColumn[] = [
  {
    id: "review",
    title: "Needs review",
    cards: [
      { id: "r1", title: "Refund for INV-2036", meta: "Requested by Hooli · $1,450" },
      { id: "r2", title: "Credit note for Globex", meta: "Sam Lowe · $890" },
    ],
  },
  { id: "approved", title: "Approved", cards: [{ id: "r3", title: "Payout to Northwind Labs", meta: "Approved by Priya Raman" }] },
]

export const examples: Example[] = [
  {
    title: "Sales pipeline",
    description: "Columns carry their own cards; meta is a short second line for an owner, a value or a date.",
    code: `const pipeline: KanbanColumn[] = [
  {
    id: "lead",
    title: "Lead",
    cards: [
      { id: "d1", title: "Northwind Labs", meta: "$12,400 · Maya Chen" },
      { id: "d2", title: "Globex", meta: "$3,200 · Sam Lowe" },
    ],
  },
  { id: "qualified", title: "Qualified", cards: [{ id: "d3", title: "Initech", meta: "$8,900 · Theo Okafor" }] },
  {
    id: "proposal",
    title: "Proposal sent",
    cards: [
      { id: "d4", title: "Umbrella Health", meta: "$21,750 · Priya Raman" },
      { id: "d5", title: "Wayne Freight", meta: "$6,300 · Maya Chen" },
    ],
  },
  { id: "won", title: "Won", cards: [{ id: "d6", title: "Stark Industrial", meta: "Closed Oct 9" }] },
]

<KanbanBoard columns={pipeline} />`,
    node: <KanbanBoard columns={pipeline} />,
  },
  {
    title: "Empty column",
    description: "A column with no cards still renders its heading and a zero count, so the board shape never changes.",
    code: `const sprint: KanbanColumn[] = [
  {
    id: "todo",
    title: "To do",
    cards: [
      { id: "s1", title: "Rate limit the public API", meta: "LUM-430" },
      { id: "s2", title: "Add SEPA as a payment method", meta: "LUM-431 · Priya Raman" },
    ],
  },
  { id: "doing", title: "In progress", cards: [{ id: "s3", title: "Invoice PDF in customer locale", meta: "LUM-425 · Maya Chen" }] },
  { id: "blocked", title: "Blocked", cards: [] },
  { id: "done", title: "Done", cards: [{ id: "s4", title: "Nightly payout reconciliation", meta: "Shipped Oct 13" }] },
]

<KanbanBoard columns={sprint} />`,
    node: <KanbanBoard columns={sprint} />,
  },
  {
    title: "Two columns",
    description: "A short board fits without scrolling; the board only scrolls sideways once its columns outgrow the container.",
    code: `const review: KanbanColumn[] = [
  {
    id: "review",
    title: "Needs review",
    cards: [
      { id: "r1", title: "Refund for INV-2036", meta: "Requested by Hooli · $1,450" },
      { id: "r2", title: "Credit note for Globex", meta: "Sam Lowe · $890" },
    ],
  },
  { id: "approved", title: "Approved", cards: [{ id: "r3", title: "Payout to Northwind Labs", meta: "Approved by Priya Raman" }] },
]

<KanbanBoard columns={review} />`,
    node: <KanbanBoard columns={review} />,
  },
]
