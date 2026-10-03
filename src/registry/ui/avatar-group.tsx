"use client"
import * as React from "react"
import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar"
import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/ui/popover"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/registry/ui/tooltip"

type AvatarGroupPerson = {
  name: string
  /** Shown under the name in the tooltip and overflow list. */
  role?: string
  /** Image URL. Initials on a tinted background are used while it loads or if it fails. */
  src?: string
}

type Size = "sm" | "md" | "lg"

const SIZE: Record<Size, { avatar: string; overlap: string; text: string }> = {
  sm: { avatar: "size-6", overlap: "-ml-1", text: "text-[0.625rem]" },
  md: { avatar: "size-8", overlap: "-ml-1.5", text: "text-xs" },
  lg: { avatar: "size-10", overlap: "-ml-2", text: "text-sm" },
}

// Tints are mixed from semantic tokens so they follow the theme and stay opaque where avatars overlap.
const TINTS = [
  "bg-[color-mix(in_oklch,var(--accent)_20%,var(--surface))] text-[color-mix(in_oklch,var(--accent)_78%,var(--fg))]",
  "bg-[color-mix(in_oklch,var(--info)_20%,var(--surface))] text-[color-mix(in_oklch,var(--info)_78%,var(--fg))]",
  "bg-[color-mix(in_oklch,var(--success)_20%,var(--surface))] text-[color-mix(in_oklch,var(--success)_78%,var(--fg))]",
  "bg-[color-mix(in_oklch,var(--warning)_20%,var(--surface))] text-[color-mix(in_oklch,var(--warning)_62%,var(--fg))]",
  "bg-[color-mix(in_oklch,var(--danger)_18%,var(--surface))] text-[color-mix(in_oklch,var(--danger)_78%,var(--fg))]",
  "bg-[color-mix(in_oklch,var(--accent-2)_20%,var(--surface))] text-[color-mix(in_oklch,var(--accent-2)_74%,var(--fg))]",
  "bg-[color-mix(in_oklch,var(--chart-2)_22%,var(--surface))] text-[color-mix(in_oklch,var(--chart-2)_62%,var(--fg))]",
]

function tint(name: string) {
  let h = 0
  for (const c of name) h = (h * 31 + c.charCodeAt(0)) >>> 0
  return TINTS[h % TINTS.length]
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/)
  return ((parts[0]?.[0] ?? "") + (parts.length > 1 ? parts[parts.length - 1][0] : "")).toUpperCase()
}

const TEAM: AvatarGroupPerson[] = [
  { name: "Maya Chen", role: "Head of Finance" },
  { name: "Theo Okafor", role: "Engineering lead" },
  { name: "Priya Raman", role: "Product designer" },
  { name: "Lucas Moreau", role: "Revenue ops" },
  { name: "Sofia Alvarez", role: "Controller" },
  { name: "Jonah Weiss", role: "Platform engineer" },
  { name: "Amara Nwosu", role: "Customer success" },
  { name: "Kenji Sato", role: "Data analyst" },
  { name: "Elena Petrova", role: "Accounts payable" },
]

/**
 * Overlapping avatars for a team, each ringed in the surface colour so the
 * stack reads cleanly on cards. Hovering or focusing an avatar lifts it above
 * its neighbours without moving the layout and shows a tooltip with the name.
 * Past `max`, a "+N" chip opens a popover listing everyone else. Initials on
 * token-tinted backgrounds stand in for missing photos. Sizes sm, md and lg.
 */
type AvatarGroupProps = {
  people?: AvatarGroupPerson[]
  /** Avatars shown before the "+N" chip. If only one person would overflow, they are shown instead of "+1". */
  max?: number
  size?: Size
  /** Accessible name for the group, also the overflow popover title. */
  label?: string
  /** Show a "Maya, Theo and 7 others" line after the stack. */
  summary?: boolean
  className?: string
}

