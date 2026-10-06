const {chromium} = require('@playwright/test');
const assert = require('node:assert/strict');
(async () => {
  const browser = await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
  try {
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto('http://127.0.0.1:4173/#/portal');
    await page.locator('#portfolioGrid').waitFor();
    while (await page.locator('#loadClients').isVisible()) await page.locator('#loadClients').click();
    assert.equal(await page.locator('#portfolioGrid .client-website-overlay').count(), 24);
    const linkedOrder = await page.locator('#portfolioGrid .logo-card').evaluateAll(cards => cards.map(card => Boolean(card.querySelector('.client-website-overlay'))));
    assert.deepEqual(linkedOrder, [...Array(24).fill(true), ...Array(70).fill(false)]);
    const premier = page.locator('#portfolioGrid .logo-card').filter({hasText:'Premier Travel Group'});
    assert.equal(await premier.locator('.client-website-overlay').getAttribute('href'), 'https://premieradventuretours.com/');
    for (const width of [390, 1440]) {
      await page.setViewportSize({width, height:900});
      const link = page.locator('#portfolioGrid .client-website-overlay').first();
      await link.scrollIntoViewIfNeeded();
      assert.equal(await link.getAttribute('href'), 'https://b2b.flyingzon.com/');
      assert.equal(await link.getAttribute('target'), '_blank');
      const box = await link.boundingBox();
      assert(box.width > 200 && box.height > 130);
      assert(await link.evaluate(el => { const b=el.getBoundingClientRect(); return document.elementFromPoint(b.x+b.width/2,b.y+40).closest('a') === el; }));
    }
    assert.deepEqual(errors, []);
    console.log('PASS: 24 client cards have verified or user-supplied background links; Premier destination and desktop/mobile click targets verified.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode=1; });
