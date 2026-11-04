import { EXPERIMENTS_85 } from "../data/experiments";
import { VIDEOS_23 } from "../data/videos";
import {
  IUPAC_ELEMENTS_118,
  IUPAC_INORGANIC_60,
  IUPAC_ORGANIC_51,
  IUPAC_RULES_6,
  IUPAC_CHAIN_PREFIXES,
  IUPAC_RADICALS,
  IUPAC_ACID_ANIONS,
  MOLECULE_CATALOG_V12,
} from "../data/iupac";

export {
  EXPERIMENTS_85,
  VIDEOS_23,
  IUPAC_ELEMENTS_118,
  IUPAC_INORGANIC_60,
  IUPAC_ORGANIC_51,
  IUPAC_RULES_6,
  IUPAC_CHAIN_PREFIXES,
  IUPAC_RADICALS,
  IUPAC_ACID_ANIONS,
  MOLECULE_CATALOG_V12,
};

export interface HoaElement {
  z: number;
  sym: string;
  name: string;
  nameVi?: string;
  en?: string;
  mass: number;
  cat: string;
  period: number;
  group: number;
  block: string;
  state: string;
  cfgShort?: string;
}

export interface HoaReactionItem {
  molecular: string;
  netIonic: string;
  kinds: string[];
  colors: string[];
  gas: string[];
  observe: string[];
  notes: string[];
}

export interface HoaReactResult {
  ok: boolean;
  err?: string;
  reactions: HoaReactionItem[];
}

export interface HoaDisplaceResult {
  ok: boolean;
  occurs: boolean;
  eq: string;
  note: string;
  colorFrom?: string;
  colorTo?: string;
  coatColor?: string;
}

export interface HoaBalanceResult {
  ok: boolean;
  err?: string;
  left: Array<[number, string]>;
  right: Array<[number, string]>;
  eq: string;
}

export interface HoaMassResult {
  ok: boolean;
  err?: string;
  M: number;
  charge: number;
  hill: string;
  atoms: Array<{ sym: string; n: number; mass: number; pct: number }>;
}

export interface HoaSeriesItem {
  i?: number;
  sym?: string;
  ion?: string;
  ox: string;
  red?: string;
  n?: number;
  e0?: number;
  e?: number;
  label?: string;
  metal?: string;
  [key: string]: unknown;
}

export interface HoaSmilesResult {
  ok: boolean;
  err?: string;
  atoms: unknown[];
  bonds: unknown[];
  formula: string;
  M: number;
  charge: number;
}

interface HoaWasmExports {
  memory: WebAssembly.Memory;
  hoa_alloc: (len: number) => number;
  hoa_free: (ptr: number, len: number) => void;
  hoa_elements: () => number;
  hoa_config: (z: number, charge: number) => number;
  hoa_mass: (ptr: number, len: number) => number;
  hoa_balance: (ptr: number, len: number) => number;
  hoa_react: (ptr: number, len: number) => number;
  hoa_ion_table: () => number;
  hoa_series: () => number;
  hoa_cell: (a: number, b: number) => number;
  hoa_displace: (ptr: number, len: number) => number;
  hoa_faraday: (i: number, t: number, m: number, n: number) => number;
  hoa_ph: (ptr: number, len: number, c: number, ka: number, kb: number) => number;
  hoa_titration: (
    ptr: number,
    len: number,
    ca: number,
    va: number,
    cb: number,
    vb: number,
    steps: number
  ) => number;
  hoa_smiles: (ptr: number, len: number) => number;
  hoa_vsepr: (a: number, b: number) => number;
}

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

export class HoaCoreWasm {
  private x!: HoaWasmExports;
  private module: WebAssembly.Module;

  constructor(mod: WebAssembly.Module) {
    this.module = mod;
  }

  static async create(source: Response | BufferSource): Promise<HoaCoreWasm> {
    let mod: WebAssembly.Module;
    if (source instanceof Response) {
      const cloned = source.clone();
      mod = await WebAssembly.compileStreaming(source).catch(async () =>
        WebAssembly.compile(await cloned.arrayBuffer())
      );
    } else {
      mod = await WebAssembly.compile(source);
    }
    const inst = new HoaCoreWasm(mod);
    await inst.boot();
    return inst;
  }

