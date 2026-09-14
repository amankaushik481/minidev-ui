"use client"
import { PageHeader } from "@/registry/ui/page-header"
import { DescriptionList } from "@/registry/ui/description-list"
import { BackLink } from "@/registry/ui/back-link"
function ProjectDetail() {
  return (
    <div data-slot="project-detail" className="space-y-4">
      <BackLink href="#">Projects</BackLink>
      <PageHeader title="MiniDev UI" description="Component library" />
      <DescriptionList
        items={[
          { label: "Owner", value: "Aman" },
          { label: "Stack", value: "Next.js + Tailwind" },
          { label: "License", value: "MIT" },
          { label: "Registry", value: "minidev.pro" },
        ]}
      />
    </div>
  )
}
export { ProjectDetail }
