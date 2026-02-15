"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  X, 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle, 
  XCircle, 
  Terminal, 
  Code,
  Loader2,
  Clock,
  Zap
} from "lucide-react"

interface DemoRunnerProps {
  isOpen: boolean
  onClose: () => void
  example: {
    id: string
    title: string
    code: string
    framework: string
    features: string[]
  }
}

interface TestResult {
  step: string
  status: 'pending' | 'running' | 'passed' | 'failed'
  output?: string
  error?: string
  duration?: number
}

export function DemoRunner({ isOpen, onClose, example }: DemoRunnerProps) {
  const [isRunning, setIsRunning] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [testResults, setTestResults] = useState<TestResult[]>([])
  const [overallStatus, setOverallStatus] = useState<'idle' | 'running' | 'passed' | 'failed'>('idle')
  const [executionTime, setExecutionTime] = useState(0)

  useEffect(() => {
    console.log('DemoRunner received:', { isOpen, example })
    if (isOpen) {
      resetDemo()
    }
  }, [isOpen, example.id])

  // Mock test steps based on framework
  const getTestSteps = () => {
    const baseSteps = [
      { step: 'Initialize test environment', output: 'Setting up test framework...' },
      { step: 'Launch browser/driver', output: 'Starting browser instance...' },
      { step: 'Navigate to test page', output: 'Loading test page...' },
      { step: 'Execute test assertions', output: 'Running test cases...' },
      { step: 'Generate test report', output: 'Creating test report...' }
    ]

    // Add framework-specific steps
    if (example.framework === 'playwright') {
      baseSteps.splice(2, 0, { step: 'Setup page object model', output: 'Initializing page objects...' })
    } else if (example.framework === 'cypress') {
      baseSteps.splice(1, 0, { step: 'Start Cypress server', output: 'Launching Cypress test runner...' })
    } else if (example.framework === 'selenium') {
      baseSteps.splice(1, 0, { step: 'Configure WebDriver', output: 'Setting up WebDriver capabilities...' })
    } else if (example.framework === 'jest') {
      baseSteps.splice(0, 1, { step: 'Compile test files', output: 'Transpiling TypeScript...' })
    }

    return baseSteps
  }

  const testSteps = getTestSteps()

  useEffect(() => {
    if (isOpen) {
      resetDemo()
    }
  }, [isOpen, example.id])

  const resetDemo = () => {
    setIsRunning(false)
    setCurrentStep(0)
    setTestResults([])
    setOverallStatus('idle')
    setExecutionTime(0)
  }

  const runDemo = async () => {
    setIsRunning(true)
    setOverallStatus('running')
    const startTime = Date.now()
    
    const results: TestResult[] = testSteps.map(step => ({
      ...step,
      status: 'pending' as const
    }))

    setTestResults(results)

    // Simulate test execution
    for (let i = 0; i < testSteps.length; i++) {
      setCurrentStep(i)
      
      // Update current step to running
      setTestResults(prev => prev.map((result, index) => 
        index === i ? { ...result, status: 'running' } : result
      ))

      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000))

      // Randomly pass or fail (90% pass rate for demo)
      const passed = Math.random() > 0.1
      const stepResult: TestResult = {
        ...testSteps[i],
        status: passed ? 'passed' : 'failed',
        output: testSteps[i].output + (passed ? ' ✓' : ' ✗'),
        error: passed ? undefined : 'Assertion failed: Expected element to be visible',
        duration: 1500 + Math.floor(Math.random() * 1000)
      }

      setTestResults(prev => prev.map((result, index) => 
        index === i ? stepResult : result
      ))

      // If any step fails, mark overall as failed
      if (!passed) {
        setOverallStatus('failed')
        setIsRunning(false)
        setExecutionTime(Date.now() - startTime)
        return
      }
    }

    // All tests passed
    setOverallStatus('passed')
    setIsRunning(false)
    setExecutionTime(Date.now() - startTime)
  }

  const stopDemo = () => {
    setIsRunning(false)
    setOverallStatus('failed')
    setExecutionTime(Date.now() - (Date.now() - executionTime))
  }

  const getStatusIcon = (status: TestResult['status']) => {
    switch (status) {
      case 'running':
        return <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
      case 'passed':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: TestResult['status']) => {
    switch (status) {
      case 'running':
        return 'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20'
      case 'passed':
        return 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20'
      case 'failed':
        return 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20'
      default:
        return 'border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900/20'
    }
  }

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="fixed inset-4 md:inset-8 z-50 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <Card className="h-full flex flex-col border-2 border-border">
          {/* Header */}
          <CardHeader className="pb-4 border-b">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-primary" />
                  <span>Test Runner Demo</span>
                  <Badge variant="outline" className="capitalize">
                    {example.framework}
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Live demonstration of {example.title}
                </CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className={
                  overallStatus === 'passed' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                  overallStatus === 'failed' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                  overallStatus === 'running' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                  'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
                }>
                  {overallStatus === 'idle' ? 'Ready' :
                   overallStatus === 'running' ? 'Running' :
                   overallStatus === 'passed' ? 'Passed' : 'Failed'}
                </Badge>
                <Button size="sm" variant="ghost" onClick={onClose}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-4 mt-4">
              <Button
                onClick={runDemo}
                disabled={isRunning}
                className="flex items-center space-x-2"
              >
                {isRunning ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Running...</span>
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" />
                    <span>Run Demo</span>
                  </>
                )}
              </Button>
              
              {isRunning && (
                <Button
                  onClick={stopDemo}
                  variant="outline"
                  className="flex items-center space-x-2"
                >
                  <Pause className="h-4 w-4" />
                  <span>Stop</span>
                </Button>
              )}
              
              <Button
                onClick={resetDemo}
                variant="outline"
                className="flex items-center space-x-2"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Reset</span>
              </Button>

              {executionTime > 0 && (
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{(executionTime / 1000).toFixed(2)}s</span>
                </div>
              )}
            </div>
          </CardHeader>

          {/* Content */}
          <CardContent className="flex-1 overflow-hidden p-0">
            <div className="h-full overflow-auto p-6">
              {/* Test Features */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Test Features</h3>
                <div className="flex flex-wrap gap-2">
                  {example.features.map((feature, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Test Results */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Execution Steps</h3>
                {testResults.map((result, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-lg border transition-all duration-300 ${getStatusColor(result.status)}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(result.status)}
                        <div>
                          <h4 className="font-medium">{result.step}</h4>
                          {result.output && (
                            <p className="text-sm text-muted-foreground mt-1">
                              {result.output}
                            </p>
                          )}
                          {result.error && (
                            <Alert className="mt-2">
                              <AlertDescription className="text-sm">
                                {result.error}
                              </AlertDescription>
                            </Alert>
                          )}
                        </div>
                      </div>
                      {result.duration && (
                        <span className="text-sm text-muted-foreground">
                          {(result.duration / 1000).toFixed(2)}s
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Code Preview */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Code Preview</h3>
                <div className="p-4 bg-muted rounded-md max-h-64 overflow-auto">
                  <pre className="text-sm">
                    <code className="text-foreground">
                      {example.code.split('\n').slice(0, 10).join('\n')}
                      {example.code.split('\n').length > 10 && '\n// ... (truncated for preview)'}
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
