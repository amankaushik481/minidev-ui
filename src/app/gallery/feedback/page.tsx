"use client"
import { Spinner } from "@/registry/ui/spinner"
import { EmptyState } from "@/registry/ui/empty-state"
import { ErrorState } from "@/registry/ui/error-state"
import { Progress } from "@/registry/ui/progress"
import { Skeleton } from "@/registry/ui/skeleton"
import { GalleryPage, GallerySection } from "../_components/gallery-chrome"

export default function Page() {
  return (
    <GalleryPage title="Feedback & state">
      <GallerySection title="Spinner / progress"><Spinner /><div className="w-48"><Progress value={64} aria-label="Progress" /></div></GallerySection>
      <GallerySection title="Skeleton"><div className="w-64 space-y-2"><Skeleton className="h-4 w-40" /><Skeleton className="h-4 w-56" /><Skeleton className="h-24 w-full" /></div></GallerySection>
      <GallerySection title="Empty / error"><EmptyState className="max-w-sm" title="No projects" description="Create a project to begin." actionLabel="New project" /><ErrorState className="max-w-sm" onRetry={()=>{}} /></GallerySection>
    </GalleryPage>
  )
}
