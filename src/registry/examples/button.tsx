"use client"
import * as React from "react"
import { ArrowRightIcon, DownloadIcon, PlusIcon, SendIcon } from "lucide-react"
import { Button } from "@/registry/ui/button"
import { Spinner } from "@/registry/ui/spinner"
import type { Example } from "./types"

function SendInvoice() {
  const [state, setState] = React.useState<"idle" | "sending" | "sent">("idle")
  const send = () => {
    setState("sending")
    setTimeout(() => setState("sent"), 1200)
  }
  return (
    <div className="flex flex-col items-center gap-3">
      <Button onClick={send} disabled={state === "sending"} aria-busy={state === "sending"}>
        {state === "sending" ? <Spinner size="sm" label="Sending" /> : <SendIcon />}
        {state === "sending" ? "Sending…" : state === "sent" ? "Send again" : "Send INV-2041"}
      </Button>
      <p className="text-xs text-fg-muted" aria-live="polite">
        {state === "sent" ? "Sent to billing@northwind.example." : "Disabled while the request is in flight, so it cannot send twice."}
      </p>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Variants",
    description: "default (ink) is the primary action, outline is secondary, ghost sits in toolbars, destructive is for what cannot be undone, and accent appears at most once per screen.",
    code: `<Button>Save invoice</Button>
<Button variant="accent">Upgrade to Pro</Button>
<Button variant="outline">Preview</Button>
<Button variant="secondary">Duplicate</Button>
<Button variant="soft">Add note</Button>
<Button variant="ghost">Skip</Button>
<Button variant="destructive">Void invoice</Button>
<Button variant="link">View history</Button>`,
    node: (
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button>Save invoice</Button>
        <Button variant="accent">Upgrade to Pro</Button>
        <Button variant="outline">Preview</Button>
        <Button variant="secondary">Duplicate</Button>
        <Button variant="soft">Add note</Button>
        <Button variant="ghost">Skip</Button>
        <Button variant="destructive">Void invoice</Button>
        <Button variant="link">View history</Button>
      </div>
    ),
  },
  {
    title: "Sizes",
    description: "xs 28px, sm 32px, default 36px, lg 44px and xl 48px; icons scale with the size, so never size them by hand.",
    code: `<Button size="xs">Export</Button>
<Button size="sm">Export</Button>
<Button>Export</Button>
<Button size="lg">Export</Button>
<Button size="xl">Export</Button>`,
    node: (
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button size="xs">Export</Button>
        <Button size="sm">Export</Button>
        <Button>Export</Button>
        <Button size="lg">Export</Button>
        <Button size="xl">Export</Button>
      </div>
    ),
  },
  {
    title: "With icons",
    description: "Icons inherit the size; put the arrow after the label for forward actions. For an icon with no label, use IconButton, which requires aria-label.",
    code: `<Button><PlusIcon /> New invoice</Button>
<Button variant="outline" size="sm"><DownloadIcon /> Export CSV</Button>
<Button variant="outline">Continue <ArrowRightIcon /></Button>`,
    node: (
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button><PlusIcon /> New invoice</Button>
        <Button variant="outline" size="sm"><DownloadIcon /> Export CSV</Button>
        <Button variant="outline">Continue <ArrowRightIcon /></Button>
      </div>
    ),
  },
  {
    title: "Loading state",
    description: "Disable the button while the request runs and swap the icon for a Spinner; the label says what is happening, not just that something is.",
    code: `function SendInvoice() {
  const [state, setState] = React.useState<"idle" | "sending" | "sent">("idle")
  const send = () => {
    setState("sending")
    setTimeout(() => setState("sent"), 1200)
  }
  return (
    <div className="flex flex-col items-center gap-3">
      <Button onClick={send} disabled={state === "sending"} aria-busy={state === "sending"}>
        {state === "sending" ? <Spinner size="sm" label="Sending" /> : <SendIcon />}
        {state === "sending" ? "Sending…" : state === "sent" ? "Send again" : "Send INV-2041"}
      </Button>
      <p className="text-xs text-fg-muted" aria-live="polite">
        {state === "sent" ? "Sent to billing@northwind.example." : "Disabled while the request is in flight, so it cannot send twice."}
      </p>
    </div>
  )
}`,
    node: <SendInvoice />,
  },
  {
    title: "As a link",
    description: "render swaps the element, so navigation stays a real link (pass a Next.js <Link /> the same way); nativeButton is set for you.",
    code: `<Button render={<a href="#pricing" />} variant="accent" size="lg">
  See pricing <ArrowRightIcon />
</Button>
<Button render={<a href="#docs" />} variant="outline" size="lg">
  Read the docs
</Button>`,
    node: (
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button render={<a href="#pricing" />} variant="accent" size="lg">
          See pricing <ArrowRightIcon />
        </Button>
        <Button render={<a href="#docs" />} variant="outline" size="lg">
          Read the docs
        </Button>
      </div>
    ),
  },
  {
    title: "Disabled",
    description: "disabled removes it from the tab order; add focusableWhenDisabled when a tooltip or screen reader still needs to reach it and explain why.",
    code: `<Button disabled>Approve</Button>
<Button variant="outline" disabled focusableWhenDisabled aria-describedby="approve-why">
  Approve
</Button>
<p id="approve-why" className="text-xs text-fg-muted">Only Maya Chen can approve bills over $10,000.</p>`,
    node: (
      <div className="flex flex-col items-center gap-2">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Button disabled>Approve</Button>
          <Button variant="outline" disabled focusableWhenDisabled aria-describedby="approve-why">
            Approve
          </Button>
        </div>
        <p id="approve-why" className="text-xs text-fg-muted">Only Maya Chen can approve bills over $10,000.</p>
      </div>
    ),
  },
]
