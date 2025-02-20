import { Locator, Page } from "@playwright/test";

export default class ProfilePage {
    readonly page: Page;
    readonly profileSection: Locator;
    readonly profileName: Locator;

    constructor(page: Page) {
        this.page = page;
        this.profileSection = page.locator("//a[@routerlink='profile']");
        this.profileName = page.locator('//p[@class="profile_name display-4"]');
    }

    async openProfile() {
        await this.profileSection.click();
    }
}
