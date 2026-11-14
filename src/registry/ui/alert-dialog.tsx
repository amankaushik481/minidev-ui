"use client"
import * as React from "react"
import { AlertDialog as AD } from "@base-ui/react/alert-dialog"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"

/**
 * A modal confirmation for destructive or irreversible actions; renders a demo trigger and content when given no children.
 *
 * Use when the user must confirm before something cannot be undone (delete, revoke, cancel plan).
 * Unlike `Dialog`, it cannot be dismissed by clicking outside, and screen readers announce it as an
 * alert dialog. Focus is trapped inside and returns to the trigger on close; Escape cancels.
 * Always give it an `AlertDialogTitle` and `AlertDialogDescription`.
 *
 * @example
 * <AlertDialog>
 *   <AlertDialogTrigger render={<Button variant="outline" />}>Delete invoice</AlertDialogTrigger>
 *   <AlertDialogContent>
 *     <AlertDialogTitle>Delete invoice INV-2041?</AlertDialogTitle>
 *     <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
 *     <AlertDialogActions>
 *       <AlertDialogClose render={<Button variant="outline" />}>Cancel</AlertDialogClose>
 *       <AlertDialogClose render={<Button variant="destructive" />} onClick={remove}>Delete</AlertDialogClose>
 *     </AlertDialogActions>
 *   </AlertDialogContent>
 * </AlertDialog>
 *
 * Key props (on `AlertDialog`): `open` / `defaultOpen`, `onOpenChange(open)`.
 */
type AlertDialogProps = React.ComponentProps<typeof AD.Root>

function AlertDialog({ children, ...props }: AlertDialogProps) {
  return (
    <AD.Root data-slot="alert-dialog" {...props}>
      {children ?? <AlertDialogDemo />}
    </AD.Root>
  )
}
/** Opens the dialog. Use `render={<Button />}` to style it as a button. */
function AlertDialogTrigger(props: React.ComponentProps<typeof AD.Trigger>) {
  return <AD.Trigger data-slot="alert-dialog-trigger" {...props} />
}
/** Closes the dialog. Use it for both the cancel and the confirm action. */
function AlertDialogClose(props: React.ComponentProps<typeof AD.Close>) {
  return <AD.Close data-slot="alert-dialog-close" {...props} />
}
/** The centred panel, portalled over a scrim. Fades and settles in; exits faster. */
function AlertDialogContent({ className, children, ...props }: React.ComponentProps<typeof AD.Popup>) {
  return (
    <AD.Portal>
      <AD.Backdrop
        data-slot="alert-dialog-overlay"
        className={cn(
          "fixed inset-0 z-50 bg-scrim transition-opacity duration-200 ease-hairline",
          "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0 data-[ending-style]:duration-[160ms] data-[ending-style]:ease-exit"
        )}
      />
      <AD.Popup
        data-slot="alert-dialog-content"
        className={cn(
          "fixed top-1/2 left-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2",
          "rounded-2xl border border-border bg-raised p-5 text-sm text-fg shadow-overlay outline-none",
          "transition-[opacity,scale] duration-200 ease-hairline",
          "data-[starting-style]:scale-[0.97] data-[starting-style]:opacity-0",
          "data-[ending-style]:scale-[0.98] data-[ending-style]:opacity-0 data-[ending-style]:duration-[160ms] data-[ending-style]:ease-exit",
          className
        )}
        {...props}
      >
        {children}
      </AD.Popup>
    </AD.Portal>
  )
}
/** The dialog's accessible name. Phrase it as the question being confirmed. */
function AlertDialogTitle({ className, ...props }: React.ComponentProps<typeof AD.Title>) {
  return <AD.Title data-slot="alert-dialog-title" className={cn("text-base font-medium text-fg", className)} {...props} />
}
/** The consequence, read by screen readers when the dialog opens. */
function AlertDialogDescription({ className, ...props }: React.ComponentProps<typeof AD.Description>) {
  return <AD.Description data-slot="alert-dialog-description" className={cn("mt-2 text-sm text-fg-muted", className)} {...props} />
}
/** Right-aligned button row; stacks full width on narrow screens. Put the safe action first. */
function AlertDialogActions({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="alert-dialog-actions" className={cn("mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)} {...props} />
}

/** Default trigger and content shown when `AlertDialog` is rendered without children. */
function AlertDialogDemo() {
  return (
    <>
      <AlertDialogTrigger render={<Button variant="outline" />}>Delete invoice</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>Delete invoice INV-2041?</AlertDialogTitle>
        <AlertDialogDescription>
          This removes the $12,400 invoice for Northwind and its payment history from Lumen. This cannot be undone.
        </AlertDialogDescription>
        <AlertDialogActions>
          <AlertDialogClose render={<Button variant="outline" />}>Cancel</AlertDialogClose>
          <AlertDialogClose render={<Button variant="destructive" />}>Delete invoice</AlertDialogClose>
        </AlertDialogActions>
      </AlertDialogContent>
    </>
  )
}
export { AlertDialog, AlertDialogTrigger, AlertDialogClose, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogActions }
export type { AlertDialogProps }
