import * as React from "react"
import { cn } from "@/lib/utils"

/** The MiniDev mark — one continuous hairline "M" on an ink tile, with a violet node. */
export function LogoMark({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={cn("size-6", className)} {...props}>
      <rect x="0.5" y="0.5" width="23" height="23" rx="6.5" className="fill-ink" />
      <rect x="0.5" y="0.5" width="23" height="23" rx="6.5" className="stroke-white/10" />
      <path
        d="M6.75 16.5V7.75l5.25 6.1 5.25-6.1v8.75"
        className="stroke-on-ink"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="17.25" cy="7.75" r="1.9" className="fill-accent stroke-ink" strokeWidth="1.2" />
    </svg>
  )
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <LogoMark />
      <span className="text-[0.9375rem] font-semibold tracking-[-0.02em] text-fg">
        MiniDev<span className="text-fg-subtle"> UI</span>
      </span>
    </span>
  )
}
