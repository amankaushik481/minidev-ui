"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Link } from "@/registry/ui/link"

function EmailFooter({
  address = "MiniDev · San Francisco",
  className,
}: {
  address?: string
  className?: string
}) {
  return (
    <div data-slot="email-footer" className={cn("space-y-2 border-t border-border bg-sunken px-6 py-5 text-center", className)}>
      <p className="text-xs text-fg-muted">{address}</p>
      <div className="flex justify-center gap-3 text-xs">
        <Link href="#">Unsubscribe</Link>
        <Link href="#">Preferences</Link>
      </div>
    </div>
  )
}
export { EmailFooter }
