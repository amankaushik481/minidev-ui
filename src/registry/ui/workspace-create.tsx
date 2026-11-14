"use client"
import * as React from "react"
import { FormField } from "@/registry/ui/form-field"
import { Input } from "@/registry/ui/input"
import { Button } from "@/registry/ui/button"
import { cn } from "@/lib/utils"

/**
 * A create-workspace form: name (required) and URL slug, which follows the name until edited, plus a submit button.
 *
 * `onCreate` gets `{ name, slug }` on submit; Enter submits. Use `JoinWorkspace` to join an existing one and `OrgSwitcher` to move between workspaces.
 *
 * @example
 * <WorkspaceCreate onCreate={({ name, slug }) => createWorkspace(name, slug)} />
 */
type WorkspaceCreateProps = {
  /** Called on submit with the trimmed name and the slug. */
  onCreate?: (workspace: { name: string; slug: string }) => void
  /** Disables the button and shows it busy while the workspace is created. */
  pending?: boolean
  className?: string
}

const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48)

function WorkspaceCreate({ onCreate, pending, className }: WorkspaceCreateProps) {
  const id = React.useId()
  const [name, setName] = React.useState("")
  const [slug, setSlug] = React.useState<string | null>(null)
  const url = slug ?? slugify(name)
  return (
    <form
      data-slot="workspace-create"
      className={cn("space-y-3", className)}
      onSubmit={(e) => {
        e.preventDefault()
        if (name.trim()) onCreate?.({ name: name.trim(), slug: slugify(url) || slugify(name) })
      }}
    >
      <FormField id={`${id}-name`} label="Workspace name" required>
        <Input id={`${id}-name`} name="name" required autoComplete="organization" placeholder="Northwind" value={name} onChange={(e) => setName(e.target.value)} />
      </FormField>
      <FormField id={`${id}-url`} label="URL" description={url ? `lumen.app/${url}` : "Lowercase letters, numbers and dashes."}>
        <Input
          id={`${id}-url`}
          name="slug"
          placeholder="northwind"
          spellCheck={false}
          autoCapitalize="off"
          className="font-mono"
          value={url}
          // Keep dashes while typing; clearing the field makes it follow the name again.
          onChange={(e) => setSlug(e.target.value ? e.target.value.toLowerCase().replace(/[^a-z0-9-]+/g, "-") : null)}
        />
      </FormField>
      <Button type="submit" disabled={pending} aria-busy={pending || undefined}>
        {pending ? "Creating…" : "Create workspace"}
      </Button>
    </form>
  )
}
export { WorkspaceCreate }
export type { WorkspaceCreateProps }
