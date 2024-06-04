import test from "@playwright/test";
import { FormLayout } from "../../src/ui/pages/forms/form-layout";

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
    const formLayout = new FormLayout(page);
    await formLayout.fillInlineFormEmail("test");
    await formLayout.fillUserName("Anna")
  });
    
});

test.describe("basic form", () => {
  test("click sign in", async ({ page }) => {
    const formLayout = new FormLayout(page);
    await formLayout.clickSignInBasicForm()
  });
});
