"use client"
import { BuildPipeline } from "@/registry/ui/build-pipeline"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Failed deploy",
    description: "A failed stage gets a red edge and an X; later stages stay pending. Each stage reads its status in words.",
    code: `<BuildPipeline
  label="Deploy #482 pipeline"
  stages={[
    { name: "Install", status: "success" },
    { name: "Typecheck", status: "success" },
    { name: "Test", status: "failed" },
    { name: "Deploy", status: "pending" },
  ]}
/>`,
    node: (
      <BuildPipeline
        label="Deploy #482 pipeline"
        stages={[
          { name: "Install", status: "success" },
          { name: "Typecheck", status: "success" },
          { name: "Test", status: "failed" },
          { name: "Deploy", status: "pending" },
        ]}
      />
    ),
  },
  {
    title: "Release in progress",
    description: "The running stage spins and gets aria-current=\"step\". Names are React keys, so keep them unique.",
    code: `<BuildPipeline
  label="Release v2.14.0"
  stages={[
    { name: "Build", status: "success" },
    { name: "Test (unit)", status: "success" },
    { name: "Test (e2e)", status: "success" },
    { name: "Migrate", status: "running" },
    { name: "Promote to prod", status: "pending" },
  ]}
/>`,
    node: (
      <BuildPipeline
        label="Release v2.14.0"
        stages={[
          { name: "Build", status: "success" },
          { name: "Test (unit)", status: "success" },
          { name: "Test (e2e)", status: "success" },
          { name: "Migrate", status: "running" },
          { name: "Promote to prod", status: "pending" },
        ]}
      />
    ),
  },
]
