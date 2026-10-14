"use client"
import * as React from "react"
import { AlertDialog as AD } from "@base-ui/react/alert-dialog"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"

type AlertDialogProps = React.ComponentProps<typeof AD.Root>

/** A modal confirmation for destructive or irreversible actions; renders a demo trigger and content when given no children. */
function AlertDialog({ children, ...props }: AlertDialogProps) {
  return (
    <AD.Root data-slot="alert-dialog" {...props}>
      {children ?? <AlertDialogDemo />}
    </AD.Root>
  )
}
function AlertDialogTrigger(props: React.ComponentProps<typeof AD.Trigger>) {
  return <AD.Trigger data-slot="alert-dialog-trigger" {...props} />
}
function AlertDialogClose(props: React.ComponentProps<typeof AD.Close>) {
  return <AD.Close data-slot="alert-dialog-close" {...props} />
}
function AlertDialogContent({ className, children, ...props }: React.ComponentProps<typeof AD.Popup>) {
  return (
    <AD.Portal>
      <AD.Backdrop className="fixed inset-0 z-50 bg-fg/40" />
      <AD.Popup
        data-slot="alert-dialog-content"
        className={cn(
          "fixed top-1/2 left-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2",
          "rounded-xl border border-border bg-raised p-5 shadow-lg outline-none",
          className
        )}
        {...props}
      >
        {children}
      </AD.Popup>
    </AD.Portal>
  )
}
function AlertDialogTitle({ className, ...props }: React.ComponentProps<typeof AD.Title>) {
  return <AD.Title className={cn("text-base font-medium text-fg", className)} {...props} />
}
function AlertDialogDescription({ className, ...props }: React.ComponentProps<typeof AD.Description>) {
  return <AD.Description className={cn("mt-2 text-sm text-fg-muted", className)} {...props} />
}
function AlertDialogActions({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("mt-5 flex justify-end gap-2", className)} {...props} />
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
