"use client"
import { Button } from "@/registry/ui/button"
import { Input } from "@/registry/ui/input"
import { Badge } from "@/registry/ui/badge"
import { cn } from "@/lib/utils"

function InviteMembers({ className }: { className?: string }) {
  return (
    <div data-slot="invite-members" className={cn("space-y-4 rounded-2xl border border-border bg-surface p-5 shadow-highlight", className)}>
      <div>
        <h3 className="text-sm font-medium text-fg">Invite members</h3>
        <p className="mt-1 text-xs text-fg-muted">They get free UI access. Premium unlocks follow the workspace plan.</p>
      </div>
      <div className="flex gap-2">
        <Input placeholder="email@company.com" className="flex-1" />
        <Button size="sm">Send</Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {["sam@acme.co", "lee@north.io"].map((e) => (
          <Badge key={e} variant="outline">{e} · pending</Badge>
        ))}
      </div>
    </div>
  )
}
export { InviteMembers }
