"use client"
import * as React from "react"
import { BulkUserImport } from "@/registry/ui/bulk-user-import"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/registry/ui/card"
import type { Example } from "./types"

function ParseDemo() {
  const [note, setNote] = React.useState("Drop a CSV, then press Import users.")
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <BulkUserImport
        onImport={async (files) => {
          const text = await Array.from(files)[0].text()
          const rows = text.split(/\r?\n/).filter((line) => line.includes("@"))
          setNote(`Found ${rows.length} ${rows.length === 1 ? "user" : "users"}. Send them to your invite endpoint.`)
        }}
      />
      <p className="text-xs text-fg-muted" aria-live="polite">{note}</p>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Read the file on import",
    description: "onImport gets the CSV as a File; reading, validating and inviting are yours. Here the rows with an email are counted.",
    code: `function ParseDemo() {
  const [note, setNote] = React.useState("Drop a CSV, then press Import users.")
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <BulkUserImport
        onImport={async (files) => {
          const text = await Array.from(files)[0].text()
          const rows = text.split(/\\r?\\n/).filter((line) => line.includes("@"))
          setNote(\`Found \${rows.length} \${rows.length === 1 ? "user" : "users"}. Send them to your invite endpoint.\`)
        }}
      />
      <p className="text-xs text-fg-muted" aria-live="polite">{note}</p>
    </div>
  )
}`,
    node: <ParseDemo />,
  },
  {
    title: "In a members card",
    description: "Give the panel a heading that says what happens to the people in the file.",
    code: `<Card className="w-full max-w-md">
  <CardHeader>
    <CardTitle>Import members</CardTitle>
    <CardDescription>Everyone in the file gets an invite email to the Northwind workspace.</CardDescription>
  </CardHeader>
  <CardContent>
    <BulkUserImport />
  </CardContent>
</Card>`,
    node: (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Import members</CardTitle>
          <CardDescription>Everyone in the file gets an invite email to the Northwind workspace.</CardDescription>
        </CardHeader>
        <CardContent>
          <BulkUserImport />
        </CardContent>
      </Card>
    ),
  },
]
