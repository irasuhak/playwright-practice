import { test, expect } from '@playwright/test';
import HomePage from '../../page-objects/pages/HomePage';
import SignInForm from '../../page-objects/forms/SignInForm';
import { credentials } from '../../test-data/usersData';

test.describe('Setup user - get states', () => {
    let homePage: HomePage;
    let signInForm: SignInForm;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        signInForm = new SignInForm(page);

        await homePage.open();
        await homePage.clickSignInButton();
    })

    test('Log in and save state for a user', async ({ page }) => {
        await signInForm.loginWithCredentials(credentials.userOne.email, credentials.userOne.password);

        await expect(page).toHaveURL('https://qauto.forstudy.space/panel/garage');
        await expect(page).toHaveTitle('Hillel Qauto');
        await page.context().storageState({ path: './test-data/states/userOneState.json' });
    });

})