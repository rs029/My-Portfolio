export const fullCodeExamples = {
  playwright: [
    {
      id: 'playwright-advance-login',
      title: 'Login Page Positive Test Case',
      fullCode: `import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { loginPage } from '../support/world';
import { TestData } from '../../utils/TestData';
import { setDefaultTimeout } from '@cucumber/cucumber';

Given('the user is on the login page', async function () {
  // Set timeout for this step (60 seconds)
  
  setDefaultTimeout(60 * 1000);
  
  await loginPage.navigate();
  
  // Wait a bit for URL to update
  await page.waitForTimeout(1000);
  
  const url = loginPage.getUrl();
  expect(url).toContain('login');
});

When('the user enters the test email {string}', async (email: string) => {
  await loginPage.usernameInput().fill(email);
});

When('enters the test password {string}', async (password: string) => {
  await loginPage.passwordInput().fill(password);
});

When('enters the store code {string}', async (storeCode: string) => {
  const input = await loginPage.storeCodeInput();
  await input.fill(storeCode)
});

Then('the user should be redirected to the dashboard', async () => {
  await page.waitForURL(/.*home|.*dashboard/i, { timeout: 10000 }).catch(() => {});
  const url = page.url();
  expect(url).toMatch(/.*home|.*dashboard/i);
  
  // Verify we're actually on dashboard
  const isOnDashboard = await homePage.isOnDashboard();
  expect(isOnDashboard).toBeTruthy();
});`,
      setup: `// BDD Automation Setup (Playwright + Cucumber + TypeScript)

npm init -y
npm install --save-dev @playwright/test @cucumber/cucumber typescript ts-node @types/node
npx playwright install

// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "outDir": "dist"
  }
}

// cucumber.js
module.exports = {
  default: {
    require: ['step-definitions/**/*.ts', 'support/**/*.ts'],
    requireModule: ['ts-node/register'],
    format: ['progress', 'html:reports/cucumber-report.html'],
    timeout: 60000
  }
};`,
      dependencies: [
        '@playwright/test',
        '@cucumber/cucumber',
        'typescript',
        'ts-node',
        '@types/node'
      ],
      instructions: 'Run test with: npx cucumber-js features/login.feature'
    },
    {
      id: 'playwright-page-verification',
      title: 'Page Verification Testing',
      fullCode: `import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { page, customerPage, context } from '../support/world';
import { CustomerPage } from '../../pages/CustomerPage';
import { setDefaultTimeout } from '@cucumber/cucumber';
setDefaultTimeout(60 * 1000); // Set default timeout for all steps to 60 seconds

// Store the original page and track the current active page
// These will be reset automatically when ensurePageInitialized() detects a closed page
let originalPage: any;
let currentActivePage: any;

function ensurePageInitialized() {
  if (!page) {
    throw new Error('Page is not initialized. Make sure hooks.ts Before hook runs first.');
  }
  
  // Check if we need to reset page tracking
  let needsReset = false;
  
  if (!originalPage || !currentActivePage) {
    // First time initialization
    needsReset = true;
  } else {
    // Check if stored pages are closed (from previous scenario)
    try {
      // Try to access a property that will throw if page is closed
      const _ = originalPage.url();
      // If we get here, page is still open, but check if it's the same instance
      if (originalPage !== page) {
        // Page instance changed (new scenario), reset
        needsReset = true;
      }
    } catch (error) {
      // Page is closed, reset to new page
      needsReset = true;
    }
  }
  
  if (needsReset) {
    originalPage = page;
    currentActivePage = page;
    (customerPage as any).page = page;
    console.log('Page tracking reset - using fresh page instance from world.ts');
  }
}

/**
 * Step: When the user clicks on "Add New Customer"
 */
When('the user clicks on {string}', async (buttonText: string) => {
  ensurePageInitialized();
  if (buttonText === 'Add New Customer') {
    await customerPage.clickAddNewCustomer();
  } else {
    // Generic button click
    const button = await customerPage.menuLocator(buttonText);
    await button.waitFor({ state: 'visible', timeout: 10000 });
    await button.click();
    await currentActivePage.waitForTimeout(1000);
    await customerPage.handlePopups();
  }
});

/**
 * Step: Then the user should be redirected to the Add New Customer Screen
 */
Then('the user should be redirected to the Add New Customer Screen', async () => {
  ensurePageInitialized();
  await currentActivePage.waitForTimeout(2000); // Wait for navigation
  await customerPage.handlePopups();
});

/**
 * Step: And clicks on "{Menu}" menu
 */
When('clicks on {string} menu', async (menuName: string) => {
  await customerPage.clickMenu(menuName);
});

When('clicks on {string}', async (itemName: string) => {
  // Get the current page count and URL before clicking
  const pagesBefore = context.pages().length;
  const currentPageUrl = currentActivePage.url();
  
  // Click the menu item (this should open a new tab)
  await customerPage.clickMenuItem(itemName);
});

/* HERE: Haven't wrote the code for Helper function to verify the new tab */
`,
      setup: `// BDD Automation Setup (Playwright + Cucumber + TypeScript)

npm init -y
npm install --save-dev @playwright/test @cucumber/cucumber typescript ts-node @types/node
npx playwright install

// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "outDir": "dist"
  }
}

// cucumber.js
module.exports = {
  default: {
    require: ['step-definitions/**/*.ts', 'support/**/*.ts'],
    requireModule: ['ts-node/register'],
    format: ['progress', 'html:reports/cucumber-report.html'],
    timeout: 60000
  }
};`,
      dependencies: [
        '@playwright/test',
        '@cucumber/cucumber',
        'typescript',
        'ts-node',
        '@types/node'
      ],
      instructions: 'Run test with: npx cucumber-js features/sanity.feature'
    }
  ],
  cypress: [
    {
      id: 'cypress-form-submission',
      title: 'Form Submission after Login',
      fullCode: `describe("Neem_Tree_Inital_Testing", () => {

    it("Login_Page_Negative_Test", () => {

        cy.visit("URL/Account/login")
        cy.get("#email").focus().type("admin1")
        cy.get('#password').focus().type('admin12442')
        cy.get('#submit').click()
        // cy.url().should('eq', 'URL/Home/Dashboard')
        cy.get('.myalert').should('be.visible')

    })

    it("Login_Page_Positive_Test", () => {

        cy.visit("URL/Account/login")
        cy.get("#email").focus().type("admin")
        cy.get('#password').focus().type('admin1')
        cy.get('#submit').click()
        cy.url().should('eq', 'URL/Home/Dashboard')

        // After successful login - let's get inside the project section
        
        cy.get('#Project').click({waitForAnimations: false})
        // cy.wait(5000)
        // cy.url().should('eq', 'URL/Project/Index')
        cy.visit('URL/Project/Index')
        
        // Add new Project

        cy.get('#AddnewProject').click({waitForAnimations: false})
        cy.url().should('eq', 'URL/Project/Details')

        // Make a new Project
        const currentTime = new Date().toLocaleTimeString()

        cy.get('#projectName').focus().type(currentTime)
        cy.get('#FromDt').focus().type('2023-12-25')
        cy.get('#ToDt').focus().type('2023-12-31')
        // cy.visit('https://www.insider.com/sc/on-running-is-the-sportswear-brand-rethinking-sustainability')
        // cy.get('img[src="https://media-s3-us-east-1.ceros.com/business-insi…4141/outline.png?imageOpt=1&fit=bounds&width=1080"]').trigger('mousedown', {which: 1})
        // cy.trigger('mousemove').visit('URL/Project/Details')
        // cy.get('#dropContainer').trigger('mouseup', {force: true})
        cy.get('#submitProject').click()
        // cy.visit('URL/Project/Details?id=198')


        // creating some schedule

        cy.get('#SheduleTab').click()

        cy.get('#sDate').focus().type('2024-01-01')
        cy.get('#sDetails').focus().type('In Room')
        cy.get('#sRemarks').focus().type('Getting Focused')

        let enteredDate, enteredDetails, enteredRemarks;
        cy.get('#sDate').invoke('val').then((val) => {
            enteredDate = val
        })
        cy.get('#sDetails').invoke('val').then((val) => {
            enteredDetails = val
        })
        cy.get('#sRemarks').invoke('val').then((val) => {
            enteredRemarks = val
        })

        cy.get('#addShedule').click()


        // Checking value in table below

        cy.get('table tbody tr').each(($row, index) => {
            if(index === 0){
                cy.wrap($row)
                .find('td')
                .should('have.length', 6)
                .eq(0)
                .should('contain.text', 'Day 1')
                cy.wrap($row)
                .find('td')
                .eq(1)
                .should('contain.text', '01 JAN, 2024')
                cy.wrap($row)
                .find('td')
                .eq(2)
                .should('contain.text', 'MONDAY')
                cy.wrap($row)
                .find('td')
                .eq(3)
                .should('contain', enteredDetails)
                cy.wrap($row)
                .find('td')
                .eq(4)
                .should('contain', enteredRemarks)
            }
        })
    })

    it('Add New Project test', () => {

        cy.visit("URL/Account/login")
        cy.get("#email").focus().type("admin")
        cy.get('#password').focus().type('admin1')
        cy.get('#submit').click()
        cy.url().should('eq', 'URL/Home/Dashboard')
        
        // Adding a new project

        cy.get('#Project').click({waitForAnimations: false})
        // cy.wait(5000)
        // cy.url().should('eq', 'URL/Project/Index')
        cy.visit('URL/Project/Index')
        
        // Add new Project

        cy.get('#AddnewProject').click({waitForAnimations: false})
        cy.url().should('eq', 'URL/Project/Details')

        // Make a new Project
        const currentTime = new Date().toLocaleTimeString()

        cy.get('#projectName').focus().type(currentTime)
        cy.get('#FromDt').focus().type('2023-12-25')
        cy.get('#ToDt').focus().type('2023-12-31')
        // cy.visit('https://www.insider.com/sc/on-running-is-the-sportswear-brand-rethinking-sustainability')
        // cy.get('img[src="https://media-s3-us-east-1.ceros.com/business-insi…4141/outline.png?imageOpt=1&fit=bounds&width=1080"]').trigger('mousedown', {which: 1})
        // cy.trigger('mousemove').visit('URL/Project/Details')
        // cy.get('#dropContainer').trigger('mouseup', {force: true})
        cy.get('#submitProject').click()
        // cy.visit('URL/Project/Details?id=198')

    })

    it('Add Schedule to the Project test', () => {

        cy.visit("URL/Account/login")
        cy.get("#email").focus().type("admin")
        cy.get('#password').focus().type('admin1')
        cy.get('#submit').click()
        cy.url().should('eq', 'URL/Home/Dashboard')      


        cy.get('div[onclick="openProDetails(28)"]').click()

        cy.url().should('eq', 'URL/Project/Details?id=28')

        cy.get('#SheduleTab').click()

        cy.get('#sDate').focus().type('2024-01-02')
        cy.get('#sDetails').focus().type("adasd")
        cy.get('#sRemarks').focus().type('asccsa')

        let enteredDate, enteredDetails, enteredRemarks;
        cy.get('#sDate').invoke('val').then((val) => {
            enteredDate = val
        })
        cy.get('#sDetails').invoke('val').then((val) => {
            enteredDetails = val
        })
        cy.get('#sRemarks').invoke('val').then((val) => {
            enteredRemarks = val
        })

        cy.get('#addShedule').click()


        // Checking value in table below

        cy.get('table tbody tr').each(($row, index) => {
            if(index === 1){
                cy.wrap($row)
                .find('td')
                .should('have.length', 6)
                .eq(0)
                .should('contain.text', 'Day 2')
                cy.wrap($row)
                .find('td')
                .eq(1)
                .should('contain.text', '02 JAN, 2024')
                cy.wrap($row)
                .find('td')
                .eq(2)
                .should('contain.text', 'TUESDAY')
                cy.wrap($row)
                .find('td')
                .eq(3)
                .should('contain', enteredDetails)
                cy.wrap($row)
                .find('td')
                .eq(4)
                .should('contain', enteredRemarks)
            }
        })
    })
})`,
      setup: `// Cypress E2E Project Setup

npm init -y
npm install --save-dev cypress

// cypress.config.js
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://dev.neem-tree.saitec.in",
    defaultCommandTimeout: 8000,
    pageLoadTimeout: 60000,
    video: false,
    screenshotOnRunFailure: true
  }
});`,
      dependencies: ['cypress'],
      instructions: 'Run tests with: npx cypress open'
    }
  ],
  selenium: [
    {
      id: 'selenium-login-scenario',
      title: 'Login Scenario',
      fullCode: `using NUnit.Framework;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Support.UI;
using TechTalk.SpecFlow;
using System;
using System.Threading;

namespace QDCTestFrame.StepDefinitions
{
    [Binding]
    public class LoginSteps
    {
        private IWebDriver _driver = null!;
        private WebDriverWait _wait = null!;

        [BeforeScenario]
        public void Setup()
        {
            // Print sleep configuration at the start of each test scenario
            Console.WriteLine("\n" + new string('*', 60));
            Console.WriteLine("* BEFORE SCENARIO - SLEEP CONFIGURATION STATUS:");
            TestConfiguration.PrintSleepConfiguration();
            Console.WriteLine(new string('*', 60) + "\n");
            
            SharedContext.InitializeDriver();
            _driver = SharedContext.Driver;
            _wait = SharedContext.Wait;
        }

        [AfterScenario]
        public void Teardown()
        {
            SharedContext.CleanupDriver();
            _driver = null!;
            _wait = null!;
        }

        [Given(@"the user is on the login page")]
        public void GivenTheUserIsOnTheLoginPage()
        {
            // Print sleep configuration at the very beginning of test execution
            Console.WriteLine("\n" + new string('=', 50));
            Console.WriteLine("TEST EXECUTION STARTED - SLEEP CONFIGURATION:");
            TestConfiguration.PrintSleepConfiguration();
            Console.WriteLine(new string('=', 50) + "\n");
            
            // Debug: Print environment variables to verify they're loaded
            TestConfiguration.PrintEnvironmentVariables();
            
            _driver.Navigate().GoToUrl(TestConfiguration.GetLoginUrl());
            _wait.Until(driver => driver.FindElement(By.Id("txtUserId")).Displayed);
            Thread.Sleep(2000); // 2 second wait for visibility
        }
            
        [When(@"the user enters the test email ""([^""]*)""")]
        public void WhenTheUserEntersTheTestEmail(string email)
        {
            var emailField = _driver.FindElement(By.Id("txtUserId"));
            emailField.Clear();
            emailField.SendKeys(email);
            Thread.Sleep(2000); // 2 second wait for visibility
        }

        [When(@"enters the test password ""([^""]*)""")]
        public void WhenEntersTheTestPassword(string password)
        {
            var passwordField = _driver.FindElement(By.Id("txtPassword"));
            passwordField.Clear();
            passwordField.SendKeys(password);
            Thread.Sleep(2000); // 2 second wait for visibility
        }

        [When(@"enters the store code ""([^""]*)""")]
        public void WhenEntersTheStoreCode(string storeCode)
        {
            var storeCodeField = _driver.FindElement(By.Id("txtBranchPin"));
            storeCodeField.Clear();
            storeCodeField.SendKeys(storeCode);
            Thread.Sleep(2000); // 2 second wait for visibility
        }

        [When(@"clicks the login button")]
        public void WhenClicksTheLoginButton()
        {
            var loginButton = _driver.FindElement(By.Id("btnLogin"));
            loginButton.Click();
            
            // Wait a moment for the page to process
            Thread.Sleep(2000);
            
            // Handle any alerts that might appear immediately after login
            try
            {
                // Wait a short time for alert to appear
                Thread.Sleep(1000);
                var alert = _driver.SwitchTo().Alert();
                var alertText = alert.Text;
                alert.Accept();
                
                // Store the alert text for later verification
                ScenarioContext.Current["LastAlertText"] = alertText;
            }
            catch (NoAlertPresentException)
            {
                // No alert present, which is fine
                ScenarioContext.Current["LastAlertText"] = null;
            }
            
            Thread.Sleep(2000); // Additional 2 second wait for visibility
        }

        [Then(@"the user should be redirected to the dashboard")]
        public void ThenTheUserShouldBeRedirectedToTheDashboard()
        {
            try
            {
                // Wait for URL to change from login page
                _wait.Until(driver => !driver.Url.Contains("Login") && !driver.Url.Contains("login"));
                
                // Check if we're on the dashboard or any authenticated page
                var currentUrl = _driver.Url;
                Assert.That(currentUrl, Does.Contain("cleankart.quickdrycleaning.com"), 
                    $"Expected to be redirected to dashboard, but current URL is: {currentUrl}");
            }
            catch (WebDriverTimeoutException)
            {
                // If timeout occurs, check if we're still on login page (which would indicate login failure)
                var currentUrl = _driver.Url;
                Assert.That(!currentUrl.Contains("Login"), 
                    $"Login failed - still on login page. Current URL: {currentUrl}");
                
                // If not on login page, assume we're on some other page (might be dashboard)
                Assert.That(currentUrl.Contains("cleankart.quickdrycleaning.com"), 
                    $"Unexpected URL after login: {currentUrl}");
            }
            Thread.Sleep(2000); // 2 second wait for visibility
        }`,
      setup: `// .NET Selenium BDD Setup

// Create project
dotnet new nunit -n QDCTestFrame
cd QDCTestFrame

// Install required packages
dotnet add package Selenium.WebDriver
dotnet add package Selenium.WebDriver.ChromeDriver
dotnet add package NUnit
dotnet add package SpecFlow
dotnet add package SpecFlow.NUnit
dotnet add package SpecFlow.Tools.MsBuild.Generation

// appsettings.json (Environment Configuration)
{
  "TestSettings": {
    "LoginUrl": "your url"
  }
}`,
      dependencies: [
        "Selenium.WebDriver",
        "Selenium.WebDriver.ChromeDriver",
        "NUnit",
        "SpecFlow",
        "SpecFlow.NUnit",
        "SpecFlow.Tools.MsBuild.Generation"
      ],
      instructions: 'Run tests with: dotnet test'
    }
  ]
};
