import { test, expect } from "@playwright/test";

// Intercept response fron the */**/api/tags request and mock It with test tags */

test.beforeEach(async ({ page }) => {
  await page.route("*/**/api/articles?*", async route => {
    const response = await route.fetch()
    const responseBodyJson = await response.json();
    responseBodyJson.articles[0].title = "This is the MOCK title";
    responseBodyJson.articles[0].description = "This is the MOCK description";

    await route.fulfill({
      body: JSON.stringify(responseBodyJson),
    });
  });
  
  await page.goto("https://conduit.bondaracademy.com/");
});

test("has title", async ({ page }) => {
  await page.waitForTimeout(500);
  await expect(page.locator(".navbar-brand")).toHaveText("conduit");
  await expect(page.locator("//app-article-preview[1]//h1")).toContainText("New title");
  await expect(page.locator("app-article-preview p").first()).toContainText( "This is the new description");
});
