"use client"
import * as React from "react"
import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox"
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * TimezoneSelect — a searchable IANA time zone picker that shows each zone's UTC offset and current local time.
 *
 * Use it in scheduling, settings and onboarding forms. Search by city ("new york"), zone id
 * ("america/"), offset ("+5:30", "-8") or abbreviation ("PST"). The user's own zone is pinned at
 * the top as Detected and is the default value. All data comes from the browser's `Intl` API, so
 * there is no time zone file to ship or update. Built on Base UI Combobox; for any other searchable
 * list use Combobox, and for languages use LanguagePicker.
 *
 * @example
 * const [tz, setTz] = React.useState("Europe/Berlin")
 * <FormField id="tz" label="Time zone">
 *   <TimezoneSelect id="tz" value={tz} onValueChange={setTz} />
 * </FormField>
 */

type TimezoneSelectProps = {
  /** Controlled IANA zone id, e.g. "America/New_York". */
  value?: string
  /** Starting zone when uncontrolled. Defaults to the browser's zone (`Intl.DateTimeFormat().resolvedOptions().timeZone`). */
  defaultValue?: string
  /** Fires with the picked IANA zone id. */
  onValueChange?: (timeZone: string) => void
  /** Zone ids to offer. Defaults to every zone the browser knows (`Intl.supportedValuesOf("timeZone")`). */
  zones?: string[]
  /** Show each zone's current local time in the list. */
  showCurrentTime?: boolean
  /** Group zones under their region (America, Europe...). When false, one list sorted by offset. */
  groupByRegion?: boolean
  /** Trigger text while nothing is selected. */
  placeholder?: string
  /** Disables the trigger. */
  disabled?: boolean
  /** Id for the trigger, so a `<label htmlFor>` or FormField can name it. */
  id?: string
  /** Submits the selected zone id under this name inside a `<form>`. */
  name?: string
  /** Requires a selection before the form submits. */
  required?: boolean
  /** Accessible name when there is no visible label. Defaults to "Time zone" when no `id` is passed. */
  "aria-label"?: string
  /** Classes for the trigger button (width defaults to w-72). */
  className?: string
}

type Zone = {
  value: string
  city: string
  region: string
  /** "UTC+05:30" */
  offset: string
  minutes: number
  /** Short names from Intl, e.g. "PST", only when they are letters. */
  abbr: string
  time: string
  search: string
}
type Group = { label: string; items: Zone[] }

const formatters = new Map<string, Intl.DateTimeFormat>()
const fmt = (timeZone: string, kind: "longOffset" | "short" | "time", locale?: string) => {
  const key = `${timeZone}|${kind}|${locale ?? ""}`
  let f = formatters.get(key)
  if (!f) {
    f = new Intl.DateTimeFormat(
      kind === "short" ? locale : kind === "time" ? undefined : "en-US",
      kind === "time" ? { timeZone, hour: "numeric", minute: "2-digit" } : { timeZone, timeZoneName: kind }
    )
    formatters.set(key, f)
  }
  return f
}
const zoneName = (timeZone: string, kind: "longOffset" | "short", now: number, locale?: string) =>
  fmt(timeZone, kind, locale)
    .formatToParts(now)
    .find((p) => p.type === "timeZoneName")?.value ?? ""

/** Builds one option. Unknown ids fall back to UTC+00:00 instead of throwing. */
function toZone(value: string, now: number, withTime: boolean): Zone {
  const parts = value.split("/")
  const city = parts[parts.length - 1].replace(/_/g, " ")
  const region = parts.length > 1 ? parts[0] : "Other"
  let gmt = "GMT"
  let abbr = ""
  let time = ""
  try {
    gmt = zoneName(value, "longOffset", now)
    // en-US knows US names (PST), the user's locale knows local ones (CET in de, IST in en-IN).
    abbr = [...new Set([zoneName(value, "short", now, "en-US"), zoneName(value, "short", now)])].filter((a) => /^[A-Z]{2,5}$/.test(a)).join(" ")
    if (withTime) time = fmt(value, "time").format(now)
  } catch {
    // An id this browser does not know: keep it selectable, offset unknown.
  }
  const m = /GMT([+-])(\d{2}):(\d{2})/.exec(gmt)
  const sign = m?.[1] ?? "+"
  const hh = m?.[2] ?? "00"
  const mm = m?.[3] ?? "00"
  const minutes = (sign === "-" ? -1 : 1) * (Number(hh) * 60 + Number(mm))
  const h = String(Number(hh))
  // Every way people type an offset: +05:30, +5:30, +0530, +5 (whole hours only).
  const offsets = [`${sign}${hh}:${mm}`, `${sign}${h}:${mm}`, `${sign}${hh}${mm}`, mm === "00" ? `${sign}${h}` : ""]
  const search = [value.replace(/_/g, " "), ...offsets.flatMap((o) => (o ? [`utc${o}`, `gmt${o}`] : [])), abbr].join(" ").toLowerCase()
  return { value, city, region, offset: `UTC${sign}${hh}:${mm}`, minutes, abbr, time, search }
}

