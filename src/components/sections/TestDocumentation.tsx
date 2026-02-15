"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  FileText, 
  Copy, 
  CheckCircle, 
  AlertCircle, 
  Download, 
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  Clock,
  User,
  Layers
} from "lucide-react"

interface TestCase {
  id: string
  title: string
  description: string
  priority: 'high' | 'medium' | 'low'
  status: 'draft' | 'ready' | 'approved'
  category: 'functional' | 'integration' | 'ui' | 'api' | 'performance'
  steps: string[]
  expectedResult: string
  preconditions: string[]
  author: string
  createdAt: string
  estimatedTime: number
  tags: string[]
}

interface TestScenario {
  id: string
  title: string
  description: string
  testCases: string[]
  objective: string
  scope: string
  participants: string[]
  risks: string[]
  acceptanceCriteria: string[]
}

const testCases: TestCase[] = [
  {
    id: 'TC001',
    title: 'User Login - Valid Credentials',
    description: 'Verify user can successfully login with valid credentials',
    priority: 'high',
    status: 'approved',
    category: 'functional',
    steps: [
      'Navigate to login page',
      'Enter valid username in email field',
      'Enter valid password in password field',
      'Click login button',
      'Verify user is redirected to dashboard'
    ],
    expectedResult: 'User should be successfully logged in and redirected to dashboard',
    preconditions: [
      'User must have valid account',
      'Login page must be accessible',
      'Database connection must be active'
    ],
    author: 'QA Team',
    createdAt: '2024-01-15',
    estimatedTime: 5,
    tags: ['authentication', 'smoke-test', 'critical-path']
  },
  {
    id: 'TC002',
    title: 'User Registration - Email Validation',
    description: 'Verify email validation during user registration process',
    priority: 'high',
    status: 'approved',
    category: 'functional',
    steps: [
      'Navigate to registration page',
      'Enter invalid email format',
      'Click submit button',
      'Verify validation error message'
    ],
    expectedResult: 'System should display appropriate email validation error',
    preconditions: [
      'Registration page must be accessible',
      'Email validation rules must be configured'
    ],
    author: 'QA Team',
    createdAt: '2024-01-16',
    estimatedTime: 3,
    tags: ['validation', 'registration', 'negative-testing']
  },
  {
    id: 'TC003',
    title: 'Product Search - Performance Test',
    description: 'Verify search functionality performs well under load',
    priority: 'medium',
    status: 'ready',
    category: 'performance',
    steps: [
      'Navigate to search page',
      'Enter search term',
      'Measure response time',
      'Verify search results accuracy',
      'Repeat with 100 concurrent users'
    ],
    expectedResult: 'Search should return results within 2 seconds under normal load',
    preconditions: [
      'Search index must be updated',
      'Performance monitoring tools must be active'
    ],
    author: 'QA Team',
    createdAt: '2024-01-17',
    estimatedTime: 15,
    tags: ['performance', 'search', 'load-testing']
  }
]

const testScenarios: TestScenario[] = [
  {
    id: 'TS001',
    title: 'E-commerce Purchase Flow',
    description: 'End-to-end testing of complete customer purchase journey',
    testCases: ['TC001', 'TC004', 'TC007', 'TC012'],
    objective: 'Verify users can complete entire purchase process from product discovery to payment confirmation',
    scope: 'All user-facing purchase functionality including cart, checkout, and payment',
    participants: ['QA Tester', 'Business Analyst', 'Product Owner'],
    risks: [
      'Payment gateway availability',
      'Inventory synchronization',
      'Third-party service dependencies'
    ],
    acceptanceCriteria: [
      'User can browse products successfully',
      'Cart operations work correctly',
      'Checkout process completes without errors',
      'Payment confirmation is received',
      'Order appears in user history'
    ]
  },
  {
    id: 'TS002',
    title: 'Mobile App Offline Mode',
    description: 'Testing application functionality when network connectivity is lost',
    testCases: ['TC015', 'TC016', 'TC017'],
    objective: 'Verify app gracefully handles offline scenarios and data synchronization',
    scope: 'Core mobile app functionality without network connectivity',
    participants: ['Mobile QA', 'Backend Developer'],
    risks: [
      'Data corruption during sync',
      'User data loss',
      'Performance degradation'
    ],
    acceptanceCriteria: [
      'App remains functional offline',
      'Data is queued for sync',
      'Sync completes when connection restored',
      'No data is lost during process'
    ]
  }
]

const testTemplates = [
  {
    id: 'TT001',
    name: 'API Test Case Template',
    description: 'Standard template for API testing',
    category: 'api',
    fields: [
      'Endpoint URL',
      'HTTP Method',
      'Request Headers',
      'Request Body',
      'Expected Status Code',
      'Expected Response',
      'Authentication Required',
      'Test Data Setup'
    ]
  },
  {
    id: 'TT002',
    name: 'UI Test Case Template',
    description: 'Standard template for UI/UX testing',
    category: 'ui',
    fields: [
      'Page/Screen Name',
      'Element Locator',
      'Action Type',
      'Input Data',
      'Expected Behavior',
      'Accessibility Check',
      'Responsive Design Check',
      'Cross-browser Compatibility'
    ]
  },
  {
    id: 'TT003',
    name: 'Performance Test Template',
    description: 'Standard template for performance testing',
    category: 'performance',
    fields: [
      'Test Type (Load/Stress/Volume)',
      'Concurrent Users',
      'Duration',
      'Response Time SLA',
      'Throughput Requirements',
      'Resource Utilization Limits',
      'Monitoring Metrics'
    ]
  }
]

