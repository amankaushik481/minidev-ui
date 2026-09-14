"use client"
import * as React from "react"
import { XIcon } from "lucide-react"
import { cn } from "@/lib/utils"

type TagsInputProps = {
  value?: string[]
  defaultValue?: string[]
  onChange?: (tags: string[]) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  "aria-label"?: string
  "aria-invalid"?: boolean
}

function TagsInput({ value, defaultValue = [], onChange, placeholder = "Add tag", disabled, className, ...a11y }: TagsInputProps) {
  const [internal, setInternal] = React.useState(defaultValue)
  const tags = value ?? internal
  const [draft, setDraft] = React.useState("")
  const setTags = (next: string[]) => {
    if (value === undefined) setInternal(next)
    onChange?.(next)
  }
  const commit = () => {
    const t = draft.trim()
    if (!t || tags.includes(t)) { setDraft(""); return }
    setTags([...tags, t])
    setDraft("")
  }
  return (
    <div
      data-slot="tags-input"
      className={cn(
        "flex min-h-9 w-full flex-wrap items-center gap-1.5 rounded-lg border border-border bg-surface px-2 py-1.5",
        "shadow-[inset_0_1px_0_oklch(1_0_0/0.5)]",
        "focus-within:border-accent focus-within:ring-2 focus-within:ring-accent focus-within:ring-offset-2 focus-within:ring-offset-bg",
        "aria-invalid:border-danger",
        disabled && "pointer-events-none bg-sunken",
        className
      )}
      aria-invalid={a11y["aria-invalid"]}
    >
      {tags.map((tag) => (
        <span key={tag} className="inline-flex h-6 items-center gap-1 rounded-md border border-border bg-sunken px-2 text-xs font-medium text-fg">
          {tag}
          <button
            type="button"
            aria-label={`Remove ${tag}`}
            disabled={disabled}
            className="text-fg-muted hover:text-fg"
            onClick={() => setTags(tags.filter((x) => x !== tag))}
          >
            <XIcon className="size-3" />
          </button>
        </span>
      ))}
      <input
        aria-label={a11y["aria-label"] ?? "Tag input"}
        disabled={disabled}
        value={draft}
        placeholder={tags.length ? undefined : placeholder}
        className="min-w-24 flex-1 bg-transparent text-sm text-fg outline-none placeholder:text-fg-muted"
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === ",") { e.preventDefault(); commit() }
          if (e.key === "Backspace" && !draft && tags.length) setTags(tags.slice(0, -1))
        }}
        onBlur={commit}
      />
    </div>
  )
}
export { TagsInput }
