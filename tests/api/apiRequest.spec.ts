import { expect } from '@playwright/test';
import { fixtures as test } from '../fixture';

test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByText('Sign in').click();
    await page.getByPlaceholder('Email').fill('pwtest1409@test.com');
    await page.getByPlaceholder('password').fill('pwtest1409');
    await page.getByRole('button', { name: 'Sign in' }).click();
});

test('delete article', async ({ page, api: API }) => {
    const token = await API.postReqGetToken(
        'https://conduit-api.bondaracademy.com/api/users/login',
        {
            user: {
                email: 'pwtest1409@test.com',
                password: 'pwtest1409',
            },
        },
    );

    const artCreationRes = await API.postReq(
        'https://conduit-api.bondaracademy.com/api/articles/',
        {
            article: {
                title: 'New Test Article',
                description: 'New Test Description',
                body: 'New Test Body',
                tagList: [],
            },
        },
        token,
    );
    expect(artCreationRes.status()).toEqual(201);

    await page.getByText('Global Feed').click();
    await page.getByText('New Test Article').click();
    await page.waitForTimeout(1000);
    await page.getByRole('button', { name: 'Delete Article' }).first().click();
    await page.getByText('Global Feed').click();
    await expect(page.locator('app-article-preview h1').first()).not.toContainText(
        'New Test Article',
    );
    await page.close();
});
