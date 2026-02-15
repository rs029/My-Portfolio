"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CodeModal } from "@/components/ui/code-modal"
import { DemoRunner } from "@/components/ui/demo-runner"
import { fullCodeExamples } from "@/data/codeExamples"
import {
  Code,
  Play,
  Copy,
  CheckCircle,
  Terminal,
  Cpu,
  Zap,
  Globe,
  Shield,
  Bug,
  Download,
  Github,
  BookOpen,
  Lightbulb
} from "lucide-react"

const codeSnippets = {
  playwright: [
    {
      title: "Login Page Positive Test Case",
      description: "Navigate to page & login to dashboard",
      code: `import { Given, When, Then } from '@cucumber/cucumber';
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
      language: "typescript",
      framework: "Playwright",
      difficulty: "Advanced",
      features: ["Dynamic test inputs", "URL & state validation", "Configurable timeouts", "Gherkin"]
    },
    {
      title: "Page Verification Testing",
      description: "Open a menu & verify it loads without an error",
      code: `import { Given, When, Then } from '@cucumber/cucumber';
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
      language: "typescript",
      framework: "Playwright",
      difficulty: "Advanced",
      features: ["Form Global timeout configuration (Cucumber hooks)", "Multi-tab handling using Playwright context", "Reusable Page Object architecture", "Defensive error handling for closed pages"]
    }
    //     {
    //       title: "API Testing with Playwright",
    //       description: "Test API responses and status codes",
    //       code: `import { test, expect } from '@playwright/test';

    // test('API response validation', async ({ request }) => {
    //   // Make GET request
    //   const response = await request.get('/api/users');

    //   // Verify status code
    //   expect(response.status()).toBe(200);

    //   // Verify response body
    //   const users = await response.json();
    //   expect(users).toHaveLength(10);

    //   // Verify user structure
    //   expect(users[0]).toHaveProperty('id');
    //   expect(users[0]).toHaveProperty('name');
    //   expect(users[0]).toHaveProperty('email');
    // });`,
    //       language: "typescript",
    //       framework: "Playwright",
    //       difficulty: "Intermediate",
    //       features: ["API Testing", "JSON Validation", "Status Codes"]
    //     }
  ],
  cypress: [
    {
      title: "Form Submission after Login",
      description: "Checking positive and negative login test cases & form submission with the details",
      code: `describe("Neem_Tree_Inital_Testing", () => {

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

    // HERE: View Full Example
`,
      language: "javascript",
      framework: "Cypress",
      difficulty: "Intermediate",
      features: ["Form submission validation", "Table data verification & DOM traversal", "Data extraction using .invoke()", "Assertion chaining with Chai", "URL validation & navigation testing"]
    }
    //     {
    //       title: "Network Request Stubbing",
    //       description: "Mock API responses for testing",
    //       code: `describe('API Mocking', () => {
    //   it('should handle loading states', () => {
    //     // Stub API request
    //     cy.intercept('GET', '/api/data', {
    //       fixture: 'sample-data.json',
    //       delay: 1000
    //     }).as('getData');

    //     cy.visit('/dashboard');

    //     // Verify loading state
    //     cy.get('[data-testid="loading"]')
    //       .should('be.visible');

    //     // Wait for API call
    //     cy.wait('@getData');

    //     // Verify data loaded
    //     cy.get('[data-testid="loading"]')
    //       .should('not.exist');

    //     cy.get('[data-testid="data-container"]')
    //       .should('be.visible');
    //   });
    // });`,
    //       language: "javascript",
    //       framework: "Cypress",
    //       difficulty: "Advanced",
    //       features: ["Network Stubbing", "Fixtures", "Loading States"]
    //     }
  ],
  selenium: [
    {
      title: "Login Scenario",
      description: "Basic Selenium Login Scenario with Gherkin Syntax",
      code: `using NUnit.Framework;
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
        }
        `,
      language: "C# with .NET & NUnit",
      framework: "Selenium",
      difficulty: "Advanced",
      features: ["Scenario lifecycle management", "Explicit wait implementation (WebDriverWait)", "Alert detection & handling logic", "Environment-based configuration management"]
    }
  ]
  //   jest: [
  //     {
  //       title: "Component Testing",
  //       description: "Test React components with Jest",
  //       code: `import React from 'react';
  // import { render, screen, fireEvent } from '@testing-library/react';
  // import { Button } from './Button';

  // describe('Button Component', () => {
  //   it('should render button with text', () => {
  //     render(<Button>Click me</Button>);

  //     const button = screen.getByRole('button', { name: 'Click me' });
  //     expect(button).toBeInTheDocument();
  //     expect(button).toBeEnabled();
  //   });

  //   it('should handle click events', () => {
  //     const handleClick = jest.fn();

  //     render(<Button onClick={handleClick}>Click me</Button>);

  //     const button = screen.getByRole('button', { name: 'Click me' });
  //     fireEvent.click(button);

  //     expect(handleClick).toHaveBeenCalledTimes(1);
  //   });

  //   it('should be disabled when loading', () => {
  //     render(<Button loading>Loading...</Button>);

  //     const button = screen.getByRole('button');
  //     expect(button).toBeDisabled();
  //     expect(button).toHaveAttribute('aria-busy', 'true');
  //   });
  // });`,
  //       language: "typescript",
  //       framework: "Jest",
  //       difficulty: "Intermediate",
  //       features: ["Component Testing", "Event Testing", "Accessibility"]
  //     }
  //   ]
}

