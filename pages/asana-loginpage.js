﻿export class LoginPage {
    constructor(page) {
        this.page = page;
        this.usernameField = page.getByLabel('Email address');
        this.passwordField = page.getByLabel('Password', { name: 'p', exact: true });
        this.continueButton = page.getByRole('button', { name: 'Continue', exact: true });
        this.loginButton = page.getByRole('button', { name: 'Log in', exact: true });
        this.userSettingsMenu = page.getByLabel('User Settings');
        this.logoutButton = page.getByLabel('Log out');
        this.myTasksRegion = page.getByRole('region', { name: 'My tasks' });
    }

    async fillUsername(username) {
        const usernameField = this.usernameField;
        await usernameField.fill(username);
    }

    async fillPassword(password) {
        const passwordField = this.passwordField;
        await passwordField.fill(password);
    }

    async enterUser(username) {
        await this.fillUsername(username);
    }

    async enterPassword(password) {
        await this.fillPassword(password);
    }

    async clickContinueButton() {
        const continueButton = this.continueButton;
        await continueButton.click();
    }

    async clickloginButton() {
        const loginButton = this.loginButton;
        await loginButton.click();
    }

    async clickUserSettings() {
        const userSettingsMenu = this.userSettingsMenu;
        await userSettingsMenu.click();
    }

    async clickLogoutButton() {
        const logoutButton = this.logoutButton;
        await logoutButton.click();
    }

}