  async boot(): Promise<void> {
    const instance = await WebAssembly.instantiate(this.module, {});
    this.x = instance.exports as unknown as HoaWasmExports;
  }

  private take<T>(ptr: number): T {
    const len = new DataView(this.x.memory.buffer).getUint32(ptr, true);
    const jsonStr = textDecoder.decode(
      new Uint8Array(this.x.memory.buffer, ptr + 4, len)
    );
    this.x.hoa_free(ptr, 4 + len);
    return JSON.parse(jsonStr) as T;
  }

  private str<T>(input: string, fn: (ptr: number, len: number) => number): T {
    const bytes = textEncoder.encode(input);
    const ptr = this.x.hoa_alloc(bytes.length);
    new Uint8Array(this.x.memory.buffer, ptr, bytes.length).set(bytes);
    try {
      return this.take<T>(fn(ptr, bytes.length));
    } finally {
      this.x.hoa_free(ptr, bytes.length);
    }
  }

  private safe<T>(fn: () => T, fallback: T): T {
    try {
      return fn();
    } catch {
      WebAssembly.instantiate(this.module, {}).then((inst) => {
        this.x = inst.exports as unknown as HoaWasmExports;
      });
      return fallback;
    }
  }

  elements(): HoaElement[] {
    return this.take<HoaElement[]>(this.x.hoa_elements());
  }

  config(z: number, charge = 0): unknown {
    return this.take(this.x.hoa_config(z, charge));
  }

  mass(formula: string): HoaMassResult {
    return this.safe(
      () => this.str<HoaMassResult>(formula, this.x.hoa_mass.bind(this.x)),
      { ok: false, err: "Lỗi nội bộ", M: 0, charge: 0, hill: "", atoms: [] }
    );
  }

  balance(eq: string): HoaBalanceResult {
    return this.safe(
      () => this.str<HoaBalanceResult>(eq, this.x.hoa_balance.bind(this.x)),
      { ok: false, err: "Lỗi nội bộ", left: [], right: [], eq: "" }
    );
  }

  react(a: string, b: string): HoaReactResult {
    return this.safe(
      () =>
        this.str<HoaReactResult>(
          `${a}\n${b}`,
          this.x.hoa_react.bind(this.x)
        ),
      { ok: false, err: "Lỗi nội bộ", reactions: [] }
    );
  }

  ionTable(): unknown {
    return this.take(this.x.hoa_ion_table());
  }

  series(): HoaSeriesItem[] {
    return this.take<HoaSeriesItem[]>(this.x.hoa_series());
  }

  cell(a: number, b: number): unknown {
    return this.take(this.x.hoa_cell(a, b));
  }

  displace(metal: string, saltMetal: string): HoaDisplaceResult {
    return this.str<HoaDisplaceResult>(
      `${metal}\n${saltMetal}`,
      this.x.hoa_displace.bind(this.x)
    );
  }

  faraday(i: number, t: number, m: number, n: number): unknown {
    return this.take(this.x.hoa_faraday(i, t, m, n));
  }

  ph(formula: string, c: number, ka = 0, kb = 0): unknown {
    return this.str(formula, (ptr, len) =>
      this.x.hoa_ph(ptr, len, c, ka, kb)
    );
  }

  titration(
    formula: string,
    ca: number,
    va: number,
    cb: number,
    vb: number,
    steps = 200
  ): unknown {
    return this.str(formula, (ptr, len) =>
      this.x.hoa_titration(ptr, len, ca, va, cb, vb, steps)
    );
  }

  smiles(s: string): HoaSmilesResult {
    return this.safe(
      () => this.str<HoaSmilesResult>(s, this.x.hoa_smiles.bind(this.x)),
      {
        ok: false,
        err: "Lỗi nội bộ",
        atoms: [],
        bonds: [],
        formula: "",
        M: 0,
        charge: 0,
      }
    );
  }

  vsepr(a: number, b: number): unknown {
    return this.take(this.x.hoa_vsepr(a, b));
  }
}

export interface HoaAppContext {
  chem: HoaCoreWasm;
  elements: HoaElement[];
  params: Record<string, string>;
  goto: (appId: string, params?: Record<string, string>) => void;
}

type DomChild =
  | Node
  | string
  | number
  | boolean
  | null
  | undefined
  | DomChild[];

