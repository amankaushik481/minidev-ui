"use client"
import * as React from "react"
import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox"
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * CountrySelect — a searchable country picker whose names come from the browser in any language, with emoji flags and no data files.
 *
 * Use it for billing, shipping and sign-up forms. The value is an ISO 3166-1 alpha-2 code ("US", "DE").
 * Search matches the start of any word in the localised or English name, or the exact two-letter code, ignoring accents.
 * Pin the countries most of your users pick with `priority`. Built on Base UI Combobox, styled like
 * Combobox; use Combobox for any other long list and PhoneInput for phone numbers. The `countries(locale)`
 * helper returns the same sorted list for your own fields, such as the country column in TaxFields.
 *
 * @example
 * const [country, setCountry] = React.useState("US")
 * <FormField id="country" label="Country">
 *   <CountrySelect id="country" name="country" value={country} onValueChange={setCountry} priority={["US", "GB", "CA"]} />
 * </FormField>
 */

// ISO 3166-1 alpha-2, all 249 assigned codes. Names come from Intl.DisplayNames, so no other data ships.
const CODES =
  "AD AE AF AG AI AL AM AO AQ AR AS AT AU AW AX AZ BA BB BD BE BF BG BH BI BJ BL BM BN BO BQ BR BS BT BV BW BY BZ CA CC CD CF CG CH CI CK CL CM CN CO CR CU CV CW CX CY CZ DE DJ DK DM DO DZ EC EE EG EH ER ES ET FI FJ FK FM FO FR GA GB GD GE GF GG GH GI GL GM GN GP GQ GR GS GT GU GW GY HK HM HN HR HT HU ID IE IL IM IN IO IQ IR IS IT JE JM JO JP KE KG KH KI KM KN KP KR KW KY KZ LA LB LC LI LK LR LS LT LU LV LY MA MC MD ME MF MG MH MK ML MM MN MO MP MQ MR MS MT MU MV MW MX MY MZ NA NC NE NF NG NI NL NO NP NR NU NZ OM PA PE PF PG PH PK PL PM PN PR PS PT PW PY QA RE RO RS RU RW SA SB SC SD SE SG SH SI SJ SK SL SM SN SO SR SS ST SV SX SY SZ TC TD TF TG TH TJ TK TL TM TN TO TR TT TV TW TZ UA UG UM US UY UZ VA VC VE VG VI VN VU WF WS YE YT ZA ZM ZW".split(" ")

type Country = {
  /** ISO 3166-1 alpha-2 code, upper case. */
  code: string
  /** Name in the requested locale. */
  name: string
  /** Flag emoji built from the code's regional indicator letters. */
  flag: string
}

/** Flag emoji for an alpha-2 code: each letter maps to its regional indicator symbol. */
const flagOf = (code: string) => String.fromCodePoint(...[...code].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65))

function namer(locale: string) {
  try {
    return new Intl.DisplayNames([locale], { type: "region" })
  } catch {
    return new Intl.DisplayNames(["en"], { type: "region" })
  }
}

/** Every country as `{ code, name, flag }`, named in `locale` and sorted the way that language sorts. */
function countries(locale = "en"): Country[] {
  const names = namer(locale)
  const collator = new Intl.Collator(locale)
  return CODES.map((code) => ({ code, name: names.of(code) ?? code, flag: flagOf(code) })).sort((a, b) =>
    collator.compare(a.name, b.name)
  )
}

type Item = { value: string; label: string; english: string; flag: string }
type Group = { value: string; label: string; items: Item[] }

// Folds case, accents and punctuation, so "cote d iv" finds "Côte d’Ivoire" and "turkiye" finds "Türkiye".
const fold = (s: string) => " " + s.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").trim()

// Matches at the start of a word, so "ger" finds Germany but not Algeria or Niger.
const matches = (item: Item, query: string) => {
  const q = fold(query)
  if (q === " ") return true
  return fold(item.label).includes(q) || fold(item.english).includes(q) || item.value.toLowerCase() === q.trim()
}

const toLabel = (i: Item) => i.label
const toValue = (i: Item) => i.value
const same = (a: Item, b: Item) => a.value === b.value

type CountrySelectProps = {
  /** Controlled selection, an ISO 3166-1 alpha-2 code such as "US". Leave undefined for an uncontrolled select. */
  value?: string
  /** Initial code for the uncontrolled select. */
  defaultValue?: string
  /** Called with the picked country's upper-case code. */
  onValueChange?: (code: string) => void
  /** BCP 47 locale for the country names and their sort order, for example "de" or "ja". */
  locale?: string
  /** Codes pinned in a "Suggested" group above the rest, in this order. They are not repeated below. */
  priority?: string[]
  /** Codes to leave out, for example countries you do not ship to. */
  exclude?: string[]
  /** Show the emoji flag before each name. */
  showFlag?: boolean
  /** Trigger text while nothing is selected. */
  placeholder?: string
  /** Placeholder of the search field inside the popup. */
  searchPlaceholder?: string
  /** Shown when the search matches nothing. */
  emptyText?: string
  /** Heading of the `priority` group. */
  priorityLabel?: string
  disabled?: boolean
  /** Id for the trigger, so a `<label htmlFor>` or FormField can name it. */
  id?: string
  /** Submits the selected code under this name inside a `<form>`. */
  name?: string
  /** Requires a selection before the form submits. */
  required?: boolean
  /** Accessible name when there is no visible label. */
  "aria-label"?: string
  /** Classes for the trigger button (width defaults to w-64). */
  className?: string
}

