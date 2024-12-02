import { test, expect, request } from '@playwright/test';
import { LoginPage } from '../pages/asana-loginpage';
const testData = require('../loopqa-testdata.json');

test.beforeEach(async ({ page }) => {

    const validCredentials = ["ben+pose@workwithloop.com", "Password123"];
    const loginPage = new LoginPage(page);
    const userSettingsLocator = page.getByLabel('User Settings');

    //Open Login page and login to Asana
    await page.goto('https://app.asana.com/');
    await page.waitForURL('https://app.asana.com/-/login');
    await loginPage.enterUser(validCredentials[0]);
    await loginPage.clickContinueButton();
    await loginPage.enterPassword(validCredentials[1]);
    await loginPage.clickloginButton();
    // Expects page to have User settings after logging in
    await userSettingsLocator.waitFor();

})

test.describe('Data Driven Tests', () => {
    for (const data of testData)
    {
        test.describe(`Run ${data.name}`, function () {

            test(`Verify ${data.task}`, async ({ page }) => {

                const loginPage = new LoginPage(page);
                const taskLocator = page.getByText(data.task, { exact: true });
                const columnNameLocator = page.getByText(data.column, { exact: true });
                const columnsLocator = page.locator('.CommentOnlyBoardBody-column');
                const sidebarProject = page.getByText(data.project);
                const currentColumnLocator = columnsLocator.filter({ has: columnNameLocator });
                const columnWithTaskLocator = currentColumnLocator.filter({ has: taskLocator });

                // Open the project for this element
                await sidebarProject.click();
                await taskLocator.waitFor();
                // Verify the expected column is found
                await expect(currentColumnLocator).toBeVisible();
                // Verify the expected column contains the correct task
                await expect(columnWithTaskLocator).toBeVisible();
                // Verify the expected column contains the correct task with its associated tags
                for (const tag of data.tags)
                {
                    await expect(columnWithTaskLocator.filter({ hasText: tag })).toBeVisible();
                }
                // Log Out
                await loginPage.clickUserSettings();
                await page.getByText('Log out').click();

            });
        })
    }
})