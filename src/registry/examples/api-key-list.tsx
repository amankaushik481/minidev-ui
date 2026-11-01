import { ApiKeyList } from "@/registry/ui/api-key-list"
import type { Example } from "./types"

const KEYS = [
  { id: "k1", name: "Production", preview: "lm_live_••••4f8c", created: "Jan 9" },
  { id: "k2", name: "Northwind integration", preview: "lm_live_••••a21e", created: "Jun 3" },
  { id: "k3", name: "Staging", preview: "lm_test_••••0b77", created: "Sep 28" },
]

const SERVICE_KEYS = [
  { id: "ci", name: "CI runner", hint: "Last used 2 hours ago by deploy-lumen-web" },
  { id: "backup", name: "Nightly backup", hint: "Last used yesterday at 02:00 UTC" },
  { id: "unused", name: "Zapier (legacy)", hint: "Never used" },
]

export const examples: Example[] = [
  {
    title: "Custom keys",
    description: "Each key takes a name, a masked preview and a created label; the created label renders as an outline badge.",
    code: `const KEYS = [
  { id: "k1", name: "Production", preview: "lm_live_••••4f8c", created: "Jan 9" },
  { id: "k2", name: "Northwind integration", preview: "lm_live_••••a21e", created: "Jun 3" },
  { id: "k3", name: "Staging", preview: "lm_test_••••0b77", created: "Sep 28" },
]

<ApiKeyList keys={KEYS} className="w-full max-w-lg" />`,
    node: <ApiKeyList keys={KEYS} className="w-full max-w-lg" />,
  },
  {
    title: "Hints instead of previews",
    description: "Leave preview out and pass hint to put last-used information on the second line; without created there is no badge.",
    code: `const SERVICE_KEYS = [
  { id: "ci", name: "CI runner", hint: "Last used 2 hours ago by deploy-lumen-web" },
  { id: "backup", name: "Nightly backup", hint: "Last used yesterday at 02:00 UTC" },
  { id: "unused", name: "Zapier (legacy)", hint: "Never used" },
]

<ApiKeyList keys={SERVICE_KEYS} className="w-full max-w-lg" />`,
    node: <ApiKeyList keys={SERVICE_KEYS} className="w-full max-w-lg" />,
  },
]
