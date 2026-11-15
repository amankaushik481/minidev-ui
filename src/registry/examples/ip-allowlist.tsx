"use client"
import * as React from "react"
import { IpAllowlist } from "@/registry/ui/ip-allowlist"
import type { Example } from "./types"

function ControlledDemo() {
  const [ips, setIps] = React.useState(["198.51.100.0/24", "2001:db8::/32"])
  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      <IpAllowlist value={ips} onChange={setIps} />
      <p className="text-xs text-fg-muted tabular-nums">
        {ips.length} {ips.length === 1 ? "entry" : "entries"}. Requests from other addresses get a 403.
      </p>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Controlled with CIDR ranges",
    description: "IPv4 and IPv6 with an optional /prefix. onChange gets the whole list after every add or remove.",
    code: `function ControlledDemo() {
  const [ips, setIps] = React.useState(["198.51.100.0/24", "2001:db8::/32"])
  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      <IpAllowlist value={ips} onChange={setIps} />
      <p className="text-xs text-fg-muted tabular-nums">
        {ips.length} {ips.length === 1 ? "entry" : "entries"}. Requests from other addresses get a 403.
      </p>
    </div>
  )
}`,
    node: <ControlledDemo />,
  },
  {
    title: "Empty to start",
    description: "With no entries the list shows a dashed placeholder line. Try 10.0.0.300 to see the validation message.",
    code: `<IpAllowlist defaultValue={[]} className="w-full max-w-md" />`,
    node: <IpAllowlist defaultValue={[]} className="w-full max-w-md" />,
  },
]
