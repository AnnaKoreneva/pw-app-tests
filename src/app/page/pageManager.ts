import { Page } from '@playwright/test';
import { SmartTable } from './tables-and-data/smart-table';
import { DatePicker } from './forms/date-picker';
import { UsingTheGrid } from './forms/form-layouts/using-the-grid';
import { Navigation } from './navigation/navigation';

export class PageManager {
    smartTablePage: SmartTable;
    datePickerPage: DatePicker;
    usingTheGrid: UsingTheGrid;
    navigation: Navigation;

    constructor(private readonly page: Page) {
        this.smartTablePage = new SmartTable(this.page);
        this.datePickerPage = new DatePicker(this.page);
        this.usingTheGrid = new UsingTheGrid(this.page);
        this.navigation = new Navigation(this.page);
    }

    onSmartTablePage = () => this.smartTablePage;
    onDatePickerPage = () => this.datePickerPage;
    onNavigationComponent = () => this.navigation;
    onUsingThegridForm = () => this.usingTheGrid;
}
