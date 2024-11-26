import { Locator, Page, expect } from '@playwright/test';
import { AllureHelper } from '../../../helpers/allureHelper';

/**
 * This class initialise the elements on the iOt Dashboard page and describes
 * two ways of working with the gauge:
 * 1. Update the html code
 * 2. Move slider  using the coordinates and mouse what mimics the end user action
 */

export class Dashboard {
  constructor(private readonly page: Page) {}

  async navigateToDashboardPage() {
    await this.page.goto('http://localhost:4200/pages/iot-dashboard');
  }

  private get TemperatureBox() {
    return this.page.locator(
      '[tabtitle="Temperature"] ngx-temperature-dragger',
    );
  }

  // #1 option
  async moveGaugeToMaxTemp() {
    AllureHelper.step(
      'set slider to max value updating the JS cx and cy attributes',
      async () => {
        const tempGauge = this.page.locator(
          '[tabtitle="Temperature"] ngx-temperature-dragger circle',
        );

        await tempGauge.evaluate((node) => {
          node.setAttribute('cx', '231.22');
          node.setAttribute('cy', '231.22');
        });
        await tempGauge.click();
      });
  };

  async checkTemp(expectedVal: string) {
      await AllureHelper.step('check that slider set to the max value', async () => {
      await AllureHelper.addParameter('max temperature', expectedVal);
      await expect(this.TemperatureBox).toContainText(expectedVal);
    });
  };

  getTemperatureBox(TemperatureBox: any) {
    throw new Error('Method not implemented.');
  };

  // #2 option
  private async moveGauge(x1: number, y1: number) {
    // to be able to emulate the mouse movement it is required to mage the element fully visible on the screen
    await this.TemperatureBox.scrollIntoViewIfNeeded();

    //now we need to define the axis of coordinates to move the mouse. it will be around the box
    const box = await this.TemperatureBox.boundingBox();

    //we would like to set the mouse in the middle of the box. We need to define the middle of coordinates axis box.x + box.width / 2
    if (box !== null) {
      const x = box.x + box.width / 2;
      const y = box.y + box.height / 2;
      await this.page.mouse.move(x, y);

      await this.page.mouse.down();
      await this.page.mouse.move(x + x1, y);
      await this.page.mouse.move(x + x1, y + y1);
      await this.page.mouse.up();
    }
  }

  async moveGaugeToMax() {
    await this.moveGauge(150, 150);
  }

  async moveGaugeToMin() {
    await this.moveGauge(-150, 150);
  }
}
