const { Given, When, Then } = require('@cucumber/cucumber');
const { chromium, expect } = require('@playwright/test');

const metamaskPath =
  "/Users/jananeeshwar/Library/Application Support/Google/Chrome/Default/Extensions/nkbihfbeogaeaoehlefnkodbefgpgknn/12.13.1_0";
const userDataDir = "/Users/jananeeshwar/Library/Application Support/Google/Chrome/Default/Extensions";  

let browserContext, metamaskPage, dappPage;

async function launchBrowser() {
  return await chromium.launchPersistentContext(userDataDir, {
    headless: false,
    args: [
      `--load-extension=${metamaskPath}`,
      `--start-maximized`,
    ],
  });
}

async function getMetaMaskPage() {
  await new Promise(resolve => setTimeout(resolve, 5000));
  const pages = browserContext.pages();
  return pages.find(page => page.url().includes('chrome-extension://'));
}

async function switchNetwork(networkName) {
  console.log(`Switching MetaMask to ${networkName} network...`);
  await metamaskPage.click('[data-testid="network-display"]');
  await metamaskPage.click(`text=${networkName}`);
  console.log(`Switched to ${networkName}!`);
}

Given('A user with MetaMask installed connected to {string} network', async function (network) {
  browserContext = await launchBrowser();
  metamaskPage = await getMetaMaskPage();

  if (!metamaskPage) {
    throw new Error("MetaMask popup not found!");
  }

  await switchNetwork(network);
});

When('the user accesses the app page', async function () {
  dappPage = await browserContext.newPage();
  await dappPage.goto('https://qa-challange.netlify.app');
});

When('the user accepts notifications', async function () {
  await dappPage.click('#accept-notifications');
});

Then('the page shows the account address', async function () {
  await expect(dappPage.locator('#account-address')).toBeVisible();
});

Then('the page shows the input address field', async function () {
  await expect(dappPage.locator('#input-address')).toBeVisible();
});

Then('the page does not show a network error message', async function () {
  await expect(dappPage.locator('#network-error')).not.toBeVisible();
});

Then('the page shows a network error message', async function () {
  await expect(dappPage.locator('#network-error')).toBeVisible();
});

Then('the page shows the switch network button', async function () {
  await expect(dappPage.locator('#switch-network-button')).toBeVisible();
});

Then('the page does not show the input address field', async function () {
  await expect(dappPage.locator('#input-address')).not.toBeVisible();
});

When('the user clicks the switch network button', async function () {
  await dappPage.click('#switch-network-button');
  console.log("🔄 User clicked switch network button!");
});

When('the user confirms the switch network', async function () {
  await metamaskPage.click('button:has-text("Switch Network")');
  console.log("✅ User confirmed network switch!");
});

module.exports = {}; // Ensure Cucumber can load the module properly
