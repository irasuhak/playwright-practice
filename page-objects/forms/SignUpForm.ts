import { expect, Locator, Page } from "@playwright/test";

export default class SignUpForm {
    readonly page: Page;
    readonly nameField: Locator;
    readonly lastNameField: Locator;
    readonly emailField: Locator;
    readonly passwordField: Locator;
    readonly repeatPasswordField: Locator;
    readonly registerButton: Locator;
    readonly errorMessage: Locator;
    readonly successPopup: Locator;
    

    constructor(page: Page) {
        this.page = page;
        this.nameField = page.locator("//input[@id='signupName']");
        this.lastNameField = page.locator("//input[@id='signupLastName']");
        this.emailField = page.locator("//input[@id='signupEmail']");
        this.passwordField = page.locator("//input[@id='signupPassword']");
        this.repeatPasswordField = page.locator("//input[@id='signupRepeatPassword']");
        this.registerButton = page.locator("//button[contains(@class, 'btn-primary') and contains(text(), 'Register')]");
        this.errorMessage = page.locator("//div[contains(@class, 'invalid-feedback')]//p");
        this.successPopup = page.locator("//div[contains(@class, 'alert alert-success')]//p"); 
    }

    async enterName(name: string) {
        await this.nameField.fill(name);
    }

    async enterLastName(lastName: string) {
        await this.lastNameField.fill(lastName);
    }

    async enterEmail(email: string) {
        await this.emailField.fill(email);
    }

    async enterPassword(password: string) {
        await this.passwordField.fill(password);
    }

    async repeatPassword(repeatPassword: string) {
        await this.repeatPasswordField.fill(repeatPassword);
    }
    
    async clickRegisterButton() {
        await this.registerButton.click();
    }

    async verifySuccessPopupByText(text: string) {
        await expect(this.successPopup).toHaveText(text);
    }

    async triggerErrorOnField(fieldName: string) {
        let field: Locator;
    
        switch (fieldName) {
            case 'name':
                field = this.nameField;
                break;
            case 'lastName':
                field = this.lastNameField;
                break;
            case 'email':
                field = this.emailField;
                break;
            case 'password':
                field = this.passwordField;
                break;
            case 'repeatPassword':
                field = this.repeatPasswordField;
                break;
            default:
                throw new Error(`Field "${fieldName}" is not recognized`);
        }
    
        await field.focus();  
        await field.blur(); 
    }

    async verifyRegisterButtonDisabled() {
        await expect(this.registerButton).toBeDisabled();
    }

    async verifyErrorMessageByText(text: string) {
        await expect(this.errorMessage).toHaveText(text);
    }

    async verifyBorderColor(locator: Locator, expectedColor: string) {
        await expect(locator).toHaveCSS('border-color', expectedColor);
    }

    async enterDataInAllFields( 
        name: string,
        lastName: string,
        email: string,
        password: string,
        repeatPassword: string) {
       
        await this.enterName(name);
        await this.enterLastName(lastName);
        await this.enterEmail(email);
        await this.enterPassword(password);
        await this.repeatPassword(repeatPassword);
    }
}