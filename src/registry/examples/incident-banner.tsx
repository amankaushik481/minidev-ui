"use client"
import * as React from "react"
import { IncidentBanner } from "@/registry/ui/incident-banner"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Outage above a dashboard",
    description: "Render it as the first child of the app frame while the incident is open; it is a polite status for every severity.",
    code: `<div className="w-full max-w-2xl overflow-hidden rounded-xl border border-border bg-bg">
  <IncidentBanner
    severity="critical"
    title="Card payments are failing in eu-west"
    href="https://status.example.com/incidents/218"
    linkLabel="Follow updates"
  />
  <div className="space-y-2 p-4">
    <p className="text-sm font-medium text-fg">Payouts</p>
    <p className="text-sm text-fg-muted">Payouts scheduled for today will run once card payments recover.</p>
  </div>
</div>`,
    node: (
      <div className="w-full max-w-2xl overflow-hidden rounded-xl border border-border bg-bg">
        <IncidentBanner
          severity="critical"
          title="Card payments are failing in eu-west"
          href="https://status.example.com/incidents/218"
          linkLabel="Follow updates"
        />
        <div className="space-y-2 p-4">
          <p className="text-sm font-medium text-fg">Payouts</p>
          <p className="text-sm text-fg-muted">Payouts scheduled for today will run once card payments recover.</p>
        </div>
      </div>
    ),
  },
  {
    title: "Minor notice with no status page",
    description: "href defaults to \"#\", so pass an empty string to hide the link.",
    code: `<IncidentBanner
  severity="minor"
  title="Bank sync is running about 10 minutes behind"
  href=""
  className="w-full max-w-2xl rounded-xl border"
/>`,
    node: (
      <IncidentBanner
        severity="minor"
        title="Bank sync is running about 10 minutes behind"
        href=""
        className="w-full max-w-2xl rounded-xl border"
      />
    ),
  },
]
