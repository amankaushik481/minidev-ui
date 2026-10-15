import type * as React from "react"

/** One live example on a docs page: a title, one sentence, the rendered node and its source. */
export type Example = {
  title: string
  description?: string
  /** The JSX for this example as a string, shown under the preview with a copy button. */
  code: string
  node: React.ReactNode
}