const byOffset = (a: Zone, b: Zone) => a.minutes - b.minutes || a.city.localeCompare(b.city)

const noSubscribe = () => () => {}
const detectZone = () => Intl.DateTimeFormat().resolvedOptions().timeZone
const allZones = () => {
  const list = typeof Intl.supportedValuesOf === "function" ? Intl.supportedValuesOf("timeZone") : []
  return list.includes("UTC") ? list : [...list, "UTC"]
}

/** Matches "new york", "america/new", "+5:30", "utc-8", "pst". An offset without minutes matches the whole hour: "+5" finds +05:00, +05:30 and +05:45, not +10:00. */
const filterZone = (zone: Zone, query: string) => {
  const q = query.toLowerCase().replace(/_/g, " ").replace(/\s*([+-])\s*/g, "$1").trim().replace(/^(utc|gmt)(?=[+-])/, "")
  if (!q) return true
  if (!/^[+-]\d/.test(q)) return zone.search.includes(q)
  const want = `utc${q}`
  return zone.search.split(" ").some((t) => (q.includes(":") ? t.startsWith(want) : t === want || t.startsWith(`${want}:`)))
}

const toLabel = (z: Zone) => z.city
const toValue = (z: Zone) => z.value
const same = (a: Zone, b: Zone) => a.value === b.value

