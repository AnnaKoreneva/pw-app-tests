import { fixtures as test } from "../../fixture";

test('set today or future date using date-picker selection', async ({ datePickerPage }) => {
    await datePickerPage.setTodayOrFutureDateInDataPicker();
    await datePickerPage.checkDatePickerSetValue();
})

test('set today or future date using date-picker input', async ({ datePickerPage }) => {
    await datePickerPage.setTodayOrFutureDateUsingInput();
    await datePickerPage.checkDatePickerSetValue();
})