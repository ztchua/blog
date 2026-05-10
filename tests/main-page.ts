import { expect, type Locator, type Page} from '@playwright/test';

export class MainPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async initialize() {
    await this.page.goto('http://localhost:5173/');
    await expect(this.page).toHaveTitle(/ZHENGTAT.COM/);
  };

  async checkRedirection(testId: string, redirectionLink: string) {
    const pagePromise = this.page.waitForEvent('popup');
    await this.page.getByTestId(testId).click();

    const newPage = await pagePromise;
    await newPage.waitForLoadState();
    await expect(newPage).toHaveURL(new RegExp(redirectionLink));
  };
};
