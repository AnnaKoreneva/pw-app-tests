import { Locator, Page, expect } from "@playwright/test";
import { getRandomDate } from "../../../services/date";

export class DatePicker {
  constructor(private readonly page: Page) {}

  async navigateToDatePickerPage() {
    await this.page.goto("http://localhost:4200/pages/forms/datepicker");
  }

  datePicker = (datePickerPlaceholder: string): Locator =>
    this.page.getByPlaceholder(datePickerPlaceholder);

  randomDate: string[] = getRandomDate();

  async setTodayOrFutureDateInDataPicker() {
    await this.datePicker("Form Picker").click();
    let calendarMonthAndYear = await this.page
      .locator("nb-calendar-view-mode")
      .textContent();

    while (!calendarMonthAndYear?.includes(this.randomDate[2])) {
      await this.page.locator("[data-name = 'chevron-right']").click();
      calendarMonthAndYear = await this.page
        .locator("nb-calendar-view-mode")
        .textContent();
    }

    await this.page
      .locator('[class="day-cell ng-star-inserted"]')
      .getByText(this.randomDate[0], { exact: true })
      .click();
  }

  async setTodayOrFutureDateUsingInput() {
    await this.datePicker("Form Picker").fill(this.randomDate[1]);
    this.page.keyboard.press('Tab')
  }

  async checkDatePickerSetValue() {
    await expect(this.datePicker("Form Picker")).toHaveValue(this.randomDate[1]);
  }
}