import { test, expect } from '@playwright/test';
import HomePage from '../../page-objects/pages/HomePage';
import SignUpForm from '../../page-objects/forms/SignUpForm';

const randomEmail = `aqa-user-${Date.now()}@test.com`;
const password = 'TesterQA1!@';

test.describe('Test registration flow', () => {
  let homePage: HomePage;
  let signUpForm: SignUpForm;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    signUpForm = new SignUpForm(page);
    await homePage.open();
    await homePage.clickSignUpButton();
  });
  
  test('Successful registration of a new user', async ({ page }) => {
    await signUpForm.enterDataInAllFields("Test", "User", randomEmail, password, password);
    await signUpForm.clickRegisterButton();

    await signUpForm.verifySuccessPopupByText('Registration complete');
    await expect(page).toHaveURL(/.*garage/);
    await expect(page).toHaveTitle('Hillel Qauto');
  });

  test('Empty Name field', async () => {
    await signUpForm.triggerErrorOnField('name');
    await signUpForm.enterLastName('User');
    await signUpForm.enterEmail(randomEmail);
    await signUpForm.enterPassword(password);
    await signUpForm.repeatPassword(password);
    
    await signUpForm.verifyRegisterButtonDisabled();
    await signUpForm.verifyBorderColor(signUpForm.nameField, 'rgb(220, 53, 69)');
    await signUpForm.verifyErrorMessageByText('Name required');
  });

  test('Empty Last Name field', async () => {
    await signUpForm.enterName('Test');
    await signUpForm.triggerErrorOnField('lastName');
    await signUpForm.enterEmail(randomEmail);
    await signUpForm.enterPassword(password);
    await signUpForm.repeatPassword(password);
    
    await signUpForm.verifyRegisterButtonDisabled();
    await signUpForm.verifyBorderColor(signUpForm.lastNameField, 'rgb(220, 53, 69)');
    await signUpForm.verifyErrorMessageByText('Last name required');
  });

  test('Empty Email field', async () => {
    await signUpForm.enterName('Test');
    await signUpForm.enterLastName('User');
    await signUpForm.triggerErrorOnField('email');
    await signUpForm.enterPassword(password);
    await signUpForm.repeatPassword(password);
    
    await signUpForm.verifyRegisterButtonDisabled();
    await signUpForm.verifyBorderColor(signUpForm.emailField, 'rgb(220, 53, 69)');
    await signUpForm.verifyErrorMessageByText('Email required');
  });

  test('Empty Password field', async () => {
    await signUpForm.enterName('Test');
    await signUpForm.enterLastName('User');
    await signUpForm.enterEmail(randomEmail);
    await signUpForm.triggerErrorOnField('password');
    await signUpForm.repeatPassword(password);
    
    await signUpForm.verifyRegisterButtonDisabled();
    await signUpForm.verifyBorderColor(signUpForm.passwordField, 'rgb(220, 53, 69)');
    await signUpForm.verifyErrorMessageByText('Password required');
  });

  test('Empty Re-enter password field', async () => {
    await signUpForm.enterName('Test');
    await signUpForm.enterLastName('User');
    await signUpForm.enterEmail(randomEmail);
    await signUpForm.enterPassword(password);
    await signUpForm.triggerErrorOnField('repeatPassword');
    
    await signUpForm.verifyRegisterButtonDisabled();
    await signUpForm.verifyBorderColor(signUpForm.repeatPasswordField, 'rgb(220, 53, 69)');
    await signUpForm.verifyErrorMessageByText('Re-enter password required');
  });

  test('Input not English symbols in Name field', async () => {
    await signUpForm.enterDataInAllFields('Степан', 'User', randomEmail, password, password);
    
    await signUpForm.verifyRegisterButtonDisabled();
    await signUpForm.verifyBorderColor(signUpForm.nameField, 'rgb(220, 53, 69)');
    await signUpForm.verifyErrorMessageByText('Name is invalid');
  });

  test('Input short name less than 2 characters', async () => {
    await signUpForm.enterDataInAllFields('T', 'User', randomEmail, password, password);
    
    await signUpForm.verifyRegisterButtonDisabled();
    await signUpForm.verifyBorderColor(signUpForm.nameField, 'rgb(220, 53, 69)');
    await signUpForm.verifyErrorMessageByText('Name has to be from 2 to 20 characters long');
  });

  test('Input long name more than 20 characters', async () => {
    await signUpForm.enterDataInAllFields('AQA'.repeat(7), 'User', randomEmail, password, password);
    
    await signUpForm.verifyRegisterButtonDisabled();
    await signUpForm.verifyBorderColor(signUpForm.nameField, 'rgb(220, 53, 69)');
    await signUpForm.verifyErrorMessageByText('Name has to be from 2 to 20 characters long');
  });

  test('Name field with spaces', async ({ page }) => {
    try {
      await signUpForm.enterDataInAllFields(' Test ', 'User', randomEmail, password, password);
    
      const isButtonEnabled = await signUpForm.registerButton.isEnabled();
      if (!isButtonEnabled) {
        console.error('Register button is disabled. Spaces are not ignored for Name field.');
        return; 
      }

      await signUpForm.clickRegisterButton();
  
      await signUpForm.verifySuccessPopupByText('Registration complete');
      await expect(page).toHaveURL(/.*garage/);
      await expect(page).toHaveTitle('Hillel Qauto');
    } catch (error) {
      console.error('Bug is here! Spaces are not ignored.', error);
    }
  });

  test('Input not English symbols in Last Name field', async () => {
    await signUpForm.enterDataInAllFields('Test', 'Мандарин', randomEmail, password, password);
    
    await signUpForm.verifyRegisterButtonDisabled();
    await signUpForm.verifyBorderColor(signUpForm.lastNameField, 'rgb(220, 53, 69)');
    await signUpForm.verifyErrorMessageByText('Last name is invalid');
  });

  test('Input short last name less than 2 characters', async () => {
    await signUpForm.enterDataInAllFields('Test', 'U', randomEmail, password, password);
    
    await signUpForm.verifyRegisterButtonDisabled();
    await signUpForm.verifyBorderColor(signUpForm.lastNameField, 'rgb(220, 53, 69)');
    await signUpForm.verifyErrorMessageByText('Last name has to be from 2 to 20 characters long');
  });

  test('Input long last name more than 20 characters', async () => {
    await signUpForm.enterDataInAllFields('Test', 'Use'.repeat(7), randomEmail, password, password);
    
    await signUpForm.verifyRegisterButtonDisabled();
    await signUpForm.verifyBorderColor(signUpForm.lastNameField, 'rgb(220, 53, 69)');
    await signUpForm.verifyErrorMessageByText('Last name has to be from 2 to 20 characters long');
  });

  test('Last name field with spaces', async ({ page }) => {
    try {
      await signUpForm.enterDataInAllFields('Test', ' User ', randomEmail, password, password);
    
      const isButtonEnabled = await signUpForm.registerButton.isEnabled();
      if (!isButtonEnabled) {
        console.error('Register button is disabled. Spaces are not ignored for Last name field.');
        return; 
      }

      await signUpForm.clickRegisterButton();
  
      await signUpForm.verifySuccessPopupByText('Registration complete');
      await expect(page).toHaveURL(/.*garage/);
      await expect(page).toHaveTitle('Hillel Qauto');
    } catch (error) {
      console.error('Bug is here! Spaces are not ignored.', error);
    }
  });

  test('Input incorrect email', async () => {
    await signUpForm.enterDataInAllFields('Test', 'User', 'aqa@', password, password);
    
    await signUpForm.verifyRegisterButtonDisabled();
    await signUpForm.verifyBorderColor(signUpForm.emailField, 'rgb(220, 53, 69)');
    await signUpForm.verifyErrorMessageByText('Email is incorrect');
  });

  test('Password less than 8 characters', async () => {
    await signUpForm.enterDataInAllFields('Test', 'User', randomEmail, 'Pass1', password);
    
    await signUpForm.verifyRegisterButtonDisabled();
    await signUpForm.verifyBorderColor(signUpForm.passwordField, 'rgb(220, 53, 69)');
    await signUpForm.verifyErrorMessageByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
  });

  test('Password more than 15 characters', async () => {
    await signUpForm.enterDataInAllFields('Test', 'User', randomEmail, 'Pass1!'.repeat(3), password);
    
    await signUpForm.verifyRegisterButtonDisabled();
    await signUpForm.verifyBorderColor(signUpForm.passwordField, 'rgb(220, 53, 69)');
    await signUpForm.verifyErrorMessageByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
  });

  test('Password without any capital character', async () => {
    await signUpForm.enterDataInAllFields('Test', 'User', randomEmail, 'password55', password);
    
    await signUpForm.verifyRegisterButtonDisabled();
    await signUpForm.verifyBorderColor(signUpForm.passwordField, 'rgb(220, 53, 69)');
    await signUpForm.verifyErrorMessageByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
  });

  test('Password without any small character', async () => {
    await signUpForm.enterDataInAllFields('Test', 'User', randomEmail, 'PASSWORD55', password);
    
    await signUpForm.verifyRegisterButtonDisabled();
    await signUpForm.verifyBorderColor(signUpForm.passwordField, 'rgb(220, 53, 69)');
    await signUpForm.verifyErrorMessageByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
  });

  test('Password without any integer', async () => {
    await signUpForm.enterDataInAllFields('Test', 'User', randomEmail, 'Password', password);
    
    await signUpForm.verifyRegisterButtonDisabled();
    await signUpForm.verifyBorderColor(signUpForm.passwordField, 'rgb(220, 53, 69)');
    await signUpForm.verifyErrorMessageByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
  });

  test('Passwords do not match', async () => {
    await signUpForm.enterDataInAllFields('Test', 'User', randomEmail, password, 'TesterQA1!#');
    await signUpForm.repeatPasswordField.blur();
    
    await signUpForm.verifyRegisterButtonDisabled();
    await signUpForm.verifyBorderColor(signUpForm.repeatPasswordField, 'rgb(220, 53, 69)');
    await signUpForm.verifyErrorMessageByText('Passwords do not match');
  });
});
