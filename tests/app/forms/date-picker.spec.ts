import { fixtures as test } from "../../fixture";

test('set today or future date using date-picker selection', async ({ datePickerPage }) => {
    await datePickerPage.setCommonDatePickerAndCheckValue();
})

test('set today or future date using date-picker input', async ({ datePickerPage }) => {
    await datePickerPage.setRangePickerAndCheckSelection();
})