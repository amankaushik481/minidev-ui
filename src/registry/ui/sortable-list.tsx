"use client"
import * as React from "react"
import { Reorder, useDragControls, useReducedMotion, type Transition } from "motion/react"
import { GripVerticalIcon } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * A drag-to-reorder list: drag the grip handle, or focus it and use the arrow keys; every move is announced and the new order comes back through onReorder.
 *
 * Use it for short lists people order by hand: priorities, playlist tracks, checklist steps. Every
 * row is rendered, so keep it to a few dozen items. Built on Motion's Reorder. `KanbanBoard` shows
 * cards in columns but cannot drag them; for a fixed order use a plain list.
 *
 * Keyboard: Arrow Up/Down move one place, Home/End move to the ends; focus stays on the moved handle.
 * Pass a new `items` array (different ids or order) to reset the list from outside.
 *
 * @example
 * <SortableList items={tasks} onReorder={(next) => saveOrder(next.map((t) => t.id))} />
 */
type Item = {
  /** Stable id; the list keys and compares by it. */
  id: string
  /** Row text. */
  label: string
  /** Secondary text on the right, e.g. a due date. */
  detail?: string
}

type SortableListProps = {
  /** Rows in their starting order. Defaults to a short sample task list. */
  items?: Item[]
  /** Called with the full list after every drag or keyboard move. */
  onReorder?: (items: Item[]) => void
  className?: string
}

/** The "release" spring preset: rows settle after a drag. */
const RELEASE: Transition = { type: "spring", stiffness: 400, damping: 40 }

const DEMO: Item[] = [
  { id: "a", label: "Design review", detail: "Tue 10:00" },
  { id: "b", label: "Ship onboarding flow", detail: "Wed" },
  { id: "c", label: "Pricing page copy", detail: "Thu" },
  { id: "d", label: "Customer interviews", detail: "Fri" },
  { id: "e", label: "Release notes", detail: "Fri 16:00" },
]

function Row({ item, index, total, move }: { item: Item; index: number; total: number; move: (from: number, to: number) => void }) {
  const controls = useDragControls()
  const reduce = useReducedMotion()
  const [dragging, setDragging] = React.useState(false)
  return (
    <Reorder.Item
      value={item}
      dragListener={false}
      dragControls={controls}
      layout={reduce ? undefined : true}
      transition={reduce ? { duration: 0 } : RELEASE}
      whileDrag={reduce ? { zIndex: 10 } : { scale: 1.02, zIndex: 10 }}
      onDragStart={() => setDragging(true)}
      onDragEnd={() => setDragging(false)}
      data-dragging={dragging || undefined}
      className={cn(
        "relative flex items-center gap-3 rounded-xl border border-border bg-surface px-3 py-2.5 select-none transition-shadow duration-[140ms]",
        dragging ? "shadow-overlay" : "shadow-raised"
      )}
    >
      <button
        type="button"
        aria-label={`Reorder ${item.label}, position ${index + 1} of ${total}`}
        onPointerDown={(e) => controls.start(e)}
        onKeyDown={(e) => {
          if (e.key === "ArrowUp" && index > 0) {
            e.preventDefault()
            move(index, index - 1)
          }
          if (e.key === "ArrowDown" && index < total - 1) {
            e.preventDefault()
            move(index, index + 1)
          }
          if (e.key === "Home" && index > 0) {
            e.preventDefault()
            move(index, 0)
          }
          if (e.key === "End" && index < total - 1) {
            e.preventDefault()
            move(index, total - 1)
          }
        }}
        className="grid size-7 cursor-grab touch-none place-items-center rounded-md text-fg-subtle outline-none hover:bg-sunken hover:text-fg focus-visible:ring-2 focus-visible:ring-accent active:cursor-grabbing"
      >
        <GripVerticalIcon className="size-4" aria-hidden />
      </button>
      <span className="min-w-0 flex-1 truncate text-sm text-fg">{item.label}</span>
      {item.detail ? <span className="shrink-0 font-mono text-2xs text-fg-subtle">{item.detail}</span> : null}
    </Reorder.Item>
  )
}

function SortableList({ items = DEMO, onReorder, className }: SortableListProps) {
  const [list, setList] = React.useState(items)
  const [said, setSaid] = React.useState("")
  const root = React.useRef<HTMLDivElement>(null)
  // reset when the caller passes a list with different ids or order, not on every new array identity
  const sig = items.map((i) => i.id).join("\u0000")
  const [lastSig, setLastSig] = React.useState(sig)
  if (sig !== lastSig) {
    setLastSig(sig)
    setList(items)
  }
  const update = (next: Item[]) => {
    setList(next)
    onReorder?.(next)
  }
  const move = (from: number, to: number) => {
    const next = [...list]
    const [it] = next.splice(from, 1)
    next.splice(to, 0, it)
    update(next)
    setSaid(`${it.label} moved to position ${to + 1} of ${next.length}`)
    // keep focus on the moved handle
    requestAnimationFrame(() => root.current?.querySelectorAll<HTMLButtonElement>("button")[to]?.focus())
  }
  return (
    <div ref={root} data-slot="sortable-list" className={cn("w-full max-w-sm", className)}>
      <Reorder.Group axis="y" values={list} onReorder={update} className="flex flex-col gap-2">
        {list.map((it, i) => (
          <Row key={it.id} item={it} index={i} total={list.length} move={move} />
        ))}
      </Reorder.Group>
      <p aria-live="polite" className="sr-only">{said}</p>
    </div>
  )
}

export { SortableList }
export type { SortableListProps }
