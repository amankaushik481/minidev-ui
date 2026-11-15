"use client"
import * as React from "react"
import { PlusIcon, TrashIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { inputVariants } from "@/registry/ui/input"
import { IconButton } from "@/registry/ui/icon-button"

/**
 * IpAllowlist — an editable list of IP addresses and CIDR ranges allowed to reach an account or API key.
 *
 * Type an IPv4 or IPv6 address, optionally with a /prefix, and press Enter or
 * Add; bad and duplicate entries are rejected with a message. Use it in
 * security settings. For free-form tags use TagsInput; for API keys use
 * ApiKeyList. Always validate again on the server.
 *
 * @example
 * <IpAllowlist value={ips} onChange={setIps} />
 */
type IpAllowlistProps = {
  /** Allowed entries (controlled). */
  value?: string[]
  /** Initial entries when uncontrolled. */
  defaultValue?: string[]
  /** Called with the full list after an add or remove. */
  onChange?: (ips: string[]) => void
  className?: string
}

const IPV4 = /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}(\/(3[0-2]|[12]?\d))?$/

// shortcut: IPv6 with an embedded IPv4 tail (::ffff:1.2.3.4) is rejected; accept it here if your users need it.
function isIpOrCidr(v: string) {
  if (IPV4.test(v)) return true
  const [addr, prefix, ...rest] = v.split("/")
  if (rest.length || (prefix !== undefined && !/^(12[0-8]|1[01]\d|[1-9]?\d)$/.test(prefix)) || !addr.includes(":")) return false
  const halves = addr.split("::")
  if (halves.length > 2) return false
  const groups = halves.flatMap((h) => (h ? h.split(":") : []))
  if (!groups.every((g) => /^[0-9a-f]{1,4}$/i.test(g))) return false
  return halves.length === 2 ? groups.length < 8 : groups.length === 8
}

function IpAllowlist({ value, defaultValue = ["203.0.113.10"], onChange, className }: IpAllowlistProps) {
  const id = React.useId()
  const [internal, setInternal] = React.useState<string[]>(defaultValue)
  const ips = value ?? internal
  const [draft, setDraft] = React.useState("")
  const [error, setError] = React.useState("")
  const setIps = (next: string[]) => {
    if (value === undefined) setInternal(next)
    onChange?.(next)
  }
  const add = () => {
    const v = draft.trim()
    if (!v) return
    if (!isIpOrCidr(v)) return setError("Enter an IPv4 or IPv6 address, optionally with a /prefix.")
    // IPv6 hex is case-insensitive, so 2001:DB8::1 duplicates 2001:db8::1.
    if (ips.some((ip) => ip.toLowerCase() === v.toLowerCase())) return setError(`${v} is already on the list.`)
    setError("")
    setIps([...ips, v])
    setDraft("")
  }
  return (
    <div data-slot="ip-allowlist" className={cn("space-y-3", className)}>
      {ips.length ? (
        <ul aria-label="Allowed IP addresses" className="space-y-2">
          {ips.map((ip) => (
            <li key={ip} className="flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2">
              <span className="flex-1 truncate font-mono text-sm text-fg">{ip}</span>
              <IconButton type="button" size="icon-sm" variant="ghost" aria-label={`Remove ${ip}`} onClick={() => setIps(ips.filter((x) => x !== ip))}>
                <TrashIcon />
              </IconButton>
            </li>
          ))}
        </ul>
      ) : (
        <p className="rounded-lg border border-dashed border-border px-3 py-2 text-sm text-fg-muted">No addresses added yet.</p>
      )}
      <div className="space-y-1.5">
        <div className="flex gap-2">
          <input
            aria-label="IP address or CIDR range"
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `${id}-error` : undefined}
            placeholder="203.0.113.0/24"
            inputMode="text"
            autoComplete="off"
            spellCheck={false}
            value={draft}
            onChange={(e) => {
              setDraft(e.target.value)
              if (error) setError("")
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                add()
              }
            }}
            className={cn(inputVariants({ size: "default" }), "flex-1 font-mono")}
          />
          <Button type="button" variant="outline" onClick={add}>
            <PlusIcon /> Add
          </Button>
        </div>
        {error ? (
          <p id={`${id}-error`} role="alert" className="text-xs text-danger">
            {error}
          </p>
        ) : null}
      </div>
    </div>
  )
}
export { IpAllowlist }
export type { IpAllowlistProps }
