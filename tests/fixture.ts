import { test as base } from "@playwright/test";
import { ApiUtils } from "../src/api/apiUtils.ts";
import { Tooltip } from "../src/app/page/modals-and-overlays/tooltip.ts";
import { SmartTable } from "../src/app/page/tables-and-data/smart-table.ts";
import { DatePicker } from "../src/app/page/forms/date-picker.ts";
import { Dashboard } from "../src/app/page/iot-dashboard/iotDashboard.ts";
import { DragDropAndIframe } from "../src/app/page/externalSite/dragDropAndIframe.ts";
import { Navigation } from "../src/app/page/navigation/navigation.ts";
import { PageManager } from "../src/app/page/pageManager.ts";
import { InlineForm } from "../src/app/page/forms/form-layouts/inline-form.ts";
import { FormLayoutBase } from "../src/app/page/forms/form-layouts/form-layout-base.ts";

type MyFixture = {
  API: ApiUtils;
  tooltipPage: Tooltip;
  smartTablePage: SmartTable;
  datePickerPage: DatePicker;
  dashboardPage: Dashboard;
  dragAndDropPage: DragDropAndIframe;
  navigatePage: Navigation;
  pageManager: PageManager;
  formLayoutsPageInlineComponent: InlineForm;
};

const fixtures = base.extend<MyFixture>({
  API: async ({ request }: any, use: (arg0: any) => any) => {
    const API = new ApiUtils(request);
    await use(API);
  },

  tooltipPage: async ({ page }, use) => {
    const tooltipPage = new Tooltip(page);
    await tooltipPage.navigateToTooltipPage();
    console.log('Pre-condition')
    await use(tooltipPage);
    console.log('Tear Down: Everything typed after word use will be run after test execution!')
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

  navigatePage: async ({ page }, use) => {
    const navigatePage = new Navigation(page)
    await use(navigatePage);
  },

  pageManager: async ({ page }, use) => {
    const pageManager = new PageManager(page)
    await use(pageManager);
  },

  formLayoutsPageInlineComponent: async ({ page }, use) => {
    const formLayoutsPageInlineComponent = new InlineForm(page);
    await formLayoutsPageInlineComponent.navigateToFormLayouts();
    await use(formLayoutsPageInlineComponent);
  }

});

export { fixtures };
