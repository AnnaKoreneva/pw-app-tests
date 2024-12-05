import { fixtures as test } from '../../fixture';

test('browser dialog box: delete table row', async ({ smartTablePage }) => {
    await smartTablePage.deleteRaw();
});

test('PageManager => browser dialog box: delete table row', async ({ pageManager }) => {
    await pageManager.onSmartTablePage().navigateToSmartTablePage();
    await pageManager.onSmartTablePage().deleteRaw();
});

test('edit the age using unique email value', async ({ smartTablePage }) => {
    await smartTablePage.navigateToSmartTablePage();
    await smartTablePage.editRowModeActivate('twitter@outlook.com');
    await smartTablePage.editAge('55');
    await smartTablePage.saveChanges();
});

test('edit the email using the unique id value', async ({ smartTablePage }) => {
    await smartTablePage.navigateToSmartTablePage();
    await smartTablePage.editRawModeOn('60');
    await smartTablePage.editEmail('test@test.com');
    await smartTablePage.saveChanges();
});

test('age search', async ({ smartTablePage }) => {
    const ages = ['28', '45', '18', '20', '200'];
    await smartTablePage.navigateToSmartTablePage();
    await smartTablePage.ageSearch(ages);
});
