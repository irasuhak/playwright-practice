import test, { expect } from "@playwright/test";
import HomePage from "../../page-objects/pages/HomePage";
import SignInForm from "../../page-objects/forms/SignInForm";
import ProfilePage from "../../page-objects/pages/ProfilePage";
import { credentials } from "../../test-data/usersData";

test.describe("Profile Page - Mocking", () => {
    test("Change user's name and surname", async ({ page }) => {

        const homePage = new HomePage(page);
        const signInForm = new SignInForm(page);
        const profilePage = new ProfilePage(page);

        const profileBody = {
            "status": "ok",
            "data": {
                "userId": 170683,
                "photoFilename": "default-user.png",
                "name": "King", 
                "lastName": "Penguin", 
                "dateBirth": "2021-03-17T00:00:00.000Z",
                "country": "Ukraine"
            }
        };

        await page.route('**/api/users/profile', async (route) => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(profileBody),
            });
        });

        await homePage.open();
        await homePage.clickSignInButton();
        await signInForm.loginWithCredentials(credentials.userOne.email, credentials.userOne.password);

        await profilePage.openProfile();
       
        await expect(profilePage.profileName).toHaveText("King Penguin");
    });
});