function CountrySelect({
  value,
  defaultValue,
  onValueChange,
  locale = "en",
  priority = [],
  exclude = [],
  showFlag = true,
  placeholder = "Select country",
  searchPlaceholder = "Search countries…",
  emptyText = "No country found",
  priorityLabel = "Suggested",
  disabled,
  id,
  name,
  required,
  "aria-label": ariaLabel,
  className,
}: CountrySelectProps) {
  const [inner, setInner] = React.useState(defaultValue?.toUpperCase())
  const current = (value ?? inner)?.toUpperCase()
  const priorityKey = priority.join(",").toUpperCase()
  const excludeKey = exclude.join(",").toUpperCase()

  const groups = React.useMemo<Group[]>(() => {
    const english = namer("en")
    const skip = new Set(excludeKey.split(","))
    const all = countries(locale)
      .filter((c) => !skip.has(c.code))
      .map((c) => ({ value: c.code, label: c.name, english: english.of(c.code) ?? c.code, flag: c.flag }))
    const pinned = priorityKey
      .split(",")
      .map((code) => all.find((c) => c.value === code))
      .filter((c): c is Item => Boolean(c))
    const rest = all.filter((c) => !pinned.includes(c))
    return pinned.length
      ? [{ value: "priority", label: priorityLabel, items: pinned }, { value: "all", label: "All countries", items: rest }]
      : [{ value: "all", label: "All countries", items: rest }]
  }, [locale, priorityKey, excludeKey, priorityLabel])

  const selected = React.useMemo(
    () => groups.flatMap((g) => g.items).find((i) => i.value === current) ?? null,
    [groups, current]
  )
  const grouped = groups.length > 1

  return (
    <div data-slot="country-select">
      <ComboboxPrimitive.Root
        items={groups}
        value={selected}
        onValueChange={(next: Item | null) => {
          if (!next) return
          if (value === undefined) setInner(next.value)
          onValueChange?.(next.value)
        }}
        filter={matches}
        itemToStringLabel={toLabel}
        itemToStringValue={toValue}
        isItemEqualToValue={same}
        disabled={disabled}
        name={name}
        required={required}
        autoComplete="country"
        autoHighlight
      >
        <ComboboxPrimitive.Trigger
          id={id}
          aria-label={ariaLabel}
          data-placeholder={selected ? undefined : ""}
          className={cn(
            "inline-flex h-9 w-64 items-center justify-between gap-2 rounded-lg border border-border bg-surface px-3 text-sm text-fg",
            "shadow-highlight outline-none transition-[border-color] duration-[70ms] ease-hairline",
            "hover:border-fg-subtle focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
            "data-disabled:cursor-not-allowed data-disabled:opacity-50",
            className
          )}
        >
          <span className={cn("flex min-w-0 items-center gap-2", !selected && "text-fg-subtle")}>
            {selected && showFlag ? (
              <span aria-hidden className="shrink-0 text-base leading-none">
                {selected.flag}
              </span>
            ) : null}
            {/* Server and browser ICU can name a few countries differently; the browser's name wins. */}
            <span className="truncate" suppressHydrationWarning>
              {selected?.label ?? placeholder}
            </span>
          </span>
          <ChevronsUpDownIcon aria-hidden className="size-4 shrink-0 text-fg-muted" />
        </ComboboxPrimitive.Trigger>
        <ComboboxPrimitive.Portal>
          <ComboboxPrimitive.Positioner align="start" sideOffset={6} className="isolate z-50 outline-none">
            <ComboboxPrimitive.Popup
              data-slot="country-select-content"
              aria-label={ariaLabel ?? placeholder}
              className={cn(
                "w-(--anchor-width) min-w-64 max-w-(--available-width) origin-(--transform-origin) rounded-xl border border-border bg-raised p-1 text-fg shadow-overlay outline-none",
                "duration-200 ease-hairline data-closed:duration-[160ms]",
                "data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95"
              )}
            >
              <ComboboxPrimitive.Input
                aria-label="Search countries"
                placeholder={searchPlaceholder}
                className="mb-1 h-8 w-full rounded-md border border-border bg-surface px-2 text-sm text-fg outline-none placeholder:text-fg-subtle focus-visible:border-accent focus-visible:shadow-[0_0_0_3px_var(--accent-soft)]"
              />
              <ComboboxPrimitive.Empty className="px-2 py-2 text-xs text-fg-muted empty:hidden">{emptyText}</ComboboxPrimitive.Empty>
              <ComboboxPrimitive.List className="max-h-[min(18rem,var(--available-height))] overflow-auto overscroll-contain scroll-py-1">
                {(group: Group) => (
                  <ComboboxPrimitive.Group
                    key={group.value}
                    items={group.items}
                    className={cn(grouped && "not-first:mt-1 not-first:border-t not-first:border-border not-first:pt-1")}
                  >
                    {grouped ? (
                      <ComboboxPrimitive.GroupLabel className="px-2.5 pt-1.5 pb-1 text-xs font-medium text-fg-subtle">
                        {group.label}
                      </ComboboxPrimitive.GroupLabel>
                    ) : null}
                    <ComboboxPrimitive.Collection>
                      {(item: Item) => (
                        <ComboboxPrimitive.Item
                          key={item.value}
                          value={item}
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
                          {showFlag ? (
                            <span aria-hidden className="shrink-0 text-base leading-none">
                              {item.flag}
                            </span>
                          ) : null}
                          <span className="min-w-0 flex-1 truncate">{item.label}</span>
                          <span aria-hidden className="shrink-0 font-mono text-[11px] text-fg-subtle">
                            {item.value}
                          </span>
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

export { CountrySelect, countries }
export type { CountrySelectProps, Country }
