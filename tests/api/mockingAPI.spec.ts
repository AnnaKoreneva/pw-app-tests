import { test, expect } from "@playwright/test";
import tags from "../../data/tags.json"

test.beforeEach(async ({ page }) => {
  await page.route("*/**/api/tags", async route => { //wildcard URL to simplify the look of the URL
    await route.fulfill({
      body: JSON.stringify(tags)
    })
  } );
  await page.goto("https://conduit.bondaracademy.com/");
});

test("has title", async ({ page }) => {
  await page.waitForTimeout(500);
  await expect(page.locator(".navbar-brand")).toHaveText("conduit");
});
