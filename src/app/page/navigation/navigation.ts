import { expect, Page } from '@playwright/test';
import { iWebPage } from '../../../../data/navigation/navigationData';
import { AllureHelper } from '../../../helpers/allureHelper';

export class Navigation {
  constructor(private readonly page: Page) { }

  async expandMenuGroup(menuGroupName: string) {
    const menuGroup = this.page.getByTitle(menuGroupName);
    const menuGroupState = await menuGroup.getAttribute('aria-expanded');
    if (menuGroupState == 'false') {
      await menuGroup.click();
    }
  }

  async goToPage(menuGroupName: string| undefined, webPage: iWebPage) {
    await AllureHelper.step(`Navigate to the ${webPage.pageName}`, async () => {
          if (process.env.URL != undefined) {
            await this.page.goto(process.env.URL);
          }
          const burgerMenu = this.page.locator(
            "nb-icon[icon='menu-2-outline']",
          );
          if (await burgerMenu.isVisible()) {
            await burgerMenu.click();
          }
          if (menuGroupName) {
            await this.expandMenuGroup(menuGroupName);
          }
          await this.page.getByTitle(webPage.pageName).click();
          await expect(this.page).toHaveURL(webPage.pageUrl);
          if (await burgerMenu.isVisible()) {
            await burgerMenu.click();
          }
    });
  }

  async goToByUrl(pageUrl: string) {
    await this.page.goto(pageUrl);
  }
}
