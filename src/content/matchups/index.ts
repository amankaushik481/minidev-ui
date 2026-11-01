import type { LibraryId, Matchup } from "../types"
import shadcnVsMaterial from "./shadcn-ui-vs-material-ui"
import shadcnVsChakra from "./shadcn-ui-vs-chakra-ui"
import materialVsAnt from "./material-ui-vs-ant-design"
import chakraVsMaterial from "./chakra-ui-vs-material-ui"
import mantineVsMaterial from "./mantine-vs-material-ui"
import shadcnVsMantine from "./shadcn-ui-vs-mantine"
import daisyVsFlowbite from "./daisyui-vs-flowbite"
import aceternityVsMagic from "./aceternity-ui-vs-magic-ui"
import herouiVsShadcn from "./heroui-vs-shadcn-ui"
import tailwindPlusVsShadcn from "./tailwind-plus-vs-shadcn-ui"

/** Head to head pages for two other libraries, served at /compare/<a>-vs-<b>. */
export const MATCHUPS: Matchup[] = [
  shadcnVsMaterial,
  shadcnVsChakra,
  materialVsAnt,
  chakraVsMaterial,
  mantineVsMaterial,
  shadcnVsMantine,
  daisyVsFlowbite,
  aceternityVsMagic,
  herouiVsShadcn,
  tailwindPlusVsShadcn,
]

export const matchupBySlug = (slug: string) => MATCHUPS.find((m) => m.slug === slug)

/** Matchups that include a library, on either side. */
export const matchupsFor = (id: LibraryId) => MATCHUPS.filter((m) => m.a === id || m.b === id)

/** The matchup between two libraries, in either order. */
export const matchupBetween = (x: LibraryId, y: LibraryId) => MATCHUPS.find((m) => (m.a === x && m.b === y) || (m.a === y && m.b === x))
