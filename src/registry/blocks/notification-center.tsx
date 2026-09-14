"use client"
import { Button } from "@/registry/ui/button"
import { NotificationItem } from "@/registry/ui/notification-item"

function NotificationCenter() {
  return (
    <div data-slot="notification-center" className="w-full max-w-md overflow-hidden rounded-2xl border border-border bg-surface shadow-[inset_0_1px_0_oklch(1_0_0/0.55)]">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <h3 className="text-sm font-medium text-fg">Notifications</h3>
        <Button size="sm" variant="ghost">Settings</Button>
      </div>
      <div>
        <NotificationItem title="Audit passed" body="premium-motion gallery · axe clean" date={new Date().toISOString()} unread />
        <NotificationItem title="New Premium kit" body="client-pitch-kit landed in registry" date={new Date(Date.now()-3600000).toISOString()} />
        <NotificationItem title="Stub thicken" body="24 product surfaces upgraded" date={new Date(Date.now()-7200000).toISOString()} />
      </div>
    </div>
  )
}
export { NotificationCenter }
