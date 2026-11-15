"use client"
import { AnchorIcon, FeatherIcon, HexagonIcon, OrbitIcon, WavesIcon, ApertureIcon } from "lucide-react"
import { LogoWallMotion } from "@/registry/premium/logo-wall-motion"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Names under a hero",
    description: "Plain strings are the simplest input and stay readable for screen readers and search.",
    code: `<LogoWallMotion
  title="Used by finance teams at"
  logos={["Northwind", "Halcyon", "Fathom", "Meridian", "Quill", "Tessel", "Kestrel"]}
/>`,
    node: (
      <LogoWallMotion
        title="Used by finance teams at"
        logos={["Northwind", "Halcyon", "Fathom", "Meridian", "Quill", "Tessel", "Kestrel"]}
      />
    ),
  },
  {
    title: "Mark and name",
    description: "logos takes any node, so a small icon can sit before each name; the icon is aria-hidden and the name is the label.",
    code: `<LogoWallMotion
  title="Trusted by product teams"
  logos={[
    <span key="northwind" className="flex items-center gap-2"><HexagonIcon aria-hidden className="size-4" />Northwind</span>,
    <span key="halcyon" className="flex items-center gap-2"><WavesIcon aria-hidden className="size-4" />Halcyon</span>,
    <span key="fathom" className="flex items-center gap-2"><AnchorIcon aria-hidden className="size-4" />Fathom</span>,
    <span key="meridian" className="flex items-center gap-2"><OrbitIcon aria-hidden className="size-4" />Meridian</span>,
    <span key="quill" className="flex items-center gap-2"><FeatherIcon aria-hidden className="size-4" />Quill</span>,
    <span key="tessel" className="flex items-center gap-2"><ApertureIcon aria-hidden className="size-4" />Tessel</span>,
  ]}
/>`,
    node: (
      <LogoWallMotion
        title="Trusted by product teams"
        logos={[
          <span key="northwind" className="flex items-center gap-2"><HexagonIcon aria-hidden className="size-4" />Northwind</span>,
          <span key="halcyon" className="flex items-center gap-2"><WavesIcon aria-hidden className="size-4" />Halcyon</span>,
          <span key="fathom" className="flex items-center gap-2"><AnchorIcon aria-hidden className="size-4" />Fathom</span>,
          <span key="meridian" className="flex items-center gap-2"><OrbitIcon aria-hidden className="size-4" />Meridian</span>,
          <span key="quill" className="flex items-center gap-2"><FeatherIcon aria-hidden className="size-4" />Quill</span>,
          <span key="tessel" className="flex items-center gap-2"><ApertureIcon aria-hidden className="size-4" />Tessel</span>,
        ]}
      />
    ),
  },
  {
    title: "Two rows, opposite directions",
    description: "Set reverse on the second strip and hide its label with an empty title; a different duration keeps the rows out of step.",
    code: `<div className="w-full space-y-3">
  <LogoWallMotion title="Customers" logos={["Northwind", "Halcyon", "Fathom", "Meridian", "Quill", "Tessel"]} />
  <LogoWallMotion title="" reverse duration={36} logos={["Kestrel", "Foxglove", "Vantage", "Parallel", "Oakridge", "Umbra"]} />
</div>`,
    node: (
      <div className="w-full space-y-3">
        <LogoWallMotion title="Customers" logos={["Northwind", "Halcyon", "Fathom", "Meridian", "Quill", "Tessel"]} />
        <LogoWallMotion title="" reverse duration={36} logos={["Kestrel", "Foxglove", "Vantage", "Parallel", "Oakridge", "Umbra"]} />
      </div>
    ),
  },
]
