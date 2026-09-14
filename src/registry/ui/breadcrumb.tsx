"use client"
import * as React from "react"
import { ChevronRightIcon } from "lucide-react"
import { cn } from "@/lib/utils"
function Breadcrumb({ items, className }: { items: { label: string; href?: string }[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" data-slot="breadcrumb" className={cn("flex items-center gap-1 text-sm", className)}>
      {items.map((item, i) => (
        <React.Fragment key={i}>
          {i > 0 ? <ChevronRightIcon className="size-3.5 text-fg-subtle" /> : null}
          {i === items.length - 1 ? (
            <span aria-current="page" className="font-medium text-fg">{item.label}</span>
          ) : (
            <a href={item.href ?? "#"} className="text-fg-muted transition-[color] duration-[70ms] hover:text-fg">{item.label}</a>
          )}
        </React.Fragment>
      ))}
    </nav>
  )
}
export { Breadcrumb }
