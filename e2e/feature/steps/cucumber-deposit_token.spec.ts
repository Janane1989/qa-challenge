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

When('the user enters the address {string} in the input address field', async function (tokenAddress) {
  await dappPage.fill('input[type="text"]', tokenAddress);
});

When('the user clicks the Submit button', async function () {
  await dappPage.click('button:has-text("Submit")');
});

Then('the page shows the token balance {int}', async function (expectedBalance) {
  const balanceText = await dappPage.locator('#token-balance').textContent();
  const balance = parseInt(balanceText.replace(/[^0-9]/g, '')); // Remove non-numeric characters and convert to integer
  expect(balance).toBe(expectedBalance);
});

Then('the deposit input shows an error', async function () {
  await expect(dappPage.locator('#deposit-error')).toBeVisible(); // Assuming #deposit-error is the error message selector
});

Then('the deposit button is not visible', async function () {
  await expect(dappPage.locator('#deposit-button')).not.toBeVisible(); // Assuming #deposit-button is the deposit button selector
});

// Scenario: User tries to deposit an invalid amount (outside the valid range 1 - 90)
When('the user enters an invalid amount {string} in the deposit input', async function (amount) {
  await dappPage.fill('#deposit-input', amount); // Assuming the deposit input field has the ID #deposit-input
});

Then('the page shows an error message "The amount value must be between 1 and 90"', async function () {
  const errorMessage = await dappPage.locator('#deposit-error').textContent();
  expect(errorMessage).toBe("The amount value must be between 1 and 90");
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
    await dappPage.click('#example-token-link'); 
    console.log("✅ User clicked the example token link!");
  });
  
  When('the user clicks the Get more tokens link', async function () {
    await dappPage.click('#get-more-tokens-link'); 
    console.log("✅ User clicked the Get more tokens link!");
  });
  
  When('the user accepts the transaction', async function () {
    await metamaskPage.click('button:has-text("Confirm")'); 
    console.log("✅ User accepted the transaction in MetaMask!");
  });
  
  Then('the deposit button is visible', async function () {
    await expect(dappPage.locator('#deposit-button')).toBeVisible(); 
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
    await dappPage.click('[data-test="InputAddress__Span__exampleTokenLink"]'); // Assuming the example token link has the ID #example-token-link
    console.log("✅ User clicked the example token link!");
  });
  
  When('the deposit button is visible', async function () {
    await expect(dappPage.locator('[data-test="DepositToken__Button__deposit"]')).toBeVisible(); // Assuming the deposit button has the ID #deposit-button
  });
  
  When('the user enters the max amount of tokens in the amount field', async function () {
    const maxAmount = "90"; // The maximum amount based on the placeholder or validation logic (1 to 90)
    await dappPage.fill('[data-test="DepositToken__Input__depositAmount"]', maxAmount); 
    console.log(`✅ User entered the max amount: ${maxAmount} in the amount field`);
});
  
  When('the user clicks the deposit button', async function () {
    await dappPage.click('[data-test="DepositToken__Button__deposit"]'); 
    console.log("✅ User clicked the deposit button!");
  });
  
  When('the user approves the spending cap request in MetaMask', async function () {
    // Wait for the MetaMask popup to appear and approve the spending cap request
    const metamaskConfirmationButton = await metamaskPage.locator('button:has-text("Confirm")'); 
    await metamaskConfirmationButton.click();
    console.log("✅ User approved the spending cap request in MetaMask");
});

When('the user approves the transaction request in MetaMask', async function () {
    // Wait for the MetaMask popup to appear and approve the transaction request
    const metamaskConfirmButton = await metamaskPage.locator('button:has-text("Confirm")'); 
    await metamaskConfirmButton.click();
    console.log("✅ User approved the transaction request in MetaMask");
});

Then('the page shows the token balance 0', async function () {
    await expect(dappPage.locator('[data-test="TokenBalance__Amount"]')).toHaveText('0');
    console.log("✅ The token balance is now 0");
});
    
module.exports = {};
