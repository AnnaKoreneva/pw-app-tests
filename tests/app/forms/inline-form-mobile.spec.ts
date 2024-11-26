import test from '@playwright/test';
import * as allure from 'allure-js-commons';
import { UsingTheGrid } from '../../../src/app/page/forms/form-layouts/using-the-grid';
import { iForms } from '../../../data/forms/iForms';
import { Navigation } from '../../../src/app/page/navigation/navigation';
import {
  FormLayouts,
  pageGroups,
} from '../../../data/navigation/navigationData';

let formData: iForms = {
  email: 'test@test.com',
  password: 'Pass123',
  userName: 'AnnaK',
  firstName: 'Anna',
  lastName: 'K',
  radios: 'Option 1',
  checkBox: true,
};

test('sign in @sign_in', async ({ page }) => {
  await allure.description(
    'The test checks if an active user with a valid password can sign in to the app.',
  );
  await allure.epic('Signing in');
  await allure.feature('Sign in with a password');
  await allure.story(
    'As an active user, I want to successfully sign in using a valid password',
  );
  await allure.tags('signin', 'ui', 'positive');
  await allure.issue(
    'https://github.com/allure-framework/allure-js/issues/331',
    'ISSUE-331',
  );

  const usingTheGrid = new UsingTheGrid(page);
  const navigation = new Navigation(page);
  await test.step('Make a sign-in attempt', async () => {
    await navigation.goToPage(pageGroups.Forms, FormLayouts);
    await usingTheGrid.signIn(formData);
    await usingTheGrid.checkTheSignInFormData(formData);
  });
});
