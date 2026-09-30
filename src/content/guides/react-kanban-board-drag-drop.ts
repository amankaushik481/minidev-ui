import type { Guide } from "../types"

const guide: Guide = {
  slug: "react-kanban-board-drag-drop",
  title: "Build a kanban board in React with drag and drop",
  description:
    "Build a React kanban board with drag and drop using dnd-kit: sortable cards, moves between columns, keyboard dragging, announcements and optimistic updates.",
  date: "2026-09-30",
  keywords: [
    "react kanban board",
    "drag and drop kanban react",
    "trello clone react",
    "dnd-kit sortable multiple containers",
    "kanban board tailwind",
  ],
  related: ["kanban-board", "kanban-column", "issue-card", "priority-picker", "assign-picker", "due-date-chip"],
  body: [
    {
      type: "p",
      text: "A React kanban board with drag and drop is a list of columns, each holding an ordered array of card IDs, rendered inside one `DndContext` from `@dnd-kit/core` with a `SortableContext` per column. `onDragOver` moves a card into another column while it is being dragged, `onDragEnd` reorders it with `arrayMove` and saves the result, and a `KeyboardSensor` with `sortableKeyboardCoordinates` makes the whole thing work without a mouse.",
    },
    {
      type: "p",
      text: "This guide builds that board with dnd-kit and the free MiniDev UI [KanbanColumn](/docs/kanban-column), [IssueCard](/docs/issue-card), [DueDateChip](/docs/due-date-chip), [PriorityPicker](/docs/priority-picker) and [AssignPicker](/docs/assign-picker). It covers the state shape, moving cards between columns, keyboard and screen reader support, and optimistic updates with rollback. The [kanban board glossary entry](/glossary/kanban-board) explains the workflow side if you need it.",
    },

    { type: "h2", text: "Install", id: "install" },
    {
      type: "code",
      lang: "bash",
      code: "npm i @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities\n\nnpx shadcn@latest add https://ui.minidev.pro/r/kanban-column.json\nnpx shadcn@latest add https://ui.minidev.pro/r/issue-card.json\nnpx shadcn@latest add https://ui.minidev.pro/r/due-date-chip.json\nnpx shadcn@latest add https://ui.minidev.pro/r/priority-picker.json\nnpx shadcn@latest add https://ui.minidev.pro/r/assign-picker.json",
    },
    {
      type: "p",
      text: "Add the token stylesheet once (`@import \"minidev-ui-kit/styles.css\"`, or a copy of [styles.css](https://ui.minidev.pro/r/styles.css)). There is also a [KanbanBoard](/docs/kanban-board) component that takes `columns` of `{ id, title, cards }` and renders a complete read only board. Use it for previews, reports and empty states; for dragging you need control over each card's wrapper, so this guide composes the board from `KanbanColumn` and `IssueCard`.",
    },

    { type: "h2", text: "Model the board state", id: "board-state" },
    {
      type: "p",
      text: "Store cards once, by ID, and keep only ordered ID arrays in the columns. A move then changes two small arrays and never copies card data:",
    },
    {
      type: "code",
      lang: "ts",
      filename: "lib/board.ts",
      code: `export type Priority = "low" | "medium" | "high" | "urgent"

export type Issue = {
  id: string
  key: string // "ENG-142"
  title: string
  priority: Priority
  assigneeId?: string
  due?: string // ISO date
}

export type Column = { id: string; title: string; cardIds: string[] }
export type Board = { columns: Column[]; cards: Record<string, Issue> }

export function findColumnId(board: Board, id: string) {
  if (board.columns.some((c) => c.id === id)) return id
  return board.columns.find((c) => c.cardIds.includes(id))?.id
}`,
    },
    {
      type: "p",
      text: "`findColumnId` accepts either a card ID or a column ID, because during a drag the thing under the pointer can be a card or an empty column.",
    },

    { type: "h2", text: "Render columns and cards", id: "render-columns" },
    {
      type: "p",
      text: "`KanbanColumn` takes a `title`, an optional `count` (shown as a badge) and children. `IssueCard` takes `id` (the display key), `title`, `status` and `priority` as strings. The shipped card ends with a placeholder line (\"Assigned to Design Eng\"), so in your copy replace it with a slot for real metadata:",
    },
    {
      type: "code",
      lang: "tsx",
      filename: "components/ui/issue-card.tsx",
      code: `import type { ReactNode } from "react"

// add children?: ReactNode to the props, then replace the placeholder <p> with:
{children ? <div className="mt-3 flex items-center gap-2">{children}</div> : null}`,
    },
    {
      type: "p",
      text: "`DueDateChip` takes a preformatted `date` string and an `overdue` flag, which switches the border and icon to the danger color. Compute both yourself so the formatting and the definition of overdue live in one place.",
    },

    { type: "h2", text: "Make cards sortable", id: "sortable-cards" },
    {
      type: "p",
      text: "Each card is wrapped in an element that calls `useSortable`. The hook returns a ref setter, the drag listeners, ARIA attributes (`role=\"button\"`, `tabIndex`, `aria-roledescription=\"sortable\"`, `aria-describedby`) and the current transform:",
    },
    {
      type: "code",
      lang: "tsx",
      filename: "app/board/sortable-issue.tsx",
      code: `"use client"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { IssueCard } from "@/components/ui/issue-card"
import { DueDateChip } from "@/components/ui/due-date-chip"
import { cn } from "@/lib/utils"
import type { Issue } from "@/lib/board"

export const PRIORITY_LABEL = { low: "Low", medium: "Medium", high: "High", urgent: "Urgent" }
const short = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", timeZone: "UTC" })

export function SortableIssue({ issue, status }: { issue: Issue; status: string }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: issue.id })
  const overdue = issue.due ? new Date(issue.due).getTime() < Date.now() : false

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={cn("rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-accent", isDragging && "opacity-40")}
      {...attributes}
      {...listeners}
    >
      <IssueCard id={issue.key} title={issue.title} status={status} priority={PRIORITY_LABEL[issue.priority]}>
        {issue.due ? <DueDateChip date={short.format(new Date(issue.due))} overdue={overdue} /> : null}
      </IssueCard>
    </div>
  )
}`,
    },
    {
      type: "p",
      text: "While a card is dragged, its original spot stays in the list at 40% opacity so the gap shows where it will land, and a `DragOverlay` (below) renders the copy that follows the pointer.",
    },

    { type: "h2", text: "Accept drops in every column", id: "droppable-columns" },
    {
      type: "p",
      text: "A `SortableContext` only knows about its items, so an empty column has nothing to collide with. Register the column body itself with `useDroppable`, using the column ID:",
    },
    {
      type: "code",
      lang: "tsx",
      filename: "app/board/board-column.tsx",
      code: `"use client"
import { useDroppable } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { KanbanColumn } from "@/components/ui/kanban-column"
import { cn } from "@/lib/utils"
import type { Column, Issue } from "@/lib/board"
import { SortableIssue } from "./sortable-issue"

export function BoardColumn({ column, cards }: { column: Column; cards: Issue[] }) {
  const { setNodeRef, isOver } = useDroppable({ id: column.id })
  return (
    <KanbanColumn title={column.title} count={cards.length} className="shrink-0">
      <SortableContext id={column.id} items={column.cardIds} strategy={verticalListSortingStrategy}>
        <div ref={setNodeRef} className={cn("flex min-h-24 flex-col gap-2 rounded-lg", isOver && cards.length === 0 && "bg-accent-soft")}>
          {cards.map((issue) => (
            <SortableIssue key={issue.id} issue={issue} status={column.title} />
          ))}
        </div>
      </SortableContext>
    </KanbanColumn>
  )
}`,
    },

    { type: "h2", text: "Move cards within and between columns", id: "move-between-columns" },
    {
      type: "p",
      text: "The board owns the state and the three handlers. Take a snapshot when the drag starts, move the card to the new column in `onDragOver` so the target column opens a gap live, reorder in `onDragEnd`, and restore the snapshot if the drag is cancelled:",
    },
    {
      type: "code",
      lang: "tsx",
      filename: "app/board/board.tsx",
      code: `"use client"
import * as React from "react"
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
} from "@dnd-kit/core"
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable"
import { IssueCard } from "@/components/ui/issue-card"
import { findColumnId, type Board as BoardData } from "@/lib/board"
import { BoardColumn } from "./board-column"
import { PRIORITY_LABEL } from "./sortable-issue"

export function Board({ initial }: { initial: BoardData }) {
  const [board, setBoard] = React.useState(initial)
  const [activeId, setActiveId] = React.useState<string | null>(null)
  const snapshot = React.useRef<BoardData | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  function onDragStart({ active }: DragStartEvent) {
    snapshot.current = board
    setActiveId(String(active.id))
  }

  function onDragOver({ active, over }: DragOverEvent) {
    if (!over) return
    const from = findColumnId(board, String(active.id))
    const to = findColumnId(board, String(over.id))
    if (!from || !to || from === to) return
    setBoard((b) => {
      const target = b.columns.find((c) => c.id === to)!
      const overIndex = target.cardIds.indexOf(String(over.id))
      const index = overIndex === -1 ? target.cardIds.length : overIndex
      return {
        ...b,
        columns: b.columns.map((c) => {
          if (c.id === from) return { ...c, cardIds: c.cardIds.filter((id) => id !== active.id) }
          if (c.id === to) return { ...c, cardIds: [...c.cardIds.slice(0, index), String(active.id), ...c.cardIds.slice(index)] }
          return c
        }),
      }
    })
  }

  function onDragEnd({ active, over }: DragEndEvent) {
    setActiveId(null)
    const prev = snapshot.current
    if (!over || !prev) return onDragCancel()
    const colId = findColumnId(board, String(active.id))
    const col = board.columns.find((c) => c.id === colId)!
    const from = col.cardIds.indexOf(String(active.id))
    const to = col.cardIds.indexOf(String(over.id))
    const next =
      to !== -1 && from !== to
        ? { ...board, columns: board.columns.map((c) => (c.id === colId ? { ...c, cardIds: arrayMove(c.cardIds, from, to) } : c)) }
        : board
    setBoard(next)
    void persistMove(String(active.id), prev, next)
  }

  function onDragCancel() {
    setActiveId(null)
    if (snapshot.current) setBoard(snapshot.current)
  }

  // persistMove and announcements: see the next sections

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
      onDragCancel={onDragCancel}
    >
      <div className="flex items-start gap-3 overflow-x-auto pb-4">
        {board.columns.map((col) => (
          <BoardColumn key={col.id} column={col} cards={col.cardIds.map((id) => board.cards[id])} />
        ))}
      </div>
      <DragOverlay>
        {activeId ? (
          <IssueCard
            id={board.cards[activeId].key}
            title={board.cards[activeId].title}
            status={board.columns.find((c) => c.cardIds.includes(activeId))?.title}
            priority={PRIORITY_LABEL[board.cards[activeId].priority]}
            className="shadow-overlay"
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}`,
    },
    {
      type: "list",
      items: [
        "`closestCorners` works better than the default `rectIntersection` for stacked lists in side by side columns, because it measures to the corners of each droppable rather than requiring overlap.",
        "`arrayMove(array, from, to)` returns a new array with one item moved; it never mutates.",
        "`activationConstraint: { distance: 6 }` means a drag starts only after the pointer moves 6px, so a plain click on the card still opens it and clicks on buttons inside it still work.",
        "On touch screens, the `PointerSensor` competes with scrolling. Either set `touch-action: none` on cards (they then cannot be used to scroll) or use `MouseSensor` plus `TouchSensor` with `activationConstraint: { delay: 200, tolerance: 5 }` for press and hold.",
      ],
    },

    { type: "h2", text: "Keyboard dragging and screen readers", id: "keyboard-accessibility" },
    {
      type: "p",
      text: "With the `KeyboardSensor` registered, every card is focusable and draggable from the keyboard: Space or Enter picks it up, arrow keys move it, Space or Enter drops it, and Escape cancels (which calls `onDragCancel` and restores the snapshot). `sortableKeyboardCoordinates` moves the card to the next sortable item in the arrow's direction, which crosses into neighboring columns with the collision detection above. For very large boards, dnd-kit's multiple containers example ships a custom coordinate getter you can adopt.",
    },
    {
      type: "p",
      text: "dnd-kit also renders a visually hidden live region and instructions. The defaults talk about \"draggable item 3\"; replace them with names people recognize through the `accessibility` prop:",
    },
    {
      type: "code",
      lang: "tsx",
      code: `import type { Announcements } from "@dnd-kit/core"

const name = (id: string | number) => board.cards[String(id)]?.key ?? "item"
const column = (id: string | number) => board.columns.find((c) => c.id === findColumnId(board, String(id)))?.title ?? "the board"

const announcements: Announcements = {
  onDragStart: ({ active }) => "Picked up " + name(active.id) + ".",
  onDragOver: ({ active, over }) => (over ? name(active.id) + " is over " + column(over.id) + "." : undefined),
  onDragEnd: ({ active, over }) => (over ? "Dropped " + name(active.id) + " in " + column(over.id) + "." : "Dropped " + name(active.id) + "."),
  onDragCancel: ({ active }) => "Move cancelled. " + name(active.id) + " is back where it started.",
}

<DndContext
  sensors={sensors}
  collisionDetection={closestCorners}
  accessibility={{
    announcements,
    screenReaderInstructions: {
      draggable: "To move an issue, press Space or Enter. Use the arrow keys to move it within and between columns. Press Space or Enter to drop it, or Escape to cancel.",
    },
  }}
  onDragStart={onDragStart}
  onDragOver={onDragOver}
  onDragEnd={onDragEnd}
  onDragCancel={onDragCancel}
>
  {/* columns and DragOverlay as before */}
</DndContext>`,
    },
    {
      type: "callout",
      tone: "tip",
      text: "Dragging should never be the only way to move a card. WCAG 2.2 (success criterion 2.5.7) asks for a single pointer alternative. Add a \"Move to\" menu or a status field in the card's detail view that calls the same `persistMove` path.",
    },

    { type: "h2", text: "Optimistic updates with rollback", id: "optimistic-updates" },
    {
      type: "p",
      text: "The board already shows the new position before the server responds, which is the [optimistic UI](/glossary/optimistic-ui) pattern. What remains is saving the move and undoing it if the save fails:",
    },
    {
      type: "code",
      lang: "tsx",
      code: `async function persistMove(cardId: string, prev: BoardData, next: BoardData) {
  const col = next.columns.find((c) => c.cardIds.includes(cardId))!
  const i = col.cardIds.indexOf(cardId)
  const before = prev.columns.find((c) => c.cardIds.includes(cardId))!
  if (before.id === col.id && before.cardIds.indexOf(cardId) === i) return // nothing changed

  try {
    const res = await fetch("/api/issues/" + cardId + "/move", {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ columnId: col.id, afterId: col.cardIds[i - 1] ?? null, beforeId: col.cardIds[i + 1] ?? null }),
    })
    if (!res.ok) throw new Error("Move failed")
  } catch {
    setBoard(prev)
    showError("Could not move " + next.cards[cardId].key + ". It is back in " + before.title + ".")
  }
}`,
    },
    {
      type: "list",
      items: [
        "Send the neighbors, not an index. The server computes a sort key between `afterId` and `beforeId` (a fractional or lexicographic rank), so a move writes one row instead of renumbering the whole column.",
        "Restoring the snapshot is right for a single user board. When several people edit the same board, refetch it on failure instead, so you do not wipe out someone else's move.",
        "Tell the user when a rollback happens. A card jumping back without explanation looks like a bug. The [toast notifications guide](/guides/nextjs-toast-notifications) covers the message.",
        "If you use TanStack Query, the same flow maps onto a mutation with `onMutate` (snapshot and apply), `onError` (restore) and `onSettled` (invalidate).",
      ],
    },

    { type: "h2", text: "Edit priority and assignee", id: "card-details" },
    {
      type: "p",
      text: "Open a side panel or popover when a card is clicked, and edit fields there rather than on the card, where controls would fight with dragging. `PriorityPicker` is a radiogroup of Low, Medium, High and Urgent with `value` and `onChange`; `AssignPicker` takes `people` of `{ id, name }`, the selected `value` and an `onChange` with the person's ID:",
    },
    {
      type: "code",
      lang: "tsx",
      code: `<PriorityPicker
  value={issue.priority}
  onChange={(p) => updateIssue(issue.id, { priority: p as Priority })}
/>
<AssignPicker
  people={members}
  value={issue.assigneeId}
  onChange={(id) => updateIssue(issue.id, { assigneeId: id })}
/>`,
    },
    {
      type: "p",
      text: "`updateIssue` follows the same optimistic pattern: patch `board.cards[id]` locally, send the request, restore on failure. Both pickers render every option as a focusable button, which is fine for four priorities and a small team. For long member lists, put a search field above `AssignPicker` or switch to a [combobox](/glossary/combobox).",
    },

    { type: "h2", text: "Large boards and performance", id: "performance" },
    {
      type: "p",
      text: "A board with a few hundred cards stays smooth if dragging does not re-render every card on every pointer move. dnd-kit moves items with CSS transforms, and sortable items mostly update when the item under the pointer changes, so most of the cost is in your own components. A few habits keep it that way:",
    },
    {
      type: "list",
      items: [
        "Wrap `SortableIssue` in `React.memo` and pass it the issue object from `board.cards`, which keeps its identity when other columns change.",
        "Keep the `DragOverlay` content light. It mounts on every drag start and is repositioned on every move, so render the card without popovers, avatars that fetch, or anything that measures layout.",
        "Leave auto scrolling on (the default). When a dragged card nears the edge of the horizontally scrolling board or a tall column, dnd-kit scrolls that container for you.",
        "Cap column height with `max-h` and `overflow-y-auto` so long columns scroll on their own instead of stretching the page.",
        "Virtualizing columns with hundreds of cards is possible, but sortable items that are not mounted cannot be measured; paginate or collapse done work (\"Show 200 more\") first.",
      ],
    },

    { type: "h2", text: "Components used in this guide", id: "components" },
    {
      type: "p",
      text: "All free and MIT licensed; the rest are in the [workflow category](/components/workflow). A kanban board usually sits inside an app shell, covered in the [sidebar layout guide](/guides/shadcn-sidebar-layout), and pairs well with a [command palette](/guides/react-command-palette) for jumping to an issue by key. If you would rather hand off the whole product, the [MiniDev studio](https://minidev.pro) builds complete apps with this kit.",
    },
    { type: "component", name: "kanban-column" },
    { type: "component", name: "issue-card" },
    { type: "component", name: "kanban-board" },
    { type: "component", name: "due-date-chip" },
    { type: "component", name: "priority-picker" },
    { type: "component", name: "assign-picker" },
    {
      type: "code",
      lang: "bash",
      code: "npx shadcn@latest add https://ui.minidev.pro/r/<name>.json\n# or the package\nnpm i minidev-ui-kit",
    },
  ],
  faq: [
    {
      q: "Which drag and drop library should I use for a React kanban board?",
      a: "dnd-kit (`@dnd-kit/core` and `@dnd-kit/sortable`) is a solid default: it is maintained, supports multiple sortable containers, and has keyboard dragging and screen reader announcements built in. `react-beautiful-dnd` is deprecated.",
    },
    {
      q: "How do I drop a card into an empty column?",
      a: "Register the column body with `useDroppable({ id: column.id })` in addition to its `SortableContext`. Without it, an empty column has no droppable item for collision detection to find.",
    },
    {
      q: "Can users move cards with the keyboard?",
      a: "Yes. Add `useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })`. Space or Enter picks a card up, arrow keys move it, Space or Enter drops it and Escape cancels. Customize the `announcements` so screen readers hear issue names.",
    },
    {
      q: "How should I store card order in the database?",
      a: "Give each card a sort key and, on a move, compute a key between its new neighbors (fractional indexing). That updates one row per move instead of rewriting every position in the column.",
    },
  ],
}

export default guide
