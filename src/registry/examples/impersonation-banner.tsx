"use client"
import * as React from "react"
import { Button } from "@/registry/ui/button"
import { ImpersonationBanner } from "@/registry/ui/impersonation-banner"
import type { Example } from "./types"

function SupportSession() {
  const [viewing, setViewing] = React.useState<string | null>("sam@northwind.com")
  return (
    <div className="w-full max-w-2xl overflow-hidden rounded-xl border border-border bg-bg">
      {viewing ? <ImpersonationBanner user={viewing} onExit={() => setViewing(null)} exitLabel="Exit to admin" /> : null}
      <div className="flex items-center justify-between gap-3 p-4 text-sm text-fg-muted">
        {viewing ? "Northwind Traders · Invoices" : "Admin · Support queue"}
        {viewing ? null : (
          <Button size="sm" variant="outline" onClick={() => setViewing("sam@northwind.com")}>
            View as Sam
          </Button>
        )}
      </div>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Start and end a session",
    description: "Render the banner only while impersonating; onExit is where you end the session on the server.",
    code: `function SupportSession() {
  const [viewing, setViewing] = React.useState<string | null>("sam@northwind.com")
  return (
    <div className="w-full max-w-2xl overflow-hidden rounded-xl border border-border bg-bg">
      {viewing ? <ImpersonationBanner user={viewing} onExit={() => setViewing(null)} exitLabel="Exit to admin" /> : null}
      <div className="flex items-center justify-between gap-3 p-4 text-sm text-fg-muted">
        {viewing ? "Northwind Traders · Invoices" : "Admin · Support queue"}
        {viewing ? null : (
          <Button size="sm" variant="outline" onClick={() => setViewing("sam@northwind.com")}>
            View as Sam
          </Button>
        )}
      </div>
    </div>
  )
}`,
    node: <SupportSession />,
  },
  {
    title: "Tinted and pinned",
    description: "A warning tint and sticky position keep it in view on every page while a support agent works in someone else's account.",
    code: `<div className="h-40 w-full max-w-2xl overflow-y-auto rounded-xl border border-border bg-bg">
  <ImpersonationBanner className="sticky top-0 z-10 bg-warning/10" user="Priya Raman (Halcyon Health)" />
  <p className="h-64 p-4 text-sm text-fg-muted">Scroll: the banner stays at the top of the panel.</p>
</div>`,
    node: (
      <div className="h-40 w-full max-w-2xl overflow-y-auto rounded-xl border border-border bg-bg">
        <ImpersonationBanner className="sticky top-0 z-10 bg-warning/10" user="Priya Raman (Halcyon Health)" />
        <p className="h-64 p-4 text-sm text-fg-muted">Scroll: the banner stays at the top of the panel.</p>
      </div>
    ),
  },
]
