import { Page } from "@playwright/test";
import { SmartTable } from "./tables-and-data/smart-table";
import { DatePicker } from "./forms/date-picker";

export class PageManager{
    smartTablePage: SmartTable
    datePickerPage: DatePicker

    constructor(private readonly page: Page) {
        this.smartTablePage = new SmartTable(this.page);
        this.datePickerPage = new DatePicker(this.page);    
    }

    onSmartTablePage = () => this.smartTablePage
    onDatePickerPage = () => this.datePickerPage

}