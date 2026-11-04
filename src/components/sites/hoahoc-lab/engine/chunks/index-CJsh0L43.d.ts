import type { HoaAppContext, HoaCoreApi } from "../core-utils";

export interface HoaCoreStatic {
  create(wasmResponseOrBuffer: Response | BufferSource): Promise<HoaCoreApi>;
}

export const HoaCore: HoaCoreStatic;

export interface HoaChunkModule {
  mount: (el: HTMLElement, ctx: HoaAppContext) => void | (() => void);
}

export const MODULE_LOADERS: Record<string, () => Promise<HoaChunkModule>>;

export function b(): void;
export function c(onlyOnce?: boolean): void;
export function o(ctx: HoaAppContext, initialQuery?: string): void;
