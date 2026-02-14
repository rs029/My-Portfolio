"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  Bug, 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Play, 
  Pause, 
  RotateCcw,
  Eye,
  EyeOff,
  Code,
  Zap,
  Search,
  Info
} from "lucide-react"

const bugScenarios = [
  {
    id: 1,
    title: "Form Validation Edge Case",
    category: "Frontend",
    difficulty: "Beginner",
    description: "Discover the hidden form validation bug that bypasses required field checks",
    buggyCode: `function validateForm(formData) {
  // BUG: Missing validation for special characters
  if (formData.name.length > 0) {
    return true;
  }
  return false;
}`,
    fixedCode: `function validateForm(formData) {
  // FIXED: Comprehensive validation
  if (!formData.name || 
      formData.name.trim().length === 0 ||
      /[<>\"'&]/.test(formData.name)) {
    return false;
  }
  return true;
}`,
    testSteps: [
      "Enter only spaces in the name field",
      "Submit the form",
      "Observe the bug: form accepts invalid input"
    ],
    expectedBehavior: "Form should reject empty or whitespace-only names",
    actualBehavior: "Form accepts whitespace as valid input",
    solution: "Add trim() check and special character validation",
    impact: "Medium - Could lead to data integrity issues"
  },
  {
    id: 2,
    title: "Race Condition in API Calls",
    category: "Backend",
    difficulty: "Advanced",
    description: "Identify the race condition that causes data corruption in concurrent requests",
    buggyCode: `async function updateUser(userId, data) {
  // BUG: Race condition - no locking mechanism
  const user = await db.users.findById(userId);
  user.data = data;
  await user.save();
  return user;
}`,
    fixedCode: `async function updateUser(userId, data) {
  // FIXED: Add transaction/locking
  const result = await db.transaction(async (tx) => {
    const user = await tx.users.findById(userId, { lock: true });
    user.data = data;
    await user.save();
    return user;
  });
  return result;
}`,
    testSteps: [
      "Send two simultaneous update requests for same user",
      "Observe inconsistent final state",
      "Check database for data corruption"
    ],
    expectedBehavior: "Updates should be processed sequentially without corruption",
    actualBehavior: "Concurrent updates overwrite each other unpredictably",
    solution: "Implement database transactions or optimistic locking",
    impact: "High - Critical data corruption in production"
  },
  {
    id: 3,
    title: "Memory Leak in Event Listeners",
    category: "Performance",
    difficulty: "Intermediate",
    description: "Find the memory leak caused by unremoved event listeners",
    buggyCode: `function setupComponent() {
  // BUG: Event listeners never removed
  document.addEventListener('scroll', handleScroll);
  setInterval(updateData, 1000);
  
  function handleScroll() {
    // Heavy computation on scroll
    updateUI();
  }
}`,
    fixedCode: `function setupComponent() {
  // FIXED: Proper cleanup
  const scrollHandler = throttle(handleScroll, 100);
  const intervalId = setInterval(updateData, 1000);
  
  document.addEventListener('scroll', scrollHandler);
  
  // Cleanup function
  return function cleanup() {
    document.removeEventListener('scroll', scrollHandler);
    clearInterval(intervalId);
  };
}`,
    testSteps: [
      "Open component and monitor memory usage",
      "Navigate away and back multiple times",
      "Observe memory continuously increasing"
    ],
    expectedBehavior: "Memory should stabilize after component cleanup",
    actualBehavior: "Memory usage grows indefinitely",
    solution: "Implement proper event listener cleanup and throttling",
    impact: "High - Causes browser crashes in long sessions"
  },
  {
    id: 4,
    title: "SQL Injection Vulnerability",
    category: "Security",
    difficulty: "Intermediate",
    description: "Discover the SQL injection vulnerability in user authentication",
    buggyCode: `async function authenticateUser(username, password) {
  // BUG: Direct string concatenation - SQL injection risk
  const query = \`SELECT * FROM users 
               WHERE username = '\${username}' 
               AND password = '\${password}'\`;
  return await db.query(query);
}`,
    fixedCode: `async function authenticateUser(username, password) {
  // FIXED: Parameterized queries
  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
  return await db.query(query, [username, password]);
}`,
    testSteps: [
      "Enter username: admin'--",
      "Enter any password",
      "Submit login form",
      "Observe unauthorized access"
    ],
    expectedBehavior: "Invalid credentials should be rejected",
    actualBehavior: "SQL injection bypasses authentication",
    solution: "Use parameterized queries or prepared statements",
    impact: "Critical - Complete system compromise"
  },
  {
    id: 5,
    title: "Async/Await Error Handling",
    category: "Frontend",
    difficulty: "Beginner",
    description: "Find the missing error handling that causes silent failures",
    buggyCode: `async function fetchUserData(userId) {
  // BUG: No error handling
  const response = await fetch(\`/api/users/\${userId}\`);
  const data = await response.json();
  return data;
}`,
    fixedCode: `async function fetchUserData(userId) {
  // FIXED: Proper error handling
  try {
    const response = await fetch(\`/api/users/\${userId}\`);
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    throw error; // Re-throw for caller to handle
  }
}`,
    testSteps: [
      "Call function with invalid user ID",
      "Check browser console for errors",
      "Observe silent failure or undefined behavior"
    ],
    expectedBehavior: "Errors should be caught and handled gracefully",
    actualBehavior: "Errors are silently ignored or cause undefined behavior",
    solution: "Add try-catch blocks and proper error propagation",
    impact: "Medium - Poor user experience and debugging difficulty"
  },
  {
    id: 6,
    title: "CSS Selector Specificity Bug",
    category: "Frontend",
    difficulty: "Beginner",
    description: "Identify the CSS specificity issue causing style conflicts",
    buggyCode: `/* BUG: Low specificity styles */
.button {
  background: blue;
  color: white;
}

/* Higher specificity overrides */
.container .button {
  background: red; /* Unintended override */
}`,
    fixedCode: `/* FIXED: Proper specificity hierarchy */
.btn-primary {
  background: blue !important;
  color: white;
}

.container .btn-secondary {
  background: red;
}`,
    testSteps: [
      "Apply button styles in different containers",
      "Observe unexpected color changes",
      "Check CSS cascade order"
    ],
    expectedBehavior: "Button styles should be consistent across containers",
    actualBehavior: "Styles are unexpectedly overridden",
    solution: "Use consistent naming conventions and proper specificity",
    impact: "Low - Visual inconsistencies only"
  }
]

