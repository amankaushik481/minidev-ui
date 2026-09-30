import type { CategoryId, ComponentSeo } from "../types"
import { PART_0 } from "./part-0"
import { PART_1 } from "./part-1"
import { PART_2 } from "./part-2"
import { PART_3 } from "./part-3"
import { PART_4 } from "./part-4"

/** Hand-written description, category and search phrases for every registry item. */
export const COMPONENT_SEO: Record<string, ComponentSeo> = { ...PART_0, ...PART_1, ...PART_2, ...PART_3, ...PART_4 }

export function componentSeo(name: string): ComponentSeo | undefined {
  return COMPONENT_SEO[name]
}

export function componentsInCategory(id: CategoryId): string[] {
  return Object.entries(COMPONENT_SEO)
    .filter(([, v]) => v.category === id)
    .map(([k]) => k)
}
