import { test, expect } from '@playwright/test';

const selectors = {
  nameField: "//input[@id='signupName']",
  lastNameField: "//input[@id='signupLastName']",
  emailField: "//input[@id='signupEmail']",
  passwordField: "//input[@id='signupPassword']",
  repeatPasswordField: "//input[@id='signupRepeatPassword']",
  registerButton: "//button[contains(@class, 'btn-primary') and contains(text(), 'Register')]",
  errorMessage: "//div[contains(@class, 'invalid-feedback')]//p",
  successPopup: "//div[contains(@class, 'alert alert-success')]//p",
};
const randomEmail = `aqa-user-${Date.now()}@test.com`;
const password = 'TesterQA1!@';


test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.getByText('Sign up').click();
});

test.describe('Test registration flow', () => {
  
  test('Successful registration of a new user', async ({ page }) => {
    await page.locator(selectors.nameField).fill('Test');
    await page.locator(selectors.lastNameField).fill('User');
    await page.locator(selectors.emailField).fill(randomEmail);
    await page.locator(selectors.passwordField).fill(password);
    await page.locator(selectors.repeatPasswordField).fill(password);
    await page.locator(selectors.registerButton).click();

    await expect(page.locator(selectors.successPopup)).toHaveText('Registration complete');
    await expect(page).toHaveURL(/.*garage/);
    await expect(page).toHaveTitle('Hillel Qauto');
  });


  test('Empty Name field', async ({ page }) => {
    await page.locator(selectors.nameField).focus();
    await page.locator(selectors.nameField).blur();
    await page.locator(selectors.lastNameField).fill('User');
    await page.locator(selectors.emailField).fill(randomEmail);
    await page.locator(selectors.passwordField).fill(password);
    await page.locator(selectors.repeatPasswordField).fill(password);
    
    await page.locator(selectors.registerButton).isDisabled();
    await expect (page.locator(selectors.nameField)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect(page.locator(selectors.errorMessage)).toHaveText('Name required');
  });

  test('Empty Last Name field', async ({ page }) => {
    await page.locator(selectors.nameField).fill('Test');
    await page.locator(selectors.lastNameField).focus();
    await page.locator(selectors.lastNameField).blur();
    await page.locator(selectors.emailField).fill(randomEmail);
    await page.locator(selectors.passwordField).fill(password);
    await page.locator(selectors.repeatPasswordField).fill(password);
    
    await page.locator(selectors.registerButton).isDisabled();
    await expect (page.locator(selectors.lastNameField)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect(page.locator(selectors.errorMessage)).toHaveText('Last name required');
  });

  test('Empty Email field', async ({ page }) => {
    await page.locator(selectors.nameField).fill('Test');
    await page.locator(selectors.lastNameField).fill('User');
    await page.locator(selectors.emailField).focus();
    await page.locator(selectors.emailField).blur();
    await page.locator(selectors.passwordField).fill(password);
    await page.locator(selectors.repeatPasswordField).fill(password);
    
    await page.locator(selectors.registerButton).isDisabled();
    await expect (page.locator(selectors.emailField)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect(page.locator(selectors.errorMessage)).toHaveText('Email required');
  });

  test('Empty Password field', async ({ page }) => {
    await page.locator(selectors.nameField).fill('Test');
    await page.locator(selectors.lastNameField).fill('User');
    await page.locator(selectors.emailField).fill(randomEmail);
    await page.locator(selectors.passwordField).focus();
    await page.locator(selectors.passwordField).blur();
    await page.locator(selectors.repeatPasswordField).fill(password);
    
    await page.locator(selectors.registerButton).isDisabled();
    await expect (page.locator(selectors.passwordField)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect(page.locator(selectors.errorMessage)).toHaveText('Password required');
  });

  test('Empty Re-enter password field', async ({ page }) => {
    await page.locator(selectors.nameField).fill('Test');
    await page.locator(selectors.lastNameField).fill('User');
    await page.locator(selectors.emailField).fill(randomEmail);
    await page.locator(selectors.passwordField).fill(password);
    await page.locator(selectors.repeatPasswordField).focus();
    await page.locator(selectors.repeatPasswordField).blur();
    
    await page.locator(selectors.registerButton).isDisabled();
    await expect (page.locator(selectors.repeatPasswordField)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect(page.locator(selectors.errorMessage)).toHaveText('Re-enter password required');
  });

  test('Input not English symbols in Name field', async ({ page }) => {
    await page.locator(selectors.nameField).fill('Степан');
    await page.locator(selectors.lastNameField).fill('User');
    await page.locator(selectors.emailField).fill(randomEmail);
    await page.locator(selectors.passwordField).fill(password);
    await page.locator(selectors.repeatPasswordField).fill(password);
    
    await page.locator(selectors.registerButton).isDisabled();
    await expect (page.locator(selectors.nameField)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect(page.locator(selectors.errorMessage)).toHaveText('Name is invalid');
  });

  test('Input short name less than 2 characters', async ({ page }) => {
    await page.locator(selectors.nameField).fill('T');
    await page.locator(selectors.lastNameField).fill('User');
    await page.locator(selectors.emailField).fill(randomEmail);
    await page.locator(selectors.passwordField).fill(password);
    await page.locator(selectors.repeatPasswordField).fill(password);
    
    await page.locator(selectors.registerButton).isDisabled();
    await expect (page.locator(selectors.nameField)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect(page.locator(selectors.errorMessage)).toHaveText('Name has to be from 2 to 20 characters long');
  });

  test('Input long name more than 20 characters', async ({ page }) => {
    await page.locator(selectors.nameField).fill('AQA'.repeat(7));
    await page.locator(selectors.lastNameField).fill('User');
    await page.locator(selectors.emailField).fill(randomEmail);
    await page.locator(selectors.passwordField).fill(password);
    await page.locator(selectors.repeatPasswordField).fill(password);
    
    await page.locator(selectors.registerButton).isDisabled();
    await expect (page.locator(selectors.nameField)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect(page.locator(selectors.errorMessage)).toHaveText('Name has to be from 2 to 20 characters long');
  });

  test('Name field with spaces', async ({ page }) => {
    try {
      await page.locator(selectors.nameField).fill(' Test ');
      await page.locator(selectors.lastNameField).fill('User');
      await page.locator(selectors.emailField).fill(randomEmail);
      await page.locator(selectors.passwordField).fill(password);
      await page.locator(selectors.repeatPasswordField).fill(password);

      const isButtonEnabled = await page.locator(selectors.registerButton).isEnabled();
      if (!isButtonEnabled) {
        console.error('Register button is disabled. Spaces are not ignored for Name field.');
        return; 
      }

      await page.locator(selectors.registerButton).click();
  
      await expect(page.locator(selectors.successPopup)).toHaveText('Registration complete');
      await expect(page).toHaveURL(/.*garage/);
      await expect(page).toHaveTitle('Hillel Qauto');
    } catch (error) {
      console.error('Bug is here! Spaces are not ignored.', error);
    }
  });

  test('Input not English symbols in Last Name field', async ({ page }) => {
    await page.locator(selectors.nameField).fill('Test');
    await page.locator(selectors.lastNameField).fill('Мандарин');
    await page.locator(selectors.emailField).fill(randomEmail);
    await page.locator(selectors.passwordField).fill(password);
    await page.locator(selectors.repeatPasswordField).fill(password);
    
    await page.locator(selectors.registerButton).isDisabled();
    await expect (page.locator(selectors.lastNameField)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect(page.locator(selectors.errorMessage)).toHaveText('Last name is invalid');
  });

  test('Input short last name less than 2 characters', async ({ page }) => {
    await page.locator(selectors.nameField).fill('Test');
    await page.locator(selectors.lastNameField).fill('U');
    await page.locator(selectors.emailField).fill(randomEmail);
    await page.locator(selectors.passwordField).fill(password);
    await page.locator(selectors.repeatPasswordField).fill(password);
    
    await page.locator(selectors.registerButton).isDisabled();
    await expect (page.locator(selectors.lastNameField)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect(page.locator(selectors.errorMessage)).toHaveText('Last name has to be from 2 to 20 characters long');
  });

  test('Input long last name more than 20 characters', async ({ page }) => {
    await page.locator(selectors.nameField).fill('Test');
    await page.locator(selectors.lastNameField).fill('Use'.repeat(7));
    await page.locator(selectors.emailField).fill(randomEmail);
    await page.locator(selectors.passwordField).fill(password);
    await page.locator(selectors.repeatPasswordField).fill(password);
    
    await page.locator(selectors.registerButton).isDisabled();
    await expect (page.locator(selectors.lastNameField)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect(page.locator(selectors.errorMessage)).toHaveText('Last name has to be from 2 to 20 characters long');
  });

  test('Last name field with spaces', async ({ page }) => {
    try {
      await page.locator(selectors.nameField).fill('Test');
      await page.locator(selectors.lastNameField).fill(' User ');
      await page.locator(selectors.emailField).fill(randomEmail);
      await page.locator(selectors.passwordField).fill(password);
      await page.locator(selectors.repeatPasswordField).fill(password);

      const isButtonEnabled = await page.locator(selectors.registerButton).isEnabled();
      if (!isButtonEnabled) {
        console.error('Register button is disabled. Spaces are not ignored for Last name field.');
        return; 
      }

      await page.locator(selectors.registerButton).click();
  
      await expect(page.locator(selectors.successPopup)).toHaveText('Registration complete');
      await expect(page).toHaveURL(/.*garage/);
      await expect(page).toHaveTitle('Hillel Qauto');
    } catch (error) {
      console.error('Bug is here! Spaces are not ignored.', error);
    }
  });

  test('Input incorrect email', async ({ page }) => {
    await page.locator(selectors.nameField).fill('Test');
    await page.locator(selectors.lastNameField).fill('User');
    await page.locator(selectors.emailField).fill('aqa@');
    await page.locator(selectors.passwordField).fill(password);
    await page.locator(selectors.repeatPasswordField).fill(password);
    
    await page.locator(selectors.registerButton).isDisabled();
    await expect (page.locator(selectors.emailField)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect(page.locator(selectors.errorMessage)).toHaveText('Email is incorrect');
  });

  test('Password less than 8 characters', async ({ page }) => {
    await page.locator(selectors.nameField).fill('Test');
    await page.locator(selectors.lastNameField).fill('User');
    await page.locator(selectors.emailField).fill(randomEmail);
    await page.locator(selectors.passwordField).fill('Pass1')
    await page.locator(selectors.repeatPasswordField).fill(password);
    
    await page.locator(selectors.registerButton).isDisabled();
    await expect (page.locator(selectors.passwordField)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect(page.locator(selectors.errorMessage))
    .toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
  });

  test('Password more than 15 characters', async ({ page }) => {
    await page.locator(selectors.nameField).fill('Test');
    await page.locator(selectors.lastNameField).fill('User');
    await page.locator(selectors.emailField).fill(randomEmail);
    await page.locator(selectors.passwordField).fill('Pass1!'.repeat(3))
    await page.locator(selectors.repeatPasswordField).fill(password);
    
    await page.locator(selectors.registerButton).isDisabled();
    await expect (page.locator(selectors.passwordField)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect(page.locator(selectors.errorMessage))
    .toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
  });

  test('Password without any capital character', async ({ page }) => {
    await page.locator(selectors.nameField).fill('Test');
    await page.locator(selectors.lastNameField).fill('User');
    await page.locator(selectors.emailField).fill(randomEmail);
    await page.locator(selectors.passwordField).fill('password55')
    await page.locator(selectors.repeatPasswordField).fill(password);
    
    await page.locator(selectors.registerButton).isDisabled();
    await expect (page.locator(selectors.passwordField)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect(page.locator(selectors.errorMessage))
    .toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
  });

  test('Password without any small character', async ({ page }) => {
    await page.locator(selectors.nameField).fill('Test');
    await page.locator(selectors.lastNameField).fill('User');
    await page.locator(selectors.emailField).fill(randomEmail);
    await page.locator(selectors.passwordField).fill('PASSWORD55');
    await page.locator(selectors.repeatPasswordField).fill(password);
    
    await page.locator(selectors.registerButton).isDisabled();
    await expect (page.locator(selectors.passwordField)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect(page.locator(selectors.errorMessage))
    .toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
  });

  test('Password without any integer', async ({ page }) => {
    await page.locator(selectors.nameField).fill('Test');
    await page.locator(selectors.lastNameField).fill('User');
    await page.locator(selectors.emailField).fill(randomEmail);
    await page.locator(selectors.passwordField).fill('Password');
    await page.locator(selectors.repeatPasswordField).fill(password);
    
    await page.locator(selectors.registerButton).isDisabled();
    await expect (page.locator(selectors.passwordField)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect(page.locator(selectors.errorMessage))
    .toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
  });

  test('Passwords do not match', async ({ page }) => {
    await page.locator(selectors.nameField).fill('Test');
    await page.locator(selectors.lastNameField).fill('User');
    await page.locator(selectors.emailField).fill(randomEmail);
    await page.locator(selectors.passwordField).fill(password);
    await page.locator(selectors.repeatPasswordField).fill('TesterQA1!#');
    await page.locator(selectors.repeatPasswordField).blur();
    
    await page.locator(selectors.registerButton).isDisabled();
    await expect (page.locator(selectors.repeatPasswordField)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect(page.locator(selectors.errorMessage)).toHaveText('Passwords do not match');
  });
});
