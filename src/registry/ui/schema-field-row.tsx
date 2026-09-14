"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Badge } from "@/registry/ui/badge"

function SchemaFieldRow({
  name,
  type,
  required,
  description,
  className,
}: {
  name: string
  type: string
  required?: boolean
  description?: string
  className?: string
}) {
  return (
    <div data-slot="schema-field-row" className={cn("grid gap-1 border-b border-border py-3 sm:grid-cols-[160px_100px_1fr]", className)}>
      <div className="flex items-center gap-2">
        <code className="font-mono text-sm text-fg">{name}</code>
        {required ? <Badge variant="outline">required</Badge> : null}
      </div>
      <code className="font-mono text-xs text-fg-muted">{type}</code>
      <p className="text-sm text-fg-muted">{description}</p>
    </div>
  )
}
export { SchemaFieldRow }
