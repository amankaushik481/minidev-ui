"use client"
import * as React from "react"
import { Button, buttonVariants } from "@/registry/ui/button"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/registry/ui/dialog"
import { Toast, ToastStack } from "@/registry/ui/toast"
import { Banner } from "@/registry/ui/banner"
import { InlineAlert } from "@/registry/ui/inline-alert"
import { GalleryPage, GallerySection } from "../_components/gallery-chrome"

export default function Page() {
  return (
    <GalleryPage title="Overlays & alerts">
      <GallerySection title="Banner"><Banner className="w-full max-w-xl" action={<Button size="sm" variant="outline">Upgrade</Button>}>Your trial ends in 5 days.</Banner></GallerySection>
      <GallerySection title="Inline alert"><InlineAlert className="max-w-md" tone="warning" title="Action needed">Add a payment method to keep access.</InlineAlert></GallerySection>
      <GallerySection title="Toasts"><ToastStack><Toast title="Saved" description="Changes are live." tone="success" /><Toast title="Failed" description="Network error." tone="danger" /></ToastStack></GallerySection>
      <GallerySection title="Dialog">
        <Dialog>
          <DialogTrigger className={cn(buttonVariants())}>Open dialog</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm delete</DialogTitle>
              <DialogDescription>This cannot be undone.</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button variant="destructive">Delete</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </GallerySection>
    </GalleryPage>
  )
}
