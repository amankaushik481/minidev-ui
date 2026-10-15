"use client"
import * as React from "react"
import { Button } from "@/registry/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"
import type { Example } from "./types"

const panel = "rounded-xl border border-border bg-surface p-4 leading-[1.6] text-fg-muted"

function ControlledDemo() {
  const steps = ["details", "members", "billing"]
  const [tab, setTab] = React.useState("details")
  const index = steps.indexOf(tab)
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>
        <TabsContent value="details" className={panel}>Workspace name, URL and logo.</TabsContent>
        <TabsContent value="members" className={panel}>Invite Maya, Theo and Priya, and pick their roles.</TabsContent>
        <TabsContent value="billing" className={panel}>Choose a plan and add a payment method.</TabsContent>
      </Tabs>
      <div className="flex justify-end gap-2">
        <Button variant="outline" size="sm" disabled={index === 0} onClick={() => setTab(steps[index - 1])}>Back</Button>
        <Button size="sm" disabled={index === steps.length - 1} onClick={() => setTab(steps[index + 1])}>Next</Button>
      </div>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "With panels",
    description: "Each TabsContent matches a trigger by value; only the active panel is mounted.",
    code: `const panel = "rounded-xl border border-border bg-surface p-4 leading-[1.6] text-fg-muted"

<Tabs defaultValue="overview" className="w-full max-w-md">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="invoices">Invoices</TabsTrigger>
    <TabsTrigger value="activity">Activity</TabsTrigger>
  </TabsList>
  <TabsContent value="overview" className={panel}>Northwind has been a customer since March 2024 and pays by bank transfer within 14 days.</TabsContent>
  <TabsContent value="invoices" className={panel}>3 open invoices totalling $21,450. INV-2041 is due on Friday.</TabsContent>
  <TabsContent value="activity" className={panel}>Maya Chen sent a reminder for INV-2038 yesterday at 09:41.</TabsContent>
</Tabs>`,
    node: (
      <Tabs defaultValue="overview" className="w-full max-w-md">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className={panel}>Northwind has been a customer since March 2024 and pays by bank transfer within 14 days.</TabsContent>
        <TabsContent value="invoices" className={panel}>3 open invoices totalling $21,450. INV-2041 is due on Friday.</TabsContent>
        <TabsContent value="activity" className={panel}>Maya Chen sent a reminder for INV-2038 yesterday at 09:41.</TabsContent>
      </Tabs>
    ),
  },
  {
    title: "Line variant with badges",
    description: "variant=\"line\" swaps the thumb for an accent underline; badge adds a count and disabled greys a tab out.",
    code: `<Tabs defaultValue="open" className="w-full max-w-md">
  <TabsList variant="line">
    <TabsTrigger value="open" badge={12}>Open</TabsTrigger>
    <TabsTrigger value="paid" badge={248}>Paid</TabsTrigger>
    <TabsTrigger value="overdue" badge={3}>Overdue</TabsTrigger>
    <TabsTrigger value="void" disabled>Void</TabsTrigger>
  </TabsList>
  <TabsContent value="open" className="pt-1 text-fg-muted">12 invoices waiting on payment, $48,200 in total.</TabsContent>
  <TabsContent value="paid" className="pt-1 text-fg-muted">248 invoices paid this year.</TabsContent>
  <TabsContent value="overdue" className="pt-1 text-fg-muted">3 invoices past their due date. Reminders go out daily.</TabsContent>
</Tabs>`,
    node: (
      <Tabs defaultValue="open" className="w-full max-w-md">
        <TabsList variant="line">
          <TabsTrigger value="open" badge={12}>Open</TabsTrigger>
          <TabsTrigger value="paid" badge={248}>Paid</TabsTrigger>
          <TabsTrigger value="overdue" badge={3}>Overdue</TabsTrigger>
          <TabsTrigger value="void" disabled>Void</TabsTrigger>
        </TabsList>
        <TabsContent value="open" className="pt-1 text-fg-muted">12 invoices waiting on payment, $48,200 in total.</TabsContent>
        <TabsContent value="paid" className="pt-1 text-fg-muted">248 invoices paid this year.</TabsContent>
        <TabsContent value="overdue" className="pt-1 text-fg-muted">3 invoices past their due date. Reminders go out daily.</TabsContent>
      </Tabs>
    ),
  },
  {
    title: "Vertical",
    description: "orientation=\"vertical\" stacks the list beside the panel and moves the underline to the right edge.",
    code: `<Tabs defaultValue="general" orientation="vertical" className="w-full max-w-md">
  <TabsList variant="line" className="w-36 shrink-0">
    <TabsTrigger value="general">General</TabsTrigger>
    <TabsTrigger value="billing">Billing</TabsTrigger>
    <TabsTrigger value="members">Members</TabsTrigger>
    <TabsTrigger value="api">API keys</TabsTrigger>
  </TabsList>
  <TabsContent value="general" className="pl-4 text-fg-muted">Workspace name, URL, logo and default currency.</TabsContent>
  <TabsContent value="billing" className="pl-4 text-fg-muted">Scale plan, billed yearly to Northwind Traders.</TabsContent>
  <TabsContent value="members" className="pl-4 text-fg-muted">4 members and 2 pending invites.</TabsContent>
  <TabsContent value="api" className="pl-4 text-fg-muted">2 live keys. The last one was used 4 minutes ago.</TabsContent>
</Tabs>`,
    node: (
      <Tabs defaultValue="general" orientation="vertical" className="w-full max-w-md">
        <TabsList variant="line" className="w-36 shrink-0">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="api">API keys</TabsTrigger>
        </TabsList>
        <TabsContent value="general" className="pl-4 text-fg-muted">Workspace name, URL, logo and default currency.</TabsContent>
        <TabsContent value="billing" className="pl-4 text-fg-muted">Scale plan, billed yearly to Northwind Traders.</TabsContent>
        <TabsContent value="members" className="pl-4 text-fg-muted">4 members and 2 pending invites.</TabsContent>
        <TabsContent value="api" className="pl-4 text-fg-muted">2 live keys. The last one was used 4 minutes ago.</TabsContent>
      </Tabs>
    ),
  },
  {
    title: "Controlled value",
    description: "Hold the value in state to drive the tabs from outside, here with Back and Next buttons for a setup flow.",
    code: `// panel is the class string from the "With panels" example.
function ControlledDemo() {
  const steps = ["details", "members", "billing"]
  const [tab, setTab] = React.useState("details")
  const index = steps.indexOf(tab)
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>
        <TabsContent value="details" className={panel}>Workspace name, URL and logo.</TabsContent>
        <TabsContent value="members" className={panel}>Invite Maya, Theo and Priya, and pick their roles.</TabsContent>
        <TabsContent value="billing" className={panel}>Choose a plan and add a payment method.</TabsContent>
      </Tabs>
      <div className="flex justify-end gap-2">
        <Button variant="outline" size="sm" disabled={index === 0} onClick={() => setTab(steps[index - 1])}>Back</Button>
        <Button size="sm" disabled={index === steps.length - 1} onClick={() => setTab(steps[index + 1])}>Next</Button>
      </div>
    </div>
  )
}`,
    node: <ControlledDemo />,
  },
]
