import { test, expect, Page, Locator } from "@playwright/test";
import { iWebPage } from "../../../../data/navigation/navigationData";

export class Navigation {
  constructor(private readonly page: Page) {}

  async expandMenuGroup(menuGroupName: string) {
    const menuGroup = this.page.getByTitle(menuGroupName);
    const menuGroupState = await menuGroup.getAttribute("aria-expanded");
    menuGroupState == "false" ? await menuGroup.click() : menuGroup;
  }

  async goToPage(menuGroupName: string, webPage: iWebPage) {
    process.env.URL != undefined ? await this.page.goto(process.env.URL) : console.log('No URL specified');
    const burgerMenu = this.page.locator("nb-icon[icon='menu-2-outline']");
    if (await burgerMenu.isVisible()) {
      await burgerMenu.click()
    }
    await this.expandMenuGroup(menuGroupName);
    await this.page.getByTitle(webPage.pageName).click();
    await expect(this.page).toHaveURL(webPage.pageUrl);
    if (await burgerMenu.isVisible()) {
      await burgerMenu.click();
    }
  }

  async goToByUrl(pageUrl: string) {
    await this.page.goto(pageUrl);
  }
}