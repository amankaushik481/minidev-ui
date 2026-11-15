"use client"
import { ReadReceipt } from "@/registry/ui/read-receipt"
import { MessageBubble } from "@/registry/ui/message-bubble"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "In a message",
    description: "Put it after the time inside the user's bubble; the label is what screen readers hear.",
    code: `<div className="w-full max-w-sm">
  <MessageBubble role="user">
    <span className="block">Sending the signed contract now.</span>
    <span className="mt-1 flex items-center justify-end gap-1 text-2xs text-fg-subtle tabular-nums">
      14:32 <ReadReceipt status="read" />
    </span>
  </MessageBubble>
</div>`,
    node: (
      <div className="w-full max-w-sm">
        <MessageBubble role="user">
          <span className="block">Sending the signed contract now.</span>
          <span className="mt-1 flex items-center justify-end gap-1 text-2xs text-fg-subtle tabular-nums">
            14:32 <ReadReceipt status="read" />
          </span>
        </MessageBubble>
      </div>
    ),
  },
  {
    title: "Delivery states",
    description: "Sent is one tick, delivered two, read two in accent. Show the word where colour alone is not enough.",
    code: `<ul className="space-y-2 text-sm">
  <li className="flex items-center gap-2"><ReadReceipt status="sent" /><span className="text-fg-muted">Sent</span></li>
  <li className="flex items-center gap-2"><ReadReceipt status="delivered" /><span className="text-fg-muted">Delivered</span></li>
  <li className="flex items-center gap-2"><ReadReceipt status="read" label="Read by Theo at 14:35" /><span className="text-fg-muted">Read by Theo at 14:35</span></li>
</ul>`,
    node: (
      <ul className="space-y-2 text-sm">
        <li className="flex items-center gap-2"><ReadReceipt status="sent" /><span className="text-fg-muted">Sent</span></li>
        <li className="flex items-center gap-2"><ReadReceipt status="delivered" /><span className="text-fg-muted">Delivered</span></li>
        <li className="flex items-center gap-2"><ReadReceipt status="read" label="Read by Theo at 14:35" /><span className="text-fg-muted">Read by Theo at 14:35</span></li>
      </ul>
    ),
  },
]
