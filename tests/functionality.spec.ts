import { test as base, expect } from '@playwright/test';
import { MainPage } from './main-page.ts';

const test = base.extend<{ mainPage: MainPage }>({
  mainPage: async ({ page }, use) => {
    const mainPage = new MainPage(page);
    await mainPage.initialize();
    await use(mainPage);
  },
});

const redirectionLinks = [
  { alias: 'github', link: 'https://github.com/ztchua' },
  { alias: 'linkedin', link: 'https://www.linkedin.com/' },
];

redirectionLinks.forEach(({ alias, link }) => {
  test(`${alias} redirection`, async ({ mainPage}) => {
    await mainPage.checkRedirection(`${alias}-redir`, `${link}`);
  })
})
