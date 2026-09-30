import type { Guide } from "../types"

const guide: Guide = {
  slug: "nextjs-toast-notifications",
  title: "Toast notifications in Next.js: when and how",
  description:
    "Add toast notifications to Next.js: mount one Toaster, call toast() from client components and after server actions, add undo, and keep toasts accessible.",
  date: "2026-09-30",
  keywords: [
    "nextjs toast",
    "react toast notification",
    "sonner alternative",
    "nextjs server action toast",
    "accessible toast notifications",
  ],
  related: ["toast", "inline-alert", "banner", "callout", "form-field"],
  body: [
    {
      type: "p",
      text: "To add toast notifications in Next.js, render one `<Toaster />` in the root layout and call `toast()` from client components, including right after a server action returns. Server code cannot show a toast, so the action returns a result and the client decides what to say. Use toasts for brief confirmations of something the user just did, and use an inline alert or a banner for errors that need fixing or states that persist.",
    },

    { type: "h2", text: "Mount the Toaster once", id: "mount" },
    {
      type: "code",
      lang: "bash",
      code: "npx shadcn@latest add https://ui.minidev.pro/r/toast.json",
    },
    {
      type: "p",
      text: "The [toast](/docs/toast) file exports four things: `Toast` (one card), `ToastStack` (a static column of cards for mockups), `Toaster` (the live region that renders queued toasts) and `toast` (the function you call). `Toaster` is a client component, and a server layout can render it directly:",
    },
    {
      type: "code",
      lang: "tsx",
      filename: "app/layout.tsx",
      code: 'import { Toaster } from "@/components/ui/toast"\nimport "./globals.css"\n\nexport default function RootLayout({ children }: { children: React.ReactNode }) {\n  return (\n    <html lang="en">\n      <body>\n        {children}\n        <Toaster />\n      </body>\n    </html>\n  )\n}',
    },
    {
      type: "list",
      items: [
        "Put it in the root layout, not a page. Layouts persist across client-side navigation, so a toast fired just before `router.push` stays on screen on the next page.",
        "Mount exactly one. The queue is module-level state, so two Toasters would render every toast twice.",
        "It is fixed to the bottom right with a 1rem inset and `z-[60]`, above dialogs. Pass `className` to change the inset, for example `bottom-20` to clear a mobile tab bar.",
        "Up to six toasts are kept and three are visible as a stack. Hover or focus fans them out and pauses their timers.",
      ],
    },

    { type: "h2", text: "Call toast() from client components", id: "calling" },
    {
      type: "p",
      text: "The API follows the shape most React developers know from Sonner. Every call returns a numeric id.",
    },
    {
      type: "code",
      lang: "tsx",
      code: 'import { toast } from "@/components/ui/toast"\n\ntoast("Link copied")\ntoast.success("Invite sent", { description: "sam@acme.co will get an email in a minute." })\ntoast.warning("You are near your seat limit", { duration: 8000 })\ntoast.error("Could not save changes", { description: "Check your connection and try again." })\n\nconst id = toast("Uploading 3 files")\ntoast.dismiss(id)\n\ntoast.promise(exportCsv(), {\n  loading: "Preparing export",\n  success: (file) => "Exported " + file.rows + " rows",\n  error: "Export failed",\n})',
    },
    {
      type: "table",
      head: ["Option", "Type", "Default"],
      rows: [
        ["`description`", "`ReactNode`", "none"],
        ["`action`", "`{ label: string; onClick: () => void }`", "none"],
        ["`duration`", "milliseconds, or `Infinity` to stay until dismissed", "4000"],
      ],
    },
    {
      type: "p",
      text: "`toast.promise` shows a spinner toast that never times out while pending, then turns into a success toast (4 seconds) or an error toast (5 seconds) in place, so the stack does not grow. It returns the original promise, so you can still `await` it. Its messages are titles only; there is no description option on promise toasts.",
    },

    { type: "h2", text: "Toasts after server actions", id: "server-actions" },
    {
      type: "p",
      text: "A server action runs on the server and cannot reach the browser's toast queue. Return a small result object and let the client react. Return expected failures instead of throwing them: in production, Next.js replaces the message of a thrown error with a generic one, so a thrown \"Name already taken\" never reaches the user.",
    },
    {
      type: "code",
      lang: "ts",
      filename: "app/(app)/projects/actions.ts",
      code: '"use server"\nimport { revalidatePath } from "next/cache"\n\nexport type Result = { ok: true; id: string } | { ok: false; error: string }\n\nexport async function createProject(formData: FormData): Promise<Result> {\n  const name = String(formData.get("name") ?? "").trim()\n  if (!name) return { ok: false, error: "Give the project a name." }\n  if (await projectExists(name)) return { ok: false, error: "A project with that name already exists." }\n  const project = await db.project.create({ data: { name } })\n  revalidatePath("/projects")\n  return { ok: true, id: project.id }\n}',
    },
    {
      type: "code",
      lang: "tsx",
      filename: "app/(app)/projects/new-project-form.tsx",
      code: '"use client"\nimport { useRouter } from "next/navigation"\nimport { toast } from "@/components/ui/toast"\nimport { FormField } from "@/components/ui/form-field"\nimport { Input } from "@/components/ui/input"\nimport { Button } from "@/components/ui/button"\nimport { createProject } from "./actions"\nimport { useState } from "react"\n\nexport function NewProjectForm() {\n  const router = useRouter()\n  const [error, setError] = useState<string>()\n  return (\n    <form\n      action={async (formData) => {\n        const res = await createProject(formData)\n        if (!res.ok) return setError(res.error)\n        toast.success("Project created")\n        router.push("/projects/" + res.id)\n      }}\n      className="space-y-3"\n    >\n      <FormField id="name" label="Project name" error={error}>\n        <Input id="name" name="name" aria-invalid={!!error} />\n      </FormField>\n      <Button type="submit">Create project</Button>\n    </form>\n  )\n}',
    },
    {
      type: "p",
      text: "Note the split: the validation error goes inline under the field, where the user is looking and where it stays until fixed; the success goes in a toast because the user is about to leave the form. If the action itself calls `redirect()`, do not rely on code after the `await` to show a toast, because the navigation is part of the action's response. Either return data and navigate from the client as above, or pass a flag in the URL (`?created=1`) and show the toast from a small client component on the next page that reads it with `useSearchParams` and then removes it with `router.replace`. Guard that effect with a ref, since React runs effects twice in development Strict Mode.",
    },

    { type: "h2", text: "Tones and when to use each", id: "variants" },
    {
      type: "table",
      head: ["Call", "Tone", "Role", "Use for"],
      rows: [
        ["`toast()`", "neutral", "`status`", "Facts: copied, moved, queued"],
        ["`toast.success()`", "success", "`status`", "A completed action the user asked for"],
        ["`toast.warning()`", "warning", "`status`", "Worked, with a caveat worth knowing"],
        ["`toast.error()`", "danger", "`alert`", "Background failures the user must know about"],
        ["`toast.promise()`", "loading, then success or danger", "`status` or `alert`", "Work that takes more than a second"],
      ],
    },
    {
      type: "p",
      text: "Keep titles to a few words in past tense (\"Invite sent\"), and add a description only when it tells the user something new. Do not toast things the UI already shows: if a row visibly appears in a table, \"Row added\" is noise.",
    },

    { type: "h2", text: "Actions and undo", id: "undo" },
    {
      type: "p",
      text: "Undo is the best reason to put a button in a toast. It lets you skip a confirmation dialog for reversible actions. Perform the action immediately (for example a soft delete), then offer to reverse it. The action button does not dismiss the toast by itself, so dismiss it in the handler:",
    },
    {
      type: "code",
      lang: "tsx",
      code: 'async function archive(project: Project) {\n  await archiveProject(project.id)\n  const id = toast("Project archived", {\n    description: project.name,\n    duration: 8000,\n    action: {\n      label: "Undo",\n      onClick: async () => {\n        toast.dismiss(id)\n        await restoreProject(project.id)\n        toast.success("Project restored")\n      },\n    },\n  })\n}',
    },
    {
      type: "callout",
      tone: "note",
      text: "Give toasts with actions a longer `duration`. Four seconds is enough to read \"Saved\", not enough to find and press Undo, especially with a keyboard.",
    },

    { type: "h2", text: "Accessibility: announce, do not interrupt", id: "accessibility" },
    {
      type: "p",
      text: "A [toast notification](/glossary/toast-notification) is announced, not focused. The Toaster's list is an `aria-live=\"polite\"` region, and each card carries `role=\"status\"`, or `role=\"alert\"` for the danger tone, so screen readers read new toasts without moving focus (see [ARIA](/glossary/aria) for how live regions work). What the component handles and what is up to you:",
    },
    {
      type: "list",
      items: [
        "**Focus is never stolen.** Toasts appear without taking focus, so typing in a field is not interrupted.",
        "**Timers pause** while the pointer is over the stack or focus is inside it, and the dismiss button appears on hover or keyboard focus.",
        "**Timing is your call.** WCAG asks that people get enough time to read and act. Give errors and anything with an action a longer duration, or `Infinity` for messages that must be acknowledged.",
        "**Never make a toast the only way to do something.** Keyboard and screen reader users may not reach it before it disappears. Undo should also exist elsewhere, such as an Archived view with a Restore button.",
        "**Do not stack announcements.** Ten rapid toasts produce ten announcements. Batch them: \"12 files uploaded\" instead of twelve toasts.",
      ],
    },

    { type: "h2", text: "When a banner or inline alert is better", id: "alternatives" },
    {
      type: "p",
      text: "Toasts are transient and detached from context. Anything that needs fixing or persists belongs in the page:",
    },
    {
      type: "table",
      head: ["Situation", "Use", "Why"],
      rows: [
        ["Form field is invalid", "`FormField` `error`", "Next to the field, stays until fixed"],
        ["Form submit failed", "[InlineAlert](/docs/inline-alert)", "At the form, with what to do"],
        ["Payment failed, trial ending, outage", "[Banner](/docs/banner)", "Persistent state across pages"],
        ["Static guidance on a page", "[Callout](/docs/callout)", "Part of the content, not an event"],
        ["Irreversible action", "Confirmation dialog", "Needs a decision before it happens"],
        ["Background job finished", "Toast", "Brief, and the user may be elsewhere"],
      ],
    },
    {
      type: "code",
      lang: "tsx",
      code: '<Banner tone="warning" action={<Button size="sm" variant="outline" render={<Link href="/billing" />}>Update card</Button>}>\n  Your last payment failed. Update your card to keep your workspace active.\n</Banner>\n\n<InlineAlert tone="danger" title="Could not connect to Stripe">\n  Check that the API key has write access, then try again.\n</InlineAlert>',
    },
    {
      type: "p",
      text: "`InlineAlert` uses `role=\"alert\"`, so render it when the error happens rather than keeping a hidden one on the page. `Banner` uses `role=\"status\"` and takes an optional `onDismiss`; only make it dismissible if the state it describes is not urgent.",
    },

    { type: "h2", text: "MiniDev toast or Sonner", id: "sonner" },
    {
      type: "p",
      text: "[Sonner](https://sonner.emilkowal.ski) is an excellent package with more features: configurable positions, swipe to dismiss, custom JSX toasts, `toast.loading`, and updating toasts by id. MiniDev's toast is a single file you own, drawn with the same tokens and shadows as the rest of the kit, with the calls most apps use: `toast`, `success`, `error`, `warning`, `promise` and `dismiss`. Choose Sonner when you need its extras, and MiniDev's when you want the toast to match the kit and be editable in place. Because the call signatures are similar, switching later is mostly an import change.",
    },

    { type: "h2", text: "Components used", id: "components" },
    {
      type: "p",
      text: "Toast, InlineAlert, Banner and Callout are free under MIT in the [feedback category](/components/feedback). The toast pairs naturally with the save patterns in the [settings page guide](/guides/saas-settings-page) and the plan changes in the [Stripe billing guide](/guides/nextjs-billing-page-stripe). The [MiniDev studio](https://minidev.pro) builds complete products on this kit if you need more than the parts.",
    },
    { type: "component", name: "toast" },
    { type: "component", name: "inline-alert" },
    { type: "component", name: "banner" },
    {
      type: "code",
      lang: "bash",
      code: "npx shadcn@latest add https://ui.minidev.pro/r/toast.json https://ui.minidev.pro/r/inline-alert.json https://ui.minidev.pro/r/banner.json https://ui.minidev.pro/r/callout.json",
    },
  ],
  faq: [
    {
      q: "Can I show a toast from a Next.js server action?",
      a: "Not directly. The toast queue lives in the browser. Return a result from the action and call `toast.success` or `toast.error` in the client code that awaited it, or pass a flag in the URL when the action redirects.",
    },
    {
      q: "Where should the Toaster go in the App Router?",
      a: "In the root `app/layout.tsx`, rendered once inside `body`. Layouts persist across client navigation, so toasts survive `router.push`.",
    },
    {
      q: "Are toast notifications accessible?",
      a: "They can be. Announce them through a polite live region, never move focus to them, pause timers on hover and focus, give actionable toasts enough time, and make sure any action in a toast is also available elsewhere.",
    },
    {
      q: "Should form validation errors be toasts?",
      a: "No. Show them inline next to the field or at the top of the form, where they stay until fixed. Toasts suit brief confirmations and background events.",
    },
  ],
}

export default guide
