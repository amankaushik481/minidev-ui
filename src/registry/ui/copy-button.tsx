"use client"
import * as React from "react"
import { CheckIcon, CopyIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/registry/ui/button"
import { type VariantProps } from "class-variance-authority"

function CopyButton({
  value,
  className,
  variant = "outline",
  size = "sm",
  label = "Copy",
  copiedLabel = "Copied",
  ...props
}: {
  value: string
  label?: string
  copiedLabel?: string
} & React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants>) {
  const [copied, setCopied] = React.useState(false)
  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      data-slot="copy-button"
      className={cn(className)}
      aria-label={copied ? copiedLabel : label}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value)
          setCopied(true)
          setTimeout(() => setCopied(false), 1500)
        } catch {
          /* ignore */
        }
      }}
      {...props}
    >
      {copied ? <CheckIcon className="text-success" /> : <CopyIcon />}
      {copied ? copiedLabel : label}
    </Button>
  )
}
export { CopyButton }
