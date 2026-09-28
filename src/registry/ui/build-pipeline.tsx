"use client"
import * as React from "react"
import { CheckIcon, LoaderCircleIcon, XIcon } from "lucide-react"
import { cn } from "@/lib/utils"

type Stage = { name: string; status: "success" | "running" | "failed" | "pending" }

function BuildPipeline({
  stages = [
    { name: "Install", status: "success" },
    { name: "Typecheck", status: "success" },
    { name: "Audit", status: "running" },
    { name: "Deploy", status: "pending" },
  ],
  className,
}: {
  stages?: Stage[]
  className?: string
}) {
  const icon = (s: Stage["status"]) => {
    if (s === "success") return <CheckIcon className="size-3.5 text-success" aria-hidden />
    if (s === "failed") return <XIcon className="size-3.5 text-danger" aria-hidden />
    if (s === "running") return <LoaderCircleIcon className="size-3.5 animate-spin text-accent" aria-hidden />
    return <span className="size-3.5 rounded-full border border-border" aria-hidden />
  }
  return (
    <ol data-slot="build-pipeline" className={cn("flex flex-wrap items-center gap-2", className)}>
      {stages.map((s, i) => (
        <li key={s.name} className="flex items-center gap-2">
          <div className="inline-flex h-8 items-center gap-2 rounded-lg border border-border bg-surface px-2.5 text-xs font-medium text-fg shadow-highlight">
            {icon(s.status)}
            <span>{s.name}</span>
            <span className="sr-only">{s.status}</span>
          </div>
          {i < stages.length - 1 ? <span className="h-px w-4 bg-border" aria-hidden /> : null}
        </li>
      ))}
    </ol>
  )
}
export { BuildPipeline }
