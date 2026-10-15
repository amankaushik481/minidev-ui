"use client"
import * as React from "react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/registry/ui/navigation-menu"
import type { Example } from "./types"

function ControlledNav() {
  const [open, setOpen] = React.useState<string | null>(null)
  return (
    <div className="flex flex-col items-center gap-3">
      <NavigationMenu value={open} onValueChange={(value) => setOpen(value as string | null)}>
        <NavigationMenuList>
          <NavigationMenuItem value="product">
            <NavigationMenuTrigger>Product</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid w-56 gap-1">
                <NavigationMenuLink href="#invoicing">Invoicing</NavigationMenuLink>
                <NavigationMenuLink href="#payments">Payments</NavigationMenuLink>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem value="company">
            <NavigationMenuTrigger>Company</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid w-56 gap-1">
                <NavigationMenuLink href="#about">About</NavigationMenuLink>
                <NavigationMenuLink href="#careers">Careers</NavigationMenuLink>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
        <NavigationMenuViewport />
      </NavigationMenu>
      <p className="text-xs text-fg-muted">{open ? `Open: ${open}` : "Nothing open"}</p>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Product menu",
    description: "Triggers open a shared viewport; links inside can carry a title and a line of description.",
    code: `<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Product</NavigationMenuTrigger>
      <NavigationMenuContent>
        <div className="grid w-72 gap-1">
          <NavigationMenuLink href="#invoicing">
            <span className="block font-medium text-fg">Invoicing</span>
            <span className="mt-0.5 block text-xs text-fg-muted">Send, track and reconcile in one place.</span>
          </NavigationMenuLink>
          <NavigationMenuLink href="#payments">
            <span className="block font-medium text-fg">Payments</span>
            <span className="mt-0.5 block text-xs text-fg-muted">Cards and bank transfer in 140 currencies.</span>
          </NavigationMenuLink>
          <NavigationMenuLink href="#reporting">
            <span className="block font-medium text-fg">Reporting</span>
            <span className="mt-0.5 block text-xs text-fg-muted">Revenue and cash flow without a spreadsheet.</span>
          </NavigationMenuLink>
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
      <NavigationMenuContent>
        <div className="grid w-56 gap-1">
          <NavigationMenuLink href="#docs">Documentation</NavigationMenuLink>
          <NavigationMenuLink href="#guides">Guides</NavigationMenuLink>
          <NavigationMenuLink href="#changelog">Changelog</NavigationMenuLink>
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
  <NavigationMenuViewport />
</NavigationMenu>`,
    node: (
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Product</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid w-72 gap-1">
                <NavigationMenuLink href="#invoicing">
                  <span className="block font-medium text-fg">Invoicing</span>
                  <span className="mt-0.5 block text-xs text-fg-muted">Send, track and reconcile in one place.</span>
                </NavigationMenuLink>
                <NavigationMenuLink href="#payments">
                  <span className="block font-medium text-fg">Payments</span>
                  <span className="mt-0.5 block text-xs text-fg-muted">Cards and bank transfer in 140 currencies.</span>
                </NavigationMenuLink>
                <NavigationMenuLink href="#reporting">
                  <span className="block font-medium text-fg">Reporting</span>
                  <span className="mt-0.5 block text-xs text-fg-muted">Revenue and cash flow without a spreadsheet.</span>
                </NavigationMenuLink>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid w-56 gap-1">
                <NavigationMenuLink href="#docs">Documentation</NavigationMenuLink>
                <NavigationMenuLink href="#guides">Guides</NavigationMenuLink>
                <NavigationMenuLink href="#changelog">Changelog</NavigationMenuLink>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
        <NavigationMenuViewport />
      </NavigationMenu>
    ),
  },
  {
    title: "Plain links beside menus",
    description: "An item can hold a link instead of a trigger; style it like the triggers so the row reads as one.",
    code: `<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Product</NavigationMenuTrigger>
      <NavigationMenuContent>
        <div className="grid w-56 gap-1">
          <NavigationMenuLink href="#invoicing">Invoicing</NavigationMenuLink>
          <NavigationMenuLink href="#payments">Payments</NavigationMenuLink>
          <NavigationMenuLink href="#reporting">Reporting</NavigationMenuLink>
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink href="#pricing" className="inline-flex h-9 items-center px-3 py-0 font-medium text-fg">Pricing</NavigationMenuLink>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink href="#changelog" className="inline-flex h-9 items-center px-3 py-0 font-medium text-fg">Changelog</NavigationMenuLink>
    </NavigationMenuItem>
  </NavigationMenuList>
  <NavigationMenuViewport />
</NavigationMenu>`,
    node: (
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Product</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid w-56 gap-1">
                <NavigationMenuLink href="#invoicing">Invoicing</NavigationMenuLink>
                <NavigationMenuLink href="#payments">Payments</NavigationMenuLink>
                <NavigationMenuLink href="#reporting">Reporting</NavigationMenuLink>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="#pricing" className="inline-flex h-9 items-center px-3 py-0 font-medium text-fg">Pricing</NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="#changelog" className="inline-flex h-9 items-center px-3 py-0 font-medium text-fg">Changelog</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
        <NavigationMenuViewport />
      </NavigationMenu>
    ),
  },
  {
    title: "Controlled open item",
    description: "Give each item a value and hold the open one in state to react to it elsewhere.",
    code: `function ControlledNav() {
  const [open, setOpen] = React.useState<string | null>(null)
  return (
    <div className="flex flex-col items-center gap-3">
      <NavigationMenu value={open} onValueChange={(value) => setOpen(value as string | null)}>
        <NavigationMenuList>
          <NavigationMenuItem value="product">
            <NavigationMenuTrigger>Product</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid w-56 gap-1">
                <NavigationMenuLink href="#invoicing">Invoicing</NavigationMenuLink>
                <NavigationMenuLink href="#payments">Payments</NavigationMenuLink>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem value="company">
            <NavigationMenuTrigger>Company</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid w-56 gap-1">
                <NavigationMenuLink href="#about">About</NavigationMenuLink>
                <NavigationMenuLink href="#careers">Careers</NavigationMenuLink>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
        <NavigationMenuViewport />
      </NavigationMenu>
      <p className="text-xs text-fg-muted">{open ? \`Open: \${open}\` : "Nothing open"}</p>
    </div>
  )
}`,
    node: <ControlledNav />,
  },
]
