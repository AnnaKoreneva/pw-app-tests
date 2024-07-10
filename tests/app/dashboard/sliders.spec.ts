import { fixtures as test } from "../../fixture";

test("set sliders to max using JS", async ({ dashboardPage }) => {
    await dashboardPage.moveGaugeToMaxTemp();
    await dashboardPage.checkTemp("30");  
})

test("set sliders to max using the axis coordinates", async ({dashboardPage,}) => {
  await dashboardPage.moveGaugeToMax();
  await dashboardPage.checkTemp("30");
});

test("set sliders to min using the axis coordinates", async ({dashboardPage,}) => {
  await dashboardPage.moveGaugeToMin();
  await dashboardPage.checkTemp("12");
});