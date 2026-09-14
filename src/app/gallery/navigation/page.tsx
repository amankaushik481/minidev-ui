"use client"
import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem } from "@/registry/ui/menubar"
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink, NavigationMenuViewport } from "@/registry/ui/navigation-menu"
import { Carousel } from "@/registry/ui/carousel"
import { Card, CardHeader, CardTitle, CardContent } from "@/registry/ui/card"
import { ResizablePanels } from "@/registry/ui/resizable-panels"
import { GalleryPage, GallerySection } from "../_components/gallery-chrome"

export default function Page() {
  return (
    <GalleryPage title="Navigation & layout chrome">
      <GallerySection title="Menubar">
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>File</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>New…</MenubarItem>
              <MenubarItem>Open…</MenubarItem>
              <MenubarItem>Save</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Edit</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>Undo</MenubarItem>
              <MenubarItem>Redo</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </GallerySection>
      <GallerySection title="Navigation menu">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Product</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-80 gap-1 p-2">
                  <NavigationMenuLink href="#">AI chat</NavigationMenuLink>
                  <NavigationMenuLink href="#">Billing</NavigationMenuLink>
                  <NavigationMenuLink href="#">Admin</NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-64 gap-1 p-2">
                  <NavigationMenuLink href="#">Docs</NavigationMenuLink>
                  <NavigationMenuLink href="#">Gallery</NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
          <NavigationMenuViewport />
        </NavigationMenu>
      </GallerySection>
      <GallerySection title="Carousel">
        <div className="w-full max-w-3xl">
          <Carousel>
            {[1,2,3,4].map((n) => (
              <Card key={n}><CardHeader><CardTitle>Slide {n}</CardTitle></CardHeader><CardContent className="text-sm text-fg-muted">Carousel card content.</CardContent></Card>
            ))}
          </Carousel>
        </div>
      </GallerySection>
      <GallerySection title="Resizable">
        <div className="w-full max-w-3xl">
          <ResizablePanels left={<p className="text-sm text-fg-muted">Left pane</p>} right={<p className="text-sm text-fg-muted">Right pane</p>} />
        </div>
      </GallerySection>
    </GalleryPage>
  )
}
