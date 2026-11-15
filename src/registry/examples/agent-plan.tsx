"use client"
import * as React from "react"
import { AgentPlan, type AgentPlanTask } from "@/registry/ui/agent-plan"
import { Button } from "@/registry/ui/button"
import type { Example } from "./types"

const STEPS = ["Read the export job and its tests", "Stream rows instead of loading them all", "Add a progress event every 1,000 rows", "Run the export test suite"]

function SteppedPlan() {
  const [step, setStep] = React.useState(1)
  const tasks: AgentPlanTask[] = STEPS.map((title, i) => ({
    id: String(i),
    title,
    status: i < step ? "completed" : i === step ? "in_progress" : "pending",
  }))
  return (
    <div className="flex w-full max-w-lg flex-col gap-3">
      <AgentPlan title="Speed up the CSV export" tasks={tasks} />
      <div className="flex gap-2">
        <Button size="sm" variant="outline" disabled={step >= STEPS.length} onClick={() => setStep((s) => s + 1)}>
          Next step
        </Button>
        <Button size="sm" variant="ghost" onClick={() => setStep(1)}>
          Reset
        </Button>
      </div>
    </div>
  )
}

/** The input of Claude Code's TodoWrite tool. Codex's update_plan uses the same three statuses. */
type Todo = { content: string; activeForm: string; status: "pending" | "in_progress" | "completed" }

const todosToTasks = (todos: Todo[]): AgentPlanTask[] =>
  todos.map((t, i) => ({
    id: String(i),
    // activeForm is the present-tense label ("Running tests") meant for the running task.
    title: t.status === "in_progress" ? t.activeForm : t.content,
    status: t.status,
  }))

const TODOS: Todo[] = [
  { content: "Add a dueDate field to Invoice", activeForm: "Adding a dueDate field to Invoice", status: "completed" },
  { content: "Show overdue invoices in red", activeForm: "Showing overdue invoices in red", status: "in_progress" },
  { content: "Run the invoice tests", activeForm: "Running the invoice tests", status: "pending" },
]

export const examples: Example[] = [
  {
    title: "Live plan",
    description: "Drive the statuses from state. Each step moves the highlight to the next row, pops the check and fills the bar.",
    code: `const STEPS = ["Read the export job and its tests", "Stream rows instead of loading them all", "Add a progress event every 1,000 rows", "Run the export test suite"]

function SteppedPlan() {
  const [step, setStep] = React.useState(1)
  const tasks: AgentPlanTask[] = STEPS.map((title, i) => ({
    id: String(i),
    title,
    status: i < step ? "completed" : i === step ? "in_progress" : "pending",
  }))
  return (
    <div className="flex w-full max-w-lg flex-col gap-3">
      <AgentPlan title="Speed up the CSV export" tasks={tasks} />
      <div className="flex gap-2">
        <Button size="sm" variant="outline" disabled={step >= STEPS.length} onClick={() => setStep((s) => s + 1)}>
          Next step
        </Button>
        <Button size="sm" variant="ghost" onClick={() => setStep(1)}>
          Reset
        </Button>
      </div>
    </div>
  )
}`,
    node: <SteppedPlan />,
  },
  {
    title: "From a todo tool call",
    description: "Claude Code's TodoWrite sends pending, in_progress and completed, which map straight onto status. Show activeForm for the running task.",
    code: `type Todo = { content: string; activeForm: string; status: "pending" | "in_progress" | "completed" }

const todosToTasks = (todos: Todo[]): AgentPlanTask[] =>
  todos.map((t, i) => ({
    id: String(i),
    title: t.status === "in_progress" ? t.activeForm : t.content,
    status: t.status,
  }))

// AI SDK: find the latest call of your todo tool in the message parts
const call = message.parts.findLast((p) => p.type === "tool-todo_write")
<AgentPlan title="Overdue invoices" tasks={todosToTasks(call?.input?.todos ?? [])} />`,
    node: <AgentPlan title="Overdue invoices" tasks={todosToTasks(TODOS)} />,
  },
  {
    title: "Failure, subtasks and click to jump",
    description: "A failed task turns the bar red. Subtasks and tools fold out from the chevron; onTaskClick makes each title a button.",
    code: `<AgentPlan
  title="Deploy acme-web to production"
  onTaskClick={(task) => document.getElementById(\`step-\${task.id}\`)?.scrollIntoView()}
  tasks={[
    { id: "build", title: "Build the app", status: "completed", tools: ["run_command"] },
    {
      id: "migrate",
      title: "Run database migrations",
      status: "failed",
      description: "Migration 0042 timed out after 30s",
      subtasks: [
        { id: "m1", title: "0041_add_due_dates", status: "completed" },
        { id: "m2", title: "0042_backfill_totals", status: "failed" },
        { id: "m3", title: "0043_drop_legacy_columns", status: "skipped" },
      ],
      tools: ["run_command", "read_logs"],
    },
    { id: "release", title: "Switch traffic to the new release", status: "pending" },
  ]}
/>`,
    node: (
      <AgentPlan
        title="Deploy acme-web to production"
        onTaskClick={() => {}}
        tasks={[
          { id: "build", title: "Build the app", status: "completed", tools: ["run_command"] },
          {
            id: "migrate",
            title: "Run database migrations",
            status: "failed",
            description: "Migration 0042 timed out after 30s",
            subtasks: [
              { id: "m1", title: "0041_add_due_dates", status: "completed" },
              { id: "m2", title: "0042_backfill_totals", status: "failed" },
              { id: "m3", title: "0043_drop_legacy_columns", status: "skipped" },
            ],
            tools: ["run_command", "read_logs"],
          },
          { id: "release", title: "Switch traffic to the new release", status: "pending" },
        ]}
      />
    ),
  },
]
