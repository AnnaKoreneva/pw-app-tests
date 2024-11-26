import { Page, expect } from '@playwright/test';
import { FormLayoutBase } from './form-layout-base';
import { iForms } from '../../../../../data/forms/iForms';

export class InlineForm extends FormLayoutBase {
  constructor(protected readonly page: Page) {
    super(page);
    this.cardName = 'Inline Form';
  }

  async submitInlineForm(formData: iForms) {
    await this.formCard().getByPlaceholder('Jane Doe').fill(formData.userName);
    await this.email().pressSequentially(formData.email, { delay: 500 });
    await this.formCard().getByRole('checkbox').check({ force: true });
    await this.formCard().getByRole('button', { name: 'Submit' }).click();
  }

  /** The function takes two parameters
   * which represents the expected values
   * @param userName
   * @param userEmail
   */
  async checkInputValues(formData: iForms) {
    const userNameValue = this.formCard().getByPlaceholder('Jane Doe');
    await expect(userNameValue).toHaveValue(formData.userName);
    await expect(this.email()).toHaveValue(formData.email);
  }
}
