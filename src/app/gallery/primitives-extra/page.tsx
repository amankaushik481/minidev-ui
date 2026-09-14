"use client"
import { Accordion, AccordionItem, AccordionTrigger, AccordionPanel } from "@/registry/ui/accordion"
import { Toggle } from "@/registry/ui/toggle"
import { ToggleGroup } from "@/registry/ui/toggle-group"
import { Kbd, KbdGroup } from "@/registry/ui/kbd"
import { BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react"
import { GalleryPage, GallerySection } from "../_components/gallery-chrome"

export default function Page() {
  return (
    <GalleryPage title="Accordion / toggle / kbd">
      <GallerySection title="Accordion">
        <Accordion className="max-w-lg">
          <AccordionItem value="a">
            <AccordionTrigger>What is MiniDev UI?</AccordionTrigger>
            <AccordionPanel>A Hairline shadcn registry for MiniDev products.</AccordionPanel>
          </AccordionItem>
          <AccordionItem value="b">
            <AccordionTrigger>Does it use Geist?</AccordionTrigger>
            <AccordionPanel>Yes — Geist Sans and Mono, self-hosted.</AccordionPanel>
          </AccordionItem>
        </Accordion>
      </GallerySection>
      <GallerySection title="Toggle">
        <Toggle aria-label="Bold"><BoldIcon className="size-4" /></Toggle>
        <ToggleGroup multiple>
          <Toggle value="bold" aria-label="Bold" size="sm"><BoldIcon className="size-4" /></Toggle>
          <Toggle value="italic" aria-label="Italic" size="sm"><ItalicIcon className="size-4" /></Toggle>
          <Toggle value="underline" aria-label="Underline" size="sm"><UnderlineIcon className="size-4" /></Toggle>
        </ToggleGroup>
      </GallerySection>
      <GallerySection title="Kbd">
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
      </GallerySection>
    </GalleryPage>
  )
}
