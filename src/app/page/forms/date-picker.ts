import { Locator, Page, expect } from '@playwright/test';
import { randomInt } from 'crypto';

export class DatePicker {
    constructor(private readonly page: Page) {}

    async navigateToDatePickerPage() {
        await this.page.goto('http://localhost:4200/pages/forms/datepicker');
    }

    private datePicker = (datePickerPlaceholder: string): Locator =>
        this.page.getByPlaceholder(datePickerPlaceholder);

    private async setDatePicker(numberOfDaysFromToday: number) {
        var dateTemp = new Date();

        dateTemp.setDate(dateTemp.getDate() + numberOfDaysFromToday);
        const date = dateTemp.getDate().toString();
        const monthShort = dateTemp.toLocaleString('en-US', { month: 'short' });
        const monthLong = dateTemp.toLocaleString('en-US', { month: 'long' });
        const year = dateTemp.getFullYear();
        const fullDate = `${monthShort} ${date}, ${year}`;
        const datePickerHeaderValue = `${monthLong} ${year}`;

        let calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent();
        while (!calendarMonthAndYear?.includes(datePickerHeaderValue)) {
            await this.page.locator("[data-name = 'chevron-right']").click();
            calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent();
        }
        await this.page
            .locator('.day-cell.ng-star-inserted')
            .getByText(date, { exact: true })
            .click();
        return fullDate;
    }

    private getRandomStartEndNumbers = (): number[] => {
        const startNumber = randomInt(0, 256);
        const endNumber = startNumber + randomInt(0, 256);
        return [startNumber, endNumber];
    };

    async setCommonDatePickerAndCheckValue() {
        await this.datePicker('Form Picker').click();
        var dateFromNow = this.getRandomStartEndNumbers();
        var fullDate = await this.setDatePicker(dateFromNow[0]);
        await this.page.screenshot({ path: 'screens/datePicker.png' });
        await expect(this.datePicker('Form Picker')).toHaveValue(fullDate);
    }

    async setRangePickerAndCheckSelection() {
        var dateFromNow = this.getRandomStartEndNumbers();
        await this.datePicker('Range Picker').click();
        await this.page
            .locator('nb-card', { hasText: 'Common Datepicker' })
            .screenshot({ path: 'screens/datePickerComponent.png' });
        var startDate = await this.setDatePicker(dateFromNow[0]);
        var endDate = await this.setDatePicker(dateFromNow[1]);
        var fullDate = `${startDate} - ${endDate}`;
        await expect(this.datePicker('Range Picker')).toHaveValue(fullDate);
    }
}