function appendDomChildren(parent: HTMLElement, children: DomChild[]): void {
  for (const child of children) {
    if (child == null || child === false) continue;
    if (Array.isArray(child)) {
      appendDomChildren(parent, child);
    } else if (typeof child === "object" && child instanceof Node) {
      parent.appendChild(child);
    } else {
      parent.appendChild(document.createTextNode(String(child)));
    }
  }
}

export function h(
  tag: string,
  attrs: Record<string, unknown> | null = null,
  ...children: DomChild[]
): HTMLElement {
  const el = document.createElement(tag);
  if (attrs) {
    for (const [key, val] of Object.entries(attrs)) {
      if (val == null || val === false) continue;
      if (key === "class") {
        el.className = String(val);
      } else if (key === "style") {
        el.setAttribute("style", String(val));
      } else if (key === "on" && typeof val === "object") {
        for (const [ev, handler] of Object.entries(
          val as Record<string, EventListener>
        )) {
          el.addEventListener(ev, handler);
        }
      } else if (key === "html") {
        el.innerHTML = String(val);
      } else if (key in el && typeof val !== "string") {
        (el as unknown as Record<string, unknown>)[key] = val;
      } else {
        el.setAttribute(key, val === true ? "" : String(val));
      }
    }
  }
  appendDomChildren(el, children);
  return el;
}

let toastTimer = 0;

export function toast(msg: string, ms = 2200): void {
  if (typeof document === "undefined") return;
  const el = document.getElementById("toast");
  if (!el) return;
  el.textContent = msg;
  el.classList.add("show");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    el.classList.remove("show");
  }, ms);
}

export function field(label: string, inputEl: HTMLElement): HTMLElement {
  return h("label", { class: "field" }, h("span", null, label), inputEl, null);
}

export const ICON_PATHS: Record<string, string> = {
  calc: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8M8 12h2M12 12h2M16 12h0M8 16h2M12 16h2M16 16h0"/>',
  home: '<path d="M3 11l9-8 9 8"/><path d="M5 10v10h5v-6h4v6h5V10"/>',
  table: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/>',
  atom: '<circle cx="12" cy="12" r="1.6" fill="currentColor"/><ellipse cx="12" cy="12" rx="10" ry="4"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/>',
  config: '<rect x="3" y="4" width="7" height="16" rx="1.5"/><rect x="14" y="4" width="7" height="16" rx="1.5"/><path d="M6.5 15V9M6.5 9l-2 2M6.5 9l2 2M17.5 9v6M17.5 15l-2-2M17.5 15l2-2"/>',
  molecule: '<circle cx="6" cy="7" r="2.5"/><circle cx="18" cy="7" r="2.5"/><circle cx="12" cy="18" r="2.8"/><path d="M8 8l2.6 7M16 8l-2.6 7M8.5 7h7"/>',
  balance: '<path d="M12 3v18M7 21h10M5 7h14"/><path d="M5 7l-3 7a3 3 0 006 0zM19 7l-3 7a3 3 0 006 0z"/>',
  ion: '<circle cx="8.5" cy="12" r="5.5"/><circle cx="15.5" cy="12" r="5.5"/><path d="M6 12h5M8.5 9.5v5"/>',
  flask: '<path d="M9 3h6M10 3v6L4.5 19a2 2 0 001.7 3h11.6a2 2 0 001.7-3L14 9V3"/><path d="M7.5 15h9"/>',
  bolt: '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
  drop: '<path d="M12 3s6.5 6.5 6.5 11a6.5 6.5 0 11-13 0C5.5 9.5 12 3 12 3z"/><path d="M9 15a3 3 0 003 3"/>',
  book: '<path d="M4 5a2 2 0 012-2h13v15H6a2 2 0 00-2 2z"/><path d="M4 20a2 2 0 012-2h13v3H6a2 2 0 01-2-1z"/>',
  pen: '<path d="M4 20l4-1 11-11a2.1 2.1 0 00-3-3L5 16z"/><path d="M14 6l3 3"/>',
  hexagon: '<path d="M12 2.5l8 4.5v10l-8 4.5-8-4.5V7z"/><circle cx="12" cy="12" r="3.5"/>',
  download: '<path d="M12 3v12M7 10l5 5 5-5M4 21h16"/>',
  sigma: '<path d="M18 4H6l7 8-7 8h12"/>',
  palette: '<path d="M12 3a9 9 0 100 18c1.6 0 2-1.1 1.5-2.1-.5-1 0-2 1.5-2h2a3 3 0 003-3c0-6-4-11-8-11z"/><circle cx="7.5" cy="11" r="1" fill="currentColor"/><circle cx="11" cy="7" r="1" fill="currentColor"/><circle cx="16" cy="8" r="1" fill="currentColor"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  moon: '<path d="M20 14.5A8.5 8.5 0 019.5 4 8.5 8.5 0 1020 14.5z"/>',
  layers: '<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5M3 17.5l9 5 9-5" opacity=".6"/>',
  spark: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/>',
  file: '<path d="M6 3h8l5 5v13H6z"/><path d="M14 3v5h5"/>',
  copy: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2h2"/>',
  undo: '<path d="M9 14L4 9l5-5"/><path d="M4 9h10a6 6 0 010 12h-3"/>',
  redo: '<path d="M15 14l5-5-5-5"/><path d="M20 9H10a6 6 0 000 12h3"/>',
  trash: '<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>',
  rotate: '<path d="M21 12a9 9 0 11-3-6.7"/><path d="M21 3v6h-6"/>',
  flip: '<path d="M12 3v18M8 7L3 12l5 5zM16 7l5 5-5 5z"/>',
  up: '<path d="M12 19V5M6 11l6-6 6 6"/>',
  down: '<path d="M12 5v14M6 13l6 6 6-6"/>',
  star: '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
  grid: '<path d="M3 3h18v18H3zM3 9h18M3 15h18M9 3v18M15 3v18" opacity=".7"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  minus: '<path d="M5 12h14"/>',
  cursor: '<path d="M5 3l14 7-6 2-2 6z"/>',
  eraser: '<path d="M20 20H9L4 15l9-9 7 7z"/><path d="M9 20l-5-5"/>',
  text: '<path d="M5 6V4h14v2M12 4v16M9 20h6"/>',
  coffee: '<path d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3"/>',
  check: '<polyline points="20 6 9 17 4 12"/>',
  heart: '<path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>',
};

