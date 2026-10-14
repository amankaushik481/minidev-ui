import type { Guide } from "../types"

const guide: Guide = {
  slug: "react-accessible-modal",
  title: "Accessible modal and drawer in React: focus, scroll lock, Escape, return focus",
  description:
    "Build accessible modals, alert dialogs and side drawers in React: focus trap, initial and return focus, Escape, scroll lock, inert background, labels and forms.",
  date: "2026-10-14",
  keywords: [
    "react accessible modal",
    "react dialog focus trap",
    "accessible drawer react",
    "modal scroll lock react",
    "react alert dialog confirm",
  ],
  related: ["dialog", "alert-dialog", "sheet", "drawer", "button"],
  body: [
    {
      type: "p",
      text: "An accessible modal in React does six things the moment it opens: moves focus inside, keeps Tab inside, closes on Escape, returns focus to the element that opened it when it closes, locks page scroll, and makes everything behind it inert to pointers and screen readers. A drawer or side sheet is a modal with a different position, and it needs exactly the same six.",
    },
    {
      type: "p",
      text: "The free MiniDev UI [Dialog](/docs/dialog) and [AlertDialog](/docs/alert-dialog) get all six from Base UI. The kit's [Sheet](/docs/sheet) and [Drawer](/docs/drawer) are hand written and get four of them, which this guide says plainly and then fixes by rebuilding the sheet on the same primitive. Along the way: where initial focus should go, scroll lock without layout shift, forms inside dialogs, animation with reduced motion, and a test checklist. The [modal dialog](/glossary/modal-dialog) entry has the definitions.",
    },

    { type: "h2", text: "The checklist", id: "checklist" },
    {
      type: "table",
      head: ["Requirement", "Why", "Dialog / AlertDialog", "Sheet / Drawer as shipped"],
      rows: [
        ["`role=\"dialog\"` with an accessible name", "Announced as a dialog with its title", "Yes, via `DialogTitle`", "Yes, `aria-label` from `title`"],
        ["Initial focus inside", "Keyboard and screen reader users start in the dialog", "Yes, first tabbable or the popup", "Yes, the panel itself"],
        ["Focus trapped", "Tab cannot wander behind the scrim", "Yes", "No"],
        ["Escape closes", "The universal exit", "Yes", "Yes"],
        ["Focus returns to the trigger", "The user is back where they were", "Yes", "Yes, to the previously focused element"],
        ["Scroll locked", "The page does not scroll behind the panel", "Yes, with scrollbar compensation", "No"],
        ["Background inert", "Pointer and screen reader cannot reach it", "Yes", "Pointer only, via the scrim"],
        ["Description wired", "`aria-describedby` on the dialog", "Yes, via `DialogDescription`", "No"],
      ],
    },

    { type: "h2", text: "Install", id: "install" },
    {
      type: "code",
      lang: "bash",
      code: "npx shadcn@latest add https://ui.minidev.pro/r/dialog.json\nnpx shadcn@latest add https://ui.minidev.pro/r/alert-dialog.json\nnpx shadcn@latest add https://ui.minidev.pro/r/sheet.json\nnpx shadcn@latest add https://ui.minidev.pro/r/button.json",
    },
    {
      type: "p",
      text: "`Dialog` and `AlertDialog` depend on `@base-ui/react`. The open and close animations use `tw-animate-css` utilities (`animate-in`, `fade-in-0`, `slide-in-from-bottom-2`), so keep the `@import \"tw-animate-css\"` line shadcn init adds to your CSS next to the kit's [styles.css](https://ui.minidev.pro/r/styles.css).",
    },

    { type: "h2", text: "Dialog: the primitive does the hard parts", id: "dialog" },
    {
      type: "p",
      text: "The kit's `Dialog` wraps Base UI's dialog parts with styling: `DialogTrigger`, `DialogContent` (portal, scrim and the panel, with a close button in the corner unless `showCloseButton={false}`), `DialogHeader`, `DialogTitle`, `DialogDescription` and `DialogFooter`. A settings form in a dialog looks like this:",
    },
    {
      type: "code",
      lang: "tsx",
      filename: "components/rename-workspace.tsx",
      code: `"use client"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { FormField } from "@/components/ui/form-field"
import { Input } from "@/components/ui/input"

export function RenameWorkspace({ name, onRename }: { name: string; onRename: (next: string) => Promise<void> }) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState(name)
  const [pending, start] = React.useTransition()
  const field = React.useRef<HTMLInputElement>(null)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button variant="outline" />}>Rename</DialogTrigger>
      <DialogContent initialFocus={field}>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            start(async () => {
              await onRename(value.trim())
              setOpen(false)
            })
          }}
          className="contents"
        >
          <DialogHeader>
            <DialogTitle>Rename workspace</DialogTitle>
            <DialogDescription>The new name shows in the sidebar and in invites.</DialogDescription>
          </DialogHeader>
          <FormField id="ws-name" label="Name" required>
            <Input ref={field} id="ws-name" value={value} onChange={(e) => setValue(e.target.value)} autoComplete="organization" />
          </FormField>
          <DialogFooter showCloseButton>
            <Button type="submit" disabled={pending || !value.trim()}>{pending ? "Saving…" : "Save"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}`,
    },
    {
      type: "list",
      items: [
        "`DialogTitle` and `DialogDescription` are not just styled text: Base UI links them to the popup with `aria-labelledby` and `aria-describedby`, so a screen reader announces \"Rename workspace, dialog, The new name shows in the sidebar\" on open. Always render a title; make it `sr-only` if the design hides it.",
        "`initialFocus` accepts a ref, a boolean or a function. Here it lands in the name field, which is where a rename starts. Without it, focus goes to the first tabbable element, which would be the corner close button.",
        "`open` is controlled so the dialog closes only after the save resolves. An uncontrolled dialog with `DialogClose` on the submit button closes before the request finishes and loses the error.",
        "`showCloseButton` on `DialogFooter` renders a Cancel style Close button in the footer; `DialogContent` has the corner X by default. Keep at least one of them visible, since touch screen readers need an explicit close control.",
        "The form has `className=\"contents\"` so the dialog's grid gap still spaces the header, field and footer.",
      ],
    },

    { type: "h2", text: "Where initial focus should go", id: "initial-focus" },
    {
      type: "list",
      items: [
        "**A form:** the first field, as above.",
        "**A confirmation:** the safe action (Cancel), never the destructive one. `AlertDialog` below does this by DOM order.",
        "**Content to read** (a changelog, terms): the dialog element itself, so the screen reader starts at the title and reads down. Pass `initialFocus={false}` and Base UI focuses the popup, which has `tabIndex={-1}`.",
        "**Never** an element outside the dialog, and never nothing. If focus stays on the trigger behind the scrim, Tab goes to the page and the dialog is unreachable by keyboard.",
      ],
    },
    {
      type: "p",
      text: "On close, Base UI returns focus to the trigger by default. When the trigger is gone (a row's menu item in a list that re-rendered), pass `finalFocus` with a ref to something sensible, such as the list heading, so focus does not fall back to `body`.",
    },

    { type: "h2", text: "AlertDialog for destructive confirmations", id: "alert-dialog" },
    {
      type: "p",
      text: "`AlertDialog` is the same machinery with `role=\"alertdialog\"`, and Base UI removes the pointer dismissal: clicking the scrim does nothing, so an accidental click cannot be read as consent. It is always modal. Use it for anything irreversible and nothing else; a rename does not need an alert.",
    },
    {
      type: "code",
      lang: "tsx",
      code: `const [open, setOpen] = React.useState(false)
const [pending, start] = React.useTransition()

<AlertDialog open={open} onOpenChange={setOpen}>
  <AlertDialogTrigger render={<Button variant="outline" />}>Delete invoice</AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogTitle>Delete invoice {number}?</AlertDialogTitle>
    <AlertDialogDescription>
      This removes the invoice and its payment history. This cannot be undone.
    </AlertDialogDescription>
    <AlertDialogActions>
      <AlertDialogClose render={<Button variant="outline" />}>Cancel</AlertDialogClose>
      <Button
        variant="destructive"
        disabled={pending}
        onClick={() => start(async () => { await deleteInvoice(id); setOpen(false) })}
      >
        {pending ? "Deleting…" : "Delete invoice"}
      </Button>
    </AlertDialogActions>
  </AlertDialogContent>
</AlertDialog>`,
    },
    {
      type: "list",
      items: [
        "Cancel comes first in the DOM, so it is the first tabbable element and receives initial focus. Enter then cancels, which is the safe default; the user has to Tab or click to delete.",
        "Name the action in the button (\"Delete invoice\"), not \"OK\" or \"Confirm\". The title asks the question with the specific thing in it.",
        "Escape still closes, as it should. Do not disable it to force a choice.",
        "To close after an async delete, control `open` on `AlertDialog` as with `Dialog`; `AlertDialogClose` closes immediately, which is right for Cancel and wrong for the request.",
      ],
    },

    { type: "h2", text: "Sheet and Drawer: what they do and what they miss", id: "sheet-drawer" },
    {
      type: "p",
      text: "`Sheet` is a side panel written without a primitive: `open` and `onClose`, a `side`, a `title`, a scrim button that closes, an Escape listener, and an effect that focuses the panel on open and restores the previously focused element on close. `Drawer` is a `Sheet` from the bottom with a `trigger` slot. What is not there: a focus trap (Tab leaves the panel for the page behind it), scroll lock, and `inert` on the rest of the document, while `aria-modal` is set, which promises assistive technology something the DOM does not keep.",
    },
    {
      type: "p",
      text: "The better fix is to build the sheet on the same Base UI dialog primitive the `Dialog` uses, keeping the kit's look. It is about thirty lines and inherits every behaviour in the checklist:",
    },
    {
      type: "code",
      lang: "tsx",
      filename: "components/ui/sheet.tsx",
      code: `"use client"
import * as React from "react"
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"
import { XIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const SIDE = {
  right: "inset-y-0 right-0 w-full max-w-md border-l data-open:slide-in-from-right data-closed:slide-out-to-right",
  left: "inset-y-0 left-0 w-full max-w-md border-r data-open:slide-in-from-left data-closed:slide-out-to-left",
  top: "inset-x-0 top-0 max-h-[80vh] border-b data-open:slide-in-from-top data-closed:slide-out-to-top",
  bottom: "inset-x-0 bottom-0 max-h-[80vh] rounded-t-2xl border-t data-open:slide-in-from-bottom data-closed:slide-out-to-bottom",
}

type SheetProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  side?: keyof typeof SIDE
  title: string
  description?: string
  children: React.ReactNode
  className?: string
}

export function Sheet({ open, onOpenChange, side = "right", title, description, children, className }: SheetProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Backdrop className="fixed inset-0 z-50 bg-scrim duration-200 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0" />
        <DialogPrimitive.Popup
          data-slot="sheet"
          className={cn(
            "fixed z-50 flex flex-col border-border bg-surface text-fg shadow-overlay outline-none duration-300 ease-hairline data-open:animate-in data-closed:animate-out data-closed:duration-200",
            SIDE[side],
            className
          )}
        >
          <div className="flex h-12 shrink-0 items-center justify-between border-b border-border px-4">
            <DialogPrimitive.Title className="text-sm font-medium">{title}</DialogPrimitive.Title>
            <DialogPrimitive.Close render={<Button variant="ghost" size="icon-sm" aria-label="Close" />}>
              <XIcon />
            </DialogPrimitive.Close>
          </div>
          {description ? <DialogPrimitive.Description className="sr-only">{description}</DialogPrimitive.Description> : null}
          <div className="min-h-0 flex-1 overflow-auto overscroll-contain p-4">{children}</div>
        </DialogPrimitive.Popup>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}`,
    },
    {
      type: "list",
      items: [
        "The slide utilities come from `tw-animate-css`; `data-open` and `data-closed` are the states Base UI sets on the popup and backdrop, and it keeps the element mounted until the exit animation finishes.",
        "`overscroll-contain` on the scrolling body stops a scroll at the end of the panel from scrolling the page on trackpads and phones, which the scroll lock does not cover on its own.",
        "A bottom sheet on a phone should not be taller than `80vh`, so the scrim stays tappable above it. `Drawer` becomes `Sheet` with `side=\"bottom\"` and a trigger you render yourself.",
        "The `Dialog` in the kit already uses this primitive, so the two share focus management, nesting rules and the `modal` option.",
      ],
    },
    {
      type: "callout",
      tone: "note",
      text: "If you keep the shipped `Sheet`, at minimum add a Tab handler that wraps focus between the first and last tabbable elements, set `document.body.style.overflow = \"hidden\"` while open with cleanup, and apply the `inert` attribute to the app root's other children. That is roughly the same amount of code as the rebuild, with more to test.",
    },

    { type: "h2", text: "Scroll lock without layout shift", id: "scroll-lock" },
    {
      type: "p",
      text: "Setting `overflow: hidden` on the body removes the scrollbar and the page jumps by its width on Windows and Linux. Base UI's scroll lock compensates with padding, so `Dialog` and the rebuilt `Sheet` do not shift. If you ever lock scroll by hand, add `scrollbar-gutter: stable` to `html` so the gutter stays reserved, and on iOS Safari prefer `position: fixed` on the body with the scroll offset restored on close, because `overflow: hidden` on the body does not stop touch scrolling there.",
    },

    { type: "h2", text: "Forms inside dialogs", id: "forms" },
    {
      type: "list",
      items: [
        "Control `open` and close on success only, as in the rename example. Show request errors inside the dialog in a `role=\"alert\"` element; a toast behind a modal is unreadable.",
        "Dirty forms should not vanish on an outside click. Pass `disablePointerDismissal` to `Dialog` while the form has changes; Escape still works.",
        "Keep validation errors next to their fields with `FormField`, which renders them in a `role=\"alert\"` paragraph; the [onboarding wizard guide](/guides/react-onboarding-wizard) shows how to link them with `aria-describedby`.",
      ],
    },

    { type: "h2", text: "Animation and reduced motion", id: "animation" },
    {
      type: "p",
      text: "The kit's dialog fades and scales in over 200 milliseconds and out over 150, with a two pixel rise; the sheet slides. Keep exits shorter than entrances, and never longer than about 300 milliseconds, because the user has already decided to leave. The token stylesheet collapses every animation and transition to near zero under [prefers-reduced-motion](/glossary/prefers-reduced-motion), so the dialogs appear and disappear instantly for people who asked for that, with no extra code.",
    },
    {
      type: "p",
      text: "If something must run after the exit animation (unmounting a heavy editor, clearing form state), use Base UI's `onOpenChangeComplete` on the root rather than a timeout that guesses the duration.",
    },

    { type: "h2", text: "Stacking and nesting", id: "stacking" },
    {
      type: "list",
      items: [
        "A `Popover`, `Select` or `Combobox` inside a dialog works: Base UI portals the popup and treats it as part of the dialog's focus scope, so the trap does not fight the menu.",
        "A dialog opened from a dialog is supported, but it is a design smell. Prefer replacing the content of one dialog, or an `AlertDialog` for the one legitimate case: confirming before discarding.",
        "The toaster sits at `z-[60]`, above the dialogs at `z-50`, so a background job can report success while a modal is open.",
      ],
    },

    { type: "h2", text: "Test it in two minutes", id: "testing" },
    {
      type: "list",
      ordered: true,
      items: [
        "Open with the keyboard (Tab to the trigger, Enter). Focus should land where you intended.",
        "Press Tab repeatedly. Focus must cycle inside the dialog, including the corner close button, and never reach the page.",
        "Press Escape. The dialog closes and the trigger has focus again, with a visible [focus-visible](/glossary/focus-visible) ring.",
        "Open it and scroll with the wheel over the scrim. The page must not move. Check for a horizontal jump when it opens.",
        "Turn on a screen reader (VoiceOver with Safari is the quickest). Opening should announce the title, the word dialog, and the description.",
        "On a phone, open a bottom sheet, scroll its content to the end, and keep swiping. The page behind should stay put.",
      ],
    },

    { type: "h2", text: "Pitfalls", id: "pitfalls" },
    {
      type: "list",
      items: [
        "**`aria-modal` without a trap.** Screen readers hide the rest of the page while keyboard users can still Tab into it, which is the worst of both. Either implement all six behaviours or do not claim modality.",
        "**Auto focusing a destructive button.** A stray Enter deletes something. Cancel first, always.",
        "**Closing on outside click with a dirty form.** Work lost with one mis-click. Use `disablePointerDismissal` while dirty.",
        "**Rendering the dialog conditionally with `open && <Dialog>`.** The exit animation never runs and focus has nothing to return to. Keep it mounted and control `open`.",
        "**A modal for everything.** Confirmations, quick edits and focused tasks belong in a dialog. Long content and anything that needs the page context belongs on the page.",
      ],
    },

    { type: "h2", text: "Components used in this guide", id: "components" },
    {
      type: "p",
      text: "All of these are free and MIT licensed, and the rest of the [overlays category](/components/overlays) is built on the same primitive; the [ARIA glossary entry](/glossary/aria) explains the attributes they set. The forms these dialogs usually hold are built in the [settings page guide](/guides/saas-settings-page). If you want the whole product built, the [MiniDev studio](https://minidev.pro) builds on this kit.",
    },
    { type: "component", name: "dialog" },
    { type: "component", name: "alert-dialog" },
    { type: "component", name: "sheet" },
    { type: "component", name: "drawer" },
    {
      type: "code",
      lang: "bash",
      code: "npx shadcn@latest add https://ui.minidev.pro/r/<name>.json\n# or the package\nnpm i minidev-ui-kit",
    },
  ],
  faq: [
    {
      q: "What makes a modal accessible?",
      a: "A dialog role with a name from its title, focus moved inside on open and trapped there, Escape to close, focus returned to the trigger on close, page scroll locked, and the rest of the page inert. Base UI's dialog, which the kit's Dialog and AlertDialog wrap, provides all of them.",
    },
    {
      q: "Where should focus go when a modal opens?",
      a: "Into the first field for a form, onto Cancel for a confirmation, and onto the dialog itself for content meant to be read from the top. Never onto a destructive button and never left behind on the page.",
    },
    {
      q: "Is a drawer or side sheet a modal?",
      a: "If it has a scrim and expects the user to deal with it before returning to the page, yes, and it needs the same focus trap, scroll lock and Escape handling. The kit's shipped Sheet handles Escape and focus return but not the trap or the scroll lock; rebuilding it on the dialog primitive, as shown above, gives it everything.",
    },
  ],
}

export default guide
