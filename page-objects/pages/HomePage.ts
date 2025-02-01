import { Locator, Page } from "@playwright/test";

export default class HomePage {
    readonly page: Page;
    readonly signUpButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.signUpButton = page.getByText('Sign Up');
    }

    async open() {
        await this.page.goto('/');
    }

    async clickSignUpButton() {
        await this.signUpButton.click();
    }
}