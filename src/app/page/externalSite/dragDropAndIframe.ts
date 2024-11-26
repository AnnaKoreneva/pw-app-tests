import { Locator, Page, expect } from '@playwright/test';
import { extWebPage } from '../../../../data/navigation/navigationData.ts';

export class DragDropAndIframe {
  constructor(private readonly page: Page) {}

  async navigateToDragAndDrop() {
    await this.page.goto(extWebPage.DragDropAndIframe);
  }

  protected iFrame = (): Locator =>
    this.page.locator("[rel-title = 'Photo Manager'] iframe");

  async dragAndDropImage() {
    await this.iFrame()
      .contentFrame()
      .locator('li', { hasText: 'High Tatras 2' })
      .dragTo(this.iFrame().contentFrame().locator('#trash'));
  }

  async dragAndDropMouse() {
    await this.iFrame()
      .contentFrame()
      .locator('li', { hasText: 'High Tatras 4' })
      .hover();
    await this.page.mouse.down();
    await this.iFrame().contentFrame().locator('#trash').hover();
    await this.page.mouse.up();
  }

  async checkIsImagesInTrash() {
    await expect(
      this.iFrame().contentFrame().locator('[id = "trash"] ul li h5'),
    ).toHaveText(['High Tatras 2', 'High Tatras 4']);
  }
}