export function renderIconSvg(name: string, size = 20): string {
  return `<svg class="ico" viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON_PATHS[name] ?? ICON_PATHS.spark}</svg>`;
}

interface ChemToken {
  t: "txt" | "sub" | "sup";
  v: string;
}

export function tokenizeChem(formula: string): ChemToken[] {
  const tokens: ChemToken[] = [];
  const pushToken = (t: "txt" | "sub" | "sup", v: string) => {
    if (tokens.length && tokens[tokens.length - 1].t === t) {
      tokens[tokens.length - 1].v += v;
    } else {
      tokens.push({ t, v });
    }
  };
  let i = 0;
  let coeffStart = true;
  while (i < formula.length) {
    const ch = formula[i];
    if (ch === "^") {
      let j = i + 1;
      let sup = "";
      while (j < formula.length && /[0-9+\-]/.test(formula[j])) {
        sup += formula[j++];
      }
      pushToken("sup", sup);
      i = j;
      coeffStart = false;
      continue;
    }
    if (/[0-9]/.test(ch)) {
      pushToken(coeffStart ? "txt" : "sub", ch);
      i++;
      continue;
    }
    coeffStart = ch === " " || ch === "·" || ch === ".";
    pushToken("txt", ch);
    i++;
  }
  return tokens;
}

export function formatChemHtml(formula: string): string {
  const esc = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const normalized = formula.replace(/->|-->|=>/g, "→");
  return tokenizeChem(normalized)
    .map((tok) =>
      tok.t === "sub"
        ? `<sub>${tok.v}</sub>`
        : tok.t === "sup"
          ? `<sup>${tok.v.replace("-", "−")}</sup>`
          : esc(tok.v)
    )
    .join("");
}

