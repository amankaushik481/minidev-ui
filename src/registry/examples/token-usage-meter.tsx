"use client"
import { TokenUsageMeter } from "@/registry/ui/token-usage-meter"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Close to the limit",
    description: "The percentage is computed from used and limit; note follows it on the last line.",
    code: `<TokenUsageMeter className="w-full max-w-sm" used={1_840_000} limit={2_000_000} note="of the Team plan · resets Dec 1" />`,
    node: (
      <TokenUsageMeter className="w-full max-w-sm" used={1_840_000} limit={2_000_000} note="of the Team plan · resets Dec 1" />
    ),
  },
  {
    title: "Per-project budgets",
    description: "One meter per project or API key. Over the limit, the bar stops at 100% but the numbers stay exact.",
    code: `<div className="grid w-full max-w-2xl gap-3 sm:grid-cols-2">
  <TokenUsageMeter label="Support assistant" used={312_500} limit={500_000} note="of this month's budget" />
  <TokenUsageMeter label="Nightly reports" used={530_200} limit={500_000} note="budget used · new runs paused" />
</div>`,
    node: (
      <div className="grid w-full max-w-2xl gap-3 sm:grid-cols-2">
        <TokenUsageMeter label="Support assistant" used={312_500} limit={500_000} note="of this month's budget" />
        <TokenUsageMeter label="Nightly reports" used={530_200} limit={500_000} note="budget used · new runs paused" />
      </div>
    ),
  },
]
