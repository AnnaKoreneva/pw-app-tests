import { Locator, Page, expect } from "@playwright/test";

export class Tooltip {
  constructor(private readonly page: Page) { }
  tooltipPlacementCard: Locator = this.page.locator("nb-card", {
    hasText: "Tooltip Placements",
  });
  top: Locator = this.tooltipPlacementCard.getByRole("button", { name: "Top" });
  topTooltip: Locator = this.page.getByText("This is a tooltip");

  async hover(locator: Locator) {
    await locator.hover();
  }

  async isTopTooltipVisible() {
    await this.hover(this.top);
    await expect(this.topTooltip).toBeVisible();
  }

  async openTooltipPage() {
    await this.page.goto("http://localhost:4200/pages/modal-overlays/tooltip");
  }

} 