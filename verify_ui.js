const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('file://' + process.cwd() + '/index.html');
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.screenshot({ path: 'desktop.png', fullPage: true });
  await page.setViewportSize({ width: 375, height: 812 });
  await page.screenshot({ path: 'mobile.png', fullPage: true });
  await browser.close();
})();
