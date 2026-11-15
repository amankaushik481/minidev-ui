"use client"
import * as React from "react"
import { Button } from "@/registry/ui/button"
import { PermissionDenied } from "@/registry/ui/permission-denied"
import type { Example } from "./types"

function RequestAccess() {
  const [sent, setSent] = React.useState(false)
  return (
    <PermissionDenied
      className="w-full max-w-md"
      title="You can't open Billing"
      description="Billing needs the Billing admin role. Priya Raman manages roles in the Northwind workspace."
      actions={
        <>
          <Button size="sm" disabled={sent} focusableWhenDisabled onClick={() => setSent(true)}>
            {sent ? "Request sent to Priya" : "Request access"}
          </Button>
          <Button size="sm" variant="outline" render={<a href="#dashboard" />}>Back to dashboard</Button>
        </>
      }
    />
  )
}

export const examples: Example[] = [
  {
    title: "Request access",
    description: "Name the role and who grants it. focusableWhenDisabled keeps focus on the button after the request is sent.",
    code: `function RequestAccess() {
  const [sent, setSent] = React.useState(false)
  return (
    <PermissionDenied
      className="w-full max-w-md"
      title="You can't open Billing"
      description="Billing needs the Billing admin role. Priya Raman manages roles in the Northwind workspace."
      actions={
        <>
          <Button size="sm" disabled={sent} focusableWhenDisabled onClick={() => setSent(true)}>
            {sent ? "Request sent to Priya" : "Request access"}
          </Button>
          <Button size="sm" variant="outline" render={<a href="#dashboard" />}>Back to dashboard</Button>
        </>
      }
    />
  )
}`,
    node: <RequestAccess />,
  },
  {
    title: "Wrong workspace",
    description: "When the user is signed in to another workspace, offer the switch as the only action.",
    code: `<PermissionDenied
  className="w-full max-w-md"
  title="This report belongs to Halcyon Labs"
  description="You are signed in to Northwind. Switch workspace to open it."
  actions={<Button size="sm">Switch to Halcyon Labs</Button>}
/>`,
    node: (
      <PermissionDenied
        className="w-full max-w-md"
        title="This report belongs to Halcyon Labs"
        description="You are signed in to Northwind. Switch workspace to open it."
        actions={<Button size="sm">Switch to Halcyon Labs</Button>}
      />
    ),
  },
]
