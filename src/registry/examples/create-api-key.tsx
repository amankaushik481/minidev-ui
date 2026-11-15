"use client"
import * as React from "react"
import { CreateApiKey } from "@/registry/ui/create-api-key"
import { SecretReveal } from "@/registry/ui/secret-reveal"
import type { Example } from "./types"

function RevealDemo() {
  const [created, setCreated] = React.useState<{ name: string; secret: string } | null>(null)
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <CreateApiKey
        onCreate={(name) => setCreated({ name, secret: "nw_live_" + Math.random().toString(36).slice(2, 14) })}
      />
      {created ? (
        <div className="space-y-1.5">
          <p className="text-xs text-fg-muted">Copy the {created.name} key now. It is shown only once.</p>
          <SecretReveal revealedValue={created.secret} label={`${created.name} API key`} defaultRevealed />
        </div>
      ) : null}
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Create, then show the secret once",
    description: "Generate the key on your server in onCreate and show it with SecretReveal. The name field clears once onCreate returns; return a promise and it waits, keeping the name if the promise rejects.",
    code: `function RevealDemo() {
  const [created, setCreated] = React.useState<{ name: string; secret: string } | null>(null)
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <CreateApiKey
        onCreate={(name) => setCreated({ name, secret: "nw_live_" + Math.random().toString(36).slice(2, 14) })}
      />
      {created ? (
        <div className="space-y-1.5">
          <p className="text-xs text-fg-muted">Copy the {created.name} key now. It is shown only once.</p>
          <SecretReveal revealedValue={created.secret} label={\`\${created.name} API key\`} defaultRevealed />
        </div>
      ) : null}
    </div>
  )
}`,
    node: <RevealDemo />,
  },
  {
    title: "Custom label",
    description: "label and placeholder describe what this key is for, such as a webhook signing secret.",
    code: `<CreateApiKey className="w-full max-w-md" label="Webhook name" placeholder="Invoice events" />`,
    node: <CreateApiKey className="w-full max-w-md" label="Webhook name" placeholder="Invoice events" />,
  },
]
