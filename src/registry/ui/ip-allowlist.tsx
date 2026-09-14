"use client"
import * as React from "react"
import { PlusIcon, TrashIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { inputVariants } from "@/registry/ui/input"
import { IconButton } from "@/registry/ui/icon-button"

function IpAllowlist({
  value,
  onChange,
  className,
}: {
  value?: string[]
  onChange?: (ips: string[]) => void
  className?: string
}) {
  const [internal, setInternal] = React.useState<string[]>(["203.0.113.10"])
  const ips = value ?? internal
  const [draft, setDraft] = React.useState("")
  const setIps = (next: string[]) => {
    if (value === undefined) setInternal(next)
    onChange?.(next)
  }
  return (
    <div data-slot="ip-allowlist" className={cn("space-y-3", className)}>
      <ul className="space-y-2">
        {ips.map((ip) => (
          <li key={ip} className="flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2">
            <span className="flex-1 font-mono text-sm text-fg">{ip}</span>
            <IconButton type="button" size="icon-sm" variant="ghost" aria-label={`Remove ${ip}`} onClick={() => setIps(ips.filter((x) => x !== ip))}>
              <TrashIcon />
            </IconButton>
          </li>
        ))}
      </ul>
      <div className="flex gap-2">
        <input
          aria-label="IP address"
          placeholder="203.0.113.0/24"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          className={cn(inputVariants({ size: "default" }), "flex-1 font-mono")}
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            const v = draft.trim()
            if (!v || ips.includes(v)) return
            setIps([...ips, v])
            setDraft("")
          }}
        >
          <PlusIcon /> Add
        </Button>
      </div>
    </div>
  )
}
export { IpAllowlist }
