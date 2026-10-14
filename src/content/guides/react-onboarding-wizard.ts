import type { Guide } from "../types"

const guide: Guide = {
  slug: "react-onboarding-wizard",
  title: "Multi-step onboarding wizard in React: state, validation, progress",
  description:
    "Build a multi-step onboarding wizard in React 19 and Tailwind: one state object, per-step validation, a progress bar, focus management and resumable drafts.",
  date: "2026-10-14",
  keywords: [
    "react multi step form",
    "onboarding wizard react",
    "react stepper form validation",
    "multi step form state management",
    "react form wizard tailwind",
  ],
  related: ["stepper", "step-progress", "onboarding-wizard", "onboarding-checklist", "form-field", "input", "button"],
  body: [
    {
      type: "p",
      text: "A multi-step onboarding wizard in React is one form split across screens: a single state object holds every answer, a step index decides which fields are visible, and each step validates its own slice before the index moves on. The progress bar, the Back and Next buttons and the final submit all read from that one object, so nothing is lost when someone goes back.",
    },
    {
      type: "p",
      text: "This guide builds a four step workspace setup with the free MiniDev UI [StepProgress](/docs/step-progress), [FormField](/docs/form-field), [Input](/docs/input) and [Button](/docs/button), explains where [Stepper](/docs/stepper) and the kit's [OnboardingWizard](/docs/onboarding-wizard) fit, and finishes with an [OnboardingChecklist](/docs/onboarding-checklist) for the week after sign up. The glossary entry on [steppers](/glossary/stepper) covers the vocabulary.",
    },

    { type: "h2", text: "Model the wizard as state, not as pages", id: "state" },
    {
      type: "p",
      text: "Resist the urge to give each step its own route and its own form. Separate forms mean separate state, and the review screen then has to stitch it back together. Define the steps and the data once:",
    },
    {
      type: "code",
      lang: "ts",
      filename: "app/setup/wizard.ts",
      code: `export const STEPS = [
  { id: "workspace", label: "Workspace" },
  { id: "team", label: "Team" },
  { id: "plan", label: "Plan" },
  { id: "review", label: "Review" },
] as const

export type StepId = (typeof STEPS)[number]["id"]

export type WizardData = {
  workspace: string
  slug: string
  invites: string
  plan: "free" | "team"
}

export const EMPTY: WizardData = { workspace: "", slug: "", invites: "", plan: "free" }

export type Errors = Partial<Record<keyof WizardData, string>>

const SLUG = /^[a-z0-9-]{3,32}$/

export const validators: Record<StepId, (d: WizardData) => Errors> = {
  workspace: (d) => {
    const e: Errors = {}
    if (d.workspace.trim().length < 2) e.workspace = "Give the workspace a name."
    if (!SLUG.test(d.slug)) e.slug = "Use 3 to 32 lowercase letters, numbers or dashes."
    return e
  },
  team: (d) => {
    const bad = d.invites.split(",").map((s) => s.trim()).filter(Boolean).filter((s) => !s.includes("@"))
    return bad.length ? { invites: "Check these addresses: " + bad.join(", ") } : {}
  },
  plan: () => ({}),
  review: () => ({}),
}`,
    },
    {
      type: "list",
      items: [
        "`STEPS` is `as const`, so `StepId` is a union of the four ids and the `validators` record must cover all of them. Adding a step without a validator is a type error.",
        "Validators are plain functions of the whole data object. They run on Next, on Submit and in tests, with no form library involved.",
        "Keep invites as the raw comma separated string the user typed and split it when validating. Normalising on every keystroke fights the cursor.",
      ],
    },

    { type: "h2", text: "Install", id: "install" },
    {
      type: "code",
      lang: "bash",
      code: "npx shadcn@latest add https://ui.minidev.pro/r/step-progress.json\nnpx shadcn@latest add https://ui.minidev.pro/r/form-field.json\nnpx shadcn@latest add https://ui.minidev.pro/r/input.json\nnpx shadcn@latest add https://ui.minidev.pro/r/button.json\nnpx shadcn@latest add https://ui.minidev.pro/r/onboarding-checklist.json",
    },
    {
      type: "p",
      text: "Import the token stylesheet once ([styles.css](https://ui.minidev.pro/r/styles.css) or `minidev-ui-kit/styles.css`) so `bg-surface`, `text-fg-muted` and the accent classes resolve.",
    },

    { type: "h2", text: "The wizard component", id: "wizard" },
    {
      type: "p",
      text: "The component below owns `step`, `data` and `errors`. Each step renders its fields from the same `data`, Next validates the current slice, and the review step submits with `useTransition` so the button can show a pending state without extra booleans.",
    },
    {
      type: "code",
      lang: "tsx",
      filename: "app/setup/setup-wizard.tsx",
      code: `"use client"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { FormField } from "@/components/ui/form-field"
import { Input } from "@/components/ui/input"
import { StepProgress } from "@/components/ui/step-progress"
import { EMPTY, STEPS, validators, type Errors, type WizardData } from "./wizard"
import { createWorkspace } from "./actions"

export function SetupWizard() {
  const [step, setStep] = React.useState(0)
  const [data, setData] = React.useState<WizardData>(EMPTY)
  const [errors, setErrors] = React.useState<Errors>({})
  const [pending, startTransition] = React.useTransition()
  const [serverError, setServerError] = React.useState<string | null>(null)
  const heading = React.useRef<HTMLHeadingElement>(null)
  const first = React.useRef(true)

  React.useEffect(() => {
    if (first.current) { first.current = false; return }
    heading.current?.focus()
  }, [step])

  const update = <K extends keyof WizardData>(key: K, value: WizardData[K]) => {
    setData((d) => ({ ...d, [key]: value }))
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }))
  }

  const current = STEPS[step]
  const last = step === STEPS.length - 1

  const next = () => {
    const errs = validators[current.id](data)
    setErrors(errs)
    if (Object.values(errs).some(Boolean)) return
    setStep((s) => s + 1)
  }

  const submit = () => {
    startTransition(async () => {
      const res = await createWorkspace(data)
      if (res.ok) window.location.assign("/" + data.slug)
      else setServerError(res.error)
    })
  }

  const invalid = (key: keyof WizardData) => (errors[key] ? true : undefined)

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); if (last) submit(); else next() }}
      className="mx-auto max-w-lg space-y-6 rounded-2xl border border-border bg-surface p-6 shadow-highlight"
    >
      <StepProgress steps={STEPS.map((s) => s.label)} current={step} className="max-w-none" />
      <p role="status" className="sr-only">Step {step + 1} of {STEPS.length}: {current.label}</p>
      <h2 ref={heading} tabIndex={-1} className="text-lg font-medium tracking-[-0.014em] text-fg outline-none">
        {current.label}
      </h2>

      {current.id === "workspace" ? (
        <div className="space-y-4">
          <FormField id="ws-name" label="Workspace name" required error={errors.workspace} description="Shown in the sidebar and in invites.">
            <Input id="ws-name" value={data.workspace} onChange={(e) => update("workspace", e.target.value)} aria-invalid={invalid("workspace")} autoComplete="organization" autoFocus />
          </FormField>
          <FormField id="ws-slug" label="URL" required error={errors.slug} description="app.lumen.io/your-slug">
            <Input id="ws-slug" value={data.slug} onChange={(e) => update("slug", e.target.value.toLowerCase())} aria-invalid={invalid("slug")} spellCheck={false} />
          </FormField>
        </div>
      ) : null}

      {current.id === "team" ? (
        <FormField id="ws-invites" label="Invite teammates" error={errors.invites} description="Comma separated. You can skip this.">
          <Input id="ws-invites" value={data.invites} onChange={(e) => update("invites", e.target.value)} aria-invalid={invalid("invites")} inputMode="email" autoFocus />
        </FormField>
      ) : null}

      {current.id === "plan" ? <PlanStep value={data.plan} onChange={(v) => update("plan", v)} /> : null}

      {current.id === "review" ? (
        <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm">
          <dt className="text-fg-muted">Workspace</dt><dd className="text-fg">{data.workspace}</dd>
          <dt className="text-fg-muted">URL</dt><dd className="font-mono text-fg">{data.slug}</dd>
          <dt className="text-fg-muted">Invites</dt><dd className="text-fg">{data.invites || "None"}</dd>
          <dt className="text-fg-muted">Plan</dt><dd className="capitalize text-fg">{data.plan}</dd>
        </dl>
      ) : null}

      {serverError ? <p role="alert" className="text-sm text-danger">{serverError}</p> : null}

      <div className="flex justify-between gap-2">
        <Button type="button" variant="outline" disabled={step === 0 || pending} onClick={() => setStep((s) => s - 1)}>
          Back
        </Button>
        <Button type="submit" disabled={pending}>
          {last ? (pending ? "Creating…" : "Create workspace") : "Next"}
        </Button>
      </div>
    </form>
  )
}

function PlanStep({ value, onChange }: { value: WizardData["plan"]; onChange: (v: WizardData["plan"]) => void }) {
  const plans = [
    { id: "free" as const, label: "Free", hint: "Up to 3 members" },
    { id: "team" as const, label: "Team", hint: "$12 per member, billed monthly" },
  ]
  return (
    <fieldset className="space-y-2">
      <legend className="sr-only">Plan</legend>
      {plans.map((p) => (
        <label key={p.id} className="flex cursor-pointer items-center gap-3 rounded-xl border border-border bg-surface p-3 has-checked:border-accent has-checked:bg-accent-soft">
          <input type="radio" name="plan" value={p.id} checked={value === p.id} onChange={() => onChange(p.id)} className="accent-accent" />
          <span className="text-sm font-medium text-fg">{p.label}</span>
          <span className="ml-auto text-xs text-fg-muted">{p.hint}</span>
        </label>
      ))}
    </fieldset>
  )
}`,
    },
    {
      type: "list",
      items: [
        "The whole wizard is one `<form>`, so Enter in any field triggers Next, and on the last step it triggers submit. That is what people expect from a form, and it works for keyboard users without extra handlers.",
        "Steps are rendered conditionally rather than kept mounted. Because the values live in `data`, unmounting a step loses nothing, and the DOM only ever contains the fields that are relevant.",
        "`update` clears the error for the field being edited. Validation runs on Next, not on every keystroke, so people are not told their slug is wrong while they are still typing it.",
        "Only the current step's validator runs on Next. The server action validates everything again before writing anything.",
      ],
    },

    { type: "h2", text: "Progress: StepProgress or Stepper", id: "progress" },
    {
      type: "p",
      text: "Both kit components are presentational: they take `steps` (labels) and `current` (a zero based index) and draw a filled segment per completed and active step. The differences are small but worth knowing:",
    },
    {
      type: "table",
      head: ["", "StepProgress", "Stepper"],
      rows: [
        ["Labels", "Plain text under each segment", "Numbered, \"1. Details\""],
        ["`aria-current=\"step\"`", "Set on the active `li`", "Not set; add it in your copy if you use it"],
        ["Width", "`max-w-lg` by default, override with `className`", "Full width"],
        ["Clickable", "No", "No"],
      ],
    },
    {
      type: "p",
      text: "Neither lets the user jump between steps, which is deliberate for onboarding: later steps depend on earlier answers. If you want completed steps to be clickable, render buttons for indexes below `step` and leave the rest as text. The visible counter is redundant with the `role=\"status\"` line in the wizard, which announces \"Step 2 of 4: Team\" to screen readers on every change.",
    },
    {
      type: "callout",
      tone: "note",
      text: "The kit's `OnboardingWizard` and the `FormWizard` block are fixed three step demos with no props beyond `className`; the `WorkspaceCreate` and `InviteMembers` previews inside them are static and do not collect values. Use them as layout references and keep your own state as shown above.",
    },

    { type: "h2", text: "Errors that screen readers can find", id: "errors" },
    {
      type: "p",
      text: "`FormField` renders the `error` in a `role=\"alert\"` paragraph, so the message is announced the moment it appears, and hides the `description` while an error is showing so the two never stack. What it does not do is link the message to the input. Add an id to the error paragraph in your copy and point `aria-describedby` at it:",
    },
    {
      type: "code",
      lang: "tsx",
      filename: "components/ui/form-field.tsx",
      code: `{error ? (
  <p id={id ? id + "-error" : undefined} role="alert" className="text-xs tracking-[0.01em] text-danger">{error}</p>
) : null}

// in the wizard
<Input id="ws-slug" aria-describedby={errors.slug ? "ws-slug-error" : undefined} aria-invalid={invalid("slug")} ... />`,
    },
    {
      type: "p",
      text: "`aria-invalid` on the `Input` switches the border and focus ring to the danger colour through the kit's `aria-invalid:` variants, so there is no `error` prop to pass. Pass `undefined` rather than `false` when the field is valid, or the attribute renders as the string \"false\" and some screen readers read it out.",
    },

    { type: "h2", text: "Async checks: is the slug taken?", id: "async-validation" },
    {
      type: "p",
      text: "Uniqueness can only be checked on the server. Do it while the user types, debounced and cancellable, and treat the result as a hint; the final check happens in the action that creates the workspace.",
    },
    {
      type: "code",
      lang: "tsx",
      code: `const [slugState, setSlugState] = React.useState<"idle" | "checking" | "free" | "taken">("idle")

React.useEffect(() => {
  if (!SLUG.test(data.slug)) { setSlugState("idle"); return }
  const ac = new AbortController()
  setSlugState("checking")
  const t = setTimeout(async () => {
    try {
      const res = await fetch("/api/slug?s=" + encodeURIComponent(data.slug), { signal: ac.signal })
      setSlugState((await res.json()).free ? "free" : "taken")
    } catch {}
  }, 300)
  return () => { clearTimeout(t); ac.abort() }
}, [data.slug])

<FormField
  id="ws-slug"
  label="URL"
  error={errors.slug ?? (slugState === "taken" ? "That URL is taken." : undefined)}
  description={slugState === "free" ? "Available" : slugState === "checking" ? "Checking…" : "app.lumen.io/your-slug"}
>`,
    },
    {
      type: "p",
      text: "Block Next while `slugState` is `\"taken\"` by folding it into the workspace validator, and do not block on `\"checking\"`: a slow network should never trap someone on a step.",
    },

    { type: "h2", text: "Resume where they left off", id: "persist" },
    {
      type: "p",
      text: "People close the tab halfway through onboarding. Persist `step` and `data` to `sessionStorage` after every change and read them back on mount. For flows longer than a few minutes, save a draft to the server instead so it survives a device switch.",
    },
    {
      type: "code",
      lang: "tsx",
      code: `const KEY = "setup-draft"

const [state, setState] = React.useState(() => {
  try {
    const raw = sessionStorage.getItem(KEY)
    if (raw) return JSON.parse(raw) as { step: number; data: WizardData }
  } catch {}
  return { step: 0, data: EMPTY }
})

React.useEffect(() => {
  try { sessionStorage.setItem(KEY, JSON.stringify(state)) } catch {}
}, [state])`,
    },
    {
      type: "p",
      text: "Lazy initialisers run on the client only when the component is rendered on the client. In a Next.js app this component is a client component inside a server rendered page, so guard the read with `typeof window !== \"undefined\"` or render the wizard after mount to avoid a [hydration](/glossary/hydration) mismatch. Clear the key after a successful submit.",
    },

    { type: "h2", text: "Focus and motion", id: "focus" },
    {
      type: "list",
      items: [
        "On each step change, focus moves to the step heading (`tabIndex={-1}`, focused in an effect). Screen readers announce the new heading and the next Tab lands on the first field. Skipping this leaves focus on a Next button that has just moved or disappeared.",
        "The first field of a step gets `autoFocus` so mouse users can start typing. It is fine here because the wizard is the only thing on the page; do not do it inside a dashboard.",
        "The Back button is never hidden, only disabled on the first step, so its position is stable and the layout does not jump.",
        "If you animate step transitions, respect [prefers-reduced-motion](/glossary/prefers-reduced-motion) and keep the animation shorter than the focus move, or the heading is focused before it is visible.",
      ],
    },

    { type: "h2", text: "After the wizard: a checklist", id: "checklist" },
    {
      type: "p",
      text: "The wizard collects what the product needs to exist; the checklist nudges the actions that make it stick, like installing the CLI or sending the first invoice. `OnboardingChecklist` takes `items` of `{ id, label, done }` and renders a card with toggleable rows.",
    },
    {
      type: "code",
      lang: "tsx",
      code: `<OnboardingChecklist
  items={[
    { id: "invite", label: "Invite a teammate", done: invites > 0 },
    { id: "connect", label: "Connect your bank", done: hasBank },
    { id: "invoice", label: "Send your first invoice", done: invoices > 0 },
  ]}
/>`,
    },
    {
      type: "callout",
      tone: "warning",
      text: "`OnboardingChecklist` copies `items` into its own state on first render and toggles rows locally. It has no `onChange`, and later changes to `items` are ignored. For a checklist driven by real data, remove the internal `useState` in your copy and render `done` straight from props, or add an `onToggle` callback. As shipped it is a preview that works for a static list.",
    },

    { type: "h2", text: "Pitfalls", id: "pitfalls" },
    {
      type: "list",
      items: [
        "**Validating all steps on Next.** The user cannot see the step with the error, so they cannot fix it. Validate the current step on Next and everything on submit.",
        "**Resetting data on Back.** Going back should show the previous answers filled in. With one state object this is automatic; with per-step forms it is a bug waiting to happen.",
        "**Submitting through `onClick` on the button.** Enter in a field then does nothing, or submits the wrong thing. Use the form's `onSubmit`.",
        "**Double submits.** `useTransition` gives you `pending`; disable the submit button while it is true and make the server action idempotent on the slug.",
        "**Storing the step in the URL without the data.** A refresh lands on step 3 with empty fields. If you want deep links, persist the data too, or send people back to the first incomplete step.",
      ],
    },

    { type: "h2", text: "Components used in this guide", id: "components" },
    {
      type: "p",
      text: "All of these are free and MIT licensed, with the rest of the inputs in the [forms category](/components/forms). The wizard usually ends on the dashboard from the [Next.js SaaS dashboard guide](/guides/nextjs-saas-dashboard), and the workspace settings it creates are edited later on a [settings page](/guides/saas-settings-page). If you would rather have the whole onboarding flow built, the [MiniDev studio](https://minidev.pro) builds complete products on this kit.",
    },
    { type: "component", name: "step-progress" },
    { type: "component", name: "form-field" },
    { type: "component", name: "onboarding-checklist" },
    { type: "component", name: "onboarding-wizard" },
    {
      type: "code",
      lang: "bash",
      code: "npx shadcn@latest add https://ui.minidev.pro/r/<name>.json\n# or the package\nnpm i minidev-ui-kit",
    },
  ],
  faq: [
    {
      q: "Should each step of a multi-step form be its own route?",
      a: "Usually not. One component with one state object is simpler, keeps answers when the user goes back and makes the review step trivial. Use routes when steps are genuinely independent pages, like a checkout that returns from a payment provider.",
    },
    {
      q: "Do I need React Hook Form or Formik for a wizard?",
      a: "No. A wizard with a handful of fields per step is a `useState` object plus a validator per step. A form library earns its place when steps have dozens of fields, nested arrays or schema driven validation shared with the server.",
    },
    {
      q: "How do I make a stepper accessible?",
      a: "Mark the active step with `aria-current=\"step\"` (StepProgress does this), announce step changes in a `role=\"status\"` region, move focus to the new step's heading, and render errors in `role=\"alert\"` elements linked to their inputs with `aria-describedby`.",
    },
  ],
}

export default guide
