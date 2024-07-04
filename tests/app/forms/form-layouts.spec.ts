import test from "@playwright/test";
import { FormLayout } from "../../../src/app/page/forms/form-layouts/form-layout";
import { InlineForm } from "../../../src/app/page/forms/form-layouts/inline-form";

test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:4200/pages/forms/layouts");
})

test.describe("using the grid form", () => {

   test("email fill", async ({ page }) => {
     const formLayout = new FormLayout(page);
     await formLayout.fillUsingGridEmail("test");
     await formLayout.checkRadioButton();
     await formLayout.clickSignIn();
   }); 
    
})

test.describe("inline form", () => {

  test("email fill", async ({ page }) => {
    const inlineForm = new InlineForm(page);
    await inlineForm.submitInlineForm('Anna Koreneva', 'test@test.com')
    await inlineForm.checkInputValues("Anna Koreneva", "test@test.com");
  });
    
});

test.describe("basic form", () => {
  test("click sign in", async ({ page }) => {
    const formLayout = new FormLayout(page);
    await formLayout.clickSignInBasicForm()
  });
});
