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

Given('A user with metamask installed connected to {string} network', async function (network) {
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

When('the user enters the address {string} in the input address field', async function (address) {
  await dappPage.fill('input[type="text"]', address);
});

When('the user clicks the Submit button', async function () {
  await dappPage.click('button:has-text("Submit")');
});

Then('the page shows the address balance for the selected token', async function () {
  await expect(dappPage.locator('#address-balance')).toBeVisible();  
});

Then('the page shows the table of the deposit history for the selected token', async function () {
  await expect(dappPage.locator('#deposit-history')).toBeVisible();  

Then('the submit button is disabled', async function () {
  await expect(dappPage.locator('button:has-text("Submit")')).toBeDisabled();
});

Given('A user with metamask installed connected to {string} network', async function (network) {
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
  
  When('the user enters the address {string} in the input address field', async function (address) {
    await dappPage.fill('input[type="text"]', address);
  });
  
  Then('the submit button is disabled', async function () {
    await expect(dappPage.locator('button:has-text("Submit")')).toBeDisabled();
  });
  
  Given('A user with metamask installed connected to {string} network', async function (network) {
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
  
  When('the user clicks the example token link', async function () {
    // Click on the "example token" 
    await dappPage.click('a:has-text("Example Token")');
  });
  
  Then('the page shows the address balance for the selected token', async function () {
    // Verify that the balance for the selected token is visible
    await expect(dappPage.locator('#token-balance')).toBeVisible();
  });
  
  Then('the page shows the table of the deposit history for the selected token', async function () {
    // Verify that the deposit history table for the selected token is visible
    await expect(dappPage.locator('#deposit-history')).toBeVisible();
  });



module.exports = {};
