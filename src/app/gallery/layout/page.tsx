"use client"
import { AspectRatio } from "@/registry/ui/aspect-ratio"
import { Container } from "@/registry/ui/container"
import { Stack } from "@/registry/ui/stack"
import { Cluster } from "@/registry/ui/cluster"
import { Callout } from "@/registry/ui/callout"
import { Well } from "@/registry/ui/well"
import { Heading } from "@/registry/ui/heading"
import { Text } from "@/registry/ui/text"
import { Prose } from "@/registry/ui/prose"
import { SkipLink } from "@/registry/ui/skip-link"
import { GalleryPage, GallerySection } from "../_components/gallery-chrome"

export default function Page() {
  return (
    <GalleryPage title="Layout & typography">
      <SkipLink href="#main" />
      <GallerySection title="Type">
        <div id="main" className="space-y-2">
          <Heading as="h1">Heading one</Heading>
          <Heading as="h2">Heading two</Heading>
          <Text muted>Muted body copy for secondary information.</Text>
        </div>
      </GallerySection>
      <GallerySection title="Prose / callout / well">
        <Prose>
          <p>Prose styles for docs and long-form content with <a href="#">links</a>.</p>
        </Prose>
        <Callout title="Note" tone="info">Semantic callout using Hairline borders.</Callout>
        <Well>Sunken well for nested content.</Well>
      </GallerySection>
      <GallerySection title="Aspect / cluster">
        <AspectRatio ratio={16/9} className="rounded-xl border border-border bg-sunken" />
        <Cluster gap={2}>
          <span className="rounded-md border border-border px-2 py-1 text-xs">One</span>
          <span className="rounded-md border border-border px-2 py-1 text-xs">Two</span>
          <span className="rounded-md border border-border px-2 py-1 text-xs">Three</span>
        </Cluster>
        <Container size="sm" className="rounded-xl border border-dashed border-border py-4 text-center text-xs text-fg-muted">
          Container sm
        </Container>
        <Stack gap={2}>
          <div className="h-8 rounded-lg bg-sunken" />
          <div className="h-8 rounded-lg bg-sunken" />
        </Stack>
      </GallerySection>
    </GalleryPage>
  )
}
