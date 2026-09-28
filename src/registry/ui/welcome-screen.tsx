"use client"
import { Button } from "@/registry/ui/button"
import { cn } from "@/lib/utils"

function WelcomeScreen({ className }: { className?: string }) {
  return (
    <div data-slot="welcome-screen" className={cn("rounded-2xl border border-border bg-surface p-8 shadow-highlight", className)}>
      <p className="text-xs font-medium uppercase tracking-[0.01em] text-accent">Welcome</p>
      <h2 className="mt-2 text-2xl font-medium tracking-[-0.018em] text-fg">Ship Hairline UI today</h2>
      <p className="mt-2 max-w-md text-sm leading-[1.55] text-fg-muted">Start from free product primitives, unlock Premium moments when a page has to convert.</p>
      <ol className="mt-6 space-y-2 text-sm text-fg-muted">
        <li>1. Copy a component from the gallery</li>
        <li>2. Invite your team and pick a workspace name</li>
        <li>3. Run the audit gate before you share</li>
      </ol>
      <div className="mt-6 flex gap-2">
        <Button>Open gallery</Button>
        <Button variant="outline">Read docs</Button>
      </div>
    </div>
  )
}
export { WelcomeScreen }
