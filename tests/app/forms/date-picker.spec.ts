import { fixtures as test } from "../../fixture";

test.describe.configure({ retries: 1, timeout: 50000 });
test('set today or future date using date-picker selection', async ({ datePickerPage }) => {
    await datePickerPage.setCommonDatePickerAndCheckValue();
})

test('set today or future date using date-picker input', async ({ datePickerPage }) => {
    await datePickerPage.setRangePickerAndCheckSelection();
})