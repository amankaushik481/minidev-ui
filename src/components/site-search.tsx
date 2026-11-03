"use client"
import * as React from "react"
import { SearchIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Kbd } from "@/registry/ui/kbd"

/*
 * The header search button. The dialog, Base UI and the search index load the
 * first time someone opens search, or as soon as they hover or focus the button,
 * so no page pays for them up front.
 */
const load = () => import("@/components/site-search-dialog")
const SearchDialog = React.lazy(load)

export function SiteSearch({ className, compact }: { className?: string; compact?: boolean }) {
  const [open, setOpen] = React.useState(false)
  const [used, setUsed] = React.useState(false)
  const trigger = React.useRef<HTMLButtonElement>(null)
  const show = React.useCallback((o: boolean) => {
    if (o) setUsed(true)
    setOpen(o)
  }, [])

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // The header renders two buttons (desktop and phone); only the visible one answers.
      if (!trigger.current?.getClientRects().length) return
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !/input|textarea|select/i.test((e.target as HTMLElement)?.tagName ?? "") && !(e.target as HTMLElement)?.isContentEditable)) {
        e.preventDefault()
        setUsed(true)
        setOpen((o) => !o)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  return (
    <>
      <button
        ref={trigger}
        type="button"
        onClick={() => show(true)}
        onPointerEnter={() => void load()}
        onFocus={() => void load()}
        aria-haspopup="dialog"
        aria-expanded={open}
        className={cn(
          "group/search inline-flex h-8 items-center gap-2 rounded-lg border border-border bg-surface pr-1.5 pl-2.5 text-[0.8125rem] text-fg-subtle shadow-xs outline-none",
          "transition-[border-color,color] duration-[70ms] hover:border-border-strong hover:text-fg-muted focus-visible:ring-2 focus-visible:ring-accent",
          compact ? "w-8 justify-center px-0" : "w-full sm:w-56",
          className
        )}
        aria-label="Search components"
      >
        <SearchIcon className="size-3.5 shrink-0" />
        {compact ? null : (
          <>
            <span className="flex-1 text-left">Search components…</span>
            <Kbd className="h-5 text-[10px]">⌘K</Kbd>
          </>
        )}
      </button>
      {used ? (
        <React.Suspense fallback={null}>
          <SearchDialog open={open} onOpenChange={show} returnFocus={trigger} />
        </React.Suspense>
      ) : null}
    </>
  )
}
