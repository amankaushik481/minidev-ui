"use client"
import * as React from "react"
import { FormField } from "@/registry/ui/form-field"
import { Input } from "@/registry/ui/input"
import { Textarea } from "@/registry/ui/textarea"
import { Button } from "@/registry/ui/button"
import { cn } from "@/lib/utils"

/**
 * ProfileForm — a display name and bio form with a Save button, for account settings pages.
 *
 * Use it as a starting point for profile settings; the fields are native form controls, so the
 * values arrive in `onSubmit` as plain strings. For sign in or sign up use the auth forms.
 *
 * @example
 * <ProfileForm defaultValues={{ name: "Maya Chen" }} onSubmit={({ name, bio }) => save(name, bio)} />
 */

type ProfileValues = { name: string; bio: string }

function ProfileForm({
  defaultValues,
  onSubmit,
  className,
}: {
  /** Starting values for the fields. */
  defaultValues?: Partial<ProfileValues>
  /** Called with the trimmed values when the form is submitted. */
  onSubmit?: (values: ProfileValues) => void
  className?: string
}) {
  const id = React.useId()
  return (
    <form
      data-slot="profile-form"
      className={cn("space-y-3", className)}
      onSubmit={(e) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        onSubmit?.({ name: String(data.get("name") ?? "").trim(), bio: String(data.get("bio") ?? "").trim() })
      }}
    >
      <FormField id={`${id}-name`} label="Display name">
        <Input id={`${id}-name`} name="name" autoComplete="nickname" required defaultValue={defaultValues?.name ?? "Maya Chen"} />
      </FormField>
      <FormField id={`${id}-bio`} label="Bio">
        <Textarea id={`${id}-bio`} name="bio" placeholder="Short bio" defaultValue={defaultValues?.bio} />
      </FormField>
      <Button type="submit">Save profile</Button>
    </form>
  )
}
export { ProfileForm }
export type { ProfileValues }
