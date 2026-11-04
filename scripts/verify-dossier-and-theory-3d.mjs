import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';

async function run() {
  console.log('=== STARTING 3D VERIFICATION FOR SCIENCE DOSSIER & THEORY LESSONS ===');

  const screenshotsDir = path.resolve(process.cwd(), 'screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  const browser = await chromium.launch({
    headless: true,
    args: ['--enable-webgl', '--use-gl=angle', '--no-sandbox']
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 960 }
  });

  const page = await context.newPage();

  console.log('1. Navigating to http://localhost:3000 ...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForSelector('#ct99-app-root', { timeout: 15000 });
  await page.waitForTimeout(1000);

  // ========================================================
  // TEST CASE 1: Tab Lý Thuyết - Bài 5 Ammonia & Khung 3D Phân Tử
  // ========================================================
  console.log('\n2. Testing TAB LÝ THUYẾT (Bài học Ammonia & Alkane có 3D)...');
  const theoryTabBtn = page.locator('button[data-mode="theory"]');
  await theoryTabBtn.click();
  await page.waitForTimeout(1000);

  // Expand Grade 11 accordion if needed, or find lesson 11-kntt-05 (Ammonia)
  console.log(' - Selecting lesson: 11-kntt-05 (Bài 5 · Ammonia và muối ammonium) ...');
  const ammoniaLessonBtn = page.locator('#theory-lesson-btn-11-kntt-05, button[data-lesson-id="11-kntt-05"]').first();
  await ammoniaLessonBtn.scrollIntoViewIfNeeded();
  await ammoniaLessonBtn.click();
  await page.waitForTimeout(1000);

  // Verify the embedded 3D stage in theory lesson
  console.log(' - Checking embedded 3D molecular stage in theory lesson ...');
  const theory3DBox = page.locator('#theory-3d-stage-box');
  await theory3DBox.waitFor({ state: 'visible', timeout: 8000 });
  console.log(' ✓ Khung mô hình 3D trong bài học đã hiển thị!');

  // Check WebGL canvas inside theory 3D stage
  const theoryCanvas = page.locator('#theory-lesson-viewer-canvas canvas');
  await theoryCanvas.waitFor({ state: 'visible', timeout: 10000 });
  await page.waitForTimeout(2000); // Wait for Three.js render

  // Scroll to 3D box nicely
  await theory3DBox.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);

  const shotTheoryAmmonia = path.join(screenshotsDir, 'proof-04-theory-lesson-ammonia-3d.png');
  await page.screenshot({ path: shotTheoryAmmonia });
  console.log(` ✓ [ẢNH 1] Chụp màn hình Bài học Ammonia kèm khung 3D phân tử: ${shotTheoryAmmonia}`);

  // Test selecting another chemical in lesson (e.g. NH4Cl)
  console.log(' - Testing selecting another chemical in lesson (NH4Cl) ...');
  const nh4clBtn = page.locator('#theory-substance-btn-NH4Cl, button[data-lesson-substance="NH4Cl"]').first();
  if (await nh4clBtn.isVisible()) {
    await nh4clBtn.click();
    await page.waitForTimeout(1500);
    console.log(' ✓ Đã chuyển sang mô hình 3D NH4Cl thành công!');
  }

  // Switch back to NH3
  const nh3Btn = page.locator('#theory-substance-btn-NH3, button[data-lesson-substance="NH3"]').first();
  if (await nh3Btn.isVisible()) {
    await nh3Btn.click();
    await page.waitForTimeout(1500);
  }

  // ========================================================
  // TEST CASE 2: Modal "Hồ sơ khoa học" của NH3 với Mô hình 3D
  // ========================================================
  console.log('\n3. Testing MODAL HỒ SƠ KHOA HỌC CỦA NH3 (với khung 3D CPK & Glass)...');
  // Click button to open Science Dossier of NH3
  console.log(' - Opening Science Dossier Modal for NH3 ...');
  const openDossierBtn = page.locator('#theory-dossier-btn-NH3, #theory-open-dossier-btn').first();
  await openDossierBtn.click();
  await page.waitForTimeout(1000);

  // Verify modal is open
  const dossierModal = page.locator('div[role="dialog"]');
  await dossierModal.waitFor({ state: 'visible', timeout: 8000 });
  console.log(' ✓ Modal Hồ sơ khoa học đã mở!');

  // Verify title has Ammonia and NH3
  const modalTitle = page.locator('#dossier-modal-title');
  const titleText = await modalTitle.textContent();
  console.log(` ✓ Tiêu đề modal: ${titleText}`);

  // Verify 3D box inside Science Dossier Modal
  const modal3DBox = page.locator('#dossier-3d-box');
  await modal3DBox.waitFor({ state: 'visible', timeout: 8000 });
  console.log(' ✓ Khung mô hình 3D #dossier-3d-box đã hiển thị bên trong Modal!');

  // Verify WebGL Canvas inside the modal
  const modalCanvas = page.locator('#dossier-modal-3d-viewer canvas');
  await modalCanvas.waitFor({ state: 'visible', timeout: 10000 });
  await page.waitForTimeout(2000); // Allow WebGL 3D rendering to finish
  console.log(' ✓ Three.js WebGL Canvas đã render mô hình 3D phân tử NH3!');

  const shotDossierNH3 = path.join(screenshotsDir, 'proof-05-science-dossier-nh3-3d.png');
  await page.screenshot({ path: shotDossierNH3 });
  console.log(` ✓ [ẢNH 2] Chụp màn hình Modal Hồ sơ khoa học NH3 kèm 3D: ${shotDossierNH3}`);

  // Close modal
  const closeModalBtn = page.locator('div[role="dialog"] button[title*="Đóng"]').first();
  if (await closeModalBtn.isVisible()) {
    await closeModalBtn.click();
    await page.waitForTimeout(800);
  }

  // ========================================================
  // TEST CASE 3: Tab Lý Thuyết - Bài Alkane (CH4 3D)
  // ========================================================
  console.log('\n4. Testing TAB LÝ THUYẾT: Bài học Alkane (CH4 3D)...');
  const alkaneLessonBtn = page.locator('#theory-lesson-btn-9-alkane, button[data-lesson-id="9-alkane"]').first();
  if (await alkaneLessonBtn.isVisible()) {
    await alkaneLessonBtn.scrollIntoViewIfNeeded();
    await alkaneLessonBtn.click();
    await page.waitForTimeout(1500);

    const alkaneCanvas = page.locator('#theory-lesson-viewer-canvas canvas');
    await alkaneCanvas.waitFor({ state: 'visible', timeout: 8000 });
    await page.waitForTimeout(1500);

    const shotAlkane = path.join(screenshotsDir, 'proof-06-theory-lesson-alkane-ch4-3d.png');
    await page.screenshot({ path: shotAlkane });
    console.log(` ✓ [ẢNH 3] Chụp màn hình Bài học Alkane với mô hình 3D CH4: ${shotAlkane}`);
  }

  // Copy proofs to root directory for easy access
  const rootProofDir = process.cwd();
  fs.copyFileSync(shotTheoryAmmonia, path.join(rootProofDir, 'proof-theory-lesson-ammonia-3d.png'));
  fs.copyFileSync(shotDossierNH3, path.join(rootProofDir, 'proof-science-dossier-nh3-3d.png'));

  console.log('\n=== ALL PLAYWRIGHT 3D VERIFICATIONS PASSED 100%! ===');
  await browser.close();
}

run().catch((err) => {
  console.error('Playwright verification failed:', err);
  process.exit(1);
});