export function toTypstEq(formula: string): string {
  const out: string[] = [];
  for (const tok of tokenizeChem(formula.replace(/->|-->|=>/g, "→"))) {
    if (tok.t === "sub") {
      out.push(`_${tok.v}`);
    } else if (tok.t === "sup") {
      out.push(`^(${tok.v.replace("-", "−")})`);
    } else {
      for (const part of tok.v.match(/[A-Za-z]+|[0-9]+|\s+|→|·|[^A-Za-z0-9\s→·]/g) ?? []) {
        if (/^[A-Za-z]+$/.test(part)) {
          out.push(`"${part}"`);
        } else if (part === "→") {
          out.push(" arrow.r ");
        } else if (part === "·") {
          out.push(" dot ");
        } else if (/^\s+$/.test(part)) {
          out.push(" ");
        } else {
          out.push(part);
        }
      }
    }
  }
  return out.join("");
}

export async function copyText(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
    toast("Đã sao chép");
  } catch {
    const ta = h("textarea", { value: text }) as HTMLTextAreaElement;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
    toast("Đã sao chép");
  }
}

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = h("a", { href: url, download: filename });
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function savePng(canvas: HTMLCanvasElement, name = "thi-nghiem"): void {
  canvas.toBlob((blob) => {
    if (blob) {
      downloadBlob(blob, `${name}.png`);
      toast("Đã lưu ảnh PNG");
    }
  }, "image/png");
}

export async function recordGif(
  canvas: HTMLCanvasElement,
  opts: {
    fps?: number;
    seconds?: number;
    maxWidth?: number;
    name?: string;
    step?: (i: number, total: number) => void;
  }
): Promise<void> {
  const fps = opts.fps ?? 14;
  const seconds = opts.seconds ?? 8;
  const total = Math.max(1, Math.round(fps * seconds));
  for (let i = 0; i < total; i++) {
    opts.step?.(i, total);
    await new Promise((r) => setTimeout(r, 1000 / fps));
  }
  savePng(canvas, opts.name ?? "thi-nghiem");
}

export async function recordWebm(
  canvas: HTMLCanvasElement,
  opts: { seconds?: number; name?: string }
): Promise<void> {
  const seconds = opts.seconds ?? 8;
  const name = opts.name ?? "thi-nghiem";
  if (typeof MediaRecorder === "undefined" || !canvas.captureStream) {
    toast("Trình duyệt không hỗ trợ ghi video");
    return;
  }
  const stream = canvas.captureStream(30);
  const recorder = new MediaRecorder(stream);
  const chunks: BlobPart[] = [];
  recorder.ondataavailable = (e) => {
    if (e.data.size > 0) chunks.push(e.data);
  };
  const done = new Promise<void>((resolve) => {
    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: "video/webm" });
      downloadBlob(blob, `${name}.webm`);
      toast("Đã lưu video WebM");
      resolve();
    };
  });
  recorder.start();
  await new Promise((r) => setTimeout(r, seconds * 1000));
  recorder.stop();
  await done;
}

export interface NavModuleItem {
  id: string;
  ic: string;
  name: string;
  group: string;
  color: string;
  full?: boolean;
  hidden?: boolean;
  desc: string;
  kw: string;
}

