"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
function VerticalTabs({
  tabs,
  value,
  onChange,
  className,
}: {
  tabs: { id: string; label: string; content: React.ReactNode }[]
  value?: string
  onChange?: (id: string) => void
  className?: string
}) {
  const [internal, setInternal] = React.useState(tabs[0]?.id)
  const current = value ?? internal
  const active = tabs.find((t) => t.id === current) ?? tabs[0]
  return (
    <div data-slot="vertical-tabs" className={cn("grid gap-4 md:grid-cols-[180px_1fr]", className)}>
      <div role="tablist" aria-orientation="vertical" className="flex flex-col gap-1">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={t.id === current}
            className={cn(
              "h-9 rounded-lg px-3 text-left text-sm",
              t.id === current ? "bg-sunken text-fg" : "text-fg-muted hover:text-fg"
            )}
            onClick={() => {
              if (value === undefined) setInternal(t.id)
              onChange?.(t.id)
            }}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" className="min-w-0">{active?.content}</div>
    </div>
  )
}
export { VerticalTabs }
