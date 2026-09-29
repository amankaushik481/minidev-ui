"use client"
import * as React from "react"
import { Tabs as TabsPrimitive } from "@base-ui/react/tabs"
import { cva, type VariantProps } from "class-variance-authority"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

/**
 * Tabs - a raised thumb or accent underline that glides to the active tab.
 * Base UI for roving focus and panels. The active tab carries one
 * indicator per list (a raised thumb, or a 2px accent underline for `line`)
 * that glides between tabs on a spring, the way segmented-control does.
 */

type Variant = "default" | "line"

const ListContext = React.createContext<{ variant: Variant; layoutId: string }>({ variant: "default", layoutId: "tabs" })

type TabsProps = TabsPrimitive.Root.Props

function Tabs({ className, orientation = "horizontal", ...props }: TabsProps) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      orientation={orientation}
      className={cn("group/tabs flex gap-2 data-horizontal:flex-col", className)}
      {...props}
    />
  )
}

const tabsListVariants = cva(
  "group/tabs-list relative isolate inline-flex w-fit items-center justify-center text-fg-muted group-data-horizontal/tabs:h-9 group-data-vertical/tabs:h-fit group-data-vertical/tabs:flex-col group-data-vertical/tabs:items-stretch",
  {
    variants: {
      variant: {
        default: "rounded-lg bg-sunken p-0.5 shadow-[inset_0_0_0_1px_var(--border)]",
        line: "gap-4 rounded-none border-b border-border bg-transparent group-data-vertical/tabs:gap-0.5 group-data-vertical/tabs:border-r group-data-vertical/tabs:border-b-0",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

type TabsListProps = TabsPrimitive.List.Props & VariantProps<typeof tabsListVariants>

function TabsList({ className, variant = "default", ...props }: TabsListProps) {
  const layoutId = React.useId()
  const v = variant ?? "default"
  const ctx = React.useMemo(() => ({ variant: v, layoutId }), [v, layoutId])
  return (
    <ListContext.Provider value={ctx}>
      <TabsPrimitive.List
        data-slot="tabs-list"
        data-variant={v}
        className={cn(tabsListVariants({ variant: v }), className)}
        {...props}
      />
    </ListContext.Provider>
  )
}

const THUMB = "absolute inset-0 -z-10 rounded-[inherit] bg-raised shadow-key"
const UNDERLINE =
  "absolute -z-10 rounded-full bg-accent group-data-horizontal/tabs:inset-x-0 group-data-horizontal/tabs:-bottom-px group-data-horizontal/tabs:h-0.5 group-data-vertical/tabs:inset-y-1 group-data-vertical/tabs:-right-px group-data-vertical/tabs:w-0.5"

type TabsTriggerProps = TabsPrimitive.Tab.Props & {
  /** Short trailing detail, e.g. a count. */
  badge?: React.ReactNode
}

function TabsTrigger({ className, badge, children, ...props }: TabsTriggerProps) {
  const { variant, layoutId } = React.useContext(ListContext)
  const reduce = useReducedMotion()
  const line = variant === "line"
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      className={cn(
        "group/tab relative inline-flex h-full flex-1 cursor-pointer items-center justify-center gap-1.5 text-[0.8125rem] font-medium whitespace-nowrap outline-none select-none",
        "transition-[color] duration-[70ms] ease-hairline",
        "text-fg-muted hover:text-fg data-active:text-fg",
        "disabled:cursor-not-allowed disabled:opacity-45 data-disabled:cursor-not-allowed data-disabled:opacity-45",
        "group-data-vertical/tabs:w-full group-data-vertical/tabs:flex-none group-data-vertical/tabs:justify-start",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        line
          ? "flex-none rounded-md px-1 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg group-data-vertical/tabs:h-8 group-data-vertical/tabs:px-2.5"
          : "rounded-md px-3 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 focus-visible:ring-offset-sunken group-data-vertical/tabs:h-8",
        className
      )}
      render={(p, state) => (
        <button {...p}>
          {state.active ? (
            <motion.span
              layoutId={layoutId}
              aria-hidden
              data-slot={line ? "tabs-underline" : "tabs-thumb"}
              className={line ? UNDERLINE : THUMB}
              transition={reduce ? { duration: 0 } : { type: "spring", bounce: 0.18, duration: 0.42 }}
            />
          ) : line ? null : (
            <span
              aria-hidden
              className="absolute inset-0 -z-10 rounded-[inherit] bg-fg/0 transition-colors duration-[70ms] group-hover/tab:bg-fg/[0.035] group-active/tab:bg-fg/[0.06] group-disabled/tab:bg-fg/0 group-data-disabled/tab:bg-fg/0"
            />
          )}
          {p.children}
          {badge != null ? (
            <span
              className={cn(
                "rounded-full px-1.5 font-mono text-[10px] leading-4 tabular-nums transition-colors duration-[70ms]",
                state.active ? "bg-accent-soft text-accent-fg" : "bg-fg/5 text-fg-subtle"
              )}
            >
              {badge}
            </span>
          ) : null}
        </button>
      )}
      {...props}
    >
      {children}
    </TabsPrimitive.Tab>
  )
}

type TabsContentProps = TabsPrimitive.Panel.Props

function TabsContent({ className, ...props }: TabsContentProps) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-content"
      className={cn(
        "flex-1 rounded-lg text-sm outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
        className
      )}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants }
export type { TabsProps, TabsListProps, TabsTriggerProps, TabsContentProps }
