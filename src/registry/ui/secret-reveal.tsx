"use client"
import * as React from "react"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { IconButton } from "@/registry/ui/icon-button"
import { CopyButton } from "@/registry/ui/copy-button"

/**
 * SecretReveal — a masked API key or token with Reveal and Copy buttons.
 *
 * Use it on API key and webhook secret settings. Copy always copies the real secret, even while
 * masked. Pass only `revealedValue` and the mask is generated, keeping the prefix and the last
 * four characters. For a plain copyable value use CodeBlock or CopyButton.
 *
 * @example
 * <SecretReveal revealedValue={apiKey} label="Live API key" />
 */
function mask(secret: string) {
  const prefix = secret.match(/^[a-z]+_(?:live|test)_/i)?.[0] ?? ""
  const tail = secret.slice(-4)
  return `${prefix}${"•".repeat(8)}${tail}`
}

function SecretReveal({
  value,
  revealedValue = "md_live_8k2m9f2a",
  label = "secret",
  defaultRevealed = false,
  className,
}: {
  /** The masked text shown while hidden. Generated from `revealedValue` when omitted. */
  value?: string
  /** The real secret, shown when revealed and always used for Copy. */
  revealedValue?: string
  /** Names the buttons, e.g. "API key" gives "Reveal API key" and "Copy API key". */
  label?: string
  /** Start revealed. */
  defaultRevealed?: boolean
  className?: string
}) {
  const [open, setOpen] = React.useState(defaultRevealed)
  return (
    <div data-slot="secret-reveal" className={cn("flex items-center gap-2 rounded-lg border border-border bg-sunken px-2 py-1.5", className)}>
      <code className="flex-1 truncate font-mono text-xs text-fg">{open ? revealedValue : (value ?? mask(revealedValue))}</code>
      <IconButton
        type="button"
        size="icon-sm"
        variant="ghost"
        aria-label={`${open ? "Hide" : "Reveal"} ${label}`}
        aria-pressed={open}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <EyeOffIcon aria-hidden /> : <EyeIcon aria-hidden />}
      </IconButton>
      <CopyButton value={revealedValue} aria-label={`Copy ${label}`} />
    </div>
  )
}
export { SecretReveal }
