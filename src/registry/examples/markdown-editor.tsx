"use client"
import * as React from "react"
import { MarkdownEditor, MarkdownPreview } from "@/registry/ui/markdown-editor"
import { Button } from "@/registry/ui/button"
import type { Example } from "./types"

const TEMPLATE = `## Summary

Northwind's September invoice is **$1,840.00** over the quote.

## Steps to reproduce

1. Open INV-2041
2. Compare the usage line with the metering export

## Expected

Usage should match the \`2.4M\` calls in the export.`

const POLICY = `## Refund policy

Refunds are issued to the **original payment method** within 5 business days.

- Annual plans: prorated for the unused months
- Monthly plans: refundable within 14 days of the charge
- Usage fees are *not* refundable once metered

> Disputes should go to [billing@lumen.app](mailto:billing@lumen.app) with the invoice number, for example INV-2041.`

function ControlledDemo() {
  const [value, setValue] = React.useState(TEMPLATE)
  const [saved, setSaved] = React.useState(TEMPLATE)
  const dirty = value !== saved
  return (
    <div className="flex w-full max-w-3xl flex-col gap-3">
      <MarkdownEditor value={value} onChange={setValue} defaultMode="write" label="Issue description" minHeight={200} />
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs text-fg-muted">{dirty ? "Unsaved changes" : "Saved"}</p>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" disabled={!dirty} onClick={() => setValue(saved)}>Discard</Button>
          <Button size="sm" disabled={!dirty} onClick={() => setSaved(value)}>Save</Button>
        </div>
      </div>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Controlled value",
    description: "value and onChange make the text yours, so save and discard buttons can compare it with what is stored.",
    code: `const TEMPLATE = \`## Summary

Northwind's September invoice is **$1,840.00** over the quote.

## Steps to reproduce

1. Open INV-2041
2. Compare the usage line with the metering export

## Expected

Usage should match the \\\`2.4M\\\` calls in the export.\`

function ControlledDemo() {
  const [value, setValue] = React.useState(TEMPLATE)
  const [saved, setSaved] = React.useState(TEMPLATE)
  const dirty = value !== saved
  return (
    <div className="flex w-full max-w-3xl flex-col gap-3">
      <MarkdownEditor value={value} onChange={setValue} defaultMode="write" label="Issue description" minHeight={200} />
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs text-fg-muted">{dirty ? "Unsaved changes" : "Saved"}</p>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" disabled={!dirty} onClick={() => setValue(saved)}>Discard</Button>
          <Button size="sm" disabled={!dirty} onClick={() => setSaved(value)}>Save</Button>
        </div>
      </div>
    </div>
  )
}`,
    node: <ControlledDemo />,
  },
  {
    title: "Preview only",
    description: "MarkdownPreview is exported on its own for rendering stored markdown, built from React elements and never from HTML strings.",
    code: `const POLICY = \`## Refund policy

Refunds are issued to the **original payment method** within 5 business days.

- Annual plans: prorated for the unused months
- Monthly plans: refundable within 14 days of the charge
- Usage fees are *not* refundable once metered

> Disputes should go to [billing@lumen.app](mailto:billing@lumen.app) with the invoice number, for example INV-2041.\`

<div className="w-full max-w-lg rounded-xl border border-border bg-surface p-5 shadow-raised">
  <MarkdownPreview source={POLICY} />
</div>`,
    node: (
      <div className="w-full max-w-lg rounded-xl border border-border bg-surface p-5 shadow-raised">
        <MarkdownPreview source={POLICY} />
      </div>
    ),
  },
  {
    title: "Empty, write mode",
    description: "An empty defaultValue with a placeholder is the starting point for a comment box; the preview is one click away.",
    code: `<MarkdownEditor defaultValue="" defaultMode="write" placeholder="Describe the change for the release notes…" label="Release note" minHeight={140} className="max-w-xl" />`,
    node: <MarkdownEditor defaultValue="" defaultMode="write" placeholder="Describe the change for the release notes…" label="Release note" minHeight={140} className="max-w-xl" />,
  },
]
