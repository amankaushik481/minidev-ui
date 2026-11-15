import type { ComponentDocsContent } from "../types"
import { PART_01 } from "./part-01"
import { PART_02 } from "./part-02"
import { PART_03 } from "./part-03"
import { PART_04 } from "./part-04"
import { PART_05 } from "./part-05"
import { PART_06 } from "./part-06"
import { PART_07 } from "./part-07"
import { PART_08 } from "./part-08"
import { PART_09 } from "./part-09"
import { PART_10 } from "./part-10"
import { PART_11 } from "./part-11"
import { PART_N1 } from "./part-n1"
import { PART_N2 } from "./part-n2"
import { PART_N3 } from "./part-n3"

/** FAQ, keyboard and accessibility notes per registry name. Server only: never import this into a client component. */
export const COMPONENT_DOCS: Record<string, ComponentDocsContent> = {
  ...PART_01, ...PART_02, ...PART_03, ...PART_04, ...PART_05, ...PART_06, ...PART_07, ...PART_08, ...PART_09, ...PART_10, ...PART_11,
  ...PART_N1, ...PART_N2, ...PART_N3,
}

export function componentDocs(name: string): ComponentDocsContent | undefined {
  return COMPONENT_DOCS[name]
}
