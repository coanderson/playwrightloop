export class HomePage {
    constructor(page) {
        this.page = page;
        this.userSettingsMenu = page.getByLabel('User Settings');
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