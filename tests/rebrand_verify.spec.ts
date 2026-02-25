import { test, expect } from '@playwright/test';

test('verify about page design', async ({ page }) => {
  await page.goto('http://localhost:5173/about');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'about_page.png', fullPage: true });
});

test('verify contact page design', async ({ page }) => {
  await page.goto('http://localhost:5173/contact');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'contact_page.png', fullPage: true });
});
