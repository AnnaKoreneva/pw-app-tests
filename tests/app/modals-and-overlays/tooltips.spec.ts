import { fixtures as test } from '../../fixture.ts';

test('tooltips', async ({ tooltipPage }) => {
    await tooltipPage.isTopTooltipVisible();
});
