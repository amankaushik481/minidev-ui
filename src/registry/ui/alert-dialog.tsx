"use client"
import * as React from "react"
import { AlertDialog as AD } from "@base-ui/react/alert-dialog"
import { cn } from "@/lib/utils"

function AlertDialog(props: React.ComponentProps<typeof AD.Root>) {
  return <AD.Root data-slot="alert-dialog" {...props} />
}
function AlertDialogTrigger(props: React.ComponentProps<typeof AD.Trigger>) {
  return <AD.Trigger data-slot="alert-dialog-trigger" {...props} />
}
function AlertDialogContent({ className, children, ...props }: React.ComponentProps<typeof AD.Popup>) {
  return (
    <AD.Portal>
      <AD.Backdrop className="fixed inset-0 z-50 bg-fg/40" />
      <AD.Popup
        data-slot="alert-dialog-content"
        className={cn(
          "fixed top-1/2 left-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2",
          "rounded-xl border border-border bg-raised p-5 shadow-[0_8px_24px_oklch(0.35_0.02_250/0.16)] outline-none",
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
export { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogActions }
