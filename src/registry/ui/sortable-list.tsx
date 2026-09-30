"use client"
import * as React from "react"
import { Reorder, useDragControls, useReducedMotion } from "motion/react"
import { GripVerticalIcon } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * A drag to reorder list built on Motion's Reorder: grab the handle to
 * drag, or focus it and use Arrow Up and Arrow Down to move an item by
 * keyboard. Every move is announced, and the new order comes back through
 * onReorder.
 */
type Item = { id: string; label: string; detail?: string }

type SortableListProps = {
  items?: Item[]
  onReorder?: (items: Item[]) => void
  className?: string
}

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
  return (
    <Reorder.Item
      value={item}
      dragListener={false}
      dragControls={controls}
      layout={reduce ? undefined : true}
      whileDrag={{ scale: 1.02, boxShadow: "0 18px 40px -12px rgb(0 0 0 / 0.35)", zIndex: 10 }}
      className="relative flex items-center gap-3 rounded-xl border border-border bg-surface px-3 py-2.5 shadow-raised select-none"
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
        }}
        className="grid size-7 cursor-grab touch-none place-items-center rounded-md text-fg-subtle outline-none hover:bg-sunken hover:text-fg focus-visible:ring-2 focus-visible:ring-accent active:cursor-grabbing"
      >
        <GripVerticalIcon className="size-4" />
      </button>
      <span className="min-w-0 flex-1 truncate text-sm text-fg">{item.label}</span>
      {item.detail ? <span className="shrink-0 font-mono text-[11px] text-fg-subtle">{item.detail}</span> : null}
    </Reorder.Item>
  )
}

function SortableList({ items = DEMO, onReorder, className }: SortableListProps) {
  const [list, setList] = React.useState(items)
  const [said, setSaid] = React.useState("")
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
    requestAnimationFrame(() => (document.querySelectorAll<HTMLButtonElement>('[data-slot="sortable-list"] button')[to])?.focus())
  }
  return (
    <div data-slot="sortable-list" className={cn("w-full max-w-sm", className)}>
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
