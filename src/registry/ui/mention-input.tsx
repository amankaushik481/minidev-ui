"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { inputVariants } from "@/registry/ui/input"

/**
 * MentionInput — a comment box that suggests people when you type "@" and inserts the handle you pick.
 *
 * The suggestion list follows the caret, so mentions work mid-sentence, not only at the end.
 * Keyboard: ArrowUp/ArrowDown move, Enter or Tab inserts, Escape closes; the textarea keeps
 * focus and announces the active option through aria-activedescendant. Controlled or
 * uncontrolled. Use TagsInput for a list of chips instead of free text.
 *
 * @example
 * const [text, setText] = React.useState("")
 * <label htmlFor="reply">Reply</label>
 * <MentionInput id="reply" value={text} onChange={setText} suggestions={["maya", "theo", "priya"]} />
 */
type MentionInputProps = {
  /** Controlled text. */
  value?: string
  /** Initial text when uncontrolled. */
  defaultValue?: string
  /** Fires with the full text on every edit, including when a suggestion is inserted. */
  onChange?: (value: string) => void
  /** Fires with the handle (without "@") when a suggestion is inserted. */
  onMention?: (handle: string) => void
  /** Handles offered after "@", filtered by what follows it. At most six show at once. */
  suggestions?: string[]
  disabled?: boolean
  /** Classes for the wrapper. */
  className?: string
  /** Pair with a visible <label htmlFor>. */
  id?: string
  placeholder?: string
  /** Accessible name. Defaults to "Comment" when there is no `id` to hang a label on. */
  "aria-label"?: string
}

// "@" at the start or after whitespace, then the partial handle up to the caret.
const TRIGGER = /(^|\s)@([\w.-]*)$/

function MentionInput({
  value,
  defaultValue = "",
  onChange,
  onMention,
  suggestions = [],
  disabled,
  className,
  id,
  placeholder = "Write a comment… use @ to mention",
  "aria-label": ariaLabel,
}: MentionInputProps) {
  const [inner, setInner] = React.useState(defaultValue)
  const text = value ?? inner
  const [query, setQuery] = React.useState<string | null>(null)
  const [active, setActive] = React.useState(0)
  const ref = React.useRef<HTMLTextAreaElement>(null)
  const caret = React.useRef<number | null>(null)
  const listId = React.useId()
  const filtered =
    query === null ? [] : suggestions.filter((s) => s.toLowerCase().includes(query.toLowerCase())).slice(0, 6)
  const open = filtered.length > 0 && !disabled
  const current = Math.min(active, filtered.length - 1)

  // Put the caret back after the inserted handle once React has written the new value.
  React.useLayoutEffect(() => {
    if (caret.current === null || !ref.current) return
    ref.current.setSelectionRange(caret.current, caret.current)
    caret.current = null
  })

  const update = (next: string) => {
    if (value === undefined) setInner(next)
    onChange?.(next)
  }

  const detect = (el: HTMLTextAreaElement) => {
    const m = el.value.slice(0, el.selectionStart ?? el.value.length).match(TRIGGER)
    const next = m ? m[2] : null
    if (next !== query) {
      setQuery(next)
      setActive(0)
    }
  }

  const pick = (handle: string) => {
    const end = ref.current?.selectionStart ?? text.length
    const head = text.slice(0, end).replace(/@[\w.-]*$/, `@${handle} `)
    caret.current = head.length
    update(head + text.slice(end))
    setQuery(null)
    onMention?.(handle)
    ref.current?.focus()
  }

  return (
    <div data-slot="mention-input" className={cn("relative w-full", className)}>
      <textarea
        ref={ref}
        id={id}
        disabled={disabled}
        value={text}
        placeholder={placeholder}
        aria-label={ariaLabel ?? (id ? undefined : "Comment")}
        role="combobox"
        aria-expanded={open}
        aria-autocomplete="list"
        aria-controls={open ? listId : undefined}
        aria-activedescendant={open ? `${listId}-${current}` : undefined}
        rows={3}
        className={cn(inputVariants({ size: "default" }), "h-auto min-h-20 resize-y py-2")}
        onChange={(e) => {
          update(e.target.value)
          detect(e.target)
        }}
        onSelect={(e) => detect(e.currentTarget)}
        onBlur={() => setQuery(null)}
        onKeyDown={(e) => {
          if (!open) return
          if (e.key === "ArrowDown") setActive((current + 1) % filtered.length)
          else if (e.key === "ArrowUp") setActive((current - 1 + filtered.length) % filtered.length)
          else if (e.key === "Enter" || e.key === "Tab") pick(filtered[current])
          else if (e.key === "Escape") setQuery(null)
          else return
          e.preventDefault()
        }}
      />
      {open ? (
        <ul
          id={listId}
          role="listbox"
          aria-label="Mention suggestions"
          className="absolute z-50 mt-1.5 max-h-48 w-56 overflow-auto rounded-xl border border-border bg-raised p-1 shadow-overlay"
        >
          {filtered.map((s, i) => (
            <li
              key={s}
              id={`${listId}-${i}`}
              role="option"
              aria-selected={i === current}
              data-active={i === current || undefined}
              className="flex cursor-default rounded-lg px-2.5 py-1.5 text-sm text-fg transition-[background-color] duration-[70ms] data-active:bg-sunken"
              // Keep focus in the textarea so the caret position survives the click.
              onMouseDown={(e) => e.preventDefault()}
              onMouseEnter={() => setActive(i)}
              onClick={() => pick(s)}
            >
              @{s}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
export { MentionInput }
export type { MentionInputProps }
