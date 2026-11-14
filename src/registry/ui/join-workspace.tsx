"use client"
import * as React from "react"
import { Button } from "@/registry/ui/button"
import { Input } from "@/registry/ui/input"
import { cn } from "@/lib/utils"

/**
 * JoinWorkspace — a card where an invited user enters an invite code to join a team workspace.
 *
 * Use it on an onboarding or "join your team" screen. For creating a new
 * workspace use WorkspaceCreate, for the admin's side use InviteMembers, and
 * for switching between workspaces use OrgSwitcher.
 *
 * @example
 * <JoinWorkspace onJoin={async (code) => { await api.join(code) }} />
 */
type JoinWorkspaceProps = {
  /** Called with the trimmed code on submit. Return a promise to show the pending state; throw an Error to show its message. */
  onJoin?: (code: string) => void | Promise<void>
  className?: string
}

function JoinWorkspace({ onJoin, className }: JoinWorkspaceProps) {
  const id = React.useId()
  const [code, setCode] = React.useState("")
  const [pending, setPending] = React.useState(false)
  const [error, setError] = React.useState("")

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const v = code.trim()
    if (!v) return setError("Enter the invite code.")
    setError("")
    setPending(true)
    try {
      await onJoin?.(v)
    } catch (err) {
      setError(err instanceof Error ? err.message : "That code did not work. Check it and try again.")
    } finally {
      setPending(false)
    }
  }

  return (
    <form
      data-slot="join-workspace"
      noValidate
      onSubmit={submit}
      aria-labelledby={`${id}-title`}
      className={cn("mx-auto w-full max-w-sm space-y-4 rounded-2xl border border-border bg-surface p-6 shadow-highlight", className)}
    >
      <div>
        <h2 id={`${id}-title`} className="text-lg font-medium tracking-[-0.014em] text-fg">Join a workspace</h2>
        <p className="mt-1 text-sm text-fg-muted">Enter the invite code from your team admin.</p>
      </div>
      <div className="space-y-1.5">
        <label htmlFor={`${id}-code`} className="block text-sm text-fg">
          Invite code
        </label>
        <Input
          id={`${id}-code`}
          name="code"
          className="font-mono"
          placeholder="md-team-••••"
          autoComplete="off"
          autoCapitalize="none"
          spellCheck={false}
          value={code}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          onChange={(e) => setCode(e.target.value)}
        />
        {error ? (
          <p id={`${id}-error`} role="alert" className="text-xs text-danger">
            {error}
          </p>
        ) : null}
      </div>
      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Joining…" : "Join workspace"}
      </Button>
    </form>
  )
}
export { JoinWorkspace }
export type { JoinWorkspaceProps }
