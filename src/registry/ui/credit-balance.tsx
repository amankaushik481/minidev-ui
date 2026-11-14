"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * A compact inline readout of a prepaid balance: a small label and a large tabular number ("Credits 1,240").
 *
 * Use in a topbar, billing page or usage screen for AI credits, wallet or prepaid balances. Format the number yourself.
 * For usage against a limit use UsageMeter; for a KPI with a trend use StatCard; for animated changes wrap the number in NumberRoll.
 *
 * @example
 * <CreditBalance label="AI credits" balance={new Intl.NumberFormat().format(1240)} />
 */
type CreditBalanceProps = {
  /** Pre-formatted balance, e.g. "1,240" or "$18.40". */
  balance: React.ReactNode
  /** Label before the number. Defaults to "Credits". */
  label?: string
  className?: string
}

function CreditBalance({ balance, label = "Credits", className }: CreditBalanceProps) {
  return (
    <div
      data-slot="credit-balance"
      className={cn("inline-flex items-baseline gap-2 rounded-xl border border-border bg-sunken px-3 py-2", className)}
    >
      <span className="text-xs text-fg-muted">{label}</span>
      <span className="text-lg font-medium tracking-[-0.008em] tabular-nums text-fg">{balance}</span>
    </div>
  )
}
export { CreditBalance }
export type { CreditBalanceProps }
