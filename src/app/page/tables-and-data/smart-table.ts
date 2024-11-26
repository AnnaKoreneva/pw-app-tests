import { Locator, Page, expect } from '@playwright/test';

export class SmartTable {
  constructor(private readonly page: Page) {}

  private uniqueTableRaw = (email: string): Locator =>
    this.page.getByRole('row', { name: email });

  private deleteIcon = this.page
    .getByRole('table')
    .locator('tr', { hasText: 'mdo@gmail.com' })
    .locator('.nb-trash');

  async navigateToSmartTablePage() {
    await this.page.goto('http://localhost:4200/pages/tables/smart-table');
  }

  async deleteRaw() {
    this.page.on('dialog', (dialog) => {
      expect(dialog.message()).toEqual('Are you sure you want to delete?');
      dialog.accept().catch(() => {});
    });
    await this.deleteIcon.click();
    await expect(this.page.locator('tbody tr').first()).not.toHaveText(
      'mdo@gmail.com',
    );
  }

  //Option 1: get the reqired row using the unique value, such as email
  async editRowModeActivate(email: string) {
    await this.uniqueTableRaw(email).locator('.nb-edit').click();
  }

  //Option 2: get the reqired row using the unique value in specific column
  async editRawModeOn(id: string) {
    //const tableRaws = this.page.locator('tbody tr').all();
    const idRow = this.page
      .getByRole('row', { name: id })
      .filter({ has: this.page.locator('td').nth(1).getByText(id) });
    while (await idRow.isHidden()) {
      await this.page.locator("[aria-label='Next']").click();
    }
    await idRow.locator('.nb-edit').click();
  }

  private async editTableValue(placeholder: string, value: string) {
    await this.page
      .locator('input-editor')
      .getByPlaceholder(placeholder)
      .clear();
    await this.page
      .locator('input-editor')
      .getByPlaceholder(placeholder)
      .fill(value);
  }

  async editAge(age: string) {
    this.editTableValue('Age', age);
  }

  async editEmail(email: string) {
    this.editTableValue('E-mail', email);
  }

  private async columnSearch(placeholder: string, value: string) {
    await this.page
      .locator('input-filter')
      .getByPlaceholder(placeholder)
      .clear();
    await this.page
      .locator('input-filter')
      .getByPlaceholder(placeholder)
      .fill(value);
  }

  async ageSearch(ages: string[]) {
    for (const age of ages) {
      await this.columnSearch('Age', age);
      await this.page.waitForTimeout(1000);
      if (Number(age) >= 150) {
        await expect(this.page.getByText('No data found')).toBeVisible();
      } else {
        for (const row of await this.page.locator('tbody tr').all()) {
          await expect(row.locator('td').last()).toHaveValue(age);
        }
      }
    }
  }

  async saveChanges() {
    await this.page.locator('.nb-checkmark').click();
  }
}
