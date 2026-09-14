"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

function StackTrace({ stack, className }: { stack: string; className?: string }) {
  return (
    <pre
      data-slot="stack-trace"
      className={cn(
        "overflow-auto rounded-xl border border-danger/30 bg-danger/5 p-3 font-mono text-[12px] leading-relaxed text-danger",
        className
      )}
    >
      {stack}
    </pre>
  )
}
export { StackTrace }
