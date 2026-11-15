"use client"
import * as React from "react"
import { Button } from "@/registry/ui/button"
import { LoadingTable } from "@/registry/ui/loading-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/registry/ui/table"
import type { Example } from "./types"

const teamMembers = [
  { name: "Maya Chen", role: "Owner", seen: "Today" },
  { name: "Theo Okafor", role: "Admin", seen: "Yesterday" },
  { name: "Priya Raman", role: "Member", seen: "Nov 9" },
]

function MembersLoading() {
  const [loading, setLoading] = React.useState(true)
  React.useEffect(() => {
    if (!loading) return
    const t = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(t)
  }, [loading])
  return (
    <div className="flex w-full max-w-lg flex-col gap-3">
      <Button size="sm" variant="outline" className="self-start" onClick={() => setLoading(true)}>
        Reload
      </Button>
      {loading ? (
        <LoadingTable rows={3} cols={3} label="Loading members" />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Last seen</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teamMembers.map((m) => (
              <TableRow key={m.name}>
                <TableCell>{m.name}</TableCell>
                <TableCell className="text-fg-muted">{m.role}</TableCell>
                <TableCell className="text-fg-muted">{m.seen}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Matching the real table",
    description: "Five columns and four rows, with a label that names what is loading.",
    code: `<LoadingTable rows={4} cols={5} label="Loading invoices" />`,
    node: (
      <LoadingTable rows={4} cols={5} label="Loading invoices" />
    ),
  },
  {
    title: "Swapping to the loaded table",
    description: "Show the skeleton with the same shape as the table it replaces, then the rows.",
    code: `const teamMembers = [
  { name: "Maya Chen", role: "Owner", seen: "Today" },
  { name: "Theo Okafor", role: "Admin", seen: "Yesterday" },
  { name: "Priya Raman", role: "Member", seen: "Nov 9" },
]

function MembersLoading() {
  const [loading, setLoading] = React.useState(true)
  React.useEffect(() => {
    if (!loading) return
    const t = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(t)
  }, [loading])
  return (
    <div className="flex w-full max-w-lg flex-col gap-3">
      <Button size="sm" variant="outline" className="self-start" onClick={() => setLoading(true)}>
        Reload
      </Button>
      {loading ? (
        <LoadingTable rows={3} cols={3} label="Loading members" />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Last seen</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teamMembers.map((m) => (
              <TableRow key={m.name}>
                <TableCell>{m.name}</TableCell>
                <TableCell className="text-fg-muted">{m.role}</TableCell>
                <TableCell className="text-fg-muted">{m.seen}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}`,
    node: <MembersLoading />,
  },
]
