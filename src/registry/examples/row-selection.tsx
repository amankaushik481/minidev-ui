"use client"
import * as React from "react"
import { RowSelection } from "@/registry/ui/row-selection"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/registry/ui/table"
import type { Example } from "./types"

const workspaceMembers = [
  { id: "u1", name: "Maya Chen", role: "Owner", locked: true },
  { id: "u2", name: "Theo Okafor", role: "Admin", locked: false },
  { id: "u3", name: "Priya Raman", role: "Member", locked: false },
  { id: "u4", name: "Sam Lowe", role: "Member", locked: false },
]

function SelectMembers() {
  const [selected, setSelected] = React.useState<Set<string>>(new Set(["u3"]))
  const selectable = workspaceMembers.filter((m) => !m.locked)
  const all = selectable.every((m) => selected.has(m.id))
  const some = !all && selectable.some((m) => selected.has(m.id))
  const toggle = (id: string, on: boolean) =>
    setSelected((prev) => {
      const next = new Set(prev)
      if (on) next.add(id)
      else next.delete(id)
      return next
    })
  return (
    <div className="w-full max-w-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10">
              <RowSelection
                checked={all}
                indeterminate={some}
                onCheckedChange={(on) => setSelected(on ? new Set(selectable.map((m) => m.id)) : new Set())}
                aria-label="Select all members"
              />
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {workspaceMembers.map((m) => (
            <TableRow key={m.id} data-selected={selected.has(m.id) || undefined}>
              <TableCell>
                <RowSelection checked={selected.has(m.id)} disabled={m.locked} onCheckedChange={(on) => toggle(m.id, on)} aria-label={"Select " + m.name} />
              </TableCell>
              <TableCell>{m.name}</TableCell>
              <TableCell className="text-fg-muted">{m.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <p className="mt-2 text-xs text-fg-muted">{selected.size} selected. The owner cannot be removed, so that row is locked.</p>
    </div>
  )
}

const recipients = [
  { id: "finance", name: "Finance team", detail: "4 people" },
  { id: "ops", name: "Operations", detail: "6 people" },
  { id: "board", name: "Board members", detail: "3 people" },
]

function ReportRecipients() {
  const [picked, setPicked] = React.useState<string[]>(["finance"])
  return (
    <ul className="w-full max-w-sm divide-y divide-border rounded-xl border border-border bg-surface">
      {recipients.map((r) => (
        <li key={r.id} className="flex items-center gap-3 px-3 py-2.5">
          <RowSelection
            checked={picked.includes(r.id)}
            onCheckedChange={(on) => setPicked((p) => (on ? [...p, r.id] : p.filter((x) => x !== r.id)))}
            aria-label={"Send the report to " + r.name}
          />
          <span className="flex-1 text-sm text-fg">{r.name}</span>
          <span className="text-xs text-fg-muted">{r.detail}</span>
        </li>
      ))}
    </ul>
  )
}

export const examples: Example[] = [
  {
    title: "Select all with a locked row",
    description: "The header shows the dash while only some rows are selected; the owner row is disabled.",
    code: `const workspaceMembers = [
  { id: "u1", name: "Maya Chen", role: "Owner", locked: true },
  { id: "u2", name: "Theo Okafor", role: "Admin", locked: false },
  { id: "u3", name: "Priya Raman", role: "Member", locked: false },
  { id: "u4", name: "Sam Lowe", role: "Member", locked: false },
]

function SelectMembers() {
  const [selected, setSelected] = React.useState<Set<string>>(new Set(["u3"]))
  const selectable = workspaceMembers.filter((m) => !m.locked)
  const all = selectable.every((m) => selected.has(m.id))
  const some = !all && selectable.some((m) => selected.has(m.id))
  const toggle = (id: string, on: boolean) =>
    setSelected((prev) => {
      const next = new Set(prev)
      if (on) next.add(id)
      else next.delete(id)
      return next
    })
  return (
    <div className="w-full max-w-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10">
              <RowSelection
                checked={all}
                indeterminate={some}
                onCheckedChange={(on) => setSelected(on ? new Set(selectable.map((m) => m.id)) : new Set())}
                aria-label="Select all members"
              />
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {workspaceMembers.map((m) => (
            <TableRow key={m.id} data-selected={selected.has(m.id) || undefined}>
              <TableCell>
                <RowSelection checked={selected.has(m.id)} disabled={m.locked} onCheckedChange={(on) => toggle(m.id, on)} aria-label={"Select " + m.name} />
              </TableCell>
              <TableCell>{m.name}</TableCell>
              <TableCell className="text-fg-muted">{m.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <p className="mt-2 text-xs text-fg-muted">{selected.size} selected. The owner cannot be removed, so that row is locked.</p>
    </div>
  )
}`,
    node: <SelectMembers />,
  },
  {
    title: "In a list, not a table",
    description: "The same checkbox works for a card list, such as picking who gets a report.",
    code: `const recipients = [
  { id: "finance", name: "Finance team", detail: "4 people" },
  { id: "ops", name: "Operations", detail: "6 people" },
  { id: "board", name: "Board members", detail: "3 people" },
]

function ReportRecipients() {
  const [picked, setPicked] = React.useState<string[]>(["finance"])
  return (
    <ul className="w-full max-w-sm divide-y divide-border rounded-xl border border-border bg-surface">
      {recipients.map((r) => (
        <li key={r.id} className="flex items-center gap-3 px-3 py-2.5">
          <RowSelection
            checked={picked.includes(r.id)}
            onCheckedChange={(on) => setPicked((p) => (on ? [...p, r.id] : p.filter((x) => x !== r.id)))}
            aria-label={"Send the report to " + r.name}
          />
          <span className="flex-1 text-sm text-fg">{r.name}</span>
          <span className="text-xs text-fg-muted">{r.detail}</span>
        </li>
      ))}
    </ul>
  )
}`,
    node: <ReportRecipients />,
  },
]
