import test from '@playwright/test';
test('github test without env variable', async ({ page }) => {
    await page.goto('https://rozetka.com.ua');
});
