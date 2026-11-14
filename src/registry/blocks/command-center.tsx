"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { CommandDialog } from "@/registry/ui/command-dialog"
import { Kbd } from "@/registry/ui/kbd"
import { KpiRow } from "@/registry/ui/kpi-row"
import { PageHeader } from "@/registry/ui/page-header"

/**
 * CommandCenter — an ops home: page title with a "Commands" button (also ⌘K / Ctrl+K), a KPI row, and a command dialog.
 *
 * Use for an operator dashboard where the fastest path to any action is the keyboard. For a chart-led overview use
 * DashboardHome; for just the palette use CommandPalette (has its own ⌘K) or CommandDialog. The shortcut listener
 * is attached to the window while the block is mounted.
 *
 * @example
 * <CommandCenter />
 */
type CommandCenterProps = {
  className?: string
}

function CommandCenter({ className }: CommandCenterProps) {
  const [open, setOpen] = React.useState(false)
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])
  return (
    <div data-slot="command-center" className={cn("space-y-4", className)}>
      <PageHeader
        title="Command center"
        description="Live health of billing, sync and alerts for Northwind."
        actions={
          <Button size="sm" variant="outline" onClick={() => setOpen(true)} aria-keyshortcuts="Meta+K Control+K">
            Commands
            {/* span, not KbdGroup: a div is not valid inside a button */}
            <span aria-hidden className="ml-1 hidden items-center gap-0.5 sm:inline-flex">
              <Kbd>⌘</Kbd>
              <Kbd>K</Kbd>
            </span>
          </Button>
        }
      />
      <KpiRow
        items={[
          { label: "MRR", value: "$48,290", delta: 3.1 },
          { label: "Failed payments", value: "7", delta: -22, invert: true },
          { label: "Sync lag", value: "42s", delta: 8, invert: true },
          { label: "Open alerts", value: "3", delta: "2 critical" },
        ]}
      />
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        commands={[
          { id: "retry-payments", label: "Retry failed payments" },
          { id: "resync-stripe", label: "Re-sync Stripe" },
          { id: "new-invoice", label: "New invoice" },
          { id: "open-alerts", label: "Open alerts" },
          { id: "export-mrr", label: "Export MRR to CSV" },
        ]}
      />
    </div>
  )
}

export { CommandCenter }
export type { CommandCenterProps }
