"use client"
import * as React from "react"
import { PriorityPicker } from "@/registry/ui/priority-picker"
import { ApprovalCard } from "@/registry/ui/approval-card"
import { DueDateChip } from "@/registry/ui/due-date-chip"
import { IssueKey } from "@/registry/ui/issue-key"
import { PageHeader } from "@/registry/ui/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/registry/ui/card"

function WorkflowBoard() {
  const [priority, setPriority] = React.useState("medium")
  return (
    <div data-slot="workflow-board" className="space-y-6">
      <PageHeader title="Workflow" description="Approvals and triage" />
      <div className="flex flex-wrap items-center gap-3">
        <IssueKey value="MD-214" />
        <DueDateChip date="Sep 18" />
        <PriorityPicker value={priority} onChange={setPriority} />
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <ApprovalCard title="Publish pricing change" requester="Aman" summary="Updates Pro plan seats to $29." />
        <Card>
          <CardHeader>
            <CardTitle>Queue</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-fg-muted">3 items awaiting review</CardContent>
        </Card>
      </div>
    </div>
  )
}
export { WorkflowBoard }
