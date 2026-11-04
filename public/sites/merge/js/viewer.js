import * as THREE from "./vendor/three.module.js";
import { OrbitControls } from "./vendor/OrbitControls.js";
import { ionicParts, ionColor, ionStructure } from "./ionic.js";
import { formulaUnitLayout, ionBounds } from "./ionic-layout.js";
import { crystalFragment, periodicNeighbours } from "./crystallography.js";
import {electronShells} from './periodic-data.js';

export const CPK_PALETTE = {
  H: "#FFFFFF",    // Trắng tinh
  He: "#D9FFFF",   // Cyan cực nhạt
  Li: "#FF66B2",   // Hồng rực rỡ (CPK Pink)
  Be: "#C2FF00",   // Xanh mạ
  B: "#FFB5B5",    // Hồng nhạt
  C: "#808080",    // Xám chuẩn CPK
  N: "#3050F8",    // Xanh lam
  O: "#FF0D0D",    // Đỏ cờ rực rỡ
  F: "#90E050",    // Xanh lục nhạt
  Ne: "#B3E3F5",
  Na: "#AB5CF2",   // Tím violet
  Mg: "#8AFF00",   // Xanh lục sáng
  Al: "#BFA6A6",   // Xám bạc
  Si: "#F0C8A0",   // Vàng đất
  P: "#FF8000",    // Cam
  S: "#FFFF30",    // Vàng chanh
  Cl: "#1FF01F",   // Xanh lục tươi
  Ar: "#80D1E3",
  K: "#8F40D4",    // Tím đậm
  Ca: "#3DFF00",   // Xanh lục đậm
  Sc: "#E6E6E6",
  Ti: "#BFC2C7",
  V: "#A6A6AB",
  Cr: "#8A99C7",
  Mn: "#9C7AC7",
  Fe: "#E06633",   // Cam đỏ
  Co: "#F090A0",
  Ni: "#50D050",
  Cu: "#C88033",   // Nâu đồng
  Zn: "#7D80B0",   // Xanh xám
  Br: "#A62929",   // Nâu đỏ
  Ag: "#C0C0C0",   // Bạc
  I: "#940094",    // Tím
  Ba: "#00C900",   // Lục
  Au: "#FFD123",   // Vàng gold
  Pb: "#575961",   // Chì xám
};

import { bondDescription, moleculeBondDescription, ionBondDescription, bondGlyph, bondLabelPosition, groupLabelPosition, resonanceGroups, piGroupDescription, structureParts, structureSVG, nonMolecularIons } from "./bond-study.js";

// Every electron on one shell shares its advance and plane rotation. Fixed
// angular spacing prevents overtaking; radial gaps separate different shells.
// This is a counting aid, not a trajectory from quantum mechanics.
export function orbitMetrics(shell, bohr = false) {
  const n = shell + 1;
  const radius = bohr ? n * n : 0.95 + (Math.pow(n, 1.35) - 1) * 0.43;
  const speed = 0.9 / n;
  return { n, radius, speed, omega: speed / radius };
}
export function orbitState(shell, time, bohr = false) {
  const sign = shell % 2 ? -1 : 1;
  const { omega } = orbitMetrics(shell, bohr);
  const t = time * omega;
  return {
    angle: sign * t,
    rotation: [
      (shell % 2 ? 0.22 : -0.18) +
        (bohr ? 0 : 0.16) * (Math.sin(t * 0.18 + shell) - Math.sin(shell)),
      shell * 0.08 +
        (bohr ? 0 : 0.14) *
          (Math.sin(t * 0.13 + shell * 0.7) - Math.sin(shell * 0.7)),
      bohr ? 0 : sign * t * 0.07,
    ],
  };
}

const profiles = {
  low: {
    ratio: 1,
    fps: 30,
    sphere: [24, 16],
    cloud: [24, 16],
    ring: 64,
    pixels: 1_200_000,
  },
  balanced: {
    ratio: 1.25,
    fps: 45,
    sphere: [32, 24],
    cloud: [32, 20],
    ring: 96,
    pixels: 2_200_000,
  },
  high: {
    ratio: 2,
    fps: 60,
    sphere: [48, 32],
    cloud: [40, 28],
    ring: 160,
    pixels: 5_000_000,
  },
};

// Bake a small studio reflection once. It adds soft highlights without a
// shadow map, bloom pass, network texture or another WebGL renderer.
function studioEnvironment(renderer) {
  const faces = Array.from({ length: 6 }, (_, i) => {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 128;
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, 0, 128);
    gradient.addColorStop(0, "#8da9b8");
    gradient.addColorStop(0.5, "#283c50");
    gradient.addColorStop(1, "#101d2c");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 128, 128);
    if ([0, 2, 4].includes(i)) {
      ctx.fillStyle = i === 2 ? "#eefcff" : "#c7f1ee";
      ctx.fillRect(24, 16, 40, 52);
      ctx.fillStyle = "#d4e1fc";
      ctx.fillRect(83, 25, 15, 39);
    }
    return canvas;
  });
  const cube = new THREE.CubeTexture(faces);
  cube.colorSpace = THREE.SRGBColorSpace;
  cube.needsUpdate = true;
  const generator = new THREE.PMREMGenerator(renderer);
  const result = generator.fromCubemap(cube);
  generator.dispose();
  cube.dispose();
  return result;
}

// Angular filaments, without spline smoothing that would turn them into arcs.
class FieldArc extends THREE.Curve {
  constructor(points) {
    super();
    this.points = points;
  }
  getPoint(t, target = new THREE.Vector3()) {
    const step = Math.min(t, 1) * (this.points.length - 1);
    const index = Math.min(Math.floor(step), this.points.length - 2);
    return target
      .copy(this.points[index])
      .lerp(this.points[index + 1], step - index);
  }
}