export const NAV_MODULES: NavModuleItem[] = [
  {
    id: "home",
    ic: "home",
    name: "Trang chủ",
    group: "Khám phá",
    color: "#19d3c5",
    desc: "Tổng quan 16 mô-đun Hóa học phổ thông",
    kw: "trang chu home ct99 chemistry",
  },
  {
    id: "periodic",
    ic: "table",
    name: "Bảng tuần hoàn",
    group: "Cấu tạo chất",
    color: "#6366f1",
    desc: "118 nguyên tố, xu hướng tuần hoàn, chi tiết nguyên tử",
    kw: "nguyen to bang tuan hoan periodic mendeleev",
  },
  {
    id: "atom",
    ic: "atom",
    name: "Nguyên tử 3D",
    group: "Cấu tạo chất",
    color: "#0ea5e9",
    full: true,
    desc: "Bohr, orbital s p d f, mây electron",
    kw: "nguyen tu orbital electron bohr",
  },
  {
    id: "config",
    ic: "config",
    name: "Cấu hình electron",
    group: "Cấu tạo chất",
    color: "#3b82f6",
    desc: "Ô orbital, ion, số lượng tử",
    kw: "cau hinh electron aufbau hund",
  },
  {
    id: "molecule",
    ic: "molecule",
    name: "Phân tử 3D & hữu cơ",
    group: "Cấu tạo chất",
    color: "#14b8a6",
    full: true,
    desc: "SMILES → 3D, VSEPR, thư viện chất",
    kw: "phan tu smiles huu co vsepr 3d",
  },
  {
    id: "lienket",
    ic: "atom",
    name: "Liên kết & Lai hoá 3D",
    group: "Cấu tạo chất",
    color: "#f472b6",
    full: true,
    desc: "Lai hóa sp, sp2, sp3, liên kết sigma/pi 3D",
    kw: "lien ket lai hoa sigma pi 3d",
  },
  {
    id: "phucchat",
    ic: "hexagon",
    name: "Phức chất (Lớp 12)",
    group: "Cấu tạo chất",
    color: "#a78bfa",
    full: true,
    desc: "Phức chất bát diện, vuông phẳng, đồng phân",
    kw: "phuc chat phuc bat dien vuong phang lop 12",
  },
  {
    id: "tachchiet",
    ic: "flask",
    name: "Tách chiết & tinh chế hữu cơ",
    group: "Hữu cơ (Lớp 11)",
    color: "#22c55e",
    desc: "Chưng cất, chiết, kết tinh, sắc ký",
    kw: "tach chiet tinh che chung cat sac ky huu co",
  },
  {
    id: "cochepu",
    ic: "spark",
    name: "Cơ chế phản ứng hữu cơ",
    group: "Hữu cơ (Lớp 11)",
    color: "#f97316",
    desc: "Thế nucleophil, tách, cộng electrophil",
    kw: "co che phan ung the cong tach huu co",
  },
  {
    id: "equation",
    ic: "balance",
    name: "Phương trình & tính toán",
    group: "Phản ứng",
    color: "#10b981",
    desc: "Cân bằng, tính theo PTHH, CTPT",
    kw: "can bang phuong trinh mol khoi luong",
  },
  {
    id: "ionic",
    ic: "ion",
    name: "Phản ứng trao đổi ion",
    group: "Phản ứng",
    color: "#f59e0b",
    desc: "Kết tủa, khí, bảng tính tan, nhận biết",
    kw: "trao doi ion ket tua tinh tan nhan biet",
  },
  {
    id: "lab",
    ic: "flask",
    name: "Phòng thí nghiệm ảo",
    group: "Phản ứng",
    color: "#8b5cf6",
    full: true,
    desc: "85 thí nghiệm SGK + tự pha trộn",
    kw: "thi nghiem lab hoa chat",
  },
  {
    id: "echem",
    ic: "bolt",
    name: "Điện hóa & Pin",
    group: "Phản ứng",
    color: "#f97316",
    desc: "Pin, Nernst, điện phân, Faraday",
    kw: "dien hoa pin dien phan the dien cuc",
  },
  {
    id: "dienphan",
    ic: "bolt",
    name: "Điện phân (Lớp 12)",
    group: "Phản ứng",
    color: "#eab308",
    desc: "Điện phân nóng chảy, dung dịch, định luật Faraday",
    kw: "dien phan dung dich nong chay faraday anot catot",
  },
  {
    id: "solution",
    ic: "drop",
    name: "Dung dịch & chuẩn độ",
    group: "Dung dịch",
    color: "#a855f7",
    desc: "pH, đệm, đường cong chuẩn độ",
    kw: "ph chuan do dung dich dem",
  },
  {
    id: "tracuu",
    ic: "book",
    name: "Bách khoa tri thức",
    group: "Tra cứu",
    color: "#f43f5e",
    desc: "Khái niệm, nhận biết, dãy điện hóa E°, công thức, màu sắc",
    kw: "bach khoa tra cuu khai niem cong thuc nhan biet thuoc thu day dien hoa the dien cuc danh phap",
  },
  {
    id: "studio",
    ic: "pen",
    name: "Xưởng vẽ hình",
    group: "Vẽ hình",
    color: "#06b6d4",
    full: true,
    desc: "Kéo thả dụng cụ, sơ đồ, xuất SVG/DOCX",
    kw: "ve hinh dung cu thi nghiem svg docx word",
  },
  {
    id: "dungcu",
    ic: "pen",
    name: "Bộ dụng cụ",
    group: "Vẽ hình",
    color: "#06b6d4",
    full: true,
    hidden: true,
    desc: "Bộ dụng cụ thí nghiệm",
    kw: "bo dung cu thi nghiem",
  },
  {
    id: "cautruc",
    ic: "hexagon",
    name: "Vẽ công thức cấu tạo",
    group: "Vẽ hình",
    color: "#ec4899",
    full: true,
    desc: "Trình vẽ cấu tạo ↔ SMILES",
    kw: "ve cong thuc cau tao smiles khung huu co",
  },
  {
    id: "bangve",
    ic: "pen",
    name: "Bảng viết & vẽ tay",
    group: "Công cụ",
    color: "#7c3aed",
    full: true,
    desc: "Bảng phấn viết tay, vẽ nhanh bài giảng",
    kw: "bang viet ve tay",
  },
  {
    id: "casio",
    ic: "calc",
    name: "Máy tính Casio",
    group: "Công cụ",
    color: "#0ea5e9",
    full: true,
    desc: "Máy tính khoa học giải nhanh Hóa học",
    kw: "may tinh casio fx580",
  },
  {
    id: "export",
    ic: "download",
    name: "Xuất SVG · DOCX · Typst",
    group: "Xuất bản",
    color: "#10b981",
    desc: "SVG động, PNG, mã Typst, DOCX",
    kw: "xuat svg gif typst docx",
  },
];

