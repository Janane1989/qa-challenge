import { test, expect, chromium } from '@playwright/test';
import path from 'path';

test.describe('Deposit ERC20 Tokens', () => {
  const metamaskPath =
    "/Users/jananeeshwar/Library/Application Support/Google/Chrome/Default/Extensions/nkbihfbeogaeaoehlefnkodbefgpgknn/12.10.1_0";
  const userDataDir = path.resolve('/Users/jananeeshwar/Library/Application Support/Google/Chrome/Default/Extensions'); // Ensure absolute path

  async function launchBrowser() {
    return await chromium.launchPersistentContext(userDataDir, {
      headless: false,
      args: [`--load-extension=${metamaskPath}`, `--start-maximized`],
    });
  }

  test('The user tries to deposit an ERC20 token with an empty balance', async () => {
    const browserContext = await launchBrowser();
    const dappPage = await browserContext.newPage();

    await dappPage.goto('https://qa-challange.netlify.app');

    await dappPage.fill('input#input-address', '0xCD85B9a767eF2277E264A4B9A14a2deACAB82FfB');
    await dappPage.click('button:has-text("Submit")');

    // Assertions
    await expect(dappPage.locator('text=Your token balance is 0')).toBeVisible();
    await expect(dappPage.locator('#deposit-input:has-text("error")')).toBeVisible();
    await expect(dappPage.locator('button:has-text("Deposit")')).not.toBeVisible();

    console.log("✅ User was prevented from depositing with an empty balance.");
  });

  test('The user mints an example token using the web application', async () => {
    const browserContext = await launchBrowser();
    const dappPage = await browserContext.newPage();

    await dappPage.goto('https://qa-challange.netlify.app');

    await dappPage.click('text=Select another token');
    await dappPage.click('text=Mint more tokens!');

    // Simulate MetaMask transaction approval
    const metamaskPage = browserContext.pages().find(page => page.url().includes('chrome-extension://'));
    if (metamaskPage) {
      await metamaskPage.click('button:has-text("Confirm")');
    }

    // Assertions
    await expect(dappPage.locator('button:has-text("Deposit")')).toBeVisible();

    console.log("✅ User successfully minted tokens.");
  });

  test('The user deposits an example token', async () => {
    const browserContext = await launchBrowser();
    const dappPage = await browserContext.newPage();

    await dappPage.goto('https://qa-challange.netlify.app');

    await dappPage.click('text=Select another token');
    await expect(dappPage.locator('button:has-text("Deposit")')).toBeVisible();

    // Enter max amount
    const balanceText = await dappPage.locator('text=Your token balance is').textContent();
    const balance = parseInt(balanceText.match(/\d+/)[0], 10);
    await dappPage.fill('#deposit-input', balance.toString());

    await dappPage.click('button:has-text("Deposit")');

    // Simulate MetaMask deposit approval
    const metamaskPage = browserContext.pages().find(page => page.url().includes('chrome-extension://'));
    if (metamaskPage) {
      await metamaskPage.click('button:has-text("Confirm")');
    }

    // Assertions
    await expect(dappPage.locator('text=Your token balance is 0')).toBeVisible();

    console.log("✅ User successfully deposited tokens.");
  });
});
