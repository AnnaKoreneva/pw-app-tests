import { fixtures as test } from '../../fixture';
import { UsingTheGrid } from '../../../src/app/page/forms/form-layouts/using-the-grid';
import { iForms } from '../../../data/forms/iForms';

let formData: iForms = {
    email: 'test@test.com',
    password: 'Pass123',
    userName: 'AnnaK',
    firstName: 'Anna',
    lastName: 'K',
    radios: 'Option 1',
    checkBox: true,
};

test.describe('using the grid form', () => {
    test('sign in', async ({ page }) => {
        const usingTheGrid = new UsingTheGrid(page);
        await usingTheGrid.navigateToFormLayouts();
        await usingTheGrid.signIn(formData);
        await usingTheGrid.checkTheSignInFormData(formData);
    });
});

test.describe('inline form', () => {
    test('email fill', async ({ formLayoutsPageInlineComponent }) => {
        await formLayoutsPageInlineComponent.submitInlineForm(formData);
        await formLayoutsPageInlineComponent.checkInputValues(formData);
    });
});
