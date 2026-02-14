"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
      title: "Basic Page Navigation",
      description: "Navigate to a page and verify title",
      code: `import { test, expect } from '@playwright/test';

test('basic navigation', async ({ page }) => {
  // Navigate to the application
  await page.goto('https://example.com');
  
  // Verify page title
  await expect(page).toHaveTitle(/Example Page/);
  
  // Check if main element is visible
  const mainElement = page.locator('main');
  await expect(mainElement).toBeVisible();
});`,
      language: "typescript",
      framework: "Playwright",
      difficulty: "Beginner",
      features: ["Navigation", "Assertions", "Locators"]
    },
    {
      title: "Form Interaction Testing",
      description: "Fill and submit a form with validation",
      code: `import { test, expect } from '@playwright/test';

test('form submission', async ({ page }) => {
  await page.goto('/contact');
  
  // Fill form fields
  await page.fill('#name', 'John Doe');
  await page.fill('#email', 'john@example.com');
  await page.fill('#message', 'Test message');
  
  // Submit form
  await page.click('[type="submit"]');
  
  // Verify success message
  await expect(page.locator('.success-message'))
    .toContainText('Thank you for your message');
});`,
      language: "typescript",
      framework: "Playwright",
      difficulty: "Intermediate",
      features: ["Form Fill", "Click Actions", "Text Validation"]
    },
    {
      title: "API Testing with Playwright",
      description: "Test API responses and status codes",
      code: `import { test, expect } from '@playwright/test';

test('API response validation', async ({ request }) => {
  // Make GET request
  const response = await request.get('/api/users');
  
  // Verify status code
  expect(response.status()).toBe(200);
  
  // Verify response body
  const users = await response.json();
  expect(users).toHaveLength(10);
  
  // Verify user structure
  expect(users[0]).toHaveProperty('id');
  expect(users[0]).toHaveProperty('name');
  expect(users[0]).toHaveProperty('email');
});`,
      language: "typescript",
      framework: "Playwright",
      difficulty: "Intermediate",
      features: ["API Testing", "JSON Validation", "Status Codes"]
    }
  ],
  cypress: [
    {
      title: "Element Interaction",
      description: "Click elements and verify changes",
      code: `describe('Button Interactions', () => {
  beforeEach(() => {
    cy.visit('/buttons');
  });

  it('should toggle button state', () => {
    // Find button and click
    cy.get('[data-testid="toggle-btn"]')
      .should('be.visible')
      .and('not.be.disabled');
    
    // Click button
    cy.get('[data-testid="toggle-btn"]').click();
    
    // Verify state change
    cy.get('[data-testid="toggle-btn"]')
      .should('have.class', 'active')
      .and('contain', 'Active');
  });
});`,
      language: "javascript",
      framework: "Cypress",
      difficulty: "Beginner",
      features: ["Element Selection", "Assertions", "State Verification"]
    },
    {
      title: "Network Request Stubbing",
      description: "Mock API responses for testing",
      code: `describe('API Mocking', () => {
  it('should handle loading states', () => {
    // Stub API request
    cy.intercept('GET', '/api/data', {
      fixture: 'sample-data.json',
      delay: 1000
    }).as('getData');

    cy.visit('/dashboard');

    // Verify loading state
    cy.get('[data-testid="loading"]')
      .should('be.visible');

    // Wait for API call
    cy.wait('@getData');

    // Verify data loaded
    cy.get('[data-testid="loading"]')
      .should('not.exist');
    
    cy.get('[data-testid="data-container"]')
      .should('be.visible');
  });
});`,
      language: "javascript",
      framework: "Cypress",
      difficulty: "Advanced",
      features: ["Network Stubbing", "Fixtures", "Loading States"]
    }
  ],
  selenium: [
    {
      title: "WebDriver Setup",
      description: "Basic Selenium WebDriver configuration",
      code: `import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class BasicTest {
    private WebDriver driver;
    private WebDriverWait wait;

    @Before
    public void setUp() {
        // Initialize Chrome driver
        driver = new ChromeDriver();
        wait = new WebDriverWait(driver, 10);
        
        // Maximize window
        driver.manage().window().maximize();
    }

    @Test
    public void testPageTitle() {
        // Navigate to page
        driver.get("https://example.com");
        
        // Wait for page to load
        wait.until(ExpectedConditions.titleContains("Example"));
        
        // Verify title
        String title = driver.getTitle();
        assertTrue(title.contains("Example"));
    }

    @After
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}`,
      language: "java",
      framework: "Selenium",
      difficulty: "Beginner",
      features: ["Setup", "Navigation", "Assertions"]
    }
  ],
  jest: [
    {
      title: "Component Testing",
      description: "Test React components with Jest",
      code: `import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button Component', () => {
  it('should render button with text', () => {
    render(<Button>Click me</Button>);
    
    const button = screen.getByRole('button', { name: 'Click me' });
    expect(button).toBeInTheDocument();
    expect(button).toBeEnabled();
  });

  it('should handle click events', () => {
    const handleClick = jest.fn();
    
    render(<Button onClick={handleClick}>Click me</Button>);
    
    const button = screen.getByRole('button', { name: 'Click me' });
    fireEvent.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when loading', () => {
    render(<Button loading>Loading...</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-busy', 'true');
  });
});`,
      language: "typescript",
      framework: "Jest",
      difficulty: "Intermediate",
      features: ["Component Testing", "Event Testing", "Accessibility"]
    }
  ]
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
  const [activeTab, setActiveTab] = useState("playwright")
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

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
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="playwright">Playwright</TabsTrigger>
              <TabsTrigger value="cypress">Cypress</TabsTrigger>
              <TabsTrigger value="selenium">Selenium</TabsTrigger>
              <TabsTrigger value="jest">Jest</TabsTrigger>
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
                          {framework === "playwright" && "Modern end-to-end testing with reliable auto-waits and cross-browser support"}
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
                              <Button size="sm" variant="outline" className="flex-1">
                                <Github className="h-4 w-4 mr-2" />
                                View Full Example
                              </Button>
                              <Button size="sm" className="flex-1">
                                <Play className="h-4 w-4 mr-2" />
                                Run Demo
                              </Button>
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
    </section>
  )
}
