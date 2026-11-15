"use client"
import * as React from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { IconButton } from "@/registry/ui/icon-button"

/**
 * MessageBranch — the "‹ 2 / 3 ›" switcher that moves between the versions of an AI reply after a regenerate or an edited prompt.
 *
 * Wrap the assistant reply: pass every version in `versions` (or as children) and it shows one, with a
 * compact selector underneath. The selector hides itself while there is only one version, and in uncontrolled
 * mode a newly added version is shown straight away. Put MessageActions in `actions` to get the selector and
 * the copy, retry and vote buttons on one row. For the "Not quite right?" footer use RegenerateBar.
 *
 * @example
 * <MessageBranch
 *   versions={replies.map((r) => <Markdown key={r.id}>{r.text}</Markdown>)}
 *   actions={<MessageActions onRetry={regenerate} />}
 * />
 */

const SNAPPY = { type: "spring", bounce: 0.18, duration: 0.42 } as const
const MORPH = { type: "spring", bounce: 0.16, duration: 0.5 } as const
const INSTANT = { duration: 0 } as const

type MessageBranchProps = {
  /** Every version of the reply, oldest first. When omitted, each child is one version. */
  versions?: React.ReactNode[]
  /** Versions as children, used when `versions` is not passed. */
  children?: React.ReactNode
  /** Controlled index of the version shown (0-based). */
  index?: number
  /** Starting index when uncontrolled. Defaults to the newest version. */
  defaultIndex?: number
  /** Fires with the new 0-based index when the user switches version. */
  onIndexChange?: (index: number) => void
  /** Hide the selector while there is only one version. */
  hideWhenSingle?: boolean
  /** What one version is called in the screen reader text: "Response 2 of 3", "Previous response". */
  label?: string
  /** Rendered on the selector row after the switcher, for example MessageActions. */
  actions?: React.ReactNode
  className?: string
}

function MessageBranch({
  versions: versionsProp,
  children,
  index: indexProp,
  defaultIndex,
  onIndexChange,
  hideWhenSingle = true,
  label = "Response",
  actions,
  className,
}: MessageBranchProps) {
  const reduce = useReducedMotion()
  const versions = versionsProp ?? React.Children.toArray(children)
  const count = versions.length
  const [inner, setInner] = React.useState(defaultIndex ?? Math.max(count - 1, 0))
  // Uncontrolled: a version added after a regenerate becomes the one shown.
  const [seen, setSeen] = React.useState(count)
  if (count !== seen) {
    setSeen(count)
    if (count > seen) setInner(count - 1)
  }
  const index = Math.min(Math.max(indexProp ?? inner, 0), Math.max(count - 1, 0))

  // Direction of travel, kept in state so later re-renders do not reset it mid-exit.
  const [nav, setNav] = React.useState({ at: index, dir: 0 })
  if (nav.at !== index) setNav({ at: index, dir: index > nav.at ? 1 : -1 })
  const dir = nav.at !== index ? (index > nav.at ? 1 : -1) : nav.dir

  // Height follows the content. It springs only right after a switch, so streaming text grows without lag.
  const measure = React.useRef<HTMLDivElement>(null)
  const springUntil = React.useRef(0)
  const [box, setBox] = React.useState<{ h: number; spring: boolean } | null>(null)
  const mounted = React.useRef(false)
  React.useLayoutEffect(() => {
    if (mounted.current) springUntil.current = performance.now() + 500
    mounted.current = true
  }, [index])
  React.useEffect(() => {
    const el = measure.current
    if (!el) return
    const ro = new ResizeObserver(() => setBox({ h: el.offsetHeight, spring: performance.now() < springUntil.current }))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const go = (next: number) => {
    if (next < 0 || next >= count || next === index) return
    if (indexProp === undefined) setInner(next)
    onIndexChange?.(next)
  }

  const showSelector = count > 1 || (!hideWhenSingle && count === 1)
  const noun = label.toLowerCase()

  return (
    <div
      data-slot="message-branch"
      className={cn("flex flex-col gap-2", className)}
      onKeyDown={(e) => {
        if (!e.altKey || count < 2) return
        // Alt+Arrow moves by word in text fields (macOS); leave it to them.
        if ((e.target as HTMLElement).closest("input, textarea, [contenteditable='true']")) return
        if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
          // Also stops Alt+Left from navigating the browser back while focus is in the reply.
          e.preventDefault()
          go(index + (e.key === "ArrowRight" ? 1 : -1))
        }
      }}
    >
      <motion.div
        className="-m-1 self-stretch overflow-hidden"
        initial={false}
        animate={{ height: box ? box.h : "auto" }}
        transition={reduce || !box?.spring ? INSTANT : MORPH}
      >
        <div ref={measure} className="relative p-1">
          <AnimatePresence mode="popLayout" initial={false} custom={dir}>
            <motion.div
              key={index}
              custom={dir}
              variants={{
                enter: (d: number) => ({ opacity: 0, x: d * 6 }),
                center: { opacity: 1, x: 0 },
                exit: (d: number) => ({ opacity: 0, x: d * -6 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={reduce ? INSTANT : SNAPPY}
            >
              {versions[index]}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
      {showSelector || actions ? (
        <div className="flex items-center gap-1">
          {showSelector ? (
            <div data-slot="message-branch-selector" role="group" aria-label={`${label} versions`} className="flex items-center">
              <IconButton
                type="button"
                size="icon-sm"
                variant="ghost"
                aria-label={`Previous ${noun}`}
                disabled={index <= 0}
                focusableWhenDisabled
                onClick={() => go(index - 1)}
              >
                <ChevronLeftIcon />
              </IconButton>
              <span aria-live="polite" aria-atomic="true" className="min-w-10 px-0.5 text-center text-xs text-fg-muted tabular-nums">
                <span aria-hidden>
                  {index + 1} / {count}
                </span>
                <span className="sr-only">
                  {label} {index + 1} of {count}
                </span>
              </span>
              <IconButton
                type="button"
                size="icon-sm"
                variant="ghost"
                aria-label={`Next ${noun}`}
                disabled={index >= count - 1}
                focusableWhenDisabled
                onClick={() => go(index + 1)}
              >
                <ChevronRightIcon />
              </IconButton>
            </div>
          ) : null}
          {actions}
        </div>
      ) : null}
    </div>
  )
}

export { MessageBranch }
export type { MessageBranchProps }
