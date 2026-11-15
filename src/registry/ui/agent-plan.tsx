"use client"
import * as React from "react"
import { Collapsible } from "@base-ui/react/collapsible"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { CheckIcon, ChevronDownIcon, MinusIcon, XIcon } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * AgentPlan — an AI agent's live to-do list: tasks with statuses, subtasks, tools and a progress bar.
 *
 * Use it while an agent works through a plan, fed from a todo or plan tool call (Claude Code's
 * `TodoWrite`, Codex's `update_plan`, or your own AI SDK tool). Statuses are `pending`,
 * `in_progress`, `completed`, `failed` and `skipped`. The active row is highlighted and announced;
 * when the agent moves on, the highlight glides to the next row and the check pops in. For a log of
 * tool calls that already ran use AgentTrace; for a checklist the user ticks use OnboardingChecklist.
 *
 * @example
 * <AgentPlan
 *   title="Migrate billing to Stripe"
 *   tasks={[
 *     { id: "1", title: "Read the current billing module", status: "completed" },
 *     { id: "2", title: "Write the webhook handler", status: "in_progress", tools: ["edit_file"] },
 *     { id: "3", title: "Run the test suite", status: "pending" },
 *   ]}
 * />
 */

type AgentPlanStatus = "pending" | "in_progress" | "completed" | "failed" | "skipped"

type AgentPlanSubtask = {
  /** Stable key. Keep it the same across updates so rows animate in place. */
  id: string
  /** What the agent will do, in a few words. */
  title: string
  /** Where the task stands. */
  status: AgentPlanStatus
  /** One muted line under the title. */
  description?: string
  /** Tool names shown as chips when the row is expanded, e.g. `["read_file", "run_tests"]`. */
  tools?: string[]
}

type AgentPlanTask = AgentPlanSubtask & {
  /** Steps inside this task, shown when the row is expanded. */
  subtasks?: AgentPlanSubtask[]
}

type AgentPlanProps = {
  /** Header label. */
  title?: string
  /** Tasks in plan order. */
  tasks?: AgentPlanTask[]
  /** Whether the task list starts expanded. */
  defaultOpen?: boolean
  /** Makes each task title a button. Fires with the clicked task, e.g. to scroll to its output. */
  onTaskClick?: (task: AgentPlanTask) => void
  className?: string
}

const SAMPLE_TASKS: AgentPlanTask[] = [
  { id: "1", title: "Find where invoices are rendered", status: "completed", tools: ["grep", "read_file"] },
  {
    id: "2",
    title: "Add a due date column to the invoice table",
    status: "in_progress",
    description: "Sortable, formatted in the customer's locale",
    tools: ["edit_file"],
    subtasks: [
      { id: "2a", title: "Add dueDate to the Invoice type", status: "completed" },
      { id: "2b", title: "Render the column", status: "in_progress" },
      { id: "2c", title: "Sort by due date", status: "pending" },
    ],
  },
  { id: "3", title: "Update the invoice snapshot tests", status: "pending", tools: ["run_tests"] },
  { id: "4", title: "Backfill due dates for draft invoices", status: "skipped", description: "Drafts have no due date yet" },
]

const SNAPPY = { type: "spring", bounce: 0.18, duration: 0.42 } as const

const STATUS_TEXT: Record<AgentPlanStatus, string> = {
  pending: "pending",
  in_progress: "in progress",
  completed: "completed",
  failed: "failed",
  skipped: "skipped",
}

/** The status glyph. A new status crossfades in; the check also pops from 60% scale. */
function Glyph({ status, small, reduce }: { status: AgentPlanStatus; small?: boolean; reduce: boolean | null }) {
  const size = small ? "size-3.5" : "size-4"
  const icon = small ? "size-2.5" : "size-3"
  return (
    <span aria-hidden className={cn("relative grid shrink-0 place-items-center", size)}>
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span
          key={status}
          initial={{ opacity: 0, scale: status === "completed" ? 0.6 : 1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, transition: reduce ? { duration: 0 } : { duration: 0.12 } }}
          transition={reduce ? { duration: 0 } : SNAPPY}
          className={cn(
            "absolute inset-0 grid place-items-center rounded-full",
            status === "pending" && "border-[1.5px] border-border-strong",
            status === "in_progress" && "animate-spin border-[1.5px] border-accent-line border-t-accent",
            status === "completed" && "bg-success text-bg",
            status === "failed" && "bg-danger text-bg",
            status === "skipped" && "border-[1.5px] border-dashed border-border-strong text-fg-subtle"
          )}
        >
          {status === "completed" ? <CheckIcon className={icon} strokeWidth={3} /> : null}
          {status === "failed" ? <XIcon className={icon} strokeWidth={3} /> : null}
          {status === "skipped" ? <MinusIcon className={icon} strokeWidth={2.5} /> : null}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

const titleClass = (status: AgentPlanStatus) =>
  cn(
    "transition-[color] duration-[70ms]",
    status === "completed" && "text-fg-subtle line-through decoration-fg-subtle/60",
    status === "skipped" && "text-fg-subtle",
    status === "failed" && "text-fg",
    status === "in_progress" && "font-medium text-fg",
    status === "pending" && "text-fg-muted"
  )

const rowButton =
  "flex min-w-0 flex-1 items-start gap-2.5 rounded-md py-1 text-left outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"

function AgentPlan({ title = "Plan", tasks = SAMPLE_TASKS, defaultOpen = true, onTaskClick, className }: AgentPlanProps) {
  const reduce = useReducedMotion()
  const highlightId = React.useId()
  const counted = tasks.filter((t) => t.status !== "skipped")
  const done = counted.filter((t) => t.status === "completed").length
  const total = counted.length
  const failed = tasks.some((t) => t.status === "failed")
  const active = tasks.find((t) => t.status === "in_progress")
  const announcement = active ? `Working on: ${active.title}` : total > 0 && done === total ? `${title} complete` : ""

  return (
    <Collapsible.Root
      defaultOpen={defaultOpen}
      data-slot="agent-plan"
      className={cn("w-full max-w-lg overflow-hidden rounded-xl border border-border bg-surface shadow-raised", className)}
    >
      <Collapsible.Trigger
        className={cn(
          "group/plan flex w-full items-center gap-2.5 px-4 pt-3 pb-2.5 text-left outline-none",
          "transition-[background-color] duration-[70ms] hover:bg-sunken/60",
          "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset"
        )}
      >
        <span className="min-w-0 flex-1 truncate text-[0.8125rem] font-medium text-fg">{title}</span>
        <span className="font-mono text-[11px] tabular-nums text-fg-subtle">
          {done} of {total} done
        </span>
        <ChevronDownIcon
          aria-hidden
          className="size-4 shrink-0 text-fg-subtle transition-transform duration-200 ease-hairline group-data-[panel-open]/plan:rotate-180"
        />
      </Collapsible.Trigger>
      <div
        role="progressbar"
        aria-label={`${title} progress`}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={done}
        aria-valuetext={`${done} of ${total} done`}
        className="mx-4 mb-3 h-0.5 overflow-hidden rounded-full bg-sunken"
      >
        <motion.div
          data-slot="agent-plan-progress"
          className={cn("h-full origin-left rounded-full", failed ? "bg-danger" : done === total && total > 0 ? "bg-success" : "bg-accent")}
          initial={false}
          animate={{ scaleX: total ? done / total : 0 }}
          transition={reduce ? { duration: 0 } : SNAPPY}
        />
      </div>
      <p aria-live="polite" className="sr-only">
        {announcement}
      </p>
      <Collapsible.Panel
        className={cn(
          "h-[var(--collapsible-panel-height)] overflow-hidden border-t border-border",
          "transition-[height] duration-200 ease-hairline data-[ending-style]:duration-[160ms] data-[ending-style]:ease-exit",
          "data-[ending-style]:h-0 data-[starting-style]:h-0"
        )}
      >
        <ol aria-label={title} className="isolate p-2">
          {tasks.map((task) => {
            const hasDetails = !!(task.subtasks?.length || task.tools?.length)
            const subDone = task.subtasks?.filter((s) => s.status === "completed").length ?? 0
            const label = (
              <>
                <span className="pt-0.5">
                  <Glyph status={task.status} reduce={reduce} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className={cn("block text-[0.8125rem] leading-5", titleClass(task.status))}>{task.title}</span>
                  {task.description ? <span className="block text-xs leading-[18px] text-fg-subtle">{task.description}</span> : null}
                  <span className="sr-only">, {STATUS_TEXT[task.status]}</span>
                </span>
                {task.subtasks?.length ? (
                  <span className="pt-0.5 font-mono text-[11px] tabular-nums text-fg-subtle">
                    {subDone}/{task.subtasks.length}
                  </span>
                ) : null}
              </>
            )
            const chevron = (
              <ChevronDownIcon
                aria-hidden
                className="mt-0.5 size-4 shrink-0 text-fg-subtle transition-transform duration-200 ease-hairline group-data-[panel-open]/row:rotate-180"
              />
            )
            return (
              <Collapsible.Root
                key={task.id}
                defaultOpen={task.status === "in_progress" && hasDetails}
                render={<li aria-current={task.status === "in_progress" ? "step" : undefined} />}
                className="relative rounded-lg px-2 py-1"
              >
                {task.status === "in_progress" ? (
                  <motion.span
                    layoutId={highlightId}
                    aria-hidden
                    className="absolute inset-0 -z-10 rounded-lg bg-sunken"
                    transition={reduce ? { duration: 0 } : SNAPPY}
                  />
                ) : null}
                <div className="flex items-start gap-1">
                  {onTaskClick ? (
                    <button type="button" onClick={() => onTaskClick(task)} className={cn(rowButton, "cursor-pointer")}>
                      {label}
                    </button>
                  ) : hasDetails ? (
                    <Collapsible.Trigger className={cn(rowButton, "group/row cursor-pointer")}>
                      {label}
                      {chevron}
                    </Collapsible.Trigger>
                  ) : (
                    <div className="flex min-w-0 flex-1 items-start gap-2.5 py-1">{label}</div>
                  )}
                  {onTaskClick && hasDetails ? (
                    <Collapsible.Trigger
                      aria-label={`Details: ${task.title}`}
                      className="group/row grid size-7 shrink-0 cursor-pointer place-items-center rounded-md outline-none transition-[background-color] duration-[70ms] hover:bg-sunken focus-visible:ring-2 focus-visible:ring-accent"
                    >
                      {chevron}
                    </Collapsible.Trigger>
                  ) : null}
                </div>
                {hasDetails ? (
                  <Collapsible.Panel
                    className={cn(
                      "h-[var(--collapsible-panel-height)] overflow-hidden",
                      "transition-[height] duration-200 ease-hairline data-[ending-style]:duration-[160ms] data-[ending-style]:ease-exit",
                      "data-[ending-style]:h-0 data-[starting-style]:h-0"
                    )}
                  >
                    <div className="pt-1 pb-1.5 pl-[26px]">
                      {task.subtasks?.length ? (
                        <ul aria-label={`Steps in ${task.title}`} className="space-y-1">
                          {task.subtasks.map((s) => (
                            <li key={s.id} className="flex items-start gap-2">
                              <span className="pt-[3px]">
                                <Glyph status={s.status} small reduce={reduce} />
                              </span>
                              <span className="min-w-0 flex-1 text-xs leading-5">
                                <span className={titleClass(s.status)}>{s.title}</span>
                                <span className="sr-only">, {STATUS_TEXT[s.status]}</span>
                                {s.description ? <span className="block leading-[18px] text-fg-subtle">{s.description}</span> : null}
                              </span>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                      {task.tools?.length ? (
                        <ul aria-label="Tools" className={cn("flex flex-wrap gap-1", task.subtasks?.length && "mt-2")}>
                          {task.tools.map((tool) => (
                            <li
                              key={tool}
                              className="rounded-md border border-border bg-sunken px-1.5 py-0.5 font-mono text-[11px] leading-4 text-fg-muted"
                            >
                              {tool}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  </Collapsible.Panel>
                ) : null}
              </Collapsible.Root>
            )
          })}
        </ol>
      </Collapsible.Panel>
    </Collapsible.Root>
  )
}

export { AgentPlan }
export type { AgentPlanProps, AgentPlanTask, AgentPlanSubtask, AgentPlanStatus }
