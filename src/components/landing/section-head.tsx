import * as React from "react"
import { cn } from "@/lib/utils"

export function SectionHead({ id, eyebrow, title, body, align = "center" }: { id?: string; eyebrow: string; title: React.ReactNode; body?: React.ReactNode; align?: "center" | "left" }) {
  return (
    <div className={cn("max-w-2xl", align === "center" ? "mx-auto text-center" : "")}>
      <p className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.08em] text-accent-fg uppercase">
        <span className="h-px w-5 bg-accent-line" />
        {eyebrow}
        {align === "center" ? <span className="h-px w-5 bg-accent-line" /> : null}
      </p>
      <h2 id={id} className="mt-4 text-[2rem] leading-[1.05] font-medium tracking-[-0.035em] text-fg sm:text-5xl sm:leading-[1.02] sm:tracking-[-0.04em]">{title}</h2>
      {body ? <p className="mt-4 text-base leading-[1.6] text-fg-muted sm:text-[1.0625rem]">{body}</p> : null}
    </div>
  )
}
