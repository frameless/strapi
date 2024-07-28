import { expect, test } from '@playwright/test';

const websiteURL = 'http://localhost:3000/nl';

const websiteName = 'Gemeente Utrecht';
const defaultLang = 'nl';

// TODO: Escape regular expression characters
const createRegExp = (str: string) => new RegExp(str, 'i');

test('has title (WCAG 2.4.2 Page Titled)', async ({ page }) => {
  await page.goto(websiteURL);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(createRegExp(websiteName));
});

test('has page language (WCAG 3.1.1 Language of Page)', async ({ page }) => {
  await page.goto(websiteURL);

  // Expect a title "to contain" a substring.
  await expect(page.locator(':root')).toHaveAttribute('lang', defaultLang);
});

// This test is OK, but the implementation doesn't support the 404 status yet
test.skip('404 page has HTTP 404 status', async ({ page }) => {
  const responsePromise = page.waitForResponse(new URL('/this-page-does-not-exist', websiteURL).toString());
  await page.goto(websiteURL);
  const response = await responsePromise;

  expect(response.status()).toBe(404);
  expect(response.statusText()).toBe('Page Not Found');
});

test('page has Content-Security-Policy headers', async ({ page }) => {
  const responsePromise = page.waitForResponse(websiteURL);
  await page.goto(websiteURL);
  const response = await responsePromise;

  const header = await response.headerValue('Content-Security-Policy');
  expect(header).not.toBe(null);
});

test('page has X-Content-Type-Options headers', async ({ page }) => {
  const responsePromise = page.waitForResponse(websiteURL);
  await page.goto(websiteURL);
  const response = await responsePromise;

  const header = await response.headerValue('X-Content-Type-Options');
  expect(header).not.toBe(null);
});

test('page has Referrer-Policy headers', async ({ page }) => {
  const responsePromise = page.waitForResponse(websiteURL);
  await page.goto(websiteURL);
  const response = await responsePromise;

  const header = await response.headerValue('Referrer-Policy');
  expect(header).not.toBe(null);
});

test('page has Permissions-Policy headers', async ({ page }) => {
  const responsePromise = page.waitForResponse(websiteURL);
  await page.goto(websiteURL);
  const response = await responsePromise;

  const header = await response.headerValue('Permissions-Policy');
  expect(header).not.toBe(null);
});
