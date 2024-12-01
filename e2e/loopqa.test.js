import { test, expect, request } from '@playwright/test';
import { LoginPage } from '../pages/asana-loginpage';
import { HomePage } from '../pages/asana-homepage';
const testData = require('../loopqa-testdata.json');

test.beforeEach(async ({ page }) => {

    const validCredentials = ["ben+pose@workwithloop.com", "Password123"];
    const loginPage = new LoginPage(page);
    const userSettingsLocator = page.getByLabel('User Settings');

    //Open Login page and login
    await page.goto('https://app.asana.com/');
    await page.waitForURL('https://app.asana.com/-/login');
    await loginPage.enterUser(validCredentials[0]);
    await loginPage.clickContinueButton();
    await loginPage.enterPassword(validCredentials[1]);
    await loginPage.clickloginButton();
    await page.waitForLoadState('domcontentloaded');
    // Expects page to have User settings after logging in
    await userSettingsLocator.waitFor();

})

test.describe('Data Driven Test', () => {
    for (const data of testData)
    {
        test.describe(`Run ${data.name}`, function () {
            test('Verify', async ({ page }) => {

                const loginPage = new LoginPage(page);
                console.log(data.username)
                await 
                // Log Out
                await loginPage.clickUserSettings();
                await page.getByText('Log out').click();

            });
        })
    }
})