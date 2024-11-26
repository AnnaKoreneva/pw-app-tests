import { fixtures as test } from '../../fixture';
import { AllureHelper } from '../../../src/helpers/allureHelper';

test.describe.configure({ retries: 1, timeout: 50000 });

test('IoT Dashboard: set slider to max using JS and check the temperature value', async ({ dashboardPage }) => {
    await AllureHelper.step('set slider to max using JS and check the temperature value', async () => {
    await dashboardPage.moveGaugeToMaxTemp();
    await dashboardPage.checkTemp('30');
  });
});

test('IoT Dashboard: set sliders to max using the axis coordinates', async ({dashboardPage}) => {
  await AllureHelper.step('set slider to max using axis coordinates and check the temperature value', async () => {
      await dashboardPage.moveGaugeToMax();
      await dashboardPage.checkTemp('30');
    },
  );
});

test('IoT Dashboard: set sliders to min using the axis coordinates', async ({dashboardPage}) => {
  await AllureHelper.step('set slider to min using axis coordinates and check the temperature value',async () => {
      await dashboardPage.moveGaugeToMin();
      await dashboardPage.checkTemp('12');
    },
  );
});