export function TestDocumentation() {
  const [activeTab, setActiveTab] = useState<'testcases' | 'scenarios' | 'templates'>('testcases')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTestCase, setSelectedTestCase] = useState<TestCase | null>(null)

  const handleTabChange = (value: string) => {
    if (value === 'testcases' || value === 'scenarios' || value === 'templates') {
      setActiveTab(value)
    }
  }

  const filteredTestCases = testCases.filter(testCase => {
    const matchesCategory = selectedCategory === 'all' || testCase.category === selectedCategory
    const matchesSearch = testCase.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         testCase.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         testCase.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const getPriorityColor = (priority: TestCase['priority']) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
    }
  }

  const getStatusColor = (status: TestCase['status']) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
      case 'ready': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
      case 'draft': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
    }
  }

  const getCategoryColor = (category: TestCase['category']) => {
    switch (category) {
      case 'functional': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400'
      case 'integration': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400'
      case 'ui': return 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400'
      case 'api': return 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-400'
      case 'performance': return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <section id="test-documentation" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">
            <span className="gradient-text">Test Documentation</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive test case management, scenario design, and documentation templates. 
            Industry-standard approaches to structured testing.
          </p>
        </motion.div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
            <TabsTrigger value="testcases" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>Test Cases</span>
            </TabsTrigger>
            <TabsTrigger value="scenarios" className="flex items-center space-x-2">
              <Layers className="h-4 w-4" />
              <span>Test Scenarios</span>
            </TabsTrigger>
            <TabsTrigger value="templates" className="flex items-center space-x-2">
              <Edit className="h-4 w-4" />
              <span>Templates</span>
            </TabsTrigger>
          </TabsList>

          {/* Test Cases Tab */}
          <TabsContent value="testcases" className="mt-8">
            {/* Filters and Search */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search test cases..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="all">All Categories</option>
                  <option value="functional">Functional</option>
                  <option value="integration">Integration</option>
                  <option value="ui">UI</option>
                  <option value="api">API</option>
                  <option value="performance">Performance</option>
                </select>
              </div>
            </div>

            {/* Test Cases Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTestCases.map((testCase, index) => (
                <motion.div
                  key={testCase.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg mb-2">{testCase.title}</CardTitle>
                          <CardDescription className="text-sm">{testCase.description}</CardDescription>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Badge className={getPriorityColor(testCase.priority)}>
                            {testCase.priority}
                          </Badge>
                          <Badge className={getStatusColor(testCase.status)}>
                            {testCase.status}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-3">
                        {/* Category and Tags */}
                        <div className="flex flex-wrap gap-2">
                          <Badge className={getCategoryColor(testCase.category)}>
                            {testCase.category}
                          </Badge>
                          {testCase.tags.map((tag, tagIndex) => (
                            <Badge key={tagIndex} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        {/* Meta Info */}
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <User className="h-4 w-4" />
                              <span>{testCase.author}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{testCase.estimatedTime}min</span>
                            </div>
                          </div>
                          <span>{testCase.createdAt}</span>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 pt-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedTestCase(testCase)}
                            className="flex-1"
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => copyToClipboard(testCase.id)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Test Scenarios Tab */}
          <TabsContent value="scenarios" className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {testScenarios.map((scenario, index) => (
                <motion.div
                  key={scenario.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Layers className="h-5 w-5 text-primary" />
                        {scenario.title}
                      </CardTitle>
                      <CardDescription>{scenario.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">Objective</h4>
                          <p className="text-sm text-muted-foreground">{scenario.objective}</p>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-2">Scope</h4>
                          <p className="text-sm text-muted-foreground">{scenario.scope}</p>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2">Acceptance Criteria</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {scenario.acceptanceCriteria.map((criteria, criteriaIndex) => (
                              <li key={criteriaIndex} className="flex items-start gap-2">
                                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span>{criteria}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2">Participants</h4>
                          <div className="flex flex-wrap gap-2">
                            {scenario.participants.map((participant, participantIndex) => (
                              <Badge key={participantIndex} variant="outline">
                                {participant}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2">Risks</h4>
                          <div className="space-y-2">
                            {scenario.risks.map((risk, riskIndex) => (
                              <div key={riskIndex} className="flex items-start gap-2 p-2 bg-red-50 dark:bg-red-900/20 rounded">
                                <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                                <span className="text-sm">{risk}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Templates Tab */}
          <TabsContent value="templates" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testTemplates.map((template, index) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Edit className="h-5 w-5 text-primary" />
                        {template.name}
                      </CardTitle>
                      <CardDescription>{template.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-semibold mb-2">Category</h4>
                          <Badge className={getCategoryColor(template.category as any)}>
                            {template.category}
                          </Badge>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-2">Required Fields</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {template.fields.map((field, fieldIndex) => (
                              <li key={fieldIndex} className="flex items-start gap-2">
                                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                                <span>{field}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex gap-2 pt-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            <Download className="h-4 w-4 mr-2" />
                            Download Template
                          </Button>
                          <Button size="sm" variant="outline">
                            <Plus className="h-4 w-4" />
                            Use Template
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
