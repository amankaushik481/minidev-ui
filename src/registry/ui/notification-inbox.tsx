"use client"
import * as React from "react"
import { Popover as PopoverPrimitive } from "@base-ui/react/popover"
import { AtSignIcon, BellIcon, CheckCheckIcon, GitPullRequestIcon, MessageSquareIcon, UserPlusIcon } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * NotificationInbox — a bell with an unread count that opens an inbox popover with All and Mentions tabs, unread dots and mark-all-read.
 *
 * Built on Base UI Popover: focus moves in on open, Escape closes and returns focus to
 * the bell, whose accessible name includes the unread count. Opening a row marks it
 * read. Use it in app headers; for a single row use NotificationItem, for settings
 * use NotificationPreferences.
 *
 * @example
 * <NotificationInbox
 *   notes={[{ id: "1", kind: "mention", who: "Mira Sato", text: "mentioned you in Q3 roadmap", time: "2m", unread: true }]}
 *   onOpenNote={(n) => router.push(`/inbox/${n.id}`)}
 *   viewAllHref="/activity"
 * />
 */
type Note = {
  id: string
  /** Sets the badge icon. "mention" items also appear under the Mentions tab. */
  kind: "mention" | "comment" | "invite" | "review"
  /** Who did it; shown bold and used for the initials avatar. */
  who: string
  /** The rest of the sentence after the name. */
  text: string
  /** Preformatted time, e.g. "2m" or "Yesterday". */
  time: string
  unread?: boolean
}

const SAMPLE: Note[] = [
  { id: "1", kind: "mention", who: "Mira Sato", text: "mentioned you in Q3 roadmap: “@ada can you own pricing?”", time: "2m", unread: true },
  { id: "2", kind: "review", who: "Leo Brandt", text: "requested your review on #482 Billing redesign", time: "18m", unread: true },
  { id: "3", kind: "comment", who: "Tomás Reyes", text: "replied to your comment on Invoices", time: "1h", unread: true },
  { id: "4", kind: "invite", who: "Northwind Labs", text: "invited you to the Finance workspace", time: "Yesterday" },
  { id: "5", kind: "comment", who: "Ada Okafor", text: "resolved the thread on Onboarding copy", time: "Mon" },
]

const KIND = {
  mention: { icon: AtSignIcon, tone: "text-accent-fg" },
  comment: { icon: MessageSquareIcon, tone: "text-fg-muted" },
  invite: { icon: UserPlusIcon, tone: "text-success" },
  review: { icon: GitPullRequestIcon, tone: "text-info" },
}

type NotificationInboxProps = {
  /** Initial notifications, newest first. The inbox then tracks read state itself. */
  notes?: Note[]
  /** Called when a notification is opened (it is also marked read). */
  onOpenNote?: (note: Note) => void
  /** Called after "Mark all read". */
  onMarkAllRead?: () => void
  /** Footer link to the full activity page. Omit to hide the footer. */
  viewAllHref?: string
  /** Classes for the bell trigger. */
  className?: string
}