const frameworkColors: Record<string, string> = {
  Playwright: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  Cypress: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  Selenium: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  Jest: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400"
}

const difficultyColors: Record<string, string> = {
  Beginner: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  Intermediate: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  Advanced: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
}

export function Automation() {
  const [activeTab, setActiveTab] = useState<AvailableFramework>("playwright")
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [showCodeModal, setShowCodeModal] = useState(false)
  const [showDemoRunner, setShowDemoRunner] = useState(false)
  const [selectedExample, setSelectedExample] = useState<any>(null)
  const [currentIndex, setCurrentIndex] = useState<number>(0)

  const handleTabChange = (value: string) => {
    if (value === 'playwright' || value === 'cypress' || value === 'selenium') {
      setActiveTab(value)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 10,
      },
    },
  }

  const copyToClipboard = async (code: string, id: string) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopiedCode(id)
      setTimeout(() => setCopiedCode(null), 2000)
    } catch (err) {
      console.error('Failed to copy code:', err)
    }
  }

  type AvailableFramework = 'playwright' | 'cypress' | 'selenium';

  const viewFullExample = (framework: AvailableFramework, index: number) => {
    console.log('viewFullExample called with:', { framework, index })
    const example = fullCodeExamples[framework]?.[index]
    console.log('Found example:', example)
    if (example) {
      setCurrentIndex(index)
      setSelectedExample(example)
      setShowCodeModal(true)
    } else {
      // Fallback: use the snippet data if full example not found
      console.log('Using fallback for:', framework, index)
      const snippet = codeSnippets[framework]?.[index]
      console.log('Found snippet:', snippet)
      if (snippet) {
        setSelectedExample({
          id: `${framework}-${index}`,
          title: snippet.title,
          fullCode: snippet.code,
          framework: framework,
          features: snippet.features
        })
        setShowCodeModal(true)
      }
    }
  }

  const openGithubExample = (framework: AvailableFramework, index: number) => {
    const githubUrls: Record<AvailableFramework, string[]> = {
      playwright: [
        'https://github.com/rs029/QDC-Playwright/blob/main/features/step-definitions/login.steps.ts',
        'https://github.com/rs029/QDC-Playwright/blob/main/features/step-definitions/sanity.steps.ts'
      ],
      cypress: [
        'https://github.com/rs029/Project_Initial_Test/blob/master/cypress/e2e/firstTest.cy.js'
      ],
      selenium: [
        'https://github.com/rs029/QDCTestFrame/blob/main/QDCLogin/StepDefinitions/LoginSteps.cs'
      ]
    }

    const url = githubUrls[framework]?.[index];
    if (url) {
      window.open(url, '_blank');
    }
  }

  const runDemo = (framework: AvailableFramework, index: number) => {
    console.log('runDemo called with:', { framework, index })
    const snippet = codeSnippets[framework as keyof typeof codeSnippets]?.[index]
    console.log('Found snippet for demo:', snippet)
    if (snippet) {
      setCurrentIndex(index)
      setSelectedExample(snippet)
      setShowDemoRunner(true)
    }
  }

  return (
    <section id="automation" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="gradient-text">Test Automation</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Practical code examples and testing patterns for modern automation frameworks.
            Learn industry-standard approaches to quality assurance.
          </p>
        </motion.div>

        {/* Framework Tabs */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="playwright">Playwright</TabsTrigger>
              <TabsTrigger value="cypress">Cypress</TabsTrigger>
              <TabsTrigger value="selenium">Selenium</TabsTrigger>
              {/* <TabsTrigger value="jest">Jest</TabsTrigger> */}
            </TabsList>

            {Object.entries(codeSnippets).map(([framework, snippets]) => (
              <TabsContent key={framework} value={framework} className="mt-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Framework Overview */}
                  <div className="mb-8">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Code className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold capitalize">{framework} Testing</h3>
                        <p className="text-muted-foreground">
                          {framework === "playwright" && "Built a scalable end-to-end automation framework using Playwright with TypeScript, following the Page Object Model (POM) design pattern and BDD (Behavior-Driven Development) with Cucumber and Gherkin syntax."}
                          {framework === "cypress" && "Fast, easy, and reliable testing for anything that runs in a browser"}
                          {framework === "selenium" && "Legacy browser automation with extensive language support"}
                          {framework === "jest" && "Delightful JavaScript testing with zero configuration"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Code Snippets Grid */}
                  <div className="grid grid-cols-1 gap-6">
                    {snippets.map((snippet, index) => (
                      <motion.div
                        key={index}
                        variants={itemVariants}
                        whileHover={{ y: -2 }}
                      >
                        <Card className="border-2 border-border hover:border-primary/50 transition-all duration-300">
                          <CardHeader>
                            <div className="flex items-start justify-between">
                              <div>
                                <CardTitle className="text-lg mb-2">{snippet.title}</CardTitle>
                                <CardDescription>{snippet.description}</CardDescription>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge className={frameworkColors[snippet.framework]}>
                                  {snippet.framework}
                                </Badge>
                                <Badge className={difficultyColors[snippet.difficulty]}>
                                  {snippet.difficulty}
                                </Badge>
                              </div>
                            </div>
                          </CardHeader>

                          <CardContent>
                            {/* Features */}
                            <div className="flex flex-wrap gap-2 mb-4">
                              {snippet.features.map((feature) => (
                                <Badge key={feature} variant="outline" className="text-xs">
                                  {feature}
                                </Badge>
                              ))}
                            </div>

                            {/* Code Block */}
                            <div className="relative">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center space-x-2">
                                  <Terminal className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-sm text-muted-foreground">
                                    {snippet.language}
                                  </span>
                                </div>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => copyToClipboard(snippet.code, `${framework}-${index}`)}
                                  className="flex items-center space-x-1"
                                >
                                  {copiedCode === `${framework}-${index}` ? (
                                    <>
                                      <CheckCircle className="h-4 w-4" />
                                      <span>Copied!</span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="h-4 w-4" />
                                      <span>Copy</span>
                                    </>
                                  )}
                                </Button>
                              </div>

                              <pre className="p-4 bg-muted rounded-md overflow-x-auto">
                                <code className="text-sm text-foreground">
                                  {snippet.code}
                                </code>
                              </pre>
                            </div>

                            {/* Actions */}
                            <div className="flex space-x-2 mt-4">
                              <Button
                                size="sm"
                                variant="outline"
                                className="flex-1"
                                onClick={() => viewFullExample(activeTab, index)}
                              >
                                <Github className="h-4 w-4 mr-2" />
                                View Full Example
                              </Button>
                              {false && <Button
                                size="sm"
                                className="flex-1"
                                onClick={() => runDemo(activeTab, index)}
                              >
                                <Play className="h-4 w-4 mr-2" />
                                Run Demo
                              </Button>}
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>

        {/* Learning Resources */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-6 text-center">Learning Resources</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <BookOpen className="h-8 w-8 text-primary mx-auto mb-2" />
                <h4 className="font-semibold mb-1">Documentation</h4>
                <p className="text-sm text-muted-foreground">
                  Official framework docs and best practices
                </p>
              </div>
              <div className="text-center">
                <Lightbulb className="h-8 w-8 text-primary mx-auto mb-2" />
                <h4 className="font-semibold mb-1">Tutorials</h4>
                <p className="text-sm text-muted-foreground">
                  Step-by-step guides and video tutorials
                </p>
              </div>
              <div className="text-center">
                <Download className="h-8 w-8 text-primary mx-auto mb-2" />
                <h4 className="font-semibold mb-1">Templates</h4>
                <p className="text-sm text-muted-foreground">
                  Ready-to-use test templates and examples
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Modals */}
      {selectedExample && (
        <>
          <CodeModal
            isOpen={showCodeModal}
            onClose={() => setShowCodeModal(false)}
            example={selectedExample}
            framework={activeTab}
            onGitHubClick={() => openGithubExample(activeTab, currentIndex)}
          />

          <DemoRunner
            isOpen={showDemoRunner}
            onClose={() => setShowDemoRunner(false)}
            example={selectedExample}
          />
        </>
      )}
    </section>
  )
}
