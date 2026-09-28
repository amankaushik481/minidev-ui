"use client"
import * as React from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { CheckIcon, MessageSquareIcon } from "lucide-react"
import { cn } from "@/lib/utils"

/*
 * MorphPanel: the button becomes the thing it opens. One surface stretches
 * from a pill into a panel on a spring, its corners easing from 10 to 16px,
 * while the label blurs out and the form blurs in. No popover, no jump.
 * Default content is a feedback form with a sent state.
 */

type Anchor = "top-left" | "top-right" | "bottom-left" | "bottom-right"

type MorphPanelProps = {
  label?: React.ReactNode
  icon?: React.ReactNode
  /** Panel width in px. */
  width?: number
  /** Which corner of the trigger the panel grows from. */
  anchor?: Anchor
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  /** Custom panel. Receives close(). */
  children?: (api: { close: () => void }) => React.ReactNode
  /** Called by the default feedback form. */
  onSubmit?: (text: string) => void | Promise<void>
  className?: string
}

const SPRING = { type: "spring", bounce: 0.16, duration: 0.5 } as const
const POS: Record<Anchor, string> = {
  "top-left": "top-0 left-0 origin-top-left",
  "top-right": "top-0 right-0 origin-top-right",
  "bottom-left": "bottom-0 left-0 origin-bottom-left",
  "bottom-right": "bottom-0 right-0 origin-bottom-right",
}

function MorphPanel({
  label = "Feedback",
  icon = <MessageSquareIcon />,
  width = 340,
  anchor = "top-left",
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  children,
  onSubmit,
  className,
}: MorphPanelProps) {
  const reduce = useReducedMotion()
  const [inner, setInner] = React.useState(defaultOpen)
  const open = openProp ?? inner
  const setOpen = (v: boolean) => {
    if (openProp === undefined) setInner(v)
    onOpenChange?.(v)
  }
  const rootRef = React.useRef<HTMLDivElement>(null)
  const triggerRef = React.useRef<HTMLButtonElement>(null)
  const t = reduce ? { duration: 0 } : SPRING

  const close = React.useCallback(() => {
    setOpen(false)
    requestAnimationFrame(() => triggerRef.current?.focus())
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Outside click and Escape close the panel.
  React.useEffect(() => {
    if (!open) return
    const onDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) close()
    }
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close()
    document.addEventListener("pointerdown", onDown)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("pointerdown", onDown)
      document.removeEventListener("keydown", onKey)
    }
  }, [open, close])

  return (
    <div ref={rootRef} data-slot="morph-panel" data-state={open ? "open" : "closed"} className={cn("relative inline-block h-9", className)}>
      {/* Keeps the trigger's footprint in the layout while the panel floats. */}
      <span aria-hidden className="invisible inline-flex h-9 items-center gap-2 px-3.5 text-[0.8125rem] font-medium [&_svg]:size-4">
        {icon}
        {label}
      </span>
      <motion.div
        layout
        transition={t}
        style={{ borderRadius: open ? 16 : 10 }}
        className={cn(
          "absolute z-40 overflow-hidden border bg-raised text-fg",
          open ? "border-border shadow-overlay" : "border-border shadow-key",
          POS[anchor]
        )}
      >
        <AnimatePresence initial={false} mode="popLayout">
          {open ? (
            <motion.div
              key="panel"
              layout="position"
              initial={reduce ? false : { opacity: 0, filter: "blur(6px)", scale: 0.98 }}
              animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, filter: "blur(6px)", transition: { duration: 0.12 } }}
              transition={reduce ? { duration: 0 } : { ...SPRING, opacity: { duration: 0.2, delay: 0.06 } }}
              style={{ width }}
              role="dialog"
              aria-label={typeof label === "string" ? label : "Panel"}
            >
              {children ? children({ close }) : <FeedbackForm onSubmit={onSubmit} close={close} />}
            </motion.div>
          ) : (
            <motion.button
              key="trigger"
              ref={triggerRef}
              layout="position"
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={false}
              initial={reduce ? false : { opacity: 0, filter: "blur(4px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, filter: "blur(4px)", transition: { duration: 0.1 } }}
              transition={{ duration: 0.18 }}
              className="inline-flex h-9 items-center gap-2 px-3.5 text-[0.8125rem] font-medium whitespace-nowrap outline-none transition-colors duration-[70ms] hover:bg-fg/[0.035] focus-visible:bg-fg/[0.05] [&_svg]:size-4 [&_svg]:text-fg-muted"
            >
              {icon}
              {label}
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

function FeedbackForm({ onSubmit, close }: { onSubmit?: (text: string) => void | Promise<void>; close: () => void }) {
  const [text, setText] = React.useState("")
  const [phase, setPhase] = React.useState<"idle" | "sending" | "sent">("idle")
  const ref = React.useRef<HTMLTextAreaElement>(null)
  React.useEffect(() => ref.current?.focus(), [])

  const send = async () => {
    if (!text.trim() || phase !== "idle") return
    setPhase("sending")
    try {
      await (onSubmit?.(text) ?? new Promise((r) => setTimeout(r, 700)))
      setPhase("sent")
      setTimeout(close, 1500)
    } catch {
      setPhase("idle")
    }
  }

  if (phase === "sent") {
    return (
      <div className="grid h-[188px] place-items-center p-6 text-center" aria-live="polite">
        <div>
          <span className="mx-auto grid size-9 animate-[pop-in_320ms_var(--ease-hairline)_both] place-items-center rounded-full bg-success text-white shadow-ink">
            <CheckIcon className="size-4" strokeWidth={2.5} />
          </span>
          <p className="mt-3 text-sm font-medium text-fg">Sent. Thank you.</p>
          <p className="mt-1 text-xs text-fg-muted">We read every note, usually the same day.</p>
        </div>
      </div>
    )
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        send()
      }}
    >
      <div className="flex items-center justify-between px-4 pt-3.5">
        <p className="text-[0.8125rem] font-medium">Send feedback</p>
        <span className="font-mono text-[10px] text-fg-subtle tabular-nums">{text.length}/500</span>
      </div>
      <textarea
        ref={ref}
        value={text}
        maxLength={500}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
            e.preventDefault()
            send()
          }
        }}
        placeholder="What would make Lumen better for you?"
        aria-label="Feedback"
        className="mt-2 block h-24 w-full resize-none bg-transparent px-4 text-sm leading-[1.55] text-fg outline-none placeholder:text-fg-subtle"
      />
      <div className="flex items-center justify-between gap-2 border-t border-border bg-sunken/60 px-2 py-2">
        <button
          type="button"
          onClick={close}
          className="h-7 rounded-md px-2.5 text-xs font-medium text-fg-muted outline-none hover:bg-fg/5 hover:text-fg focus-visible:ring-2 focus-visible:ring-accent"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!text.trim() || phase === "sending"}
          className="inline-flex h-7 items-center gap-2 rounded-md bg-ink pr-1.5 pl-2.5 text-xs font-medium text-on-ink shadow-ink outline-none transition-[background-color,opacity] duration-[70ms] hover:bg-ink-hover focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-sunken disabled:opacity-50"
        >
          {phase === "sending" ? "Sending…" : "Send"}
          <kbd className="rounded-[4px] bg-on-ink/15 px-1 font-mono text-[10px] leading-4">⌘↵</kbd>
        </button>
      </div>
    </form>
  )
}

export { MorphPanel }
export type { MorphPanelProps }
