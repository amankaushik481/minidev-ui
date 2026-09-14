"use client"
import { Switch } from "@/registry/ui/switch"
import { Label } from "@/registry/ui/label"
import { cn } from "@/lib/utils"
function NotificationPreferences({ className }: { className?: string }) {
  return (
    <div data-slot="notification-preferences" className={cn("space-y-3", className)}>
      {[
        ["email", "Email digests"],
        ["product", "Product updates"],
        ["security", "Security alerts"],
      ].map(([id, label]) => (
        <div key={id} className="flex items-center justify-between gap-3">
          <Label htmlFor={id}>{label}</Label>
          <Switch id={id} defaultChecked={id !== "product"} />
        </div>
      ))}
    </div>
  )
}
export { NotificationPreferences }