function TimezoneSelect({
  value,
  defaultValue,
  onValueChange,
  zones,
  showCurrentTime = true,
  groupByRegion = true,
  placeholder = "Select a time zone",
  disabled,
  id,
  name,
  required,
  "aria-label": ariaLabel,
  className,
}: TimezoneSelectProps) {
  // "UTC" on the server and during hydration, then the browser's zone: no mismatch, no effect.
  const detected = React.useSyncExternalStore(noSubscribe, detectZone, () => "UTC")
  const [inner, setInner] = React.useState(defaultValue)
  const current = value ?? inner ?? detected
  // Offsets and clock times are computed when the list opens, not on every render.
  const [openedAt, setOpenedAt] = React.useState<number | null>(null)
  const [stamp] = React.useState(() => Date.now())

  const groups = React.useMemo<Group[]>(() => {
    if (openedAt === null) return []
    const ids = zones ?? allZones()
    const list = (ids.includes(detected) ? ids : [...ids, detected]).filter((z) => z !== detected).map((z) => toZone(z, openedAt, showCurrentTime))
    const pinned: Group = { label: "Detected", items: [toZone(detected, openedAt, showCurrentTime)] }
    if (!groupByRegion) return [pinned, { label: "All time zones", items: list.sort(byOffset) }]
    const map = new Map<string, Zone[]>()
    for (const z of list) map.set(z.region, [...(map.get(z.region) ?? []), z])
    return [pinned, ...[...map].sort(([a], [b]) => a.localeCompare(b)).map(([label, items]) => ({ label, items: items.sort(byOffset) }))]
  }, [openedAt, zones, detected, groupByRegion, showCurrentTime])

  const selected = React.useMemo(() => (current ? toZone(current, openedAt ?? stamp, false) : null), [current, openedAt, stamp])

  return (
    <div data-slot="timezone-select">
      <ComboboxPrimitive.Root
        items={groups}
        filter={filterZone}
        value={selected}
        onValueChange={(next: Zone | null) => {
          if (!next) return
          if (value === undefined) setInner(next.value)
          onValueChange?.(next.value)
        }}
        onOpenChange={(open) => {
          if (open) setOpenedAt(Date.now())
        }}
        itemToStringLabel={toLabel}
        itemToStringValue={toValue}
        isItemEqualToValue={same}
        disabled={disabled}
        name={name}
        required={required}
      >
        <ComboboxPrimitive.Trigger
          id={id}
          aria-label={ariaLabel ?? (id ? undefined : "Time zone")}
          className={cn(
            "inline-flex h-9 w-72 items-center justify-between gap-2 rounded-lg border border-border bg-surface px-3 text-sm text-fg",
            "shadow-highlight outline-none transition-[border-color] duration-[70ms] ease-hairline",
            "hover:border-fg-subtle focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
            "data-disabled:cursor-not-allowed data-disabled:opacity-50",
            className
          )}
        >
          {selected ? (
            <span className="flex min-w-0 items-baseline gap-2">
              <span className="truncate">{selected.city}</span>
              <span className="shrink-0 font-mono text-xs tabular-nums text-fg-subtle">{selected.offset}</span>
            </span>
          ) : (
            <span className="truncate text-fg-subtle">{placeholder}</span>
          )}
          <ChevronsUpDownIcon aria-hidden className="size-4 shrink-0 text-fg-muted" />
        </ComboboxPrimitive.Trigger>
        <ComboboxPrimitive.Portal>
          <ComboboxPrimitive.Positioner align="start" sideOffset={6} className="isolate z-50 outline-none">
            <ComboboxPrimitive.Popup
              data-slot="timezone-select-content"
              aria-label={ariaLabel ?? "Time zone"}
              className={cn(
                "w-(--anchor-width) min-w-80 max-w-(--available-width) origin-(--transform-origin) rounded-xl border border-border bg-raised p-1 text-fg shadow-overlay outline-none",
                "duration-200 ease-hairline data-closed:duration-[160ms]",
                "data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95"
              )}
            >
              <ComboboxPrimitive.Input
                aria-label="Search time zones"
                placeholder="City, offset or abbreviation"
                className="mb-1 h-8 w-full rounded-md border border-border bg-surface px-2 text-sm text-fg outline-none placeholder:text-fg-subtle focus-visible:border-accent focus-visible:shadow-[0_0_0_3px_var(--accent-soft)]"
              />
              <ComboboxPrimitive.Empty className="px-2 py-2 text-xs text-fg-muted empty:hidden">No time zone matches</ComboboxPrimitive.Empty>
              <ComboboxPrimitive.List className="max-h-[min(18rem,var(--available-height))] overflow-auto overscroll-contain scroll-py-1">
                {(group: Group) => (
                  <ComboboxPrimitive.Group key={group.label} items={group.items} className="pb-1">
                    <ComboboxPrimitive.GroupLabel className="sticky top-0 z-10 bg-raised px-2.5 pt-2 pb-1 text-[11px] font-medium tracking-[0.02em] text-fg-subtle">
                      {group.label}
                    </ComboboxPrimitive.GroupLabel>
                    <ComboboxPrimitive.Collection>
                      {(zone: Zone) => (
                        <ComboboxPrimitive.Item
                          key={zone.value}
                          value={zone}
                          className={cn(
                            "flex w-full cursor-default items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-sm outline-none select-none",
                            "transition-[background-color] duration-[70ms] data-highlighted:bg-sunken"
                          )}
                        >
                          <span className="grid size-4 shrink-0 place-items-center">
                            <ComboboxPrimitive.ItemIndicator>
                              <CheckIcon aria-hidden className="size-4 text-accent-fg" />
                            </ComboboxPrimitive.ItemIndicator>
                          </span>
                          <span className="min-w-0 flex-1 truncate">
                            {zone.city}
                            {zone.abbr ? <span className="ml-1.5 text-xs text-fg-subtle">{zone.abbr}</span> : null}
                          </span>
                          <span className="shrink-0 font-mono text-xs tabular-nums text-fg-muted">{zone.offset}</span>
                          {showCurrentTime ? (
                            <span className="w-16 shrink-0 text-right font-mono text-xs tabular-nums text-fg-subtle">{zone.time}</span>
                          ) : null}
                        </ComboboxPrimitive.Item>
                      )}
                    </ComboboxPrimitive.Collection>
                  </ComboboxPrimitive.Group>
                )}
              </ComboboxPrimitive.List>
            </ComboboxPrimitive.Popup>
          </ComboboxPrimitive.Positioner>
        </ComboboxPrimitive.Portal>
      </ComboboxPrimitive.Root>
    </div>
  )
}

export { TimezoneSelect }
export type { TimezoneSelectProps }
