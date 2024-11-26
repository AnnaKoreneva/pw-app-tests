import { Locator, Page } from '@playwright/test';
import { intWebPage } from '../../../../../data/navigation/navigationData';

export class FormLayoutBase {
  cardName: string;

  constructor(protected readonly page: Page) {
    this.cardName = this.cardName;
  }

  protected formCard = (): Locator =>
    this.page.locator('nb-card', { hasText: this.cardName });

  protected email = (): Locator =>
    this.formCard().getByRole('textbox', { name: 'Email' });

  async navigateToFormLayouts() {
    await this.page.goto(intWebPage.FormLayouts);
  }
}
