"use client"
import * as React from "react"
import { Avatar, AvatarFallback } from "@/registry/ui/avatar"
import { PresenceDot } from "@/registry/ui/presence-dot"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "On avatars",
    description: "Avatar is relative, so the dot sits in its corner; the ring separates it from the picture.",
    code: `<div className="flex items-center gap-4">
  <Avatar size="lg">
    <AvatarFallback>MC</AvatarFallback>
    <PresenceDot status="online" label="Maya Chen is online" className="absolute right-0 bottom-0 ring-2 ring-bg" />
  </Avatar>
  <Avatar size="lg">
    <AvatarFallback>PR</AvatarFallback>
    <PresenceDot status="away" label="Priya Raman is away" className="absolute right-0 bottom-0 ring-2 ring-bg" />
  </Avatar>
  <Avatar size="lg">
    <AvatarFallback>DO</AvatarFallback>
    <PresenceDot status="offline" label="Dan Okafor is offline" className="absolute right-0 bottom-0 ring-2 ring-bg" />
  </Avatar>
</div>`,
    node: (
      <div className="flex items-center gap-4">
        <Avatar size="lg">
          <AvatarFallback>MC</AvatarFallback>
          <PresenceDot status="online" label="Maya Chen is online" className="absolute right-0 bottom-0 ring-2 ring-bg" />
        </Avatar>
        <Avatar size="lg">
          <AvatarFallback>PR</AvatarFallback>
          <PresenceDot status="away" label="Priya Raman is away" className="absolute right-0 bottom-0 ring-2 ring-bg" />
        </Avatar>
        <Avatar size="lg">
          <AvatarFallback>DO</AvatarFallback>
          <PresenceDot status="offline" label="Dan Okafor is offline" className="absolute right-0 bottom-0 ring-2 ring-bg" />
        </Avatar>
      </div>
    ),
  },
  {
    title: "Member list",
    description: "Each dot is announced, so its label adds what the visible text does not say.",
    code: `<ul className="w-full max-w-xs space-y-2 text-sm">
  <li className="flex items-center gap-2 text-fg"><PresenceDot status="online" /> Maya Chen</li>
  <li className="flex items-center gap-2 text-fg"><PresenceDot status="busy" label="In a meeting until 3 pm" /> Priya Raman</li>
  <li className="flex items-center gap-2 text-fg-muted"><PresenceDot status="offline" /> Dan Okafor</li>
</ul>`,
    node: (
      <ul className="w-full max-w-xs space-y-2 text-sm">
        <li className="flex items-center gap-2 text-fg"><PresenceDot status="online" /> Maya Chen</li>
        <li className="flex items-center gap-2 text-fg"><PresenceDot status="busy" label="In a meeting until 3 pm" /> Priya Raman</li>
        <li className="flex items-center gap-2 text-fg-muted"><PresenceDot status="offline" /> Dan Okafor</li>
      </ul>
    ),
  },
]
