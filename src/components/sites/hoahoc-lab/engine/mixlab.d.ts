import type { GasCatalogItem, IndicatorCatalogItem, OrganicCatalogItem, SolidCatalogItem } from "../data/catalogs";
import type { LabVisualTimeline } from "../data/experiments";
export const G: GasCatalogItem[];
export const I: IndicatorCatalogItem[];
export const M: string[];
export const O: OrganicCatalogItem[];
export const S: string[];
export const a: SolidCatalogItem[];
export function c(name: string): string;
export function m(chem: unknown, kindA: string, valA: string, kindB: string, valB: string): {
  ok: boolean;
  err?: string;
  title?: string;
  eqs?: string[];
  observe?: string[];
  notes?: string[];
  explain?: string;
  visual?: LabVisualTimeline;
};
