"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"
import { Button } from "@/registry/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/registry/ui/dropdown-menu"
import { cn } from "@/lib/utils"

type SplitButtonProps = {
  label: React.ReactNode
  onPrimaryClick?: () => void
  disabled?: boolean
  className?: string
  items: { label: string; onSelect?: () => void; destructive?: boolean }[]
}

function SplitButton({
  label,
  onPrimaryClick,
  disabled,
  className,
  items,
}: SplitButtonProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [menuMinWidth, setMenuMinWidth] = React.useState<number>()

  React.useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const sync = () => setMenuMinWidth(el.getBoundingClientRect().width)
    sync()
    const ro = new ResizeObserver(sync)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      data-slot="split-button"
      className={cn("inline-flex items-stretch", className)}
    >
      <Button
        variant="outline"
        disabled={disabled}
        onClick={onPrimaryClick}
        className="rounded-r-none border-r-transparent"
      >
        {label}
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger
          disabled={disabled}
          className={cn(
            "inline-flex h-9 w-9 items-center justify-center rounded-l-none rounded-r-lg border border-border bg-surface text-fg",
            "border-l-border shadow-highlight outline-none",
            "transition-[border-color,background-color,transform] duration-[70ms]",
            "hover:border-fg-subtle focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
            "active:translate-y-[0.5px] disabled:opacity-50"
          )}
          aria-label="More actions"
        >
          <ChevronDownIcon className="size-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          sideOffset={6}
          className="min-w-44"
          style={menuMinWidth ? { minWidth: menuMinWidth } : undefined}
        >
          {items.map((item) => (
            <DropdownMenuItem
              key={item.label}
              variant={item.destructive ? "destructive" : "default"}
              onClick={item.onSelect}
            >
              {item.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export { SplitButton }
