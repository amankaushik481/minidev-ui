"use client"
import { Avatar, AvatarFallback } from "@/registry/ui/avatar"
import { Badge } from "@/registry/ui/badge"
import { ListItem } from "@/registry/ui/list-item"
import { Switch } from "@/registry/ui/switch"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Team list",
    description: "Inside li elements, put the dividers on the ul with divide-y; each ListItem is the last child of its li.",
    code: `<ul className="w-full max-w-md divide-y divide-border rounded-xl border border-border bg-surface">
  <li>
    <ListItem leading={<Avatar><AvatarFallback>MC</AvatarFallback></Avatar>} heading="Maya Chen" description="Finance lead" trailing={<Badge variant="outline">Owner</Badge>} />
  </li>
  <li>
    <ListItem leading={<Avatar><AvatarFallback>TO</AvatarFallback></Avatar>} heading="Theo Okafor" description="Engineering" trailing={<Badge variant="outline">Admin</Badge>} />
  </li>
  <li>
    <ListItem leading={<Avatar><AvatarFallback>PR</AvatarFallback></Avatar>} heading="Priya Raman" description="Product design" trailing={<Badge variant="secondary">Member</Badge>} />
  </li>
</ul>`,
    node: (
      <ul className="w-full max-w-md divide-y divide-border rounded-xl border border-border bg-surface">
        <li>
          <ListItem leading={<Avatar><AvatarFallback>MC</AvatarFallback></Avatar>} heading="Maya Chen" description="Finance lead" trailing={<Badge variant="outline">Owner</Badge>} />
        </li>
        <li>
          <ListItem leading={<Avatar><AvatarFallback>TO</AvatarFallback></Avatar>} heading="Theo Okafor" description="Engineering" trailing={<Badge variant="outline">Admin</Badge>} />
        </li>
        <li>
          <ListItem leading={<Avatar><AvatarFallback>PR</AvatarFallback></Avatar>} heading="Priya Raman" description="Product design" trailing={<Badge variant="secondary">Member</Badge>} />
        </li>
      </ul>
    ),
  },
  {
    title: "Settings rows",
    description: "Sibling ListItems draw their own dividers; a long description truncates to one line.",
    code: `<div className="w-full max-w-md rounded-xl border border-border bg-surface">
  <ListItem heading="Payment reminders" description="Email customers 3 days before an invoice is due, and again 7 days after." trailing={<Switch aria-label="Payment reminders" defaultChecked />} />
  <ListItem heading="Weekly summary" description="A Monday email with paid, open and overdue totals." trailing={<Switch aria-label="Weekly summary" />} />
</div>`,
    node: (
      <div className="w-full max-w-md rounded-xl border border-border bg-surface">
        <ListItem heading="Payment reminders" description="Email customers 3 days before an invoice is due, and again 7 days after." trailing={<Switch aria-label="Payment reminders" defaultChecked />} />
        <ListItem heading="Weekly summary" description="A Monday email with paid, open and overdue totals." trailing={<Switch aria-label="Weekly summary" />} />
      </div>
    ),
  },
]