function AvatarGroup({ people = TEAM, max = 5, size = "md", label = "Northwind team", summary = true, className }: AvatarGroupProps) {
  const s = SIZE[size]
  const overflowing = people.length > max
  // Never hide a single person behind "+1": show them instead.
  const visible = overflowing && people.length - max > 1 ? people.slice(0, max) : people
  const rest = people.slice(visible.length)
  const first = people.slice(0, 2).map((p) => p.name.split(" ")[0])
  const line =
    people.length === 0
      ? "No one yet"
      : people.length === 1
        ? first[0]
        : people.length === 2
          ? `${first[0]} and ${first[1]}`
          : `${first[0]}, ${first[1]} and ${people.length - 2} other${people.length - 2 === 1 ? "" : "s"}`

  return (
    <TooltipProvider delay={120}>
      <div data-slot="avatar-group" className={cn("flex flex-wrap items-center gap-x-3 gap-y-2", className)}>
        <div role="group" aria-label={`${label}, ${people.length} ${people.length === 1 ? "person" : "people"}`} className="flex items-center ps-0.5">
          {visible.map((p, i) => (
            <Tooltip key={p.name + i}>
              <TooltipTrigger
                render={<span />}
                tabIndex={0}
                role="img"
                aria-label={p.role ? `${p.name}, ${p.role}` : p.name}
                className={cn(
                  "relative block rounded-full ring-2 ring-surface outline-none",
                  "transition-transform duration-[140ms] ease-spring",
                  "hover:z-10 hover:-translate-y-1 focus-visible:z-10 focus-visible:-translate-y-1",
                  "focus-visible:ring-accent",
                  i > 0 && s.overlap
                )}
              >
                <Face person={p} className={s.avatar} text={s.text} />
              </TooltipTrigger>
              <TooltipContent>
                <span className="flex flex-col">
                  <span>{p.name}</span>
                  {p.role ? <span className="font-normal text-on-ink/70">{p.role}</span> : null}
                </span>
              </TooltipContent>
            </Tooltip>
          ))}
          {rest.length ? (
            <Popover>
              <PopoverTrigger
                aria-label={`Show ${rest.length} more`}
                className={cn(
                  "relative grid shrink-0 cursor-pointer place-items-center rounded-full bg-sunken font-medium text-fg-muted tabular-nums ring-2 ring-surface outline-none",
                  "transition-[color,background-color] duration-[70ms] hover:bg-border hover:text-fg",
                  "focus-visible:ring-accent data-[popup-open]:bg-border data-[popup-open]:text-fg",
                  s.avatar,
                  s.text,
                  s.overlap
                )}
              >
                +{rest.length}
              </PopoverTrigger>
              <PopoverContent align="start" className="w-64 gap-2 p-2">
                <p className="px-2 pt-1 text-xs font-medium text-fg-muted">
                  {rest.length} more on {label}
                </p>
                <ul className="flex max-h-60 flex-col overflow-y-auto">
                  {rest.map((p, i) => (
                    <li key={p.name + i} className="flex items-center gap-2.5 rounded-lg px-2 py-1.5">
                      <Face person={p} className="size-7" text="text-[0.625rem]" />
                      <span className="flex min-w-0 flex-col">
                        <span className="truncate text-sm text-fg">{p.name}</span>
                        {p.role ? <span className="truncate text-xs text-fg-subtle">{p.role}</span> : null}
                      </span>
                    </li>
                  ))}
                </ul>
              </PopoverContent>
            </Popover>
          ) : null}
        </div>
        {summary ? <span className={cn("whitespace-nowrap text-fg-muted", size === "lg" ? "text-sm" : "text-xs")}>{line}</span> : null}
      </div>
    </TooltipProvider>
  )
}

function Face({ person, className, text }: { person: AvatarGroupPerson; className: string; text: string }) {
  return (
    <AvatarPrimitive.Root data-slot="avatar" className={cn("relative flex shrink-0 overflow-hidden rounded-full select-none", className)}>
      {person.src ? <AvatarPrimitive.Image src={person.src} alt="" className="size-full object-cover" /> : null}
      <AvatarPrimitive.Fallback className={cn("grid size-full place-items-center font-medium tracking-normal", text, tint(person.name))}>
        {initials(person.name)}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  )
}

export { AvatarGroup }
export type { AvatarGroupProps, AvatarGroupPerson }
