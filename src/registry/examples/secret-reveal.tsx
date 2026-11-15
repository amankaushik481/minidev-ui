"use client"
import { SecretReveal } from "@/registry/ui/secret-reveal"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "API keys",
    description: "The mask keeps the lum_live_ or lum_test_ prefix and the last four characters; label names both buttons.",
    code: `<div className="w-full max-w-sm space-y-3">
  <div className="space-y-1">
    <p className="text-xs font-medium text-fg-muted">Live key</p>
    <SecretReveal revealedValue="lum_live_4f8c2a91d7e03b65" label="live API key" />
  </div>
  <div className="space-y-1">
    <p className="text-xs font-medium text-fg-muted">Test key</p>
    <SecretReveal revealedValue="lum_test_9b1e7c3a5d20f846" label="test API key" />
  </div>
</div>`,
    node: (
      <div className="w-full max-w-sm space-y-3">
        <div className="space-y-1">
          <p className="text-xs font-medium text-fg-muted">Live key</p>
          <SecretReveal revealedValue="lum_live_4f8c2a91d7e03b65" label="live API key" />
        </div>
        <div className="space-y-1">
          <p className="text-xs font-medium text-fg-muted">Test key</p>
          <SecretReveal revealedValue="lum_test_9b1e7c3a5d20f846" label="test API key" />
        </div>
      </div>
    ),
  },
  {
    title: "Signing secret with your own mask",
    description: "Pass value for the masked text when the secret has no live or test prefix.",
    code: `<div className="w-full max-w-sm space-y-1">
  <p className="text-xs font-medium text-fg-muted">Webhook signing secret</p>
  <SecretReveal value="whsec_••••••••••••" revealedValue="whsec_3f9a1c7e2b8d4a60" label="signing secret" />
</div>`,
    node: (
      <div className="w-full max-w-sm space-y-1">
        <p className="text-xs font-medium text-fg-muted">Webhook signing secret</p>
        <SecretReveal value="whsec_••••••••••••" revealedValue="whsec_3f9a1c7e2b8d4a60" label="signing secret" />
      </div>
    ),
  },
]
