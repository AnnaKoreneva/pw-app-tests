import test from "@playwright/test";
import { InlineForm } from "../../../src/app/page/forms/form-layouts/inline-form";
import { UsingTheGrid } from "../../../src/app/page/forms/form-layouts/using-the-grid";
import { iForms } from "../../../data/forms/iForms";

let formData: iForms = {
  email: "test@test.com",
  password: "Pass123",
  userName: "AnnaK",
  firstName: "Anna",
  lastName: "K",
  radios: "Option 1",
  checkBox: true,
};

test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:4200/pages/forms/layouts");
})

test.describe("using the grid form", () => {
  test("sign in", async ({ page }) => {
    const usingTheGrid = new UsingTheGrid(page);
    await usingTheGrid.signIn(formData);
    await usingTheGrid.checkTheSignInFormData(formData);
  })
})

test.describe("inline form", () => {
  test("email fill", async ({ page }) => {
    const inlineForm = new InlineForm(page);
    await inlineForm.submitInlineForm(formData);
    await inlineForm.checkInputValues(formData);
  });
    
});
