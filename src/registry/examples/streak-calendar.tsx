import { StreakCalendar } from "@/registry/ui/streak-calendar"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Custom active days",
    description: "active lists the day numbers, 1 to 28, that count; here an unbroken run up to day 19 and a miss on day 20.",
    code: `<StreakCalendar
  active={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22]}
  className="w-56"
/>`,
    node: (
      <StreakCalendar
        active={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22]}
        className="w-56"
      />
    ),
  },
  {
    title: "Per teammate",
    description: "Small calendars side by side compare habits across people; set a width through className so the grid has something to fill.",
    code: `<div className="flex flex-col items-center gap-2">
  <StreakCalendar active={[1, 2, 3, 4, 7, 8, 9, 10, 11, 14, 15, 16, 17, 18, 21, 22, 23]} className="w-40" />
  <p className="text-xs text-fg-muted">Maya Chen · 17 days</p>
</div>
<div className="flex flex-col items-center gap-2">
  <StreakCalendar active={[2, 5, 9, 12, 16, 19, 23, 26]} className="w-40" />
  <p className="text-xs text-fg-muted">Theo Okafor · 8 days</p>
</div>
<div className="flex flex-col items-center gap-2">
  <StreakCalendar active={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28]} className="w-40" />
  <p className="text-xs text-fg-muted">Priya Raman · 28 days</p>
</div>`,
    node: (
      <div className="flex flex-wrap items-start justify-center gap-6">
        <div className="flex flex-col items-center gap-2">
          <StreakCalendar active={[1, 2, 3, 4, 7, 8, 9, 10, 11, 14, 15, 16, 17, 18, 21, 22, 23]} className="w-40" />
          <p className="text-xs text-fg-muted">Maya Chen · 17 days</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <StreakCalendar active={[2, 5, 9, 12, 16, 19, 23, 26]} className="w-40" />
          <p className="text-xs text-fg-muted">Theo Okafor · 8 days</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <StreakCalendar active={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28]} className="w-40" />
          <p className="text-xs text-fg-muted">Priya Raman · 28 days</p>
        </div>
      </div>
    ),
  },
]