function NotificationInbox({ notes: initial = SAMPLE, onOpenNote, onMarkAllRead, viewAllHref = "#", className }: NotificationInboxProps) {
  const [notes, setNotes] = React.useState(initial)
  const [tab, setTab] = React.useState<"all" | "mentions">("all")
  const unread = notes.filter((n) => n.unread).length
  const list = tab === "all" ? notes : notes.filter((n) => n.kind === "mention")
  return (
    <PopoverPrimitive.Root>
      <PopoverPrimitive.Trigger
        data-slot="notification-inbox"
        className={cn(
          "relative inline-flex size-9 items-center justify-center rounded-lg border border-border bg-surface text-fg-muted shadow-key outline-none transition-colors hover:text-fg focus-visible:ring-2 focus-visible:ring-accent data-popup-open:text-fg",
          className
        )}
        aria-label={unread ? `Notifications, ${unread} unread` : "Notifications"}
      >
        <BellIcon className="size-4" />
        {unread ? (
          <span aria-hidden className="absolute -top-1 -right-1 grid h-4 min-w-4 place-items-center rounded-full border-2 border-bg bg-accent px-1 text-[10px] font-semibold text-on-accent tabular-nums">{unread > 99 ? "99+" : unread}</span>
        ) : null}
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Positioner sideOffset={8} align="end" className="z-50">
          <PopoverPrimitive.Popup data-slot="notification-inbox-content" aria-label="Notifications" className="w-[380px] max-w-[calc(100vw-2rem)] origin-(--transform-origin) overflow-hidden rounded-2xl border border-border bg-raised text-fg shadow-overlay outline-none transition-[opacity,transform] duration-200 ease-hairline data-[ending-style]:scale-[0.98] data-[ending-style]:opacity-0 data-[ending-style]:duration-[160ms] data-[ending-style]:ease-exit data-[starting-style]:scale-[0.98] data-[starting-style]:opacity-0">
            <div className="flex items-center justify-between border-b border-border px-4 pt-3">
              <div className="flex gap-4">
                {(["all", "mentions"] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTab(t)}
                    aria-pressed={tab === t}
                    className={cn("relative rounded-sm pb-2.5 text-[0.8125rem] font-medium capitalize outline-none transition-[color] duration-[70ms] focus-visible:ring-2 focus-visible:ring-accent", tab === t ? "text-fg" : "text-fg-muted hover:text-fg")}
                  >
                    {t}
                    {t === "all" && unread ? <span className="ml-1.5 rounded-full bg-accent-soft px-1.5 text-[10px] text-accent-fg tabular-nums">{unread}<span className="sr-only"> unread</span></span> : null}
                    {tab === t ? <span className="absolute inset-x-0 -bottom-px h-[2px] rounded-full bg-fg" /> : null}
                  </button>
                ))}
              </div>
              <button
                type="button"
                disabled={!unread}
                onClick={() => {
                  setNotes((n) => n.map((x) => ({ ...x, unread: false })))
                  onMarkAllRead?.()
                }}
                className="-mt-2 inline-flex items-center gap-1 rounded-md px-1.5 py-1 text-xs text-fg-muted outline-none transition-[background-color,color] duration-[70ms] hover:bg-sunken hover:text-fg focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-40"
              >
                <CheckCheckIcon aria-hidden className="size-3.5" /> Mark all read
              </button>
            </div>
            <ul className="max-h-[360px] overflow-y-auto p-1.5">
              {list.length ? (
                list.map((n) => {
                  const K = KIND[n.kind]
                  return (
                    <li key={n.id}>
                      <button
                        type="button"
                        onClick={() => {
                          setNotes((all) => all.map((x) => (x.id === n.id ? { ...x, unread: false } : x)))
                          onOpenNote?.(n)
                        }}
                        className="flex w-full items-start gap-3 rounded-xl p-2.5 text-left outline-none transition-[background-color] duration-[70ms] hover:bg-sunken focus-visible:bg-sunken focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset"
                      >
                        <span aria-hidden className="relative">
                          <span className="grid size-8 place-items-center rounded-full border border-border bg-sunken text-[10px] font-semibold text-fg-muted">
                            {n.who.split(" ").map((p) => p[0]).join("").slice(0, 2)}
                          </span>
                          <span className={cn("absolute -right-1 -bottom-1 grid size-4 place-items-center rounded-full border border-border bg-raised", K.tone)}>
                            <K.icon className="size-2.5" />
                          </span>
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-[0.8125rem] leading-[1.45] text-fg-muted">
                            <span className="font-medium text-fg">{n.who}</span> {n.text}
                          </span>
                          <span className="mt-0.5 block text-[11px] text-fg-subtle">{n.time}</span>
                        </span>
                        {n.unread ? (
                          <span className="mt-1.5 size-2 shrink-0 rounded-full bg-accent">
                            <span className="sr-only">Unread</span>
                          </span>
                        ) : null}
                      </button>
                    </li>
                  )
                })
              ) : (
                <li className="grid place-items-center gap-1 px-6 py-12 text-center">
                  {tab === "mentions" ? <AtSignIcon aria-hidden className="size-5 text-fg-subtle" /> : <BellIcon aria-hidden className="size-5 text-fg-subtle" />}
                  <p className="mt-1 text-[0.8125rem] font-medium text-fg">{tab === "mentions" ? "No mentions yet" : "You're all caught up"}</p>
                  <p className="text-xs text-fg-muted">
                    {tab === "mentions" ? "When someone @mentions you, it shows up here." : "New activity on your work shows up here."}
                  </p>
                </li>
              )}
            </ul>
            {viewAllHref ? (
              <div className="border-t border-border bg-sunken/50 px-4 py-2.5 text-center">
                <a href={viewAllHref} className="rounded-sm text-xs font-medium text-fg-muted outline-none transition-[color] duration-[70ms] hover:text-fg focus-visible:ring-2 focus-visible:ring-accent">
                  View all activity
                </a>
              </div>
            ) : null}
          </PopoverPrimitive.Popup>
        </PopoverPrimitive.Positioner>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  )
}
export { NotificationInbox }
export type { NotificationInboxProps, Note as NotificationInboxNote }
