"use client"
import * as React from "react"
import { XIcon } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * A text field that turns typed entries into removable tag chips (Enter or comma adds, Backspace removes the last).
 *
 * Use it for free-form labels, emails or keywords. Reach for `MultiSelect` when values must come from a fixed list, or `MentionInput` for @mentions inside text.
 *
 * @example
 * <TagsInput defaultValue={["finance", "q3"]} onChange={setTags} aria-label="Invoice labels" />
 */
type TagsInputProps = {
  /** Controlled tags. Pair with `onChange`. */
  value?: string[]
  /** Initial tags for the uncontrolled field. */
  defaultValue?: string[]
  /** Called with the full next list whenever a tag is added or removed. */
  onChange?: (tags: string[]) => void
  /** Shown only while there are no tags. */
  placeholder?: string
  /** Most tags allowed; further entries are ignored. */
  max?: number
  disabled?: boolean
  /** Id for the inner text input, so a `<Label htmlFor>` can point at it. */
  id?: string
  /** Submits each tag as its own hidden input under this name, so `FormData.getAll(name)` returns the list. No name by default. */
  name?: string
  className?: string
  "aria-label"?: string
  "aria-invalid"?: boolean
}

function TagsInput({ value, defaultValue = [], onChange, placeholder = "Add tag", max = Infinity, disabled, id, name, className, ...a11y }: TagsInputProps) {
  const [internal, setInternal] = React.useState(defaultValue)
  const tags = value ?? internal
  const [draft, setDraft] = React.useState("")
  const [announce, setAnnounce] = React.useState("")
  const setTags = (next: string[], message: string) => {
    if (value === undefined) setInternal(next)
    onChange?.(next)
    setAnnounce(message)
  }
  // Pasting "a, b, c" adds three tags; duplicates and blanks are dropped.
  const commit = () => {
    const fresh = [...new Set(draft.split(",").map((t) => t.trim()).filter((t) => t && !tags.includes(t)))]
    const room = fresh.slice(0, Math.max(0, max - tags.length))
    setDraft("")
    if (room.length) setTags([...tags, ...room], `Added ${room.join(", ")}`)
  }
  const remove = (tag: string) => setTags(tags.filter((x) => x !== tag), `Removed ${tag}`)
  return (
    <div
      data-slot="tags-input"
      aria-invalid={a11y["aria-invalid"]}
      aria-disabled={disabled || undefined}
      className={cn(
        "flex min-h-9 w-full flex-wrap items-center gap-1.5 rounded-lg border border-border bg-surface px-2 py-1.5 shadow-xs",
        "transition-[border-color,box-shadow] duration-[140ms] ease-hairline hover:border-border-strong",
        "focus-within:border-accent focus-within:shadow-[0_0_0_3px_var(--accent-soft)]",
        "aria-invalid:border-danger aria-invalid:focus-within:shadow-[0_0_0_3px_color-mix(in_oklch,var(--danger)_14%,transparent)]",
        disabled && "pointer-events-none bg-sunken text-fg-muted shadow-none",
        className
      )}
    >
      {name ? tags.map((tag) => <input key={tag} type="hidden" name={name} value={tag} disabled={disabled} />) : null}
      {tags.map((tag) => (
        <span key={tag} className="inline-flex h-6 items-center gap-1 rounded-md border border-border bg-sunken pr-1 pl-2 text-xs font-medium text-fg">
          {tag}
          <button
            type="button"
            aria-label={`Remove ${tag}`}
            disabled={disabled}
            className="grid size-4 place-items-center rounded-sm text-fg-muted outline-none hover:text-fg focus-visible:ring-2 focus-visible:ring-accent"
            onClick={() => remove(tag)}
          >
            <XIcon className="size-3" aria-hidden />
          </button>
        </span>
      ))}
      <input
        id={id}
        aria-label={a11y["aria-label"] ?? (id ? undefined : "Add tag")}
        aria-invalid={a11y["aria-invalid"]}
        disabled={disabled}
        value={draft}
        placeholder={tags.length ? undefined : placeholder}
        enterKeyHint="enter"
        className="h-6 min-w-24 flex-1 bg-transparent text-sm text-fg outline-none placeholder:text-fg-subtle disabled:cursor-not-allowed"
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === ",") {
            // Enter with an empty draft still submits the surrounding form.
            if (e.key === "," || draft.trim()) e.preventDefault()
            commit()
          }
          if (e.key === "Backspace" && !draft && tags.length) remove(tags[tags.length - 1])
        }}
        onBlur={commit}
      />
      <span aria-live="polite" className="sr-only">
        {announce}
      </span>
    </div>
  )
}
export { TagsInput }
export type { TagsInputProps }
