import { test as base, chromium } from '@playwright/test';
import GaragePage from '../../page-objects/pages/GaragePage';

type FixturePages = {
    garagePage: GaragePage;
};

export const test = base.extend<FixturePages>({
    garagePage: async ({}, use) => {
        const browser = await chromium.launch();
        const context = await browser.newContext({ storageState: './test-data/states/userOneState.json' });
        const page = await context.newPage();

        const garagePage = new GaragePage(page);
        await garagePage.open(); 

        await use(garagePage); 

        await garagePage.removeLastAddedCar();

        await context.close();
        await browser.close();
    },
});

export { expect } from '@playwright/test';