"use client"
import * as React from "react"
import { Button } from "@/registry/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/registry/ui/dialog"
import { buttonVariants } from "@/registry/ui/button"
import { cn } from "@/lib/utils"
function ConfirmDestructive({ triggerLabel="Delete", title="Are you sure?", description="This action cannot be undone.", onConfirm }: { triggerLabel?: string; title?: string; description?: string; onConfirm?: () => void }) {
  return (
    <div data-slot="confirm-destructive">
      <Dialog>
      <DialogTrigger className={cn(buttonVariants({ variant: "destructive", size: "sm" }))}>{triggerLabel}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button variant="destructive" onClick={onConfirm}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </div>
  )
}
export { ConfirmDestructive }
