"use client"
import * as React from "react"
import { Button } from "@/registry/ui/button"
import { Toast, ToastStack, Toaster, toast } from "@/registry/ui/toast"
import type { Example } from "./types"

function DismissDemo() {
  const [visible, setVisible] = React.useState(true)
  if (!visible) return <Button variant="outline" onClick={() => setVisible(true)}>Show the toast again</Button>
  return (
    <Toast
      tone="success"
      title="Invoice INV-2041 sent"
      description="Northwind will get it at billing@northwind.io."
      action={{ label: "View invoice", onClick: () => setVisible(false) }}
      onDismiss={() => setVisible(false)}
    />
  )
}

export const examples: Example[] = [
  {
    title: "Tones",
    description: "Five tones share one card; the glyph and its colour carry the status so the title can stay short.",
    code: `<ToastStack>
  <Toast title="Draft saved" description="Autosaved 2 seconds ago." />
  <Toast tone="success" title="Invoice sent" description="Northwind will get it by email." />
  <Toast tone="warning" title="Card expires soon" description="Update billing before November 1." />
  <Toast tone="danger" title="Payment failed" description="The card was declined. Try another method." />
  <Toast tone="loading" title="Deploying lumen-web 4.2.0…" />
</ToastStack>`,
    node: (
      <ToastStack>
        <Toast title="Draft saved" description="Autosaved 2 seconds ago." />
        <Toast tone="success" title="Invoice sent" description="Northwind will get it by email." />
        <Toast tone="warning" title="Card expires soon" description="Update billing before November 1." />
        <Toast tone="danger" title="Payment failed" description="The card was declined. Try another method." />
        <Toast tone="loading" title="Deploying lumen-web 4.2.0…" />
      </ToastStack>
    ),
  },
  {
    title: "Action and dismiss",
    description: "action adds one ink button under the text and onDismiss shows the close control on hover and focus.",
    code: `function DismissDemo() {
  const [visible, setVisible] = React.useState(true)
  if (!visible) return <Button variant="outline" onClick={() => setVisible(true)}>Show the toast again</Button>
  return (
    <Toast
      tone="success"
      title="Invoice INV-2041 sent"
      description="Northwind will get it at billing@northwind.io."
      action={{ label: "View invoice", onClick: () => setVisible(false) }}
      onDismiss={() => setVisible(false)}
    />
  )
}`,
    node: <DismissDemo />,
  },
  {
    title: "Toaster and toast()",
    description: "Mount Toaster once near the root, then call toast() from anywhere; promise swaps the loading card for the result.",
    code: `<>
  <Toaster />
  <div className="flex flex-wrap items-center justify-center gap-2">
    <Button variant="outline" onClick={() => toast("Draft saved", { description: "Autosaved 2 seconds ago." })}>
      Default
    </Button>
    <Button variant="outline" onClick={() => toast.success("Invoice sent", { description: "Northwind will get it by email.", action: { label: "View", onClick: () => {} } })}>
      Success
    </Button>
    <Button variant="outline" onClick={() => toast.error("Payment failed", { description: "The card was declined." })}>
      Error
    </Button>
    <Button variant="outline" onClick={() => toast.warning("Card expires soon", { duration: 6000 })}>
      Warning
    </Button>
    <Button onClick={() => toast.promise(new Promise((resolve) => setTimeout(resolve, 1500)), { loading: "Deploying lumen-web…", success: "Deployed to production", error: "Deploy failed" })}>
      Promise
    </Button>
  </div>
</>`,
    node: (
      <>
        <Toaster />
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Button variant="outline" onClick={() => toast("Draft saved", { description: "Autosaved 2 seconds ago." })}>
            Default
          </Button>
          <Button variant="outline" onClick={() => toast.success("Invoice sent", { description: "Northwind will get it by email.", action: { label: "View", onClick: () => {} } })}>
            Success
          </Button>
          <Button variant="outline" onClick={() => toast.error("Payment failed", { description: "The card was declined." })}>
            Error
          </Button>
          <Button variant="outline" onClick={() => toast.warning("Card expires soon", { duration: 6000 })}>
            Warning
          </Button>
          <Button onClick={() => toast.promise(new Promise((resolve) => setTimeout(resolve, 1500)), { loading: "Deploying lumen-web…", success: "Deployed to production", error: "Deploy failed" })}>
            Promise
          </Button>
        </div>
      </>
    ),
  },
]
