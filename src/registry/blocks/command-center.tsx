"use client"
import * as React from "react"
import { PageHeader } from "@/registry/ui/page-header"
import { Button } from "@/registry/ui/button"
import { CommandDialog } from "@/registry/ui/command-dialog"
import { KpiRow } from "@/registry/ui/kpi-row"
function CommandCenter() {
  const [open, setOpen] = React.useState(false)
  return (
    <div data-slot="command-center" className="space-y-4">
      <PageHeader title="Command center" actions={<Button size="sm" variant="outline" onClick={() => setOpen(true)}>Commands</Button>} />
      <KpiRow items={[{ label: "Agents", value: "3" }, { label: "Jobs", value: "18" }, { label: "Failures", value: "0" }, { label: "Latency", value: "110ms" }]} />
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        commands={[
          { id: "1", label: "Run audit" },
          { id: "2", label: "Open gallery" },
          { id: "3", label: "Ship registry" },
        ]}
      />
    </div>
  )
}
export { CommandCenter }
