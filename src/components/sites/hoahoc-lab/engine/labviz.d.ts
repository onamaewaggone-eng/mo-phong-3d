import type { LabVisualTimeline } from "../data/experiments";
export class L {
  burnerManual: boolean;
  constructor(canvas: HTMLCanvasElement);
  setVisual(v: LabVisualTimeline): void;
  resize(): void;
  draw(t: number): void;
}
