"use client"
import * as React from "react"
import { CheckIcon, CopyIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/registry/ui/button"
import { type VariantProps } from "class-variance-authority"

/**
 * A Button that copies `value` to the clipboard and flips to a check and "Copied" for 1.5s, announced to screen readers.
 *
 * Use beside API keys, links, install commands and ids. Takes every Button variant and size.
 * For a monospace id that is itself the button use CopyId; for a whole snippet use CodeBlock (it has its own copy button).
 *
 * @example
 * <CopyButton value="npx shadcn@latest add https://ui.minidev.pro/r/button.json" label="Copy command" />
 */
type CopyButtonProps = {
  /** The text written to the clipboard. */
  value: string
  /** Button text at rest. Defaults to "Copy". */
  label?: string
  /** Button text after a successful copy. Defaults to "Copied". */
  copiedLabel?: string
  /** Called after the text is on the clipboard. */
  onCopy?: (value: string) => void
} & React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants>

function CopyButton({
  value,
  className,
  variant = "outline",
  size = "sm",
  label = "Copy",
  copiedLabel = "Copied",
  onCopy,
  onClick,
  ...props
}: CopyButtonProps) {
  const [copied, setCopied] = React.useState(false)
  const timer = React.useRef<ReturnType<typeof setTimeout>>(undefined)
  React.useEffect(() => () => clearTimeout(timer.current), [])
  return (
    <>
      <Button
        type="button"
        variant={variant}
        size={size}
        data-slot="copy-button"
        data-copied={copied || undefined}
        className={cn(className)}
        aria-label={copied ? copiedLabel : label}
        {...props}
        onClick={async (e) => {
          onClick?.(e)
          if (e.defaultPrevented) return
          try {
            await navigator.clipboard.writeText(value)
          } catch {
            return // Clipboard blocked (insecure context or denied): do not claim success.
          }
          setCopied(true)
          onCopy?.(value)
          clearTimeout(timer.current)
          timer.current = setTimeout(() => setCopied(false), 1500)
        }}
      >
        {copied ? <CheckIcon aria-hidden className="text-success" /> : <CopyIcon aria-hidden />}
        {copied ? copiedLabel : label}
      </Button>
      <span className="sr-only" aria-live="polite">
        {copied ? copiedLabel : ""}
      </span>
    </>
  )
}
export { CopyButton }
export type { CopyButtonProps }
