"use client"
import { Button } from "@/registry/ui/button"
import { Input } from "@/registry/ui/input"
import { cn } from "@/lib/utils"

function JoinWorkspace({ className }: { className?: string }) {
  return (
    <div data-slot="join-workspace" className={cn("mx-auto w-full max-w-sm space-y-4 rounded-2xl border border-border bg-surface p-6 shadow-highlight", className)}>
      <div>
        <h2 className="text-lg font-medium tracking-[-0.014em] text-fg">Join a workspace</h2>
        <p className="mt-1 text-sm text-fg-muted">Enter the invite code from your team admin.</p>
      </div>
      <label className="block text-sm text-fg">Invite code
        <Input className="mt-1.5 font-mono" placeholder="md-team-••••" aria-label="Invite code" />
      </label>
      <Button className="w-full">Join workspace</Button>
    </div>
  )
}
export { JoinWorkspace }
