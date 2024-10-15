import { expect, Locator, Page } from "@playwright/test";
import { FormLayoutBase } from "./form-layout-base";
import { iForms } from "../../../../../data/forms/iForms";

export class UsingTheGrid extends FormLayoutBase {
  constructor(protected readonly page: Page) {
    super(page);
    this.cardName = "Using the Grid";
  }

  async signIn(formData: iForms) {
    await this.formCard().getByPlaceholder("Email").fill(formData.email);
    await this.formCard().getByPlaceholder("Password").fill(formData.password);
    await this.formCard().getByRole('radio', { name: formData.radios }).check({ force: true });
    await this.formCard().getByRole('button',{name: 'Sign In'}).click()
  }

  async checkTheSignInFormData(formData: iForms) {
    expect(await this.formCard().getByPlaceholder("Email").inputValue()).toEqual(formData.email);
    await expect(this.formCard().getByRole("radio", { name: formData.radios })).toBeChecked();
  }

  //locating element using locator
  private getEmail = () => this.page.locator("#inputEmail1");

  private getInlineFormEmail() {
    return this.page.getByRole("textbox", { name: "Email" }).first();
  }

  private getUserName() {
    return this.page.getByPlaceholder("Jane Doe");
  }

  // locating element using user-faced locator. playwright recommended
  private getSignIn = (): Locator => this.page.getByTestId("SignIn");

  //locating child element
  private getSignIn2 = () => {
    //return this.page.locator("nb-card").getByRole("button", { name: "Sign in" }).first();
    return this.page
      .locator("nb-card")
      .filter({ has: this.page.getByRole("checkbox") })
      .filter({ has: this.page.locator(".status-danger") })
      .getByRole("button", { name: "Sign in" });
  };

  private getOption1Radio = (): Locator =>
    this.page.locator('nb-card nb-radio :text-is("Option 1")');
  // alternative how to find child #1
  //this.page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 1")')

  //locating element using parent
  private getEmail2 = (): Locator =>
    //this.page.locator("nb-card", { hasText: "Using the Grid" }).getByRole("textbox", { name: "Email" });
    //this.page.locator("nb-card", { has: this.page.locator("#inputEmail1") }).getByRole("textbox", { name: "Email" });
    //this.page.locator("nb-card").filter({ hasText: "Using the Grid" }).getByRole("textbox", { name: "Email" });
    //this.page.locator(':text-is("Using the Grid")').locator("..").getByRole("textbox", { name: "Email" });
    this.page
      .locator("nb-card")
      .filter({ has: this.page.locator("#inputEmail1") })
      .getByRole("textbox", { name: "Email" });

  //locating element using filters
  private getSignInBasicForm = () => {
    //return this.page.locator("nb-card").getByRole("button", { name: "Sign in" }).first();
    return this.page
      .locator("nb-card")
      .filter({ has: this.page.getByRole("checkbox") })
      .filter({ has: this.page.locator(".status-danger") })
      .getByRole("button", { name: "Submit" });
  };

  //Using the Grid Form Actions
  async fillUsingGridEmail(emailValue: string) {
    await this.getEmail2().fill(emailValue);
  }

  //Example of searching for child element
  async checkRadioButton() {
    await this.getOption1Radio().click();
  }

  async clickSignIn() {
    await this.getSignIn().click();
  }

  //Inline Form Elements Actions
  async fillInlineFormEmail(emailValue: string) {
    await this.getInlineFormEmail().fill(emailValue);
  }

  async fillUserName(userName: string) {
    await this.getUserName().fill(userName);
  }

  async clickSignInBasicForm() {
    await this.getSignInBasicForm().click();
  }
}