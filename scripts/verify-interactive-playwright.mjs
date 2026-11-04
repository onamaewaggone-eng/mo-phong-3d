import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';

async function run() {
  console.log('--- STARTING PLAYWRIGHT INTERACTIVE VERIFICATION ---');
  
  const screenshotsDir = path.resolve(process.cwd(), 'screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  const browser = await chromium.launch({
    headless: true,
    args: ['--enable-webgl', '--use-gl=angle', '--no-sandbox']
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });

  const page = await context.newPage();

  // Navigate to application
  console.log('1. Loading http://localhost:3000 ...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForSelector('#ct99-app-root', { timeout: 15000 });
  await page.waitForTimeout(1000);

  // ==========================================
  // STEP 1: TAB PHẢN ỨNG HÓA HỌC
  // ==========================================
  console.log('\n2. Testing TAB PHẢN ỨNG HÓA HỌC...');
  // Click React tab using exact data-mode="react"
  const reactTabBtn = page.locator('button[data-mode="react"]');
  await reactTabBtn.click();
  await page.waitForTimeout(1000);

  // Choose example: Zn + HCl
  console.log(' - Selecting example Zn + HCl ...');
  const exampleBtn = page.locator('#reaction-screen button[data-example="Zn|HCl"]').first();
  await exampleBtn.click();
  await page.waitForTimeout(500);

  // Click predict (arrow button)
  console.log(' - Clicking predict arrow button ...');
  const predictBtn = page.locator('#rx-predict');
  await predictBtn.click();
  await page.waitForTimeout(1000);

  // Click balance button
  console.log(' - Clicking balance button ...');
  const balanceBtn = page.locator('#rx-balance');
  await balanceBtn.click();
  await page.waitForTimeout(1000);

  // Check conditions and observations
  const conditionGrid = page.locator('.rx-condition-grid');
  await conditionGrid.waitFor({ state: 'visible', timeout: 5000 });
  console.log(' ✓ Điều kiện & Hiện tượng đã hiển thị!');

  // Find substance span in equation
  const speciesSpan = page.locator('.rx-equation .rx-species').first();
  await speciesSpan.waitFor({ state: 'visible' });

  // Hover over the substance to trigger the (+) button
  console.log(' - Hovering mouse over substance in equation ...');
  await speciesSpan.hover();
  await page.waitForTimeout(600);

  // Find the (+) button
  const plusBtn = speciesSpan.locator('.rx-species-plus-btn');
  await plusBtn.waitFor({ state: 'visible', timeout: 5000 });
  console.log(' ✓ Nút dấu (+) đã xuất hiện ở góc chất!');

  // Click the (+) button to open 3D Modal
  console.log(' - Clicking (+) button to open 3D modal ...');
  await plusBtn.click({ force: true });

  // Wait for #rx-molecule-peek modal to pop up
  const peekModal = page.locator('#rx-molecule-peek');
  await peekModal.waitFor({ state: 'visible', timeout: 8000 });
  console.log(' ✓ Modal #rx-molecule-peek đã bật lên thành công!');

  // Wait for Three.js stage canvas inside modal
  const peekCanvas = page.locator('#peek-stage canvas');
  await peekCanvas.waitFor({ state: 'visible', timeout: 10000 });
  await page.waitForTimeout(2000); // Wait for WebGL 3D model to render

  const shot1Path = path.join(screenshotsDir, 'proof-01-reaction-plus-3d-modal.png');
  await page.screenshot({ path: shot1Path });
  console.log(` ✓ Chụp ảnh thành công: ${shot1Path}`);

  // Close peek modal
  const closePeekBtn = page.locator('#rx-molecule-peek .peek-close');
  if (await closePeekBtn.isVisible()) {
    await closePeekBtn.click();
    await page.waitForTimeout(500);
  }

  // ==========================================
  // STEP 2: TAB KHÁM PHÁ (LiOH CPK Colors)
  // ==========================================
  console.log('\n3. Testing TAB KHÁM PHÁ...');
  // Click Explore tab
  const exploreTabBtn = page.locator('button[data-mode="explore"]');
  await exploreTabBtn.click();
  await page.waitForTimeout(1000);

  // Select LiOH
  console.log(' - Clicking LiOH button ...');
  const liohBtn = page.locator('#explore-select-lioh, button[data-compound-select="LiOH"]').first();
  await liohBtn.waitFor({ state: 'visible', timeout: 5000 });
  await liohBtn.click();
  await page.waitForTimeout(2000); // Wait for Three.js molecule(LiOH) to render

  // Verify WebGL Canvas is present and rendered
  const exploreCanvas = page.locator('#explore-three-mount canvas');
  await exploreCanvas.waitFor({ state: 'visible', timeout: 8000 });
  await page.waitForTimeout(1500);

  const shot2Path = path.join(screenshotsDir, 'proof-02-explore-lioh-cpk-colors.png');
  await page.screenshot({ path: shot2Path });
  console.log(` ✓ Chụp ảnh thành công: ${shot2Path}`);

  // ==========================================
  // STEP 3: TAB LÝ THUYẾT (Interactive Bohr & Calculator)
  // ==========================================
  console.log('\n4. Testing TAB LÝ THUYẾT...');
  // Click Theory tab
  const theoryTabBtn = page.locator('button[data-mode="theory"]');
  await theoryTabBtn.click();
  await page.waitForTimeout(1000);

  // Click lesson 7-atom
  console.log(' - Selecting lesson 7-atom ...');
  const lessonBtn = page.locator('#theory-lesson-btn-7-atom, button[data-lesson-id="7-atom"]').first();
  if (await lessonBtn.isVisible()) {
    await lessonBtn.click();
  }
  await page.waitForTimeout(1000);

  // Verify Interactive Bohr Canvas
  const bohrCanvas = page.locator('#bohr-canvas');
  await bohrCanvas.waitFor({ state: 'visible', timeout: 5000 });
  console.log(' ✓ Đã tìm thấy <canvas id="bohr-canvas"> mô phỏng Bohr!');

  // Click orbit n=2 to demonstrate quantum jump
  console.log(' - Switching Bohr orbit to n=2 ...');
  const n2Btn = page.locator('#bohr-btn-n2');
  if (await n2Btn.isVisible()) {
    await n2Btn.click();
    await page.waitForTimeout(800);
  }

  // Verify Calculator inputs
  const calcSelect = page.locator('#calculation-kind');
  const calcInputA = page.locator('#calculation-a');
  const calcInputB = page.locator('#calculation-b');
  const calcBtn = page.locator('#calculate-study');
  const calcResult = page.locator('#calculation-result');

  await calcSelect.waitFor({ state: 'visible' });
  await calcInputA.waitFor({ state: 'visible' });
  await calcInputB.waitFor({ state: 'visible' });
  await calcBtn.waitFor({ state: 'visible' });
  await calcResult.waitFor({ state: 'visible' });
  console.log(' ✓ Đã tìm thấy Máy tính Mol với đầy đủ <input>, <select> và <button>!');

  // Test entering values in calculator
  await calcInputA.fill('36');
  await calcInputB.fill('18');
  await calcBtn.click();
  await page.waitForTimeout(500);

  // Verify pH Slider
  const phScale = page.locator('#ph-scale');
  await phScale.waitFor({ state: 'visible' });
  console.log(' ✓ Đã tìm thấy Thước đo pH tương tác!');

  // Scroll to show interactive tools nicely
  await bohrCanvas.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);

  const shot3Path = path.join(screenshotsDir, 'proof-03-theory-interactive-bohr-calculator.png');
  await page.screenshot({ path: shot3Path });
  console.log(` ✓ Chụp ảnh thành công: ${shot3Path}`);

  // ==========================================
  // STEP 4: TAB LÝ THUYẾT - 3D MOLECULAR STAGE (Ammonia & Alkane)
  // ==========================================
  console.log('\n5. Testing TAB LÝ THUYẾT - 3D MOLECULAR MODEL...');
  const ammoniaLessonBtn = page.locator('#theory-lesson-btn-11-kntt-05, button[data-lesson-id="11-kntt-05"]').first();
  await ammoniaLessonBtn.scrollIntoViewIfNeeded();
  await ammoniaLessonBtn.click();
  await page.waitForTimeout(1000);

  const theory3DBox = page.locator('#theory-3d-stage-box');
  await theory3DBox.waitFor({ state: 'visible', timeout: 8000 });
  const theoryCanvas = page.locator('#theory-lesson-viewer-canvas canvas');
  await theoryCanvas.waitFor({ state: 'visible', timeout: 8000 });
  await page.waitForTimeout(2000);

  await theory3DBox.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);

  const shot4Path = path.join(screenshotsDir, 'proof-04-theory-lesson-ammonia-3d.png');
  await page.screenshot({ path: shot4Path });
  console.log(` ✓ Chụp ảnh thành công: ${shot4Path}`);

  // ==========================================
  // STEP 5: MODAL HỒ SƠ KHOA HỌC (NH3 3D)
  // ==========================================
  console.log('\n6. Testing MODAL HỒ SƠ KHOA HỌC NH3 (3D Frame)...');
  const openDossierBtn = page.locator('#theory-dossier-btn-NH3, #theory-open-dossier-btn').first();
  await openDossierBtn.click();
  await page.waitForTimeout(1000);

  const dossierModal = page.locator('div[role="dialog"]');
  await dossierModal.waitFor({ state: 'visible', timeout: 8000 });
  const modalCanvas = page.locator('#dossier-modal-3d-viewer canvas');
  await modalCanvas.waitFor({ state: 'visible', timeout: 10000 });
  await page.waitForTimeout(2000);

  const shot5Path = path.join(screenshotsDir, 'proof-05-science-dossier-nh3-3d.png');
  await page.screenshot({ path: shot5Path });
  console.log(` ✓ Chụp ảnh thành công: ${shot5Path}`);

  await browser.close();
  console.log('\n--- ALL PLAYWRIGHT VERIFICATIONS COMPLETED SUCCESSFULLY! ---');
}

run().catch((err) => {
  console.error('Playwright verification error:', err);
  process.exit(1);
});
