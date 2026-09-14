"use client"
import * as React from "react"
import { PriorityPicker } from "@/registry/ui/priority-picker"
import { DueDateChip } from "@/registry/ui/due-date-chip"
import { IssueKey } from "@/registry/ui/issue-key"
import { ApprovalCard } from "@/registry/ui/approval-card"
import { AssignPicker } from "@/registry/ui/assign-picker"
import { EnvBadge } from "@/registry/ui/env-badge"
import { FeatureFlagToggle } from "@/registry/ui/feature-flag-toggle"
import { CommentThread } from "@/registry/ui/comment-thread"
import { CommentComposer } from "@/registry/ui/comment-composer"
import { ReactionBar } from "@/registry/ui/reaction-bar"
import { GalleryPage, GallerySection } from "../_components/gallery-chrome"

export default function Page() {
  const [priority, setPriority] = React.useState("high")
  const [assignee, setAssignee] = React.useState("1")
  const [flag, setFlag] = React.useState(true)
  return (
    <GalleryPage title="Workflow">
      <GallerySection title="Issue chrome">
        <IssueKey value="MD-88" href="#" />
        <DueDateChip date="Tomorrow" />
        <DueDateChip date="Yesterday" overdue />
        <PriorityPicker value={priority} onChange={setPriority} />
        <EnvBadge env="staging" />
      </GallerySection>
      <GallerySection title="Assign / approve">
        <AssignPicker value={assignee} onChange={setAssignee} people={[{ id: "1", name: "Aman" }, { id: "2", name: "Mina" }]} />
        <ApprovalCard title="Merge release notes" requester="Mina" summary="Ready for docs review." />
      </GallerySection>
      <GallerySection title="Flags / comments">
        <FeatureFlagToggle name="new-checkout" description="Enable redesigned checkout" checked={flag} onCheckedChange={setFlag} />
        <CommentThread comments={[{ id: "1", author: "Aman", body: "Looks good — ship it.", time: "2h ago" }]} />
        <CommentComposer />
        <ReactionBar reactions={[{ emoji: "👍", count: 3, active: true }, { emoji: "🎉", count: 1 }]} />
      </GallerySection>
    </GalleryPage>
  )
}
