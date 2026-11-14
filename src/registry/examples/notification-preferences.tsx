"use client"
import * as React from "react"
import { NotificationPreferences } from "@/registry/ui/notification-preferences"
import { Button } from "@/registry/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/registry/ui/card"
import type { Example } from "./types"

function SettingsCardDemo() {
  const [changes, setChanges] = React.useState<Record<string, boolean>>({})
  const count = Object.keys(changes).length
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>Choose what Lumen emails to maya@northwind.io.</CardDescription>
      </CardHeader>
      <CardContent>
        <NotificationPreferences
          items={[
            { id: "invoice-paid", label: "Invoice paid", defaultChecked: true },
            { id: "invoice-overdue", label: "Invoice overdue", defaultChecked: true },
            { id: "payout-sent", label: "Payout sent" },
            { id: "weekly-summary", label: "Weekly revenue summary", defaultChecked: true },
          ]}
          onCheckedChange={(id, checked) => setChanges((c) => ({ ...c, [id]: checked }))}
        />
      </CardContent>
      <CardFooter className="justify-between">
        <p aria-live="polite" className="text-xs text-fg-muted tabular-nums">{count ? `${count} unsaved` : "All saved"}</p>
        <Button size="sm" disabled={!count} onClick={() => setChanges({})}>Save preferences</Button>
      </CardFooter>
    </Card>
  )
}

export const examples: Example[] = [
  {
    title: "Your own channels",
    description: "items sets the rows in order; id is what onCheckedChange hands back and defaultChecked is each switch's starting state.",
    code: `<NotificationPreferences
  className="w-full max-w-xs"
  items={[
    { id: "deploy-failed", label: "Failed deploys", defaultChecked: true },
    { id: "new-teammate", label: "New teammate joins" },
    { id: "security", label: "Security alerts", defaultChecked: true },
  ]}
/>`,
    node: (
      <NotificationPreferences
        className="w-full max-w-xs"
        items={[
          { id: "deploy-failed", label: "Failed deploys", defaultChecked: true },
          { id: "new-teammate", label: "New teammate joins" },
          { id: "security", label: "Security alerts", defaultChecked: true },
        ]}
      />
    ),
  },
  {
    title: "Settings card with save",
    description: "The switches are uncontrolled, so collect changes from onCheckedChange and enable Save only once something moved.",
    code: `function SettingsCardDemo() {
  const [changes, setChanges] = React.useState<Record<string, boolean>>({})
  const count = Object.keys(changes).length
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>Choose what Lumen emails to maya@northwind.io.</CardDescription>
      </CardHeader>
      <CardContent>
        <NotificationPreferences
          items={[
            { id: "invoice-paid", label: "Invoice paid", defaultChecked: true },
            { id: "invoice-overdue", label: "Invoice overdue", defaultChecked: true },
            { id: "payout-sent", label: "Payout sent" },
            { id: "weekly-summary", label: "Weekly revenue summary", defaultChecked: true },
          ]}
          onCheckedChange={(id, checked) => setChanges((c) => ({ ...c, [id]: checked }))}
        />
      </CardContent>
      <CardFooter className="justify-between">
        <p aria-live="polite" className="text-xs text-fg-muted tabular-nums">{count ? \`\${count} unsaved\` : "All saved"}</p>
        <Button size="sm" disabled={!count} onClick={() => setChanges({})}>Save preferences</Button>
      </CardFooter>
    </Card>
  )
}`,
    node: <SettingsCardDemo />,
  },
]
