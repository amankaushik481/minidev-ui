"use client"

import { buttonVariants } from "@/registry/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/registry/ui/dropdown-menu"
import { SplitButton } from "@/registry/ui/split-button"
import { cn } from "@/lib/utils"
import { GalleryPage, GallerySection } from "../_components/gallery-chrome"

export default function DropdownMenuGallery() {
  return (
    <GalleryPage title="Dropdown menu">
      <GallerySection title="Aligned to trigger">
        <DropdownMenu>
          <DropdownMenuTrigger className={cn(buttonVariants({ variant: "outline" }))}>
            Open menu
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="min-w-52">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Account</DropdownMenuLabel>
              <DropdownMenuItem>
                Profile
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger className={cn(buttonVariants({ variant: "outline" }))}>
            Align end
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-52">
            <DropdownMenuItem>Duplicate</DropdownMenuItem>
            <DropdownMenuItem>Archive</DropdownMenuItem>
            <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </GallerySection>
      <GallerySection title="Split button (menu matches full control width)">
        <SplitButton
          label="Save"
          items={[
            { label: "Save draft" },
            { label: "Save and close" },
            { label: "Discard", destructive: true },
          ]}
        />
      </GallerySection>
    </GalleryPage>
  )
}
