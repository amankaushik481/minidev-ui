"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
function SettingsLayout({ nav, children, className }: { nav: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <div data-slot="settings-layout" className={cn("grid gap-6 md:grid-cols-[200px_1fr]", className)}>
      <aside className="space-y-1">{nav}</aside>
      <div>{children}</div>
    </div>
  )
}
function SettingsSection({ title, description, children, className }: { title: string; description?: string; children: React.ReactNode; className?: string }) {
  return (
    <section data-slot="settings-section" className={cn("border-b border-border py-6 last:border-b-0", className)}>
      <h2 className="text-sm font-medium text-fg">{title}</h2>
      {description ? <p className="mt-1 text-xs text-fg-muted">{description}</p> : null}
      <div className="mt-4">{children}</div>
    </section>
  )
}
export { SettingsLayout, SettingsSection }
