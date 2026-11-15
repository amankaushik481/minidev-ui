"use client"
import * as React from "react"
import { ArtifactPreview } from "@/registry/ui/artifact-preview"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/registry/ui/dialog"
import type { Example } from "./types"

const SOURCE = `<button className="rounded-lg bg-ink px-3.5 py-2 text-sm text-on-ink">Pay $1,240.00</button>`

function ExpandableArtifact() {
  const [open, setOpen] = React.useState(false)
  const preview = <button className="rounded-lg bg-ink px-3.5 py-2 text-sm text-on-ink">Pay $1,240.00</button>
  return (
    <>
      <ArtifactPreview title="pay-button.tsx" copyValue={SOURCE} onExpand={() => setOpen(true)} className="w-full max-w-md">
        <div className="grid place-items-center py-6">{preview}</div>
      </ArtifactPreview>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>pay-button.tsx</DialogTitle>
          </DialogHeader>
          <div className="grid place-items-center rounded-xl border border-border bg-sunken py-12">{preview}</div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export const examples: Example[] = [
  {
    title: "Generated component with copy and expand",
    description: "copyValue adds a copy button for the source; onExpand opens the same preview in a dialog.",
    code: `const SOURCE = \`<button className="rounded-lg bg-ink px-3.5 py-2 text-sm text-on-ink">Pay $1,240.00</button>\`

function ExpandableArtifact() {
  const [open, setOpen] = React.useState(false)
  const preview = <button className="rounded-lg bg-ink px-3.5 py-2 text-sm text-on-ink">Pay $1,240.00</button>
  return (
    <>
      <ArtifactPreview title="pay-button.tsx" copyValue={SOURCE} onExpand={() => setOpen(true)} className="w-full max-w-md">
        <div className="grid place-items-center py-6">{preview}</div>
      </ArtifactPreview>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>pay-button.tsx</DialogTitle>
          </DialogHeader>
          <div className="grid place-items-center rounded-xl border border-border bg-sunken py-12">{preview}</div>
        </DialogContent>
      </Dialog>
    </>
  )
}`,
    node: <ExpandableArtifact />,
  },
  {
    title: "Generated summary",
    description: "Any node can be the preview. Without onExpand only the copy button shows.",
    code: `<ArtifactPreview
  title="q3-collections.md"
  copyValue={"Q3 collections\\n- 41 invoices paid on time\\n- 6 paid late, average 9 days\\n- 2 still open: INV-2033, INV-2041"}
  className="w-full max-w-md"
>
  <div className="space-y-1.5 text-sm">
    <p className="font-medium text-fg">Q3 collections</p>
    <ul className="list-disc space-y-0.5 pl-5 text-fg-muted">
      <li>41 invoices paid on time</li>
      <li>6 paid late, average 9 days</li>
      <li>2 still open: INV-2033, INV-2041</li>
    </ul>
  </div>
</ArtifactPreview>`,
    node: (
      <ArtifactPreview
        title="q3-collections.md"
        copyValue={"Q3 collections\n- 41 invoices paid on time\n- 6 paid late, average 9 days\n- 2 still open: INV-2033, INV-2041"}
        className="w-full max-w-md"
      >
        <div className="space-y-1.5 text-sm">
          <p className="font-medium text-fg">Q3 collections</p>
          <ul className="list-disc space-y-0.5 pl-5 text-fg-muted">
            <li>41 invoices paid on time</li>
            <li>6 paid late, average 9 days</li>
            <li>2 still open: INV-2033, INV-2041</li>
          </ul>
        </div>
      </ArtifactPreview>
    ),
  },
]
