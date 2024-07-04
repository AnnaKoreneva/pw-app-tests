import { Page, expect } from "@playwright/test";
import { FormLayoutBase } from "./form-layout-base";

export class InlineForm extends FormLayoutBase {
  constructor(protected readonly page: Page) {
    super(page);
    this.cardName = "Inline Form";
  }

  async submitInlineForm(userName: string, userEmail: string) {
    await this.formCard().getByPlaceholder("Jane Doe").fill(userName);
    //await this.email().fill(userEmail);
    await this.email().pressSequentially(userEmail,{delay: 500})
    await this.formCard().getByRole("checkbox").check({ force: true });
    await this.formCard().getByRole("button", { name: "Submit" }).click();
  }

  /** The function takes two parameters
   * which represents the expected values
   * @param userName
   * @param userEmail
   */
  async checkInputValues(userName: string, userEmail: string) {
    // Generic assertion
    const userNameValue = await this.formCard().getByPlaceholder("Jane Doe").inputValue()
    expect(userNameValue).toEqual(userName)
    // Locator assertion
    await expect(this.email()).toHaveValue(userEmail);
  }
}