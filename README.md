# QA Libre Challenge

## Table of Contents

- [Requirements](#requirements)
  - [Test Suite Structure](#test-suite-structure)
  - [Expectations](#expectations)
- [Project Information](#project-information)
  - [Example ERC20 Token](#example-erc20-token)
- [Local Environment Setup](#local-environment-setup)
  - [Run with Docker Compose](#run-with-docker-compose)
  - [Run with Node.js](#run-with-nodejs)

## Requirements

Fork this repository and create a comprehensive suite of end-to-end (e2e) tests for a decentralized application (DApp) that interacts with a smart contract on the Sepolia Testnet. The DApp consists of a smart contract and a Next.js frontend application. You can access the DApp from [https://qa-challange.netlify.app](https://qa-challange.netlify.app).

### Test Suite Structure

Organize this project as you prefer. Inside the folder `e2e` you will find the the feature files, which following the Gherkin syntax for behavior-driven development (BDD). Use the following existing feature files as a basis for this challenge:

- `01-app-access.feature`
- `02-search-erc20-token.feature`
- `03-deposit-erc20-token.feature`

### Expectations

- Test the connection to the user's wallet (e.g., MetaMask)
- Verify that the ERC20 token address input field works correctly
- Test the display of the current token balance
- Test the token transfer process from the wallet to the smart contract
- Execute the e2e tests using a GitHub Actions workflow
- Document how to run tests
- Be proactive in providing feedback in an MD document about this exercise and share your thoughts on what other aspects should be taken care of to ensure a good level of quality for a web application
- [Bonus] Display test results in an easily shareable format

## Project Information

This is a Next.js project that uses the Web3 library to interact with the MetaMask wallet and perform actions by calling smart contract methods.

To use this application, you need to:

1. Install MetaMask on your browser ([Download MetaMask](https://metamask.io/download/))
2. Connect MetaMask to the Sepolia testnet

## Add Sepolia network to MetaMask

Network Name: Sepolia
RPC URL: https://sepolia.infura.io/v3/
Chain ID: 11155111
Currency Symbol: SepoliaETH
Block Explorer URL (Optional): https://sepolia.etherscan.io

Get free ETH from these faucets:

- https://sepoliafaucet.com (connect with Alchemy)
- https://faucets.chain.link/sepolia

### Example ERC20 Token

The application allows interaction with ERC20 tokens deployed on the Sepolia testnet. For testing purposes, you can use our example ERC20 token deployed at:

```text
0x9982f9A3bA28c34aD03737745d956EC0668ea440
```

By selecting this token, the application will allow you to mint 100 tokens at a time.

## Local Environment Setup

### Run with Docker Compose

1. Open a terminal at the root path of this project
2. Execute the following command:

   ```bash
   docker-compose up -d
   ```

3. Access the application at [http://localhost:3000](http://localhost:3000) using your browser

### Run with Node.js

1. Open a terminal at the root path of this project
2. Execute the following commands:

   ```bash
   npm install
   npm run build && npm run start
   ```

3. Access the application at [http://localhost:3000](http://localhost:3000) using your browser


# End-to-End (E2E) Testing for Decentralized Application (DApp)

## Test Suite Structure
For this assignment, comprehensive end-to-end tests were created for the DApp that interacts with a smart contract on the Sepolia Testnet. The DApp consists of a smart contract and a Next.js frontend application, which can be accessed from the link: [https://qa-challange.netlify.app](https://qa-challange.netlify.app).

The tests were divided into two main approaches:
1. **Testing with MetaMask Extension configured in the browser**.
2. **Using Cucumber to create E2E tests for the mentioned scenarios**, all using Playwright.

Inside the folder `e2e`, the following feature files were created, which follow the Gherkin syntax for BDD:
- 01-app-access.feature
- 02-search-erc20-token.feature
- 03-deposit-erc20-token.feature

The test suite includes the following key expectations:

- Test the connection to the user's wallet (e.g., MetaMask)
- Verify that the ERC20 token address input field works correctly
- Test the display of the current token balance
- Test the token transfer process from the wallet to the smart contract
- Execute the E2E tests using a GitHub Actions workflow
- Document how to run the tests
- Provide feedback on the exercise in an MD document

## Approaches to Testing

### Approach 1: MetaMask Extension Testing
In this approach, Playwright was configured to run with the MetaMask extension, simulating the user's interaction with the MetaMask wallet. The tests included:

- **MetaMask Setup**: Launching MetaMask with Playwright and ensuring the wallet is connected to the Sepolia network.
- **DApp Interaction**: Testing interactions between the DApp and MetaMask, including wallet connection, address validation, and token deposit.

**Challenges Encountered**:
- **MetaMask Extension Issue**: Occasionally, the browser fails to open with the MetaMask extension enabled, resulting in a "MetaMask not found" error. This issue is intermittent and is related to the chrome extension detection
  

### Approach 2: Using Cucumber with Playwright
In this approach, Cucumber was used to define end-to-end scenarios in Gherkin syntax, while Playwright was used to interact with the DApp and MetaMask for running tests. The following feature files were created:

- **01-app-access.feature**: This file tests the MetaMask connection, network switching, and wallet address visibility.
- **02-search-erc20-token.feature**: It checks the ERC20 token search functionality and displays balance and deposit history.
- **03-deposit-erc20-token.feature**: This scenario tests the deposit functionality with proper error handling, such as handling invalid amounts and insufficient balance.

- Challenges Encountered:
Test Execution Issue: The tests are not running despite the configuration being correct. There is no error thrown, but the tests do not execute. Further debugging is required to identify the root cause, which may involve the integration between Cucumber and Playwright.

### Test Execution and CI Integration
Both approaches use **Playwright** for browser automation, while GitHub Actions was configured to run the tests on every PR or push to the `main` branch. The workflow also includes steps for installing dependencies, running the tests, and uploading the test results.

The GitHub Actions file for Playwright tests playwright.yml file is included in .github/workflows.

###Feedback on the Exercise
Page not loading consistently: Sometimes, the page does not load properly on the first attempt, which affects the user experience. Consider optimizing the page loading process.
No wallet support except MetaMask: Currently, the DApp only supports MetaMask for wallet connections. It would be beneficial to support additional wallets (e.g., WalletConnect, Coinbase Wallet) for broader accessibility.
Processing time on MetaMask confirmation is high: The processing time for MetaMask confirmations is longer than expected. It would be helpful to have a visual indication, such as a loading spinner or a "processing" button, during the confirmation process.
Error handling for invalid input: When an invalid amount (e.g., a non-numeric value like "asdsadasd") is entered into the deposit input field, the DApp should throw an error or disable the submit button to prevent the transaction.
Deposit button disabled for exceeding balance: When the amount entered for deposit exceeds the available balance in the wallet, the deposit button should be disabled to prevent errors.

## Conclusion
While the tests are comprehensive and cover key functionality for the DApp, some issues need to be addressed, especially regarding MetaMask integration and the execution of Cucumber tests. The feedback provided is aimed at improving the quality and reliability of the DApp, which will contribute to a better user experience and a more robust application.
