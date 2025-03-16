import { test, expect, chromium } from '@playwright/test';
import path from 'path';

test.describe("Search ERC20 Tokens", () => {
  
  const metamaskPath =
      "/Users/jananeeshwar/Library/Application Support/Google/Chrome/Default/Extensions/nkbihfbeogaeaoehlefnkodbefgpgknn/12.10.1_0";
    const userDataDir = path.resolve('/Users/jananeeshwar/Library/Application Support/Google/Chrome/Default/Extensions'); // Ensure absolute path
  
    async function launchBrowser() {
      return await chromium.launchPersistentContext(userDataDir, {
        headless: false,
        args: [`--load-extension=${metamaskPath}`, `--start-maximized`],
      });
    }

  test("The user can search for an existing ERC20 token and see balance and deposit history", async ({ page }) => {
    // Enter a valid ERC20 token address
    await page.fill('[data-test="InputAddress__Input__addressValue"]', "0x9982f9A3bA28c34aD03737745d956EC0668ea440");
    await page.click('[data-test="InputAddress__Button__submit"]');

    // Verify the balance is displayed
    await expect(page.locator("text=Your token balance is")).toBeVisible();

    // Verify deposit history table appears
    await expect(page.locator("text=ACCOUNT DEPOSIT HISTORY FOR CURRENT TOKEN")).toBeVisible();
  });

  test("The user enters an invalid ERC20 token address", async ({ page }) => {
    // Enter an invalid ERC20 token address
    await page.fill('[data-test="InputAddress__Input__addressValue"]', "0x9982f9A3bA28c");

    // Verify the submit button is disabled
    await expect(page.locator('[data-test="InputAddress__Button__submit"]')).toBeDisabled();
  });

  test("The user clicks the example token link and sees balance & deposit history", async ({ page }) => {
    // Click the example token link
    await page.click('[data-test="InputAddress__Span__exampleTokenLink"]');

    // Verify balance is displayed
    await expect(page.locator("text=Your token balance is")).toBeVisible();

    // Verify deposit history table appears
    await expect(page.locator("text=ACCOUNT DEPOSIT HISTORY FOR CURRENT TOKEN")).toBeVisible();
  });

});