export class ChemistryViewer {
  constructor(mount, elements, options = {}) {
    this.elements = new Map(elements.map((e) => [e.symbol, e]));
    this.electronsPaused = matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    this.movingElectrons = [];
    this.movingOrbits = [];
    this.electronTime = 0;
    this.reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    this.fieldPaused = this.reducedMotion;
    try {
      const preference = localStorage.getItem("chemistry.fieldMotion");
      if (["running", "paused"].includes(preference))
        this.fieldPaused = preference === "paused";
    } catch {}
    this.compoundRepresentation = "unit";
    this.fieldMaterial = null;
    this.fieldTime = 0;
    this.spin = false;
    this.atomClouds = false;
    this.nucleus = false;
    this.clouds = this.atomClouds;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    this.camera.position.set(0, 1.1, 8.8);
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    this.renderer.setClearColor(0, 0);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;
    this.environmentTarget = studioEnvironment(this.renderer);
    this.scene.environment = this.environmentTarget.texture;
    const gl = this.renderer.getContext(),
      debug = gl.getExtension("WEBGL_debug_renderer_info");
    this.gpuName = debug
      ? gl.getParameter(debug.UNMASKED_RENDERER_WEBGL)
      : gl.getParameter(gl.RENDERER);
    this.softwareRenderer = /swiftshader|llvmpipe|software|basic render/i.test(
      this.gpuName,
    );
    this.renderer.domElement.dataset.renderer = this.gpuName;
    let quality = "auto";
    try {
      quality = localStorage.getItem("chemistry.graphicsQuality") || "auto";
    } catch {}
    this.setQuality(quality);
    this.renderer.domElement.addEventListener("webglcontextrestored", () => {
      this.dirty = true;
    });
    mount.append(this.renderer.domElement);
    this.mount = mount;
    this.view2D = false;
    this.bondLabels = false;
    this.bondRepresentation = 'school';
    this.bondAnnotations = [];
    this.bondLayer = document.createElement("div");
    this.bondLayer.className = "bond-annotations";
    this.bondLayer.hidden = true;
    this.structureSurface = document.createElement("div");
    this.structureSurface.className = "structure-surface";
    this.structureSurface.hidden = true;
    mount.append(this.bondLayer, this.structureSurface);
    this.structureSurface.addEventListener("pointermove", e => {
      if (!e.buttons) this.onModelHover?.(this.nearModel(e.clientX, e.clientY), e);
    });
    this.structureSurface.addEventListener("pointerleave", e => this.onModelHover?.(false, e));
    const pick = e => {
      const atom = e.target.closest(".structure-atom");
      if (!atom) return;
      const mesh = this.atomMeshes.find(m=>m.userData.symbol===atom.dataset.symbol);
      if (mesh) { mesh.userData.structureTarget = atom; this.onPick?.(mesh,e); }
    };
    this.structureSurface.addEventListener("click", pick);
    this.structureSurface.addEventListener("keydown", e => {
      if (["Enter", " "].includes(e.key) && e.target.closest(".structure-atom")) { e.preventDefault(); pick(e); }
    });
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.addEventListener("change", () => {
      this.dirty = true;
    });
    this.resizeFitEnabled = true;
    this.hoverBounds = null;
    const ray = new THREE.Raycaster(),
      pointer = new THREE.Vector2();
    let down = null;
    this.renderer.domElement.addEventListener("pointerdown", (e) => {
      down = { x: e.clientX, y: e.clientY, button: e.button };
      this.onModelHover?.(false, e);
    });
    this.renderer.domElement.addEventListener("pointermove", (e) => {
      if (!down && !e.buttons && e.pointerType === "mouse")
        this.onModelHover?.(this.nearModel(e.clientX, e.clientY), e);
    });
    this.renderer.domElement.addEventListener("pointerleave", (e) => {
      this.onModelHover?.(false, e);
    });
    this.renderer.domElement.addEventListener("pointercancel", () => {
      down = null;
    });
    this.renderer.domElement.addEventListener("pointerup", (e) => {
      if (
        !down ||
        down.button !== 0 ||
        Math.hypot(e.clientX - down.x, e.clientY - down.y) > 6
      ) {
        down = null;
        return;
      }
      down = null;
      const bounds = this.renderer.domElement.getBoundingClientRect();
      pointer.set(
        ((e.clientX - bounds.left) / bounds.width) * 2 - 1,
        1 - ((e.clientY - bounds.top) / bounds.height) * 2,
      );
      ray.setFromCamera(pointer, this.camera);
      const hit = ray.intersectObjects(this.atomMeshes ?? [], false)[0];
      if (hit) this.onPick?.(hit.object, e);
    });
    this.controls.minDistance = 3.2;
    this.controls.maxDistance = 22;
    this.controls.maxPolarAngle = Math.PI;
    this.scene.add(new THREE.AmbientLight(0xffffff, 2.2));
    let light = new THREE.DirectionalLight(0xffffff, 3.5);
    light.position.set(5, 8, 6);
    this.scene.add(light);
    light = new THREE.DirectionalLight(0xa5d5ff, 2.0);
    light.position.set(-6, -3, -4);
    this.scene.add(light);
    light = new THREE.DirectionalLight(0xffeedd, 1.5);
    light.position.set(0, 6, -5);
    this.scene.add(light);
    // A fixed light pool gives depth without bloom passes or shadow maps.
    const shadowCanvas = document.createElement("canvas");
    shadowCanvas.width = shadowCanvas.height = 128;
    const shadowContext = shadowCanvas.getContext("2d");
    const gradient = shadowContext.createRadialGradient(64, 64, 5, 64, 64, 64);
    gradient.addColorStop(0, "rgba(74, 159, 208, .20)");
    gradient.addColorStop(1, "rgba(74, 159, 208, 0)");
    shadowContext.fillStyle = gradient;
    shadowContext.fillRect(0, 0, 128, 128);
    const shadow = new THREE.Mesh(
      new THREE.PlaneGeometry(5, 5),
      new THREE.MeshBasicMaterial({
        map: new THREE.CanvasTexture(shadowCanvas),
        transparent: true,
        depthWrite: false,
      }),
    );
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = -2.6;
    shadow.visible = !options.transparentStage;
    this.scene.add(shadow);
    const floor = new THREE.GridHelper(16, 32, 0x527b9a, 0x33546b);
    floor.position.y = -2.6;
    floor.material.transparent = true;
    floor.material.opacity = 0.35;
    floor.material.depthWrite = false;
    floor.visible = !options.transparentStage;
    this.scene.add(floor);
    this.renderer.domElement.dataset.floorGridY = String(floor.position.y);
    this.group = new THREE.Group();
    this.scene.add(this.group);
    this.electronGroup = new THREE.Group();
    this.group.add(this.electronGroup);
    this.resize = () => {
      let w = mount.clientWidth,
        h = mount.clientHeight;
      if (w && h) {
        if (!this.freezeDrawingBuffer) {
          this.renderer.setPixelRatio(
            Math.min(
              devicePixelRatio || 1,
              this.profile.ratio,
              Math.sqrt(this.profile.pixels / (w * h)),
            ),
          );
          this.renderer.setSize(w, h);
        } else {
          this.renderer.domElement.style.width = `${w}px`;
          this.renderer.domElement.style.height = `${h}px`;
        }
        this.renderer.domElement.dataset.pixelRatio = String(
          this.renderer.getPixelRatio(),
        );
        this.camera.aspect = w / h;
        this.camera.updateProjectionMatrix();
        this.dirty = true;
        if (this.resizeFitEnabled) this.needsFit = true;
      }
    };
    this.observer = new ResizeObserver(this.resize);
    this.observer.observe(mount);
    this.resize();
    this.last = performance.now();
    this.explodeUntil = 0;
    const frame = (now) => {
      this.animation = requestAnimationFrame(frame);
      if (document.hidden || this.suspended) {
        this.last = now;
        return;
      }
      const dt = Math.min(0.05, (now - this.last) / 1000);
      this.last = now;
      if (this.needsFit && this.group.children.length) {
        const box = new THREE.Box3().setFromObject(this.group);
        this.hoverBounds = box.clone();
        const vertical = Math.max(Math.abs(box.min.y), Math.abs(box.max.y));
        const fitHeight = this.fitViewport?.height ?? mount.clientHeight;
        const fitAspect = this.fitViewport?.aspect ?? this.camera.aspect;
        const horizontal =
          Math.max(Math.abs(box.min.x), Math.abs(box.max.x)) / fitAspect;
        const depth = Math.max(Math.abs(box.min.z), Math.abs(box.max.z));
        const compact = fitHeight < 300;
        // Reserve space for the title and view controls. Include the nearest
        // depth face: a cube needs more room than a flat molecule.
        const safeHeight =
          document.body.classList.contains("compact-landscape") ? 1.08 : fitHeight / Math.max(100, fitHeight - (this.fitPadding ?? (compact ? 65 : 125)));
        this.viewCentre = vertical * 0.08;
        this.modelDistance = Math.max(
          4.4,
          (Math.max(vertical * safeHeight, horizontal * 1.12) /
            Math.tan(THREE.MathUtils.degToRad(20))) *
            1.06 +
            depth,
        );
        this.controls.maxDistance = Math.max(22, this.modelDistance * 2);
        this.camera.position.set(
          0,
          this.modelDistance * 0.125 + this.viewCentre,
          this.modelDistance,
        );
        this.controls.target.set(0, this.viewCentre, 0);
        this.needsFit = false;
      }
      if (this.view2D) {
        this.beforeRender?.();
        this.afterRender?.();
        return;
      }
      if (this.spin) this.group.rotation.y += dt * 0.22;
      const electronMotion =
        !this.electronsPaused && this.movingElectrons.length > 0;
      if (electronMotion) {
        this.electronTime += dt;
        this.positionElectrons();
      }
      const fieldMotion = Boolean(this.fieldMaterial && !this.fieldPaused);
      if (fieldMotion) {
        this.fieldTime += dt;
        this.fieldMaterial.uniforms.time.value = this.fieldTime;
      }
      if (this.explodeUntil > now) {
        const t = 1 - (this.explodeUntil - now) / 3000;
        if (this.fieldMaterial)
          this.fieldMaterial.uniforms.expansion.value =
            1 + 1.4 * (1 - t) * (1 - t);
        for (const mesh of this.atomMeshes ?? []) {
          mesh.position
            .copy(mesh.userData.target)
            .multiplyScalar(1 + 1.4 * (1 - t) * (1 - t));
        }
      }
      if (this.explodeUntil && now >= this.explodeUntil) {
        for (const mesh of this.atomMeshes ?? [])
          mesh.position.copy(mesh.userData.target);
        this.explodeUntil = 0;
        if (this.fieldMaterial) this.fieldMaterial.uniforms.expansion.value = 1;
        this.dirty = true;
      }
      this.controls.update();
      if (
        (this.dirty ||
          this.spin ||
          electronMotion ||
          fieldMotion ||
          this.explodeUntil > now) &&
        now - (this.lastRender ?? 0) >= 1000 / this.profile.fps
      ) {
        this.beforeRender?.();
        this.updateBondAnnotations();
        this.renderer.render(this.scene, this.camera);
        this.lastRender = now;
        this.renderer.domElement.dataset.triangles = String(
          this.renderer.info.render.triangles,
        );
        this.renderer.domElement.dataset.renderCount = String(
          this.renderer.info.render.frame,
        );
        this.renderer.domElement.dataset.cloudCount = String(
          this.electronGroup.children.filter((o) => o.userData.cloud).length,
        );
        this.renderer.domElement.dataset.electronCount = String(
          this.movingElectrons.length,
        );
        this.renderer.domElement.dataset.electronMotion = electronMotion
          ? "running"
          : "paused";
        this.renderer.domElement.dataset.electronTime = String(
          this.electronTime,
        );
        this.renderer.domElement.dataset.fieldTime = this.fieldTime.toFixed(3);
        this.renderer.domElement.dataset.fieldMotion = fieldMotion
          ? "running"
          : "static";
        if (this.movingElectrons.length) {
          this.renderer.domElement.dataset.electronSample =
            this.movingElectrons[0].position
              .toArray()
              .map((n) => n.toFixed(4))
              .join(",");
          this.renderer.domElement.dataset.orbitSample =
            this.movingOrbits[0].rotation
              .toArray()
              .slice(0, 3)
              .map((n) => n.toFixed(4))
              .join(",");
        }
        this.dirty = false;
        this.afterRender?.();
      }
    };
    this.animation = requestAnimationFrame(frame);
  }
  nearModel(x, y) {
    const box = this.projectedModelRect();
    return (
      box &&
      x >= box.left - 8 &&
      x <= box.right + 8 &&
      y >= box.top - 8 &&
      y <= box.bottom + 8
    );
  }
  projectedModelRect() {
    if (this.view2D) {
      const svg = this.structureSurface.querySelector("svg");
      if (!svg) return null;
      const box = svg.getBBox(), matrix = svg.getScreenCTM();
      const first = new DOMPoint(box.x,box.y).matrixTransform(matrix);
      const last = new DOMPoint(box.x+box.width,box.y+box.height).matrixTransform(matrix);
      return {left:first.x,top:first.y,right:last.x,bottom:last.y,width:last.x-first.x,height:last.y-first.y};
    }
    if (!this.hoverBounds || this.needsFit) return null;
    const rect = this.renderer.domElement.getBoundingClientRect();
    const xs = [],
      ys = [];
    this.group.updateWorldMatrix(true, false);
    for (const bx of [this.hoverBounds.min.x, this.hoverBounds.max.x])
      for (const by of [this.hoverBounds.min.y, this.hoverBounds.max.y])
        for (const bz of [this.hoverBounds.min.z, this.hoverBounds.max.z]) {
          const point = new THREE.Vector3(bx, by, bz)
            .applyMatrix4(this.group.matrixWorld)
            .project(this.camera);
          xs.push(rect.left + ((point.x + 1) * rect.width) / 2);
          ys.push(rect.top + ((1 - point.y) * rect.height) / 2);
        }
    return {
      left: Math.min(...xs),
      right: Math.max(...xs),
      top: Math.min(...ys),
      bottom: Math.max(...ys),
    };
  }
  projectAtom(mesh) {
    if (this.view2D) {
      const target = mesh.userData.structureTarget?.isConnected ? mesh.userData.structureTarget :
        this.structureSurface.querySelector(`[data-symbol="${mesh.userData.symbol}"]`);
      const rect = target?.getBoundingClientRect();
      if (rect) return {x:rect.x+rect.width/2,y:rect.y+rect.height/2,visible:true,symbol:mesh.userData.symbol,radius:rect.width/2};
    }
    const rect = this.renderer.domElement.getBoundingClientRect();
    const centre = mesh.getWorldPosition(new THREE.Vector3());
    const point = centre.clone().project(this.camera);
    const edge = centre
      .clone()
      .addScaledVector(
        new THREE.Vector3().setFromMatrixColumn(this.camera.matrixWorld, 0),
        (mesh.geometry.parameters?.radius ?? 0) * mesh.scale.x,
      )
      .project(this.camera);
    return {
      x: rect.left + ((point.x + 1) * rect.width) / 2,
      y: rect.top + ((1 - point.y) * rect.height) / 2,
      visible: point.z >= -1 && point.z <= 1,
      symbol: mesh.userData.symbol,
      radius: Math.hypot(
        ((edge.x - point.x) * rect.width) / 2,
        ((edge.y - point.y) * rect.height) / 2,
      ),
    };
  }
  setQuality(preference) {
    this.quality = ["auto", "low", "high"].includes(preference)
      ? preference
      : "auto";
    const strong = /RTX|GTX|Radeon.*(RX|Pro)|Apple M[2-9]/i.test(this.gpuName);
    this.resolvedQuality =
      this.quality === "auto"
        ? this.softwareRenderer
          ? "low"
          : strong
            ? "high"
            : "balanced"
        : this.quality;
    this.profile = profiles[this.resolvedQuality];
    this.renderer.domElement.dataset.quality = this.resolvedQuality;
    this.renderer.domElement.dataset.frameLimit = String(this.profile.fps);
    try {
      localStorage.setItem("chemistry.graphicsQuality", this.quality);
    } catch {}
    this.resize?.();
    this.dirty = true;
  }
  pauseField(paused) {
    this.fieldPaused = paused;
    if (this.fieldMaterial)
      this.fieldMaterial.uniforms.motion.value = paused ? 0 : 1;
    try {
      localStorage.setItem(
        "chemistry.fieldMotion",
        paused ? "paused" : "running",
      );
    } catch {}
    this.dirty = true;
  }
  isModelSurface(target) {
    return target === this.renderer.domElement ||
      (this.view2D && this.structureSurface.contains(target));
  }
  reserve2DSide(side, width = 0) {
    this.structureSurface.style.paddingLeft = side === "left" ? `${width+12}px` : "";
    this.structureSurface.style.paddingRight = side === "right" ? `${width+12}px` : "";
  }
  addBondAnnotation(position, description, start, end, members) {
    const tag = document.createElement("span");
    tag.className = "bond-tag " + description.kind;
    tag.textContent = bondGlyph(description);
    tag.title = description.label+": "+description.title;
    tag.dataset.label = description.label;
    tag.dataset.scope = description.scope || "bond";
    tag.dataset.kind = description.kind;
    if(description.order)tag.dataset.order=description.order;
    if(members) tag.classList.add("resonance-group");
    this.bondLayer.append(tag);
    this.bondAnnotations.push({position, tag, start, end, members});
  }
  addResonanceAnnotations(graph, species, positions, sharedNetwork=false) {
    if(this.bondRepresentation!=='resonance' && !sharedNetwork)return;
    for(const shared of resonanceGroups(graph,species)) {
      const members=shared.atoms.map(i=>new THREE.Vector3(...positions[i]));
      const centre=members.reduce((v,p)=>v.add(p),new THREE.Vector3()).divideScalar(members.length);
      const title=sharedNetwork ? 'Hệ π không định xứ trên lớp graphite; các nét C–C biểu diễn khung σ, không phải toàn bộ liên kết chỉ có σ' : shared.title;
      this.addBondAnnotation(centre,piGroupDescription(title),undefined,undefined,members);
      this.bondAnnotations.at(-1).tag.dataset.bonds=shared.bonds.join(',');
    }
  }
  updateBondAnnotations() {
    this.bondLayer.hidden = !this.bondLabels || this.view2D || !this.currentCompound;
    if (this.bondLayer.hidden) return;
    this.group.updateWorldMatrix(true, false);
    this.camera.updateMatrixWorld();
    const width = this.mount.clientWidth, height = this.mount.clientHeight;
    const rect = this.mount.getBoundingClientRect();
    const obstacles = this.atomMeshes.slice(0,180).map(mesh=>this.projectAtom(mesh)).filter(p=>p.visible)
      .map(p=>({left:p.x-rect.left-p.radius,right:p.x-rect.left+p.radius,
        top:p.y-rect.top-p.radius,bottom:p.y-rect.top+p.radius}));
    const fontKey = window.innerWidth > 700 ? "normal" : "small";
    for (const item of this.bondAnnotations) {
      if (item.fontKey !== fontKey || !item.width) {
        item.width = item.tag.offsetWidth;
        item.height = item.tag.offsetHeight;
        item.fontKey = fontKey;
      }
    }
    for (const {position,tag,start,end,members,width:labelWidth,height:labelHeight} of this.bondAnnotations) {
      const point = position.clone().applyMatrix4(this.group.matrixWorld).project(this.camera);
      tag.hidden = point.z < -1 || point.z > 1 || Math.abs(point.x)>1 || Math.abs(point.y)>1;
      const anchor=[(point.x+1)*width/2,(1-point.y)*height/2];
      let a=[anchor[0]-1,anchor[1]], b=[anchor[0]+1,anchor[1]];
      if (start && end) {
        const ap=start.clone().applyMatrix4(this.group.matrixWorld).project(this.camera);
        const bp=end.clone().applyMatrix4(this.group.matrixWorld).project(this.camera);
        a=[(ap.x+1)*width/2,(1-ap.y)*height/2];
        b=[(bp.x+1)*width/2,(1-bp.y)*height/2];
      }
      const gap=tag.classList.contains("ionic") ? 15 : 10;
      const projected=members?.map(p=>{
        const v=p.clone().applyMatrix4(this.group.matrixWorld).project(this.camera);
        return [(v.x+1)*width/2,(1-v.y)*height/2];
      });
      const placed=projected ? groupLabelPosition(projected,[labelWidth||40,labelHeight||20],obstacles,{width,height}) :
        bondLabelPosition(a,b,[labelWidth||16,labelHeight||20],obstacles,{width,height},anchor,gap);
      if(this.bondAnnotations.length<150 && !tag.hidden) obstacles.push({...placed.box,label:true});
      tag.style.left = `${placed.x}px`;
      tag.style.top = `${placed.y}px`;
    }
  }
  setBondLabels(enabled) {
    this.bondLabels = Boolean(enabled);
    if (this.view2D) this.setView2D(true);
    this.updateBondAnnotations();
    this.dirty = true;
  }
  setView2D(enabled) {
    const diagram = enabled && structureSVG(this.currentCompound, this.bondLabels, this.bondRepresentation);
    this.view2D = Boolean(diagram);
    this.mount.classList.toggle("is-2d", this.view2D);
    this.structureSurface.hidden = !this.view2D;
    this.controls.enabled = !this.view2D;
    if (!this.view2D) this.reserve2DSide(null);
    if (diagram) {
      this.structureSurface.innerHTML = diagram.html;
      this.structureSurface.dataset.atomCount = diagram.atomCount;
    }
    this.renderer.domElement.dataset.viewDimension = this.view2D ? "2D" : "3D";
    this.renderer.domElement.dataset.bondLabels = String(this.bondLabels);
    this.renderer.domElement.dataset.bondRepresentation = this.bondRepresentation;
    this.updateBondAnnotations();
    this.dirty = true;
  }
  clear() {
    this.onModelChanged?.();
    this.hoverBounds = null;
    this.compactModel = false;
    this.currentCompound = null;
    this.view2D = false;
    this.mount.classList.remove("is-2d");
    this.structureSurface.hidden = true;
    this.bondLayer.hidden = true;
    this.bondLayer.replaceChildren();
    this.bondAnnotations = [];
    this.controls.enabled = true;
    this.renderer.domElement.dataset.viewDimension = "3D";
    for (const key of [
      "nuclearA",
      "protons",
      "neutrons",
      "modelMode",
      "nuclearEnvelopeColor",
      "nuclearEnvelopeOpacity",
      "nuclearEnvelopeTransparent",
      "nucleonRoughness",
      "electronSample",
      "orbitSample",
      "nuclearContentsVisible",
      "fieldCount",
      "fieldTime",
      "fieldMotion",
      "fieldStyle",
      "fieldControlPoints",
      "covalentBondCount",
      "networkDetail",
      "compoundRepresentation",
      "compoundAtomCounts",
      "formulaUnits",
      "orbitMetrics",
      "orbitScale",
      "crystalCode",
      "crystalCell",
      "crystalRepeats",
      "crystalCoordination",
      "molecularGeometry",
      "molecularBonds",
    ]) {
      delete this.renderer.domElement.dataset[key];
    }
    for (const child of [...this.group.children]) {
      this.group.remove(child);
      child.traverse((o) => {
        o.geometry?.dispose();
        if (o.isInstancedMesh) o.dispose();
        if (o.material) {
          const ms = Array.isArray(o.material) ? o.material : [o.material];
          for (const m of ms) {
            m.map?.dispose();
            m.dispose();
          }
        }
      });
    }
    this.group.rotation.set(0, 0, 0);
    this.electronGroup = new THREE.Group();
    this.group.add(this.electronGroup);
    this.atomMeshes = [];
    this.movingElectrons = [];
    this.movingOrbits = [];
    this.electronTime = 0;
    this.fieldMaterial = null;
    this.fieldTime = 0;
    this.explodeUntil = 0;
    this.dirty = true;
    this.needsFit = true;
  }
  reset() {
    const distance = this.modelDistance ?? 8.8;
    const centre = this.viewCentre ?? 0;
    this.camera.position.set(0, distance * 0.125 + centre, distance);
    this.controls.target.set(0, centre, 0);
    this.controls.update();
    this.group.rotation.set(0, 0, 0);
    this.dirty = true;
  }
  label(text, position, size = 0.48, color = "#e6f1ff") {
    const canvas = document.createElement("canvas");
    canvas.height = 128;
    let ctx = canvas.getContext("2d");
    ctx.font = "bold 50px Segoe UI";
    canvas.width = Math.max(256, Math.ceil(ctx.measureText(text).width + 40));
    ctx = canvas.getContext("2d");
    ctx.font = "bold 50px Segoe UI";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = color;
    ctx.shadowColor = "rgba(5, 15, 32, .95)";
    ctx.shadowBlur = 5;
    ctx.fillText(text, canvas.width / 2, 64);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    const sprite = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: texture,
        depthTest: false,
        toneMapped: false,
      }),
    );
    sprite.scale.set((size * canvas.width) / canvas.height, size, 1);
    sprite.position.copy(new THREE.Vector3(...position));
    this.group.add(sprite);
    return sprite;
  }
  sphere(symbol, position, radius = 0.4, label = true, override) {
    const e = this.elements.get(symbol);
    const color = override ?? CPK_PALETTE[symbol] ?? e?.color ?? "#78dec4";
    const mesh = new THREE.Mesh(
      new THREE.SphereGeometry(
        radius,
        ...(this.compactModel ? [20, 14] : this.profile.sphere),
      ),
      new THREE.MeshPhysicalMaterial({
        color,
        metalness: 0.05,
        roughness: 0.12,
        clearcoat: 1.0,
        clearcoatRoughness: 0.08,
        transmission: 0.28,
        ior: 1.5,
        thickness: 0.6,
        envMapIntensity: 1.2,
      }),
    );
    mesh.position.set(...position);
    mesh.userData.target = mesh.position.clone();
    mesh.userData.symbol = symbol;
    this.group.add(mesh);
    this.atomMeshes.push(mesh);
    if (label)
      this.label(
        symbol,
        [position[0], position[1] + radius + 0.12, position[2]],
        0.32,
      );
    return mesh;
  }
  bond(a, b, order = 1, cloudWidth = 0.28, description = bondDescription(order)) {
    order=description.order ?? order;
    const start = new THREE.Vector3(...a),
      end = new THREE.Vector3(...b);
    const direction = end.clone().sub(start);
    this.addBondAnnotation(start.clone().add(end).multiplyScalar(.5), description, start, end);
    const lateral = new THREE.Vector3(-direction.y, direction.x, 0);
    if (lateral.lengthSq() < 1e-8) lateral.set(1, 0, 0);
    else lateral.normalize();
    const strokes=description.partial ? 1 : order;
    for (let i = 0; i < strokes; i++) {
      const offset = (i - (strokes - 1) / 2) * 0.14;
      const s = start.clone().addScaledVector(lateral, offset),
        t = end.clone().addScaledVector(lateral, offset);
      const d = t.clone().sub(s);
      const mesh = new THREE.Mesh(
        new THREE.CylinderGeometry(0.05, 0.05, d.length(), 12),
        new THREE.MeshStandardMaterial({ color: 0xa7bfca, roughness: 0.4 }),
      );
      mesh.position.copy(s.add(t).multiplyScalar(0.5));
      mesh.quaternion.setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        d.normalize(),
      );
      mesh.userData.covalentBond = true;
      this.group.add(mesh);
    }
    // Donation direction belongs to the 2D structural formula. Keep the same
    // reviewed bond order and sigma/pi data here, without a 3D arrowhead.
    if(description.partial) {
      const axis=direction.clone().normalize();
      const line=new THREE.Line(new THREE.BufferGeometry().setFromPoints([
        start.clone().addScaledVector(axis,.20).addScaledVector(lateral,.10),
        end.clone().addScaledVector(axis,-.20).addScaledVector(lateral,.10)]),
        new THREE.LineDashedMaterial({color:0xc9b7f5,dashSize:.10,gapSize:.07,transparent:true,opacity:.8}));
      line.computeLineDistances();line.userData.delocalized=true;this.group.add(line);
    }
    if (this.clouds) {
      const midpoint = start.clone().add(end).multiplyScalar(0.5),
        axis = direction.clone().normalize();
      const cloud = this.cloud(
        midpoint,
        [cloudWidth, direction.length() * 0.54, cloudWidth],
        0x59cfb2,
      );
      cloud.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), axis);
      if (order >= 2 && !description.partial) {
        const perpendicular = lateral.clone();
        for (const sign of [-1, 1]) {
          const pi = this.cloud(
            midpoint.clone().addScaledVector(perpendicular, sign * 0.55),
            [0.35, direction.length() * 0.62, 0.32],
            0x7baaf1,
          );
          pi.quaternion.copy(cloud.quaternion);
        }
      }
      if (order >= 3 && !description.partial) {
        const perpendicular = new THREE.Vector3()
          .crossVectors(axis, lateral)
          .normalize();
        for (const sign of [-1, 1]) {
          const pi = this.cloud(
            midpoint.clone().addScaledVector(perpendicular, sign * 0.55),
            [0.35, direction.length() * 0.62, 0.32],
            0x7baaf1,
          );
          pi.quaternion.copy(cloud.quaternion);
        }
      }
    }
  }
  cloud(position, scale, color) {
    const mesh = new THREE.Mesh(
      new THREE.SphereGeometry(
        1,
        ...(this.compactModel ? [20, 12] : this.profile.cloud),
      ),
      new THREE.ShaderMaterial({
        uniforms: { tint: { value: new THREE.Color(color) } },
        vertexShader: `varying vec3 viewNormal; varying vec3 viewPosition; void main(){ vec4 p=modelViewMatrix*vec4(position,1.0); viewPosition=p.xyz; viewNormal=normalize(normalMatrix*normal); gl_Position=projectionMatrix*p; }`,
        fragmentShader: `uniform vec3 tint; varying vec3 viewNormal; varying vec3 viewPosition; void main(){ vec3 n=normalize(viewNormal); float rim=pow(1.0-abs(dot(n,normalize(-viewPosition))),2.0); float softbox=pow(max(0.0,dot(n,normalize(vec3(-0.35,0.55,1.0)))),28.0); float fill=pow(max(0.0,dot(n,normalize(vec3(0.7,0.15,1.0)))),44.0); vec3 colour=mix(tint*0.55,tint+vec3(0.3),rim)+vec3(0.8)*softbox+vec3(0.4)*fill; gl_FragColor=vec4(colour,0.16+0.54*rim+0.20*softbox); }`,
        transparent: true,
        depthWrite: false,
        side: THREE.FrontSide,
      }),
    );
    mesh.position.copy(position);
    mesh.scale.set(...scale);
    mesh.userData.cloud = true;
    this.electronGroup.add(mesh);
    return mesh;
  }
  atom(e) {
    e={...e,shells:electronShells(e,this.elements)};
    this.clouds = this.atomClouds;
    this.clear();
    if (this.nucleus) {
      this.nuclearCore(e);
      return;
    }
    const bohr = this.bohrScale && e.symbol === "H";
    this.nuclearEnvelope(e, bohr ? 0.12 : 0.62, 1);
    this.renderer.domElement.dataset.modelMode = "atom";
    this.renderer.domElement.dataset.compoundId = '';
    this.renderer.domElement.dataset.atomSymbol = e.symbol;
    this.renderer.domElement.dataset.configurationPredicted = String(/predicted|calculated/.test(e.configuration||''));
    this.renderer.domElement.dataset.nuclearContentsVisible = "false";
    this.label(
      e.symbol,
      [0, 0.05, bohr ? 0.16 : 0.72],
      bohr ? 0.16 : 0.7,
      "#f0f7ff",
    );
    if (!e.shells.length) {
      this.label("Chưa hỗ trợ lớp electron", [0, 1.5, 0], 0.6);
      return;
    }
    if (this.clouds && !bohr) {
      // Spherical shells are a qualitative density illustration, not orbital
      // wavefunctions or literal electron paths, especially for many-electron atoms.
      const count = Math.min(3, e.shells.length);
      for (let i = 0; i < count; i++) {
        const radius = 1.02 + i * 0.48;
        this.cloud(
          new THREE.Vector3(),
          [radius, radius, radius],
          i % 2 ? 0x7baaf1 : 0x59cfb2,
        );
      }
    }
    const shells = bohr
      ? [0, 0, 0, 0].map((_, i) => (i + 1 === (this.bohrN || 1) ? 1 : 0))
      : e.shells;
    this.renderer.domElement.dataset.orbitMetrics = JSON.stringify(
      shells.map((count, i) => ({ ...orbitMetrics(i, bohr), count })),
    );
    this.renderer.domElement.dataset.orbitScale = bohr
      ? "hydrogen-bohr"
      : "teaching";
    shells.forEach((count, index) => {
      const { radius } = orbitMetrics(index, bohr);
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(radius, 0.008, 6, this.profile.ring),
        new THREE.MeshBasicMaterial({
          color: 0x86c7e9,
          transparent: true,
          opacity: 0.7,
        }),
      );
      ring.rotation.x = index % 2 ? 0.22 : -0.18;
      ring.rotation.y = index * 0.08;
      const orbit = {
        index,
        rotation: ring.rotation,
        ring: this.clouds && !bohr ? null : ring,
        bohr,
      };
      this.movingOrbits.push(orbit);
      if (!this.clouds || bohr) this.electronGroup.add(ring);
      else {
        ring.geometry.dispose();
        ring.material.dispose();
      }
      for (let n = 0; n < count; n++) {
        const angle = (2 * Math.PI * n) / count + index * 0.3;
        const electron = new THREE.Mesh(
          new THREE.SphereGeometry(0.043, 10, 8),
          new THREE.MeshBasicMaterial({ color: 0xc4fff0 }),
        );
        electron.position.set(
          radius * Math.cos(angle),
          radius * Math.sin(angle),
          0,
        );
        electron.position.applyEuler(ring.rotation);
        electron.userData.motion = {
          radius,
          phase: angle,
          orbit,
        };
        this.electronGroup.add(electron);
        this.movingElectrons.push(electron);
      }
    });
  }
  positionElectrons() {
    for (const orbit of this.movingOrbits) {
      const pose = orbitState(orbit.index, this.electronTime, orbit.bohr);
      orbit.rotation.set(...pose.rotation);
      orbit.angle = pose.angle;
    }
    for (const mesh of this.movingElectrons) {
      const m = mesh.userData.motion;
      const angle = m.phase + m.orbit.angle;
      mesh.position
        .set(m.radius * Math.cos(angle), m.radius * Math.sin(angle), 0)
        .applyEuler(m.orbit.rotation);
    }
  }
  pauseElectrons(paused) {
    this.electronsPaused = paused;
    if (paused) this.electronTime = 0;
    this.positionElectrons();
    this.dirty = true;
  }
  nuclearCore(e, clusterRadius = 1.35) {
    const isotope = e.isotope;
    if (!isotope || isotope.a !== e.z + isotope.neutrons) {
      this.label("Chưa có dữ liệu đồng vị", [0, 0, 0], 0.5);
      return;
    }
    const positions = [];
    const extent = Math.ceil(Math.cbrt(isotope.a * 2)) + 1;
    // Close-packed spheres are an educational layout, not nucleon positions
    // or a nuclear-force simulation. A comes from a named NIST isotope.
    for (let x = -extent; x <= extent; x++) {
      for (let y = -extent; y <= extent; y++) {
        for (let z = -extent; z <= extent; z++) {
          if ((x + y + z) % 2 === 0) positions.push(new THREE.Vector3(x, y, z));
        }
      }
    }
    positions.sort(
      (a, b) =>
        a.lengthSq() - b.lengthSq() || a.x - b.x || a.y - b.y || a.z - b.z,
    );
    positions.length = isotope.a;
    const centre = positions
      .reduce((sum, p) => sum.add(p), new THREE.Vector3())
      .divideScalar(isotope.a);
    positions.forEach((p) => p.sub(centre));
    const extentRadius = Math.max(...positions.map((p) => p.length())) + 0.71;
    const scale = clusterRadius / extentRadius;
    const radius = scale * 0.72;
    const detail =
      this.resolvedQuality === "low"
        ? [12, 8]
        : this.resolvedQuality === "high"
          ? [20, 16]
          : [16, 12];
    const makeParticles = (count, colour) => {
      if (!count) return null;
      const mesh = new THREE.InstancedMesh(
        new THREE.SphereGeometry(radius, ...detail),
        new THREE.MeshPhysicalMaterial({
          color: colour,
          roughness: 0.65,
          metalness: 0,
          clearcoat: 0.12,
          clearcoatRoughness: 0.6,
          envMapIntensity: 0.25,
        }),
        count,
      );
      mesh.userData.target = mesh.position.clone();
      this.group.add(mesh);
      this.atomMeshes.push(mesh);
      return mesh;
    };
    const protons = makeParticles(e.z, 0xef8278);
    const neutrons = makeParticles(isotope.neutrons, 0x78b6ef);
    const matrix = new THREE.Matrix4();
    let pIndex = 0,
      nIndex = 0;
    positions.forEach((p, index) => {
      const proton =
        Math.floor(((index + 1) * e.z) / isotope.a) >
        Math.floor((index * e.z) / isotope.a);
      matrix.makeTranslation(p.x * scale, p.y * scale, p.z * scale);
      if (proton) protons.setMatrixAt(pIndex++, matrix);
      else neutrons.setMatrixAt(nIndex++, matrix);
    });
    protons.instanceMatrix.needsUpdate = true;
    if (neutrons) neutrons.instanceMatrix.needsUpdate = true;
    this.nuclearEnvelope(e, clusterRadius * 1.1);
    Object.assign(this.renderer.domElement.dataset, {
      modelMode: "nucleus",
      nuclearContentsVisible: "true",
      nuclearA: String(isotope.a),
      protons: String(pIndex),
      neutrons: String(nIndex),
      nucleonRoughness: "0.65",
    });
  }
  nuclearEnvelope(e, radius, opacity = 0.16) {
    const color = CPK_PALETTE[e.symbol] ?? e.color;
    const envelope = new THREE.Mesh(
      new THREE.SphereGeometry(radius, ...this.profile.sphere),
      new THREE.MeshPhysicalMaterial({
        color: color,
        transparent: opacity < 1,
        opacity,
        depthWrite: opacity === 1,
        roughness: opacity === 1 ? 0.15 : 0.58,
        metalness: 0.05,
        clearcoat: opacity === 1 ? 1.0 : 0.1,
        clearcoatRoughness: 0.08,
        transmission: opacity === 1 ? 0.25 : 0,
        ior: 1.5,
        thickness: 0.5,
        envMapIntensity: opacity === 1 ? 1.0 : 0.15,
      }),
    );
    envelope.userData.target = envelope.position.clone();
    this.group.add(envelope);
    this.atomMeshes.push(envelope);
    this.renderer.domElement.dataset.nuclearEnvelopeColor = e.color;
    this.renderer.domElement.dataset.nuclearEnvelopeOpacity = String(
      envelope.material.opacity,
    );
    this.renderer.domElement.dataset.nuclearEnvelopeTransparent = String(
      envelope.material.transparent,
    );
  }
  molecule(c) {
    if(this.currentCompound?.id!==c.id)this.bondRepresentation='school';
    const restore2D = this.view2D;
    if (c.solubility === "solution" || !c.crystal)
      this.compoundRepresentation = "unit";
    this.clouds = true;
    this.clear();
    this.currentCompound = c;
    this.view2D = restore2D && structureParts(c).length > 0;
    this.compactModel =
      (c.model?.atoms.length ||
        Object.values(c.atoms).reduce((n, x) => n + x, 0)) > 60;
    this.renderer.domElement.dataset.modelMode = "molecule";
    if (c.crystal && this.compoundRepresentation === "lattice") {
      this.crystal(c);
      this.recordCompoundModel();
      return;
    }
    if (c.model) {
      this.structuredMolecule(c);
      this.recordCompoundModel();
      return;
    }
    let atoms = [],
      bonds = [];
    if (c.kind === "ionic") {
      this.ionic(c);
      this.recordCompoundModel();
      return;
    }
    if (c.kind === "network") {
      if (c.id === "SiO2")
        this.silica(this.compoundRepresentation === "lattice");
      else if (this.compoundRepresentation === "lattice") this.network(c);
      else {
        const atoms = Object.entries(c.atoms).flatMap(([s, n]) =>
          Array(n).fill(s),
        );
        atoms.forEach((s, i) =>
          this.sphere(s, [(i - (atoms.length - 1) / 2) * 1.3, 0, 0], 0.4),
        );
        this.label("Tỉ lệ nguyên tử · đơn vị công thức", [0, -1, 0], 0.42);
      }
      this.recordCompoundModel();
      return;
    }
    if (c.kind === "metal") {
      if (this.compoundRepresentation === "unit") {
        this.sphere(c.id, [0, 0, 0], 0.5);
        this.recordCompoundModel();
        return;
      }
      for (let x = -1; x <= 1; x++)
        for (let y = -1; y <= 1; y++)
          for (let z = -1; z <= 1; z++)
            this.sphere(c.id, [x * 0.85, y * 0.85, z * 0.85], 0.33, false);
      this.label("Mảnh mạng kim loại", [0, 1.55, 0], 0.6);
      this.recordCompoundModel();
      return;
    }
    if (c.id === "H2O") {
      const a = (52.25 * Math.PI) / 180;
      atoms = [
        ["O", 0, 0, 0],
        ["H", -1.55 * Math.sin(a), 1.55 * Math.cos(a), 0],
        ["H", 1.55 * Math.sin(a), 1.55 * Math.cos(a), 0],
      ];
      bonds = [
        [0, 1, 1],
        [0, 2, 1],
      ];
      this.label("104,5°", [0, 1.55, 0], 0.42);
    } else if (c.id === "CO2") {
      atoms = [
        ["C", 0, 0, 0],
        ["O", -1.65, 0, 0],
        ["O", 1.65, 0, 0],
      ];
      bonds = [
        [0, 1, 2],
        [0, 2, 2],
      ];
    } else if (c.id === "CH4") {
      atoms = [
        ["C", 0, 0, 0],
        ["H", 0.95, 0.95, 0.95],
        ["H", -0.95, -0.95, 0.95],
        ["H", -0.95, 0.95, -0.95],
        ["H", 0.95, -0.95, -0.95],
      ];
      bonds = [
        [0, 1, 1],
        [0, 2, 1],
        [0, 3, 1],
        [0, 4, 1],
      ];
    } else if (c.id === "NH3") {
      atoms = [
        ["N", 0, 0.35, 0],
        ["H", 1.15, -0.4, 0.65],
        ["H", -1.15, -0.4, 0.65],
        ["H", 0, -0.4, -1.3],
      ];
      bonds = [
        [0, 1, 1],
        [0, 2, 1],
        [0, 3, 1],
      ];
    } else if (c.id === "H2O2") {
      atoms = [
        ["O", -0.65, 0, 0],
        ["O", 0.65, 0, 0],
        ["H", -1.35, 0.8, 0.35],
        ["H", 1.35, -0.8, 0.35],
      ];
      bonds = [
        [0, 1, 1],
        [0, 2, 1],
        [1, 3, 1],
      ];
    } else {
      let ids = Object.entries(c.atoms).flatMap(([s, n]) => Array(n).fill(s));
      atoms = ids.map((s, i) => [s, (i - (ids.length - 1) / 2) * 1.35, 0, 0]);
      bonds = [[0, 1, c.id === "O2" ? 2 : c.id === "CO" ? 3 : 1]];
    }
    atoms.forEach(([s, ...p]) => this.sphere(s, p, s === "H" ? 0.27 : 0.49));
    bonds.forEach(([a, b, n],index) =>
      this.bond(atoms[a].slice(1), atoms[b].slice(1), n, .28, moleculeBondDescription(c.id,index,n,this.bondRepresentation)),
    );
    if (c.id === "H2O") {
      for (const [a, b] of bonds) {
        const pa = new THREE.Vector3(...atoms[a].slice(1)),
          pb = new THREE.Vector3(...atoms[b].slice(1)),
          direction = pb.clone().sub(pa),
          perpendicular = new THREE.Vector3(
            -direction.y,
            direction.x,
            0,
          ).normalize(),
          middle = pa.clone().add(pb).multiplyScalar(0.5);
        for (const d of [-0.1, 0.1]) {
          const mesh = new THREE.Mesh(
            new THREE.SphereGeometry(0.045, 10, 8),
            new THREE.MeshBasicMaterial({ color: 0x85efc8, toneMapped: false }),
          );
          mesh.position
            .copy(middle)
            .add(perpendicular.clone().multiplyScalar(d));
          this.electronGroup.add(mesh);
        }
      }
      for (const x of [-0.5, 0.5])
        for (const d of [-0.075, 0.075]) {
          const mesh = new THREE.Mesh(
            new THREE.SphereGeometry(0.045, 10, 8),
            new THREE.MeshBasicMaterial({ color: 0xc6b4ff, toneMapped: false }),
          );
          mesh.position.set(x + d, -0.65, 0);
          this.electronGroup.add(mesh);
        }
      if (this.clouds)
        for (const x of [-0.5, 0.5]) {
          const lobe = this.cloud(
            new THREE.Vector3(x, -0.75, 0),
            [0.3, 0.65, 0.3],
            0xb7a0ff,
          );
          lobe.rotation.z = x < 0 ? -0.5 : 0.5;
        }
    } else if (c.id === "NH3" && this.clouds) {
      this.cloud(new THREE.Vector3(0, 1.1, 0), [0.35, 0.65, 0.35], 0xb7a0ff);
    }
    this.recordCompoundModel();
  }
  recordCompoundModel() {
    this.renderer.domElement.dataset.compoundId=this.currentCompound?.id || '';
    const counts = {};
    for (const atom of this.atomMeshes)
      if (atom.userData.symbol)
        counts[atom.userData.symbol] = (counts[atom.userData.symbol] || 0) + 1;
    this.renderer.domElement.dataset.compoundAtomCounts =
      JSON.stringify(counts);
    this.renderer.domElement.dataset.compoundRepresentation =
      this.compoundRepresentation;
    this.renderer.domElement.dataset.covalentBondCount = String(
      this.group.children.filter((o) => o.userData.covalentBond).length,
    );
    this.renderer.domElement.dataset.delocalizedBondCount = String(
      this.group.children.filter(o=>o.userData.delocalized).length);
    this.renderer.domElement.dataset.resonanceGroupCount = String(
      this.bondAnnotations.filter(a=>a.members).length);
    const local=this.bondAnnotations.filter(a=>a.tag.dataset.scope==='bond' && a.tag.dataset.order);
    this.renderer.domElement.dataset.coordinateBondCount=String(this.group.children.filter(o=>o.userData.coordinateBond).length);
    this.renderer.domElement.dataset.coordinatePairCount=String(local.filter(a=>a.tag.dataset.kind==='coordinate').length);
    this.renderer.domElement.dataset.piBondCount=String(local.reduce((n,a)=>n+Math.max(0,Number(a.tag.dataset.order)-1),0));
    this.renderer.domElement.dataset.displayedBondOrders=JSON.stringify(local.map(a=>Number(a.tag.dataset.order)));
    this.dirty = true;
    this.setView2D(this.view2D);
  }
  structuredMolecule(c) {
    const atoms = c.model.atoms;
    const centre = [1, 2, 3].map(
      (axis) => atoms.reduce((s, a) => s + a[axis], 0) / atoms.length,
    );
    const points = atoms.map((a) =>
      a.slice(1).map((v, i) => (v - centre[i]) * 0.85),
    );
    atoms.forEach(([s], i) =>
      this.sphere(
        s,
        points[i],
        s === "H" ? 0.16 : 0.32,
        atoms.length < 25 || (s !== "H" && atoms.length < 60),
      ),
    );
    for (const [index, [a, b, order]] of c.model.bonds.entries()) {
      this.bond(points[a], points[b], order === 4 ? 1 : order, .28, moleculeBondDescription(c.id, index, order, this.bondRepresentation));
    }
    this.addResonanceAnnotations(structureParts(c)[0]?.graph,c.id,points);
    this.renderer.domElement.dataset.molecularGeometry = c.model.kind;
    this.renderer.domElement.dataset.molecularBonds = JSON.stringify(
      c.model.bonds,
    );
  }
  crystal(c) {
    const data = c.crystal,
      fragment = crystalFragment(data);
    this.compactModel = true;
    const positive = ionicParts[c.id]?.[0]?.formula;
    const isPositive = (a) =>
      positive === "NH4"
        ? a.symbol === "N" &&
          fragment.atoms.some(
            (b) =>
              b.symbol === "H" &&
              Math.hypot(...a.position.map((p, i) => p - b.position[i])) < 0.68,
          )
        : a.symbol === positive;
    const nodes = fragment.atoms.map((a) => ({
      ...a,
      positive: isPositive(a),
    }));
    if (positive === "NH4")
      for (const a of nodes)
        if (a.symbol === "H")
          a.positive = nodes.some(
            (b) =>
              b.positive &&
              b.symbol === "N" &&
              Math.hypot(...a.position.map((p, i) => p - b.position[i])) < 0.68,
          );
    nodes.forEach((a) => {
      a.centre = new THREE.Vector3(...a.position);
      a.radius =
        a.symbol === "H"
          ? 0.1
          : positive
            ? a.positive
              ? 0.19
              : 0.23
            : a.symbol === "Si"
              ? 0.22
              : 0.18;
      this.sphere(
        a.symbol,
        a.position,
        a.radius,
        false,
        positive ? ionColor(a.positive ? 1 : -1) : undefined,
      );
    });
    const covalent = (a, b, d) => {
      if (positive && a.positive !== b.positive) return false;
      const pair = [a.symbol, b.symbol].sort().join("-");
      const cutoff = {
        "H-O": 1.22,
        "H-N": 1.22,
        "C-C": 1.7,
        "C-H": 1.22,
        "C-O": 1.65,
        "N-O": 1.65,
        "O-S": 1.85,
        "O-Si": 1.9,
        "O-P": 1.85,
      }[pair];
      return cutoff && d < cutoff * 0.55 && d > 0.15;
    };
    const connections=[];
    for (let i = 0; i < nodes.length; i++)
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i],
          b = nodes[j],
          d = a.centre.distanceTo(b.centre);
        if (covalent(a, b, d))connections.push([i,j,1]);
      }
    const sharedGraphite=c.id==='C' && /graphite/i.test(data.name || '');
    const graph={symbols:nodes.map(n=>n.symbol),bonds:connections,
      aromatic:sharedGraphite?connections.map((_,i)=>i):[]};
    const anion=ionicParts[c.id]?.find(i=>i.charge<0)?.formula;
    connections.forEach(([a,b,order],index)=> {
      // A mixed crystal contains both cation and anion covalent subgraphs.
      // NH4+ donation must not inherit the nitrate convention of its neighbour.
      const ion=nodes[a].positive?positive:anion;
      this.bond(nodes[a].position,nodes[b].position,order,.13,
        bondDescription(order,{ion,species:ion||c.id,graph,index,symbols:graph.symbols,a,b,representation:this.bondRepresentation}));
    });
    this.addResonanceAnnotations(graph,sharedGraphite?'C':anion,nodes.map(n=>n.position),sharedGraphite);
    const pairs = [];
    if (positive)
      for (const a of nodes.filter((n) => n.positive && n.symbol !== "H")) {
        const others = nodes.filter(
          (b) => !b.positive && ["O", "Cl", "Br", "F"].includes(b.symbol),
        );
        const nearest = Math.min(
          ...others.map((b) => a.centre.distanceTo(b.centre)),
        );
        for (const b of others)
          if (
            a.centre.distanceTo(b.centre) <= nearest * 1.13 &&
            pairs.length < 220
          )
            pairs.push([a, b]);
      }
    if (pairs.length) this.electricField(pairs, true);
    // Wire edges reveal the actual non-orthogonal cell; do not force a cube.
    const edges = [],
      corners = [];
    for (let x = 0; x < 2; x++)
      for (let y = 0; y < 2; y++)
        for (let z = 0; z < 2; z++) {
          const p = data.vectors.reduce(
            (v, axis, i) =>
              v.map((n, j) => n + axis[j] * [x, y, z][i] * fragment.repeats[i]),
            [0, 0, 0],
          );
          corners.push(p.map((n, i) => (n - fragment.centre[i]) * 0.55));
        }
    for (let i = 0; i < 8; i++)
      for (const bit of [1, 2, 4])
        if (!(i & bit)) edges.push(...corners[i], ...corners[i | bit]);
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(edges, 3),
    );
    this.group.add(
      new THREE.LineSegments(
        geometry,
        new THREE.LineBasicMaterial({
          color: 0x79bad7,
          transparent: true,
          opacity: 0.28,
        }),
      ),
    );
    const dataset = this.renderer.domElement.dataset;
    dataset.crystalCode = data.code;
    dataset.crystalCell = JSON.stringify(data.cell);
    dataset.crystalRepeats = JSON.stringify(fragment.repeats);
    dataset.formulaUnits = String(fragment.units);
    dataset.crystalCoordination = JSON.stringify(
      data.atoms.map((a, i) => ({
        symbol: a[0],
        neighbours: periodicNeighbours(
          data,
          i,
          a[0] === "Si"
            ? "O"
            : a[0] === "O" && c.id === "SiO2"
              ? "Si"
              : positive
                ? ionicParts[c.id][1].formula
                : "O",
          c.id === "SiO2" ? 1.9 : Math.min(...data.cell.slice(0, 3)) * 0.56,
        ).length,
      })),
    );
  }
  polymer(kind = "PE") {
    const restore2D = this.view2D;
    this.clear();
    this.currentCompound = {id:kind,kind:"polymer"};
    this.view2D = restore2D;
    this.clouds = true;
    this.compactModel = true;
    const points = Array.from({ length: 8 }, (_, i) => [
      (i - 3.5) * 1.1,
      i % 2 ? 0.32 : -0.32,
      0,
    ]);
    points.forEach((p, i) => {
      this.sphere("C", p, 0.28, false);
      for (const sign of [-1, 1]) {
        const h = [p[0], p[1] + (i % 2 ? 0.3 : -0.3), sign * 0.72];
        if (i % 2 && sign === 1 && ["PP", "PS"].includes(kind)) {
          if (kind === "PP") {
            this.sphere("C", h, 0.26, false);
            this.bond(p, h);
            for (let k = 0; k < 3; k++) {
              const angle = (k * Math.PI * 2) / 3,
                q = [
                  h[0] + 0.55 * Math.cos(angle),
                  h[1] + 0.55 * Math.sin(angle),
                  h[2] + 0.55,
                ];
              this.sphere("H", q, 0.13, false);
              this.bond(h, q);
            }
          } else {
            const ring = Array.from({ length: 6 }, (_, k) => [
              h[0] + 0.7 * Math.sin((k * Math.PI) / 3),
              h[1] + 0.7 * (1 - Math.cos((k * Math.PI) / 3)),
              h[2] + 0.25 * (1 - Math.cos((k * Math.PI) / 3)),
            ]);
            ring.forEach((q, k) => {
              this.sphere("C", q, 0.24, false);
              this.bond(q, ring[(k + 1) % 6], k % 2 ? 1 : 2, .28, bondDescription(k % 2 ? 1 : 2,{aromatic:true,representation:this.bondRepresentation}));
              if (k) {
                const r = [
                  q[0] + 0.45 * Math.sin((k * Math.PI) / 3),
                  q[1] - 0.45 * Math.cos((k * Math.PI) / 3),
                  q[2],
                ];
                this.sphere("H", r, 0.12, false);
                this.bond(q, r);
              }
            });
            this.addResonanceAnnotations({symbols:Array(6).fill("C"),bonds:ring.map((_,k)=>[k,(k+1)%6,1]),aromatic:[0,1,2,3,4,5]},"PS",ring);
            this.bond(p, ring[0]);
          }
          continue;
        }
        const symbol =
          kind === "PTFE"
            ? "F"
            : kind === "PVC" && i % 2 && sign === 1
              ? "Cl"
              : "H";
        this.sphere(symbol, h, symbol === "H" ? 0.13 : 0.23, false);
        this.bond(p, h);
      }
      if (i) this.bond(points[i - 1], p);
    });
    this.label("…", [-5.2, -0.3, 0], 0.5);
    this.label("…", [5.2, 0.3, 0], 0.5);
    this.recordCompoundModel();
    this.renderer.domElement.dataset.modelMode = "polymer";
    this.renderer.domElement.dataset.polymerType = kind;
  }
  ionic(c) {
    // Verified lattices are handled by crystal(); this is one formula unit.
    const pairs = [];
    const nodes = formulaUnitLayout(ionicParts[c.id] || []).map(({ion, position, scale}, i) =>
      this.drawIon(ion, new THREE.Vector3(...position), true, scale, i));
    for (let i = 0; i < nodes.length; i++)
      for (let j = i + 1; j < nodes.length; j++)
        if (nodes[i].charge * nodes[j].charge < 0)
          pairs.push([nodes[i], nodes[j]]);
    this.electricField(pairs, false);
    this.renderer.domElement.dataset.formulaUnits = "1";
  }
  drawIon(ion, centre, labels, scale = 1, index = 0) {
    const structure = ionStructure(ion.formula),
      color = ionColor(ion.charge);
    const origin = new THREE.Vector3(...ionBounds(ion.formula).centre);
    const orientation = new THREE.Euler(0.1, 0.16, 0.08 * Math.sin(index * 1.2));
    const sites = [];
    const positions = structure.atoms.map(([symbol, ...point]) => {
      const position = new THREE.Vector3(...point).sub(origin).applyEuler(orientation).multiplyScalar(scale).add(centre);
      const radius =
        (structure.atoms.length === 1
          ? 0.45
          : symbol === "H"
            ? 0.19
            : symbol === "O"
              ? 0.28
              : 0.33) * scale;
      const atomColor = CPK_PALETTE[symbol] || this.elements.get(symbol)?.color || color;
      const mesh = this.sphere(symbol, position.toArray(), radius, false, atomColor);
      mesh.userData.ionFormula = ion.formula;
      if (labels) this.label(symbol, [position.x, position.y + radius + 0.1, position.z], scale < 1 ? 0.22 : 0.32);
      sites.push({ centre: position, radius });
      return position.toArray();
    });
    // Covalent bonds are internal to a polyatomic ion. Inter-ion filaments
    // never use this bond/cloud builder.
    if(!nonMolecularIons.has(ion.formula))for (const [index, [a, b, order = 1]] of structure.bonds.entries()) this.bond(positions[a], positions[b], order, 0.28 * scale,
      ionBondDescription(ion.formula,index,a,b,order,structure.atoms,this.bondRepresentation));
    this.addResonanceAnnotations(structureParts({id:this.currentCompound?.id,kind:"ionic"}).find(p=>p.ion===ion.formula)?.graph,
      ion.formula,positions);
    return { centre, radius: structure.radius * scale, charge: ion.charge, sites };
  }
  electricField(pairs, lattice) {
    if (!pairs.length) return;
    const positions = [],
      coordinates = [],
      sides = [],
      depths = [],
      motions = [];
    const segments = lattice ? 12 : this.profile.ring >= 96 ? 40 : 24;
    let pairIndex = 0;
    for (const [a, b] of pairs) {
      let nearestA = a,
        nearestB = b,
        distance = Infinity;
      for (const sa of a.sites || [a])
        for (const sb of b.sites || [b]) {
          const gap = sa.centre.distanceTo(sb.centre) - sa.radius - sb.radius;
          if (gap < distance) {
            nearestA = sa;
            nearestB = sb;
            distance = gap;
          }
        }
      const axis = nearestB.centre.clone().sub(nearestA.centre).normalize();
      const start = nearestA.centre
        .clone()
        .addScaledVector(axis, nearestA.radius * 0.94);
      const end = nearestB.centre
        .clone()
        .addScaledVector(axis, -nearestB.radius * 0.94);
      this.addBondAnnotation(start.clone().add(end).multiplyScalar(.5),
        {label:"ion",kind:"ionic",title:"Tương tác tĩnh điện giữa ion trái dấu; không phải liên kết σ hoặc π"}, start, end);
      const perpendicular = new THREE.Vector3(-axis.y, axis.x, 0);
      if (perpendicular.lengthSq() < 0.01) perpendicular.set(1, 0, 0);
      perpendicular.normalize();
      const binormal = new THREE.Vector3()
        .crossVectors(axis, perpendicular)
        .normalize();
      const gapLength = start.distanceTo(end);
      const bend = Math.min(lattice ? 0.04 : 0.18, gapLength * 0.12);
      const sway = Math.min(lattice ? 0.028 : 0.15, gapLength * 0.075);
      for (const branch of lattice ? [0] : [-1, 0, 1]) {
        const seed = pairIndex * 0.81 + branch * 2.17;
        const angle = ((branch + 1) * Math.PI * 2) / 3;
        const points = Array.from({ length: 9 }, (_, i) => {
          const t = i / 8;
          const envelope = Math.sin(t * Math.PI);
          const jag =
            (i % 2 ? 1 : -1) * (0.55 + 0.45 * Math.cos(i * 1.7 + seed));
          return start
            .clone()
            .lerp(end, t)
            .addScaledVector(
              perpendicular,
              envelope *
                bend *
                (jag * Math.cos(angle) + 0.32 * Math.sin(i * 1.4 + seed)),
            )
            .addScaledVector(
              binormal,
              envelope *
                bend *
                (jag * Math.sin(angle) + 0.8 * Math.cos(i * 1.8 + seed)),
            );
        });
        if (pairIndex === 0 && branch === 0)
          this.renderer.domElement.dataset.fieldControlPoints = JSON.stringify(
            points.map((p) => p.toArray()),
          );
        const curve = new FieldArc(points);
        const tube = new THREE.TubeGeometry(
          curve,
          segments,
          branch ? 0.005 : lattice ? 0.006 : 0.012,
          6,
          false,
        );
        const vertex = tube.attributes.position;
        for (let i = 0; i <= segments; i++) {
          const t = i / segments,
            centre = curve.getPointAt(t);
          const taper = 0.3 + 0.7 * Math.sin(t * Math.PI);
          for (let j = 0; j <= 6; j++) {
            const index = i * 7 + j;
            const point = new THREE.Vector3()
              .fromBufferAttribute(vertex, index)
              .sub(centre)
              .multiplyScalar(taper)
              .add(centre);
            vertex.setXYZ(index, point.x, point.y, point.z);
          }
        }
        const flat = tube.toNonIndexed();
        positions.push(...flat.attributes.position.array);
        coordinates.push(...flat.attributes.uv.array);
        for (let i = 0; i < flat.attributes.position.count; i++) {
          sides.push(...perpendicular.toArray());
          depths.push(...binormal.toArray());
          motions.push(sway, seed);
        }
        flat.dispose();
        tube.dispose();
      }
      pairIndex++;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3),
    );
    geometry.setAttribute(
      "uv",
      new THREE.Float32BufferAttribute(coordinates, 2),
    );
    geometry.setAttribute(
      "fieldSide",
      new THREE.Float32BufferAttribute(sides, 3),
    );
    geometry.setAttribute(
      "fieldDepth",
      new THREE.Float32BufferAttribute(depths, 3),
    );
    geometry.setAttribute(
      "fieldParams",
      new THREE.Float32BufferAttribute(motions, 2),
    );
    geometry.computeVertexNormals();
    this.fieldMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        expansion: { value: 1 },
        intensity: { value: lattice ? 0.45 : 0.92 },
        motion: { value: this.fieldPaused ? 0 : 1 },
      },
      vertexShader: `varying vec2 vUv; varying float vLight; uniform float expansion; uniform float time; uniform float motion;
        attribute vec3 fieldSide; attribute vec3 fieldDepth; attribute vec2 fieldParams;
        void main() {
          vUv = uv;
          vLight = 0.65 + 0.35 * max(0.0, dot(normalize(normalMatrix * normal), normalize(vec3(0.3, 0.6, 1.0))));
          float segment = uv.x * 8.0;
          float node = floor(segment);
          float phase = fieldParams.y + time * 2.2;
          float sway = mix(sin(node * 1.9 + phase), sin((node + 1.0) * 1.9 + phase), fract(segment));
          float envelope = sin(uv.x * 3.14159265) * fieldParams.x * motion;
          vec3 p = position + envelope * (fieldSide * sway + fieldDepth * 0.85 * cos(phase + uv.x * 5.0));
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p * expansion, 1.0);
        }`,
      fragmentShader: `varying vec2 vUv; varying float vLight; uniform float time; uniform float intensity;
        void main() {
          float taper = sin(vUv.x * 3.14159265);
          float shimmer = 0.88 + 0.12 * cos(vUv.x * 14.0 - time * 1.3);
          gl_FragColor = vec4(vec3(0.96, 0.98, 1.0) * vLight, intensity * taper * shimmer);
        }`,
      transparent: true,
      depthWrite: false,
      toneMapped: false,
    });
    const field = new THREE.Mesh(geometry, this.fieldMaterial);
    field.userData.electricField = true;
    this.group.add(field);
    this.renderer.domElement.dataset.fieldCount = String(pairs.length);
    this.renderer.domElement.dataset.fieldStyle = "lightning-3d";
  }
  silica(extended) {
    const center = [0, 0, 0];
    this.sphere("Si", center, 0.45);
    const corners = [
      [1, 1, 1],
      [-1, -1, 1],
      [-1, 1, -1],
      [1, -1, -1],
    ];
    for (const p of corners) {
      this.sphere("O", p, 0.32);
      this.bond(center, p);
      if (extended) {
        const next = p.map((v) => v * 1.8);
        this.sphere("Si", next, 0.38);
        this.bond(p, next);
      }
    }
    this.renderer.domElement.dataset.networkDetail = extended
      ? "silica-fragment"
      : "silica-tetrahedron";
    // Four O corners are shared with other Si in the extended solid: the
    // local coordination is SiO4, while 4 shared halves give formula SiO2.
    this.label(
      extended ? "Mảnh mạng Si–O–Si" : "4 O dùng chung · tỉ lệ Si : O = 1 : 2",
      [0, extended ? -2.45 : -1.65, 0],
      0.36,
    );
  }
  network(c) {
    if (c.id === "C") {
      const ps = Array.from({ length: 6 }, (_, i) => [
        Math.cos((i * Math.PI) / 3) * 1.15,
        Math.sin((i * Math.PI) / 3) * 1.15,
        0,
      ]);
      ps.forEach((p) => this.sphere("C", p, 0.27));
      ps.forEach((p, i) => this.bond(p, ps[(i + 1) % 6]));
      this.label("Một phần lớp graphite", [0, -1.8, 0], 0.6);
      return;
    }
    const center = [0, 0, 0];
    this.sphere("Si", center, 0.4);
    [
      [1, 1, 1],
      [-1, -1, 1],
      [-1, 1, -1],
      [1, -1, -1],
    ].forEach((p) => {
      this.sphere("O", p, 0.32);
      this.bond(center, p);
      const next = p.map((v) => v * 1.55);
      this.sphere("Si", next, 0.35);
      this.bond(p, next);
    });
    this.label("Mảnh mạng Si–O mở rộng", [0, -2.2, 0], 0.6);
  }
  suspendDrawing(paused) {this.suspended=!!paused;this.last=performance.now();this.dirty=true;}
  dispose() {
    cancelAnimationFrame(this.animation);this.observer?.disconnect();this.controls?.dispose();this.clear();
    this.scene.traverse(o=>{o.geometry?.dispose();for(const m of (Array.isArray(o.material)?o.material:o.material?[o.material]:[])){m.map?.dispose();m.dispose();}});
    this.environmentTarget?.dispose();this.renderer.dispose();this.renderer.forceContextLoss?.();this.mount.replaceChildren();
  }
  animateFormation() {
    this.explodeUntil = performance.now() + 3000;
  }
}
