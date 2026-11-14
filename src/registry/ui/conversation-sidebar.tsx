"use client"
import * as React from "react"
import { PlusIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { RelativeTime } from "@/registry/ui/relative-time"

/**
 * A chat app's conversation list: a new-chat button on top, then titled threads with their last activity.
 *
 * Use as the left rail of an AI chat screen next to ChatThread. Uncontrolled unless `activeId` is passed; the active thread gets `aria-current`.
 * For general app navigation use Sidebar or CollapsibleSidebar.
 *
 * @example
 * <ConversationSidebar items={threads} activeId={threadId} onSelect={setThreadId} onNew={startThread} />
 */
type Conv = {
  /** Stable unique id; also the React key and the value passed to `onSelect`. */
  id: string
  /** Thread title; truncates to one line. */
  title: string
  /** Last activity, shown as relative time. */
  updatedAt: string | Date
}

const HOUR = 3_600_000
const SAMPLE: { id: string; title: string; agoMs: number }[] = [
  { id: "c1", title: "Q3 revenue summary for Northwind", agoMs: 0.4 * HOUR },
  { id: "c2", title: "Draft reminder for INV-2041", agoMs: 3 * HOUR },
  { id: "c3", title: "Why did the Friday deploy fail?", agoMs: 7 * HOUR },
  { id: "c4", title: "Churn risks in enterprise accounts", agoMs: 26 * HOUR },
  { id: "c5", title: "Reconcile Stripe payouts", agoMs: 2 * 24 * HOUR },
  { id: "c6", title: "Onboarding checklist for Priya", agoMs: 5 * 24 * HOUR },
]

// Sample times are fixed offsets from now, rounded to the minute so server and client agree.
function sampleConversations(): Conv[] {
  const now = Math.floor(Date.now() / 60_000) * 60_000
  return SAMPLE.map(({ id, title, agoMs }) => ({ id, title, updatedAt: new Date(now - agoMs) }))
}

type ConversationSidebarProps = {
  /** Conversations, newest first. Defaults to a few Lumen threads timed relative to now. */
  items?: Conv[]
  /** Controlled active conversation. */
  activeId?: string
  /** Active conversation when uncontrolled. */
  defaultActiveId?: string
  /** Called with the picked conversation's id. */
  onSelect?: (id: string) => void
  /** Called by the "New chat" button. */
  onNew?: () => void
  /** Accessible name for the navigation landmark. Defaults to "Conversations". */
  label?: string
  className?: string
}

function ConversationSidebar({
  items,
  activeId,
  defaultActiveId = SAMPLE[0].id,
  onSelect,
  onNew,
  label = "Conversations",
  className,
}: ConversationSidebarProps) {
  const [sample] = React.useState(sampleConversations)
  const list = items ?? sample
  const [innerActive, setInnerActive] = React.useState(defaultActiveId)
  const active = activeId ?? innerActive
  return (
    <nav data-slot="conversation-sidebar" aria-label={label} className={cn("flex h-full w-64 flex-col border-r border-border bg-surface", className)}>
      <div className="border-b border-border p-3">
        <Button type="button" className="w-full" size="sm" onClick={onNew}><PlusIcon aria-hidden /> New chat</Button>
      </div>
      <ul className="flex-1 overflow-auto p-2">
        {list.map((c) => (
          <li key={c.id}>
            <button
              type="button"
              aria-current={c.id === active ? "page" : undefined}
              onClick={() => {
                if (activeId === undefined) setInnerActive(c.id)
                onSelect?.(c.id)
              }}
              className={cn(
                "flex w-full flex-col rounded-lg px-2.5 py-2 text-left outline-none transition-[background-color] duration-[70ms] focus-visible:ring-2 focus-visible:ring-accent",
                c.id === active ? "bg-sunken" : "hover:bg-sunken/60"
              )}
            >
              <span className="truncate text-sm font-medium text-fg">{c.title}</span>
              <RelativeTime date={c.updatedAt} />
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
export { ConversationSidebar }
export type { ConversationSidebarProps, Conv as Conversation }
