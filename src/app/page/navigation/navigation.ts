import { expect, Page } from "@playwright/test";

export class Navigation {
  constructor(private readonly page: Page) {}

  async isMenuGroupExpanged(menuGroupName: string) {
    const menuGroup = this.page.getByTitle(menuGroupName);
    const menuGroupState = await menuGroup.getAttribute("aria-expanded");
    menuGroupState == "false" ? await menuGroup.click() : menuGroup;
  }

  async goToPage(menuGroupName: string, pageName: string, url1: string) {
    await this.page.goto("/")
    await this.isMenuGroupExpanged(menuGroupName);
    await this.page.getByTitle(pageName).click();
    await expect(this.page).toHaveURL(url1);
  }
}