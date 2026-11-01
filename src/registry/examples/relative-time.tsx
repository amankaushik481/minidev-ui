import { RelativeTime } from "@/registry/ui/relative-time"
import { Avatar, AvatarFallback } from "@/registry/ui/avatar"
import type { Example } from "./types"

const minutesAgo = (m: number) => new Date(Date.now() - m * 60_000)

export const examples: Example[] = [
  {
    title: "Different ages",
    description: "Under a minute reads just now, then minutes, hours and days; hover for the full local timestamp.",
    code: `const minutesAgo = (m: number) => new Date(Date.now() - m * 60_000)

<RelativeTime date={minutesAgo(0)} />
<RelativeTime date={minutesAgo(12)} />
<RelativeTime date={minutesAgo(5 * 60)} />
<RelativeTime date={minutesAgo(3 * 24 * 60)} />`,
    node: (
      <div className="flex flex-wrap items-center gap-6">
        <RelativeTime date={minutesAgo(0)} />
        <RelativeTime date={minutesAgo(12)} />
        <RelativeTime date={minutesAgo(5 * 60)} />
        <RelativeTime date={minutesAgo(3 * 24 * 60)} />
      </div>
    ),
  },
  {
    title: "From an ISO string",
    description: "Pass the timestamp your API returns as is; the element keeps it in dateTime and the label updates on each render.",
    code: `<RelativeTime date="2026-10-01T09:30:00Z" />`,
    node: <RelativeTime date="2026-10-01T09:30:00Z" />,
  },
  {
    title: "In a list row",
    description: "Set the size and color with className so the time matches the row it sits in.",
    code: `<ul className="w-full max-w-sm divide-y divide-border rounded-xl border border-border bg-surface">
  <li className="flex items-center gap-3 px-3 py-2.5">
    <Avatar size="sm"><AvatarFallback>MC</AvatarFallback></Avatar>
    <p className="min-w-0 flex-1 truncate text-sm text-fg"><span className="font-medium">Maya Chen</span> paid INV-2041</p>
    <RelativeTime date={minutesAgo(4)} className="text-[11px] text-fg-subtle" />
  </li>
  <li className="flex items-center gap-3 px-3 py-2.5">
    <Avatar size="sm"><AvatarFallback>TO</AvatarFallback></Avatar>
    <p className="min-w-0 flex-1 truncate text-sm text-fg"><span className="font-medium">Theo Okafor</span> deployed lumen-web</p>
    <RelativeTime date={minutesAgo(95)} className="text-[11px] text-fg-subtle" />
  </li>
</ul>`,
    node: (
      <ul className="w-full max-w-sm divide-y divide-border rounded-xl border border-border bg-surface">
        <li className="flex items-center gap-3 px-3 py-2.5">
          <Avatar size="sm"><AvatarFallback>MC</AvatarFallback></Avatar>
          <p className="min-w-0 flex-1 truncate text-sm text-fg"><span className="font-medium">Maya Chen</span> paid INV-2041</p>
          <RelativeTime date={minutesAgo(4)} className="text-[11px] text-fg-subtle" />
        </li>
        <li className="flex items-center gap-3 px-3 py-2.5">
          <Avatar size="sm"><AvatarFallback>TO</AvatarFallback></Avatar>
          <p className="min-w-0 flex-1 truncate text-sm text-fg"><span className="font-medium">Theo Okafor</span> deployed lumen-web</p>
          <RelativeTime date={minutesAgo(95)} className="text-[11px] text-fg-subtle" />
        </li>
      </ul>
    ),
  },
]
