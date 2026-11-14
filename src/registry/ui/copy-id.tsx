"use client"
import * as React from "react"
import { CheckIcon, CopyIcon } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * A small monospace chip showing an id (user, invoice, request) that copies it on click.
 *
 * Use in tables, detail headers and logs where an id should be visible and copyable. Long ids truncate visually but copy in full.
 * For a labelled button beside some other text use CopyButton; for keys that should stay hidden use SecretReveal.
 *
 * @example
 * <CopyId value="usr_8f2a91c4" />
 */
type CopyIdProps = {
  /** The id shown and copied. */
  value: string
  /** Called after the id is on the clipboard. */
  onCopy?: (value: string) => void
  className?: string
}

function CopyId({ value, onCopy, className }: CopyIdProps) {
  const [copied, setCopied] = React.useState(false)
  const timer = React.useRef<ReturnType<typeof setTimeout>>(undefined)
  React.useEffect(() => () => clearTimeout(timer.current), [])
  return (
    <>
    <button
      type="button"
      data-slot="copy-id"
      data-copied={copied || undefined}
      aria-label={`Copy ${value}`}
      title={value}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border border-border bg-sunken px-2 py-1",
        "font-mono text-2xs tracking-[0.01em] text-fg-muted",
        "outline-none transition-[border-color] duration-[70ms] hover:border-fg-subtle focus-visible:ring-2 focus-visible:ring-accent",
        className
      )}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value)
        } catch {
          return
        }
        setCopied(true)
        onCopy?.(value)
        clearTimeout(timer.current)
        timer.current = setTimeout(() => setCopied(false), 1200)
      }}
    >
      <span className="max-w-40 truncate">{value}</span>
      {copied ? <CheckIcon aria-hidden className="size-3 text-success" /> : <CopyIcon aria-hidden className="size-3" />}
    </button>
    {/* Outside the button: a button's children are presentational, so a live region inside it may never be heard. */}
    <span className="sr-only" aria-live="polite">
      {copied ? "Copied" : ""}
    </span>
    </>
  )
}
export { CopyId }
export type { CopyIdProps }
