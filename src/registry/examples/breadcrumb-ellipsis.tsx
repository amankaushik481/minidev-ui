"use client"
import { ChevronRightIcon } from "lucide-react"
import { BreadcrumbEllipsis } from "@/registry/ui/breadcrumb-ellipsis"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/registry/ui/dropdown-menu"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Collapsed trail",
    description: "Breadcrumb takes string labels, so a collapsed trail is built by hand with the same nav and ordered list.",
    code: `<nav aria-label="Breadcrumb" className="text-sm">
  <ol className="flex flex-wrap items-center gap-1">
    <li><a href="#" className="text-fg-muted hover:text-fg">Drive</a></li>
    <li className="inline-flex items-center gap-1">
      <ChevronRightIcon aria-hidden className="size-3.5 text-fg-subtle" />
      <BreadcrumbEllipsis />
    </li>
    <li className="inline-flex items-center gap-1">
      <ChevronRightIcon aria-hidden className="size-3.5 text-fg-subtle" />
      <a href="#" className="text-fg-muted hover:text-fg">Q4</a>
    </li>
    <li className="inline-flex items-center gap-1">
      <ChevronRightIcon aria-hidden className="size-3.5 text-fg-subtle" />
      <span aria-current="page" className="font-medium text-fg">Board pack.pdf</span>
    </li>
  </ol>
</nav>`,
    node: (
      <nav aria-label="Breadcrumb" className="text-sm">
        <ol className="flex flex-wrap items-center gap-1">
          <li><a href="#" className="text-fg-muted hover:text-fg">Drive</a></li>
          <li className="inline-flex items-center gap-1">
            <ChevronRightIcon aria-hidden className="size-3.5 text-fg-subtle" />
            <BreadcrumbEllipsis />
          </li>
          <li className="inline-flex items-center gap-1">
            <ChevronRightIcon aria-hidden className="size-3.5 text-fg-subtle" />
            <a href="#" className="text-fg-muted hover:text-fg">Q4</a>
          </li>
          <li className="inline-flex items-center gap-1">
            <ChevronRightIcon aria-hidden className="size-3.5 text-fg-subtle" />
            <span aria-current="page" className="font-medium text-fg">Board pack.pdf</span>
          </li>
        </ol>
      </nav>
    ),
  },
  {
    title: "Menu of hidden levels",
    description: "Wrap the ellipsis in a labelled menu trigger so the skipped folders stay one click away.",
    code: `<nav aria-label="Breadcrumb" className="text-sm">
  <ol className="flex flex-wrap items-center gap-1">
    <li><a href="#" className="text-fg-muted hover:text-fg">Drive</a></li>
    <li className="inline-flex items-center gap-1">
      <ChevronRightIcon aria-hidden className="size-3.5 text-fg-subtle" />
      <DropdownMenu>
        <DropdownMenuTrigger aria-label="Show more pages" className="rounded-md outline-none hover:bg-sunken focus-visible:ring-2 focus-visible:ring-accent">
          <BreadcrumbEllipsis />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Finance</DropdownMenuItem>
          <DropdownMenuItem>Reporting</DropdownMenuItem>
          <DropdownMenuItem>2026</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </li>
    <li className="inline-flex items-center gap-1">
      <ChevronRightIcon aria-hidden className="size-3.5 text-fg-subtle" />
      <span aria-current="page" className="font-medium text-fg">Q4</span>
    </li>
  </ol>
</nav>`,
    node: (
      <nav aria-label="Breadcrumb" className="text-sm">
        <ol className="flex flex-wrap items-center gap-1">
          <li><a href="#" className="text-fg-muted hover:text-fg">Drive</a></li>
          <li className="inline-flex items-center gap-1">
            <ChevronRightIcon aria-hidden className="size-3.5 text-fg-subtle" />
            <DropdownMenu>
              <DropdownMenuTrigger aria-label="Show more pages" className="rounded-md outline-none hover:bg-sunken focus-visible:ring-2 focus-visible:ring-accent">
                <BreadcrumbEllipsis />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Finance</DropdownMenuItem>
                <DropdownMenuItem>Reporting</DropdownMenuItem>
                <DropdownMenuItem>2026</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
          <li className="inline-flex items-center gap-1">
            <ChevronRightIcon aria-hidden className="size-3.5 text-fg-subtle" />
            <span aria-current="page" className="font-medium text-fg">Q4</span>
          </li>
        </ol>
      </nav>
    ),
  },
]