export const PALETTE_SUGGESTIONS: string[] = [
  "fe + hcl",
  "h2so4",
  "caco3",
  "Fe(OH)3 màu gì",
  "nhận biết Cl-",
  "thế điện cực Cu",
  "Fe + CuSO4",
  "KMnO4 + HCl -> KCl + MnCl2 + Cl2 + H2O",
  "pH",
  "glucozơ",
  "este hóa",
];

export interface PaletteResultItem {
  type: string;
  title: string;
  sub?: string;
  app: string;
  params?: Record<string, string>;
  icon: string;
  score: number;
  live?: boolean;
}

export function normalizeVn(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d");
}

export function searchSmartPalette(
  query: string,
  chem: HoaCoreWasm | null,
  elements: HoaElement[],
  limit = 40
): PaletteResultItem[] {
  const q = query.trim();
  if (!q) return [];
  const norm = normalizeVn(q);
  const results: PaletteResultItem[] = [];

  if (chem && /(->|→|⇌|\s=\s)/.test(q) && /[A-Za-z]/.test(q) && q.length > 4) {
    const bal = chem.balance(q);
    results.push({
      type: "Cân bằng",
      title: bal.ok ? bal.eq : "Không cân bằng được",
      sub: bal.ok ? "Mở bộ cân bằng & tính theo PTHH" : (bal.err ?? ""),
      app: "equation",
      params: { eq: q },
      icon: "balance",
      score: 10000,
      live: true,
    });
  }

  for (const mod of NAV_MODULES) {
    const hay = normalizeVn(`${mod.name} ${mod.desc} ${mod.kw}`);
    if (hay.includes(norm)) {
      results.push({
        type: "Mô-đun",
        title: mod.name,
        sub: mod.desc,
        app: mod.id,
        icon: mod.ic,
        score: 800,
      });
    }
  }

  for (const exp of EXPERIMENTS_85) {
    const hay = normalizeVn(
      `${exp.title} ${exp.topic} ${exp.chem.join(" ")} ${exp.eq.join(" ")} ${exp.observe.join(" ")}`
    );
    if (hay.includes(norm)) {
      results.push({
        type: "Thí nghiệm",
        title: exp.title,
        sub: `Lớp ${exp.grade} · ${exp.topic}`,
        app: "lab",
        params: { id: exp.id },
        icon: "flask",
        score: 700,
      });
    }
  }

  for (const el of elements) {
    const hay = normalizeVn(`${el.name} ${el.sym} z ${el.z}`);
    if (hay.includes(norm)) {
      results.push({
        type: "Nguyên tố",
        title: `${el.name} (${el.sym})`,
        sub: `Z = ${el.z} · chu kỳ ${el.period}`,
        app: "periodic",
        params: { z: String(el.z) },
        icon: "table",
        score: el.sym.toLowerCase() === q.toLowerCase() ? 9000 : 500,
      });
    }
  }

  return results.sort((a, b) => b.score - a.score).slice(0, limit);
}
