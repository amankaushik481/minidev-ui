"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/registry/ui/card"
import { Inset } from "@/registry/ui/inset"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Code sample in a card",
    description: "p-0 md:p-0 removes both padding steps so the pre can scroll edge to edge.",
    code: `<Card className="w-full max-w-md">
  <CardHeader>
    <CardTitle>Install the CLI</CardTitle>
    <CardDescription>Then sign in with your workspace account.</CardDescription>
  </CardHeader>
  <CardContent>
    <Inset className="p-0 md:p-0">
      <pre tabIndex={0} className="overflow-x-auto p-3 font-mono text-xs text-fg">{"npm install -g @lumen/cli\\nlumen login"}</pre>
    </Inset>
  </CardContent>
</Card>`,
    node: (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Install the CLI</CardTitle>
          <CardDescription>Then sign in with your workspace account.</CardDescription>
        </CardHeader>
        <CardContent>
          <Inset className="p-0 md:p-0">
            <pre tabIndex={0} className="overflow-x-auto p-3 font-mono text-xs text-fg">{"npm install -g @lumen/cli\nlumen login"}</pre>
          </Inset>
        </CardContent>
      </Card>
    ),
  },
  {
    title: "Read-only note",
    description: "A sunken well under a heading sets secondary information apart from the settings around it.",
    code: `<div className="w-full max-w-md space-y-3">
  <p className="text-sm font-medium text-fg">Payouts</p>
  <Inset>
    <p className="text-sm text-fg-muted">No payouts yet. Your first one is sent 7 days after the first paid invoice.</p>
  </Inset>
</div>`,
    node: (
      <div className="w-full max-w-md space-y-3">
        <p className="text-sm font-medium text-fg">Payouts</p>
        <Inset>
          <p className="text-sm text-fg-muted">No payouts yet. Your first one is sent 7 days after the first paid invoice.</p>
        </Inset>
      </div>
    ),
  },
]
