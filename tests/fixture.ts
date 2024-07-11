/**
Import Statements:
import { test as base } from '@playwright/test': This imports the test function from the @playwright/test module, renaming it to base. This function is likely used to define tests in Playwright.
import api from "../api/apiUtils": This imports api from the apiUtils module located in the relative path ../api/apiUtils.

Type Declaration:
type MyFixture: This defines a TypeScript type called MyFixture, which has a single property named API of type api.

Fixture Extension:
const fixtures = base.extend<MyFixture>({...}): This extends the base fixture (likely provided by Playwright) with custom functionality. It takes an object as an argument with properties corresponding to fixture names (API in this case) and their implementations.

Fixture Implementation:
API: async ({ request }, use) => { ... }: This is the implementation of the API fixture. It is an asynchronous function that takes an object { request } and a use function. Inside the function, it creates an instance of the api class with the provided request, then it awaits the use function with the created API instance as an argument. This essentially allows the test to use the API instance within its scope.

Export Statement:
export { fixtures }: This exports the fixtures object, presumably to be used elsewhere in your codebase.
**/

import { test as base } from "@playwright/test";
import { ApiUtils } from "../src/api/apiUtils.ts";
import { Tooltip } from "../src/app/page/modals-and-overlays/tooltip.ts";
import { SmartTable } from "../src/app/page/tables-and-data/smart-table.ts";
import { DatePicker } from "../src/app/page/forms/date-picker.ts";
import { Dashboard } from "../src/app/page/dashboard.ts";
import { DragDropAndIframe } from "../src/app/page/externalSite/dragDropAndIframe.ts";

type MyFixture = {
  API: ApiUtils;
  tooltipPage: Tooltip;
  smartTablePage: SmartTable;
  datePickerPage: DatePicker;
  dashboardPage: Dashboard;
  dragAndDropPage: DragDropAndIframe;
};

const fixtures = base.extend<MyFixture>({
  API: async ({ request }: any, use: (arg0: any) => any) => {
    const API = new ApiUtils(request);
    await use(API);
  },

  tooltipPage: async ({ page }, use) => {
    const tooltipPage = new Tooltip(page);
    await tooltipPage.navigateToTooltipPage();
    await use(tooltipPage);
  },

  smartTablePage: async ({ page }, use) => {
    const smartTablePage = new SmartTable(page);
    await smartTablePage.navigateToSmartTablePage();
    await use(smartTablePage);
  },

  datePickerPage: async ({ page }, use) => {
    const datePickerPage = new DatePicker(page);
    await datePickerPage.navigateToDatePickerPage();
    await use(datePickerPage);
  },

  dashboardPage: async ({ page }, use) => {
    const dashboardPage = new Dashboard(page);
    await dashboardPage.navigateToDashboardPage();
    await use(dashboardPage);
  },

  dragAndDropPage: async ({ page }, use) => {
    const dragAndDropPage = new DragDropAndIframe(page);
    await dragAndDropPage.navigateToDragAndDrop();
    await use(dragAndDropPage);
  },
});

export { fixtures };
