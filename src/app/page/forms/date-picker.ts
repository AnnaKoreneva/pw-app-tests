import { Locator, Page, expect } from "@playwright/test";
import { getRandomDate, getRandomStartEndNumbers } from "../../../helpers/randomDate";

export class DatePicker {
  constructor(private readonly page: Page) {}

  async navigateToDatePickerPage() {
    await this.page.goto("http://localhost:4200/pages/forms/datepicker");
  }

  datePicker = (datePickerPlaceholder: string): Locator =>
    this.page.getByPlaceholder(datePickerPlaceholder);

  
  private async setMonthAndYear(monthYear: string) {
    let calendarMonthAndYear = await this.page
       .locator("nb-calendar-view-mode")
       .textContent();

    while (!calendarMonthAndYear?.includes(monthYear)) {
      await this.page.locator("[data-name = 'chevron-right']").click();
      calendarMonthAndYear = await this.page
         .locator("nb-calendar-view-mode")
         .textContent();
    }
  }

  private async setDateInDataPicker(numberOfDaysFromToday: number) {
    const randomDate = getRandomDate(numberOfDaysFromToday);
    await this.setMonthAndYear(randomDate[2]);
    await this.page
      .locator('[class="day-cell ng-star-inserted"]')
      .getByText(randomDate[0], { exact: true })
      .click();
    await expect(this.datePicker("Form Picker")).toHaveValue(randomDate[1]);
  }

  private async setRangeDateInDataPicker(startNumber: number, endNumber: number) {
    const randomStartDate = getRandomDate(startNumber);
    await this.setMonthAndYear(randomStartDate[2]);
    await this.page
      .locator('[class="range-cell day-cell ng-star-inserted"]')
      .getByText(randomStartDate[0], { exact: true })
      .click();
    const randomEndDate = getRandomDate(endNumber);
    await this.setMonthAndYear(randomEndDate[2]);
    await this.page
      .locator('[class="range-cell day-cell ng-star-inserted"]')
      .getByText(randomEndDate[0], { exact: true })
      .click();
    await expect(this.datePicker("Range Picker")).toHaveValue(`${randomStartDate[1]} - ${randomEndDate[1]}`);
  }
    
  async setFormPickerAndCheckSelection() {
    const datesFromToday = getRandomStartEndNumbers();
    await this.datePicker("Form Picker").click();
    await this.setDateInDataPicker(datesFromToday[0]);
  }

  async setRangePickerAndCheckSelection() {
    const datesFromToday = getRandomStartEndNumbers();
    await this.datePicker("Range Picker").click();
    await this.setRangeDateInDataPicker(datesFromToday[0], datesFromToday[1]);
  }
};