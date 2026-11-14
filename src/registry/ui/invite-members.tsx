"use client"
import * as React from "react"
import { Button } from "@/registry/ui/button"
import { Input } from "@/registry/ui/input"
import { Badge } from "@/registry/ui/badge"
import { cn } from "@/lib/utils"

/**
 * InviteMembers — a card with an email field that sends workspace invites and lists the ones still pending.
 *
 * Use it in team settings or onboarding. For managing existing members and
 * seats use SeatManager or TeamMemberRow, for CSV uploads use BulkUserImport,
 * and for the invitee's side use JoinWorkspace.
 *
 * Works uncontrolled out of the box; pass `pending` and handle `onInvite` to
 * keep the list in your own state.
 *
 * @example
 * <InviteMembers pending={invites} onInvite={(email) => api.invite(email)} />
 */
type InviteMembersProps = {
  /** Card title. */
  title?: string
  /** One line under the title. */
  description?: string
  /** Pending invite emails (controlled). */
  pending?: string[]
  /** Initial pending emails when uncontrolled. */
  defaultPending?: string[]
  /** Called with a valid, new email when the form is submitted. */
  onInvite?: (email: string) => void
  className?: string
}

function InviteMembers({
  title = "Invite members",
  description = "They get free UI access. Premium unlocks follow the workspace plan.",
  pending,
  defaultPending = ["sam@acme.co", "lee@north.io"],
  onInvite,
  className,
}: InviteMembersProps) {
  const id = React.useId()
  const [inner, setInner] = React.useState(defaultPending)
  const list = pending ?? inner
  const [email, setEmail] = React.useState("")
  const [error, setError] = React.useState("")

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const v = email.trim().toLowerCase()
    if (!e.currentTarget.checkValidity() || !v) return setError("Enter a valid email address.")
    if (list.includes(v)) return setError(`${v} is already invited.`)
    setError("")
    setEmail("")
    if (pending === undefined) setInner([...list, v])
    onInvite?.(v)
  }

  return (
    <div data-slot="invite-members" className={cn("space-y-4 rounded-2xl border border-border bg-surface p-5 shadow-highlight", className)}>
      <div>
        <h3 id={`${id}-title`} className="text-sm font-medium text-fg">{title}</h3>
        {description ? <p className="mt-1 text-xs text-fg-muted">{description}</p> : null}
      </div>
      <form noValidate onSubmit={submit} aria-labelledby={`${id}-title`} className="space-y-1.5">
        <div className="flex gap-2">
          <Input
            type="email"
            required
            autoComplete="off"
            aria-label="Email address"
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `${id}-error` : undefined}
            placeholder="email@company.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (error) setError("")
            }}
            className="flex-1"
          />
          <Button type="submit">Send</Button>
        </div>
        {error ? (
          <p id={`${id}-error`} role="alert" className="text-xs text-danger">
            {error}
          </p>
        ) : null}
      </form>
      {list.length ? (
        <ul aria-label="Pending invites" className="flex flex-wrap gap-2">
          {list.map((e) => (
            <li key={e}>
              <Badge variant="outline">{e} · pending</Badge>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
export { InviteMembers }
export type { InviteMembersProps }
