import { expect, test } from '@playwright/test';

test('home supports keyboard navigation at mobile width', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto('/');

  const content = page.getByRole('main');

  await expect(content.getByRole('heading', {
    level: 1,
    name: 'Software Developer. Engineering Manager. Conference Speaker.',
  })).toBeVisible();
  await expect(content.getByRole('navigation', { name: 'Professional profiles' }).getByRole('link')).toHaveCount(2);

  await page.keyboard.press('Tab');

  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();

  await page.keyboard.press('Enter');

  await expect(content).toBeFocused();

  const hasHorizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);

  expect(hasHorizontalOverflow).toBe(false);
});

test('certificate verification announces the result and encodes the ID', async ({ page }) => {
  await page.goto('/check');
  const certificateId = page.getByRole('textbox', { name: 'Certificate ID' });
  const status = page.getByRole('main').getByRole('status');

  await certificateId.fill('TSFL-2024-48372915');
  await certificateId.press('Enter');

  await expect(status).toContainText('This certificate is valid');

  await certificateId.fill('missing&id=example');
  await certificateId.press('Enter');

  await expect(page).toHaveURL(/certId=missing%26id%3Dexample$/);
  await expect(status).toContainText('Certificate not found');
});
