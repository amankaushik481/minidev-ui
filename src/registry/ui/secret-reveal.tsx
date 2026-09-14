"use client"
import * as React from "react"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { IconButton } from "@/registry/ui/icon-button"
import { CopyButton } from "@/registry/ui/copy-button"

function SecretReveal({
  value = "md_live_••••••••9f2a",
  revealedValue = "md_live_8k2m9f2a",
  className,
}: {
  value?: string
  revealedValue?: string
  className?: string
}) {
  const [open, setOpen] = React.useState(false)
  return (
    <div data-slot="secret-reveal" className={cn("flex items-center gap-2 rounded-lg border border-border bg-sunken px-2 py-1.5", className)}>
      <code className="flex-1 truncate font-mono text-xs text-fg">{open ? revealedValue : value}</code>
      <IconButton type="button" size="icon-sm" variant="ghost" aria-label={open ? "Hide secret" : "Reveal secret"} onClick={() => setOpen((v) => !v)}>
        {open ? <EyeOffIcon /> : <EyeIcon />}
      </IconButton>
      <CopyButton value={revealedValue} aria-label="Copy secret" />
    </div>
  )
}
export { SecretReveal }
