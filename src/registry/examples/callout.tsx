import { Button } from "@/registry/ui/button"
import { Callout } from "@/registry/ui/callout"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Tones",
    description: "Info is neutral; success, warning and danger tint the border and wash at low opacity.",
    code: `<Callout>Invoices are sent from billing@northwind.com by default.</Callout>
<Callout tone="success">Payment of $1,840.00 for INV-2041 was received.</Callout>
<Callout tone="warning">Your card ending in 4242 expires next month.</Callout>
<Callout tone="danger">The bank connection was revoked. Reconnect to keep importing.</Callout>`,
    node: (
      <div className="flex w-full max-w-md flex-col gap-3">
        <Callout>Invoices are sent from billing@northwind.com by default.</Callout>
        <Callout tone="success">Payment of $1,840.00 for INV-2041 was received.</Callout>
        <Callout tone="warning">Your card ending in 4242 expires next month.</Callout>
        <Callout tone="danger">The bank connection was revoked. Reconnect to keep importing.</Callout>
      </div>
    ),
  },
  {
    title: "With title",
    description: "A short title in the foreground colour, with the detail underneath in muted text.",
    code: `<Callout tone="warning" title="Trial ends in 3 days" className="w-full max-w-md">
  Add a payment method to keep sending invoices after October 18. Nothing is charged until then.
</Callout>`,
    node: (
      <Callout tone="warning" title="Trial ends in 3 days" className="w-full max-w-md">
        Add a payment method to keep sending invoices after October 18. Nothing is charged until then.
      </Callout>
    ),
  },
  {
    title: "With actions",
    description: "Children can hold anything; put small buttons in a row under the message.",
    code: `<Callout tone="info" title="Lumen 3.0 is available" className="w-full max-w-md">
  <p>Automatic reminders and multi-currency invoices are now on every plan.</p>
  <div className="mt-3 flex gap-2">
    <Button size="sm">Read the release notes</Button>
    <Button size="sm" variant="ghost">Dismiss</Button>
  </div>
</Callout>`,
    node: (
      <Callout tone="info" title="Lumen 3.0 is available" className="w-full max-w-md">
        <p>Automatic reminders and multi-currency invoices are now on every plan.</p>
        <div className="mt-3 flex gap-2">
          <Button size="sm">Read the release notes</Button>
          <Button size="sm" variant="ghost">Dismiss</Button>
        </div>
      </Callout>
    ),
  },
]
