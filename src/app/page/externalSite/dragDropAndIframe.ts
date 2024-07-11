import { Page, expect } from "@playwright/test";

export class DragDropAndIframe {
  constructor(private readonly page: Page) {}

  async navigateToDragAndDrop() {
    await this.page.goto("https://www.globalsqa.com/demo-site/draganddrop/");
  }

  iFrame = this.page.frameLocator("[rel-title = 'Photo Manager'] iframe");

  async dragAndDropImage() {
    await this.iFrame.locator("li", { hasText: "High Tatras 2" }).dragTo(this.iFrame.locator('#trash'));
  }
    
    async dragAndDropMouse() {
        await this.iFrame.locator("li", { hasText: "High Tatras 4" }).hover();
        await this.page.mouse.down();
        await this.iFrame.locator('#trash').hover()
        await this.page.mouse.up()
    }

    async checkIsImagesInTrash() {
        await expect(this.iFrame.locator('[id = "trash"] ul li h5')).toHaveText(["High Tatras 2", "High Tatras 4"]); 
    }
}