const difficultyColors: Record<string, string> = {
  Beginner: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  Intermediate: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  Advanced: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
}

const categoryIcons: Record<string, React.ComponentType<any>> = {
  Frontend: Bug,
  Backend: Shield,
  Performance: Zap,
  Security: AlertTriangle
}

export function QADemo() {
  const [selectedScenario, setSelectedScenario] = useState(bugScenarios[0])
  const [showSolution, setShowSolution] = useState(false)
  const [showCode, setShowCode] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

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

  const runDemo = () => {
    setIsRunning(true)
    setCurrentStep(0)
    setShowSolution(false)
    
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= selectedScenario.testSteps.length - 1) {
          clearInterval(interval)
          setIsRunning(false)
          setShowSolution(true)
          return prev
        }
        return prev + 1
      })
    }, 2000)
  }

  const resetDemo = () => {
    setCurrentStep(0)
    setIsRunning(false)
    setShowSolution(false)
  }

  return (
    <section id="qa-demo" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="gradient-text">QA Bug Demonstrations</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Interactive examples of common software bugs and how to identify, reproduce, 
            and fix them. Learn real-world testing scenarios.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Bug Scenarios List */}
          <motion.div
            className="lg:col-span-1"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <h3 className="text-2xl font-bold mb-6">Bug Scenarios</h3>
            <div className="space-y-3">
              {bugScenarios.map((scenario) => {
                const CategoryIcon = categoryIcons[scenario.category]
                return (
                  <motion.div
                    key={scenario.id}
                    variants={itemVariants}
                    whileHover={{ x: 5 }}
                    onClick={() => {
                      setSelectedScenario(scenario)
                      resetDemo()
                    }}
                    className={`p-4 rounded-lg border cursor-pointer transition-all duration-300 ${
                      selectedScenario.id === scenario.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <CategoryIcon className="h-4 w-4 text-primary" />
                        <Badge variant="outline" className="text-xs">
                          {scenario.category}
                        </Badge>
                      </div>
                      <Badge className={`text-xs ${difficultyColors[scenario.difficulty]}`}>
                        {scenario.difficulty}
                      </Badge>
                    </div>
                    <h4 className="font-semibold mb-1">{scenario.title}</h4>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {scenario.description}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Bug Details and Demo */}
          <motion.div
            className="lg:col-span-2"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      {(() => {
                        const CategoryIcon = categoryIcons[selectedScenario.category]
                        return <CategoryIcon className="h-5 w-5 text-primary" />
                      })()}
                      {selectedScenario.title}
                    </CardTitle>
                    <CardDescription>{selectedScenario.description}</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={difficultyColors[selectedScenario.difficulty]}>
                      {selectedScenario.difficulty}
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Bug Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <h4 className="font-semibold text-red-800 dark:text-red-400 mb-2 flex items-center">
                      <XCircle className="h-4 w-4 mr-2" />
                      Actual Behavior
                    </h4>
                    <p className="text-sm text-red-700 dark:text-red-300">
                      {selectedScenario.actualBehavior}
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <h4 className="font-semibold text-green-800 dark:text-green-400 mb-2 flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Expected Behavior
                    </h4>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      {selectedScenario.expectedBehavior}
                    </p>
                  </div>
                </div>

                {/* Impact Assessment */}
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Impact:</strong> {selectedScenario.impact}
                  </AlertDescription>
                </Alert>

                {/* Test Steps Demo */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold">Test Steps</h4>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        onClick={runDemo}
                        disabled={isRunning}
                      >
                        {isRunning ? (
                          <>
                            <Pause className="h-4 w-4 mr-2" />
                            Running...
                          </>
                        ) : (
                          <>
                            <Play className="h-4 w-4 mr-2" />
                            Run Demo
                          </>
                        )}
                      </Button>
                      <Button size="sm" variant="outline" onClick={resetDemo}>
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Reset
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {selectedScenario.testSteps.map((step, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{
                          opacity: currentStep >= index ? 1 : 0.3,
                          x: currentStep >= index ? 0 : -20,
                        }}
                        transition={{ duration: 0.3 }}
                        className={`p-3 rounded-lg border ${
                          currentStep > index
                            ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20"
                            : currentStep === index
                            ? "border-primary bg-primary/10 dark:border-primary dark:bg-primary/5"
                            : "border-border bg-muted/30"
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                            currentStep > index
                              ? "bg-green-500 text-white"
                              : currentStep === index
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground"
                          }`}>
                            {currentStep > index ? (
                              <CheckCircle className="h-3 w-3" />
                            ) : (
                              index + 1
                            )}
                          </div>
                          <span className={`text-sm ${
                            currentStep >= index ? "text-foreground" : "text-muted-foreground"
                          }`}>
                            {step}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Code Comparison */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold">Code Analysis</h4>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setShowCode(!showCode)}
                    >
                      {showCode ? (
                        <>
                          <EyeOff className="h-4 w-4 mr-2" />
                          Hide Code
                        </>
                      ) : (
                        <>
                          <Eye className="h-4 w-4 mr-2" />
                          Show Code
                        </>
                      )}
                    </Button>
                  </div>

                  {showCode && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="space-y-4"
                    >
                      <div>
                        <h5 className="text-sm font-semibold text-red-600 dark:text-red-400 mb-2">
                          ❌ Buggy Code
                        </h5>
                        <pre className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md overflow-x-auto">
                          <code className="text-sm text-red-800 dark:text-red-300">
                            {selectedScenario.buggyCode}
                          </code>
                        </pre>
                      </div>

                      <div>
                        <h5 className="text-sm font-semibold text-green-600 dark:text-green-400 mb-2">
                          ✅ Fixed Code
                        </h5>
                        <pre className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md overflow-x-auto">
                          <code className="text-sm text-green-800 dark:text-green-300">
                            {selectedScenario.fixedCode}
                          </code>
                        </pre>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Solution */}
                {showSolution && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg"
                  >
                    <h4 className="font-semibold text-blue-800 dark:text-blue-400 mb-2 flex items-center">
                      <Info className="h-4 w-4 mr-2" />
                      Solution
                    </h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      {selectedScenario.solution}
                    </p>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Learning Outcomes */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-4 text-center">What You'll Learn</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <Search className="h-8 w-8 text-primary mx-auto mb-2" />
                <h4 className="font-semibold mb-1">Bug Detection</h4>
                <p className="text-sm text-muted-foreground">
                  Identify common software bugs through systematic testing
                </p>
              </div>
              <div className="text-center">
                <Bug className="h-8 w-8 text-primary mx-auto mb-2" />
                <h4 className="font-semibold mb-1">Reproduction Steps</h4>
                <p className="text-sm text-muted-foreground">
                  Learn to create clear, reproducible test scenarios
                </p>
              </div>
              <div className="text-center">
                <Shield className="h-8 w-8 text-primary mx-auto mb-2" />
                <h4 className="font-semibold mb-1">Solution Design</h4>
                <p className="text-sm text-muted-foreground">
                  Understand root causes and effective fix strategies
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
