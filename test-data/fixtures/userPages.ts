import { test as base } from '@playwright/test';
import GaragePage from '../../page-objects/pages/GaragePage';
import ProfilePage from '../../page-objects/pages/ProfilePage';

type FixturePages = {
    garagePage: GaragePage;
    profilePage: ProfilePage;
};

export const test = base.extend<FixturePages>({
    garagePage: async ({ browser }, use) => {
        const context = await browser.newContext({ 
            storageState: './test-data/states/userOneState.json' 
        });
        const page = await context.newPage();

        const garagePage = new GaragePage(page);
        await garagePage.open(); 

        await use(garagePage); 

        await garagePage.removeLastAddedCar();

        await context.close();
    },

    profilePage: async ({ browser }, use) => {
        const context = await browser.newContext({ 
            storageState: './test-data/states/userOneState.json' 
        });
        const page = await context.newPage();

        const profilePage = new ProfilePage(page);
        await profilePage.openProfile(); 

        await use(profilePage); 

        await context.close();
    },
});


export { expect } from '@playwright/test';