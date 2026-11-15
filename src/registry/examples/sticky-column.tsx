"use client"
import { Button } from "@/registry/ui/button"
import { StickyColumn } from "@/registry/ui/sticky-column"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Pinned names on a roadmap",
    description: "Scroll sideways: the team column stays in place while the months move under it.",
    code: `<div className="w-full max-w-lg overflow-x-auto rounded-xl border border-border">
  {["Billing API", "Customer portal", "Payouts v2"].map((team) => (
    <div key={team} className="flex min-w-[720px] border-b border-border last:border-b-0">
      <StickyColumn className="w-36 shrink-0 px-3 py-2 text-sm font-medium text-fg">{team}</StickyColumn>
      {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((month) => (
        <div key={month} className="w-24 shrink-0 px-3 py-2 text-xs text-fg-muted">{month}</div>
      ))}
    </div>
  ))}
</div>`,
    node: (
      <div className="w-full max-w-lg overflow-x-auto rounded-xl border border-border">
        {["Billing API", "Customer portal", "Payouts v2"].map((team) => (
          <div key={team} className="flex min-w-[720px] border-b border-border last:border-b-0">
            <StickyColumn className="w-36 shrink-0 px-3 py-2 text-sm font-medium text-fg">{team}</StickyColumn>
            {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((month) => (
              <div key={month} className="w-24 shrink-0 px-3 py-2 text-xs text-fg-muted">{month}</div>
            ))}
          </div>
        ))}
      </div>
    ),
  },
  {
    title: "Pinned on both sides",
    description: "A name on the left and an action on the right stay visible in a wide row.",
    code: `<div className="w-full max-w-md overflow-x-auto rounded-xl border border-border">
  <div className="flex min-w-[640px] items-center">
    <StickyColumn className="w-36 shrink-0 px-3 py-2 text-sm font-medium text-fg">Northwind Labs</StickyColumn>
    <div className="flex-1 px-3 py-2 text-xs text-fg-muted">Pro · 24 seats · renews Jan 3 · billing@northwind.dev · EU data region</div>
    <StickyColumn side="right" className="shrink-0 px-2 py-1.5">
      <Button size="sm" variant="outline">Open</Button>
    </StickyColumn>
  </div>
</div>`,
    node: (
      <div className="w-full max-w-md overflow-x-auto rounded-xl border border-border">
        <div className="flex min-w-[640px] items-center">
          <StickyColumn className="w-36 shrink-0 px-3 py-2 text-sm font-medium text-fg">Northwind Labs</StickyColumn>
          <div className="flex-1 px-3 py-2 text-xs text-fg-muted">Pro · 24 seats · renews Jan 3 · billing@northwind.dev · EU data region</div>
          <StickyColumn side="right" className="shrink-0 px-2 py-1.5">
            <Button size="sm" variant="outline">Open</Button>
          </StickyColumn>
        </div>
      </div>
    ),
  },
]
