import { test, expect, chromium } from '@playwright/test';

test.describe('MetaMask Network Validation and DApp Access', () => {
  const metamaskPath =
    "/Users/jananeeshwar/Library/Application Support/Google/Chrome/Default/Extensions/nkbihfbeogaeaoehlefnkodbefgpgknn/12.13.1_0";
  const userDataDir = "/Users/jananeeshwar/Library/Application Support/Google/Chrome/Default/Extensions";  

  async function launchBrowser() {
    return await chromium.launchPersistentContext(userDataDir, {
      headless: false,
      args: [
        `--load-extension=${metamaskPath}`,
        `--start-maximized`,
      ],
    });
  }

  async function getMetaMaskPage(browserContext) {
    await new Promise(resolve => setTimeout(resolve, 5000));
    const pages = browserContext.pages();
    return pages.find(page => page.url().includes('chrome-extension://'));
  }

  async function switchNetwork(metamaskPage, networkName) {
    console.log(`Switching MetaMask to ${networkName} network...`);
    await metamaskPage.click('[data-testid="network-display"]');
    await metamaskPage.click(`text=${networkName}`);
    console.log(`Switched to ${networkName}!`);
  }

  test('User accesses the page with MetaMask connected to Sepolia network', async () => {
    const browserContext = await launchBrowser();
    const metamaskPage = await getMetaMaskPage(browserContext);

    if (!metamaskPage) {
      console.error("MetaMask popup not found!");
      return;
    }

    await switchNetwork(metamaskPage, "Sepolia");

    const dappPage = await browserContext.newPage();
    await dappPage.goto('https://qa-challange.netlify.app');

    await dappPage.click('#accept-notifications'); 

    
    await expect(dappPage.locator('#account-address')).toBeVisible();
    await expect(dappPage.locator('#input-address')).toBeVisible();
    await expect(dappPage.locator('#network-error')).not.toBeVisible();

    console.log("✅ User successfully accessed the DApp on Sepolia!");
  });

  test('User accesses the page with MetaMask connected to Mainnet network', async () => {
    const browserContext = await launchBrowser();
    const metamaskPage = await getMetaMaskPage(browserContext);

    if (!metamaskPage) {
      console.error("MetaMask popup not found!");
      return;
    }

    await switchNetwork(metamaskPage, "Ethereum Mainnet");

    const dappPage = await browserContext.newPage();
    await dappPage.goto('https://qa-challange.netlify.app');

    
    await expect(dappPage.locator('#network-error')).toBeVisible();
    await expect(dappPage.locator('#switch-network-button')).toBeVisible();
    await expect(dappPage.locator('#input-address')).not.toBeVisible();

    console.log("✅ User saw the network error on Mainnet as expected!");
  });

  test('User accesses the page with MetaMask connected to Mainnet and switches to Sepolia', async () => {
    const browserContext = await launchBrowser();
    const metamaskPage = await getMetaMaskPage(browserContext);

    if (!metamaskPage) {
      console.error("MetaMask popup not found!");
      return;
    }

    await switchNetwork(metamaskPage, "Ethereum Mainnet");

    const dappPage = await browserContext.newPage();
    await dappPage.goto('https://qa-challange.netlify.app');

    await expect(dappPage.locator('#network-error')).toBeVisible();
    await dappPage.click('#switch-network-button');

    console.log("🔄 User clicked switch network button!");

    // Confirm switch in MetaMask
    await metamaskPage.click('button:has-text("Switch Network")');
    console.log("✅ User confirmed network switch!");

    // Validate new network
    await expect(dappPage.locator('#input-address')).toBeVisible();
    await expect(dappPage.locator('#network-error')).not.toBeVisible();

    console.log("✅ User successfully switched from Mainnet to Sepolia!");
  });
});

