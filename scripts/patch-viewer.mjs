import fs from 'fs';

const cpkCode = `
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
`;

function patchViewer(filePath) {
  let code = fs.readFileSync(filePath, 'utf-8');

  // Insert CPK_PALETTE if not present
  if (!code.includes('export const CPK_PALETTE')) {
    code = code.replace(
      'import { bondDescription, moleculeBondDescription',
      cpkCode + '\nimport { bondDescription, moleculeBondDescription'
    );
  }

  // Lighting
  code = code.replace(
    /this\.scene\.add\(new THREE\.AmbientLight\(0xc7ddff, 1\.3\)\);[\s\S]*?this\.scene\.add\(light\);[\s\S]*?this\.scene\.add\(light\);/,
    `this.scene.add(new THREE.AmbientLight(0xffffff, 2.2));
    let light = new THREE.DirectionalLight(0xffffff, 3.5);
    light.position.set(5, 8, 6);
    this.scene.add(light);
    light = new THREE.DirectionalLight(0xa5d5ff, 2.0);
    light.position.set(-6, -3, -4);
    this.scene.add(light);
    light = new THREE.DirectionalLight(0xffeedd, 1.5);
    light.position.set(0, 6, -5);
    this.scene.add(light);`
  );

  // sphere material and color
  code = code.replace(
    /sphere\(symbol, position, radius = 0\.4, label = true, override\) \{[\s\S]*?new THREE\.MeshPhysicalMaterial\(\{[\s\S]*?\}\),[\s\S]*?\);/,
    `sphere(symbol, position, radius = 0.4, label = true, override) {
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
    );`
  );

  // nuclearEnvelope
  code = code.replace(
    /nuclearEnvelope\(e, radius, opacity = 0\.16\) \{[\s\S]*?new THREE\.MeshPhysicalMaterial\(\{[\s\S]*?\}\),[\s\S]*?\);/,
    `nuclearEnvelope(e, radius, opacity = 0.16) {
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
    );`
  );

  // drawIon: use CPK_PALETTE[symbol]
  code = code.replace(
    'const mesh = this.sphere(symbol, position.toArray(), radius, false, color);',
    'const atomColor = CPK_PALETTE[symbol] || this.elements.get(symbol)?.color || color;\n      const mesh = this.sphere(symbol, position.toArray(), radius, false, atomColor);'
  );

  fs.writeFileSync(filePath, code, 'utf-8');
  console.log(`Patched ${filePath} with CPK palette, physical glass material and vibrant lights!`);
}

patchViewer('public/sites/merge/js/viewer.js');
patchViewer('docs/research/merge/unpacked/viewer.js');
